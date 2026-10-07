import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buy Now — ChitramTV Subscriptions, C1 Box & Renewals | ChitramTV UK",
  description:
    "Order official ChitramTV UK passes, Black Edition C1 TV Box, and 12+2 month renewals in British Pounds (£) with secure PayPal checkout and 14-day catch-up.",
  alternates: {
    canonical: "https://chitramtv.eu/buy-now",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://chitramtv.eu/buy-now",
    siteName: "ChitramTV UK",
    title: "Buy Now — ChitramTV Subscriptions, C1 Box & Renewals | ChitramTV UK",
    description:
      "Order official ChitramTV UK passes, Black Edition C1 TV Box, and 12+2 month renewals in British Pounds (£) with secure PayPal checkout and 14-day catch-up.",
    images: [
      {
        url: "/Logo.png",
        width: 280,
        height: 64,
        alt: "ChitramTV UK Buy Now Catalogue",
      },
    ],
  },
};

export default function BuyNowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
