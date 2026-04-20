"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { FileText, CheckCircle, AlertTriangle, Building2, ArrowRight } from "lucide-react";

export default function DemoSection() {
  const t = useTranslations("demo");
  const locale = useLocale();

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">{t("title")}</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Document Scan Demo */}
          <div className="relative rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-slate-900">{t("docScan")}</h3>
              </div>
              <span className="text-[10px] font-bold tracking-widest bg-amber-100 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full uppercase">
                {t("docScanLabel")}
              </span>
            </div>

            {/* File Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">{t("fileName")}</p>
                  <p className="text-xs text-slate-400">PDF · 142 KB</p>
                </div>
                <span className="ml-auto text-xs font-semibold bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full">
                  {t("fileStatus")}
                </span>
              </div>

              <div className="space-y-2">
                {[t("metaCheck"), t("structureCheck")].map((check) => (
                  <div key={check} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>{check}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href={`/${locale}/sign-up`}
              className="flex items-center justify-center gap-2 w-full text-sm font-semibold text-blue-600 border border-blue-200 bg-blue-50 hover:bg-blue-100 px-4 py-2.5 rounded-lg transition-colors"
            >
              {t("tryOwn")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Company Verification Demo */}
          <div className="relative rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-slate-900">{t("companyVerif")}</h3>
              </div>
              <span className="text-[10px] font-bold tracking-widest bg-amber-100 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full uppercase">
                {t("companyVerifLabel")}
              </span>
            </div>

            {/* Company Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{t("companyName")}</p>
                  <p className="text-xs text-slate-400 mt-0.5">Risk Assessment Report</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-amber-600">{t("riskScore")}</p>
                  <span className="text-xs font-semibold bg-amber-100 text-amber-700 px-2.5 py-0.5 rounded-full">
                    {t("riskStatus")}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                {[t("flag1"), t("flag2")].map((flag) => (
                  <div key={flag} className="flex items-center gap-2 text-sm text-slate-600">
                    <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span>{flag}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href={`/${locale}/sign-up`}
              className="flex items-center justify-center gap-2 w-full text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 px-4 py-2.5 rounded-lg transition-colors shadow-sm"
            >
              {t("unlockFull")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
