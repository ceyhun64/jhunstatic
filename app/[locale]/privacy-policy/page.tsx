import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import PrivacyPolicy from "@/components/legal/privacyPolicy";

const BASE_URL = "https://jhun.com.tr";

type Props = {
  params: Promise<{ locale: "tr" | "en" }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  return {
    title: isEn ? "Privacy Policy" : "Gizlilik Politikası",
    description: isEn
      ? "How Ceyhun Türkmen / Jhun collects, uses and protects your personal data under KVKK."
      : "Ceyhun Türkmen / Jhun'un KVKK kapsamında kişisel verilerinizi nasıl topladığı, kullandığı ve koruduğu.",
    alternates: {
      canonical: `${BASE_URL}/${locale}/privacy-policy`,
      languages: {
        "tr-TR": `${BASE_URL}/tr/privacy-policy`,
        "en-US": `${BASE_URL}/en/privacy-policy`,
        "x-default": `${BASE_URL}/tr/privacy-policy`,
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params;
  return (
    <div>
      <Navbar locale={locale} />
      <div className="py-15">
        <PrivacyPolicy locale={locale} />
      </div>
      <Footer locale={locale} />
    </div>
  );
}
