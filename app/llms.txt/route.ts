import projects from "@/data/projects.json";
import blogs from "@/data/blogs.json";

const BASE_URL = "https://www.jhun.com.tr";

export const dynamic = "force-static";

export function GET() {
  const projectLines = projects
    .map((p) => `- [${p.titleEng || p.title}](${BASE_URL}/en/projects/${p.id}): ${p.summaryEng || p.summary}`)
    .join("\n");

  const blogLines = blogs
    .map((b) => `- [${b.titleEng || b.title}](${BASE_URL}/en/blog/${b.id}): ${b.summaryEng || b.summary}`)
    .join("\n");

  const content = `# Jhun — Ceyhun Türkmen

> Personal portfolio and freelance web development site of Ceyhun Türkmen, a Full Stack Web Developer based in Uşak, Turkey, working remotely with clients across Turkey and internationally.

Specializes in React, Next.js, TypeScript, Node.js, .NET and PostgreSQL/MySQL. Builds corporate websites, e-commerce platforms, and custom digital solutions. The site is available in Turkish (default) and English under /tr and /en locale prefixes; English URLs are used below.

## Pages

- [Home](${BASE_URL}/en): Portfolio overview, technologies used, and contact call-to-action.
- [Services](${BASE_URL}/en/services): Web design & development, SEO, e-commerce, API/backend development, digital consulting, and maintenance & support.
- [Projects](${BASE_URL}/en/projects): Case studies of completed client projects.
- [About](${BASE_URL}/en/about): Background, mission, vision, and achievements.
- [Blog](${BASE_URL}/en/blog): Technical articles on Next.js, TypeScript, e-commerce integrations, SEO, and database design.
- [FAQ](${BASE_URL}/en/faq): Common questions about process, pricing, technologies, and remote collaboration.
- [Contact](${BASE_URL}/en/contact): Project inquiry form and contact details.

## Projects

${projectLines}

## Blog

${blogLines}

## Optional

- [Privacy Policy](${BASE_URL}/en/privacy-policy)
- [Terms of Use](${BASE_URL}/en/terms)
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
