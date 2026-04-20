import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const companyName = body.companyName ?? "Unknown Company";

  // Mock verification logic — replace with real registry lookup
  await new Promise((r) => setTimeout(r, 700));

  const riskScore = Math.floor(Math.random() * 60) + 30; // 30–90 range
  const riskLevel =
    riskScore >= 75 ? "Low" : riskScore >= 50 ? "Medium" : "High";

  const result = {
    id: `verify_${Date.now()}`,
    companyName,
    registrationNumber: "GB-20219874",
    country: "United Kingdom",
    industry: "Import / Export",
    riskScore,
    riskLevel,
    status: `${riskLevel} Risk`,
    flags:
      riskScore < 60
        ? ["Limited registry data", "Cross-border exposure", "Recent directorship changes"]
        : riskScore < 75
        ? ["Cross-border exposure"]
        : [],
    dataPoints: {
      registryStatus: "Active",
      yearsActive: 6,
      directors: 3,
      lastFiling: "2025-12-01",
      adverseMedia: false,
    },
    verifiedAt: new Date().toISOString(),
    disclaimer:
      "Verification is based on publicly available registry and commercial data. TradeSecurix does not guarantee accuracy or completeness. This is not legal or financial advice.",
  };

  return NextResponse.json(result);
}
