import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions & 24/7 Help Center",
  description:
    "Got questions about ChitramTV UK? Find verified answers about device setup, 7-day catch-up TV, UK broadband speeds, simultaneous streams, and PayPal payments.",
  alternates: {
    canonical: "https://chitramtv.eu/faq",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://chitramtv.eu/faq",
    siteName: "ChitramTV UK",
    title: "Frequently Asked Questions & 24/7 Help Center | ChitramTV UK",
    description:
      "Got questions about ChitramTV UK? Find verified answers about device setup, 7-day catch-up TV, UK broadband speeds, simultaneous streams, and PayPal payments.",
    images: [
      {
        url: "/assets/client/logo.svg",
        width: 280,
        height: 64,
        alt: "ChitramTV UK FAQ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frequently Asked Questions & 24/7 Help Center | ChitramTV UK",
    description:
      "Find answers about device setup, 7-day catch-up, UK broadband requirements, and PayPal payments.",
    images: ["/assets/client/logo.svg"],
  },
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
