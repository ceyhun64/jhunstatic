// app/[locale]/blogs/[id]/page.tsx
import Navbar from "@/components/layout/navbar";
import BlogDetail from "@/components/blog/blogDetail";
import Footer from "@/components/layout/footer";

type Props = {
  params: { locale: "tr" | "en"; id: string };
};

export default async function BlogDetailPage({ params }: Props) {
  const { locale, id } = await params;
  return (
    <div>
      <Navbar locale={locale} />
      <BlogDetail locale={locale} id={id} />
      <Footer locale={locale} />
    </div>
  );
}
