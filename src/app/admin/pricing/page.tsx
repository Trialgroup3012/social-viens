import type { Metadata } from "next";
import PricingAdminClient from "./PricingAdminClient";

export const metadata: Metadata = {
  title: "Pricing — Admin — SOCIAL VIENS",
  description: "Manage pricing packages shown on the SOCIAL VIENS website.",
};

export default function AdminPricingPage() {
  return (
    <div className="admin-light min-h-screen bg-background">
      <PricingAdminClient />
    </div>
  );
}
