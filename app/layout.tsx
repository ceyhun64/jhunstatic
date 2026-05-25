import type { Metadata } from "next";
import { Orbitron, Space_Grotesk } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const mainFont = Orbitron({
  subsets: ["latin"],
  variable: "--font-main",
  display: "swap",
  preload: true,
});

const bodyFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jhun.com.tr"),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const h = await headers();
  const locale = h.get("x-locale") ?? "tr";

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${mainFont.variable} ${bodyFont.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
