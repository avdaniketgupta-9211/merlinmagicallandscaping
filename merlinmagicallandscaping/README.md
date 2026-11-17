# Merlin Magicallandscapi — Blueprint to Bloom

A Next.js (App Router), TypeScript and Tailwind website for `merlinmagicallandscapi.com`. The enquiry and feedback form writes to PostgreSQL through Drizzle. No external form subscription is needed.

## Preview and local setup

1. Use Node.js 22 and PostgreSQL. Install dependencies with `npm ci`.
2. Keep the platform-created `.env` in the managed workspace, or copy `.env.example` to `.env` locally and fill in `DATABASE_URL`. Never commit credentials or expose them to the browser.
3. Create the tables using `npx drizzle-kit push --config=drizzle.deploy.config.ts`. The platform’s original `drizzle.config.json` also works for its local `app_db`.
4. Run `npm run dev` for local development. `/api/health` checks the database connection; submit the form once to verify the schema and actual writes. Use dummy test data outside production.

## Replace the editable content

- **Business details:** `src/data/site.ts` holds the verified phone, email, address or service area, company introduction, mission, approach, team image, values and social links. Empty fields show a neutral fallback or stay hidden. Add only owner-approved facts. LocalBusiness markup is not printed unless a verified address and phone are configured.
- **Services:** Add only confirmed services to `services` with a lowercase, hyphenated slug, title, summary, detail and photo. These populate the home panels, footer, enquiry list, `/services/<slug>` and sitemap. With no entries the home panels are labelled design inspiration, not offerings.
- **Portfolio:** Put owner-approved images in `public/images/` and enter the real project details in `projects`. The homepage replaces the inspiration gallery when this list is populated. Add `before` only for genuine matching before/after photographs of the same project. Organize categories using consistent names. Never use stock in an entry represented as Merlin work.
- **Hero and photos:** Update `photography` and `film` in `src/data/site.ts`. Keep a WebP poster and, if available, AVIF desktop (~2160px wide), tablet (~1280px) and cropped portrait (~820px) versions. For video, supply a short muted H.264 MP4 with the metadata at the start (fast start). Set `film.source` to an empty string for image-only mode. Keep `isReference` true while any stock remains in the hero, and update `credits` and the media-credit page when swapping assets. Give each informative image descriptive alt text and optionally set a focal position. Set `reference: true` and keep the source credit for temporary stock photographs; leave it off for original company photographs. Use new filenames when replacing files to avoid stale CDN caches. Update `/public/images/social.jpg` and its alt text in `src/app/layout.tsx` for link previews.
- **Feedback:** Add only authentic reviews cleared for publication, with the approved display name, text, source and original link where available. Form feedback is private and does not publish itself. Update `processSteps` once the real working process has been confirmed.
- **Legal:** Review the Privacy Policy and Terms for the business’s jurisdiction and practices, including lawful basis, retention, contact method, hosting providers and service terms, before taking the site live.

Stock visuals are real photographs and footage from [Pexels](https://www.pexels.com/license/), labelled on the site and credited at `/image-credits`. The typefaces are self-hosted under the SIL Open Font License; notices are in `src/assets/fonts/`.

## Receiving enquiries

A successful submission shows a PostgreSQL-backed reference. This version does **not** automatically send an email. Check the private `landscape_enquiries` table in the database provider’s dashboard (Table Editor or SQL Editor), or use Drizzle Studio privately with `npx drizzle-kit studio --config=drizzle.deploy.config.ts`. The latest entries sort by `created_at` descending; search by the full `id` shown on a receipt. Restrict access to authorised staff, set a retention policy, and do not publish or share exports. Rotate the database password if it is ever exposed.

Expired abuse counters in `landscape_enquiry_rate_limits` are purged opportunistically on submissions. If an operational policy requires a fixed deletion schedule, also delete rows whose `expires_at` has passed through the database provider’s scheduler. A long random `ENQUIRY_RATE_SECRET` is recommended in production. Only configure `TRUSTED_CLIENT_IP_HEADER` if your hosting ingress strips or replaces it; otherwise the form uses a site-wide cap and per-email limits.

## Low-cost commercial deployment

1. Push the project to a private GitHub repository, without `.env` or customer data. Connect the repository to Netlify. Its [Next.js adapter](https://docs.netlify.com/frameworks/next-js/overview/) supports App Router and route handlers; use `npm run build` and the framework-detected settings.
2. Create a managed PostgreSQL database. The [Neon Free plan](https://neon.com/pricing) is an option for low traffic; it scales to zero when idle and has compute and storage caps. Check the allowances in the provider dashboard before launch. Run the Drizzle schema push locally using the production connection string, then give the deployed function a TLS-enabled pooled `DATABASE_URL` and a randomly generated `ENQUIRY_RATE_SECRET` as server environment variables. Ensure production and deploy previews use separate databases if previews accept form tests.
3. In Netlify, add `merlinmagicallandscapi.com` as the primary custom domain and use the DNS values shown for this deployment. The domain owner should set them at the authoritative DNS provider, preserve any existing email records, and verify the TLS certificate and HTTPS redirect. Redirect `www` to the primary host. The app emits HSTS and blocks framing on the production domain; noncanonical previews carry `X-Robots-Tag: noindex, nofollow`.
4. Test the live homepage, mobile navigation, `/api/health`, media, legal links, and one form submission against the production table. Delete the test entry. Submit the sitemap to search tools and add local SEO details only after confirming the service area.

[Netlify Free](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/) currently offers 300 monthly credits with a hard cap; deployments, requests, compute and media bandwidth can consume credits. Projects can pause when the allowance runs out. [Vercel Hobby](https://vercel.com/docs/limits/fair-use-guidelines) is for personal non-commercial use; a business deployment would need an eligible paid plan. Hosting and the database can stay at zero incremental cost only within the chosen plan limits. Domain renewal, business email hosting and any higher tier or notification service may cost extra.

## Engineering notes

HTML uses a per-request script nonce in the CSP, so pages are rendered on the server rather than cached as shared HTML. Fonts and media are local and cacheable, below-the-fold media uses responsive lazy loading, and the hero film is not fetched on small screens, slow connections or when reduced motion is enabled. No analytics or third-party scripts are installed.

Build checks: `npx next typegen`, `npm exec tsc -- --noEmit --pretty false`, `npm run build`.
