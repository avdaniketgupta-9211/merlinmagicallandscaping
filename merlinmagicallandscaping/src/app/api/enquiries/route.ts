import { createHmac } from "node:crypto";
import { isIP } from "node:net";
import { and, lt, sql } from "drizzle-orm";
import { db } from "@/db";
import { enquiries, enquiryRateLimits } from "@/db/schema";
import { validateEnquiry } from "@/lib/enquiries";
import { site } from "@/data/site";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MAX_BODY = 16 * 1024;
const WINDOW_MS = 20 * 60 * 1000;

function response(body: unknown, status: number, extra: Record<string, string> = {}) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...extra } });
}

function fromSameOrigin(request: Request) {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite === "cross-site" || fetchSite === "same-site") return false;
  const raw = request.headers.get("origin");
  if (!raw) return true; // Non-browser clients may make JSON requests without Origin.
  try {
    const origin = new URL(raw);
    if (origin.protocol !== "https:" && origin.protocol !== "http:") return false;
    if (origin.origin === site.url || origin.origin === new URL(request.url).origin) return true;
    const hosts = [request.headers.get("host"), request.headers.get("x-forwarded-host")?.split(",")[0].trim()];
    return hosts.includes(origin.host);
  } catch {
    return false;
  }
}

async function readJson(request: Request): Promise<Record<string, unknown>> {
  if (Number(request.headers.get("content-length")) > MAX_BODY) throw new RangeError();
  const reader = request.body?.getReader();
  if (!reader) throw new SyntaxError();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let size = 0;
  let text = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY) {
        await reader.cancel();
        throw new RangeError();
      }
      text += decoder.decode(value, { stream: true });
    }
    const data: unknown = JSON.parse(text + decoder.decode());
    if (!data || typeof data !== "object" || Array.isArray(data)) throw new SyntaxError();
    return data as Record<string, unknown>;
  } finally {
    reader.releaseLock();
  }
}

function clientIp(request: Request) {
  // Only set this variable when the trusted ingress strips or replaces this header.
  const header = process.env.TRUSTED_CLIENT_IP_HEADER;
  const value = header ? request.headers.get(header)?.trim() : undefined;
  return value && isIP(value) ? value : null;
}

export async function POST(request: Request) {
  if (!fromSameOrigin(request)) return response({ message: "Please submit the form from the Merlin website." }, 403);
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    return response({ message: "Please submit the enquiry as JSON." }, 415);
  }

  let raw: Record<string, unknown>;
  try {
    raw = await readJson(request);
  } catch (error) {
    return error instanceof RangeError
      ? response({ message: "This enquiry is too long. Please shorten the description." }, 413)
      : response({ message: "We couldn’t read this enquiry. Please try again." }, 400);
  }
  if (raw.extraNotes && (typeof raw.extraNotes !== "string" || raw.extraNotes.trim())) {
    return response({ message: "This submission was blocked by spam protection. Clear any autofilled details and try again." }, 400);
  }

  const result = validateEnquiry(raw);
  if (!result.data) return response({ message: "Please check the highlighted fields.", errors: result.errors }, 422);
  const data = result.data;
  const ip = clientIp(request);
  const buckets: [string, number][] = [ip ? [`ip:${ip}`, 10] : ["shared", 120], [`email:${data.email.toLowerCase()}`, 4]];
  const now = new Date();
  const window = Math.floor(now.getTime() / WINDOW_MS);
  const expiresAt = new Date((window + 1) * WINDOW_MS);
  const secret = process.env.ENQUIRY_RATE_SECRET || process.env.DATABASE_URL || "local-enquiry-testing";

  try {
    const id = await db.transaction(async (tx) => {
      await tx.delete(enquiryRateLimits).where(lt(enquiryRateLimits.expiresAt, now));
      for (const [identifier, limit] of buckets) {
        const key = createHmac("sha256", secret).update(`${window}:${identifier}`).digest("hex");
        const [allowed] = await tx.insert(enquiryRateLimits).values({ key, expiresAt }).onConflictDoUpdate({
          target: enquiryRateLimits.key,
          set: { hits: sql`${enquiryRateLimits.hits} + 1` },
          setWhere: and(lt(enquiryRateLimits.hits, limit)),
        }).returning({ key: enquiryRateLimits.key });
        if (!allowed) return null;
      }
      const [saved] = await tx.insert(enquiries).values(data).returning({ id: enquiries.id });
      return saved.id;
    });

    if (!id) return response({ message: "Too many submissions. Please wait a little while and try again." }, 429, {
      "Retry-After": String(Math.max(1, Math.ceil((expiresAt.getTime() - now.getTime()) / 1000))),
    });
    return response({ id }, 201);
  } catch (error) {
    const code = error && typeof error === "object" && "code" in error ? error.code : "storage_error";
    console.error("Enquiry was not stored:", code);
    return response({ message: "We couldn’t save your enquiry right now. Your details are still in the form. Please try again in a moment." }, 503);
  }
}
