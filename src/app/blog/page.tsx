import type { Metadata } from "next";
import BlogClient from "./BlogClient";
import { withSeoOverride } from "@/lib/server-seo";

const metadata: Metadata = {
  alternates: { canonical: "/blog" },
  title: "Digital Marketing Insights | SOCIAL VIENS",
  description:
    "Explore practical guides to SEO, paid ads, branding, web design and social media from the SOCIAL VIENS team.",
  keywords: [
    "digital marketing blog",
    "SEO strategies India",
    "Google Ads tips",
    "real estate marketing",
    "local SEO Delhi",
    "conversion rate optimisation",
    "social media strategy 2026",
  ],
  openGraph: {
    images: ["/social-viens-logo.png"],
    title: "Blog & Insights | SOCIAL VIENS",
    description:
      "Practical growth marketing insights from the Social Viens team — backed by real campaign data.",
    type: "website",
    locale: "en_IN",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withSeoOverride("/blog", metadata);
}

export default function BlogPage() {
  return <BlogClient />;
}
