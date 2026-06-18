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

const staticPages: { path: string; priority: number; freq: ChangeFreq }[] = [
  { path: "", priority: 1.0, freq: "weekly" },
  { path: "/projects", priority: 0.9, freq: "weekly" },
  { path: "/services", priority: 0.8, freq: "monthly" },
  { path: "/blog", priority: 0.8, freq: "weekly" },
  { path: "/about", priority: 0.7, freq: "monthly" },
  { path: "/faq", priority: 0.6, freq: "monthly" },
  { path: "/contact", priority: 0.7, freq: "monthly" },
  { path: "/privacy-policy", priority: 0.3, freq: "yearly" },
  { path: "/terms", priority: 0.3, freq: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: SitemapEntry[] = [];
  const now = new Date();

  for (const { path, priority, freq } of staticPages) {
    const languages: Record<string, string> = {
      "tr-TR": `${BASE_URL}/tr${path}`,
      "en-US": `${BASE_URL}/en${path}`,
      "x-default": `${BASE_URL}/tr${path}`,
    };
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
    const languages: Record<string, string> = {
      "tr-TR": `${BASE_URL}/tr/projects/${project.id}`,
      "en-US": `${BASE_URL}/en/projects/${project.id}`,
      "x-default": `${BASE_URL}/tr/projects/${project.id}`,
    };
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
    const languages: Record<string, string> = {
      "tr-TR": `${BASE_URL}/tr/blog/${blog.id}`,
      "en-US": `${BASE_URL}/en/blog/${blog.id}`,
      "x-default": `${BASE_URL}/tr/blog/${blog.id}`,
    };
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
