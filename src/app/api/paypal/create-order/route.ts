import { NextResponse } from "next/server";
import { PRICING_PLANS } from "@/data/plans";
import { createPayPalOrder } from "@/lib/paypal/client";
import { CreateOrderPayload } from "@/lib/paypal/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { planId, email, shippingAddress } = body;

    if (!planId) {
      return NextResponse.json(
        { error: "planId is required" },
        { status: 400 }
      );
    }

    const plan = PRICING_PLANS.find((p) => p.id === planId);
    if (!plan || plan.isPendingCatalogue) {
      return NextResponse.json(
        { error: "Invalid plan selected" },
        { status: 400 }
      );
    }

    const isPhysical = plan.isHardwareOnly || plan.isBoxBundle;
    const formattedPrice = plan.price.toFixed(2);

    const orderPayload: CreateOrderPayload = {
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: plan.id,
          description: `ChitramTV UK - ${plan.name}`,
          custom_id: email || "anonymous-buyer",
          amount: {
            currency_code: "EUR",
            value: formattedPrice,
            breakdown: {
              item_total: {
                currency_code: "EUR",
                value: formattedPrice,
              },
            },
          },
          items: [
            {
              name: `ChitramTV ${plan.name}`,
              quantity: "1",
              description: plan.description.substring(0, 120),
              sku: plan.id,
              category: isPhysical ? "PHYSICAL_GOODS" : "DIGITAL_GOODS",
              unit_amount: {
                currency_code: "EUR",
                value: formattedPrice,
              },
            },
          ],
          ...(isPhysical && shippingAddress
            ? {
                shipping: {
                  type: "SHIPPING",
                  name: { full_name: shippingAddress.fullName || "Customer" },
                  address: {
                    address_line_1: shippingAddress.addressLine1 || "",
                    admin_area_2: shippingAddress.city || "",
                    postal_code: shippingAddress.postalCode || "",
                    country_code: shippingAddress.country || "GB",
                  },
                },
              }
            : {}),
        },
      ],
      application_context: {
        brand_name: "ChitramTV UK",
        locale: "en-GB",
        landing_page: "NO_PREFERENCE",
        shipping_preference: isPhysical
          ? shippingAddress
            ? "SET_PROVIDED_ADDRESS"
            : "GET_FROM_FILE"
          : "NO_SHIPPING",
        user_action: "PAY_NOW",
      },
    };

    const order = await createPayPalOrder(orderPayload);

    return NextResponse.json({
      orderId: order.id,
      status: order.status,
      plan: {
        id: plan.id,
        name: plan.name,
        price: plan.price,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    console.error("[PayPal Create Order Error]:", message);
    return NextResponse.json(
      { error: "Failed to initialize PayPal order", details: message },
      { status: 500 }
    );
  }
}
