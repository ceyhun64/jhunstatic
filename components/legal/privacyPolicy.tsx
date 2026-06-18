import { getDictionary } from "@/lib/get-dictionary";
import LegalDocumentClient from "./legalDocumentClient";

type Props = {
  locale: "tr" | "en";
};

const PrivacyPolicy = async ({ locale }: Props) => {
  const dictAll = await getDictionary(locale);
  const dict = dictAll.privacyPolicy;

  return <LegalDocumentClient dict={dict} accent="slate" />;
};

export default PrivacyPolicy;
