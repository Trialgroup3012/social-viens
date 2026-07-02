import type { Metadata } from "next";
import SettingsAdminClient from "./SettingsAdminClient";

export const metadata: Metadata = {
  title: "Settings | SOCIAL VIENS Admin",
  description: "Manage site-wide settings",
};

export default function AdminSettingsPage() {
  return <SettingsAdminClient />;
}
