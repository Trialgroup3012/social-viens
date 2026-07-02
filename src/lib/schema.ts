/**
 * schema.ts
 * ---------
 * Pure JSON-LD schema generators for SOCIAL VIENS (Spec §9.3).
 *
 * Each function returns a plain JS object ready to be passed to:
 *   <script type="application/ld+json"
 *           dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
 *
 * No side effects. No imports of data files — callers pass plain data in.
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://socialviens.in").replace(/\/$/, "");
export const SITE_NAME = "SOCIAL VIENS";
export const SITE_PHONE = "+918178004800";
export const SITE_EMAIL = "socialviens@gmail.com";

const LOGO_URL = `${SITE_URL}/logo.svg`;

/**
 * LocalBusiness / ProfessionalService schema for the agency.
 * Injected on the root layout (kept here as the canonical generator).
 */
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    description:
      "Premium digital marketing agency in Delhi NCR helping businesses dominate search engines, generate quality leads, and scale revenue through AI-powered strategies.",
    url: SITE_URL,
    telephone: SITE_PHONE,
    email: SITE_EMAIL,
    logo: LOGO_URL,
    image: LOGO_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Delhi NCR",
      addressRegion: "Delhi",
      addressCountry: "IN",
    },
    areaServed: "Delhi NCR",
    priceRange: "$$",
    openingHours: "Mo-Sa 09:00-19:00",
    sameAs: [
      "https://www.instagram.com/socialviens",
      "https://www.linkedin.com/company/socialviens",
      "https://www.facebook.com/socialviens",
    ],
  };
}

/**
 * Article schema for blog posts.
 */
export function generateArticleSchema(post: {
  title: string;
  excerpt: string;
  publishedAt: string;
  author: string;
  authorRole: string;
  category: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: `${SITE_URL}/blog/${post.slug}/og-image`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    articleSection: post.category,
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: post.authorRole,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

/**
 * FAQPage schema from a list of {q, a} pairs.
 */
export function generateFAQSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

/**
 * Service schema for service detail pages.
 */
export function generateServiceSchema(service: {
  title: string;
  longDescription: string;
  slug: string;
  startingPrice: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.longDescription,
    url: `${SITE_URL}/services/${service.slug}`,
    provider: {
      "@type": "LocalBusiness",
      name: SITE_NAME,
      url: SITE_URL,
      telephone: SITE_PHONE,
    },
    areaServed: "Delhi NCR",
    offers: {
      "@type": "Offer",
      price: service.startingPrice,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
  };
}

/**
 * BreadcrumbList schema from ordered {name, url} items.
 * `url` may be a path (e.g. "/blog") or a full URL — paths are resolved
 * against SITE_URL.
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      const url = item.url.startsWith("http")
        ? item.url
        : `${SITE_URL}${item.url.startsWith("/") ? "" : "/"}${item.url}`;
      return {
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: url,
      };
    }),
  };
}
