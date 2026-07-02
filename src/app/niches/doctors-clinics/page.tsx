import type { Metadata } from "next";
import DoctorsClinicsClient from "./DoctorsClinicsClient";

export const metadata: Metadata = {
  title: "Digital Marketing for Doctors & Clinics | SOCIAL VIENS",
  description:
    "Healthcare-specialised digital marketing for doctors, clinics, and hospitals. Medical SEO, patient acquisition ads, GBP optimisation, and doctor personal branding. 7x patient inquiry growth.",
  keywords: [
    "healthcare marketing India",
    "doctor marketing",
    "clinic SEO",
    "medical digital marketing",
    "doctor personal branding",
    "patient acquisition",
    "hospital marketing agency",
    "Google Business Profile for clinics",
  ],
  openGraph: {
    title: "Digital Marketing for Doctors & Clinics | SOCIAL VIENS",
    description:
      "Compliance-aware healthcare marketing that builds trust and acquires patients. 7x patient inquiry growth.",
    type: "website",
    locale: "en_IN",
  },
};

export default function DoctorsClinicsPage() {
  return <DoctorsClinicsClient />;
}
