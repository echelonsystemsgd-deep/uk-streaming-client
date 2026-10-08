import { NextResponse } from "next/server";
import { PRICING_PLANS, CATALOG_CURRENCY, BRAND_NAME } from "@/data/plans";
import { createPayPalOrder } from "@/lib/paypal/client";
import { CreateOrderPayload, PayPalOrderItem } from "@/lib/paypal/types";

interface CartInputItem {
  id: string;
  quantity: number;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { planId, cartItems, email, phone, shippingAddress, accountIdentifier } = body;

    // Determine host origin for return and cancel redirect URLs
    const headerOrigin = request.headers.get("origin") || request.headers.get("referer");
    let baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://chitramtv.co.uk";
    if (headerOrigin) {
      try {
        const parsed = new URL(headerOrigin);
        baseUrl = parsed.origin;
      } catch {
        // Fall back to default
      }
    }

    let itemsToProcess: Array<{ plan: (typeof PRICING_PLANS)[0]; quantity: number }> = [];

    if (cartItems && Array.isArray(cartItems) && cartItems.length > 0) {
      for (const item of cartItems as CartInputItem[]) {
        const foundPlan = PRICING_PLANS.find((p) => p.id === item.id);
        if (foundPlan) {
          itemsToProcess.push({ plan: foundPlan, quantity: Math.max(1, item.quantity || 1) });
        }
      }
    } else if (planId) {
      const singlePlan = PRICING_PLANS.find((p) => p.id === planId);
      if (singlePlan) {
        itemsToProcess.push({ plan: singlePlan, quantity: 1 });
      }
    }

    if (itemsToProcess.length === 0) {
      return NextResponse.json(
        { error: "A valid planId or cartItems array is required" },
        { status: 400 }
      );
    }

    const hasPhysicalGoods = itemsToProcess.some(
      (item) => item.plan.isHardwareOnly || item.plan.isBoxBundle
    );

    const totalCalculated = itemsToProcess.reduce(
      (sum, item) => sum + item.plan.price * item.quantity,
      0
    );
    const formattedTotalPrice = totalCalculated.toFixed(2);

    const paypalItems: PayPalOrderItem[] = itemsToProcess.map((item) => ({
      name: item.plan.name.substring(0, 127),
      quantity: String(item.quantity),
      description: item.plan.description.substring(0, 127),
      sku: item.plan.sku || item.plan.id,
      category: (item.plan.isHardwareOnly || item.plan.isBoxBundle)
        ? "PHYSICAL_GOODS"
        : "DIGITAL_GOODS",
      unit_amount: {
        currency_code: CATALOG_CURRENCY.code,
        value: item.plan.price.toFixed(2),
      },
    }));

    const primaryPlan = itemsToProcess[0].plan;

    const orderPayload: CreateOrderPayload = {
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: primaryPlan.id,
          description: `${BRAND_NAME} - ${itemsToProcess.length === 1 ? primaryPlan.name : `${itemsToProcess.length} Items Checkout`}`.substring(0, 127),
          custom_id: `${email || "guest"}|${accountIdentifier || "new"}|${phone || ""}`.substring(0, 127),
          amount: {
            currency_code: CATALOG_CURRENCY.code,
            value: formattedTotalPrice,
            breakdown: {
              item_total: {
                currency_code: CATALOG_CURRENCY.code,
                value: formattedTotalPrice,
              },
            },
          },
          items: paypalItems,
          ...(hasPhysicalGoods && shippingAddress
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
        brand_name: BRAND_NAME,
        locale: "en-GB",
        landing_page: "NO_PREFERENCE",
        shipping_preference: hasPhysicalGoods
          ? shippingAddress
            ? "SET_PROVIDED_ADDRESS"
            : "GET_FROM_FILE"
          : "NO_SHIPPING",
        user_action: "PAY_NOW",
        return_url: `${baseUrl}/checkout/success`,
        cancel_url: `${baseUrl}/checkout/cancelled`,
      },
    };

    const order = await createPayPalOrder(orderPayload);

    // Extract official PayPal redirect approval URL
    const approveLink = order.links?.find(
      (link) => link.rel === "approve" || link.rel === "payer-action"
    );

    return NextResponse.json({
      orderId: order.id,
      status: order.status,
      approvalUrl: approveLink?.href || null,
      totalAmount: formattedTotalPrice,
      currency: CATALOG_CURRENCY.code,
      itemCount: itemsToProcess.length,
      plan: {
        id: primaryPlan.id,
        name: primaryPlan.name,
        price: primaryPlan.price,
        currency: CATALOG_CURRENCY.code,
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
