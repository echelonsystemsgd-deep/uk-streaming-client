import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features — 500+ Channels, 14-Day Catch-Up & 4K | ChitramTV UK",
  description:
    "Explore ChitramTV features: 14-day automated catch-up TV, 500+ live Indian channels, 10,000+ movies on demand, and 4K cricket on UK broadband.",
  alternates: {
    canonical: "https://chitramtv.eu/features",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://chitramtv.eu/features",
    siteName: "ChitramTV UK",
    title: "Features — 500+ Channels, 14-Day Catch-Up & 4K | ChitramTV UK",
    description:
      "Explore ChitramTV features: 14-day automated catch-up TV, 500+ live Indian channels, 10,000+ movies on demand, and 4K cricket on UK broadband.",
    images: [
      {
        url: "/Logo.png",
        width: 280,
        height: 64,
        alt: "ChitramTV UK Features",
      },
    ],
  },
};

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
