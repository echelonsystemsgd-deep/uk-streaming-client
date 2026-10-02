# PayPal REST API: Subscriptions & Billing Reference

Official Documentation: https://developer.paypal.com/docs/api/subscriptions/v1/

For recurring billing, memberships, and SaaS plans, PayPal uses the Subscriptions v1 API.

---

## 1. Subscription Hierarchy

```
1. Product  (e.g., "UK Streaming Service") ──> POST /v1/catalogs/products
      │
      ▼
2. Plan     (e.g., "Monthly Premium £12.99") ──> POST /v1/billing/plans
      │
      ▼
3. Subscription (Specific user's agreement)   ──> POST /v1/billing/subscriptions
```

---

## 2. Creating a Subscription Product

### Endpoint:
`POST /v1/catalogs/products`

```json
{
  "name": "UK Streaming Hub - Premium Tier",
  "description": "4K UHD streaming with multi-device access",
  "type": "DIGITAL",
  "category": "ONLINE_GAMING_OR_MEDIA_CONTENT"
}
```

Returns product ID (e.g. `PROD-XX12345`).

---

## 3. Creating a Billing Plan

### Endpoint:
`POST /v1/billing/plans`

```json
{
  "product_id": "PROD-XX12345",
  "name": "Premium Monthly Plan",
  "billing_cycles": [
    {
      "frequency": {
        "interval_unit": "MONTH",
        "interval_count": 1
      },
      "tenure_type": "REGULAR",
      "sequence": 1,
      "total_cycles": 0,
      "pricing_scheme": {
        "fixed_price": {
          "value": "12.99",
          "currency_code": "GBP"
        }
      }
    }
  ],
  "payment_preferences": {
    "auto_bill_outstanding": true,
    "setup_fee_failure_action": "CONTINUE",
    "payment_failure_threshold": 3
  }
}
```

Returns plan ID (e.g. `P-7890123`).

---

## 4. Creating a Subscription

### Endpoint:
`POST /v1/billing/subscriptions`

```json
{
  "plan_id": "P-7890123",
  "subscriber": {
    "name": {
      "given_name": "Jane",
      "surname": "Smith"
    },
    "email_address": "jane@example.com"
  },
  "application_context": {
    "brand_name": "UK Streaming Hub",
    "user_action": "SUBSCRIBE_NOW",
    "return_url": "https://example.com/subscription/success",
    "cancel_url": "https://example.com/subscription/cancel"
  }
}
```

The response returns links including `rel: "approve"`. Redirect user or load PayPal JS SDK with `vault=true`.

---

## 5. Subscription Statuses

- `APPROVAL_PENDING`: Subscription created, awaiting buyer sign-off.
- `APPROVED`: Buyer approved subscription.
- `ACTIVE`: First payment cleared, recurring billing active.
- `SUSPENDED`: Temporarily halted (can be resumed).
- `CANCELLED`: Permanently terminated.
- `EXPIRED`: Completed all cycles.
