import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy & UK GDPR Compliance",
  description:
    "UK GDPR-compliant privacy policy for ChitramTV streaming platform. Learn how we safeguard your personal data, order details, and streaming privacy.",
  alternates: {
    canonical: "https://chitramtv.eu/privacy",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://chitramtv.eu/privacy",
    siteName: "ChitramTV UK",
    title: "Privacy Policy & UK GDPR Compliance | ChitramTV UK",
    description:
      "UK GDPR-compliant privacy policy for ChitramTV streaming platform. Learn how we safeguard your personal data, order details, and streaming privacy.",
    images: [
      {
        url: "/assets/client/logo.svg",
        width: 280,
        height: 64,
        alt: "ChitramTV UK Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy & UK GDPR Compliance | ChitramTV UK",
    description:
      "UK GDPR-compliant privacy policy for ChitramTV streaming platform.",
    images: ["/assets/client/logo.svg"],
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
