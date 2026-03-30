import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { DisclaimerFloatingButton } from "@/components/disclaimer-dialog";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

// Update this with your actual domain when deployed
const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://rbf-charity.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "The Regentonians' Benevolent Fund | RBF Fund",
    template: "%s | The Regentonians' Benevolent Fund",
  },
  description:
    "The Regentonians' Benevolent Fund provides compassionate welfare support to alumni of Sierra Leone Grammar School during times of need. Supporting bereavement, illness recovery, and milestone celebrations through community solidarity.",
  keywords: [
    "Regentonians' Benevolent Fund",
    "RBF Fund",
    "Sierra Leone Grammar School",
    "alumni support",
    "fund organisation",
    "welfare support",
    "bereavement support",
    "community fund",
    "Sierra Leone alumni",
    "benevolent fund",
    "community support",
    "contribution",
    "fund contributions",
    "alumni network",
    "grammar school alumni",
  ],
  authors: [{ name: "The Regentonians' Benevolent Fund" }],
  creator: "The Regentonians' Benevolent Fund",
  publisher: "The Regentonians' Benevolent Fund",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: "The Regentonians' Benevolent Fund",
    title: "The Regentonians' Benevolent Fund | RBF Fund",
    description:
      "Providing compassionate welfare support to alumni of Sierra Leone Grammar School during times of need. Supporting bereavement, illness recovery, and milestone celebrations.",
    images: [
      {
        url: "/seo.png", // Update with your actual OG image
        width: 1200,
        height: 630,
        alt: "The Regentonians' Benevolent Fund - Community Support",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Regentonians' Benevolent Fund | RBF Fund",
    description:
      "Compassionate welfare support for alumni of Sierra Leone Grammar School during times of need.",
    images: ["/seo.png"], // Update with your actual Twitter image
    creator: "@rbfcharity", // Update with your Twitter handle if available
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
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/seo.png", sizes: "any", type: "image/png" },
    ],
    apple: [
      { url: "/seo.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: siteUrl,
  },
  category: "fund",
  classification: "Fund Organisation",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "RBF Fund",
    "mobile-web-app-capable": "yes",
    "theme-color": "#800080",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#800080" },
    { media: "(prefers-color-scheme: dark)", color: "#800080" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfairDisplay.variable} font-sans antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
          <DisclaimerFloatingButton />
        </div>
      </body>
    </html>
  );
}
