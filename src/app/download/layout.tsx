import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Downloads — ChitramTV APK & App Setup | ChitramTV UK",
  description:
    "Download official ChitramTV APKs for Android Smart TV, Amazon Firestick Downloader code, and mobile devices across the UK.",
  alternates: {
    canonical: "https://chitramtv.eu/download",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://chitramtv.eu/download",
    siteName: "ChitramTV UK",
    title: "Downloads — ChitramTV APK & App Setup | ChitramTV UK",
    description:
      "Download official ChitramTV APKs for Android Smart TV, Amazon Firestick Downloader code, and mobile devices across the UK.",
    images: [
      {
        url: "/Logo.png",
        width: 280,
        height: 64,
        alt: "ChitramTV UK Downloads",
      },
    ],
  },
};

export default function DownloadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
