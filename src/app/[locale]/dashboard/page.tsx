export const dynamic = "force-dynamic";
export const revalidate = 0;

import { currentUser } from "@clerk/nextjs/server";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import {
  BarChart3,
  AlertTriangle,
  Building2,
  FileText,
  Lock,
  Upload,
  Zap,
  Clock,
} from "lucide-react";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const user = await currentUser();
  const t = await getTranslations("dashboard");

  // Mock data — replace with real DB queries
  const stats = [
    { label: t("totalAnalyses"), value: "24", icon: BarChart3, color: "text-blue-600", bg: "bg-blue-50" },
    { label: t("riskAlerts"), value: "3", icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50" },
    { label: t("verifiedCompanies"), value: "8", icon: Building2, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: t("scansRemaining"), value: "6 / 20", icon: Clock, color: "text-slate-600", bg: "bg-slate-100" },
  ];

  const mockReports = [
    { id: "r1", name: "Meridian Import Co.", type: "Company", score: 82, status: "Low Risk", badge: "bg-emerald-100 text-emerald-700", date: "Apr 18, 2026" },
    { id: "r2", name: "Apex Trade LLC", type: "Company", score: 61, status: "Medium Risk", badge: "bg-amber-100 text-amber-700", date: "Apr 16, 2026" },
    { id: "r3", name: "invoice_Q1_2026.pdf", type: "Document", score: null, status: "Valid", badge: "bg-blue-100 text-blue-700", date: "Apr 14, 2026" },
    { id: "r4", name: "contract_draft.pdf", type: "Document", score: null, status: "Anomaly Detected", badge: "bg-red-100 text-red-700", date: "Apr 12, 2026" },
  ];

  const isPro = false; // Replace with real subscription check

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{t("title")}</h1>
        <p className="text-slate-500 mt-1">
          Welcome back, {user?.firstName ?? "there"}.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-slate-500">{stat.label}</p>
              <div className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Upgrade Banner (for free users) */}
      {!isPro && (
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Zap className="w-6 h-6 text-blue-200 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-lg">{t("upgrade")}</p>
              <p className="text-blue-100 text-sm mt-1 max-w-xl">{t("upgradeDesc")}</p>
            </div>
          </div>
          <Link
            href={`/${locale}/pricing`}
            className="flex-shrink-0 bg-white text-blue-600 font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors shadow-md text-sm"
          >
            {t("upgrade")} →
          </Link>
        </div>
      )}

      {/* Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Upload Document */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Upload className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="font-semibold text-slate-900">{t("uploadDoc")}</h2>
          </div>
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-blue-300 hover:bg-blue-50/30 transition-colors cursor-pointer">
            <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm text-slate-500">Drop a PDF or click to upload</p>
            <p className="text-xs text-slate-400 mt-1">PDF, DOCX up to 10MB</p>
          </div>
          <button className="mt-4 w-full bg-blue-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-colors">
            Analyze Document
          </button>
        </div>

        {/* Company Verification (locked for free) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm relative">
          {!isPro && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] rounded-2xl flex flex-col items-center justify-center gap-3 z-10">
              <Lock className="w-8 h-8 text-slate-400" />
              <p className="text-sm font-semibold text-slate-700 text-center px-6">{t("locked")}</p>
              <Link
                href={`/${locale}/sign-up`}
                className="bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors"
              >
                Start Free Trial
              </Link>
            </div>
          )}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
              <Building2 className="w-5 h-5 text-emerald-600" />
            </div>
            <h2 className="font-semibold text-slate-900">{t("runVerif")}</h2>
          </div>
          <input
            type="text"
            placeholder="Company name or registration number"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!isPro}
          />
          <button
            className="mt-4 w-full bg-emerald-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50"
            disabled={!isPro}
          >
            Run Verification
          </button>
        </div>
      </div>

      {/* Reports History */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="font-semibold text-slate-900">{t("reportsHistory")}</h2>
          <Link href={`/${locale}/reports`} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View all →
          </Link>
        </div>
        {mockReports.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-400">{t("noReports")}</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {mockReports.map((report) => (
              <div key={report.id} className="flex items-center px-6 py-4 hover:bg-slate-50 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{report.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{report.type} · {report.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  {report.score !== null && (
                    <span className="text-xs text-slate-500 font-medium">Score: {report.score}</span>
                  )}
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${report.badge}`}>
                    {report.status}
                  </span>
                  <Link
                    href={`/${locale}/reports/${report.id}`}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
