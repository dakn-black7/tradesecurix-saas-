import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TradeSecurix — Verify Companies. Analyze Risk. Trade with Confidence.",
  description:
    "TradeSecurix helps traders and analysts verify counterparties and analyze documents through structured risk reports before making financial decisions.",
  keywords: ["trade", "risk analysis", "document verification", "company verification", "fraud detection"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className="min-h-screen bg-white antialiased">{children}</body>
    </html>
  );
}
