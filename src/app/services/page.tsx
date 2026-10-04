import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";
import { withSeoOverride } from "@/lib/server-seo";

const metadata: Metadata = {
  alternates: { canonical: "/services" },
  title: "Digital Marketing Services | SOCIAL VIENS",
  description:
    "Explore SEO, paid ads, social media, branding, websites and automation services for business growth. Review available services and pricing.",
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
    images: ["/social-viens-logo.png"],
    title: "Digital Marketing Services | SOCIAL VIENS",
    description:
      "Nine premium digital marketing services designed to deliver measurable growth. Explore each service in detail.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withSeoOverride("/services", metadata);
}

export default function ServicesPage() {
  return <ServicesClient />;
}
