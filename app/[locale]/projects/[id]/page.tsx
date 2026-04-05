// app/[locale]/projects/[id]/page.tsx
import ProjectDetail from "@/components/projects/projectDetail";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

type Props = {
  params: Promise<{ locale: "tr" | "en"; id: string }>;
};

export default async function Page({ params }: Props) {
  const { locale, id } = await params;
  return (
    <div>
      <Navbar locale={locale} />
      <ProjectDetail locale={locale} id={id} />
      <Footer locale={locale} />
    </div>
  );
}
