import ProjectDetailClient from "./projectDetailClient";
import { getDictionary } from "@/lib/get-dictionary";
import { getProjectById, getAllProjects } from "@/lib/staticData";
import { notFound } from "next/navigation";

type Props = {
  locale: "tr" | "en";
  id: string; // page.tsx'den gelmeli
};

export default async function ProjectDetail({ locale, id }: Props) {
  const dictAll = await getDictionary(locale);
  const dict = dictAll.projectdetail;
  const project = getProjectById(id);

  if (!project) notFound();

  return <ProjectDetailClient dict={dict} locale={locale} project={project} />;
}