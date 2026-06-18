import { getDictionary } from "@/lib/get-dictionary";
import TestimonialsClient from "./testimonialsClient";

type Props = {
  locale: "tr" | "en";
};

const Testimonials = async ({ locale }: Props) => {
  const dictAll = await getDictionary(locale);
  const dict = dictAll.testimonials;

  return <TestimonialsClient dict={dict} />;
};

export default Testimonials;
