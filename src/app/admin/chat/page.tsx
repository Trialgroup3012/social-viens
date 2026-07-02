import type { Metadata } from "next";
import ChatAdminClient from "./ChatAdminClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Chat History — Admin — SOCIAL VIENS",
  description: "Review AI chatbot conversations captured from the website.",
};

export default function Page() {
  return <ChatAdminClient />;
}
