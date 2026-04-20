import { useTranslations } from "next-intl";
import Image from "next/image";

const TESTIMONIAL_KEYS = ["t1", "t2", "t3", "t4"] as const;

const FLAGS: Record<string, string> = {
  Canada: "🇨🇦",
  Spain: "🇪🇸",
  Qatar: "🇶🇦",
  Vietnam: "🇻🇳",
  Canadá: "🇨🇦",
  España: "🇪🇸",
  Espagne: "🇪🇸",
  كندا: "🇨🇦",
  قطر: "🇶🇦",
};

export default function TestimonialsSection() {
  const t = useTranslations("testimonials");

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">{t("title")}</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIAL_KEYS.map((key, i) => {
            const name = t(`${key}.name`);
            const role = t(`${key}.role`);
            const country = t(`${key}.country`);
            const text = t(`${key}.text`);
            const flag = FLAGS[country] ?? "🌐";
            const seed = `testimonial${i + 1}`;

            return (
              <div
                key={key}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.562-.955L10 0l2.95 5.955 6.562.955-4.756 4.635 1.122 6.545z" />
                    </svg>
                  ))}
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-5">"{text}"</p>

                <div className="flex items-center gap-3 mt-auto">
                  <Image
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${seed}&backgroundColor=dbeafe`}
                    alt={name}
                    width={36}
                    height={36}
                    className="rounded-full"
                    unoptimized
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{name}</p>
                    <p className="text-xs text-slate-400">{role} · {flag} {country}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
