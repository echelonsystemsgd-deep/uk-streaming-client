import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Customer Support & 24/7 WhatsApp Desk",
  description:
    "Connect with ChitramTV UK support desk. Direct UK telephone helpline & WhatsApp (07979637777), Shiva Technology Ltd support, and immediate credential dispatch assistance.",
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
      "Connect with ChitramTV UK support desk. Direct telephone helpline & WhatsApp (07979637777), and fast credential dispatch.",
    images: [
      {
        url: "/Logo.png",
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
      "Direct UK helpline 07979637777, WhatsApp desk, and quick activation assistance.",
    images: ["/Logo.png"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
