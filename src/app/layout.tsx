import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SITE_URL } from "@/lib/schema";

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
    "We help ambitious businesses dominate search engines, generate quality leads, build unforgettable brands, and scale revenue through AI-powered digital marketing. Real Estate, Healthcare, Law Firms & more.",
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
      "Elevate your digital presence. AI-powered digital marketing for ambitious brands.",
    siteName: "SOCIAL VIENS",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "SOCIAL VIENS | Premium Digital Marketing Agency",
    description:
      "Elevate your digital presence. AI-powered digital marketing for ambitious brands.",
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
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "50",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What services does Social Viens offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer Website Development, SEO, Local SEO, Google Business Profile Optimization, Paid Advertising, Social Media Marketing, Branding & Design, Marketing Automation, and Lead Generation.",
      },
    },
    {
      "@type": "Question",
      name: "How much does digital marketing cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our pricing is customized based on your business goals. Packages start from ₹25,000/month for small businesses.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to see results?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paid advertising shows results within 2-4 weeks. SEO and organic growth take 3-6 months for significant results.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer a free consultation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! We offer a completely free, no-obligation strategy session where we analyze your business and create a custom roadmap.",
      },
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
