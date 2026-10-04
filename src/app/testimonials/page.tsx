import type { Metadata } from "next";
import TestimonialsClient from "./TestimonialsClient";
import { SITE_URL, generateBreadcrumbSchema } from "@/lib/schema";
import { withSeoOverride } from "@/lib/server-seo";

const metadata: Metadata = {
  alternates: { canonical: "/testimonials" },
  title: "Client Testimonials | SOCIAL VIENS",
  description:
    "Read client feedback and selected project outcomes across industries served by SOCIAL VIENS.",
  keywords: [
    "digital marketing testimonials",
    "client success stories",
    "real estate marketing results",
    "SEO case studies India",
    "agency reviews",
    "ROI marketing",
  ],
  openGraph: {
    images: ["/social-viens-logo.png"],
    title: "Client Success Stories | SOCIAL VIENS",
    description:
      "Read client feedback and selected project outcomes from SOCIAL VIENS.",
    type: "website",
    locale: "en_IN",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withSeoOverride("/testimonials", metadata);
}

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
