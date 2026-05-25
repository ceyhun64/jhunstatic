import type { MetadataRoute } from "next";
import projects from "@/data/projects.json";
import blogs from "@/data/blogs.json";

const BASE_URL = "https://jhun.com.tr";
const LOCALES = ["tr", "en"] as const;

type ChangeFreq =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency: ChangeFreq;
  priority: number;
  alternates: { languages: Record<string, string> };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: SitemapEntry[] = [];
  const now = new Date();

  const staticPages: { path: string; priority: number; freq: ChangeFreq }[] = [
    { path: "", priority: 1.0, freq: "weekly" },
    { path: "/projects", priority: 0.9, freq: "weekly" },
    { path: "/blog", priority: 0.8, freq: "weekly" },
    { path: "/about", priority: 0.7, freq: "monthly" },
    { path: "/contact", priority: 0.7, freq: "monthly" },
  ];

  for (const { path, priority, freq } of staticPages) {
    const languages = Object.fromEntries(
      LOCALES.map((l) => [l, `${BASE_URL}/${l}${path}`]),
    );
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: now,
        changeFrequency: freq,
        priority,
        alternates: { languages },
      });
    }
  }

  for (const project of projects) {
    const languages = Object.fromEntries(
      LOCALES.map((l) => [l, `${BASE_URL}/${l}/projects/${project.id}`]),
    );
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}/projects/${project.id}`,
        lastModified: new Date(project.updatedAt),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages },
      });
    }
  }

  for (const blog of blogs) {
    const languages = Object.fromEntries(
      LOCALES.map((l) => [l, `${BASE_URL}/${l}/blog/${blog.id}`]),
    );
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}/blog/${blog.id}`,
        lastModified: new Date(blog.updatedAt),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages },
      });
    }
  }

  return entries;
}
