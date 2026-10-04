import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SITE_URL } from "@/lib/schema";
import TrackingScripts from "@/components/layout/TrackingScripts";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "SOCIAL VIENS | Premium Digital Marketing Agency in India",
  description:
    "Digital marketing for Indian businesses: SEO, paid ads, social media, branding and website growth from SOCIAL VIENS.",
  keywords: [
    "digital marketing agency",
    "SEO services India",
    "lead generation",
    "social media marketing",
    "branding agency",
    "paid advertising",
    "website development",
    "SOCIAL VIENS",
    "growth marketing",
    "performance marketing",
    "local SEO India",
    "Google Ads management",
    "digital marketing for real estate",
    "healthcare marketing",
    "law firm marketing",
  ],
  authors: [{ name: "SOCIAL VIENS" }],
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "SOCIAL VIENS | Premium Digital Marketing Agency",
    description:
      "SEO, paid ads, social media, branding and website growth for Indian businesses.",
    siteName: "SOCIAL VIENS",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/social-viens-logo.png", width: 2000, height: 2000, alt: "SOCIAL VIENS" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SOCIAL VIENS | Premium Digital Marketing Agency",
    description:
      "SEO, paid ads, social media, branding and website growth for Indian businesses.",
    images: ["/social-viens-logo.png"],
  },
};

// JSON-LD structured data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "SOCIAL VIENS",
  description:
    "Premium digital marketing agency in India helping businesses dominate search engines, generate quality leads, and scale revenue through AI-powered strategies.",
  url: SITE_URL,
  telephone: "+918178004800",
  email: "socialviens@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "New Delhi",
    addressRegion: "Delhi",
    addressCountry: "IN",
  },
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  serviceType: [
    "Digital Marketing",
    "SEO",
    "Local SEO",
    "Paid Advertising",
    "Social Media Marketing",
    "Branding",
    "Website Development",
    "Lead Generation",
    "Marketing Automation",
  ],
  priceRange: "₹₹₹",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        <TrackingScripts />
      </body>
    </html>
  );
}
