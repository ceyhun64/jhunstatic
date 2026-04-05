// projectsServer.tsx (projectDetail.tsx değil)
import ProjectsClient from "./projectsClient";
import { getDictionary } from "@/lib/get-dictionary";
import { getAllProjects } from "@/lib/staticData";

type Props = { locale: "tr" | "en" };

export default async function ProjectsServer({ locale }: Props) {
  const dictAll = await getDictionary(locale);
  const dict = dictAll.projects;
  const projects = getAllProjects();

  return <ProjectsClient dict={dict} locale={locale} projects={projects} />;
}
