import type { Metadata } from "next";
import BlogFormClient from "../../BlogFormClient";

export const metadata: Metadata = {
  title: "Edit Blog Post | SOCIAL VIENS Admin",
  description: "Update an existing blog post.",
  robots: { index: false, follow: false },
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminBlogEditPage({ params }: PageProps) {
  const { id } = await params;
  return <BlogFormClient mode="edit" postId={id} />;
}
