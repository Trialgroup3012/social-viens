import type { Metadata } from "next";
import NotificationsAdminClient from "./NotificationsAdminClient";

export const metadata: Metadata = {
  title: "Notifications — Admin — SOCIAL VIENS",
  description: "Review admin alerts for new leads, chat conversions and signups.",
};

export default function AdminNotificationsPage() {
  return (
    <div className="admin-light min-h-screen bg-background">
      <NotificationsAdminClient />
    </div>
  );
}
