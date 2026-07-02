import type { Metadata } from "next";
import ServicesAdminClient from "./ServicesAdminClient";

export const metadata: Metadata = {
  title: "Services — Admin — SOCIAL VIENS",
  description: "Manage services offered by SOCIAL VIENS.",
};

export default function AdminServicesPage() {
  return (
    <div className="admin-light min-h-screen bg-background">
      <ServicesAdminClient />
    </div>
  );
}
