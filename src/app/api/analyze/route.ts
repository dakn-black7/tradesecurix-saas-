export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const fileName = body.fileName ?? "document.pdf";

  // Mock analysis logic — replace with real document analysis service
  await new Promise((r) => setTimeout(r, 500)); // Simulate processing

  const result = {
    id: `analysis_${Date.now()}`,
    fileName,
    status: "Valid",
    processingTimeMs: 487,
    checks: [
      { name: "Metadata consistency", passed: true, detail: "All metadata fields are internally consistent" },
      { name: "Structure validation", passed: true, detail: "Document structure matches expected PDF/DOCX format" },
      { name: "Signature verification", passed: false, detail: "No digital signature detected" },
      { name: "Anomaly detection", passed: true, detail: "No statistical anomalies detected in content" },
    ],
    overallScore: 87,
    riskLevel: "Low",
    analyzedAt: new Date().toISOString(),
    disclaimer:
      "This analysis is performed on structural and metadata properties only. TradeSecurix does not validate document authenticity or legal standing.",
  };

  return NextResponse.json(result);
}
