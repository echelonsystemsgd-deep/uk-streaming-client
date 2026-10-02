import { NextResponse } from "next/server";
import { PRICING_PLANS } from "@/data/plans";
import { capturePayPalOrder } from "@/lib/paypal/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, planId, email, whatsapp, macAddress, accountIdentifier, deviceType } = body;

    if (!orderId) {
      return NextResponse.json(
        { error: "orderId is required for capture" },
        { status: 400 }
      );
    }

    const plan = PRICING_PLANS.find((p) => p.id === planId) || {
      id: planId || "plan-custom",
      name: "ChitramTV Service Pass",
      price: 109.0,
      devices: 4,
    };

    // Capture payment through PayPal Orders v2 API
    const captureResult = await capturePayPalOrder(orderId);

    if (captureResult.status !== "COMPLETED") {
      return NextResponse.json(
        {
          error: "Payment authorization was not completed by PayPal",
          status: captureResult.status,
        },
        { status: 400 }
      );
    }

    const captureId =
      captureResult.purchase_units?.[0]?.payments?.captures?.[0]?.id ||
      `CAP-${orderId.substring(orderId.length - 8)}`;

    const referenceId = `UK-CHITRAM-${Math.floor(10000 + Math.random() * 90000)}`;

    return NextResponse.json({
      success: true,
      status: "COMPLETED",
      orderId,
      captureId,
      referenceId,
      customer: {
        email: email || captureResult.payment_source?.paypal?.email_address || "customer@chitramtv.eu",
        whatsapp: whatsapp || null,
        deviceType: deviceType || "Smart TV / Firestick",
        macAddress: macAddress || accountIdentifier || null,
        accountIdentifier: accountIdentifier || macAddress || null,
      },
      plan: {
        id: plan.id,
        name: plan.name,
        price: plan.price,
        devices: plan.devices,
      },
      dispatch: {
        estimatedTime: "60–120 seconds",
        method: whatsapp ? "WhatsApp & Email" : "Email",
      },
      capturedAt: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    console.error("[PayPal Capture Order Error]:", message);
    return NextResponse.json(
      { error: "Failed to capture PayPal payment", details: message },
      { status: 500 }
    );
  }
}
