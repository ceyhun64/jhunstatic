import dynamic from "next/dynamic";
import { getDictionary } from "@/lib/get-dictionary";

// Code-split: this section pulls in FireworksBackground, SparklesCore and
// PixelImage — all below the fold. Splitting it out of the shared bundle
// cuts main-thread parse/exec work on initial load.
const AboutClient = dynamic(() => import("./aboutClient"));

type Props = {
  locale: "tr" | "en";
};

const About = async ({ locale }: Props) => {
  const dictAll = await getDictionary(locale);
  const dict = dictAll.aboutHome;

  return <AboutClient dict={dict} locale={locale} />;
};

export default About;
