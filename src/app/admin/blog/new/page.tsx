import type { Metadata } from "next";
import BlogFormClient from "../BlogFormClient";

export const metadata: Metadata = {
  title: "New Blog Post | SOCIAL VIENS Admin",
  description: "Create a new blog post for the Social Viens website.",
  robots: { index: false, follow: false },
};

export default function AdminBlogNewPage() {
  return <BlogFormClient mode="create" />;
}
