# PayPal REST API: Webhooks & Signature Verification Reference

Official Documentation: https://developer.paypal.com/api/rest/webhooks/

Webhooks allow PayPal to notify your backend asynchronously when events occur (e.g. payment completed, subscription renewed, dispute opened).

---

## 1. Key Webhook Event Types

| Event Name | Meaning | Recommended Action |
| :--- | :--- | :--- |
| `CHECKOUT.ORDER.APPROVED` | Buyer approved an order. | Secondary safeguard if frontend redirects fail; backend can trigger capture. |
| `CHECKOUT.ORDER.COMPLETED` | Order workflow completed. | Record order completion. |
| `PAYMENT.CAPTURE.COMPLETED` | Funds successfully settled to your balance. | Mark order fulfilled, grant digital access, generate invoice. |
| `PAYMENT.CAPTURE.DENIED` | Payment capture failed/rejected. | Flag order as failed, notify customer. |
| `PAYMENT.CAPTURE.REFUNDED` | Refund issued on a capture. | Update ledger, revoke subscription/access if applicable. |
| `BILLING.SUBSCRIPTION.ACTIVATED` | Subscription is now active. | Activate user recurring access. |
| `BILLING.SUBSCRIPTION.CANCELLED` | Subscription cancelled by buyer/merchant. | Schedule access expiration at cycle end. |
| `CUSTOMER.DISPUTE.CREATED` | Buyer filed a dispute/chargeback. | Alert operations team, lock digital goods if policy requires. |

---

## 2. Signature Verification: Why It Is Mandatory

> **CRITICAL SECURITY REQUIREMENT**: Never trust incoming webhook payloads without verifying PayPal's cryptographic signature. Malicious actors can spoof webhook HTTP requests to grant themselves free subscriptions or mark unpaid orders as fulfilled.

---

## 3. The 5 Required PayPal HTTP Headers

When PayPal posts an event to your webhook listener URL, it includes these 5 headers:

1. `PAYPAL-AUTH-ALGO` (e.g., `SHA256withRSA`)
2. `PAYPAL-CERT-URL` (URL of PayPal's public cert)
3. `PAYPAL-TRANSMISSION-ID` (Unique UUID for this delivery attempt)
4. `PAYPAL-TRANSMISSION-SIG` (The base64-encoded cryptographic signature)
5. `PAYPAL-TRANSMISSION-TIME` (Timestamp of transmission in UTC)

---

## 4. Verification via PayPal REST API

The most reliable, zero-maintenance method to verify is calling PayPal's verification endpoint:

### Endpoint:
`POST /v1/notifications/verify-webhook-signature`

### Request Headers:
```http
POST /v1/notifications/verify-webhook-signature HTTP/1.1
Authorization: Bearer <access_token>
Content-Type: application/json
```

### Request Body:
```json
{
  "auth_algo": "<Value of PAYPAL-AUTH-ALGO header>",
  "cert_url": "<Value of PAYPAL-CERT-URL header>",
  "transmission_id": "<Value of PAYPAL-TRANSMISSION-ID header>",
  "transmission_sig": "<Value of PAYPAL-TRANSMISSION-SIG header>",
  "transmission_time": "<Value of PAYPAL-TRANSMISSION-TIME header>",
  "webhook_id": "9B064893HG615432R",
  "webhook_event": {
    /* Exact raw JSON object received in the webhook body */
  }
}
```

### Verification Response:
```json
{
  "verification_status": "SUCCESS"
}
```

- If `verification_status === "SUCCESS"`: Process the event and return HTTP 200 immediately.
- If `verification_status === "FAILURE"`: Reject with HTTP 400 Bad Request and log security warning.

---

## 5. Webhook Idempotency & Retries

1. **At-Least-Once Delivery**: PayPal may retry sending the same webhook if your server does not return `HTTP 200` within 3 seconds.
2. **Deduplication**: Store `webhook_event.id` in a database table or Redis cache. If you receive an event ID that was already processed, immediately return `HTTP 200 OK` and ignore duplicate processing.
