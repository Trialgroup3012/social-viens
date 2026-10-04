import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import PortfolioClient from "./PortfolioClient";
import { SITE_URL, generateBreadcrumbSchema } from "@/lib/schema";
import { withSeoOverride } from "@/lib/server-seo";

const metadata: Metadata = {
  alternates: { canonical: "/portfolio" },
  title: "Portfolio — Social Viens | Premium Digital Marketing Work",
  description:
    "Explore selected website, SEO, social media and branding projects, with examples of work delivered for Social Viens clients.",
  keywords: [
    "digital marketing portfolio",
    "SEO case studies",
    "website design India",
    "social media marketing work",
    "branding portfolio",
  ],
  openGraph: {
    images: ["/social-viens-logo.png"],
    title: "Portfolio — Social Viens",
    description:
      "Real results for real clients. Every project is a partnership that translated ambition into measurable growth.",
    type: "website",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withSeoOverride("/portfolio", metadata);
}

export default function PortfolioPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Portfolio", url: `${SITE_URL}/portfolio` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PageShell breadcrumbs={[{ label: "Portfolio" }]}>
        <PortfolioClient />
      </PageShell>
    </>
  );
}
