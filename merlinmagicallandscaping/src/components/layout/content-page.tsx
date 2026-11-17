import type { ReactNode } from "react";
import { SectionLabel, TextLink } from "@/components/ui/editorial";

export function ContentPage({ label, title, children }: { label: string; title: string; children: ReactNode }) {
  return (
    <main id="main-content" tabIndex={-1} className="content-page">
      <div className="shell">
        <SectionLabel>{label}</SectionLabel>
        <h1 className="display-title">{title}</h1>
        <div className="content-body">{children}</div>
        <div className="content-back"><TextLink href="/">Back to home</TextLink></div>
      </div>
    </main>
  );
}
