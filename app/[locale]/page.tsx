import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Heroes from "@/components/home/heroes";
import Banner from "@/components/home/banner";
import About from "@/components/home/about";
import ContactSection from "@/components/home/contact";
import Footer from "@/components/layout/footer";
import Gallery from "@/components/home/gallery";
import Testimonials from "@/components/home/testimonials";

const BASE_URL = "https://jhun.com.tr";

type Props = {
  params: Promise<{ locale: "tr" | "en" }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  return {
    title: isEn
      ? "Jhun | Ceyhun Türkmen — Full Stack Web Developer"
      : "Jhun | Ceyhun Türkmen — Full Stack Web Geliştirici",
    description: isEn
      ? "Personal portfolio of Ceyhun Türkmen. Modern, fast and scalable web solutions built with React, Next.js and TypeScript."
      : "Ceyhun Türkmen'in kişisel portfolyo sitesi. React, Next.js ve TypeScript ile modern, hızlı ve ölçeklenebilir web çözümleri.",
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
      <About locale={locale} />
      <Testimonials locale={locale} />
      <ContactSection locale={locale} />
      <Footer locale={locale} />
    </div>
  );
}
