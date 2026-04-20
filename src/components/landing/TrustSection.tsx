import { useTranslations } from "next-intl";
import { Info, MapPin, Mail } from "lucide-react";

export default function TrustSection() {
  const t = useTranslations("trust");

  return (
    <section className="py-16 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 text-slate-300 text-sm px-4 py-2 rounded-full mb-6">
            <Info className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <span className="font-medium">{t("disclaimer")}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <div className="flex flex-col items-center gap-2 text-slate-300">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                <Info className="w-5 h-5 text-blue-400" />
              </div>
              <p className="text-sm font-medium text-white">{t("company")}</p>
            </div>
            <div className="flex flex-col items-center gap-2 text-slate-300">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-blue-400" />
              </div>
              <p className="text-sm">{t("address")}</p>
            </div>
            <div className="flex flex-col items-center gap-2 text-slate-300">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-400" />
              </div>
              <a href={`mailto:${t("email")}`} className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                {t("email")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
