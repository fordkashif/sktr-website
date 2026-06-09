import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-outfit",
});

const BASE_URL = "https://thesktr.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "SKTR Labs — Software Studio",
    template: "%s | SKTR Labs",
  },
  description:
    "SKTR Labs is a software studio. We design and build mobile apps, web platforms, SaaS products, and APIs.",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "SKTR Labs — Software Studio",
    description:
      "We design and build mobile apps, web platforms, SaaS products, and APIs.",
    url: BASE_URL,
    siteName: "SKTR Labs",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "SKTR Labs — Software Studio",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SKTR Labs — Software Studio",
    description:
      "We design and build mobile apps, web platforms, SaaS products, and APIs.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "theme-color": "#050608",
    "color-scheme": "dark",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SKTR Labs",
  url: BASE_URL,
  logo: `${BASE_URL}/sktr-logo.png`,
  description:
    "SKTR Labs is a software studio. We design and build mobile apps, web platforms, SaaS products, and APIs.",
  email: "signal@thesktr.com",
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
