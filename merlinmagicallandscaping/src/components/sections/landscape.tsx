import Link from "next/link";
import { Photo, SectionLabel, TextLink } from "@/components/ui/editorial";
import { photography, services } from "@/data/site";

export function Manifesto() {
  return (
    <section id="about" className="manifesto section-gap" aria-labelledby="manifesto-title">
      <div className="shell manifesto-grid">
        <div className="manifesto-copy">
          <SectionLabel number="01">The landscape manifesto</SectionLabel>
          <h2 id="manifesto-title" className="display-title">More Than A Garden.<br /><em>A Place To Belong.</em></h2>
          <p>Good landscaping changes how a place feels. A path can invite you to slow down. A sheltered corner can turn into your favourite room. And planting can mark the seasons in ways a view from the window never could.</p>
          <p>It starts by paying attention to the place itself: the light, the ground and the people who live there.</p>
          <TextLink href="#difference">Meet Merlin</TextLink>
        </div>
        <div className="manifesto-visual">
          <figure className="manifesto-main" data-reveal>
            <Photo image={photography.manifesto} sizes="(max-width: 767px) 89vw, (max-width: 1400px) 45vw, 615px" />
            <figcaption className="figure-caption"><span>01 / The living landscape</span>{photography.manifesto.reference && <span>Reference photo</span>}</figcaption>
          </figure>
          <figure className="manifesto-inset" data-reveal>
            <Photo image={photography.detail} sizes="(max-width: 767px) 30vw, 175px" />
            <figcaption className="figure-caption">02 / Planting detail</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

const projectIdeas = [
  { title: "A place to gather", summary: "Imagine a terrace that catches the evening light, with room to share a meal outdoors.", image: photography.patio, link: "Talk through your ideas" },
  { title: "Room to grow", summary: "Consider what layered planting, seasonal colour and a path through it all could bring to your garden.", image: photography.planting, link: "Discuss your garden" },
];

export function Services() {
  const confirmed = services.length > 0;
  return (
    <section id="services" className="services-section section-gap" aria-labelledby="services-title">
      <div className="shell">
        <div className="section-intro services-intro">
          <div>
            <SectionLabel number="02">Services, reimagined</SectionLabel>
            <h2 id="services-title" className="display-title">The Shape Of<br /><em>What’s Possible.</em></h2>
          </div>
          <p>{confirmed ? "Explore the landscaping services available from Merlin, or tell us what you have in mind if you’re unsure where to start." : "Explore ideas for your own outdoor space. Services haven’t been published yet, so please ask us what’s available for your project."}</p>
        </div>
        <div className="service-spread">
          {confirmed ? services.map((service, index) => (
            <article className="service-panel" key={service.slug}>
              <Link href={`/services/${service.slug}`} className="service-photo-link" aria-label={`Explore ${service.title}`}><Photo image={service.image} sizes="(max-width: 700px) 88vw, 49vw" />{service.image.reference && <span className="photo-badge">Reference photography</span>}</Link>
              <div className="service-panel-copy"><span className="editorial-index" aria-hidden="true">{String(index + 1).padStart(2, "0")} /</span><div><h3>{service.title}</h3><p>{service.summary}</p><div className="service-links"><TextLink href={`/services/${service.slug}`}>Explore service</TextLink><TextLink href={`/?service=${encodeURIComponent(service.slug)}#contact`}>Enquire</TextLink></div></div></div>
            </article>
          )) : projectIdeas.map((idea, index) => (
            <article className="service-panel" key={idea.title}>
              <figure className="service-photo-link" data-reveal>
                <Photo image={idea.image} sizes="(max-width: 700px) 88vw, (max-width: 1440px) 45vw, 680px" />
                <figcaption className="photo-badge">Design inspiration</figcaption>
              </figure>
              <div className="service-panel-copy"><span className="editorial-index" aria-hidden="true">0{index + 1} /</span><div><h3>{idea.title}</h3><p>{idea.summary}</p><TextLink href="#contact">{idea.link}</TextLink></div></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
