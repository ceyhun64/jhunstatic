import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Services from "@/components/services/services";

const BASE_URL = "https://www.jhun.com.tr";

type Props = {
  params: Promise<{ locale: "tr" | "en" }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  return {
    title: isEn ? "Capabilities" : "Yetkinliklerim",
    description: isEn
      ? "What Ceyhun Türkmen builds: web application engineering, SEO & performance engineering, e-commerce systems, API/backend architecture, and technical consulting."
      : "Ceyhun Türkmen'in insa ettigi sistem türleri: web uygulama mühendisligi, SEO & performans mühendisligi, e-ticaret sistemleri, API/backend mimarisi ve teknik danısmanlık.",
    alternates: {
      canonical: `${BASE_URL}/${locale}/services`,
      languages: {
        "tr-TR": `${BASE_URL}/tr/services`,
        "en-US": `${BASE_URL}/en/services`,
        "x-default": `${BASE_URL}/tr/services`,
      },
    },
    openGraph: {
      url: `${BASE_URL}/${locale}/services`,
      type: "website",
    },
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  return (
    <div>
      <Navbar locale={locale} />
      <Services locale={locale} />
      <Footer locale={locale} />
    </div>
  );
}
