import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service & Subscription Agreement",
  description:
    "Terms of service, fair usage policies, subscription terms, and hardware warranty details for ChitramTV streaming platform.",
  alternates: {
    canonical: "https://chitramtv.eu/terms",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://chitramtv.eu/terms",
    siteName: "ChitramTV UK",
    title: "Terms of Service & Subscription Agreement | ChitramTV UK",
    description:
      "Terms of service, fair usage policies, subscription terms, and hardware warranty details for ChitramTV streaming platform.",
    images: [
      {
        url: "/assets/client/logo.svg",
        width: 280,
        height: 64,
        alt: "ChitramTV UK Terms of Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service & Subscription Agreement | ChitramTV UK",
    description:
      "Terms of service, subscription policies, and warranty details for ChitramTV clients.",
    images: ["/assets/client/logo.svg"],
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
