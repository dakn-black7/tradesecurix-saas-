"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Building2, Search, Lock, AlertTriangle, CheckCircle, Info } from "lucide-react";

const MOCK_RESULT = {
  companyName: "Global Trading Solutions Ltd",
  riskScore: 78,
  status: "Medium Risk",
  country: "United Kingdom",
  industry: "Import / Export",
  flags: ["Limited registry data", "Cross-border exposure"],
};

export default function VerificationPage() {
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<typeof MOCK_RESULT | null>(null);
  const [loading, setLoading] = useState(false);
  const isPro = false; // replace with real subscription check

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setResult(MOCK_RESULT);
    setLoading(false);
  };

  if (!isPro) {
    return (
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">{t("runVerif")}</h1>
        <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-12 shadow-sm flex flex-col items-center text-center gap-4">
          <Lock className="w-14 h-14 text-slate-300" />
          <h2 className="text-xl font-semibold text-slate-800">{t("locked")}</h2>
          <p className="text-slate-500 text-sm max-w-md">{t("upgradeDesc")}</p>
          <Link
            href={`/${locale}/sign-up`}
            className="mt-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Start 14-Day Free Trial
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">{t("runVerif")}</h1>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Company name or registration number"
            className="flex-1 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-blue-600 text-white font-semibold px-5 py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-60"
          >
            <Search className="w-4 h-4" />
            {loading ? "Searching..." : "Verify"}
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">{result.companyName}</h2>
                <p className="text-sm text-slate-400">{result.country} · {result.industry}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-4xl font-extrabold text-amber-600">{result.riskScore}</p>
              <p className="text-xs text-slate-400">out of 100</p>
              <span className="text-xs font-semibold bg-amber-100 text-amber-700 px-2.5 py-0.5 rounded-full mt-1 inline-block">
                {result.status}
              </span>
            </div>
          </div>

          {result.flags.map((flag) => (
            <div key={flag} className="flex items-center gap-2.5 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              {flag}
            </div>
          ))}

          <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
            <Info className="w-3.5 h-3.5" />
            <span>This verification uses available registry and public data. Results are for analytical reference only.</span>
          </div>

          <Link
            href={`/${locale}/reports/r2`}
            className="block w-full text-center bg-slate-900 text-white font-semibold px-5 py-3 rounded-xl hover:bg-slate-700 transition-colors"
          >
            View Full Report →
          </Link>
        </div>
      )}
    </div>
  );
}
