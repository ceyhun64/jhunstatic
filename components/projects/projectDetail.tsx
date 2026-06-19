import ProjectDetailClient from "./projectDetailClient";
import { getDictionary } from "@/lib/get-dictionary";
import { getProjectById, getAllProjects } from "@/lib/staticData";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";

type Props = {
  locale: "tr" | "en";
  id: string; // page.tsx'den gelmeli
};

// Veri dosyasında yolu tanımlı olsa da diskte gerçekten var olmayan
// görseller (bkz. sub1-5.png) için 404 istemeyelim.
function existingImage(src?: string | null) {
  if (!src) return null;
  return fs.existsSync(path.join(process.cwd(), "public", src)) ? src : null;
}

export default async function ProjectDetail({ locale, id }: Props) {
  const dictAll = await getDictionary(locale);
  const dict = dictAll.projectdetail;
  const project = getProjectById(id);

  if (!project) notFound();

  const safeProject = {
    ...project,
    subImage1: existingImage(project.subImage1),
    subImage2: existingImage(project.subImage2),
    subImage3: existingImage(project.subImage3),
    subImage4: existingImage(project.subImage4),
    subImage5: existingImage(project.subImage5),
  };

  return (
    <ProjectDetailClient dict={dict} locale={locale} project={safeProject} />
  );
}