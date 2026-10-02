# PayPal REST API: Orders v2 Reference

Official Documentation: https://developer.paypal.com/docs/api/orders/v2/

The Orders v2 API coordinates the purchase flow between the merchant server, the buyer, and PayPal.

---

## 1. Core Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/v2/checkout/orders` | Create a new order with `CAPTURE` or `AUTHORIZE` intent |
| `GET` | `/v2/checkout/orders/{id}` | Show order details and current status |
| `POST` | `/v2/checkout/orders/{id}/capture` | Capture payment for an approved order |
| `POST` | `/v2/checkout/orders/{id}/authorize` | Authorize payment for an approved order (hold funds up to 29 days) |
| `PATCH` | `/v2/checkout/orders/{id}` | Update order details (e.g. shipping address or amounts before capture) |

---

## 2. Order Intent: `CAPTURE` vs `AUTHORIZE`

- **`CAPTURE`**: Standard instant checkout. Funds are immediately settled to your PayPal balance as soon as the buyer approves and your server calls `/capture`.
- **`AUTHORIZE`**: Two-step checkout. Places an authorization hold on the buyer's funds (guaranteed for 3 days, valid up to 29 days). Capture happens later when products ship via `/v2/payments/authorizations/{id}/capture`.

---

## 3. Creating an Order (`POST /v2/checkout/orders`)

### Headers:
```http
POST /v2/checkout/orders HTTP/1.1
Authorization: Bearer <access_token>
Content-Type: application/json
PayPal-Request-Id: 7b92603e-dda5-47e2-8e10-9c29c87d4681
Prefer: return=representation
```

### Request Body:
```json
{
  "intent": "CAPTURE",
  "purchase_units": [
    {
      "reference_id": "PU1",
      "description": "Monthly Streaming Pass",
      "custom_id": "order-user-12345",
      "amount": {
        "currency_code": "GBP",
        "value": "25.00",
        "breakdown": {
          "item_total": {
            "currency_code": "GBP",
            "value": "20.00"
          },
          "tax_total": {
            "currency_code": "GBP",
            "value": "5.00"
          }
        }
      },
      "items": [
        {
          "name": "Streaming Pass",
          "description": "Premium 4K access",
          "quantity": "1",
          "unit_amount": {
            "currency_code": "GBP",
            "value": "20.00"
          },
          "category": "DIGITAL_GOODS"
        }
      ]
    }
  ],
  "application_context": {
    "brand_name": "UK Streaming Hub",
    "landing_page": "NO_PREFERENCE",
    "shipping_preference": "NO_SHIPPING",
    "user_action": "PAY_NOW",
    "return_url": "https://example.com/checkout/success",
    "cancel_url": "https://example.com/checkout/cancel"
  }
}
```

### Critical Rules for `amount`:
1. **String format**: Every amount value MUST be a string (e.g., `"25.00"`, NOT `25.00`).
2. **Decimal precision**: Currencies like GBP, USD, EUR require exactly 2 decimal digits (`"25.00"`). Non-decimal currencies (e.g., JPY) must not have decimals (`"2500"`).
3. **Exact Mathematical Match**:
   `amount.value` MUST strictly equal:
   `item_total + tax_total + shipping + handling + insurance - shipping_discount - discount`
   And `item_total` MUST strictly equal the sum of `items[i].unit_amount * items[i].quantity`.
   Failure to match results in HTTP 422 `AMOUNT_MISMATCH`.

---

## 4. Order Lifecycle & Statuses

```
[Create Order] -> status: CREATED
      │
      ▼
[Buyer Approves in PayPal Modal / Redirect] -> status: APPROVED
      │
      ├──> If intent: CAPTURE   ──> [Server calls /capture]   ──> status: COMPLETED
      │
      └──> If intent: AUTHORIZE ──> [Server calls /authorize] ──> status: COMPLETED (authorization created)
```

| Status | Meaning | Next Step |
| :--- | :--- | :--- |
| `CREATED` | Order created, awaiting buyer review. | Present approval link / PayPal JS Buttons to buyer. |
| `SAVED` | Order saved for later. | Can be updated or completed later. |
| `APPROVED` | Buyer has authenticated and approved the payment. | Server must call `/capture` or `/authorize`. |
| `VOIDED` | Order expired or was voided. | Must create a new order. |
| `COMPLETED` | Funds successfully captured or authorized. | Deliver goods/services to customer. |
| `PAYER_ACTION_REQUIRED` | Extra authentication step (e.g. 3D Secure) required. | Redirect buyer to payer action URL. |

---

## 5. Capturing an Order (`POST /v2/checkout/orders/{id}/capture`)

Once the frontend buyer approves the order, your frontend passes `orderID` to your backend server. The backend captures the payment:

### Endpoint:
`POST /v2/checkout/orders/{id}/capture`

### Headers:
```http
POST /v2/checkout/orders/{id}/capture HTTP/1.1
Authorization: Bearer <access_token>
Content-Type: application/json
PayPal-Request-Id: capture-7b92603e-dda5-47e2-8e10-9c29c87d4681
Prefer: return=representation
```

### Request Body:
Can be `{}` (empty object).

### Success Response (HTTP 201 Created):
```json
{
  "id": "5O190127TN364715T",
  "status": "COMPLETED",
  "purchase_units": [
    {
      "reference_id": "PU1",
      "payments": {
        "captures": [
          {
            "id": "3C679366HH2525463",
            "status": "COMPLETED",
            "amount": {
              "currency_code": "GBP",
              "value": "25.00"
            },
            "final_capture": true,
            "seller_protection": {
              "status": "ELIGIBLE"
            },
            "create_time": "2026-10-02T19:30:00Z",
            "update_time": "2026-10-02T19:30:01Z"
          }
        ]
      }
    }
  ],
  "payer": {
    "name": {
      "given_name": "John",
      "surname": "Doe"
    },
    "email_address": "buyer@example.com",
    "payer_id": "QZBRLQG5NE5TA"
  }
}
```
Record the `captures[0].id` in your database as the settlement reference for accounting and future refunds.
