import { ArrowUpRight } from "lucide-react";
import { Photo, SectionLabel } from "@/components/ui/editorial";
import { business, photography, services } from "@/data/site";
import type { EnquiryKind } from "@/lib/enquiries";
import { EnquiryForm } from "./enquiry-form";

export function Contact({ initialKind, initialService }: { initialKind: EnquiryKind; initialService: string }) {
  const { phone, email, address, serviceArea } = business;
  const location = address ? [address.street, address.locality, address.region, address.postalCode, address.country].filter(Boolean).join(", ") : serviceArea;
  return (
    <>
      <section className="contact-banner" aria-labelledby="contact-banner-title">
        <Photo image={photography.contact} sizes="100vw" className="contact-banner-photo" decorative />
        <div className="contact-banner-tone" aria-hidden="true" />
        <div className="shell contact-banner-content">
          <SectionLabel>The next step</SectionLabel>
          <h2 id="contact-banner-title" className="display-title">Let’s Create Something<br /><em>Beautiful Outdoors.</em></h2>
          <p>Have an outdoor space in mind? Tell us about your project and let’s start a conversation.</p>
          <a className="button button-ivory" href="#contact">Request a Quote <ArrowUpRight size={17} strokeWidth={1.65} aria-hidden="true" /></a>
        </div>
        {photography.contact.reference && <span className="contact-photo-credit">Reference photography</span>}
      </section>
      <section id="contact" className="contact-section section-gap" aria-labelledby="contact-title">
        <div className="shell contact-grid">
          <div className="contact-copy">
            <SectionLabel number="07">Get in touch</SectionLabel>
            <h2 id="contact-title" className="display-title">Tell Us What<br /><em>You’re Imagining.</em></h2>
            <p>A few details about your outdoor space and what you’d like to change help us start the conversation.</p>
            <dl className="business-details">
              <div><dt>Phone</dt><dd>{phone ? <a href={`tel:${phone.tel}`}>{phone.display}</a> : "Not yet published"}</dd></div>
              <div><dt>Email</dt><dd>{email ? <a href={`mailto:${email}`}>{email}</a> : "Please use the enquiry form"}</dd></div>
              <div><dt>{address ? "Location" : "Service area"}</dt><dd>{location || "Please ask about your location"}</dd></div>
            </dl>
          </div>
          <div>
            <noscript><p>This enquiry form needs JavaScript to submit.{email && <> You can also <a href={`mailto:${email}`}>send us an email</a>.</>}</p></noscript>
            <EnquiryForm key={`${initialKind}:${initialService}`} initialKind={initialKind} initialService={initialService} offered={services} />
          </div>
        </div>
      </section>
    </>
  );
}
