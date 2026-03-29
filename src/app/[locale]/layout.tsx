import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { Plausible } from "@/components/ui/Plausible";
import { notFound } from "next/navigation";
import { locales } from "@/lib/i18n";
import "@/app/globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ITMM — Your Business. Online. Finally.",
  description:
    "Professional websites and digital marketing for small businesses. Two specialists, one brand.",
  metadataBase: new URL("https://itmm.pro"),
  openGraph: {
    title: "ITMM — Your Business. Online. Finally.",
    description:
      "Professional websites and digital marketing for small businesses. Two specialists, one brand.",
    url: "https://itmm.pro",
    siteName: "ITMM",
    locale: "en",
    type: "website",
    images: [
      {
        url: "/images/og-preview.jpg",
        width: 1200,
        height: 630,
        alt: "ITMM — Digital Agency",
      },
    ],
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${syne.variable} ${inter.variable} antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-[var(--bg-primary)] text-[var(--text-primary)] font-[family-name:var(--font-body)]">
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
        <Plausible />
      </body>
    </html>
  );
}
