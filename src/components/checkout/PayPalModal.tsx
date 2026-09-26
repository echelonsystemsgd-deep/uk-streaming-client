"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle2, ShieldCheck, Lock, AlertCircle, Mail, MapPin } from "lucide-react";
import { PricingPlan } from "@/data/plans";
import { Button } from "@/components/ui/button";

interface PayPalModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: PricingPlan | null;
}

export function PayPalModal({ isOpen, onClose, plan }: PayPalModalProps) {
  const [email, setEmail] = useState("");
  const [postcode, setPostcode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Prevent background body scrolling when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !plan) return null;

  const handleSimulatePayPalApproval = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address to receive your streaming login credentials.");
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
    setPostcode("");
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
      onClick={handleResetAndClose}
    >
      <div 
        className="relative w-full max-w-lg rounded-xl border border-border/80 bg-card p-5 sm:p-8 shadow-card max-h-[92vh] overflow-y-auto my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button with generous touch target */}
        <button
          onClick={handleResetAndClose}
          className="absolute right-3 top-3 sm:right-4 sm:top-4 rounded-md p-2.5 text-muted-foreground hover:bg-background-subtle hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
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
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Secure UK PayPal Checkout
              </span>
            </div>

            <h3 id="checkout-modal-title" className="text-xl sm:text-2xl font-bold text-white pr-6">
              Complete Your Subscription
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Instant activation credentials dispatched via email and WhatsApp.
            </p>

            {/* Plan Summary Card */}
            <div className="my-5 sm:my-6 rounded-lg border border-border bg-background-elevated p-4">
              <div className="flex justify-between items-start pb-3 border-b border-border/60 gap-2">
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
                    {plan.devices} Devices • 7-Day Catch-up • 350+ Channels
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xl sm:text-2xl font-extrabold text-white">
                    £{plan.price.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-zinc-400">{plan.period}</div>
                </div>
              </div>

              <div className="pt-3 space-y-1.5 text-xs text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-zinc-300">£{plan.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>UK VAT (Included)</span>
                  <span className="text-zinc-300">£{(plan.price * 0.2 / 1.2).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Digital Setup &amp; Activation</span>
                  <span className="text-zinc-200 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border/40 font-bold text-white text-sm">
                  <span>Total Due Today</span>
                  <span className="text-primary font-extrabold">£{plan.price.toFixed(2)} GBP</span>
                </div>
              </div>
            </div>

            {/* Customer Delivery Input Form */}
            <form onSubmit={handleSimulatePayPalApproval} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                  Email Address (For Instant Login & Playlist Dispatch)
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                  {/* text-base on mobile prevents iOS Safari auto-zoom */}
                  <input
                    type="email"
                    required
                    placeholder="name@example.co.uk"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-md border border-border bg-background px-10 py-2.5 text-base sm:text-sm text-white placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary min-h-[44px]"
                  />
                </div>
              </div>

              {plan.isBoxBundle && (
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                    UK Delivery Postcode (For Hardware Dispatch)
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. W1A 1AA / B1 1AA"
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value)}
                      className="w-full rounded-md border border-border bg-background px-10 py-2.5 text-base sm:text-sm text-white placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary uppercase min-h-[44px]"
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

              {/* PayPal Hosted Button Mockup & Action */}
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
                        — Pay £{plan.price.toFixed(2)}
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

            {/* Technical Backend Disclaimer Banner */}
            <div className="mt-5 rounded-md border border-amber-500/20 bg-amber-500/5 p-3 text-[11px] leading-relaxed text-amber-300/90">
              <span className="font-bold block mb-0.5">Frontend Pass Notice:</span>
              Backend order confirmation, webhook verification, and recurring subscription renewal logic are out of scope for this pass and will require backend endpoint integration.
            </div>
          </div>
        ) : (
          /* Success / Order Confirmation State */
          <div className="py-4 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10" />
            </div>

            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 mb-2">
              Payment Authorized
            </span>

            <h3 className="text-xl sm:text-2xl font-bold text-white">Order Confirmed!</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-sm mx-auto">
              Your activation details and M3U credentials have been dispatched to:
            </p>
            <div className="font-mono text-xs sm:text-sm text-primary font-bold mt-1 bg-background-elevated py-1.5 px-3 rounded inline-block break-all max-w-full">
              {email || "customer@example.co.uk"}
            </div>

            <div className="my-5 rounded-lg border border-border bg-background-elevated p-3.5 sm:p-4 text-left text-xs space-y-2">
              <div className="flex justify-between text-muted-foreground">
                <span>Reference ID</span>
                <span className="font-mono text-white">UK-DESI-94821</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Plan</span>
                <span className="text-white font-semibold">{plan.name}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Total Paid</span>
                <span className="text-white font-bold">£{plan.price.toFixed(2)} GBP</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Activation ETA</span>
                <span className="text-emerald-400 font-bold">&lt; 2 Minutes</span>
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
              <p className="text-[11px] text-muted-foreground">
                Need immediate help? Contact our UK WhatsApp support at +44 20 7946 0912
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
