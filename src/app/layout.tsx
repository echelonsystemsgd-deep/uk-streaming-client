import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://chitramtv.eu"),
  title: {
    default: "ChitramTV UK — Premium Live Indian TV Channels & Movies in Ultra HD",
    template: "%s | ChitramTV UK",
  },
  description:
    "Stream 350+ live Indian TV channels, live cricket in 4K UHD, and 10,000+ movies on Smart TV, Firestick, Mobile & PC across the UK. 7-day catch-up with zero buffering on ChitramTV UK.",
  applicationName: "ChitramTV UK",
  authors: [
    { name: "ChitramTV UK", url: "https://chitramtv.eu" },
    { name: "Mercian Wealth", url: "https://mercianwealth.com" },
  ],
  creator: "ChitramTV UK",
  publisher: "ChitramTV UK",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/assets/client/favicon.svg", type: "image/svg+xml", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  alternates: {
    canonical: "https://chitramtv.eu",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://chitramtv.eu",
    siteName: "ChitramTV UK",
    title: "ChitramTV UK — Premium Live Indian TV Channels & Movies in Ultra HD",
    description:
      "Stream 350+ live Indian TV channels, live cricket in 4K UHD, and 10,000+ movies on Smart TV, Firestick, Mobile & PC across the UK. 7-day catch-up with zero buffering.",
    images: [
      {
        url: "/assets/client/logo.svg",
        width: 280,
        height: 64,
        alt: "ChitramTV UK Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ChitramTV UK — Premium Live Indian TV Channels & Movies in Ultra HD",
    description:
      "Stream 350+ live Indian TV channels, live cricket in 4K UHD, and 10,000+ movies across the UK with 7-day catch-up TV.",
    images: ["/assets/client/logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-background text-foreground min-h-screen antialiased selection:bg-primary/20 selection:text-primary">
        {children}
      </body>
    </html>
  );
}
