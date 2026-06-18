import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Services from "@/components/services/services";

const BASE_URL = "https://jhun.com.tr";

type Props = {
  params: Promise<{ locale: "tr" | "en" }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  return {
    title: isEn ? "Services" : "Hizmetlerimiz",
    description: isEn
      ? "Web design & development, SEO, e-commerce, API/backend development and digital consulting services by Ceyhun Türkmen."
      : "Ceyhun Türkmen tarafından sunulan web tasarım & geliştirme, SEO, e-ticaret, API/backend geliştirme ve dijital danışmanlık hizmetleri.",
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
