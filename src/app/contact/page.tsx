import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import ContactClient from "./ContactClient";
import { SITE_URL, generateBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact — Social Viens | Get Your Free Strategy Session",
  description:
    "Get in touch with Social Viens. Free strategy session, response within 24 hours, 100% confidential. Call +91 81780 04800 or message us on WhatsApp.",
  keywords: [
    "contact digital marketing agency",
    "free marketing consultation",
    "Delhi NCR marketing agency",
    "WhatsApp marketing help",
  ],
  openGraph: {
    title: "Contact — Social Viens",
    description:
      "Get in touch for a free strategy session. We respond within 24 hours.",
    type: "website",
  },
};

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
