import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ClipboardList, FileText, Building2 } from "lucide-react";

const MOCK_REPORTS = [
  { id: "r1", name: "Meridian Import Co.", type: "Company", score: 82, status: "Low Risk", badge: "bg-emerald-100 text-emerald-700", date: "Apr 18, 2026" },
  { id: "r2", name: "Apex Trade LLC", type: "Company", score: 61, status: "Medium Risk", badge: "bg-amber-100 text-amber-700", date: "Apr 16, 2026" },
  { id: "r3", name: "invoice_Q1_2026.pdf", type: "Document", score: null, status: "Valid", badge: "bg-blue-100 text-blue-700", date: "Apr 14, 2026" },
  { id: "r4", name: "contract_draft.pdf", type: "Document", score: null, status: "Anomaly Detected", badge: "bg-red-100 text-red-700", date: "Apr 12, 2026" },
  { id: "r5", name: "Globex Trading Ltd", type: "Company", score: 45, status: "High Risk", badge: "bg-red-100 text-red-700", date: "Apr 10, 2026" },
];

export default async function ReportsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("report");

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t("title")}s</h1>
          <p className="text-slate-500 mt-1">All your analyses and verification reports</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-slate-400" />
          <span className="font-semibold text-slate-800">Report History</span>
          <span className="ml-auto text-xs text-slate-400">{MOCK_REPORTS.length} reports</span>
        </div>

        <div className="divide-y divide-slate-100">
          {MOCK_REPORTS.map((report) => (
            <div key={report.id} className="flex items-center px-6 py-4 hover:bg-slate-50 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center mr-4 flex-shrink-0">
                {report.type === "Company" ? (
                  <Building2 className="w-4 h-4 text-slate-500" />
                ) : (
                  <FileText className="w-4 h-4 text-slate-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate">{report.name}</p>
                <p className="text-xs text-slate-400 mt-0.5">{report.type} · {report.date}</p>
              </div>
              <div className="flex items-center gap-4">
                {report.score !== null && (
                  <span className="text-sm font-semibold text-slate-600">{report.score}/100</span>
                )}
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${report.badge}`}>
                  {report.status}
                </span>
                <Link
                  href={`/${locale}/reports/${report.id}`}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  View Report →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
