import dynamic from "next/dynamic";
import { getDictionary } from "@/lib/get-dictionary";

// Code-split: below the fold, pulls in react-fast-marquee separately from
// the main bundle.
const TestimonialsClient = dynamic(() => import("./testimonialsClient"));

type Props = {
  locale: "tr" | "en";
};

const Testimonials = async ({ locale }: Props) => {
  const dictAll = await getDictionary(locale);
  const dict = dictAll.testimonials;

  return <TestimonialsClient dict={dict} />;
};

export default Testimonials;
