import { getDictionary } from "@/lib/get-dictionary";
import { getAllTechnologies } from "@/lib/staticData";
import AboutClient from "./aboutClient";

type Props = {
  locale: "tr" | "en";
};

const About = async ({ locale }: Props) => {
  const dictAll = await getDictionary(locale);
  const dict = dictAll.about;
  const technologies = getAllTechnologies();

  return <AboutClient dict={dict} locale={locale} technologies={technologies} />;
};

export default About;
