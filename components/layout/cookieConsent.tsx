"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "jhun_cookie_consent";

interface Props {
  dict: {
    message: string;
    acceptLabel: string;
    declineLabel: string;
    policyLinkLabel: string;
  };
  locale: string;
}

export default function CookieConsent({ dict, locale }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = window.localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleChoice = (value: "accepted" | "declined") => {
    window.localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4 }}
          role="dialog"
          aria-label={dict.policyLinkLabel}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-[998] rounded-2xl border border-border dark:border-white/10 bg-white/95 dark:bg-black/90 backdrop-blur-xl shadow-2xl p-5"
        >
          <div className="flex items-start gap-3">
            <Cookie className="h-5 w-5 mt-0.5 shrink-0 text-amber-500" />
            <p className="text-sm text-gray-700 dark:text-white/80 leading-relaxed">
              {dict.message}{" "}
              <Link
                href={`/${locale}/privacy-policy`}
                className="underline hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              >
                {dict.policyLinkLabel}
              </Link>
            </p>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleChoice("declined")}
              className="text-gray-600 dark:text-white/70"
            >
              {dict.declineLabel}
            </Button>
            <Button
              size="sm"
              onClick={() => handleChoice("accepted")}
              className="bg-amber-600 hover:bg-amber-500 text-white"
            >
              {dict.acceptLabel}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
