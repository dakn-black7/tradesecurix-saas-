export const dynamic = "force-dynamic";
export const revalidate = 0;

import { getTranslations } from "next-intl/server";
import Link from "next/link";
import {
  Users,
  FileText,
  CreditCard,
  DollarSign,
  TrendingUp,
  Shield,
  ArrowLeft,
} from "lucide-react";

const MOCK_USERS = [
  { id: "u1", name: "Alice Martin", email: "alice@example.com", plan: "Pro", reports: 18, joined: "Apr 2026" },
  { id: "u2", name: "James Okafor", email: "james@example.com", plan: "Basic", reports: 5, joined: "Mar 2026" },
  { id: "u3", name: "Priya Sharma", email: "priya@example.com", plan: "Enterprise", reports: 64, joined: "Feb 2026" },
  { id: "u4", name: "David Chen", email: "david@example.com", plan: "Pro", reports: 22, joined: "Apr 2026" },
  { id: "u5", name: "Sofia Mendez", email: "sofia@example.com", plan: "Basic", reports: 3, joined: "Apr 2026" },
];

const PLAN_BADGE: Record<string, string> = {
  Basic: "bg-slate-100 text-slate-700",
  Pro: "bg-blue-100 text-blue-700",
  Enterprise: "bg-purple-100 text-purple-700",
};

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("admin");

  const stats = [
    { label: t("users"), value: "127", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: t("reports"), value: "1,840", icon: FileText, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: t("subscriptions"), value: "94 active", icon: CreditCard, color: "text-purple-600", bg: "bg-purple-50" },
    { label: t("revenue"), value: "$12,450/mo", icon: DollarSign, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-slate-200 h-16 flex items-center px-6 gap-4">
        <div className="flex items-center gap-2 font-bold text-slate-900">
          <Shield className="w-5 h-5 text-blue-600" />
          <span>TradeSecurix Admin</span>
        </div>
        <span className="ml-2 text-xs font-semibold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Admin Panel</span>
        <Link href={`/${locale}/dashboard`} className="ml-auto flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </header>

      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold text-slate-900">{t("title")}</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-slate-500">{stat.label}</p>
                <div className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Revenue Chart Placeholder */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h2 className="font-semibold text-slate-900">Monthly Revenue (Mock)</h2>
            <span className="ml-auto text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">Stripe test mode</span>
          </div>
          <div className="flex items-end gap-2 h-28">
            {[3200, 4800, 5600, 7200, 9100, 10500, 12450].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-blue-500 rounded-t-md opacity-80"
                  style={{ height: `${(val / 12450) * 100}%` }}
                />
                <span className="text-[10px] text-slate-400 truncate">
                  {["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
            <Users className="w-5 h-5 text-slate-400" />
            <span className="font-semibold text-slate-800">{t("users")}</span>
            <span className="ml-auto text-xs text-slate-400">{MOCK_USERS.length} shown</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left py-3 px-5 text-xs font-semibold text-slate-500">Name</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500">Email</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500">Plan</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500">Reports</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_USERS.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-5 text-sm font-medium text-slate-800">{user.name}</td>
                    <td className="py-3.5 px-4 text-sm text-slate-500">{user.email}</td>
                    <td className="py-3.5 px-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${PLAN_BADGE[user.plan]}`}>
                        {user.plan}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-sm text-slate-600">{user.reports}</td>
                    <td className="py-3.5 px-4 text-sm text-slate-400">{user.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Subscriptions Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { plan: "Basic ($49/mo)", count: 48, color: "bg-slate-100 text-slate-700", revenue: "$2,352" },
            { plan: "Pro ($199/mo)", count: 38, color: "bg-blue-100 text-blue-700", revenue: "$7,562" },
            { plan: "Enterprise ($399/mo)", count: 8, color: "bg-purple-100 text-purple-700", revenue: "$3,192" },
          ].map((row) => (
            <div key={row.plan} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${row.color}`}>{row.plan}</span>
              <p className="text-3xl font-bold text-slate-900 mt-3">{row.count}</p>
              <p className="text-sm text-slate-400 mt-1">subscribers · {row.revenue}/mo</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
