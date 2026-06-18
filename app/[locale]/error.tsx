"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Home, RefreshCcw, AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams();
  const locale = (params?.locale as string) || "tr";
  const isEn = locale === "en";

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-linear-to-b from-black via-slate-950 to-black text-white px-6 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <AlertTriangle className="w-20 h-20 text-red-400 mb-4" />
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
            <span className="relative inline-block">
              <span className="absolute inset-0 blur-2xl bg-linear-to-r from-red-500 to-orange-500 opacity-50" />
              <span className="relative bg-linear-to-r from-red-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
                {isEn ? "Something went wrong" : "Bir şeyler ters gitti"}
              </span>
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 space-y-3"
        >
          <p className="text-lg text-slate-400 max-w-md mx-auto">
            {isEn
              ? "An unexpected error occurred while loading this page. You can try again or return to the homepage."
              : "Bu sayfa yüklenirken beklenmeyen bir hata oluştu. Tekrar deneyebilir veya anasayfaya dönebilirsiniz."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            onClick={() => reset()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 rounded-full bg-linear-to-r from-red-600 to-orange-600 text-white font-semibold text-lg shadow-lg shadow-red-500/50 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <RefreshCcw className="w-5 h-5" />
              {isEn ? "Try Again" : "Tekrar Dene"}
            </span>
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-orange-600 to-red-600"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <Link href={`/${locale}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white font-semibold text-lg hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <Home className="w-5 h-5" />
              {isEn ? "Go Home" : "Anasayfaya Dön"}
            </motion.button>
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-32 bg-linear-to-t from-black to-transparent pointer-events-none" />
    </div>
  );
}
