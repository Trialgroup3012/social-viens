import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog & Insights | Growth Marketing Strategies — SOCIAL VIENS",
  description:
    "Practical, no-fluff growth marketing insights from the Social Viens team. Real strategies for SEO, paid ads, branding, web design, and social media — backed by real campaign data.",
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
    title: "Blog & Insights | SOCIAL VIENS",
    description:
      "Practical growth marketing insights from the Social Viens team — backed by real campaign data.",
    type: "website",
    locale: "en_IN",
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
