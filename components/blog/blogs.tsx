// blogsServer.tsx
import BlogsClient from "./blogsClient";
import { getDictionary } from "@/lib/get-dictionary";
import { getAllBlogs } from "@/lib/staticData";

export default async function BlogsServer({ locale }: { locale: "tr" | "en" }) {
  const dictAll = await getDictionary(locale);
  const blogs = getAllBlogs();
  return <BlogsClient dict={dictAll.blogs} locale={locale} blogs={blogs} />;
}
