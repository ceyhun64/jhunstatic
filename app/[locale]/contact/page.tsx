import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Contact from "@/components/contact/contact";

const BASE_URL = "https://www.jhun.com.tr";

type Props = {
  params: Promise<{ locale: "tr" | "en" }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  return {
    title: isEn ? "Contact" : "Iletişim",
    description: isEn
      ? "Get in touch with Ceyhun Türkmen for web development projects, collaborations or any inquiries. Available remotely worldwide."
      : "Ceyhun Türkmen ile web geliştirme projeleri, işbirlikleri veya sorularınız için iletişime geçin. Uzaktan çalışmaya açık.",
    alternates: {
      canonical: `${BASE_URL}/${locale}/contact`,
      languages: {
        "tr-TR": `${BASE_URL}/tr/contact`,
        "en-US": `${BASE_URL}/en/contact`,
        "x-default": `${BASE_URL}/tr/contact`,
      },
    },
    openGraph: {
      url: `${BASE_URL}/${locale}/contact`,
      type: "website",
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  return (
    <div>
      <Navbar locale={locale} />
      <div className="py-15">
        <Contact locale={locale} />
      </div>
      <Footer locale={locale} />
    </div>
  );
}
