"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, Play, ShieldCheck } from "lucide-react";

export default function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white pt-16 pb-24">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-8">
            <ShieldCheck className="w-4 h-4" />
            <span>{t("trustedBy")}</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight tracking-tight mb-6">
            {t("headline")}
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto mb-10">
            {t("subheadline")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/${locale}/reports/sample`}
              className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              <Play className="w-4 h-4" />
              {t("ctaPrimary")}
            </Link>
            <Link
              href={`/${locale}/sign-up`}
              className="inline-flex items-center gap-2 bg-white border border-slate-300 text-slate-700 font-semibold px-6 py-3 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all"
            >
              {t("ctaSecondary")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Dashboard Mock Preview */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="relative rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
            {/* Fake browser bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-100 border-b border-slate-200">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <div className="ml-4 flex-1 bg-white rounded-md px-3 py-1 text-xs text-slate-400 border border-slate-200">
                app.tradesecurix.com/dashboard
              </div>
            </div>
            {/* Mock Dashboard Content */}
            <div className="bg-slate-50 p-6 min-h-64">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Total Analyses", value: "148", color: "text-blue-600" },
                  { label: "Risk Alerts", value: "12", color: "text-amber-600" },
                  { label: "Verified Companies", value: "37", color: "text-emerald-600" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                    <p className="text-xs text-slate-500 mb-1">{stat.label}</p>
                    <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                <p className="text-sm font-semibold text-slate-700 mb-3">Recent Reports</p>
                {[
                  { name: "Meridian Import Co.", score: 82, status: "Low Risk", badge: "bg-emerald-100 text-emerald-700" },
                  { name: "Apex Trade LLC", score: 61, status: "Medium Risk", badge: "bg-amber-100 text-amber-700" },
                  { name: "invoice_2024_Q1.pdf", score: null, status: "Valid", badge: "bg-blue-100 text-blue-700" },
                ].map((row) => (
                  <div key={row.name} className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
                    <span className="text-sm text-slate-700">{row.name}</span>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${row.badge}`}>{row.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-slate-400 mt-3">Dashboard preview — sample data only</p>
        </div>
      </div>
    </section>
  );
}
