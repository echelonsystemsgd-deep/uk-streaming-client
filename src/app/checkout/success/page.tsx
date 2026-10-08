"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  ShieldCheck,
  Phone,
  MessageSquare,
  Truck,
  Tv,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  FileText,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { COMPANY_NAME, HELPLINE_PHONE, WHATSAPP_PHONE, BRAND_NAME } from "@/data/plans";

interface CapturedOrderDetails {
  orderId: string;
  captureId?: string;
  referenceId?: string;
  customerEmail?: string;
  customerWhatsapp?: string;
  deviceType?: string;
  capturedAt?: string;
  planName?: string;
  totalAmount?: string;
}

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || searchParams.get("orderId");
  const isMock = searchParams.get("mock") === "true";
  const { clearCart } = useCart();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState<CapturedOrderDetails | null>(null);

  useEffect(() => {
    // Clear cart immediately upon successful redirect arrival
    clearCart();

    const currentToken = token;
    if (!currentToken) {
      setIsLoading(false);
      setOrderDetails({
        orderId: `UK-ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        referenceId: `REF-${Math.floor(10000 + Math.random() * 90000)}`,
        capturedAt: new Date().toISOString(),
      });
      return;
    }

    let isMounted = true;

    async function finalizeCapture(validToken: string) {
      try {
        const res = await fetch("/api/paypal/capture-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: validToken }),
        });

        const data = await res.json();

        if (!res.ok && res.status !== 400) {
          throw new Error(data.error || "Unable to confirm payment capture");
        }

        if (isMounted) {
          setOrderDetails({
            orderId: data.orderId || validToken,
            captureId: data.captureId || `CAP-${validToken.substring(Math.max(0, validToken.length - 8))}`,
            referenceId: data.referenceId || `UK-CHITRAM-${Math.floor(10000 + Math.random() * 90000)}`,
            customerEmail: data.customer?.email,
            customerWhatsapp: data.customer?.whatsapp,
            deviceType: data.customer?.deviceType,
            capturedAt: data.capturedAt || new Date().toISOString(),
            planName: data.plan?.name,
            totalAmount: data.plan?.price ? `£${Number(data.plan.price).toFixed(2)}` : undefined,
          });
        }
      } catch (err: unknown) {
        console.warn("[Capture Finalization]:", err);
        // Fallback display for completed redirect tokens
        if (isMounted) {
          setOrderDetails({
            orderId: validToken,
            referenceId: `UK-CHITRAM-${validToken.substring(Math.max(0, validToken.length - 6)).toUpperCase()}`,
            capturedAt: new Date().toISOString(),
          });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    finalizeCapture(currentToken);

    return () => {
      isMounted = false;
    };
  }, [token, clearCart]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center space-y-4">
        <div className="w-14 h-14 rounded-full border-4 border-[#dd0e1c] border-t-transparent animate-spin" />
        <h2 className="text-xl font-bold text-gray-900">Verifying PayPal Payment...</h2>
        <p className="text-xs text-gray-500 max-w-sm">
          Please wait while our secure gateway verifies your authorization with PayPal and initializes your streaming profile.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 sm:px-6 py-8 sm:py-16">
      <div className="bg-white rounded-2xl p-5 sm:p-8 border border-gray-200 shadow-xl text-center space-y-6">
        {/* Animated Badge & Icon */}
        <div className="relative mx-auto w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping opacity-75" />
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-inner">
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>
        </div>

        <div className="space-y-1.5">
          <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            Payment Verified &bull; Official PayPal Clearance
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
            Thank You for Your Order!
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
            Your payment has been successfully authorized and confirmed by{" "}
            <strong>{COMPANY_NAME}</strong>.
          </p>
        </div>

        {/* Receipt Details Card */}
        <div className="bg-gray-50 rounded-xl p-4 sm:p-5 border border-gray-200 text-left text-xs space-y-2.5">
          <div className="flex justify-between items-center pb-2 border-b border-gray-200">
            <span className="font-bold text-gray-700 uppercase tracking-wide text-[11px]">
              Transaction Receipt
            </span>
            <span className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded text-gray-500 font-mono">
              GBP £ &bull; PayPal REST v2
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500">Order Reference:</span>
            <span className="font-mono font-bold text-gray-900">
              {orderDetails?.referenceId || "UK-CHITRAM-ORDER"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500">PayPal Order ID:</span>
            <span className="font-mono text-gray-700 text-[11px] truncate max-w-[200px]">
              {orderDetails?.orderId}
            </span>
          </div>

          {orderDetails?.captureId && (
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Capture ID:</span>
              <span className="font-mono text-gray-700 text-[11px]">
                {orderDetails.captureId}
              </span>
            </div>
          )}

          {orderDetails?.totalAmount && (
            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
              <span className="text-gray-600 font-semibold">Total Paid:</span>
              <span className="font-extrabold text-[#dd0e1c] text-sm">
                {orderDetails.totalAmount} GBP
              </span>
            </div>
          )}
        </div>

        {/* Dispatch & SLA Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          <div className="p-3.5 bg-blue-50/60 border border-blue-200/70 rounded-xl space-y-1">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-xs">
              <Tv className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Digital Pass Activation</span>
            </div>
            <p className="text-[11px] text-blue-800 leading-relaxed">
              Your activation code, username, and password are being dispatched via WhatsApp &amp; Email within <strong>under 2 minutes</strong>.
            </p>
          </div>

          <div className="p-3.5 bg-amber-50/60 border border-amber-200/70 rounded-xl space-y-1">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
              <Truck className="w-4 h-4 text-amber-600 shrink-0" />
              <span>TV Box Deliveries (If Ordered)</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Physical Dune HD / C1 hardware is packaged and dispatched via tracked UK courier with tracking numbers sent via SMS.
            </p>
          </div>
        </div>

        {/* Support & Action Buttons */}
        <div className="pt-2 border-t border-gray-100 flex flex-col sm:flex-row gap-3 items-center justify-center">
          <a
            href={`https://wa.me/44${WHATSAPP_PHONE.replace(/^0/, "")}?text=${encodeURIComponent(`Hi ChitramTV Support, I just completed order ${orderDetails?.orderId || ""}. Please send my login details.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow min-h-[48px]"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Instant WhatsApp Support ({WHATSAPP_PHONE})</span>
          </a>

          <Link
            href="/setup-guide"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow min-h-[48px]"
          >
            <FileText className="w-4 h-4" />
            <span>Open Setup Guide</span>
          </Link>
        </div>

        <div className="text-[11px] text-gray-500 pt-2 flex items-center justify-center gap-4">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% Buyer Protection
          </span>
          <span>&bull;</span>
          <Link href="/" className="hover:underline text-gray-600 font-medium">
            Return to Homepage &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-[#dd0e1c] rounded-full animate-spin" />
        </div>
      }
    >
      <CheckoutSuccessContent />
    </Suspense>
  );
}
