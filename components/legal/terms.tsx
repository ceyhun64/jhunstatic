import { getDictionary } from "@/lib/get-dictionary";
import LegalDocumentClient from "./legalDocumentClient";

type Props = {
  locale: "tr" | "en";
};

const Terms = async ({ locale }: Props) => {
  const dictAll = await getDictionary(locale);
  const dict = dictAll.terms;

  return <LegalDocumentClient dict={dict} accent="slate" />;
};

export default Terms;
