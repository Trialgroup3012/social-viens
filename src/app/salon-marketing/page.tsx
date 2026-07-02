import type { Metadata } from "next";
import { getIndustryBySlug } from "@/lib/industry-data";
import IndustryLandingPage from "@/components/IndustryLandingPage";
import {
  generateServiceSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  SITE_URL,
} from "@/lib/schema";
import { notFound } from "next/navigation";

/**
 * Static route file. The slug is the folder name — no dynamic params.
 * Each of the 12 industry-landing routes uses this same template with
 * a single SLUG constant swapped in.
 */
const SLUG = "salon-marketing";

export function generateMetadata(): Metadata {
  const industry = getIndustryBySlug(SLUG);
  if (!industry) return {};
  return {
    title: industry.metaTitle,
    description: industry.metaDescription,
    keywords: [
      industry.targetKeyword,
      industry.category,
      "digital marketing",
      "SOCIAL VIENS",
      "Delhi NCR",
    ],
    openGraph: {
      title: industry.metaTitle,
      description: industry.metaDescription,
      type: "website",
    },
  };
}

export default function Page() {
  const industry = getIndustryBySlug(SLUG);
  if (!industry) notFound();

  const serviceSchema = generateServiceSchema({
    title: industry.title,
    longDescription: industry.overviewText,
    slug: industry.slug,
    startingPrice: "₹15,000",
  });
  const faqSchema = generateFAQSchema(industry.faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Industries", url: `${SITE_URL}/#industries` },
    { name: industry.category, url: `${SITE_URL}/${industry.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <IndustryLandingPage industry={industry} />
    </>
  );
}
