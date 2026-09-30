import { NextResponse } from "next/server";
import { PRICING_PLANS } from "@/data/plans";
import { createPayPalSubscription } from "@/lib/paypal/client";
import { CreateSubscriptionPayload } from "@/lib/paypal/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { planId, email, subscriberName } = body;

    if (!planId) {
      return NextResponse.json(
        { error: "planId is required" },
        { status: 400 }
      );
    }

    const plan = PRICING_PLANS.find((p) => p.id === planId);
    if (!plan || plan.isPendingCatalogue) {
      return NextResponse.json(
        { error: "Invalid subscription plan selected" },
        { status: 400 }
      );
    }

    // PayPal Billing Plan IDs can be configured per environment; using standard mapped placeholders
    const billingPlanId =
      process.env[`PAYPAL_BILLING_PLAN_${plan.id.toUpperCase().replace(/-/g, "_")}`] ||
      `P-${plan.id.toUpperCase()}-SUBSCRIPTION`;

    const subPayload: CreateSubscriptionPayload = {
      plan_id: billingPlanId,
      subscriber: {
        name: {
          given_name: subscriberName?.split(" ")[0] || "Valued",
          surname: subscriberName?.split(" ").slice(1).join(" ") || "Subscriber",
        },
        email_address: email || "customer@chitramtv.eu",
      },
      application_context: {
        brand_name: "ChitramTV UK",
        locale: "en-GB",
        shipping_preference: "NO_SHIPPING",
        user_action: "SUBSCRIBE_NOW",
      },
    };

    const subscription = await createPayPalSubscription(subPayload);

    return NextResponse.json({
      subscriptionId: subscription.id,
      status: subscription.status,
      plan: {
        id: plan.id,
        name: plan.name,
        period: plan.period,
        price: plan.price,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    console.error("[PayPal Create Subscription Error]:", message);
    return NextResponse.json(
      { error: "Failed to initialize PayPal subscription", details: message },
      { status: 500 }
    );
  }
}
