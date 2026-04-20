import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import Stripe from "stripe";

const PRICE_MAP: Record<string, string> = {
  basic: process.env.STRIPE_PRICE_BASIC ?? "",
  pro: process.env.STRIPE_PRICE_PRO ?? "",
  enterprise: process.env.STRIPE_PRICE_ENTERPRISE ?? "",
};

export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }
  const stripe = new Stripe(stripeKey, { apiVersion: "2026-03-25.dahlia" });

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const plan = body.plan as string;

  if (!plan || !PRICE_MAP[plan]) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: email,
    line_items: [{ price: PRICE_MAP[plan], quantity: 1 }],
    success_url: `${appUrl}/en/dashboard?subscribed=true`,
    cancel_url: `${appUrl}/en/pricing`,
    metadata: { userId, plan },
  });

  return NextResponse.json({ url: session.url });
}
