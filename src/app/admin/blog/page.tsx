import type { Metadata } from "next";
import BlogAdminClient from "./BlogAdminClient";

export const metadata: Metadata = {
  title: "Blog Management | SOCIAL VIENS Admin",
  description:
    "Create, edit, publish, and delete blog posts for the Social Viens website.",
  robots: { index: false, follow: false },
};

export default function AdminBlogPage() {
  return <BlogAdminClient />;
}
