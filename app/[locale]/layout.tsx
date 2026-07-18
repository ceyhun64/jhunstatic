import ClientLayoutWrapper from "@/components/layout/clientLayoutWrapper";
import ScrollToTopButton from "@/components/layout/scroll";
import { Toaster } from "sonner";
import SocialSidebar from "@/components/layout/socialSidebar";
import type { Metadata } from "next";
import Chatbot from "@/components/chatbot/chatBot";
import { ThemeProvider } from "@/components/layout/themeProvider";
import CookieConsent from "@/components/layout/cookieConsent";
import { getDictionary } from "@/lib/get-dictionary";

const BASE_URL = "https://www.jhun.com.tr";
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
    title: "Jhun | Ceyhun Türkmen — Full Stack Developer",
    description:
      "Ceyhun Türkmen — Next.js, ASP.NET Core ve Node.js ile production-grade sistemler kuran full stack yazılım mühendisi. Bağımsız olarak 8'den fazla ticari platform mimarisini kurdu. Türkiye merkezli, uzaktan çalışmaya açık.",
    ogTitle: "Jhun | Full Stack Developer",
    ogDescription:
      "Next.js, ASP.NET Core ve Node.js ile production-grade, ölçeklenebilir sistemler. Türkiye merkezli full stack developer — uzaktan çalışmaya açık.",
    keywords: [
      "full stack developer",
      "full stack yazılım mühendisi",
      "react developer",
      "next.js developer",
      "typescript developer",
      "node.js developer",
      "asp.net core developer",
      "yazılım mühendisi",
      "Ceyhun Türkmen",
      "software engineer türkiye",
      "uzaktan yazılım geliştirici",
    ],
  },
  en: {
    title: "Jhun | Ceyhun Türkmen — Full Stack Developer",
    description:
      "Ceyhun Türkmen — full stack software engineer building production-grade systems with Next.js, ASP.NET Core, and Node.js. Independently architected and shipped 8+ commercial platforms. Based in Turkey, open to remote.",
    ogTitle: "Jhun | Full Stack Developer",
    ogDescription:
      "Production-grade, scalable systems built with Next.js, ASP.NET Core, and Node.js. Full stack developer based in Turkey — open to remote roles.",
    keywords: [
      "full stack developer",
      "software engineer",
      "react developer",
      "next.js developer",
      "typescript developer",
      "node.js developer",
      "asp.net core developer",
      "Ceyhun Türkmen",
      "software engineer turkey",
      "remote software engineer",
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
  const ogImageUrl = `${BASE_URL}/og-image.png`;

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
        "x-default": `${BASE_URL}/tr`,
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
  const dict = await getDictionary(l);

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
      url: `${BASE_URL}/og-image.png`,
      width: 1200,
      height: 630,
    },
    jobTitle: "Full Stack Developer",
    description:
      l === "tr"
        ? "Next.js, ASP.NET Core ve Node.js ile production-grade sistemler kuran Full Stack Software Engineer. Bağımsız olarak 8'den fazla ticari platform mimarisini kurdu."
        : "Full Stack Software Engineer building production-grade systems with Next.js, ASP.NET Core, and Node.js. Independently architected and shipped 8+ commercial platforms.",
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
      "ASP.NET Core",
      "PostgreSQL",
      "MySQL",
      "C#",
      "Redis",
      "SignalR",
      "Clean Architecture",
      "CQRS",
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
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-9999 focus:rounded-lg focus:bg-amber-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black"
      >
        {l === "tr" ? "Içeriğe geç" : "Skip to content"}
      </a>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ClientLayoutWrapper locale={locale}>
          <main id="main-content">{children}</main>
          <Chatbot />
        </ClientLayoutWrapper>

        <SocialSidebar />
        <ScrollToTopButton />
        <CookieConsent dict={dict.cookieConsent} locale={l} />
        <Toaster
          richColors
          position="bottom-right"
          toastOptions={{ style: { zIndex: 9999 } }}
        />
      </ThemeProvider>
    </>
  );
}
