"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import {
  Download,
  Lock,
  Building2,
  ShieldAlert,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_REPORT = {
  companyName: "Meridian Import Co.",
  registrationNumber: "GB-20219874",
  country: "United Kingdom",
  industry: "Import / Export",
  riskScore: 82,
  status: "Low Risk",
  statusColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
  summary:
    "Meridian Import Co. is a registered entity in the United Kingdom with an established trading history. The analysis indicates a low-risk profile based on available registry data, financial exposure, and cross-border activity.",
  riskFactors: [
    { label: "Registry status", value: "Active — verified", type: "pass" as const },
    { label: "Director history", value: "Stable", type: "pass" as const },
    { label: "Cross-border exposure", value: "Moderate", type: "warn" as const },
    { label: "Filing consistency", value: "Up to date", type: "pass" as const },
    { label: "Adverse media signals", value: "None detected", type: "pass" as const },
  ],
  conclusion:
    "Based on available data, Meridian Import Co. presents a low-risk profile for trade engagement. Standard due diligence procedures are recommended before finalizing any commercial agreement.",
};

function RiskScoreGauge({ score }: { score: number }) {
  const color =
    score >= 80 ? "text-emerald-600" : score >= 50 ? "text-amber-600" : "text-red-600";
  const label = score >= 80 ? "Low Risk" : score >= 50 ? "Medium Risk" : "High Risk";
  return (
    <div className="flex flex-col items-center">
      <div className={`text-6xl font-extrabold ${color}`}>{score}</div>
      <div className="text-slate-400 text-sm mt-1">out of 100</div>
      <span className={cn("mt-2 text-xs font-bold px-3 py-1 rounded-full border", color.replace("text-", "bg-").replace("600", "100"), color, color.replace("text-", "border-").replace("600", "200"))}>
        {label}
      </span>
    </div>
  );
}

function FactorRow({ label, value, type }: { label: string; value: string; type: "pass" | "warn" | "fail" }) {
  const Icon = type === "pass" ? CheckCircle : type === "warn" ? AlertTriangle : XCircle;
  const iconColor = type === "pass" ? "text-emerald-500" : type === "warn" ? "text-amber-500" : "text-red-500";
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
      <div className="flex items-center gap-2.5">
        <Icon className={`w-4 h-4 ${iconColor}`} />
        <span className="text-sm text-slate-700">{label}</span>
      </div>
      <span className="text-sm font-medium text-slate-600">{value}</span>
    </div>
  );
}

export default function ReportDetailClient({
  isPro,
  locale,
  reportId,
}: {
  isPro: boolean;
  locale: string;
  reportId: string;
}) {
  const t = useTranslations("report");

  const handleDownloadPdf = () => {
    alert("PDF download will be available once Stripe is activated.");
  };

  if (!isPro && reportId !== "sample") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center bg-white rounded-2xl border border-slate-200 p-10 shadow-sm">
          <Lock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-800 mb-3">{t("lockedTitle")}</h2>
          <p className="text-slate-500 text-sm mb-6">{t("lockedDesc")}</p>
          <Link
            href={`/${locale}/sign-up`}
            className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Start 14-Day Free Trial
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
      {/* Back */}
      <Link href={`/${locale}/reports`} className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700">
        <ArrowLeft className="w-4 h-4" />
        Back to Reports
      </Link>

      {/* Report Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
            <Building2 className="w-7 h-7 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">{MOCK_REPORT.companyName}</h1>
            <p className="text-sm text-slate-500">{MOCK_REPORT.registrationNumber} · {MOCK_REPORT.country}</p>
            <span className={cn("inline-block mt-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full border", MOCK_REPORT.statusColor)}>
              {MOCK_REPORT.status}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <RiskScoreGauge score={MOCK_REPORT.riskScore} />
        </div>
      </div>

      {/* Download PDF */}
      <div className="flex justify-end">
        {isPro ? (
          <button
            onClick={handleDownloadPdf}
            className="inline-flex items-center gap-2 bg-slate-900 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-slate-700 transition-colors shadow-sm text-sm"
          >
            <Download className="w-4 h-4" />
            {t("downloadPdf")}
          </button>
        ) : (
          <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-400 font-semibold px-5 py-2.5 rounded-xl text-sm cursor-not-allowed">
            <Lock className="w-4 h-4" />
            {t("downloadPdf")} — Pro Only
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h2 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-blue-600" />
          {t("summary")}
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">{MOCK_REPORT.summary}</p>
      </div>

      {/* Company Data */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h2 className="font-semibold text-slate-900 mb-4">{t("companyData")}</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Company Name", value: MOCK_REPORT.companyName },
            { label: "Registration", value: MOCK_REPORT.registrationNumber },
            { label: "Country", value: MOCK_REPORT.country },
            { label: "Industry", value: MOCK_REPORT.industry },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs text-slate-400 mb-0.5">{label}</p>
              <p className="text-sm font-medium text-slate-800">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Analysis */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h2 className="font-semibold text-slate-900 mb-4">{t("riskAnalysis")}</h2>
        <div>
          {MOCK_REPORT.riskFactors.map((f) => (
            <FactorRow key={f.label} {...f} />
          ))}
        </div>
      </div>

      {/* Conclusion */}
      <div className="bg-slate-900 rounded-2xl p-6 text-white">
        <h2 className="font-semibold mb-3">{t("conclusion")}</h2>
        <p className="text-sm text-slate-300 leading-relaxed">{MOCK_REPORT.conclusion}</p>
        <p className="text-xs text-slate-500 mt-4">
          This report is generated by TradeSecurix analytics platform and is for informational purposes only.
          It does not constitute financial, legal, or investment advice.
        </p>
      </div>
    </div>
  );
}