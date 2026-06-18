import { getDictionary } from "@/lib/get-dictionary";
import FaqClient from "./faqClient";

type Props = {
  locale: "tr" | "en";
};

const Faq = async ({ locale }: Props) => {
  const dictAll = await getDictionary(locale);
  const dict = dictAll.faq;

  return <FaqClient dict={dict} />;
};

export default Faq;
