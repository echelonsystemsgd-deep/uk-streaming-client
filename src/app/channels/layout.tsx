import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "500+ Live Channels & 14-Day Catch-Up Guide",
  description:
    "Explore 500+ live Indian TV channels in Hindi, Punjabi, Tamil, Telugu, Malayalam & English. 4K UHD sports, live cricket, and 14-day catch-up EPG across the UK.",
  alternates: {
    canonical: "https://chitramtv.eu/channels",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://chitramtv.eu/channels",
    siteName: "ChitramTV UK",
    title: "500+ Live Indian TV Channels & 14-Day Catch-Up Guide | ChitramTV UK",
    description:
      "Explore 500+ live Indian TV channels in Hindi, Punjabi, Tamil, Telugu, Malayalam & English. 4K UHD sports, live cricket, and 14-day catch-up EPG across the UK.",
    images: [
      {
        url: "/Logo.png",
        width: 280,
        height: 64,
        alt: "ChitramTV UK Channels",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "500+ Live Indian TV Channels & 14-Day Catch-Up Guide | ChitramTV UK",
    description:
      "Explore 500+ live Indian TV channels in Hindi, Punjabi, Tamil, Telugu, Malayalam & English with 14-day catch-up across the UK.",
    images: ["/Logo.png"],
  },
};

export default function ChannelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
