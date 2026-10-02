import { NextResponse } from "next/server";
import { isPayPalConfigured, getPayPalClientId } from "@/lib/paypal/client";
import { CATALOG_CURRENCY } from "@/data/plans";

export async function GET() {
  const configured = isPayPalConfigured();
  const clientId = configured ? getPayPalClientId() : "";

  return NextResponse.json({
    isConfigured: configured,
    clientId,
    currency: CATALOG_CURRENCY.code,
    environment: process.env.PAYPAL_ENVIRONMENT || "sandbox",
  });
}
