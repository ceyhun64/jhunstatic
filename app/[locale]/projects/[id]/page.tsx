import type { Metadata } from "next";
import ProjectDetail from "@/components/projects/projectDetail";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import projects from "@/data/projects.json";

const BASE_URL = "https://jhun.com.tr";

type Props = {
  params: Promise<{ locale: "tr" | "en"; id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return {
      title: locale === "en" ? "Project Not Found" : "Proje Bulunamadı",
    };
  }

  const isEn = locale === "en";
  const title = isEn ? project.titleEng || project.title : project.title;
  const description = isEn
    ? project.summaryEng || project.summary
    : project.summary;
  const imageUrl = project.image
    ? `${BASE_URL}${project.image}`
    : `${BASE_URL}/og-image.png`;

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/projects/${id}`,
      languages: {
        "tr-TR": `${BASE_URL}/tr/projects/${id}`,
        "en-US": `${BASE_URL}/en/projects/${id}`,
        "x-default": `${BASE_URL}/tr/projects/${id}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}/projects/${id}`,
      type: "website",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale, id } = await params;
  const project = projects.find((p) => p.id === id);

  const isEn = locale === "en";
  const title = project
    ? isEn
      ? project.titleEng || project.title
      : project.title
    : "";
  const description = project
    ? isEn
      ? project.summaryEng || project.summary
      : project.summary
    : "";
  const imageUrl =
    project?.image ? `${BASE_URL}${project.image}` : `${BASE_URL}/og-image.png`;

  const softwareSchema = project
    ? {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: title,
        description,
        url: project.url ?? `${BASE_URL}/${locale}/projects/${id}`,
        image: imageUrl,
        author: {
          "@type": "Person",
          "@id": `${BASE_URL}/#person`,
          name: "Ceyhun Türkmen",
        },
        dateCreated: project.createdAt,
        dateModified: project.updatedAt,
        ...(project.githubUrl && { codeRepository: project.githubUrl }),
        applicationCategory: "WebApplication",
        operatingSystem: "Web",
      }
    : null;

  return (
    <>
      {softwareSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
      )}
      <div>
        <Navbar locale={locale} />
        <ProjectDetail locale={locale} id={id} />
        <Footer locale={locale} />
      </div>
    </>
  );
}
