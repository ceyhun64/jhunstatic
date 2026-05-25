import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import BlogDetail from "@/components/blog/blogDetail";
import Footer from "@/components/layout/footer";
import blogs from "@/data/blogs.json";

const BASE_URL = "https://jhun.com.tr";

type Props = {
  params: Promise<{ locale: "tr" | "en"; id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return {
      title: locale === "en" ? "Post Not Found" : "Yazı Bulunamadı",
    };
  }

  const isEn = locale === "en";
  const title = isEn ? blog.titleEng || blog.title : blog.title;
  const description = isEn
    ? blog.summaryEng || blog.summary
    : blog.summary;
  const imageUrl = blog.image
    ? `${BASE_URL}${blog.image}`
    : `${BASE_URL}/og-image.webp`;

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/blog/${id}`,
      languages: {
        "tr-TR": `${BASE_URL}/tr/blog/${id}`,
        "en-US": `${BASE_URL}/en/blog/${id}`,
        "x-default": `${BASE_URL}/tr/blog/${id}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}/blog/${id}`,
      type: "article",
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt,
      authors: ["Ceyhun Türkmen"],
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { locale, id } = await params;
  const blog = blogs.find((b) => b.id === id);

  const isEn = locale === "en";
  const title = blog ? (isEn ? blog.titleEng || blog.title : blog.title) : "";
  const imageUrl =
    blog?.image ? `${BASE_URL}${blog.image}` : `${BASE_URL}/og-image.webp`;

  const articleSchema = blog
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description: isEn
          ? blog.summaryEng || blog.summary
          : blog.summary,
        image: imageUrl,
        url: `${BASE_URL}/${locale}/blog/${id}`,
        datePublished: blog.createdAt,
        dateModified: blog.updatedAt,
        author: {
          "@type": "Person",
          "@id": `${BASE_URL}/#person`,
          name: "Ceyhun Türkmen",
          url: BASE_URL,
        },
        publisher: {
          "@type": "Organization",
          "@id": `${BASE_URL}/#org`,
          name: "Jhun",
          url: BASE_URL,
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${BASE_URL}/${locale}/blog/${id}`,
        },
        inLanguage: locale === "tr" ? "tr-TR" : "en-US",
      }
    : null;

  return (
    <>
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
      <div>
        <Navbar locale={locale} />
        <BlogDetail locale={locale} id={id} />
        <Footer locale={locale} />
      </div>
    </>
  );
}
