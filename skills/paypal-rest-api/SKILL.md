---
name: paypal-rest-api
description: Use when building, testing, integrating, or debugging PayPal REST APIs (v1/v2), including Orders v2, Authorizations, Captures, Subscriptions, Webhook verification, and Idempotent Payment processing.
---

# PayPal REST API

Master guide and procedure for implementing robust, error-free PayPal REST API integrations. Follow these instructions to ensure payments, captures, webhooks, and subscriptions operate without flaws or duplicate charges.

---

## When using this skill:

1. **Check Environment & Credentials**: Confirm whether the target is `sandbox` (`https://api-m.sandbox.paypal.com`) or `production` (`https://api-m.paypal.com`). Store `PAYPAL_CLIENT_ID` and `PAYPAL_CLIENT_SECRET` in environment variables. **Never expose the client secret to frontend code**.
2. **Review Relevant References & Tools**:
   - Authentication & Token Lifecycle: [auth-and-environments.md](./references/auth-and-environments.md)
   - Orders v2 Creation & Capture: [orders-v2.md](./references/orders-v2.md)
   - Payments, Authorizations & Refunds: [payments-and-refunds.md](./references/payments-and-refunds.md)
   - Webhook Verification: [webhooks.md](./references/webhooks.md)
   - Errors, Validation & Idempotency: [errors-and-idempotency.md](./references/errors-and-idempotency.md)
   - Subscriptions & Recurring Billing: [subscriptions-v1.md](./references/subscriptions-v1.md)
   - Reusable SDK Scripts: [paypal_client.mjs](./scripts/paypal_client.mjs) (Node.js) & [paypal_client.py](./scripts/paypal_client.py) (Python)
3. **Follow the Standard Integration Workflow**:
   - **Step 1**: Retrieve and cache OAuth2 Bearer token with a 60-second expiration safety buffer.
   - **Step 2**: Generate unique UUID v4 for the `PayPal-Request-Id` header to guarantee idempotent order creation and payment capture.
   - **Step 3**: Format currency amounts strictly as 2-decimal strings (e.g. `"29.99"`). Ensure item totals, tax totals, and discounts match the order total down to the cent.
   - **Step 4**: Server creates order (`POST /v2/checkout/orders`) and returns `orderID` to frontend.
   - **Step 5**: Buyer approves order in PayPal modal/checkout.
   - **Step 6**: Server captures payment (`POST /v2/checkout/orders/{id}/capture`), extracts `captures[0].id`, and records settlement.
4. **Validate & Harden Before Finishing**:
   - Implement signature verification for all incoming webhooks using `POST /v1/notifications/verify-webhook-signature`.
   - Store incoming `webhook_event.id` to prevent duplicate processing from PayPal retry attempts.
   - Handle `INSTRUMENT_DECLINED` on the frontend with `actions.restart()`.
   - Log `debug_id` from any non-2xx PayPal response for support tracing.

---

## Directory & Resource Map

```text
paypal-rest-api/
├── SKILL.md                          # Main procedure & runbook (this file)
├── references/                       # Complete API specs, schemas & policies
│   ├── auth-and-environments.md      # OAuth2 token flow, environments, caching
│   ├── orders-v2.md                  # Orders v2 endpoints, amounts, lifecycle
│   ├── payments-and-refunds.md       # Capture management, refunds, voids
│   ├── webhooks.md                   # Webhook events, 5 headers, signature verification
│   ├── errors-and-idempotency.md     # PayPal-Request-Id, HTTP error handling, debug_id
│   └── subscriptions-v1.md           # Products, billing plans, subscription lifecycle
├── scripts/                          # Reusable production-ready clients & testing tools
│   ├── paypal_client.mjs             # Node.js / ES Module client (zero dependencies)
│   ├── paypal_client.py              # Python client (urllib standard library only)
│   ├── test_auth.mjs                 # Node.js CLI script to test sandbox/live credentials
│   ├── test_auth.py                  # Python CLI script to test sandbox/live credentials
│   └── verify_webhook.py             # CLI script to verify webhook payload signatures
├── assets/                           # Reusable templates, schemas, and UI components
│   ├── .env.paypal.example           # Environment variables template
│   ├── sample_order_create_payload.json # Valid Orders v2 JSON payload with breakdown
│   ├── sample_order_capture_response.json # Sample successful capture response
│   ├── sample_webhook_event.json     # Standard webhook payload structure
│   └── paypal_button_integration.html # Full client-to-server PayPal JS SDK v5 demo
└── agents/
    └── openai.yaml                   # Codex / Agent UI metadata & capabilities
```

---

## Critical Golden Rules (Zero-Flaw Integration)

### 1. Currency Formatting & Decimal Precision
- **Always strings**: Never send numeric floats (`19.99` is invalid JSON for PayPal; send `"19.99"`).
- **Exact 2 decimals for standard currencies**: USD, GBP, EUR must have two decimal digits (`"25.00"`, not `"25"` or `"25.0"`).
- **Zero-decimal currencies**: Currencies like JPY, HUF, TWD must not include decimal places (`"2500"`).
- **Breakdown arithmetic**: `amount.value` must equal `item_total + tax_total + shipping + handling + insurance - shipping_discount - discount`. Any mismatch causes `422 UNPROCESSABLE_ENTITY (AMOUNT_MISMATCH)`.

### 2. Idempotency on Every Mutating Call
- Always pass `PayPal-Request-Id: <UUID>` header on `POST /v2/checkout/orders` and `POST /v2/checkout/orders/{id}/capture`.
- If an HTTP 500/503 error occurs, retry the request using the **exact same** request ID. PayPal will safely return the result of the original action without double charging.

### 3. Webhook Cryptographic Verification
- Never update order status in a production database based solely on unverified incoming HTTP POST payloads.
- Always forward the 5 PayPal headers (`PAYPAL-AUTH-ALGO`, `PAYPAL-CERT-URL`, `PAYPAL-TRANSMISSION-ID`, `PAYPAL-TRANSMISSION-SIG`, `PAYPAL-TRANSMISSION-TIME`) to `/v1/notifications/verify-webhook-signature`. Only proceed when `verification_status === "SUCCESS"`.

### 4. Client Secret Isolation
- Client secrets (`PAYPAL_CLIENT_SECRET`) must reside exclusively on backend servers. Frontend code (Next.js client components, React, HTML) only requires `PAYPAL_CLIENT_ID` for loading the PayPal JavaScript SDK.

---

## Quick Start Code Example (Next.js / Node.js)

```javascript
import { PayPalClient } from "./scripts/paypal_client.mjs";

const paypal = new PayPalClient({
  clientId: process.env.PAYPAL_CLIENT_ID,
  clientSecret: process.env.PAYPAL_CLIENT_SECRET,
  environment: process.env.PAYPAL_ENVIRONMENT || "sandbox",
});

// Create Order API Route
export async function createOrderHandler(req, res) {
  const order = await paypal.createOrder({
    amount: "29.99",
    currency: "GBP",
    intent: "CAPTURE",
    description: "UK Streaming VIP Pass",
  });
  return res.json({ id: order.id });
}

// Capture Order API Route
export async function captureOrderHandler(req, res) {
  const { orderId } = req.body;
  const capture = await paypal.captureOrder(orderId);
  return res.json(capture);
}
```
