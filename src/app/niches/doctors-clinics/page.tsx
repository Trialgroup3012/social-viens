import type { Metadata } from "next";
import DoctorsClinicsClient from "./DoctorsClinicsClient";

export const metadata: Metadata = {
  alternates: { canonical: "/niches/doctors-clinics" },
  title: "Digital Marketing for Doctors & Clinics | SOCIAL VIENS",
  description:
    "Digital marketing for doctors and clinics, including healthcare SEO, local profile optimisation, patient enquiry campaigns and professional content.",
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
    images: ["/social-viens-logo.png"],
    title: "Digital Marketing for Doctors & Clinics | SOCIAL VIENS",
    description:
      "Digital marketing services for doctors, clinics and hospitals.",
    type: "website",
    locale: "en_IN",
  },
};

export default function DoctorsClinicsPage() {
  return <DoctorsClinicsClient />;
}
