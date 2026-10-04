import type { Metadata } from "next";
import AboutClient from "./AboutClient";
import { SITE_URL, generateBreadcrumbSchema } from "@/lib/schema";
import { withSeoOverride } from "@/lib/server-seo";

const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About SOCIAL VIENS | Digital Growth Agency",
  description:
    "Meet the team behind SOCIAL VIENS and learn how we help Indian businesses grow through search, content and digital marketing.",
  keywords: [
    "about SOCIAL VIENS",
    "digital marketing agency India",
    "Delhi marketing agency",
    "growth marketing team",
    "SOCIAL VIENS story",
  ],
  openGraph: {
    images: ["/social-viens-logo.png"],
    title: "About SOCIAL VIENS | Premium Digital Marketing Agency",
    description:
      "Our story, values, team, and milestones — meet the growth department behind 100+ successful brands.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withSeoOverride("/about", metadata);
}

export default function AboutPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "About", url: `${SITE_URL}/about` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutClient />
    </>
  );
}
