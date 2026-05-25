import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Blog from "@/components/blog/blogs";

const BASE_URL = "https://jhun.com.tr";

type Props = {
  params: Promise<{ locale: "tr" | "en" }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  return {
    title: isEn ? "Blog" : "Blog",
    description: isEn
      ? "Articles and insights about web development, React, Next.js, TypeScript and modern software engineering by Ceyhun Türkmen."
      : "Ceyhun Türkmen'den web geliştirme, React, Next.js, TypeScript ve modern yazılım mühendisliği üzerine makaleler.",
    alternates: {
      canonical: `${BASE_URL}/${locale}/blog`,
      languages: {
        "tr-TR": `${BASE_URL}/tr/blog`,
        "en-US": `${BASE_URL}/en/blog`,
        "x-default": `${BASE_URL}/tr/blog`,
      },
    },
    openGraph: {
      url: `${BASE_URL}/${locale}/blog`,
      type: "website",
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  return (
    <div>
      <Navbar locale={locale} />
      <div className="py-15">
        <Blog locale={locale} />
      </div>
      <Footer locale={locale} />
    </div>
  );
}
