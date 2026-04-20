import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body?.fullName || !body?.email || !body?.consent) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Mock persistence. Replace with DB insert (Prisma/PostgreSQL) in production.
    const leadRecord = {
      id: `lead_${Date.now()}`,
      fullName: String(body.fullName),
      email: String(body.email),
      companyName: body.companyName ? String(body.companyName) : null,
      fullAddress: body.fullAddress ? String(body.fullAddress) : null,
      whatsappNumber: body.whatsappNumber ? String(body.whatsappNumber) : null,
      consent: Boolean(body.consent),
      source: "landing_form",
      createdAt: new Date().toISOString(),
    };

    console.log("TradeSecurix lead captured:", leadRecord);

    return NextResponse.json({ ok: true, leadId: leadRecord.id });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    );
  }
}
