import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import ContactClient from "./ContactClient";
import { SITE_URL, generateBreadcrumbSchema } from "@/lib/schema";
import { withSeoOverride } from "@/lib/server-seo";

const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact SOCIAL VIENS | Digital Marketing",
  description:
    "Talk with SOCIAL VIENS about SEO, digital marketing or your business growth plans. Contact our team by phone or WhatsApp.",
  keywords: [
    "contact digital marketing agency",
    "free marketing consultation",
    "Delhi NCR marketing agency",
    "WhatsApp marketing help",
  ],
  openGraph: {
    images: ["/social-viens-logo.png"],
    title: "Contact — Social Viens",
    description:
      "Get in touch for a free strategy session. We respond within 24 hours.",
    type: "website",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withSeoOverride("/contact", metadata);
}

export default function ContactPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Contact", url: `${SITE_URL}/contact` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PageShell breadcrumbs={[{ label: "Contact" }]}>
        <ContactClient />
      </PageShell>
    </>
  );
}
