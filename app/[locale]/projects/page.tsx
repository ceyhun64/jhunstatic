import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Projects from "@/components/projects/projects";
import Footer from "@/components/layout/footer";

const BASE_URL = "https://www.jhun.com.tr";

type Props = {
  params: Promise<{ locale: "tr" | "en" }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  return {
    title: isEn ? "Projects" : "Projeler",
    description: isEn
      ? "Full-stack projects built with React, Next.js, TypeScript, Node.js and .NET. E-commerce platforms, corporate websites and custom digital solutions."
      : "React, Next.js, TypeScript, Node.js ve .NET ile geliştirilmiş full-stack projeler. E-ticaret platformları, kurumsal web siteleri ve özel dijital çözümler.",
    alternates: {
      canonical: `${BASE_URL}/${locale}/projects`,
      languages: {
        "tr-TR": `${BASE_URL}/tr/projects`,
        "en-US": `${BASE_URL}/en/projects`,
        "x-default": `${BASE_URL}/tr/projects`,
      },
    },
    openGraph: {
      url: `${BASE_URL}/${locale}/projects`,
      type: "website",
    },
  };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  return (
    <div>
      <Navbar locale={locale} />
      <Projects locale={locale} />
      <Footer locale={locale} />
    </div>
  );
}
