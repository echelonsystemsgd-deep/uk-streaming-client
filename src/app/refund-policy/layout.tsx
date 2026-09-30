import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "7-Day Money-Back Guarantee & Refund Policy",
  description:
    "ChitramTV unconditional 7-Day Money-Back Guarantee. Fast PayPal refunds, clear return procedures for Dune HD hardware, and fair customer-first terms.",
  alternates: {
    canonical: "https://chitramtv.eu/refund-policy",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://chitramtv.eu/refund-policy",
    siteName: "ChitramTV UK",
    title: "7-Day Money-Back Guarantee & Refund Policy | ChitramTV UK",
    description:
      "ChitramTV unconditional 7-Day Money-Back Guarantee. Fast PayPal refunds and clear return procedures for Dune HD hardware.",
    images: [
      {
        url: "/assets/client/logo.svg",
        width: 280,
        height: 64,
        alt: "ChitramTV UK Refund Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "7-Day Money-Back Guarantee & Refund Policy | ChitramTV UK",
    description:
      "Unconditional 7-day money-back guarantee on all ChitramTV passes and hardware bundles.",
    images: ["/assets/client/logo.svg"],
  },
};

export default function RefundPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
