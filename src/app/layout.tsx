import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChitramTV UK — Premium Live Indian TV Channels & Movies in Ultra HD",
  description:
    "Stream 350+ live Indian TV channels, live cricket, and 10,000+ movies on Smart TV, Firestick, Mobile & PC across the UK. 7-day catch-up with zero buffer on ChitramTV.",
  icons: {
    icon: "/assets/client/favicon.svg",
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
        <link rel="icon" type="image/svg+xml" href="/assets/client/favicon.svg" />
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
