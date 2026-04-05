// gallery.tsx (server)
import GalleryClient from "./galleryClient";
import { getDictionary } from "@/lib/get-dictionary";
import { getAllProjects } from "@/lib/staticData";

type Props = { locale: "tr" | "en" };

export default async function Gallery({ locale }: Props) {
  const dictAll = await getDictionary(locale);
  const dict = dictAll.gallery;
  const projects = getAllProjects();

  return <GalleryClient dict={dict} locale={locale} projects={projects} />;
}
