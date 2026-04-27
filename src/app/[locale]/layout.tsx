import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ClerkProvider } from "@clerk/nextjs";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";

type Locale = "en" | "es" | "fr" | "ar";

export const metadata: Metadata = {
  title: "TradeSecurix — Verify Companies. Analyze Risk.",
  description:
    "TradeSecurix helps traders and analysts verify counterparties and analyze documents through structured risk reports.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <ClerkProvider afterSignOutUrl="/">
      <NextIntlClientProvider messages={messages}>
        <div lang={locale} dir={dir} className="min-h-screen flex flex-col">
          {children}
        </div>
      </NextIntlClientProvider>
    </ClerkProvider>
  );
}
