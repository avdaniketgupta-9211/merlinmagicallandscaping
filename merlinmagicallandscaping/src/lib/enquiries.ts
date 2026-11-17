import { services } from "@/data/site";

export type EnquiryKind = "project" | "feedback";
export type ContactMethod = "email" | "phone";

export const formLimits = {
  fullName: 100,
  email: 160,
  phone: 40,
  location: 140,
  message: 2400,
} as const;

export type FormField = keyof typeof formLimits | "service" | "contactMethod";
export type FormErrors = Partial<Record<FormField, string>>;

export type Enquiry = {
  kind: EnquiryKind;
  fullName: string;
  email: string;
  phone: string | null;
  service: string | null;
  location: string | null;
  message: string;
  contactMethod: ContactMethod;
};

export function validateEnquiry(raw: Record<string, unknown>): { data: Enquiry; errors: null } | { data: null; errors: FormErrors } {
  const get = (key: string) => typeof raw[key] === "string" ? raw[key].trim() : "";
  const kind = get("kind") === "feedback" ? "feedback" : "project";
  const fullName = get("fullName");
  const email = get("email");
  const phone = get("phone");
  const service = get("service");
  const location = get("location");
  const message = get("message");
  const method = get("contactMethod");
  const errors: FormErrors = {};

  if (fullName.length < 2 || fullName.length > formLimits.fullName) errors.fullName = "Enter your full name (2–100 characters).";
  if (email.length > formLimits.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email address.";
  if (method !== "email" && method !== "phone") errors.contactMethod = "Choose how you’d like to be contacted.";
  if ((method === "phone" && !phone) || (phone && (phone.length > formLimits.phone || !/^[+\d\s().-]+$/.test(phone) || phone.replace(/\D/g, "").length < 7))) {
    errors.phone = "Enter a valid phone number, including any area code.";
  }
  if (kind === "project") {
    if (location.length < 2 || location.length > formLimits.location) errors.location = "Enter the project’s town or postcode (2–140 characters).";
    if (service !== "" && service !== "general" && !services.some((item) => item.slug === service)) errors.service = "Choose an available option or select General landscaping enquiry.";
  }
  if (message.length < 10 || message.length > formLimits.message) {
    errors.message = kind === "feedback" ? "Share a little more about your experience (10–2,400 characters)." : "Tell us a little about your project (10–2,400 characters).";
  }
  if (Object.keys(errors).length) return { data: null, errors };

  return {
    data: {
      kind,
      fullName,
      email,
      phone: phone || null,
      service: kind === "project" ? service || "general" : null,
      location: kind === "project" ? location : null,
      message,
      contactMethod: method === "phone" ? "phone" : "email",
    },
    errors: null,
  };
}
