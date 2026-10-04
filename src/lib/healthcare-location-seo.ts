import type { Metadata } from "next";
import type { HealthcareLocationPage } from "@/lib/healthcare-location-data";
import { SITE_NAME, SITE_URL } from "@/lib/schema";
import { generateBreadcrumbSchema } from "@/lib/schema";

const areaNames: Record<HealthcareLocationPage["location"], string> = {
  dwarka: "Dwarka, Delhi, India",
  nsp: "Netaji Subhash Place, Delhi, India",
  "vasant-vihar": "Vasant Vihar, Delhi, India",
  delhi: "Delhi, India",
};

export function generateHealthcareLocationMetadata(
  page: HealthcareLocationPage,
): Metadata {
  return {
    alternates: { canonical: `/${page.slug}` },
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: [
      page.targetKeyword,
      `${page.audience === "doctors" ? "clinic" : "hospital"} marketing ${page.locationLabel}`,
      "healthcare marketing",
      "SOCIAL VIENS",
    ],
    openGraph: {
      images: ["/social-viens-logo.png"],
      title: page.metaTitle,
      description: page.metaDescription,
      type: "website",
      locale: "en_IN",
      siteName: SITE_NAME,
    },
  };
}

export function generateHealthcareServiceSchema(page: HealthcareLocationPage) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.title,
    description: page.overviewText,
    url: `${SITE_URL}/${page.slug}`,
    areaServed: {
      "@type": "Place",
      name: areaNames[page.location],
    },
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function generateHealthcareBreadcrumbSchema(page: HealthcareLocationPage) {
  return generateBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    {
      name: "Healthcare Marketing",
      url: page.audience === "doctors" ? "/niches/doctors-clinics" : "/medical-marketing",
    },
    { name: page.title, url: `/${page.slug}` },
  ]);
}
