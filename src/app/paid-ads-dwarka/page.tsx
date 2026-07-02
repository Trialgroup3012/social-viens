import type { Metadata } from "next";
import { getLocationBySlug } from "@/lib/location-data";
import LocationLandingPage from "@/components/LocationLandingPage";
import {
  generateServiceSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  SITE_URL,
} from "@/lib/schema";
import { notFound } from "next/navigation";

/**
 * Static route file. The slug is the folder name — no dynamic params.
 * Each of the 14 location-landing routes uses this same template with
 * a single SLUG constant swapped in.
 */
const SLUG = "paid-ads-dwarka";

export function generateMetadata(): Metadata {
  const page = getLocationBySlug(SLUG);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: [
      page.targetKeyword,
      `${page.serviceKey} ${page.locationLabel}`,
      "digital marketing",
      "SOCIAL VIENS",
    ],
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      type: "website",
    },
  };
}

export default function Page() {
  const page = getLocationBySlug(SLUG);
  if (!page) notFound();

  const serviceSchema = generateServiceSchema({
    title: page.title,
    longDescription: page.overviewText,
    slug: page.slug,
    startingPrice: "₹15,000",
  });
  const faqSchema = generateFAQSchema(page.faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: page.locationLabel, url: `${SITE_URL}/locations/delhi-ncr` },
    { name: page.title, url: `${SITE_URL}/${page.slug}` },
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
      <LocationLandingPage page={page} />
    </>
  );
}
