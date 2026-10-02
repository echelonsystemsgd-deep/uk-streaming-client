# PayPal REST API: Errors & Idempotency Reference

Official Documentation: https://developer.paypal.com/reference/guidelines/errors/
Idempotency Guide: https://developer.paypal.com/reference/guidelines/idempotency/

---

## 1. Idempotency: `PayPal-Request-Id`

To prevent double billing when network drops, client disconnects, or retries happen, PayPal REST APIs support idempotent requests using the `PayPal-Request-Id` header.

### Rules:
1. **Pass on Mutating Requests**: Always pass `PayPal-Request-Id` on `POST` and `PATCH` calls (especially Order creation, Captures, Authorizations, and Refunds).
2. **Format**: A unique string, typically a standard UUID v4 (e.g. `9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d`).
3. **Safe Retries**: If your server experiences a timeout or an HTTP 5xx error, retry the exact request with the **identical** `PayPal-Request-Id`. PayPal returns the cached original response without re-executing or double charging.
4. **Retention Window**: PayPal guarantees idempotency retention for 72 hours (minimum 6 hours depending on resource).

---

## 2. Standard PayPal Error Response Structure

When an API error occurs, PayPal returns a structured JSON payload:

```json
{
  "name": "UNPROCESSABLE_ENTITY",
  "message": "The requested action could not be performed, semantically incorrect, or failed business validation.",
  "debug_id": "f5127041a690d",
  "details": [
    {
      "field": "/purchase_units/@reference_id=='PU1'/amount/value",
      "value": "20.00",
      "issue": "AMOUNT_MISMATCH",
      "description": "Should equal sum of (items[].unit_amount * items[].quantity) + tax_total + shipping - discount."
    }
  ],
  "links": [
    {
      "href": "https://developer.paypal.com/docs/api/orders/v2/#error-AMOUNT_MISMATCH",
      "rel": "information_link",
      "method": "GET"
    }
  ]
}
```

> **Debug ID**: Always log the `debug_id` in your application error logs. If you contact PayPal Developer Support, this is the first item they will ask for to trace the transaction.

---

## 3. Common Error Issues & How to Resolve Them

| HTTP Code | Error Name / Issue | Root Cause | Solution |
| :--- | :--- | :--- | :--- |
| **401** | `AUTHENTICATION_FAILURE` | Invalid or expired Bearer token, or wrong client credentials. | Refresh OAuth access token or verify client_id / secret. |
| **422** | `AMOUNT_MISMATCH` | `amount.value` does not equal item total + tax + shipping - discounts. | Ensure exact decimal summation before sending request body. |
| **422** | `DECIMAL_PRECISION` | Sending numbers instead of strings or wrong decimal places. | Convert all currency numbers to strings with exactly 2 decimal places (`"10.00"`). |
| **422** | `ORDER_ALREADY_CAPTURED` | Calling `/capture` on an order that is already in `COMPLETED` state. | Check order status via `GET /v2/checkout/orders/{id}` before capturing. |
| **422** | `ORDER_NOT_APPROVED` | Calling `/capture` before buyer completed approval in PayPal modal. | Wait for buyer callback / `onApprove` trigger before calling `/capture`. |
| **422** | `INSTRUMENT_DECLINED` | Buyer's funding instrument (card/bank) was declined by issuer. | Prompt buyer to choose an alternate payment method in PayPal. |
| **404** | `RESOURCE_NOT_FOUND` | Specified order ID or capture ID does not exist in this environment. | Verify that you are not querying sandbox IDs against production, or vice versa. |
| **409** | `RESOURCE_CONFLICT` | A request with the same `PayPal-Request-Id` is currently processing. | Wait and retry after exponential backoff. |
