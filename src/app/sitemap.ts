import type { MetadataRoute } from "next";
import { navLinks, site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ href: "/" }, ...navLinks].map(({ href }) => ({
    url: new URL(href, site.url).toString(),
    changeFrequency: "monthly",
    priority: href === "/" ? 1 : 0.7,
  }));
}
