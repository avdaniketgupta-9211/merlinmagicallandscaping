import { Photo, SectionLabel, TextLink } from "@/components/ui/editorial";
import { business, photography, processSteps, reviews, site } from "@/data/site";

export function Process() {
  return (
    <section id="process" className="process-section section-gap" aria-labelledby="process-title">
      <div className="shell">
        <div className="section-intro process-intro">
          <div>
            <SectionLabel number="04">Our process</SectionLabel>
            <h2 id="process-title" className="display-title">From First Thought<br /><em>To Fresh Air.</em></h2>
          </div>
          <p>A simple guide to how a landscaping project can take shape. The exact steps and scope are agreed together before any work begins.</p>
        </div>
        <ol className="process-timeline">
          {processSteps.map((step, index) => <li key={step.title}><span className="process-number" aria-hidden="true">0{index + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}
        </ol>
      </div>
    </section>
  );
}

export function Difference() {
  const hasProfile = business.mission || business.approach || business.values.length > 0;
  return (
    <section id="difference" className="difference-section" aria-labelledby="difference-title">
      <figure className="difference-photo" data-reveal>
        <Photo image={business.teamPhoto || photography.arbour} sizes="(max-width: 800px) 100vw, 51vw" />
        {business.teamPhoto ? <figcaption className="photo-badge">The Merlin team</figcaption> : photography.arbour.reference && <figcaption className="photo-badge">Reference photography</figcaption>}
      </figure>
      <div className="difference-content">
        <div>
          <SectionLabel number="05">The Merlin difference</SectionLabel>
          <h2 id="difference-title" className="display-title">Thoughtful Spaces.<br /><em>Lasting Impressions.</em></h2>
          <p>{business.introduction || `${site.name} is focused on landscaping and outdoor spaces. If you’re thinking about changing yours, start by telling us what isn’t working and what you’d love to do outside.`}</p>
          {hasProfile && <div className="company-details">
            {business.mission && <p><strong>Our mission:</strong> {business.mission}</p>}
            {business.approach && <p><strong>How we work:</strong> {business.approach}</p>}
            {business.values.length > 0 && <ul>{business.values.map((value) => <li key={value}>{value}</li>)}</ul>}
          </div>}
          <TextLink href="#contact">Start a conversation</TextLink>
        </div>
        <svg className="contour-lines" viewBox="0 0 280 230" fill="none" aria-hidden="true">
          <path d="M294 21C245 12 217 82 157 94 84 108 79 79 30 115-2 139-13 176 1 219m298-170c-52-9-74 57-139 69-68 13-79-10-119 23C8 167 10 203 27 236M299 77c-47-11-72 49-136 62-63 13-74-5-108 22-24 19-27 44-4 79M301 106c-47-15-65 37-138 53-56 12-67-2-94 21-16 14-14 36 4 62m225-106c-46-16-63 28-134 44-55 12-58 2-78 21-13 12-3 29 7 44m206-80c-38-13-64 22-126 36-47 10-55 1-68 19-6 8 3 23 14 32" />
        </svg>
      </div>
    </section>
  );
}

export function ClientExperiences() {
  return (
    <section id="experiences" className="experiences-section section-gap" aria-labelledby="experiences-title">
      <div className="shell experiences-inner">
        <SectionLabel number="06">Client experiences</SectionLabel>
        <h2 id="experiences-title" className="display-title">{reviews.length ? <>In Their <em>Own Words.</em></> : <>Tell Us About <em>Your Experience.</em></>}</h2>
        {reviews.length ? (
          <div className="review-list">
            {reviews.map((review, index) => <figure key={`${review.name}-${index}`}><blockquote>{review.text}</blockquote><figcaption>{review.name} <span aria-hidden="true">·</span> {review.url ? <a href={review.url}>{review.source}</a> : review.source}</figcaption></figure>)}
          </div>
        ) : <p>If you’ve worked with Merlin, we’d love to hear what went well and what we can do better.</p>}
        <TextLink href="/?intent=feedback#contact">Share feedback</TextLink>
      </div>
    </section>
  );
}
