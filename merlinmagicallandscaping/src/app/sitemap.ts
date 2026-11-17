import type { MetadataRoute } from "next";
import { services, site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/privacy", "/terms", "/image-credits", ...services.map(({ slug }) => `/services/${slug}`)];
  return paths.map((path) => ({ url: new URL(path, site.url).href }));
}
