import dynamic from "next/dynamic";
import { getDictionary } from "@/lib/get-dictionary";

// Code-split: below the fold, pulls in ShootingStars + react-hook-form/zod
// validation separately from the main bundle.
const ContactClient = dynamic(() => import("./contactClient"));

interface ContactProps {
  locale: "tr" | "en";
  title?: string;
  description?: string;
  email?: string;
  web?: { label: string; url: string };
}

export default async function Contact({
  locale,
  email = "jhuntechofficial@gmail.com",
}: ContactProps) {
  const dictAll = await getDictionary(locale);
  const dict = dictAll.contact;

  return <ContactClient dict={dict} email={email} />;
}
