import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Heroes from "@/components/home/heroes";
import Banner from "@/components/home/banner";
import About from "@/components/home/about";
import ContactSection from "@/components/home/contact";
import Footer from "@/components/layout/footer";
import Gallery from "@/components/home/gallery";
import Testimonials from "@/components/home/testimonials";
import Github from "@/components/home/github";

const BASE_URL = "https://www.jhun.com.tr";

type Props = {
  params: Promise<{ locale: "tr" | "en" }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  return {
    title: isEn
      ? "Jhun | Ceyhun Türkmen — Full Stack Developer"
      : "Jhun | Ceyhun Türkmen — Full Stack Developer",
    description: isEn
      ? "Personal portfolio of Ceyhun Türkmen, a Full Stack Developer who has independently architected and shipped 8+ commercial platforms with Next.js, ASP.NET Core, and Node.js."
      : "Ceyhun Türkmen'in kişisel portfolyo sitesi — bağımsız olarak 8'den fazla ticari platform mimarisini kurup yayına almış Full Stack Developer. Next.js, ASP.NET Core ve Node.js.",
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        "tr-TR": `${BASE_URL}/tr`,
        "en-US": `${BASE_URL}/en`,
        "x-default": BASE_URL,
      },
    },
    openGraph: {
      url: `${BASE_URL}/${locale}`,
    },
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;

  return (
    <div>
      <Navbar locale={locale} />
      <Heroes locale={locale} />
      <Banner locale={locale} />

      <Gallery locale={locale} />
      <Github locale={locale} />

      <About locale={locale} />

      <Testimonials locale={locale} />
      <ContactSection locale={locale} />
      <Footer locale={locale} />
    </div>
  );
}
