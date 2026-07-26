// github.tsx (server)
import dynamic from "next/dynamic";
import { getDictionary } from "@/lib/get-dictionary";
import { getGithubShowcase } from "@/lib/github";

// Code-split: this pulls in the Starfield canvas (300 particles) + 3d-card
// tilt handlers, below the fold on every page that renders it. Splitting it
// out of the shared bundle cuts main-thread parse/exec work on initial load.
const GithubClient = dynamic(() => import("./githubClient"));

type Props = { locale: "tr" | "en" };

export default async function Github({ locale }: Props) {
  const dictAll = await getDictionary(locale);
  const dict = dictAll.github;
  const showcase = await getGithubShowcase();

  return <GithubClient dict={dict} showcase={showcase} />;
}
