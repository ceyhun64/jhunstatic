// github.tsx (server)
import GithubClient from "./githubClient";
import { getDictionary } from "@/lib/get-dictionary";
import { getGithubShowcase } from "@/lib/github";

type Props = { locale: "tr" | "en" };

export default async function Github({ locale }: Props) {
  const dictAll = await getDictionary(locale);
  const dict = dictAll.github;
  const showcase = await getGithubShowcase();

  return <GithubClient dict={dict} showcase={showcase} />;
}
