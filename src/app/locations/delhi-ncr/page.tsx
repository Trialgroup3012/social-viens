import type { Metadata } from "next";
import DelhiNcrClient from "./DelhiNcrClient";

export const metadata: Metadata = {
  alternates: { canonical: "/locations/delhi-ncr" },
  title: "Digital Marketing Agency in Delhi NCR | SOCIAL VIENS",
  description:
    "SEO, paid ads, social media, website development and branding for businesses across Delhi NCR. Talk with our team about your goals.",
  keywords: [
    "digital marketing agency Delhi NCR",
    "SEO services Delhi",
    "Google Ads Delhi",
    "social media marketing Delhi",
    "web development Delhi NCR",
    "branding agency Delhi",
    "local SEO Delhi",
    "marketing agency Noida",
    "marketing agency Gurgaon",
  ],
  openGraph: {
    images: ["/social-viens-logo.png"],
    title: "Digital Marketing Agency in Delhi NCR | SOCIAL VIENS",
    description:
      "Digital marketing services for businesses across Delhi NCR.",
    type: "website",
    locale: "en_IN",
  },
};

export default function DelhiNcrPage() {
  return <DelhiNcrClient />;
}
