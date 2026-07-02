import type { Metadata } from "next";
import PagesAdminClient from "./PagesAdminClient";

export const metadata: Metadata = {
  title: "Pages — Admin — SOCIAL VIENS",
  description: "Manage custom pages and content blocks.",
};

export default function AdminPagesPage() {
  return (
    <div className="admin-light min-h-screen bg-background">
      <PagesAdminClient />
    </div>
  );
}
