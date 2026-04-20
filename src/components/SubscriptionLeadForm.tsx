"use client";

import { FormEvent, useState } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { CheckCircle2, ShieldCheck } from "lucide-react";

type LeadFormData = {
  fullName: string;
  email: string;
  companyName: string;
  fullAddress: string;
  whatsappNumber: string;
  consent: boolean;
};

const initialData: LeadFormData = {
  fullName: "",
  email: "",
  companyName: "",
  fullAddress: "",
  whatsappNumber: "",
  consent: false,
};

export default function SubscriptionLeadForm() {
  const locale = useLocale();
  const router = useRouter();
  const { isSignedIn } = useUser();

  const [expanded, setExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<LeadFormData>(initialData);

  const onFieldChange = <K extends keyof LeadFormData>(field: K, value: LeadFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!formData.consent) {
      setError("You must agree before submitting.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Unable to submit form. Please try again.");
      }

      setIsSuccess(true);
      setFormData(initialData);

      router.push(isSignedIn ? `/${locale}/dashboard` : `/${locale}/sign-up`);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Something went wrong while submitting."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-slate-50 py-20" id="lead-form">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <div className="mb-8 max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
              <ShieldCheck className="h-3.5 w-3.5" />
              Free Trial Access
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Start 14-Day Free Trial
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              We collect your information to provide verification services and communicate updates. Your data is never sold.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  required
                  autoComplete="name"
                  value={formData.fullName}
                  onChange={(e) => onFieldChange("fullName", e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="Jane Doe"
                />
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => onFieldChange("email", e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              className="text-sm font-medium text-blue-700 hover:text-blue-800"
              aria-expanded={expanded}
              aria-controls="optional-fields"
            >
              {expanded ? "Hide optional details" : "Add optional company details"}
            </button>

            {expanded && (
              <div id="optional-fields" className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="companyName" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Company Name
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={(e) => onFieldChange("companyName", e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="Trade Securix LLC"
                  />
                </div>

                <div>
                  <label htmlFor="whatsappNumber" className="mb-1.5 block text-sm font-medium text-slate-700">
                    WhatsApp Number
                  </label>
                  <input
                    id="whatsappNumber"
                    name="whatsappNumber"
                    value={formData.whatsappNumber}
                    onChange={(e) => onFieldChange("whatsappNumber", e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="+1 307 000 0000"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="fullAddress" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Full Address
                  </label>
                  <input
                    id="fullAddress"
                    name="fullAddress"
                    value={formData.fullAddress}
                    onChange={(e) => onFieldChange("fullAddress", e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="Randall Ave Ste 100, Cheyenne, WY 82001, USA"
                  />
                </div>
              </div>
            )}

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <label htmlFor="consent" className="flex items-start gap-3 text-sm text-slate-700">
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  required
                  checked={formData.consent}
                  onChange={(e) => onFieldChange("consent", e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span>
                  I agree to the Privacy Policy and consent to being contacted via email or WhatsApp.
                </span>
              </label>
            </div>

            {error ? (
              <p className="text-sm font-medium text-red-600" role="alert">
                {error}
              </p>
            ) : null}

            {isSuccess ? (
              <p className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
                <CheckCircle2 className="h-4 w-4" />
                Lead captured successfully.
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {isSubmitting ? "Submitting..." : "Start 14-Day Free Trial"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
