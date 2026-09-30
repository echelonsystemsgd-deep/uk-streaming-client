import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "350+ Live Channels & 7-Day Catch-Up Guide",
  description:
    "Explore 350+ live Indian TV channels in Hindi, Punjabi, Tamil, Telugu, Malayalam & English. 4K UHD sports, live cricket, and 7-day catch-up EPG across the UK.",
  alternates: {
    canonical: "https://chitramtv.eu/channels",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://chitramtv.eu/channels",
    siteName: "ChitramTV UK",
    title: "350+ Live Indian TV Channels & 7-Day Catch-Up Guide | ChitramTV UK",
    description:
      "Explore 350+ live Indian TV channels in Hindi, Punjabi, Tamil, Telugu, Malayalam & English. 4K UHD sports, live cricket, and 7-day catch-up EPG across the UK.",
    images: [
      {
        url: "/assets/client/logo.svg",
        width: 280,
        height: 64,
        alt: "ChitramTV UK Channels",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "350+ Live Indian TV Channels & 7-Day Catch-Up Guide | ChitramTV UK",
    description:
      "Explore 350+ live Indian TV channels in Hindi, Punjabi, Tamil, Telugu, Malayalam & English with 7-day catch-up across the UK.",
    images: ["/assets/client/logo.svg"],
  },
};

export default function ChannelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
