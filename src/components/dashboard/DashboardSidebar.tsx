"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard,
  FileText,
  Building2,
  ClipboardList,
  Settings,
  Shield,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardSidebar() {
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const pathname = usePathname();

  const navItems = [
    { href: `/${locale}/dashboard`, label: t("title"), icon: LayoutDashboard },
    { href: `/${locale}/verification`, label: t("runVerif"), icon: Building2 },
    { href: `/${locale}/reports`, label: t("reportsHistory"), icon: ClipboardList },
  ];

  return (
    <aside className="w-64 min-h-screen border-r border-slate-200 bg-white flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-slate-200">
        <Link href={`/${locale}`} className="flex items-center gap-2 font-bold text-slate-900">
          <Shield className="w-5 h-5 text-blue-600" />
          <span>TradeSecurix</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
              {active && <ChevronRight className="w-4 h-4 ml-auto text-blue-400" />}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-4 py-4 border-t border-slate-200">
        <div className="flex items-center gap-3">
          <UserButton />
          <span className="text-sm text-slate-600 truncate">Account</span>
        </div>
      </div>
    </aside>
  );
}
