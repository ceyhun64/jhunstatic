// blogDetail.tsx (server)
import BlogDetailClient from "./blogDetailClient";
import { getDictionary } from "@/lib/get-dictionary";
import { getBlogById } from "@/lib/staticData";
import { notFound } from "next/navigation";

export default async function BlogDetail({
  locale,
  id,
}: {
  locale: "tr" | "en";
  id: string;
}) {
  const dictAll = await getDictionary(locale);
  const blog = getBlogById(id);
  if (!blog) notFound();
  return (
    <BlogDetailClient dict={dictAll.blogDetail} locale={locale} blog={blog} />
  );
}
