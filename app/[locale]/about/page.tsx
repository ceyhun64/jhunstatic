import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import About from "@/components/about/about";

const BASE_URL = "https://www.jhun.com.tr";

type Props = {
  params: Promise<{ locale: "tr" | "en" }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  return {
    title: isEn ? "About" : "Hakkımda",
    description: isEn
      ? "About Ceyhun Türkmen — Full Stack Developer who has independently architected and shipped 8+ commercial platforms. Specializes in Next.js, ASP.NET Core, Node.js and PostgreSQL/MySQL."
      : "Ceyhun Türkmen hakkında — bağımsız olarak 8'den fazla ticari platform mimarisini kurup yayına almış Full Stack Developer. Next.js, ASP.NET Core, Node.js ve PostgreSQL/MySQL konularında uzmanlaşmış.",
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
