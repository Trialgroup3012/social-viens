import { NextRequest, NextResponse } from "next/server";
import {
  getPublishedPosts,
  getPostsByCategory,
  getBlogCategories,
} from "@/lib/safe-db";

// Force Node.js runtime — these routes use Prisma (not Edge-compatible).
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q"); // search query
  const category = searchParams.get("category");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  // Guard against malformed pagination input.
  const safePage = Number.isFinite(page) && page > 0 ? page : 1;
  const safeLimit =
    Number.isFinite(limit) && limit > 0 && limit <= 100 ? limit : 10;

  try {
    let posts = category
      ? await getPostsByCategory(category)
      : await getPublishedPosts();

    // Search filter
    if (q) {
      const query = q.toLowerCase();
      posts = posts.filter(
        (p: any) =>
          p.title?.toLowerCase().includes(query) ||
          p.excerpt?.toLowerCase().includes(query) ||
          p.tags?.some?.((tag: string) => tag.toLowerCase().includes(query))
      );
    }

    // Pagination
    const total = posts.length;
    const start = (safePage - 1) * safeLimit;
    const paginatedPosts = posts.slice(start, start + safeLimit);

    const categories = await getBlogCategories();

    return NextResponse.json({
      posts: paginatedPosts,
      total,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.ceil(total / safeLimit),
      categories,
    });
  } catch (error) {
    console.error("[API /blog] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}
