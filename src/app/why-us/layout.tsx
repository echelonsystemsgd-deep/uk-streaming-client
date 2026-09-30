import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why ChitramTV UK — 7-Day Catch-Up, UK Edge CDN & Zero Buffering",
  description:
    "How ChitramTV UK bridges the 5.5-hour India-to-UK time gap with 7-day automated catch-up TV, dedicated London edge CDN relays, and 24/7 customer care.",
  alternates: {
    canonical: "https://chitramtv.eu/why-us",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://chitramtv.eu/why-us",
    siteName: "ChitramTV UK",
    title: "Why ChitramTV UK — 7-Day Catch-Up, UK Edge CDN & Zero Buffering",
    description:
      "How ChitramTV UK bridges the 5.5-hour India-to-UK time gap with 7-day automated catch-up TV, dedicated London edge CDN relays, and 24/7 customer care.",
    images: [
      {
        url: "/assets/client/logo.svg",
        width: 280,
        height: 64,
        alt: "Why ChitramTV UK",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Why ChitramTV UK — 7-Day Catch-Up & UK Edge CDN",
    description:
      "Bridging the India-to-UK time gap with 7-day catch-up TV, London edge CDN relays, and 24/7 support.",
    images: ["/assets/client/logo.svg"],
  },
};

export default function WhyUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
