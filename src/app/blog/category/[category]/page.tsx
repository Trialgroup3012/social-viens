import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogCategoryClient from "./BlogCategoryClient";
import {
  slugifyCategory,
  deslugifyCategory,
  categoryDescriptions,
  getPostCountForCategory,
} from "./category-utils";
import { getAllCategories } from "@/lib/blog-data";

export function generateStaticParams() {
  return getAllCategories().map((cat) => ({
    category: slugifyCategory(cat),
  }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  return (async () => {
    const { category: slug } = await params;
    const category = deslugifyCategory(slug);
    if (!category) {
      return {
        title: "Category Not Found | SOCIAL VIENS",
      };
    }
    const count = getPostCountForCategory(category);
    return {
      title: `${category} Articles | SOCIAL VIENS Blog`,
      description: `${categoryDescriptions[category]} ${count} ${count === 1 ? "article" : "articles"} in this category.`,
      keywords: [
        category.toLowerCase(),
        "digital marketing blog",
        "growth marketing",
        category.toLowerCase() + " strategies",
      ],
      openGraph: {
        title: `${category} Articles | SOCIAL VIENS Blog`,
        description: `${count} ${count === 1 ? "article" : "articles"} on ${category}. ${categoryDescriptions[category]}`,
        type: "website",
        locale: "en_IN",
      },
    };
  })();
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = deslugifyCategory(slug);
  if (!category) {
    notFound();
  }
  return <BlogCategoryClient categorySlug={slug} category={category} />;
}
