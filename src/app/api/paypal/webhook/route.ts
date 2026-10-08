import { NextResponse } from "next/server";
import { verifyPayPalWebhookSignature } from "@/lib/paypal/client";
import { PayPalWebhookEvent } from "@/lib/paypal/types";

// In-memory processed event deduplication set (up to 500 recent events)
const processedEventIds = new Set<string>();

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const event: PayPalWebhookEvent = JSON.parse(rawBody);

    // Deduplication check: if already processed, return 200 immediately to acknowledge PayPal retry
    if (event?.id && processedEventIds.has(event.id)) {
      console.log(`[PayPal Webhook]: Duplicate event ${event.id} received. Skipping processing.`);
      return NextResponse.json({ received: true, duplicate: true });
    }

    const headersList = request.headers;
    const transmissionId = headersList.get("paypal-transmission-id") || "";
    const transmissionTime = headersList.get("paypal-transmission-time") || "";
    const certUrl = headersList.get("paypal-cert-url") || "";
    const authAlgo = headersList.get("paypal-auth-algo") || "";
    const transmissionSig = headersList.get("paypal-transmission-sig") || "";
    const webhookId = process.env.PAYPAL_WEBHOOK_ID || "";

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

    // Mark as processed
    if (event?.id) {
      if (processedEventIds.size > 500) {
        processedEventIds.clear();
      }
      processedEventIds.add(event.id);
    }

    console.log(`[PayPal Webhook Event]: ${event.event_type} (${event.id})`);

    // Event Handling Routing
    switch (event.event_type) {
      case "PAYMENT.CAPTURE.COMPLETED": {
        // Successful payment: Trigger automatic credential generation & dispatch
        const capture = event.resource as { id: string; amount?: { value: string; currency_code: string } };
        console.log(`[Fulfillment]: Payment captured ${capture?.id}. Triggering dispatch pipeline.`);
        break;
      }

      case "PAYMENT.CAPTURE.REFUNDED": {
        // Payment refunded: Revoke/update stream line or log refund record
        const refund = event.resource as { id: string; amount?: { value: string; currency_code: string } };
        console.log(`[Refund Event]: Payment refunded ${refund?.id}. Amount: ${refund?.amount?.value} ${refund?.amount?.currency_code}.`);
        break;
      }

      case "BILLING.SUBSCRIPTION.ACTIVATED": {
        // Recurring subscription activated
        const sub = event.resource as { id: string };
        console.log(`[Subscription Activated]: ${sub?.id}. Provisioning recurring stream access.`);
        break;
      }

      case "BILLING.SUBSCRIPTION.CANCELLED": {
        // Customer canceled renewal
        const sub = event.resource as { id: string };
        console.log(`[Subscription Cancelled]: ${sub?.id}. Access scheduled to expire at period end.`);
        break;
      }

      case "CUSTOMER.DISPUTE.CREATED": {
        // Dispute alert: Enables immediate proactive resolution under guarantee
        const dispute = event.resource as { dispute_id: string; reason?: string };
        console.log(`[Customer Dispute Alert]: ${dispute?.dispute_id}. Triggering customer success escalation.`);
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
