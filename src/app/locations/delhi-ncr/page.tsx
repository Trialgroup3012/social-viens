import type { Metadata } from "next";
import DelhiNcrClient from "./DelhiNcrClient";

export const metadata: Metadata = {
  title: "Digital Marketing Agency in Delhi NCR | SOCIAL VIENS",
  description:
    "Social Viens is a results-driven digital marketing agency serving Delhi NCR. SEO, Google Ads, social media, web development & branding for Delhi businesses. 500+ local clients, 350% avg ROI.",
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
    title: "Digital Marketing Agency in Delhi NCR | SOCIAL VIENS",
    description:
      "Helping Delhi NCR businesses dominate search, generate leads, and scale revenue. 500+ local clients, 350% avg ROI.",
    type: "website",
    locale: "en_IN",
  },
};

export default function DelhiNcrPage() {
  return <DelhiNcrClient />;
}
