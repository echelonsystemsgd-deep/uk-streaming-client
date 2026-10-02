import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscription Plans & ChitramTV Black Edition C1 Box Bundles",
  description:
    "Official ChitramTV subscription plans, renewal passes, and ChitramTV Black Edition C1 Android 14 TV Box bundles. 100% PayPal Buyer Protection, no contracts, and instant digital credential dispatch.",
  alternates: {
    canonical: "https://chitramtv.eu/plans",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://chitramtv.eu/plans",
    siteName: "ChitramTV UK",
    title: "Subscription Plans & ChitramTV Black Edition C1 Box Bundles | ChitramTV UK",
    description:
      "Official ChitramTV subscription plans, renewal passes, and ChitramTV Black Edition C1 Android 14 TV Box bundles. 100% PayPal Buyer Protection, no contracts, and instant digital credential dispatch.",
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
    title: "Subscription Plans & ChitramTV Black Edition C1 Box Bundles | ChitramTV UK",
    description:
      "Official ChitramTV subscription plans, renewal passes, and ChitramTV Black Edition C1 Android 14 TV Box bundles. 100% PayPal Buyer Protection, no contracts, and instant dispatch.",
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
