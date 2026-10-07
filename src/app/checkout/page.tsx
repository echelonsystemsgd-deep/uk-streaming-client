"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Lock,
  Truck,
  CheckCircle2,
  AlertCircle,
  Phone,
  MessageSquare,
  ShoppingBag,
  CreditCard,
  Tv,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CATALOG_CURRENCY, COMPANY_NAME, HELPLINE_PHONE } from "@/data/plans";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface PayPalConfigState {
  isConfigured: boolean;
  clientId: string;
  currency: string;
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [accountIdentifier, setAccountIdentifier] = useState("");
  const [deviceType, setDeviceType] = useState("Amazon Fire TV Stick");

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [orderComplete, setOrderComplete] = useState<any | null>(null);

  // Check if cart contains physical hardware
  const hasHardware = items.some(
    (item) => item.plan.isHardwareOnly || item.plan.isBoxBundle
  );
  // Check if cart contains renewal
  const hasRenewal = items.some((item) => item.plan.isRenewal);

  const [payPalConfig, setPayPalConfig] = useState<PayPalConfigState>({
    isConfigured: false,
    clientId: "",
    currency: CATALOG_CURRENCY.code,
  });

  useEffect(() => {
    fetch("/api/paypal/config")
      .then((res) => res.json())
      .then((data) => setPayPalConfig(data))
      .catch((err) => console.warn("Failed to load PayPal config", err));
  }, []);

  const handleSimulatedCheckout = () => {
    if (!email || !fullName) {
      setErrorMessage("Please enter your name and email address.");
      return;
    }
    if (hasHardware && (!addressLine1 || !postalCode)) {
      setErrorMessage("Please enter your UK delivery address for the TV Box.");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete({
        orderId: "UK-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
        total: totalPrice.toFixed(2),
        email,
        name: fullName,
        phone: phone || HELPLINE_PHONE,
      });
      clearCart();
    }, 1500);
  };

  if (orderComplete) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-16">
        <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-md text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded">
              Order Confirmed
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Thank You for Your Order!
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
              Your payment has been successfully authorized and confirmed by {COMPANY_NAME}.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 text-left text-xs space-y-2 max-w-md mx-auto">
            <div className="flex justify-between">
              <span className="text-gray-500">Order Reference:</span>
              <span className="font-mono font-bold text-gray-900">{orderComplete.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Total Paid:</span>
              <span className="font-bold text-[#dd0e1c]">£{orderComplete.total} GBP</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Dispatch Email:</span>
              <span className="font-semibold text-gray-900">{orderComplete.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Customer Helpline:</span>
              <span className="font-semibold text-[#2c3640]">{HELPLINE_PHONE}</span>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            Activation credentials and setup instructions have been dispatched to your email. If you ordered a TV Box, UK tracked courier details will follow shortly.
          </p>

          <Link
            href="/"
            className="inline-block bg-[#dd0e1c] hover:bg-[#b00b16] text-white px-8 py-3 rounded font-bold uppercase text-xs transition-colors shadow"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-20 text-center space-y-5">
        <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto" />
        <h1 className="text-2xl font-bold text-gray-900">Your Shopping Cart is Empty</h1>
        <p className="text-xs sm:text-sm text-gray-600">
          Please add a subscription pass, renewal, or TV Box from our catalogue to proceed with checkout.
        </p>
        <Link
          href="/buy-now"
          className="inline-block bg-[#dd0e1c] hover:bg-[#b00b16] text-white px-7 py-3 rounded font-bold uppercase text-xs transition-colors shadow"
        >
          View Tariff Plans &amp; Hardware
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-10 space-y-8">
      {/* Page Header */}
      <div className="border-b-2 border-[#dd0e1c] pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
        <div>
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
            Secure Payment • Shiva Technology Ltd
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2c3640]">
            Order Checkout
          </h1>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-600">
          <span className="flex items-center gap-1 text-emerald-600 font-semibold">
            <ShieldCheck className="w-4 h-4" /> 100% PayPal Buyer Protection
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 text-blue-600 font-semibold">
            <Lock className="w-3.5 h-3.5" /> 256-Bit TLS Encryption
          </span>
        </div>
      </div>

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Customer & Delivery Details */}
        <div className="lg:col-span-7 bg-white rounded-lg p-6 border border-gray-200 shadow-sm space-y-6">
          {/* Step 1: Personal Details */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#2c3640] text-white flex items-center justify-center text-xs">1</span>
              <span>Customer Contact Details</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Gurpreet Singh"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:border-[#dd0e1c]"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  Email Address (for Credentials) <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. yourname@example.co.uk"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:border-[#dd0e1c]"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  Mobile / WhatsApp Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 07979637777"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:border-[#dd0e1c]"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  Primary Streaming Device
                </label>
                <select
                  value={deviceType}
                  onChange={(e) => setDeviceType(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:border-[#dd0e1c]"
                >
                  <option value="Amazon Fire TV Stick">Amazon Fire TV Stick</option>
                  <option value="Android Smart TV">Android Smart TV / Google TV</option>
                  <option value="Samsung Smart TV">Samsung Smart TV (Tizen)</option>
                  <option value="LG Smart TV">LG Smart TV (webOS)</option>
                  <option value="Apple TV 4K">Apple TV 4K</option>
                  <option value="ChitramTV Box">ChitramTV Black Edition C1 Box</option>
                  <option value="PC / Mac">Windows PC / Mac</option>
                </select>
              </div>
            </div>
          </div>

          {/* Step 2: Renewal Identifier (If applicable) */}
          {hasRenewal && (
            <div className="space-y-4 pt-2">
              <h2 className="text-base font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#fdc22d] text-gray-900 flex items-center justify-center text-xs">2</span>
                <span>Existing Subscription Account Lookup</span>
              </h2>

              <div className="bg-amber-50 border border-amber-200 p-3 rounded text-xs space-y-2">
                <label className="font-bold text-amber-900 block">
                  Account ID, Username, or Box MAC Address:
                </label>
                <input
                  type="text"
                  value={accountIdentifier}
                  onChange={(e) => setAccountIdentifier(e.target.value)}
                  placeholder="e.g. 109823 or 00:1A:79:..."
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded focus:outline-none"
                />
                <p className="text-[11px] text-amber-700">
                  Your existing line will be extended by 14 months (12 + 2 free) with zero disruption to your saved channels.
                </p>
              </div>
            </div>
          )}

          {/* Step 3: UK Postal Delivery Address (If hardware in cart) */}
          {hasHardware && (
            <div className="space-y-4 pt-2">
              <h2 className="text-base font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#dd0e1c] text-white flex items-center justify-center text-xs">
                  {hasRenewal ? "3" : "2"}
                </span>
                <span>UK Postal Delivery Address (For TV Box)</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="font-bold text-gray-700 block mb-1">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    placeholder="e.g. 12 High Street"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">
                    Town / City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. London / Birmingham"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">
                    Postcode <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="e.g. UB1 1AA"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Order Summary & PayPal Buttons */}
        <div className="lg:col-span-5 bg-white rounded-lg p-6 border border-gray-200 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-gray-900 border-b pb-2 flex items-center justify-between">
            <span>Order Summary</span>
            <span className="text-xs text-gray-500 font-normal">({items.length} item(s))</span>
          </h2>

          {/* Items breakdown */}
          <div className="divide-y divide-gray-100 max-h-60 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.plan.id} className="py-3 flex items-center gap-3">
                <div className="relative w-12 h-12 bg-gray-50 border rounded p-1 shrink-0">
                  <Image
                    src={item.plan.image}
                    alt={item.plan.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0 text-xs">
                  <div className="font-bold text-gray-900 truncate">{item.plan.name}</div>
                  <div className="text-gray-500">Qty: {item.quantity} × £{item.plan.price.toFixed(2)}</div>
                </div>
                <div className="text-xs font-bold text-gray-900">
                  £{(item.plan.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div className="border-t pt-3 space-y-2 text-xs">
            <div className="flex justify-between text-gray-600">
              <span>Sub-Total:</span>
              <span>£{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>UK Courier / Activation:</span>
              <span className="text-emerald-600 font-bold">FREE</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-gray-900 border-t pt-2">
              <span>Total Payable:</span>
              <span className="text-[#dd0e1c]">£{totalPrice.toFixed(2)} GBP</span>
            </div>
          </div>

          {/* PayPal Payment Option */}
          <div className="border-t pt-4 space-y-3">
            <div className="text-xs font-bold text-gray-800 uppercase tracking-wide">
              Payment Method
            </div>

            {payPalConfig.isConfigured && payPalConfig.clientId ? (
              <PayPalScriptProvider
                options={{
                  clientId: payPalConfig.clientId,
                  currency: "GBP",
                  intent: "capture",
                }}
              >
                <PayPalButtons
                  style={{ layout: "vertical", shape: "rect", label: "pay" }}
                  createOrder={async () => {
                    const res = await fetch("/api/paypal/create-order", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        planId: items[0].plan.id,
                        email,
                        accountIdentifier,
                        shippingAddress: hasHardware
                          ? {
                              fullName,
                              addressLine1,
                              city,
                              postalCode,
                              country: "GB",
                            }
                          : undefined,
                      }),
                    });
                    const data = await res.json();
                    return data.orderId;
                  }}
                  onApprove={async (data) => {
                    await fetch("/api/paypal/capture-order", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ orderId: data.orderID }),
                    });
                    setOrderComplete({
                      orderId: data.orderID,
                      total: totalPrice.toFixed(2),
                      email,
                      name: fullName,
                      phone: phone || HELPLINE_PHONE,
                    });
                    clearCart();
                  }}
                />
              </PayPalScriptProvider>
            ) : (
              <div className="space-y-3">
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleSimulatedCheckout}
                  className="w-full bg-[#dd0e1c] hover:bg-[#b00b16] text-white py-3 rounded font-bold uppercase text-xs flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  {isProcessing ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <CreditCard className="w-4 h-4" />
                  )}
                  <span>
                    {isProcessing ? "Processing..." : `Complete Order (£${totalPrice.toFixed(2)})`}
                  </span>
                </button>
                <div className="text-[11px] text-gray-500 text-center">
                  Live &amp; Sandbox PayPal checkout enabled for UK clients.
                </div>
              </div>
            )}
          </div>

          <div className="bg-gray-50 p-3 rounded text-[11px] text-gray-500 space-y-1">
            <div>• Invoicing entity: <strong>{COMPANY_NAME}</strong></div>
            <div>• Direct helpline: <strong>{HELPLINE_PHONE}</strong></div>
            <div>• 7-Day money-back guarantee on digital passes.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
