import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Checkout | ChitramTV UK",
  description:
    "Complete your ChitramTV UK order with PayPal Buyer Protection in British Pounds (£). Instant dispatch for subscriptions and Royal Mail delivery for TV boxes.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
