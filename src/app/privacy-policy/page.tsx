import type { Metadata } from "next";
import PrivacyPolicyClient from "./PrivacyPolicyClient";
import { withSeoOverride } from "@/lib/server-seo";

const metadata: Metadata = {
  alternates: { canonical: "/privacy-policy" },
  title: "Privacy Policy | SOCIAL VIENS",
  description:
    "Learn how SOCIAL VIENS handles personal information, website data and privacy requests.",
  keywords: [
    "privacy policy",
    "data protection India",
    "DPDP Act",
    "digital marketing agency privacy",
    "GDPR compliance",
  ],
  openGraph: {
    images: ["/social-viens-logo.png"],
    title: "Privacy Policy | SOCIAL VIENS",
    description:
      "How Social Viens collects, uses, and safeguards your personal data.",
    type: "article",
    locale: "en_IN",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withSeoOverride("/privacy-policy", metadata);
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}
