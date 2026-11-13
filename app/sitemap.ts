import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/work", "/media", "/speaking", "/work-with-us", "/contact"];
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: path === "/media" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/work-with-us" ? 0.9 : 0.7,
  }));
}
