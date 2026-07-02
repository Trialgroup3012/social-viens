import type { Metadata } from "next";
import PrivacyPolicyClient from "./PrivacyPolicyClient";

export const metadata: Metadata = {
  title: "Privacy Policy | SOCIAL VIENS",
  description:
    "How Social Viens collects, uses, and protects your personal information. Learn about your rights, our data practices, and contact options for privacy-related queries.",
  keywords: [
    "privacy policy",
    "data protection India",
    "DPDP Act",
    "digital marketing agency privacy",
    "GDPR compliance",
  ],
  openGraph: {
    title: "Privacy Policy | SOCIAL VIENS",
    description:
      "How Social Viens collects, uses, and safeguards your personal data.",
    type: "article",
    locale: "en_IN",
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}
