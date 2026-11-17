"use client";

import { ArrowLeft, ArrowRight, ChevronsLeftRight } from "lucide-react";
import { useState } from "react";
import { Photo, SectionLabel } from "@/components/ui/editorial";
import type { PortfolioEntry } from "@/data/site";

function Comparison({ entry }: { entry: PortfolioEntry }) {
  const [split, setSplit] = useState(50);
  if (!entry.before) return null;
  const sizes = "(max-width: 900px) 88vw, 1180px";
  return (
    <div className="comparison">
      <Photo image={entry.image} sizes={sizes} />
      <div className="comparison-before" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}><Photo image={entry.before} sizes={sizes} /></div>
      <span className="comparison-label is-before" aria-hidden="true">Before</span><span className="comparison-label is-after" aria-hidden="true">After</span>
      <span className="comparison-divider" aria-hidden="true" style={{ left: `${split}%` }}><i><ChevronsLeftRight size={20} /></i></span>
      <input type="range" min="0" max="100" value={split} onChange={(event) => setSplit(Number(event.target.value))} aria-label={`Compare before and after for ${entry.title}`} aria-valuetext={`${split}% before, ${100 - split}% after`} />
    </div>
  );
}

export function Gallery({ entries, containsReferences }: { entries: PortfolioEntry[]; containsReferences: boolean }) {
  const categories = [...new Set(entries.map((entry) => entry.category))];
  const [category, setCategory] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const filtered = category ? entries.filter((entry) => entry.category === category) : entries;
  const entry = filtered[index];
  if (!entry) return null;

  function updateCategory(next: string | null) {
    setCategory(next);
    setIndex(0);
  }
  function nextPhoto(step: number) {
    setIndex((previous) => (previous + step + filtered.length) % filtered.length);
  }

  return (
    <section className="gallery-section section-gap" id="work" aria-labelledby="work-title">
      <div className="shell">
        <div className="section-intro gallery-intro">
          <div>
            <SectionLabel number="03">{containsReferences ? "The landscape notebook" : "Landscape transformation stories"}</SectionLabel>
            <h2 id="work-title" className="display-title">Outside, <em>In Focus.</em></h2>
          </div>
          <p>{containsReferences ? "A collection of garden ideas, from the line of a path to the shelter of a leafy terrace. These licensed images are inspiration, not completed Merlin projects." : "A closer look at finished Merlin landscapes and the details that shape how each space is used."}</p>
        </div>
        <div className="gallery-filters" role="group" aria-label="Filter the gallery">
          <button type="button" aria-pressed={category === null} onClick={() => updateCategory(null)}>All</button>
          {categories.map((name) => <button type="button" key={name} aria-pressed={category === name} onClick={() => updateCategory(name)}>{name}</button>)}
        </div>
        <figure className="gallery-figure">
          <div key={entry.id} className="gallery-stage">
            {entry.before ? <Comparison entry={entry} /> : <Photo image={entry.image} sizes="(max-width: 1400px) 89vw, 1260px" />}
            {containsReferences && <span className="photo-badge">Reference photography</span>}
          </div>
          <figcaption className="gallery-caption">
            <div className="gallery-caption-copy" aria-live="polite" aria-atomic="true"><span>{entry.category}</span><h3>{entry.title}</h3><p>{entry.caption}</p></div>
            <div className="gallery-controls">
              <span className="gallery-count" aria-label={`${index + 1} of ${filtered.length}`}><strong>{String(index + 1).padStart(2, "0")}</strong><span aria-hidden="true"> / </span>{String(filtered.length).padStart(2, "0")}</span>
              <button type="button" aria-label="Previous image" onClick={() => nextPhoto(-1)} disabled={filtered.length === 1}><ArrowLeft size={20} strokeWidth={1.5} aria-hidden="true" /></button>
              <button type="button" aria-label="Next image" onClick={() => nextPhoto(1)} disabled={filtered.length === 1}><ArrowRight size={20} strokeWidth={1.5} aria-hidden="true" /></button>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
