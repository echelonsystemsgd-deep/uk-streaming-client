import { NextResponse } from "next/server";
import { refundPayPalPayment } from "@/lib/paypal/client";
import { RefundPaymentPayload } from "@/lib/paypal/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { captureId, amount, noteToPayer, invoiceId } = body;

    if (!captureId) {
      return NextResponse.json(
        { error: "captureId is required for refund processing" },
        { status: 400 }
      );
    }

    const payload: RefundPaymentPayload | undefined =
      amount || noteToPayer || invoiceId
        ? {
            amount: amount
              ? {
                  currency_code: amount.currency_code || "GBP",
                  value: typeof amount.value === "number" ? amount.value.toFixed(2) : String(amount.value),
                }
              : undefined,
            note_to_payer: noteToPayer || "Refund processed by Shiva Technology Ltd",
            invoice_id: invoiceId,
          }
        : undefined;

    const refundResult = await refundPayPalPayment(captureId, payload);

    return NextResponse.json({
      success: true,
      status: refundResult.status,
      refundId: refundResult.id,
      amount: refundResult.amount,
      noteToPayer: refundResult.note_to_payer,
      createTime: refundResult.create_time,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    console.error("[PayPal Refund API Error]:", message);

    return NextResponse.json(
      {
        error: "Failed to process PayPal refund",
        details: message,
      },
      { status: 500 }
    );
  }
}
