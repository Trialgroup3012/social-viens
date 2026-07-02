import type { Metadata } from "next";
import LoginClient from "./LoginClient";

export const metadata: Metadata = {
  title: "Admin Login | SOCIAL VIENS",
  description:
    "Secure admin console access for SOCIAL VIENS content, leads, and site management.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginPage() {
  return <LoginClient />;
}
