import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscription Plans & Dune HD Set-Top Box Bundles",
  description:
    "Official ChitramTV subscription plans and Dune HD Classic hardware bundles. 100% PayPal Buyer Protection, no contracts, and instant digital credential dispatch.",
  alternates: {
    canonical: "https://chitramtv.eu/plans",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://chitramtv.eu/plans",
    siteName: "ChitramTV UK",
    title: "Subscription Plans & Dune HD Set-Top Box Bundles | ChitramTV UK",
    description:
      "Official ChitramTV subscription plans and Dune HD Classic hardware bundles. 100% PayPal Buyer Protection, no contracts, and instant digital credential dispatch.",
    images: [
      {
        url: "/assets/client/logo.svg",
        width: 280,
        height: 64,
        alt: "ChitramTV UK Plans",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Subscription Plans & Dune HD Set-Top Box Bundles | ChitramTV UK",
    description:
      "Official ChitramTV subscription plans and Dune HD Classic hardware bundles. 100% PayPal Buyer Protection, no contracts, and instant dispatch.",
    images: ["/assets/client/logo.svg"],
  },
};

export default function PlansLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
