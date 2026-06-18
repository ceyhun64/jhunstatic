import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Terms from "@/components/legal/terms";

const BASE_URL = "https://jhun.com.tr";

type Props = {
  params: Promise<{ locale: "tr" | "en" }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  return {
    title: isEn ? "Terms of Use" : "Kullanım Şartları",
    description: isEn
      ? "Terms of use for jhun.com.tr and the services offered by Ceyhun Türkmen."
      : "jhun.com.tr ve Ceyhun Türkmen tarafından sunulan hizmetler için kullanım şartları.",
    alternates: {
      canonical: `${BASE_URL}/${locale}/terms`,
      languages: {
        "tr-TR": `${BASE_URL}/tr/terms`,
        "en-US": `${BASE_URL}/en/terms`,
        "x-default": `${BASE_URL}/tr/terms`,
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  return (
    <div>
      <Navbar locale={locale} />
      <div className="py-15">
        <Terms locale={locale} />
      </div>
      <Footer locale={locale} />
    </div>
  );
}
