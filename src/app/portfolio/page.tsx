import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import PortfolioClient from "./PortfolioClient";
import { SITE_URL, generateBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Portfolio — Social Viens | Premium Digital Marketing Work",
  description:
    "Explore 750+ projects across Website, SEO, Social Media & Branding. Real results for real clients — from 180% lead-gen lifts to #1 Google rankings.",
  keywords: [
    "digital marketing portfolio",
    "SEO case studies",
    "website design India",
    "social media marketing work",
    "branding portfolio",
  ],
  openGraph: {
    title: "Portfolio — Social Viens",
    description:
      "Real results for real clients. Every project is a partnership that translated ambition into measurable growth.",
    type: "website",
  },
};

export default function PortfolioPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Portfolio", url: `${SITE_URL}/portfolio` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PageShell breadcrumbs={[{ label: "Portfolio" }]}>
        <PortfolioClient />
      </PageShell>
    </>
  );
}
