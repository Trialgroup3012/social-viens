import type { Metadata } from "next";
import TestimonialsClient from "./TestimonialsClient";
import { SITE_URL, generateBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Client Testimonials & Success Stories | SOCIAL VIENS",
  description:
    "Real results from real clients. 50+ businesses across real estate, healthcare, law, e-commerce, restaurants, and beauty share their growth stories with Social Viens.",
  keywords: [
    "digital marketing testimonials",
    "client success stories",
    "real estate marketing results",
    "SEO case studies India",
    "agency reviews",
    "ROI marketing",
  ],
  openGraph: {
    title: "Client Success Stories | SOCIAL VIENS",
    description:
      "750+ happy clients. 4.9/5 average rating. 350% average ROI. Read what our clients say about working with Social Viens.",
    type: "website",
    locale: "en_IN",
  },
};

export default function TestimonialsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Testimonials", url: `${SITE_URL}/testimonials` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <TestimonialsClient />
    </>
  );
}
