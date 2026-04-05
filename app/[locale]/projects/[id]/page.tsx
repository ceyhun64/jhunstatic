// app/[locale]/projects/[id]/page.tsx
import ProjectDetail from "@/components/projects/projectDetail";

type Props = {
  params: Promise<{ locale: "tr" | "en"; id: string }>;
};

export default async function Page({ params }: Props) {
  const { locale, id } = await params;
  return <ProjectDetail locale={locale} id={id} />;
}
