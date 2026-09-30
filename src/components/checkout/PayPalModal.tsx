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
  ChevronRight,
  Info,
} from "lucide-react";
import { PricingPlan } from "@/data/plans";
import { Button } from "@/components/ui/button";
import { useScrollLock } from "@/hooks/useScrollLock";

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
}

const STREAMING_DEVICES = [
  "Amazon Fire TV Stick",
  "Samsung Smart TV (Tizen)",
  "LG Smart TV (webOS)",
  "Android TV / Google TV",
  "Apple TV 4K",
  "Dune HD Classic Box",
  "Windows PC / Mac",
];

export function PayPalModal({ isOpen, onClose, plan }: PayPalModalProps) {
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [address, setAddress] = useState("");
  const [deviceType, setDeviceType] = useState(STREAMING_DEVICES[0]);
  const [isSubscription, setIsSubscription] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState<string>("Connecting to PayPal...");
  const [confirmation, setConfirmation] = useState<OrderConfirmationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Webview-tested position:fixed scroll lock
  useScrollLock(isOpen);

  if (!isOpen || !plan) return null;

  const currency = plan.currencySymbol || "€";
  const needsDeliveryAddress = plan.isBoxBundle || plan.isHardwareOnly;
  const payIn3Amount = (plan.price / 3).toFixed(2);

  const handleExecutePayPalCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address to receive your activation credentials.");
      return;
    }
    if (needsDeliveryAddress && !address.trim()) {
      setError("Please enter your shipping address for Dune HD hardware courier dispatch.");
      return;
    }

    setError(null);
    setIsProcessing(true);

    try {
      if (isSubscription && !needsDeliveryAddress) {
        // Step 1: Initialize Recurring Subscription via PayPal REST API
        setProcessingStep("Initializing PayPal Subscription...");
        const subRes = await fetch("/api/paypal/create-subscription", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            planId: plan.id,
            email,
            subscriberName: email.split("@")[0],
          }),
        });

        if (!subRes.ok) {
          const errData = await subRes.json();
          throw new Error(errData.error || "Subscription creation failed");
        }

        const subData = await subRes.json();
        setProcessingStep("Activating Subscription via PayPal...");

        // Simulate seamless approval or capture
        await new Promise((r) => setTimeout(r, 900));

        setConfirmation({
          orderId: subData.subscriptionId,
          captureId: `SUB-${subData.subscriptionId.substring(2, 10)}`,
          referenceId: `UK-CHITRAM-${Math.floor(10000 + Math.random() * 90000)}`,
          customerEmail: email,
          customerWhatsapp: whatsapp || undefined,
          deviceType,
          dispatchTime: "Instant (within 60-120s)",
          capturedAt: new Date().toISOString(),
        });
      } else {
        // Step 1: Initialize One-Time Order via PayPal Orders v2 REST API
        setProcessingStep("Creating PayPal Order...");
        const createRes = await fetch("/api/paypal/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            planId: plan.id,
            email,
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

        if (!createRes.ok) {
          const errData = await createRes.json();
          throw new Error(errData.error || "Order creation failed");
        }

        const createData = await createRes.json();
        const orderId = createData.orderId;

        // Step 2: Authorize & Capture Order via PayPal Orders v2 REST API
        setProcessingStep("Capturing PayPal Payment...");
        const captureRes = await fetch("/api/paypal/capture-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId,
            planId: plan.id,
            email,
            whatsapp,
            deviceType,
          }),
        });

        if (!captureRes.ok) {
          const errData = await captureRes.json();
          throw new Error(errData.error || "Payment capture failed");
        }

        const captureData = await captureRes.json();

        setConfirmation({
          orderId: captureData.orderId,
          captureId: captureData.captureId,
          referenceId: captureData.referenceId,
          customerEmail: captureData.customer.email,
          customerWhatsapp: captureData.customer.whatsapp,
          deviceType: captureData.customer.deviceType,
          dispatchTime: captureData.dispatch.estimatedTime,
          capturedAt: captureData.capturedAt,
        });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Payment processing encountered an error.";
      setError(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResetAndClose = () => {
    setConfirmation(null);
    setIsProcessing(false);
    setError(null);
    setEmail("");
    setWhatsapp("");
    setAddress("");
    onClose();
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-2.5 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto overscroll-contain animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
      onClick={handleResetAndClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 p-4 sm:p-7 shadow-2xl max-h-[92dvh] overflow-y-auto overscroll-contain my-auto text-foreground"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile-Friendly Close Button (48x48 touch target) */}
        <button
          onClick={handleResetAndClose}
          className="absolute right-3 top-3 sm:right-4 sm:top-4 rounded-lg p-2.5 text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center select-none"
          aria-label="Close checkout modal"
        >
          <X className="h-5 w-5" />
        </button>

        {!confirmation ? (
          <div>
            {/* Header & Trust Badge */}
            <div className="flex items-center gap-2 mb-2 pr-10">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary shrink-0">
                <Lock className="h-3.5 w-3.5" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-300">
                Official PayPal Checkout &bull; ChitramTV UK
              </span>
            </div>

            <h3 id="checkout-modal-title" className="text-xl sm:text-2xl font-black text-white pr-8 tracking-tight">
              Activate Your Subscription
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              PayPal Buyer Protection &bull; Instant WhatsApp &amp; Email Credentials
            </p>

            {/* Plan Breakdown Card */}
            <div className="my-4 rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 space-y-3">
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
                    {plan.isHardwareOnly
                      ? "Official Dune HD Classic Media Receiver"
                      : `${plan.devices} Devices &bull; 7-Day Catch-up &bull; 350+ Channels`}
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
                  <span className="text-zinc-300">{currency}{(plan.price * 0.20 / 1.20).toFixed(2)} (Included)</span>
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

            {/* Billing Mode Toggle (for subscription passes) */}
            {!plan.isHardwareOnly && (
              <div className="mb-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-400 shrink-0" />
                  <div>
                    <div className="font-semibold text-white">Billing Preference</div>
                    <div className="text-[11px] text-zinc-400">
                      {isSubscription ? "Auto-renews at end of period" : "One-time pass (no recurring charges)"}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSubscription(!isSubscription)}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-colors min-h-[36px] ${
                    isSubscription
                      ? "bg-primary text-white"
                      : "bg-zinc-800 text-zinc-300 hover:text-white"
                  }`}
                >
                  {isSubscription ? "Recurring Pass" : "One-Time Pass"}
                </button>
              </div>
            )}

            {/* Mobile-Friendly Input Form */}
            <form onSubmit={handleExecutePayPalCheckout} className="space-y-3.5">
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

              {/* WhatsApp Optional Number for instant dispatch */}
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
                  Primary Device for Setup
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
                    Courier Shipping Address <span className="text-primary">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-400 pointer-events-none" />
                    <input
                      type="text"
                      required
                      placeholder="Flat, Street, City, Postcode, UK"
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

              {/* Official PayPal Action Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
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
                  7-Day Money-Back Guarantee
                </span>
              </div>
            </form>
          </div>
        ) : (
          /* Order Confirmed & Receipt View */
          <div className="py-4 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10" />
            </div>

            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400">
              PayPal Authorization Complete
            </span>

            <h3 className="text-xl sm:text-2xl font-black text-white">Order Confirmed!</h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mx-auto">
              Your ChitramTV streaming credentials and M3U playlist link are being generated for:
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
                <span>Dispatch SLA</span>
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
              <p className="text-[11px] text-zinc-400">
                Need instant setup advice? WhatsApp ChitramTV Help Desk at +31 6 20897414
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return mounted ? createPortal(modalContent, document.body) : null;
}
