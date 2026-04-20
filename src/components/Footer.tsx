import Link from "next/link";
import { Shield } from "lucide-react";
import { getTranslations, getLocale } from "next-intl/server";

export default async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations("trust");

  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-950 text-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
              <Shield className="h-5 w-5 text-blue-400" />
              <span>TradeSecurix</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
              {t("disclaimer")}
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-300">Company Info</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Randall Ave Ste 100, Cheyenne, WY 82001, USA</li>
              <li>
                <a
                  href="mailto:contact@tradesecurix.com"
                  className="text-blue-400 transition hover:text-blue-300"
                >
                  contact@tradesecurix.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-300">Navigation</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href={`/${locale}`} className="transition hover:text-white">Home</Link></li>
              <li><Link href={`/${locale}#pricing`} className="transition hover:text-white">Pricing</Link></li>
              <li><Link href={`/${locale}#lead-form`} className="transition hover:text-white">Features</Link></li>
              <li><Link href={`/${locale}/dashboard`} className="transition hover:text-white">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-300">Legal</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href={`/${locale}/privacy`} className="transition hover:text-white">Privacy Policy</Link></li>
              <li><Link href={`/${locale}/terms`} className="transition hover:text-white">Terms of Service</Link></li>
            </ul>

            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="rounded-lg border border-slate-700 p-2 text-slate-300 transition hover:border-slate-500 hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0V8zm7.5 0h4.79v2.19h.07c.67-1.27 2.3-2.6 4.73-2.6C22.16 7.59 24 10.58 24 15.04V24h-5v-7.9c0-1.88-.03-4.29-2.61-4.29-2.61 0-3.01 2.04-3.01 4.15V24h-5V8z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="rounded-lg border border-slate-700 p-2 text-slate-300 transition hover:border-slate-500 hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5z" />
                  <path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM18.1 6.2a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="rounded-lg border border-slate-700 p-2 text-slate-300 transition hover:border-slate-500 hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                  <path d="M23.5 7.2a3 3 0 0 0-2.1-2.1C19.6 4.5 12 4.5 12 4.5s-7.6 0-9.4.6A3 3 0 0 0 .5 7.2 31.5 31.5 0 0 0 0 12c0 1.6.2 3.2.5 4.8a3 3 0 0 0 2.1 2.1c1.8.6 9.4.6 9.4.6s7.6 0 9.4-.6a3 3 0 0 0 2.1-2.1c.3-1.6.5-3.2.5-4.8s-.2-3.2-.5-4.8zM9.7 15.5v-7L16 12l-6.3 3.5z" />
                </svg>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                className="rounded-lg border border-slate-700 p-2 text-slate-300 transition hover:border-slate-500 hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.847h-7.406l-5.8-7.584-6.63 7.584H.48l8.6-9.834L0 1.154h7.594l5.243 6.932zM17.61 20.645h2.04L6.486 3.24H4.298z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-5 text-xs text-slate-500 sm:flex sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Trade Securix LLC. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Analytics platform only. We do not hold funds or execute trades.</p>
        </div>
      </div>
    </footer>
  );
}
