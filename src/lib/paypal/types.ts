/**
 * PayPal REST API TypeScript Definitions
 * Directly aligned with official PayPal OpenAPI v3 specifications:
 * - checkout_orders_v2.json
 * - billing_subscriptions_v1.json
 * - notifications_webhooks_v1.json
 * - shipping_shipment_tracking_v1.json
 */

export type PayPalEnvironment = "sandbox" | "production";

export interface PayPalMoney {
  currency_code: string; // ISO 4217, e.g. "EUR", "GBP", "USD"
  value: string;         // e.g. "109.00"
}

export interface PayPalOrderItem {
  name: string;
  quantity: string;
  description?: string;
  sku?: string;
  category?: "DIGITAL_GOODS" | "PHYSICAL_GOODS";
  unit_amount: PayPalMoney;
}

export interface PayPalPurchaseUnitRequest {
  reference_id?: string;
  description?: string;
  custom_id?: string;
  invoice_id?: string;
  soft_descriptor?: string;
  amount: {
    currency_code: string;
    value: string;
    breakdown?: {
      item_total?: PayPalMoney;
      shipping?: PayPalMoney;
      handling?: PayPalMoney;
      tax_total?: PayPalMoney;
      discount?: PayPalMoney;
    };
  };
  items?: PayPalOrderItem[];
  shipping?: {
    type?: "SHIPPING" | "PICKUP";
    name?: { full_name: string };
    address?: {
      address_line_1: string;
      address_line_2?: string;
      admin_area_2: string; // city
      admin_area_1?: string; // state/county
      postal_code: string;
      country_code: string;
    };
  };
}

export interface CreateOrderPayload {
  intent: "CAPTURE" | "AUTHORIZE";
  purchase_units: PayPalPurchaseUnitRequest[];
  application_context?: {
    brand_name?: string;
    locale?: string;
    landing_page?: "LOGIN" | "BILLING" | "NO_PREFERENCE";
    shipping_preference?: "GET_FROM_FILE" | "NO_SHIPPING" | "SET_PROVIDED_ADDRESS";
    user_action?: "CONTINUE" | "PAY_NOW";
    return_url?: string;
    cancel_url?: string;
  };
}

export interface PayPalOrderResponse {
  id: string;
  status: "CREATED" | "SAVED" | "APPROVED" | "VOIDED" | "COMPLETED" | "PAYER_ACTION_REQUIRED";
  intent: string;
  create_time?: string;
  update_time?: string;
  links: Array<{
    href: string;
    rel: string;
    method: "GET" | "POST" | "PATCH" | "DELETE";
  }>;
}

export interface PayPalCaptureResponse {
  id: string;
  status: "COMPLETED" | "DECLINED" | "FAILED" | "PENDING";
  payment_source?: {
    paypal?: {
      email_address?: string;
      account_id?: string;
      name?: { given_name?: string; surname?: string };
    };
    card?: {
      last_digits?: string;
      brand?: string;
      type?: string;
    };
  };
  purchase_units?: Array<{
    reference_id: string;
    payments?: {
      captures?: Array<{
        id: string;
        status: string;
        amount: PayPalMoney;
        seller_protection?: {
          status: string;
          dispute_categories?: string[];
        };
        create_time: string;
      }>;
    };
  }>;
}

export interface CreateSubscriptionPayload {
  plan_id: string;
  start_time?: string;
  quantity?: string;
  shipping_amount?: PayPalMoney;
  subscriber: {
    name?: { given_name: string; surname: string };
    email_address: string;
    shipping_address?: {
      address_line_1: string;
      admin_area_2: string;
      postal_code: string;
      country_code: string;
    };
  };
  application_context?: {
    brand_name?: string;
    locale?: string;
    shipping_preference?: "GET_FROM_FILE" | "NO_SHIPPING" | "SET_PROVIDED_ADDRESS";
    user_action?: "SUBSCRIBE_NOW";
    return_url?: string;
    cancel_url?: string;
  };
}

export interface PayPalSubscriptionResponse {
  id: string;
  status: "APPROVAL_PENDING" | "APPROVED" | "ACTIVE" | "SUSPENDED" | "CANCELLED" | "EXPIRED";
  status_update_time?: string;
  id_plan?: string;
  start_time?: string;
  quantity?: string;
  subscriber?: {
    email_address?: string;
  };
  links: Array<{
    href: string;
    rel: string;
    method: string;
  }>;
}

export interface PayPalWebhookEvent<T = Record<string, unknown>> {
  id: string;
  event_version: string;
  create_time: string;
  resource_type: string;
  event_type:
    | "PAYMENT.CAPTURE.COMPLETED"
    | "PAYMENT.CAPTURE.DENIED"
    | "PAYMENT.CAPTURE.REFUNDED"
    | "CHECKOUT.ORDER.APPROVED"
    | "CHECKOUT.ORDER.COMPLETED"
    | "BILLING.SUBSCRIPTION.ACTIVATED"
    | "BILLING.SUBSCRIPTION.CANCELLED"
    | "BILLING.SUBSCRIPTION.EXPIRED"
    | "BILLING.SUBSCRIPTION.PAYMENT.FAILED"
    | "CUSTOMER.DISPUTE.CREATED"
    | "CUSTOMER.DISPUTE.RESOLVED";
  summary: string;
  resource: T;
  links: Array<{ href: string; rel: string; method: string }>;
}

export interface CheckoutClientRequest {
  planId: string;
  email: string;
  whatsapp?: string;
  deviceType?: string;
  macAddress?: string;
  shippingAddress?: {
    fullName: string;
    addressLine1: string;
    city: string;
    postalCode: string;
    country: string;
  };
  isSubscription?: boolean;
}

export interface RefundPaymentPayload {
  amount?: PayPalMoney;
  invoice_id?: string;
  note_to_payer?: string;
}

export interface PayPalRefundResponse {
  id: string;
  status: "COMPLETED" | "PENDING" | "FAILED" | "CANCELLED";
  amount: PayPalMoney;
  note_to_payer?: string;
  seller_payable_breakdown?: {
    gross_amount: PayPalMoney;
    paypal_fee?: PayPalMoney;
    net_amount?: PayPalMoney;
  };
  create_time: string;
  update_time?: string;
  links?: Array<{ href: string; rel: string; method: string }>;
}
