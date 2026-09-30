import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "3-Minute Setup & Installation Guide",
  description:
    "Step-by-step setup guide for ChitramTV on Amazon Firestick, Android TV, Smart TVs (Samsung & LG), Apple TV, and PC. Fast UK broadband & router optimization tips.",
  alternates: {
    canonical: "https://chitramtv.eu/setup-guide",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://chitramtv.eu/setup-guide",
    siteName: "ChitramTV UK",
    title: "3-Minute Setup & Installation Guide | ChitramTV UK",
    description:
      "Step-by-step setup guide for ChitramTV on Amazon Firestick, Android TV, Smart TVs (Samsung & LG), Apple TV, and PC.",
    images: [
      {
        url: "/assets/client/logo.svg",
        width: 280,
        height: 64,
        alt: "ChitramTV UK Setup Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "3-Minute Setup & Installation Guide | ChitramTV UK",
    description:
      "Step-by-step setup guide for ChitramTV on Amazon Firestick, Android TV, Smart TVs, Apple TV, and PC.",
    images: ["/assets/client/logo.svg"],
  },
};

export default function SetupGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
