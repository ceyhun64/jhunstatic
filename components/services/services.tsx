import { getDictionary } from "@/lib/get-dictionary";
import ServicesClient from "./servicesClient";

type Props = {
  locale: "tr" | "en";
};

const Services = async ({ locale }: Props) => {
  const dictAll = await getDictionary(locale);
  const dict = dictAll.services;

  return <ServicesClient dict={dict} />;
};

export default Services;
