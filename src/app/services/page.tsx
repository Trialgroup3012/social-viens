import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Our Services | Premium Digital Marketing — SOCIAL VIENS",
  description:
    "9 comprehensive digital marketing services: Website Development, SEO, Local SEO, Google Business Profile, Paid Ads, Social Media, Branding, Automation, and Lead Generation. Starting at ₹8,000/month.",
  keywords: [
    "digital marketing services India",
    "SEO services",
    "website development",
    "paid advertising",
    "social media marketing",
    "branding agency",
    "lead generation",
    "marketing automation",
  ],
  openGraph: {
    title: "Our Services | SOCIAL VIENS",
    description:
      "Nine premium digital marketing services designed to deliver measurable growth. Explore each service in detail.",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
