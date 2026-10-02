# PayPal REST API: Payments & Refunds Reference

Official Documentation: https://developer.paypal.com/docs/api/payments/v2/

Once an order is captured or authorized, payments are managed under the `/v2/payments` namespace.

---

## 1. Capturing an Authorization

If an order was created with `intent: "AUTHORIZE"`, the order capture produces an `authorization_id`. You capture the funds when ready to fulfill:

### Endpoint:
`POST /v2/payments/authorizations/{authorization_id}/capture`

### Headers:
```http
POST /v2/payments/authorizations/0TB7408892706342E/capture HTTP/1.1
Authorization: Bearer <access_token>
Content-Type: application/json
PayPal-Request-Id: auth-cap-93f8e02b-8a2b
```

### Request Body:
```json
{
  "amount": {
    "value": "25.00",
    "currency_code": "GBP"
  },
  "is_final_capture": true,
  "note_to_payer": "Charging for dispatched item"
}
```

---

## 2. Refunding a Capture

To refund a captured payment (full or partial):

### Endpoint:
`POST /v2/payments/captures/{capture_id}/refund`

### Request Body (Full Refund):
An empty JSON body `{}` or omitting `amount` defaults to a 100% full refund.

### Request Body (Partial Refund):
```json
{
  "amount": {
    "value": "10.00",
    "currency_code": "GBP"
  },
  "note_to_payer": "Partial refund for partial service cancellation",
  "invoice_id": "INV-REFUND-001"
}
```

### Success Response (HTTP 201 Created):
```json
{
  "id": "11S05096AA616013G",
  "status": "COMPLETED",
  "amount": {
    "value": "10.00",
    "currency_code": "GBP"
  },
  "seller_payable_breakdown": {
    "gross_amount": {
      "value": "10.00",
      "currency_code": "GBP"
    },
    "paypal_fee": {
      "value": "0.00",
      "currency_code": "GBP"
    },
    "net_amount": {
      "value": "10.00",
      "currency_code": "GBP"
    }
  },
  "create_time": "2026-10-02T19:40:00Z",
  "update_time": "2026-10-02T19:40:00Z"
}
```

---

## 3. Voiding an Authorization

If the buyer cancels an authorized order before shipment, release the hold immediately:

### Endpoint:
`POST /v2/payments/authorizations/{authorization_id}/void`

### Headers:
```http
POST /v2/payments/authorizations/0TB7408892706342E/void HTTP/1.1
Authorization: Bearer <access_token>
PayPal-Request-Id: void-83bfe1
```

Returns HTTP 204 No Content on success.
