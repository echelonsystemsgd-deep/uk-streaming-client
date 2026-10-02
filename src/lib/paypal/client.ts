import {
  CreateOrderPayload,
  PayPalOrderResponse,
  PayPalCaptureResponse,
  CreateSubscriptionPayload,
  PayPalSubscriptionResponse,
} from "./types";
import { CATALOG_CURRENCY } from "@/data/plans";

const PAYPAL_ENV = process.env.PAYPAL_ENVIRONMENT || "sandbox";
const PAYPAL_API_BASE =
  PAYPAL_ENV === "production"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

const CLIENT_ID = process.env.PAYPAL_CLIENT_ID || "";
const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET || "";

// In-memory token cache to prevent repeated OAuth token handshakes
let cachedToken: string | null = null;
let tokenExpiresAt = 0;

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
 * Returns the public Client ID for frontend SDK rendering.
 */
export function getPayPalClientId(): string {
  return CLIENT_ID;
}

/**
 * Retrieves OAuth 2.0 bearer token from PayPal Identity Services with in-memory caching.
 */
export async function getPayPalAccessToken(forceRefresh = false): Promise<string> {
  if (!isPayPalConfigured()) {
    return "MOCK_PAYPAL_ACCESS_TOKEN";
  }

  const now = Date.now();
  // Reuse token if valid and not within 60 seconds of expiring
  if (!forceRefresh && cachedToken && now < tokenExpiresAt - 60000) {
    return cachedToken;
  }

  const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      "Accept-Language": "en_US",
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`PayPal OAuth authentication failed: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const accessToken: string = data.access_token;
  cachedToken = accessToken;
  tokenExpiresAt = now + (data.expires_in || 32400) * 1000;
  return accessToken;
}

/**
 * Creates an order via PayPal Orders v2 API with idempotency protection.
 * Spec: checkout_orders_v2.json
 */
export async function createPayPalOrder(
  payload: CreateOrderPayload,
  requestId?: string
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
  const idempotencyId = requestId || crypto.randomUUID();

  const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      "PayPal-Request-Id": idempotencyId,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`PayPal Create Order error (${response.status}): ${errorBody}`);
  }

  return response.json();
}

/**
 * Captures an authorized PayPal order with idempotency protection and decline handling.
 * Spec: checkout_orders_v2.json (Capture an order)
 */
export async function capturePayPalOrder(
  orderId: string,
  requestId?: string
): Promise<PayPalCaptureResponse> {
  if (!isPayPalConfigured()) {
    // High-fidelity Sandbox Emulation response aligned with CATALOG_CURRENCY
    const mockCaptureId = `CAP-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    return {
      id: orderId,
      status: "COMPLETED",
      payment_source: {
        paypal: {
          email_address: "customer@example.com",
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
                amount: { currency_code: CATALOG_CURRENCY.code, value: "89.99" },
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
  const idempotencyId = requestId || crypto.randomUUID();

  const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      "PayPal-Request-Id": idempotencyId,
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    let parsedError: Record<string, unknown> | null = null;
    try {
      parsedError = JSON.parse(errorBody);
    } catch {
      // Non-JSON response
    }

    const details = parsedError?.details as Array<{ issue?: string; description?: string }> | undefined;
    const issue = details?.[0]?.issue || "";
    const debugId = parsedError?.debug_id || "";

    const error = new Error(`PayPal Capture Order error (${response.status}) [DebugId: ${debugId}]: ${errorBody}`);
    // Attach issue code for frontend recovery (e.g. INSTRUMENT_DECLINED)
    (error as Error & { issue?: string; debugId?: string }).issue = issue;
    (error as Error & { issue?: string; debugId?: string }).debugId = String(debugId);
    throw error;
  }

  return response.json();
}

/**
 * Creates a recurring subscription via PayPal Subscriptions v1 API.
 * Spec: billing_subscriptions_v1.json
 */
export async function createPayPalSubscription(
  payload: CreateSubscriptionPayload,
  requestId?: string
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
  const idempotencyId = requestId || crypto.randomUUID();

  const response = await fetch(`${PAYPAL_API_BASE}/v1/billing/subscriptions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      "PayPal-Request-Id": idempotencyId,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`PayPal Subscription Create error (${response.status}): ${errorBody}`);
  }

  return response.json();
}

/**
 * Verifies webhook signatures to ensure notifications originate strictly from PayPal.
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
    // In local sandbox mock without keys, require at least headers to be present
    return Boolean(params.transmissionId && params.transmissionSig);
  }

  if (!params.webhookId || params.webhookId.includes("placeholder")) {
    console.error("[PayPal Webhook Error]: PAYPAL_WEBHOOK_ID is unconfigured.");
    return false;
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

  if (!response.ok) {
    const errText = await response.text();
    console.warn(`[PayPal Webhook Verify Failed] Status ${response.status}: ${errText}`);
    return false;
  }

  const data = await response.json();
  return data.verification_status === "SUCCESS";
}
