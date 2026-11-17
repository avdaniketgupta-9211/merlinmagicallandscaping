import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { connection } from "next/server";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { site } from "@/data/site";
import "./globals.css";

const sans = localFont({ src: "../assets/fonts/dm-sans.woff2", weight: "400 700", variable: "--font-dm", display: "swap", adjustFontFallback: "Arial" });
const display = localFont({
  src: [
    { path: "../assets/fonts/playfair.woff2", weight: "400 600", style: "normal" },
    { path: "../assets/fonts/playfair-italic.woff2", weight: "400 500", style: "italic" },
  ],
  variable: "--font-playfair",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

const defaultTitle = `${site.name} | Landscaping & Outdoor Spaces`;
const socialImage = { url: "/images/social.jpg", width: 1200, height: 630, alt: "A landscaped garden path in evening light" };

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: defaultTitle, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  openGraph: { type: "website", siteName: site.name, url: site.url, title: defaultTitle, description: site.description, images: [socialImage] },
  twitter: { card: "summary_large_image", title: defaultTitle, description: site.description, images: [socialImage] },
};

export const viewport: Viewport = { themeColor: "#102B40" };

export default async function RootLayout({ children }: { children: ReactNode }) {
  await connection(); // HTML is rendered per request so Next can attach the CSP nonce to its scripts.
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
