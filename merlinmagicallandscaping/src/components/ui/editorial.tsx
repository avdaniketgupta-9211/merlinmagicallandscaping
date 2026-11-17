import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import type { Photograph } from "@/data/site";

export function SectionLabel({ number, children }: { number?: string; children: ReactNode }) {
  return <p className="section-label"><span className="label-rule" aria-hidden="true" />{number && <span className="label-number">{number} /</span>}<span>{children}</span></p>;
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  const contents = <>{children}<ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.6} /></>;
  return href.startsWith("#") ? <a className="text-link" href={href}>{contents}</a> : <Link className="text-link" href={href}>{contents}</Link>;
}

export function Photo({ image, sizes, className = "", decorative = false }: { image: Photograph; sizes: string; className?: string; decorative?: boolean }) {
  return (
    <div className={`photo ${className}`}>
      <Image fill src={image.src} alt={decorative ? "" : image.alt} sizes={sizes} style={image.position ? { objectPosition: image.position } : undefined} quality={80} />
    </div>
  );
}
