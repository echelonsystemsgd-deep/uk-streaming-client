import {
  CreateOrderPayload,
  PayPalOrderResponse,
  PayPalCaptureResponse,
  CreateSubscriptionPayload,
  PayPalSubscriptionResponse,
} from "./types";

const PAYPAL_ENV = process.env.PAYPAL_ENVIRONMENT || "sandbox";
const PAYPAL_API_BASE =
  PAYPAL_ENV === "production"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

const CLIENT_ID = process.env.PAYPAL_CLIENT_ID || "";
const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET || "";

/**
 * Checks if production/sandbox API keys are supplied or if placeholder mode is active.
 */
export function isPayPalConfigured(): boolean {
  if (!CLIENT_ID || !CLIENT_SECRET) return false;
  if (
    CLIENT_ID.includes("placeholder") ||
    CLIENT_SECRET.includes("placeholder") ||
    CLIENT_ID === "test"
  ) {
    return false;
  }
  return true;
}

/**
 * Retrieves OAuth 2.0 bearer token from PayPal Identity Services.
 */
export async function getPayPalAccessToken(): Promise<string> {
  if (!isPayPalConfigured()) {
    return "MOCK_PAYPAL_ACCESS_TOKEN";
  }

  const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`PayPal OAuth authentication failed: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.access_token;
}

/**
 * Creates an order via PayPal Orders v2 API.
 * Spec: checkout_orders_v2.json
 */
export async function createPayPalOrder(
  payload: CreateOrderPayload
): Promise<PayPalOrderResponse> {
  if (!isPayPalConfigured()) {
    // High-fidelity Sandbox Emulation for prototyping without active API secrets
    const mockOrderId = `ORDER-SANDBOX-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    return {
      id: mockOrderId,
      status: "CREATED",
      intent: payload.intent,
      create_time: new Date().toISOString(),
      links: [
        {
          href: `https://www.sandbox.paypal.com/checkoutnow?token=${mockOrderId}`,
          rel: "approve",
          method: "GET",
        },
        {
          href: `${PAYPAL_API_BASE}/v2/checkout/orders/${mockOrderId}`,
          rel: "self",
          method: "GET",
        },
        {
          href: `${PAYPAL_API_BASE}/v2/checkout/orders/${mockOrderId}/capture`,
          rel: "capture",
          method: "POST",
        },
      ],
    };
  }

  const accessToken = await getPayPalAccessToken();

  const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`PayPal Create Order error: ${response.status} - ${errorBody}`);
  }

  return response.json();
}

/**
 * Captures an authorized PayPal order.
 * Spec: checkout_orders_v2.json (Capture an order)
 */
export async function capturePayPalOrder(
  orderId: string
): Promise<PayPalCaptureResponse> {
  if (!isPayPalConfigured()) {
    // High-fidelity Sandbox Emulation response
    const mockCaptureId = `CAP-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    return {
      id: orderId,
      status: "COMPLETED",
      payment_source: {
        paypal: {
          email_address: "customer@chitramtv.eu",
          account_id: "SANDBOX_ACCOUNT_ID",
          name: { given_name: "Valued", surname: "Customer" },
        },
      },
      purchase_units: [
        {
          reference_id: "default",
          payments: {
            captures: [
              {
                id: mockCaptureId,
                status: "COMPLETED",
                amount: { currency_code: "EUR", value: "109.00" },
                seller_protection: {
                  status: "ELIGIBLE",
                  dispute_categories: [
                    "ITEM_NOT_RECEIVED",
                    "UNAUTHORIZED_TRANSACTION",
                  ],
                },
                create_time: new Date().toISOString(),
              },
            ],
          },
        },
      ],
    };
  }

  const accessToken = await getPayPalAccessToken();

  const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`PayPal Capture Order error: ${response.status} - ${errorBody}`);
  }

  return response.json();
}

/**
 * Creates a recurring subscription via PayPal Subscriptions v1 API.
 * Spec: billing_subscriptions_v1.json
 */
export async function createPayPalSubscription(
  payload: CreateSubscriptionPayload
): Promise<PayPalSubscriptionResponse> {
  if (!isPayPalConfigured()) {
    const mockSubId = `I-SANDBOX-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    return {
      id: mockSubId,
      status: "APPROVAL_PENDING",
      status_update_time: new Date().toISOString(),
      id_plan: payload.plan_id,
      subscriber: {
        email_address: payload.subscriber.email_address,
      },
      links: [
        {
          href: `https://www.sandbox.paypal.com/webapps/billing/subscriptions?ba_token=${mockSubId}`,
          rel: "approve",
          method: "GET",
        },
      ],
    };
  }

  const accessToken = await getPayPalAccessToken();

  const response = await fetch(`${PAYPAL_API_BASE}/v1/billing/subscriptions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`PayPal Subscription Create error: ${response.status} - ${errorBody}`);
  }

  return response.json();
}

/**
 * Verifies webhook signatures to ensure notifications originate from PayPal.
 * Spec: notifications_webhooks_v1.json
 */
export async function verifyPayPalWebhookSignature(params: {
  transmissionId: string;
  transmissionTime: string;
  certUrl: string;
  authAlgo: string;
  transmissionSig: string;
  webhookId: string;
  webhookEvent: Record<string, unknown>;
}): Promise<boolean> {
  if (!isPayPalConfigured()) {
    return true; // Auto-pass in sandbox/mock development
  }

  const accessToken = await getPayPalAccessToken();

  const response = await fetch(`${PAYPAL_API_BASE}/v1/notifications/verify-webhook-signature`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      transmission_id: params.transmissionId,
      transmission_time: params.transmissionTime,
      cert_url: params.certUrl,
      auth_algo: params.authAlgo,
      transmission_sig: params.transmissionSig,
      webhook_id: params.webhookId,
      webhook_event: params.webhookEvent,
    }),
  });

  if (!response.ok) return false;

  const data = await response.json();
  return data.verification_status === "SUCCESS";
}
