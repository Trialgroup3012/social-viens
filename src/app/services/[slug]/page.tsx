import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  services,
  getServiceBySlug,
  getAllServiceSlugs,
} from "@/lib/services-data";
import ServiceDetailClient from "./ServiceDetailClient";
import {
  SITE_URL,
  generateServiceSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema";

/**
 * Pre-render all 9 service pages at build time.
 */
export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

/**
 * Generate per-service metadata for SEO.
 */
export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return (async () => {
    const { slug } = await params;
    const service = getServiceBySlug(slug);
    if (!service) {
      return {
        title: "Service Not Found — SOCIAL VIENS",
      };
    }
    const title = `${service.title} | SOCIAL VIENS`;
    const description = service.longDescription.slice(0, 160);
    return {
      title,
      description,
      keywords: [
        service.title.toLowerCase(),
        "digital marketing",
        "social viens",
        ...service.benefits.map((b) => b.toLowerCase()),
      ],
      openGraph: {
        title,
        description,
        type: "website",
      },
    };
  })();
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) {
    notFound();
  }

  const serviceSchema = generateServiceSchema({
    title: service.title,
    longDescription: service.longDescription,
    slug: service.slug,
    startingPrice: service.startingPrice,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Services", url: `${SITE_URL}/services` },
    { name: service.title, url: `${SITE_URL}/services/${service.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServiceDetailClient slug={slug} />
    </>
  );
}
