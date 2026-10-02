import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "7-Day Money-Back Guarantee, Hardware Warranty & Refund Policy",
  description:
    "ChitramTV unconditional 7-Day Money-Back Guarantee, 1-Year Hardware Replacement Warranty, and 14-Day Return Window for ChitramTV Black Edition C1 Box units.",
  alternates: {
    canonical: "https://chitramtv.eu/refund-policy",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://chitramtv.eu/refund-policy",
    siteName: "ChitramTV UK",
    title: "7-Day Guarantee, Hardware Warranty & Refund Policy | ChitramTV UK",
    description:
      "ChitramTV unconditional 7-Day Money-Back Guarantee, 1-Year Hardware Replacement Warranty, and 14-Day Return Window for ChitramTV Black Edition C1 Box units.",
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
    title: "7-Day Guarantee, Hardware Warranty & Refund Policy | ChitramTV UK",
    description:
      "Unconditional 7-day money-back guarantee, 1-year C1 Box warranty, and 14-day faulty return window on ChitramTV UK.",
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
