import type { Metadata } from "next";
import { headers } from "next/headers";
import { Hero } from "@/components/hero/hero";
import { Manifesto, Services } from "@/components/sections/landscape";
import { ClientExperiences, Difference, Process } from "@/components/sections/studio";
import { Gallery } from "@/components/portfolio/gallery";
import { Contact } from "@/components/forms/contact";
import { ScrollDetails } from "@/components/ui/scroll-details";
import { business, projects, services, site, visualReferences } from "@/data/site";

export const metadata: Metadata = { alternates: { canonical: "/" } };

async function BusinessData() {
  const { address, phone, email, serviceArea, socials } = business;
  if (!address || !phone) return null;
  const nonce = (await headers()).get("x-nonce") || undefined;
  const data = {
    "@context": "https://schema.org", "@type": "LocalBusiness", name: site.name, url: site.url, telephone: phone.tel,
    ...(email ? { email } : {}), ...(serviceArea ? { areaServed: serviceArea } : {}),
    ...(socials.length ? { sameAs: socials.map(({ url }) => url) } : {}),
    address: { "@type": "PostalAddress", streetAddress: address.street, addressLocality: address.locality, addressRegion: address.region, postalCode: address.postalCode, addressCountry: address.country },
  };
  return <script nonce={nonce} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export default async function HomePage({ searchParams }: { searchParams: Promise<{ intent?: string | string[]; service?: string | string[] }> }) {
  const query = await searchParams;
  const service = services.find((item) => item.slug === query.service)?.slug || "general";
  return (
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <Manifesto />
      <Services />
      <Gallery entries={projects.length ? projects : visualReferences} containsReferences={!projects.length} />
      <Process />
      <Difference />
      <ClientExperiences />
      <Contact initialKind={query.intent === "feedback" ? "feedback" : "project"} initialService={service} />
      <BusinessData />
      <ScrollDetails />
    </main>
  );
}
