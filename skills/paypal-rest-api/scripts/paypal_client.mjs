/**
 * PayPal REST API Client Helper (Node.js / ES Module)
 * Compatible with Node 18+, Next.js API Routes, Express, and modern JS.
 * Zero external dependencies (uses native fetch, crypto, and Buffer).
 */

import crypto from "crypto";

export class PayPalClient {
  /**
   * @param {Object} [config]
   * @param {string} [config.clientId]
   * @param {string} [config.clientSecret]
   * @param {"sandbox"|"production"} [config.environment="sandbox"]
   */
  constructor({ clientId, clientSecret, environment } = {}) {
    this.clientId = clientId || process.env.PAYPAL_CLIENT_ID;
    this.clientSecret = clientSecret || process.env.PAYPAL_CLIENT_SECRET;
    this.environment = (environment || process.env.PAYPAL_ENVIRONMENT || "sandbox").toLowerCase();

    if (!this.clientId || !this.clientSecret) {
      throw new Error("PayPal clientId and clientSecret are required.");
    }

    this.baseUrl =
      this.environment === "production" || this.environment === "live"
        ? "https://api-m.paypal.com"
        : "https://api-m.sandbox.paypal.com";

    this.cachedToken = null;
    this.tokenExpiresAt = 0;
  }

  /**
   * Get an OAuth2 Access Token with automatic caching.
   * @param {boolean} [forceRefresh=false]
   * @returns {Promise<string>}
   */
  async getAccessToken(forceRefresh = false) {
    const now = Date.now();
    if (!forceRefresh && this.cachedToken && now < this.tokenExpiresAt - 60000) {
      return this.cachedToken;
    }

    const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString("base64");
    const response = await fetch(`${this.baseUrl}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: "grant_type=client_credentials",
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`PayPal OAuth Failed (${response.status}): ${err}`);
    }

    const data = await response.json();
    this.cachedToken = data.access_token;
    this.tokenExpiresAt = now + data.expires_in * 1000;
    return this.cachedToken;
  }

  /**
   * Internal request helper with idempotency header.
   */
  async _request(method, path, body = null, requestId = null) {
    let token = await this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (["POST", "PATCH", "PUT"].includes(method.toUpperCase())) {
      headers["PayPal-Request-Id"] = requestId || crypto.randomUUID();
    }

    const options = {
      method: method.toUpperCase(),
      headers,
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    let response = await fetch(`${this.baseUrl}${path}`, options);

    // Auto-refresh token once if 401
    if (response.status === 401) {
      token = await this.getAccessToken(true);
      options.headers.Authorization = `Bearer ${token}`;
      response = await fetch(`${this.baseUrl}${path}`, options);
    }

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`PayPal API Error [${method} ${path}] (${response.status}): ${err}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : { status: response.status };
  }

  /**
   * Create an Order (Orders v2)
   */
  async createOrder({
    amount,
    currency = "GBP",
    intent = "CAPTURE",
    description = "",
    customId = "",
    returnUrl = "",
    cancelUrl = "",
    requestId = null,
  }) {
    const payload = {
      intent: intent.toUpperCase(),
      purchase_units: [
        {
          amount: {
            currency_code: currency.toUpperCase(),
            value: typeof amount === "number" ? amount.toFixed(2) : amount,
          },
        },
      ],
    };

    if (customId) payload.purchase_units[0].custom_id = customId;
    if (description) payload.purchase_units[0].description = description;

    if (returnUrl || cancelUrl) {
      payload.application_context = {};
      if (returnUrl) payload.application_context.return_url = returnUrl;
      if (cancelUrl) payload.application_context.cancel_url = cancelUrl;
    }

    return this._request("POST", "/v2/checkout/orders", payload, requestId);
  }

  /**
   * Retrieve order details
   */
  async getOrder(orderId) {
    return this._request("GET", `/v2/checkout/orders/${orderId}`);
  }

  /**
   * Capture payment for an approved order
   */
  async captureOrder(orderId, requestId = null) {
    return this._request("POST", `/v2/checkout/orders/${orderId}/capture`, {}, requestId);
  }

  /**
   * Authorize payment for an approved order
   */
  async authorizeOrder(orderId, requestId = null) {
    return this._request("POST", `/v2/checkout/orders/${orderId}/authorize`, {}, requestId);
  }

  /**
   * Refund a captured payment
   */
  async refundCapture(captureId, { amount, currency = "GBP", note = "", requestId = null } = {}) {
    const payload = {};
    if (amount) {
      payload.amount = {
        currency_code: currency.toUpperCase(),
        value: typeof amount === "number" ? amount.toFixed(2) : amount,
      };
    }
    if (note) payload.note_to_payer = note;

    return this._request("POST", `/v2/payments/captures/${captureId}/refund`, payload, requestId);
  }

  /**
   * Verify Webhook Signature
   */
  async verifyWebhookSignature({ webhookId, headers, eventBody }) {
    // Normalize header keys to uppercase
    const normalizedHeaders = Object.keys(headers).reduce((acc, k) => {
      acc[k.toUpperCase()] = headers[k];
      return acc;
    }, {});

    const payload = {
      auth_algo: normalizedHeaders["PAYPAL-AUTH-ALGO"],
      cert_url: normalizedHeaders["PAYPAL-CERT-URL"],
      transmission_id: normalizedHeaders["PAYPAL-TRANSMISSION-ID"],
      transmission_sig: normalizedHeaders["PAYPAL-TRANSMISSION-SIG"],
      transmission_time: normalizedHeaders["PAYPAL-TRANSMISSION-TIME"],
      webhook_id: webhookId,
      webhook_event: eventBody,
    };

    const res = await this._request("POST", "/v1/notifications/verify-webhook-signature", payload);
    return res.verification_status === "SUCCESS";
  }
}
