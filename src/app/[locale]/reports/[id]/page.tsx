export const dynamic = "force-dynamic";
export const revalidate = 0;

import ReportDetailClient from "@/components/report/ReportDetailClient";

export default async function ReportDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  // In production: check subscription from DB/Clerk metadata
  const isPro = id === "sample" ? true : false;

  return <ReportDetailClient isPro={isPro} locale={locale} reportId={id} />;
}
