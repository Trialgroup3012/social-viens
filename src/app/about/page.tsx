import type { Metadata } from "next";
import AboutClient from "./AboutClient";
import { SITE_URL, generateBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About SOCIAL VIENS | Premium Digital Marketing Agency in India",
  description:
    "Founded in 2021, SOCIAL VIENS is a premium digital marketing agency helping ambitious Indian businesses dominate search, generate qualified leads, and scale revenue through AI-powered growth strategies.",
  keywords: [
    "about SOCIAL VIENS",
    "digital marketing agency India",
    "Delhi marketing agency",
    "growth marketing team",
    "SOCIAL VIENS story",
  ],
  openGraph: {
    title: "About SOCIAL VIENS | Premium Digital Marketing Agency",
    description:
      "Our story, values, team, and milestones — meet the growth department behind 100+ successful brands.",
  },
};

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
