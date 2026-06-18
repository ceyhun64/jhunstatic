import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Faq from "@/components/faq/faq";

const BASE_URL = "https://jhun.com.tr";

type Props = {
  params: Promise<{ locale: "tr" | "en" }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  return {
    title: isEn ? "FAQ" : "Sıkça Sorulan Sorular",
    description: isEn
      ? "Answers to frequently asked questions about timelines, pricing, technologies and remote collaboration."
      : "Proje süreleri, fiyatlandırma, teknolojiler ve uzaktan çalışma hakkında sıkça sorulan soruların cevapları.",
    alternates: {
      canonical: `${BASE_URL}/${locale}/faq`,
      languages: {
        "tr-TR": `${BASE_URL}/tr/faq`,
        "en-US": `${BASE_URL}/en/faq`,
        "x-default": `${BASE_URL}/tr/faq`,
      },
    },
    openGraph: {
      url: `${BASE_URL}/${locale}/faq`,
      type: "website",
    },
  };
}

export default async function FaqPage({ params }: Props) {
  const { locale } = await params;
  return (
    <div>
      <Navbar locale={locale} />
      <div className="py-15">
        <Faq locale={locale} />
      </div>
      <Footer locale={locale} />
    </div>
  );
}
