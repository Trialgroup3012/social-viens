import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import PricingClient from "./PricingClient";
import { SITE_URL, generateBreadcrumbSchema } from "@/lib/schema";
import { withSeoOverride } from "@/lib/server-seo";

const metadata: Metadata = {
  alternates: { canonical: "/pricing" },
  title: "Digital Marketing Pricing | SOCIAL VIENS",
  description:
    "Compare digital marketing plans for different business goals. Review pricing details and request a tailored proposal from our team.",
  keywords: [
    "digital marketing pricing India",
    "SEO pricing",
    "social media marketing cost",
    "marketing agency packages",
  ],
  openGraph: {
    images: ["/social-viens-logo.png"],
    title: "Pricing — Social Viens",
    description:
      "Transparent pricing, no hidden fees. Every plan is designed to deliver measurable ROI.",
    type: "website",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withSeoOverride("/pricing", metadata);
}

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
