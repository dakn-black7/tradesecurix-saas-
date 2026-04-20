"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Check, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type Plan = {
  key: "basic" | "pro" | "enterprise";
  popular: boolean;
  ctaKey: "ctaStart" | "ctaContact";
};

const PLANS: Plan[] = [
  { key: "basic", popular: false, ctaKey: "ctaStart" },
  { key: "pro", popular: true, ctaKey: "ctaStart" },
  { key: "enterprise", popular: false, ctaKey: "ctaContact" },
];

const COMPARISON_ROWS = [
  { label: "Document scans/month", basic: "10–20", pro: "Unlimited", enterprise: "Unlimited" },
  { label: "Document fraud detection", basic: false, pro: true, enterprise: true },
  { label: "Company verification", basic: false, pro: true, enterprise: true },
  { label: "Risk scoring", basic: false, pro: true, enterprise: true },
  { label: "PDF report download", basic: false, pro: true, enterprise: true },
  { label: "API access", basic: false, pro: false, enterprise: true },
  { label: "Custom reports", basic: false, pro: false, enterprise: true },
  { label: "Priority support", basic: false, pro: true, enterprise: true },
  { label: "Dedicated account manager", basic: false, pro: false, enterprise: true },
];

function CellValue({ value }: { value: boolean | string }) {
  if (typeof value === "string") return <span className="text-sm text-slate-700">{value}</span>;
  return value ? (
    <Check className="w-5 h-5 text-emerald-500 mx-auto" />
  ) : (
    <X className="w-4 h-4 text-slate-300 mx-auto" />
  );
}

export default function PricingSection() {
  const t = useTranslations("pricing");
  const locale = useLocale();

  return (
    <section id="pricing" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Zap className="w-4 h-4" />
            <span>Avoid costly fraud before it happens</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">{t("title")}</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">{t("subtitle")}</p>
          <p className="mt-3 text-sm font-medium text-blue-600">{t("trial")}</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
          {PLANS.map(({ key, popular, ctaKey }) => (
            <div
              key={key}
              className={cn(
                "relative rounded-2xl border p-8 flex flex-col",
                popular
                  ? "border-blue-500 bg-blue-600 text-white shadow-xl scale-105"
                  : "border-slate-200 bg-white shadow-sm"
              )}
            >
              {popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-xs font-bold px-4 py-1.5 rounded-full shadow-md tracking-wide">
                  {t("popular")}
                </div>
              )}

              <div className="mb-6">
                <h3 className={cn("text-xl font-bold mb-2", popular ? "text-white" : "text-slate-900")}>
                  {t(`${key}.name`)}
                </h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className={cn("text-4xl font-extrabold", popular ? "text-white" : "text-slate-900")}>
                    ${t(`${key}.price`)}
                  </span>
                  <span className={cn("text-sm", popular ? "text-blue-200" : "text-slate-400")}>{t("monthly")}</span>
                </div>
                <p className={cn("text-sm", popular ? "text-blue-100" : "text-slate-500")}>{t(`${key}.desc`)}</p>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {(t.raw(`${key}.features`) as string[]).map((feature: string) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check className={cn("w-4 h-4 mt-0.5 flex-shrink-0", popular ? "text-blue-200" : "text-emerald-500")} />
                    <span className={cn("text-sm", popular ? "text-blue-50" : "text-slate-600")}>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={key === "enterprise" ? `mailto:contact@tradesecurix.com` : `/${locale}/sign-up`}
                className={cn(
                  "block text-center font-semibold px-6 py-3 rounded-xl transition-all",
                  popular
                    ? "bg-white text-blue-600 hover:bg-blue-50 shadow-md"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                )}
              >
                {t(ctaKey)}
              </Link>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="max-w-5xl mx-auto overflow-x-auto">
          <p className="text-center text-lg font-semibold text-slate-800 mb-6">Feature Comparison</p>
          <table className="w-full border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left py-3 px-5 text-sm font-semibold text-slate-600 w-1/2">Feature</th>
                <th className="py-3 px-4 text-center text-sm font-semibold text-slate-600">Basic</th>
                <th className="py-3 px-4 text-center text-sm font-bold text-blue-600 bg-blue-50">Pro</th>
                <th className="py-3 px-4 text-center text-sm font-semibold text-slate-600">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr key={row.label} className={cn("border-b border-slate-100", i % 2 === 0 ? "bg-white" : "bg-slate-50/50")}>
                  <td className="py-3 px-5 text-sm text-slate-700">{row.label}</td>
                  <td className="py-3 px-4 text-center"><CellValue value={row.basic} /></td>
                  <td className="py-3 px-4 text-center bg-blue-50/40"><CellValue value={row.pro} /></td>
                  <td className="py-3 px-4 text-center"><CellValue value={row.enterprise} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
