# PayPal REST API: Authentication & Environments Reference

Official Documentation: https://developer.paypal.com/api/rest

## 1. Environments & Base URLs

PayPal provides two separate environments:

| Environment | Base URL | Usage |
| :--- | :--- | :--- |
| **Sandbox** | `https://api-m.sandbox.paypal.com` | Testing, mock payments, sandbox buyer & seller accounts |
| **Production** | `https://api-m.paypal.com` | Real live transactions, requires approved Business account |

> **Important**: Never use live credentials on sandbox endpoints, or vice versa. The sandbox environment is completely isolated.

---

## 2. Credentials

Every PayPal REST API application requires two credentials from the PayPal Developer Dashboard (`Apps & Credentials`):

- **Client ID**: Public identifier for your app (used by frontend SDKs and backend auth).
- **Client Secret**: Private secret key (MUST NEVER be exposed to browser/client-side code).

---

## 3. OAuth 2.0 Client Credentials Flow

PayPal uses standard OAuth 2.0 `Bearer` tokens. You exchange your `client_id` and `client_secret` for an access token.

### Endpoint:
`POST /v1/oauth2/token`

### Request Headers:
```http
POST /v1/oauth2/token HTTP/1.1
Host: api-m.sandbox.paypal.com
Accept: application/json
Accept-Language: en_US
Content-Type: application/x-www-form-urlencoded
Authorization: Basic <base64_encoded(client_id:client_secret)>
```

### Request Body:
```
grant_type=client_credentials
```

### cURL Example:
```bash
curl -v -X POST "https://api-m.sandbox.paypal.com/v1/oauth2/token" \
  -u "YOUR_CLIENT_ID:YOUR_CLIENT_SECRET" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials"
```

### Success Response (HTTP 200):
```json
{
  "scope": "https://uri.paypal.com/services/invoicing https://uri.paypal.com/services/payments/realtimepayment ...",
  "access_token": "A21AAFEpH4PsADK7qSS7pSRsgzfENtu-Q1ysgEDVDESseMHBYXVJYE8ovjj68elIDy8nF26AwPhfXTIeWAZHSLIsQkSYz9ifg",
  "token_type": "Bearer",
  "app_id": "APP-80W284485P519543T",
  "expires_in": 32400,
  "nonce": "2026-10-02T19:00:00ZaYZlGvEkV4yVSz8g6bAKFoGSEzuy3CQcz3ljhibkOHg"
}
```

---

## 4. Token Caching & Lifecycle Best Practices

1. **Do NOT request a new token per API call**:
   - Access tokens typically have an `expires_in` of ~32,400 seconds (9 hours).
   - Calling `/v1/oauth2/token` before every request causes rate limits and unnecessary network latency.
2. **Implement an in-memory cache with safety buffer**:
   - Cache `access_token` and calculate `expires_at = currentTime + expires_in - 60 seconds`.
   - If current time >= `expires_at`, fetch a fresh token; otherwise reuse the cached token.
3. **Handle HTTP 401 Unauthorized**:
   - If an API request returns `401 Unauthorized`, invalidate the cached token, request a fresh token once, and retry the request.

---

## 5. Authenticated Request Headers

When calling any subsequent PayPal REST API endpoints, pass the access token in the `Authorization` header:

```http
Authorization: Bearer <access_token>
Content-Type: application/json
PayPal-Request-Id: <unique-uuid-v4>
```
