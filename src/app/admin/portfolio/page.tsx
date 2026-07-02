import type { Metadata } from "next";
import PortfolioAdminClient from "./PortfolioAdminClient";

export const metadata: Metadata = {
  title: "Portfolio Management | SOCIAL VIENS Admin",
  description:
    "Create, edit, and delete portfolio case studies for the Social Viens website.",
  robots: { index: false, follow: false },
};

export default function AdminPortfolioPage() {
  return <PortfolioAdminClient />;
}
