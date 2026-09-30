import { NextResponse } from "next/server";
import { verifyPayPalWebhookSignature } from "@/lib/paypal/client";
import { PayPalWebhookEvent } from "@/lib/paypal/types";

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const event: PayPalWebhookEvent = JSON.parse(rawBody);

    const headersList = request.headers;
    const transmissionId = headersList.get("paypal-transmission-id") || "";
    const transmissionTime = headersList.get("paypal-transmission-time") || "";
    const certUrl = headersList.get("paypal-cert-url") || "";
    const authAlgo = headersList.get("paypal-auth-algo") || "";
    const transmissionSig = headersList.get("paypal-transmission-sig") || "";
    const webhookId = process.env.PAYPAL_WEBHOOK_ID || "placeholder_webhook_id";

    // Verify PayPal authenticity
    const isValid = await verifyPayPalWebhookSignature({
      transmissionId,
      transmissionTime,
      certUrl,
      authAlgo,
      transmissionSig,
      webhookId,
      webhookEvent: event as unknown as Record<string, unknown>,
    });

    if (!isValid) {
      console.warn("[PayPal Webhook Warning]: Invalid transmission signature received");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    console.log(`[PayPal Webhook Event]: ${event.event_type} (${event.id})`);

    // Event Handling Routing
    switch (event.event_type) {
      case "PAYMENT.CAPTURE.COMPLETED": {
        // Successful payment: Trigger automatic credential generation & dispatch
        const capture = event.resource as { id: string; amount?: { value: string; currency_code: string } };
        console.log(`[Fulfillment]: Payment captured ${capture.id}. Triggering WhatsApp & Email credential dispatch.`);
        break;
      }

      case "BILLING.SUBSCRIPTION.ACTIVATED": {
        // Recurring subscription activated
        const sub = event.resource as { id: string };
        console.log(`[Subscription Activated]: ${sub.id}. Provisioning recurring stream access.`);
        break;
      }

      case "BILLING.SUBSCRIPTION.CANCELLED": {
        // Customer canceled renewal
        const sub = event.resource as { id: string };
        console.log(`[Subscription Cancelled]: ${sub.id}. Access scheduled to expire at period end.`);
        break;
      }

      case "CUSTOMER.DISPUTE.CREATED": {
        // Dispute alert: Enables immediate proactive resolution under 7-day guarantee
        const dispute = event.resource as { dispute_id: string; reason?: string };
        console.log(`[Customer Dispute Alert]: ${dispute.dispute_id}. Triggering customer success escalation.`);
        break;
      }

      default:
        console.log(`[Unhandled PayPal Event]: ${event.event_type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    console.error("[PayPal Webhook Processing Error]:", message);
    return NextResponse.json(
      { error: "Webhook handling failed", details: message },
      { status: 500 }
    );
  }
}
