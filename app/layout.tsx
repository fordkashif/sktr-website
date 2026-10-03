import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import CustomCursor from "@/components/CustomCursor";
import NavigationProgress from "@/components/NavigationProgress";
import NoiseOverlay from "@/components/NoiseOverlay";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

// The font files live in the project, so a build never depends on Google Fonts being reachable
const outfit = localFont({
  src: [
    { path: "./fonts/outfit-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/outfit-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/outfit-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/outfit-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "./fonts/outfit-latin-800-normal.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-outfit",
  display: "swap",
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
    <html lang="en" className={outfit.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <CustomCursor />
          <NavigationProgress />
          <NoiseOverlay />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
