"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { AlertCircle, ShoppingBag, MessageSquare, ArrowLeft, RefreshCw } from "lucide-react";
import { HELPLINE_PHONE, WHATSAPP_PHONE, BRAND_NAME } from "@/data/plans";

function CheckoutCancelledContent() {
  return (
    <div className="container mx-auto max-w-xl px-4 sm:px-6 py-12 sm:py-20">
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-lg text-center space-y-6">
        <div className="mx-auto w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
          <AlertCircle className="w-9 h-9" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Payment Not Completed
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Checkout Was Cancelled
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
            You were not charged. Your session was safely returned to {BRAND_NAME}. If you experienced an issue with PayPal or wish to change your payment method, our UK team is here to help.
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-xs text-left space-y-2 text-gray-700">
          <div className="font-bold text-gray-900">Need Assistance?</div>
          <p className="text-[11px] text-gray-600">
            • We accept PayPal balance, credit cards, debit cards, and PayPal Pay in 3.
          </p>
          <p className="text-[11px] text-gray-600">
            • Need telephone assistance? Call our UK line at <strong>{HELPLINE_PHONE}</strong>.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center pt-2">
          <Link
            href="/checkout"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#dd0e1c] hover:bg-[#b00b16] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow min-h-[48px]"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Checkout Again</span>
          </Link>

          <a
            href={`https://wa.me/44${WHATSAPP_PHONE.replace(/^0/, "")}?text=${encodeURIComponent("Hi ChitramTV Support, I had trouble with my PayPal checkout. Can you assist?")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow min-h-[48px]"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        <div className="pt-2 text-xs">
          <Link href="/plans" className="text-gray-500 hover:text-gray-900 inline-flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Tariff Plans
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutCancelledPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-amber-500 rounded-full animate-spin" />
        </div>
      }
    >
      <CheckoutCancelledContent />
    </Suspense>
  );
}
