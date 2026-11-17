import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { business, navigation, services, site } from "@/data/site";
import { Wordmark } from "./identity";

export function SiteFooter() {
  const { address, serviceArea, phone, email, socials } = business;
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-grid">
          <div className="footer-intro">
            <Wordmark />
            <p>Landscaping and outdoor spaces. A place to start imagining what your outdoors could become.</p>
          </div>
          <nav aria-label="Explore the site" className="footer-column">
            <h2>Explore</h2>
            {navigation.filter(({ id }) => id !== "home").map(({ id, label }) => <Link key={id} href={`/#${id}`}>{label}</Link>)}
          </nav>
          <nav aria-label="Services and enquiries" className="footer-column">
            <h2>Landscaping</h2>
            {services.length ? services.map((service) => <Link key={service.slug} href={`/services/${service.slug}`}>{service.title}</Link>) : <Link href="/#services">Project inspiration</Link>}
            <Link href="/#contact">Ask about availability</Link>
          </nav>
          <div className="footer-column">
            <h2>Get in touch</h2>
            <Link href="/#contact" className="footer-contact">Start a conversation <ArrowUpRight size={14} aria-hidden="true" /></Link>
            {phone && <a href={`tel:${phone.tel}`}>{phone.display}</a>}
            {email && <a href={`mailto:${email}`}>{email}</a>}
            {address && <p>{[address.street, address.locality, address.region, address.postalCode, address.country].filter(Boolean).join(", ")}</p>}
            {serviceArea && <p>{serviceArea}</p>}
            {!phone && !email && !address && !serviceArea && <p>Direct contact details are not yet published.</p>}
            {socials.map((social) => <a key={social.url} href={social.url}>{social.label} <ArrowUpRight size={13} aria-hidden="true" /></a>)}
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <nav aria-label="Website information">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms &amp; Conditions</Link>
            <Link href="/image-credits">Media Credits</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
