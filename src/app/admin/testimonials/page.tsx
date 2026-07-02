import type { Metadata } from "next";
import TestimonialsAdminClient from "./TestimonialsAdminClient";

export const metadata: Metadata = {
  title: "Testimonials Management | SOCIAL VIENS Admin",
  description:
    "Create, edit, and delete client testimonials for the Social Viens website.",
  robots: { index: false, follow: false },
};

export default function AdminTestimonialsPage() {
  return <TestimonialsAdminClient />;
}
