import type { Metadata } from "next";
import DashboardClient from "./DashboardClient";

export const metadata: Metadata = {
  title: "Dashboard | SOCIAL VIENS Admin",
  description:
    "Overview of blog posts, leads, portfolio items, testimonials, and quick actions for the SOCIAL VIENS admin console.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminDashboardPage() {
  return <DashboardClient />;
}
