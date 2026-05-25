import "../globals.css";
import ClientLayoutWrapper from "@/components/layout/clientLayoutWrapper";
import ScrollToTopButton from "@/components/layout/scroll";
import { Toaster } from "sonner";
import SocialSidebar from "@/components/layout/socialSidebar";
import type { Metadata } from "next";
import Chatbot from "@/components/chatbot/chatBot";
import { ThemeProvider } from "@/components/layout/themeProvider";

const BASE_URL = "https://jhun.com.tr";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const ogLocale = locale === "tr" ? "tr_TR" : "en_US";
  const canonicalUrl = `${BASE_URL}/${locale}`;
  const ogImageUrl = `${BASE_URL}/og-image.webp`;

  const content = {
    tr: {
      title: "Jhun | Web Gelistirme & Dijital Çözümler",
      description:
        "Kurumsal web siteleri, e-ticaret, portföy ve özel dijital çözümler ile markanızı dijitalde büyütün.",
      ogTitle: "Jhun | Web Gelistirme Ajansı",
      ogDescription:
        "Modern, hızlı ve etkileyici web siteleriyle markanızı dijital dünyada öne çıkarın.",
      keywords: [
        "web tasarım",
        "web gelistirme",
        "freelance developer",
        "kurumsal web sitesi",
        "react developer",
        "next.js developer",
        "dijital çözümler",
        "Ceyhun Türkmen",
        "full stack developer",
        "türkiye web ajansı",
      ],
    },
    en: {
      title: "Jhun | Web Development & Digital Solutions",
      description:
        "Grow your brand digitally with corporate websites, e-commerce, portfolio and custom digital solutions.",
      ogTitle: "Jhun | Web Development Agency",
      ogDescription:
        "Stand out your brand in the digital world with modern, fast and impressive websites.",
      keywords: [
        "web design",
        "web development",
        "freelance developer",
        "corporate website",
        "react developer",
        "next.js developer",
        "digital solutions",
        "Ceyhun Türkmen",
        "full stack developer",
        "software engineer",
      ],
    },
  };

  const c = content[locale as keyof typeof content] ?? content.tr;

  return {
    metadataBase: new URL(BASE_URL),
    title: c.title,
    description: c.description,
    keywords: c.keywords,
    authors: [{ name: "Ceyhun Türkmen", url: BASE_URL }],
    creator: "Ceyhun Türkmen",
    publisher: "Jhun",
    alternates: {
      canonical: canonicalUrl,
      languages: {
        tr: `${BASE_URL}/tr`,
        en: `${BASE_URL}/en`,
      },
    },

    openGraph: {
      title: c.ogTitle,
      description: c.ogDescription,
      url: canonicalUrl,
      siteName: "Jhun",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: c.ogTitle,
        },
      ],
      locale: ogLocale,
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: c.ogTitle,
      description: c.ogDescription,
      images: [ogImageUrl],
      creator: "@jhundev",
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ceyhun Türkmen",
    url: BASE_URL,
    sameAs: [
      "https://github.com/ceyhun64",
      "https://linkedin.com/in/ceyhun-türkmen-14882a26a",
    ],
    jobTitle: "Full-Stack Web Developer",
    worksFor: { "@type": "Organization", name: "Jhun" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Usak",
      addressCountry: "TR",
    },
    knowsLanguage: ["tr", "en"],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+90-554-149-6377",
      contactType: "customer service",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ClientLayoutWrapper locale={locale}>
          <main>{children}</main>
          <Chatbot />
        </ClientLayoutWrapper>

        <SocialSidebar />
        <ScrollToTopButton />
        <Toaster
          richColors
          position="bottom-right"
          toastOptions={{ style: { zIndex: 9999 } }}
        />
      </ThemeProvider>
    </>
  );
}
