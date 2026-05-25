import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import About from "@/components/contact/about";

const BASE_URL = "https://jhun.com.tr";

type Props = {
  params: Promise<{ locale: "tr" | "en" }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  return {
    title: isEn ? "About" : "Hakkımda",
    description: isEn
      ? "About Ceyhun Türkmen — Senior Full Stack Developer with 5+ years of experience. Specialises in React, Next.js, TypeScript, Node.js and .NET."
      : "Ceyhun Türkmen hakkında — 5+ yıl deneyimli Senior Full Stack Developer. React, Next.js, TypeScript, Node.js ve .NET konularında uzmanlaşmış.",
    alternates: {
      canonical: `${BASE_URL}/${locale}/about`,
      languages: {
        "tr-TR": `${BASE_URL}/tr/about`,
        "en-US": `${BASE_URL}/en/about`,
        "x-default": `${BASE_URL}/tr/about`,
      },
    },
    openGraph: {
      url: `${BASE_URL}/${locale}/about`,
      type: "profile",
      firstName: "Ceyhun",
      lastName: "Türkmen",
      username: "jhun",
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  return (
    <div>
      <Navbar locale={locale} />
      <div className="py-15">
        <About locale={locale} />
      </div>
      <Footer locale={locale} />
    </div>
  );
}
