"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, CheckCircle2, ShieldCheck, Lock, AlertCircle, Mail, MapPin } from "lucide-react";
import { PricingPlan } from "@/data/plans";
import { Button } from "@/components/ui/button";
import { useScrollLock } from "@/hooks/useScrollLock";

interface PayPalModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: PricingPlan | null;
}

export function PayPalModal({ isOpen, onClose, plan }: PayPalModalProps) {
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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

  const handleSimulatePayPalApproval = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address to receive your streaming login credentials.");
      return;
    }
    if (needsDeliveryAddress && !address.trim()) {
      setError("Please enter your delivery address for hardware courier dispatch.");
      return;
    }
    setError(null);
    setIsProcessing(true);

    // Simulate PayPal client-side approval flow
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setIsProcessing(false);
    setError(null);
    setEmail("");
    setAddress("");
    onClose();
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto overscroll-contain animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
      onClick={handleResetAndClose}
    >
      <div
        className="relative w-full max-w-lg rounded-xl border border-zinc-800 bg-zinc-950 p-5 sm:p-8 shadow-2xl max-h-[90dvh] overflow-y-auto overscroll-contain my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button with 44x44px touch target */}
        <button
          onClick={handleResetAndClose}
          className="absolute right-3 top-3 sm:right-4 sm:top-4 rounded-md p-2.5 text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {!isSuccess ? (
          <div>
            {/* Header */}
            <div className="flex items-center gap-2 mb-2 pr-8">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary shrink-0">
                <Lock className="h-3.5 w-3.5" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                Secure European PayPal Checkout
              </span>
            </div>

            <h3 id="checkout-modal-title" className="text-xl sm:text-2xl font-bold text-white pr-6">
              Complete Your Order
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Instant activation credentials dispatched via Email &amp; WhatsApp.
            </p>

            {/* Plan Summary Card */}
            <div className="my-5 rounded-lg border border-zinc-800 bg-zinc-900/60 p-4">
              <div className="flex justify-between items-start pb-3 border-b border-zinc-800 gap-2">
                <div>
                  <div className="text-base sm:text-lg font-bold text-white flex flex-wrap items-center gap-2">
                    <span>{plan.name}</span>
                    {plan.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-200 whitespace-nowrap">
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-zinc-400 mt-1">
                    {plan.isHardwareOnly
                      ? "Official Dune HD Classic Media Receiver"
                      : `${plan.devices} Devices • 7-Day Catch-up • 350+ Channels`}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xl sm:text-2xl font-extrabold text-white">
                    {currency}{plan.price.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-zinc-400">{plan.period}</div>
                </div>
              </div>

              <div className="pt-3 space-y-1.5 text-xs text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-zinc-300">{currency}{plan.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>VAT / Taxes (Included)</span>
                  <span className="text-zinc-300">{currency}{(plan.price * 0.21 / 1.21).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Digital Setup &amp; Delivery</span>
                  <span className="text-emerald-400 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-zinc-800 font-bold text-white text-sm">
                  <span>Total Due Today</span>
                  <span className="text-primary font-extrabold">{currency}{plan.price.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Customer Delivery Input Form */}
            <form onSubmit={handleSimulatePayPalApproval} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Email Address (For Credentials &amp; Invoice)
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-400 pointer-events-none" />
                  {/* text-base prevents iOS Safari zoom */}
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-10 py-2.5 text-base sm:text-sm text-white placeholder:text-zinc-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary min-h-[44px]"
                  />
                </div>
              </div>

              {needsDeliveryAddress && (
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Courier Delivery Address (Postal Code &amp; City)
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-400 pointer-events-none" />
                    <input
                      type="text"
                      required
                      placeholder="Street, City, Postal Code, Country"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-10 py-2.5 text-base sm:text-sm text-white placeholder:text-zinc-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary min-h-[44px]"
                    />
                  </div>
                </div>
              )}

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-xs">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* PayPal Button Mockup */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full min-h-[48px] rounded-lg bg-[#FFC439] hover:bg-[#F2BA36] text-[#003087] font-bold text-sm flex items-center justify-center gap-2 transition-transform active:scale-[0.98] disabled:opacity-50 select-none cursor-pointer"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#003087] border-t-transparent" />
                      Connecting to PayPal Gateway...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <span className="italic font-black text-base text-[#003087]">Pay</span>
                      <span className="italic font-black text-base text-[#0079C1]">Pal</span>
                      <span className="text-[#003087] font-semibold text-xs ml-1">
                        — Pay {currency}{plan.price.toFixed(2)}
                      </span>
                    </span>
                  )}
                </button>
              </div>

              {/* Security Trust Marks */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-[11px] text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-zinc-400" />
                  PayPal Buyer Protection
                </span>
                <span className="flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-zinc-400" />
                  256-Bit SSL Encrypted
                </span>
              </div>
            </form>
          </div>
        ) : (
          /* Order Confirmed State */
          <div className="py-4 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10" />
            </div>

            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 mb-2">
              Payment Authorized
            </span>

            <h3 className="text-xl sm:text-2xl font-bold text-white">Order Confirmed!</h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-sm mx-auto">
              Your activation details and order receipt have been dispatched to:
            </p>
            <div className="font-mono text-xs sm:text-sm text-primary font-bold mt-1 bg-zinc-900 py-1.5 px-3 rounded inline-block break-all max-w-full">
              {email || "customer@example.com"}
            </div>

            <div className="my-5 rounded-lg border border-zinc-800 bg-zinc-900/60 p-3.5 sm:p-4 text-left text-xs space-y-2">
              <div className="flex justify-between text-zinc-400">
                <span>Reference ID</span>
                <span className="font-mono text-white">EU-CHITRAM-89421</span>
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
                <span>Fulfillment Desk</span>
                <span className="text-emerald-400 font-bold">Linus Media (24/7)</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                variant="default"
                size="lg"
                className="w-full min-h-[48px] font-bold"
                onClick={handleResetAndClose}
              >
                Return to Home
              </Button>
              <p className="text-[11px] text-zinc-400">
                Need immediate activation assistance? WhatsApp Linus Media at +31 6 20897414
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return mounted ? createPortal(modalContent, document.body) : null;
}
