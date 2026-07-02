import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import PricingClient from "./PricingClient";
import { SITE_URL, generateBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Pricing — Social Viens | Transparent Digital Marketing Plans",
  description:
    "Transparent pricing for every stage of growth. Starter ₹25K/mo, Professional ₹65K/mo (most popular), Enterprise custom. 30-day money-back guarantee.",
  keywords: [
    "digital marketing pricing India",
    "SEO pricing",
    "social media marketing cost",
    "marketing agency packages",
  ],
  openGraph: {
    title: "Pricing — Social Viens",
    description:
      "Transparent pricing, no hidden fees. Every plan is designed to deliver measurable ROI.",
    type: "website",
  },
};

export default function PricingPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Pricing", url: `${SITE_URL}/pricing` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PageShell breadcrumbs={[{ label: "Pricing" }]}>
        <PricingClient />
      </PageShell>
    </>
  );
}
