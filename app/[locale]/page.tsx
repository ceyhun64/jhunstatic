import Navbar from "@/components/layout/navbar";
import Heroes from "@/components/home/heroes";
import Banner from "@/components/home/banner";
import About from "@/components/home/about";
import ContactSection from "@/components/home/contact";
import Footer from "@/components/layout/footer";
import Gallery from "@/components/home/gallery";

type Props = {
  params: Promise<{ locale: "tr" | "en" }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;

  return (
    <div>
      <Navbar locale={locale} />
      <Heroes locale={locale} />
      <Banner locale={locale} />
      <Gallery locale={locale} />
      <About locale={locale} />
      <ContactSection locale={locale} />
      <Footer locale={locale} />
    </div>
  );
}
