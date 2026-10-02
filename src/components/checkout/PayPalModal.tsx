"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Lock,
  AlertCircle,
  Mail,
  MapPin,
  MessageSquare,
  Tv,
  CreditCard,
  Sparkles,
  Info,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { PricingPlan, CATALOG_CURRENCY } from "@/data/plans";
import { Button } from "@/components/ui/button";
import { useScrollLock } from "@/hooks/useScrollLock";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface PayPalModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: PricingPlan | null;
}

interface OrderConfirmationData {
  orderId: string;
  captureId: string;
  referenceId: string;
  customerEmail: string;
  customerWhatsapp?: string;
  deviceType: string;
  dispatchTime: string;
  capturedAt: string;
  accountIdentifier?: string;
  isRenewal?: boolean;
}

interface PayPalConfigState {
  isConfigured: boolean;
  clientId: string;
  currency: string;
}

const STREAMING_DEVICES = [
  "Amazon Fire TV Stick",
  "Samsung Smart TV (Tizen)",
  "LG Smart TV (webOS)",
  "Android TV / Google TV",
  "Apple TV 4K",
  "ChitramTV Black Edition C1 Box",
  "Windows PC / Mac",
];

export function PayPalModal({ isOpen, onClose, plan }: PayPalModalProps) {
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [address, setAddress] = useState("");
  const [accountIdentifier, setAccountIdentifier] = useState("");
  const [deviceType, setDeviceType] = useState(STREAMING_DEVICES[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState<string>("Connecting to PayPal...");
  const [confirmation, setConfirmation] = useState<OrderConfirmationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // PayPal Environment Configuration
  const [payPalConfig, setPayPalConfig] = useState<PayPalConfigState>({
    isConfigured: false,
    clientId: "",
    currency: CATALOG_CURRENCY.code,
  });

  // Emulation modal state for local testing when keys are unset
  const [emulatedApprovalOrderId, setEmulatedApprovalOrderId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    fetch("/api/paypal/config")
      .then((res) => res.json())
      .then((data: PayPalConfigState) => setPayPalConfig(data))
      .catch((err) => console.warn("[PayPal Config Error]:", err));
  }, []);

  // Webview-tested position:fixed scroll lock
  useScrollLock(isOpen);

  if (!isOpen || !plan) return null;

  const currency = plan.currencySymbol || CATALOG_CURRENCY.symbol;
  const needsDeliveryAddress = plan.isBoxBundle || plan.isHardwareOnly;
  const isRenewal = Boolean(plan.isRenewal);
  const payIn3Amount = (plan.price / 3).toFixed(2);

  const isFormValid =
    Boolean(email && email.includes("@")) &&
    (!isRenewal || Boolean(accountIdentifier.trim())) &&
    (!needsDeliveryAddress || Boolean(address.trim()));

  const handleResetAndClose = () => {
    setConfirmation(null);
    setError(null);
    setEmail("");
    setWhatsapp("");
    setAddress("");
    setAccountIdentifier("");
    setEmulatedApprovalOrderId(null);
    setIsProcessing(false);
    onClose();
  };

  /**
   * Emulation mode handler (when no live API keys are configured)
   * Honors the 2-step Create -> Approve -> Capture lifecycle cleanly.
   */
  const handleStartEmulatedCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      setError("Please complete all required fields highlighted above.");
      return;
    }

    setError(null);
    setIsProcessing(true);
    setProcessingStep("Creating Sandbox Order...");

    try {
      const res = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: plan.id,
          email,
          accountIdentifier: isRenewal ? accountIdentifier : undefined,
          isRenewal,
          shippingAddress: needsDeliveryAddress
            ? {
                fullName: email.split("@")[0],
                addressLine1: address,
                city: "UK",
                postalCode: "UK",
                country: "GB",
              }
            : undefined,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to create sandbox order");
      }

      const { orderId } = await res.json();
      // Prompt user to simulate approval
      setEmulatedApprovalOrderId(orderId);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Sandbox initiation failed";
      setError(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirmEmulatedApproval = async () => {
    if (!emulatedApprovalOrderId) return;
    setIsProcessing(true);
    setProcessingStep("Capturing Authorized Payment...");

    try {
      const captureRes = await fetch("/api/paypal/capture-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: emulatedApprovalOrderId,
          planId: plan.id,
          email,
          whatsapp,
          deviceType,
          accountIdentifier: isRenewal ? accountIdentifier : undefined,
        }),
      });

      if (!captureRes.ok) {
        const errData = await captureRes.json();
        throw new Error(errData.error || "Failed to capture sandbox order");
      }

      const captureData = await captureRes.json();
      setConfirmation({
        orderId: captureData.orderId,
        captureId: captureData.captureId,
        referenceId: captureData.referenceId,
        customerEmail: email,
        customerWhatsapp: whatsapp || undefined,
        deviceType,
        accountIdentifier: isRenewal ? accountIdentifier : undefined,
        isRenewal,
        dispatchTime: isRenewal
          ? "Applied to existing line within 2 hours"
          : needsDeliveryAddress
          ? "Tracked 24-48h Courier Dispatch"
          : "Instant (<2 minutes via WhatsApp & Email)",
        capturedAt: captureData.capturedAt,
      });
      setEmulatedApprovalOrderId(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Capture failed";
      setError(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="paypal-checkout-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 p-4 sm:p-6 shadow-2xl overflow-y-auto max-h-[90dvh] scrollbar-none overscroll-contain"
        style={{ overscrollBehavior: "contain" }}
      >
        {/* Close Button with 48px touch area */}
        <button
          onClick={handleResetAndClose}
          className="absolute right-3.5 top-3.5 rounded-full p-3 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors focus:outline-none min-h-[48px] min-w-[48px] flex items-center justify-center cursor-pointer"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {!confirmation ? (
          <div>
            {/* Modal Header */}
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                Official PayPal Checkout Desk
              </span>
            </div>
            <h2 id="paypal-checkout-title" className="text-xl sm:text-2xl font-black text-white mt-1">
              {isRenewal ? "Renew Your Subscription" : "Complete Your Order"}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              PayPal Buyer Protection &bull; Instant WhatsApp &amp; Email Credentials
            </p>

            {/* Plan Breakdown Card */}
            <div className="my-3.5 rounded-xl border border-zinc-800 bg-zinc-900/60 p-3.5 sm:p-4 space-y-3">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <div className="text-base sm:text-lg font-bold text-white flex flex-wrap items-center gap-2">
                    <span>{plan.name}</span>
                    {plan.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary/20 border border-primary/30 text-primary whitespace-nowrap">
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-zinc-400 mt-0.5">
                    {isRenewal
                      ? "14-Month Service Extension • Keeps Existing Account & Channels"
                      : plan.isHardwareOnly
                      ? "Official ChitramTV Black Edition C1 Box (Android 14)"
                      : plan.isBoxBundle
                      ? "Black Edition C1 Box + 1 Year Subscription Pass Included"
                      : `${plan.devices} Devices • 7-Day Catch-up • 350+ Channels`}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xl sm:text-2xl font-black text-white">
                    {currency}{plan.price.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-zinc-400">{plan.period}</div>
                </div>
              </div>

              {/* PayPal Pay in 3 Preview Pill */}
              <div className="rounded-lg bg-blue-950/40 border border-blue-900/50 p-2.5 flex items-center justify-between text-xs text-blue-200">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-blue-400 shrink-0" />
                  <span>
                    Or 3 interest-free payments of <strong>{currency}{payIn3Amount}</strong>
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold text-blue-300 tracking-wider bg-blue-900/60 px-1.5 py-0.5 rounded">
                  Pay in 3
                </span>
              </div>

              {/* Pricing Breakdown */}
              <div className="pt-2 border-t border-zinc-800 space-y-1 text-xs text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-zinc-300">{currency}{plan.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>VAT &amp; Taxes</span>
                  <span className="text-zinc-300">{currency}{((plan.price * 0.20) / 1.20).toFixed(2)} (Included)</span>
                </div>
                <div className="flex justify-between">
                  <span>Activation &amp; Digital Setup</span>
                  <span className="text-emerald-400 font-semibold">FREE (Instant)</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-zinc-800 font-extrabold text-white text-sm">
                  <span>Total Due Today</span>
                  <span className="text-primary text-base font-black">{currency}{plan.price.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Simulated Approval Drawer if in local emulation mode */}
            {emulatedApprovalOrderId ? (
              <div className="my-4 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 space-y-3 animate-in fade-in">
                <div className="flex items-center gap-2 text-amber-400">
                  <Sparkles className="h-5 w-5 shrink-0" />
                  <span className="text-sm font-bold">PayPal Sandbox Approval Simulation</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  In a production environment, PayPal opens an authentication popup where the customer confirms payment. Tap below to simulate successful buyer authorization:
                </p>
                <div className="bg-zinc-900/80 p-2.5 rounded-lg text-xs space-y-1 font-mono text-zinc-400 border border-zinc-800">
                  <div>Order ID: <span className="text-white">{emulatedApprovalOrderId}</span></div>
                  <div>Buyer: <span className="text-white">{email}</span></div>
                  <div>Amount: <span className="text-emerald-400">{currency}{plan.price.toFixed(2)}</span></div>
                </div>
                <button
                  type="button"
                  onClick={handleConfirmEmulatedApproval}
                  disabled={isProcessing}
                  className="w-full min-h-[48px] rounded-xl bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-extrabold text-sm flex items-center justify-center gap-2 transition-transform active:scale-[0.98] cursor-pointer"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-950 border-t-transparent" />
                      <span>{processingStep}</span>
                    </span>
                  ) : (
                    <span>Authorize &amp; Complete Capture</span>
                  )}
                </button>
              </div>
            ) : (
              /* Mobile Form */
              <form onSubmit={handleStartEmulatedCheckout} className="space-y-3">
                {/* Existing Account Identifier for Renewal */}
                {isRenewal && (
                  <div className="rounded-xl border border-primary/40 bg-primary/5 p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <RefreshCw className="h-4 w-4 text-primary shrink-0" />
                      <label className="block text-xs font-bold text-white">
                        Existing Account / MAC Address <span className="text-primary">*</span>
                      </label>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      Enter your existing ChitramTV Account Number, Username, or Box MAC Address.
                    </p>
                    <input
                      type="text"
                      required
                      placeholder="e.g. CTV-88492 or 00:1A:79:XX:XX:XX"
                      value={accountIdentifier}
                      onChange={(e) => setAccountIdentifier(e.target.value)}
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-base sm:text-sm text-white placeholder:text-zinc-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary min-h-[48px]"
                    />
                  </div>
                )}

                {/* Email Input */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Email Address <span className="text-primary">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-400 pointer-events-none" />
                    <input
                      type="email"
                      required
                      placeholder="your-email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-10 py-2.5 text-base sm:text-sm text-white placeholder:text-zinc-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary min-h-[48px]"
                    />
                  </div>
                </div>

                {/* WhatsApp Optional Number */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    WhatsApp Number (Optional for &lt;2 min mobile dispatch)
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-3.5 h-4 w-4 text-emerald-400 pointer-events-none" />
                    <input
                      type="tel"
                      placeholder="+44 7123 456789"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-10 py-2.5 text-base sm:text-sm text-white placeholder:text-zinc-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary min-h-[48px]"
                    />
                  </div>
                </div>

                {/* Streaming Device Selection */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Primary Device
                  </label>
                  <div className="relative">
                    <Tv className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-400 pointer-events-none" />
                    <select
                      value={deviceType}
                      onChange={(e) => setDeviceType(e.target.value)}
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-10 py-2.5 text-base sm:text-sm text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary min-h-[48px] appearance-none"
                    >
                      {STREAMING_DEVICES.map((d) => (
                        <option key={d} value={d} className="bg-zinc-900 text-white">
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Hardware Delivery Address if applicable */}
                {needsDeliveryAddress && (
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Delivery Address for Box Courier <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-400 pointer-events-none" />
                      <input
                        type="text"
                        required
                        placeholder="Street, City, Postcode, UK"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-10 py-2.5 text-base sm:text-sm text-white placeholder:text-zinc-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary min-h-[48px]"
                      />
                    </div>
                  </div>
                )}

                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Official PayPal Buttons Container */}
                <div className="pt-2">
                  {payPalConfig.isConfigured && payPalConfig.clientId ? (
                    <div className="space-y-2">
                      {!isFormValid && (
                        <p className="text-[11px] text-amber-400 text-center font-medium">
                          Please enter your email above to activate PayPal Checkout
                        </p>
                      )}
                      <div className={!isFormValid ? "opacity-50 pointer-events-none" : ""}>
                        <PayPalScriptProvider
                          options={{
                            clientId: payPalConfig.clientId,
                            currency: CATALOG_CURRENCY.code,
                            intent: "capture",
                            components: "buttons",
                          }}
                        >
                          <PayPalButtons
                            style={{
                              layout: "vertical",
                              color: "gold",
                              shape: "rect",
                              height: 48,
                              label: "paypal",
                            }}
                            disabled={!isFormValid || isProcessing}
                            createOrder={async () => {
                              setIsProcessing(true);
                              setError(null);
                              try {
                                const res = await fetch("/api/paypal/create-order", {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({
                                    planId: plan.id,
                                    email,
                                    accountIdentifier: isRenewal ? accountIdentifier : undefined,
                                    isRenewal,
                                    shippingAddress: needsDeliveryAddress
                                      ? {
                                          fullName: email.split("@")[0],
                                          addressLine1: address,
                                          city: "UK",
                                          postalCode: "UK",
                                          country: "GB",
                                        }
                                      : undefined,
                                  }),
                                });

                                if (!res.ok) {
                                  const err = await res.json();
                                  throw new Error(err.error || "Order creation failed");
                                }

                                const data = await res.json();
                                return data.orderId;
                              } catch (err: unknown) {
                                const msg = err instanceof Error ? err.message : "Error initializing order";
                                setError(msg);
                                throw err;
                              } finally {
                                setIsProcessing(false);
                              }
                            }}
                            onApprove={async (data, actions) => {
                              setIsProcessing(true);
                              setProcessingStep("Verifying payment with PayPal...");
                              try {
                                const res = await fetch("/api/paypal/capture-order", {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({
                                    orderId: data.orderID,
                                    planId: plan.id,
                                    email,
                                    whatsapp,
                                    deviceType,
                                    accountIdentifier: isRenewal ? accountIdentifier : undefined,
                                  }),
                                });

                                const captureData = await res.json();

                                if (captureData?.issue === "INSTRUMENT_DECLINED") {
                                  // Recoverable decline: prompt customer to select alternate funding source in PayPal
                                  setError("Your card was declined. Please try another card or bank in PayPal.");
                                  return actions.restart();
                                }

                                if (!res.ok) {
                                  throw new Error(captureData.error || "Failed to capture payment");
                                }

                                setConfirmation({
                                  orderId: captureData.orderId,
                                  captureId: captureData.captureId,
                                  referenceId: captureData.referenceId,
                                  customerEmail: email,
                                  customerWhatsapp: whatsapp || undefined,
                                  deviceType,
                                  accountIdentifier: isRenewal ? accountIdentifier : undefined,
                                  isRenewal,
                                  dispatchTime: isRenewal
                                    ? "Applied to existing line within 2 hours"
                                    : needsDeliveryAddress
                                    ? "Tracked 24-48h Courier Dispatch"
                                    : "Instant (<2 minutes via WhatsApp & Email)",
                                  capturedAt: captureData.capturedAt,
                                });
                              } catch (err: unknown) {
                                const msg = err instanceof Error ? err.message : "Transaction capture error";
                                setError(msg);
                              } finally {
                                setIsProcessing(false);
                              }
                            }}
                            onError={(err) => {
                              console.error("[PayPal SDK Error]:", err);
                              setError("PayPal checkout error. Please refresh and try again.");
                              setIsProcessing(false);
                            }}
                            onCancel={() => {
                              setIsProcessing(false);
                            }}
                          />
                        </PayPalScriptProvider>
                      </div>
                    </div>
                  ) : (
                    /* Fallback Button for Development / Sandbox Emulation */
                    <button
                      type="submit"
                      disabled={isProcessing || !isFormValid}
                      className="w-full min-h-[50px] rounded-xl bg-[#FFC439] hover:bg-[#F2BA36] text-[#003087] font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 transition-transform active:scale-[0.98] disabled:opacity-60 shadow-lg select-none cursor-pointer"
                    >
                      {isProcessing ? (
                        <span className="flex items-center gap-2 text-[#003087]">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#003087] border-t-transparent" />
                          <span>{processingStep}</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <span className="italic font-black text-lg text-[#003087]">Pay</span>
                          <span className="italic font-black text-lg text-[#0079C1]">Pal</span>
                          <span className="text-[#003087] font-bold text-sm ml-1">
                            &bull; Pay {currency}{plan.price.toFixed(2)}
                          </span>
                        </span>
                      )}
                    </button>
                  )}
                </div>

                {/* Trust & Guarantee Markers */}
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 pt-2 text-[11px] text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                    PayPal Buyer Protection
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5 text-zinc-400" />
                    256-Bit SSL Encrypted
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Info className="h-3.5 w-3.5 text-zinc-400" />
                    {needsDeliveryAddress ? "1-Year Hardware Warranty" : "7-Day Money-Back Guarantee"}
                  </span>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* Order Confirmed & Receipt View */
          <div className="py-4 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10" />
            </div>

            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400">
              {confirmation.isRenewal ? "Subscription Renewal Queued" : "PayPal Authorization Complete"}
            </span>

            <h3 className="text-xl sm:text-2xl font-black text-white">
              {confirmation.isRenewal ? "Renewal Confirmed!" : "Order Confirmed!"}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mx-auto">
              {confirmation.isRenewal
                ? `Your 14-month service extension has been linked to existing account ${confirmation.accountIdentifier}. Notification sent to:`
                : "Your streaming credentials and activation instructions are being delivered to:"}
            </p>
            <div className="font-mono text-xs sm:text-sm text-primary font-bold bg-zinc-900 py-1.5 px-3 rounded-lg inline-block break-all max-w-full border border-zinc-800">
              {confirmation.customerEmail}
            </div>

            {/* Transaction Receipt Card */}
            <div className="my-4 rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 text-left text-xs space-y-2">
              <div className="flex justify-between text-zinc-400">
                <span>Order Reference</span>
                <span className="font-mono text-white font-bold">{confirmation.referenceId}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>PayPal Transaction ID</span>
                <span className="font-mono text-zinc-300">{confirmation.captureId}</span>
              </div>
              {confirmation.accountIdentifier && (
                <div className="flex justify-between text-zinc-400">
                  <span>Target Account ID</span>
                  <span className="font-mono text-emerald-400 font-bold">{confirmation.accountIdentifier}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-400">
                <span>Package</span>
                <span className="text-white font-semibold">{plan.name}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Total Paid</span>
                <span className="text-white font-bold">{currency}{plan.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Device Profile</span>
                <span className="text-zinc-200">{confirmation.deviceType}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Dispatch / Extension SLA</span>
                <span className="text-emerald-400 font-bold">{confirmation.dispatchTime}</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Button
                variant="default"
                size="lg"
                className="w-full min-h-[48px] font-bold text-sm"
                onClick={handleResetAndClose}
              >
                Return to Site
              </Button>
              <p className="text-[11px] text-zinc-400 flex items-center justify-center gap-1">
                <span>Need instant setup advice or renewal verification? Contact UK Help Desk</span>
                <ExternalLink className="h-3 w-3 inline" />
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return mounted ? createPortal(modalContent, document.body) : null;
}
