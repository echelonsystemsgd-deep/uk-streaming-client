import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Customer Support & 24/7 WhatsApp Desk",
  description:
    "Connect with ChitramTV UK support desk. Direct 24/7 WhatsApp chat (+31 6 20897414), telephone helpline, ticket support, and immediate credential dispatch assistance.",
  alternates: {
    canonical: "https://chitramtv.eu/contact",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://chitramtv.eu/contact",
    siteName: "ChitramTV UK",
    title: "Contact Customer Support & 24/7 WhatsApp Desk | ChitramTV UK",
    description:
      "Connect with ChitramTV UK support desk. Direct 24/7 WhatsApp chat, telephone helpline, ticket support, and fast credential dispatch.",
    images: [
      {
        url: "/assets/client/logo.svg",
        width: 280,
        height: 64,
        alt: "Contact ChitramTV UK",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Customer Support & 24/7 WhatsApp Desk | ChitramTV UK",
    description:
      "24/7 WhatsApp desk, telephone helpline, and quick activation assistance.",
    images: ["/assets/client/logo.svg"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
