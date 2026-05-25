import ClientLayoutWrapper from "@/components/layout/clientLayoutWrapper";
import ScrollToTopButton from "@/components/layout/scroll";
import { Toaster } from "sonner";
import SocialSidebar from "@/components/layout/socialSidebar";
import type { Metadata } from "next";
import Chatbot from "@/components/chatbot/chatBot";
import { ThemeProvider } from "@/components/layout/themeProvider";

const BASE_URL = "https://jhun.com.tr";
const LOCALES = ["tr", "en"] as const;
type Locale = (typeof LOCALES)[number];

type Props = {
  params: Promise<{ locale: string }>;
};

const seoContent: Record<
  Locale,
  {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    keywords: string[];
  }
> = {
  tr: {
    title: "Jhun | Ceyhun Türkmen — Full Stack Web Geliştirici",
    description:
      "Ceyhun Türkmen — React, Next.js, TypeScript ve Node.js ile kurumsal web siteleri, e-ticaret ve özel dijital çözümler üretir. Uşak merkezli, uzaktan çalışan senior developer.",
    ogTitle: "Jhun | Full Stack Web Geliştirici",
    ogDescription:
      "React, Next.js ve TypeScript ile modern, hızlı ve ölçeklenebilir web uygulamaları. Uşak merkezli, uzaktan çalışan senior developer.",
    keywords: [
      "web tasarım",
      "web geliştirme",
      "freelance developer",
      "kurumsal web sitesi",
      "react developer",
      "next.js developer",
      "typescript developer",
      "node.js developer",
      "dijital çözümler",
      "Ceyhun Türkmen",
      "full stack developer",
      "senior developer",
      "türkiye web ajansı",
      "yazılım mühendisi",
    ],
  },
  en: {
    title: "Jhun | Ceyhun Türkmen — Full Stack Web Developer",
    description:
      "Ceyhun Türkmen — builds corporate websites, e-commerce and custom digital solutions with React, Next.js, TypeScript and Node.js. Senior developer based in Uşak, Turkey.",
    ogTitle: "Jhun | Full Stack Web Developer",
    ogDescription:
      "Modern, fast and scalable web applications with React, Next.js and TypeScript. Senior developer based in Uşak, Turkey — available remotely.",
    keywords: [
      "web design",
      "web development",
      "freelance developer",
      "corporate website",
      "react developer",
      "next.js developer",
      "typescript developer",
      "node.js developer",
      "digital solutions",
      "Ceyhun Türkmen",
      "full stack developer",
      "senior developer",
      "software engineer",
      "web agency turkey",
    ],
  },
};

function toLocale(raw: string): Locale {
  return LOCALES.includes(raw as Locale) ? (raw as Locale) : "tr";
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const l = toLocale(locale);
  const c = seoContent[l];
  const canonicalUrl = `${BASE_URL}/${l}`;
  const ogImageUrl = `${BASE_URL}/og-image.webp`;

  return {
    title: {
      default: c.title,
      template: `%s | Ceyhun Türkmen`,
    },
    description: c.description,
    keywords: c.keywords,
    authors: [{ name: "Ceyhun Türkmen", url: BASE_URL }],
    creator: "Ceyhun Türkmen",
    publisher: "Jhun",
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "tr-TR": `${BASE_URL}/tr`,
        "en-US": `${BASE_URL}/en`,
        "x-default": BASE_URL,
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
          type: "image/webp",
        },
      ],
      locale: l === "tr" ? "tr_TR" : "en_US",
      type: "profile",
      firstName: "Ceyhun",
      lastName: "Türkmen",
      username: "jhun",
    },
    twitter: {
      card: "summary_large_image",
      title: c.ogTitle,
      description: c.ogDescription,
      images: [ogImageUrl],
      creator: "@jhundev",
      site: "@jhundev",
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
  const l = toLocale(locale);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BASE_URL}/#person`,
    name: "Ceyhun Türkmen",
    givenName: "Ceyhun",
    familyName: "Türkmen",
    url: BASE_URL,
    image: {
      "@type": "ImageObject",
      url: `${BASE_URL}/og-image.webp`,
      width: 1200,
      height: 630,
    },
    jobTitle: "Senior Full Stack Developer",
    description:
      l === "tr"
        ? "React, Next.js, TypeScript, Node.js ve .NET ile 5+ yıl deneyimli Full Stack Web Geliştirici."
        : "Full Stack Web Developer with 5+ years of experience in React, Next.js, TypeScript, Node.js and .NET.",
    sameAs: [
      "https://github.com/ceyhun64",
      "https://www.linkedin.com/in/ceyhun-t%C3%BCrkmen-14882a26a/",
    ],
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "PostgreSQL",
      ".NET",
      "C#",
      "Redis",
      "Tailwind CSS",
      "Prisma ORM",
      "REST API",
      "Full Stack Web Development",
      "Software Engineering",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Uşak",
      addressRegion: "Uşak",
      addressCountry: "TR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+90-554-149-6377",
      contactType: "customer service",
      availableLanguage: ["Turkish", "English"],
    },
    knowsLanguage: [
      { "@type": "Language", name: "Turkish" },
      { "@type": "Language", name: "English" },
    ],
    worksFor: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#org`,
      name: "Jhun",
      url: BASE_URL,
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    name: "Jhun",
    alternateName: "Ceyhun Türkmen Portfolio",
    url: BASE_URL,
    description:
      l === "tr"
        ? "Ceyhun Türkmen'in kişisel portfolyo ve web geliştirme sitesi"
        : "Ceyhun Türkmen's personal portfolio and web development website",
    inLanguage: [l === "tr" ? "tr-TR" : "en-US"],
    author: { "@id": `${BASE_URL}/#person` },
    publisher: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#org`,
      name: "Jhun",
      url: BASE_URL,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/tr/projects?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([personSchema, websiteSchema]),
        }}
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
