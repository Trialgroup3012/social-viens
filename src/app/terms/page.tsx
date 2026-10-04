import type { Metadata } from "next";
import TermsClient from "./TermsClient";
import { withSeoOverride } from "@/lib/server-seo";

const metadata: Metadata = {
  alternates: { canonical: "/terms" },
  title: "Terms of Service | SOCIAL VIENS",
  description:
    "Read the terms for using the SOCIAL VIENS website and engaging our digital marketing services.",
  keywords: [
    "terms of service",
    "agency agreement",
    "digital marketing contract",
    "client terms India",
    "marketing engagement terms",
  ],
  openGraph: {
    images: ["/social-viens-logo.png"],
    title: "Terms of Service | SOCIAL VIENS",
    description:
      "Terms governing engagement with Social Viens — including payments, IP, confidentiality, and liability.",
    type: "article",
    locale: "en_IN",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withSeoOverride("/terms", metadata);
}

export default function TermsPage() {
  return <TermsClient />;
}
