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
      name: "UK Streaming Pass",
      price: 89.99,
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
      `CAP-${orderId.substring(Math.max(0, orderId.length - 8))}`;

    const referenceId = `UK-STREAM-${Math.floor(10000 + Math.random() * 90000)}`;

    return NextResponse.json({
      success: true,
      status: "COMPLETED",
      orderId,
      captureId,
      referenceId,
      customer: {
        email: email || captureResult.payment_source?.paypal?.email_address || "customer@example.com",
        whatsapp: whatsapp || null,
        deviceType: deviceType || "Amazon Fire TV Stick",
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
    const errObj = error as Error & { issue?: string; debugId?: string };
    const message = errObj?.message || "Internal Server Error";
    const issue = errObj?.issue || "";
    const debugId = errObj?.debugId || "";

    console.error(`[PayPal Capture Order Error] [DebugId: ${debugId}] [Issue: ${issue}]:`, message);

    // If instrument was declined, send specific recoverable code so client can trigger actions.restart()
    if (issue === "INSTRUMENT_DECLINED") {
      return NextResponse.json(
        {
          error: "Your card or funding source was declined. Please try another payment method in PayPal.",
          issue: "INSTRUMENT_DECLINED",
          recoverable: true,
          debugId,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to capture PayPal payment",
        details: message,
        issue: issue || undefined,
        debugId: debugId || undefined,
      },
      { status: 500 }
    );
  }
}
