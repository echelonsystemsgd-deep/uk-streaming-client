import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | ChitramTV UK",
  description:
    "Learn about ChitramTV UK, operated by Shiva Technology Ltd. We deliver 500+ live Indian TV channels, 14-day catch-up, and buffer-free HD streaming across the UK.",
  alternates: {
    canonical: "https://chitramtv.eu/about",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://chitramtv.eu/about",
    siteName: "ChitramTV UK",
    title: "About Us | ChitramTV UK",
    description:
      "Learn about ChitramTV UK, operated by Shiva Technology Ltd. Delivering 500+ live Indian TV channels with 14-day catch-up across the UK.",
    images: [
      {
        url: "/Logo.png",
        width: 280,
        height: 64,
        alt: "ChitramTV UK About Us",
      },
    ],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
