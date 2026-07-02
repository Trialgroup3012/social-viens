import type { Metadata } from "next";
import TermsClient from "./TermsClient";

export const metadata: Metadata = {
  title: "Terms of Service | SOCIAL VIENS",
  description:
    "The terms and conditions that govern your engagement with Social Viens. Read about client responsibilities, payment terms, intellectual property, confidentiality, and more.",
  keywords: [
    "terms of service",
    "agency agreement",
    "digital marketing contract",
    "client terms India",
    "marketing engagement terms",
  ],
  openGraph: {
    title: "Terms of Service | SOCIAL VIENS",
    description:
      "Terms governing engagement with Social Viens — including payments, IP, confidentiality, and liability.",
    type: "article",
    locale: "en_IN",
  },
};

export default function TermsPage() {
  return <TermsClient />;
}
