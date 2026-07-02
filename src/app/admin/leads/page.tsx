import type { Metadata } from "next";
import LeadsAdminClient from "./LeadsAdminClient";

export const metadata: Metadata = {
  title: "Leads — Admin — SOCIAL VIENS",
  description: "Manage captured leads from the SOCIAL VIENS website.",
};

export default function AdminLeadsPage() {
  return (
    <div className="admin-light min-h-screen bg-background">
      <LeadsAdminClient />
    </div>
  );
}
