"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useAuth, UserButton } from "@clerk/nextjs";
import { Menu, X, Shield } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const { isSignedIn } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const base = `/${locale}`;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={base} className="flex items-center gap-2 font-bold text-xl text-slate-900">
          <Shield className="w-6 h-6 text-blue-600" />
          <span>TradeSecurix</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href={`${base}#pricing`} className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
            {t("pricing")}
          </Link>
          {isSignedIn ? (
            <Link href={`${base}/dashboard`} className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
              {t("dashboard")}
            </Link>
          ) : null}
          <LanguageSwitcher />
          {!isSignedIn ? (
            <>
            <Link
              href={`${base}/sign-in`}
              className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
            >
              {t("signIn")}
            </Link>
            <Link
              href={`${base}/sign-up`}
              className="text-sm font-semibold bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t("signUp")}
            </Link>
            </>
          ) : null}
          {isSignedIn ? (
            <UserButton afterSignOutUrl={base} />
          ) : null}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
          <Link href={`${base}#pricing`} className="block text-sm text-slate-700 py-2" onClick={() => setMobileOpen(false)}>
            {t("pricing")}
          </Link>
          {isSignedIn ? (
            <Link href={`${base}/dashboard`} className="block text-sm text-slate-700 py-2" onClick={() => setMobileOpen(false)}>
              {t("dashboard")}
            </Link>
          ) : null}
          <LanguageSwitcher />
          {!isSignedIn ? (
            <>
            <Link href={`${base}/sign-in`} className="block text-sm font-medium text-slate-700 py-2">
              {t("signIn")}
            </Link>
            <Link href={`${base}/sign-up`} className="block text-sm font-semibold bg-blue-600 text-white px-4 py-2 rounded-lg text-center">
              {t("signUp")}
            </Link>
            </>
          ) : null}
          {isSignedIn ? (
            <UserButton afterSignOutUrl={base} />
          ) : null}
        </div>
      )}
    </header>
  );
}
