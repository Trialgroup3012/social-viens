"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import {
  ArrowLeft,
  Loader2,
  Save,
  Trash2,
  FileText,
  Eye,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const BLOG_CATEGORIES = [
  "SEO",
  "Social Media",
  "Branding",
  "Web Design",
  "Paid Ads",
  "Content Marketing",
  "Email Marketing",
  "Analytics",
  "Strategy",
];

interface BlogFormClientProps {
  mode: "create" | "edit";
  /** When mode === "edit", the ID of the post to load. */
  postId?: string;
}

interface FormState {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;
  featuredImage: string;
  status: "draft" | "published";
  metaTitle: string;
  metaDescription: string;
  author: string;
  authorRole: string;
  readTime: string;
  featured: boolean;
}

const EMPTY_FORM: FormState = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "SEO",
  tags: "",
  featuredImage: "",
  status: "draft",
  metaTitle: "",
  metaDescription: "",
  author: "",
  authorRole: "",
  readTime: "5 min read",
  featured: false,
};

/** Convert a title into a URL-safe slug. */
function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function BlogFormClient({ mode, postId }: BlogFormClientProps) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [loading, setLoading] = useState(mode === "edit");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [slugEdited, setSlugEdited] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // Load existing post for edit mode.
  useEffect(() => {
    if (mode !== "edit" || !postId) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/blog/${postId}`, {
          cache: "no-store",
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || `HTTP ${res.status}`);
        }
        const data = await res.json();
        if (cancelled) return;
        setForm({
          title: data.title || "",
          slug: data.slug || "",
          excerpt: data.excerpt || "",
          content: data.content || "",
          category: data.category || "SEO",
          tags: Array.isArray(data.tags) ? data.tags.join(", ") : "",
          featuredImage: data.featuredImage || "",
          status: data.status === "published" ? "published" : "draft",
          metaTitle: data.metaTitle || "",
          metaDescription: data.metaDescription || "",
          author: data.author || "",
          authorRole: data.authorRole || "",
          readTime: data.readTime || "5 min read",
          featured: Boolean(data.featured),
        });
        setSlugEdited(true); // Don't overwrite the existing slug.
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Failed to load post";
        toast.error(msg);
        router.push("/admin/blog");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [mode, postId, router]);

  // Auto-generate slug from title (only if user hasn't manually edited it).
  useEffect(() => {
    if (slugEdited) return;
    setForm((prev) => ({ ...prev, slug: slugify(prev.title) }));
  }, [form.title, slugEdited]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const canSubmit = useMemo(() => {
    return (
      form.title.trim().length > 0 &&
      form.slug.trim().length > 0 &&
      form.content.trim().length > 0 &&
      form.category.trim().length > 0 &&
      !saving
    );
  }, [form.title, form.slug, form.content, form.category, saving]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: form.title.trim(),
        slug: form.slug.trim(),
        excerpt: form.excerpt.trim(),
        content: form.content,
        category: form.category.trim(),
        tags: form.tags,
        featuredImage: form.featuredImage.trim(),
        status: form.status,
        metaTitle: form.metaTitle.trim(),
        metaDescription: form.metaDescription.trim(),
        author: form.author.trim(),
        authorRole: form.authorRole.trim(),
        readTime: form.readTime.trim(),
        featured: form.featured,
      };

      const url =
        mode === "edit" && postId
          ? `/api/admin/blog/${postId}`
          : `/api/admin/blog`;
      const method = mode === "edit" ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `HTTP ${res.status}`);
      }

      toast.success(
        mode === "edit"
          ? "Blog post updated successfully"
          : "Blog post created successfully"
      );
      router.push("/admin/blog");
      router.refresh();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to save post";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (mode !== "edit" || !postId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/blog/${postId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `HTTP ${res.status}`);
      }
      toast.success("Blog post deleted");
      router.push("/admin/blog");
      router.refresh();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to delete post";
      toast.error(msg);
    } finally {
      setDeleting(false);
      setDeleteOpen(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <Button asChild variant="ghost" size="sm" className="-ml-2 w-fit">
            <Link href="/admin/blog">
              <ArrowLeft className="size-4" />
              Back to Blog
            </Link>
          </Button>
          <h1 className="text-2xl font-bold text-foreground">
            {mode === "edit" ? "Edit Blog Post" : "New Blog Post"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {mode === "edit"
              ? "Update the content, metadata, and publish settings."
              : "Fill in the details below to create a new post."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant={form.status === "published" ? "default" : "secondary"}
            className="gap-1"
          >
            {form.status === "published" ? (
              <Eye className="size-3" />
            ) : (
              <FileText className="size-3" />
            )}
            {form.status === "published" ? "Published" : "Draft"}
          </Badge>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main content */}
        <Card>
          <CardHeader>
            <CardTitle>Content</CardTitle>
            <CardDescription>The core fields for this blog post.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="10 Local SEO Strategies for Delhi Businesses"
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="slug">
                  Slug <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="slug"
                  value={form.slug}
                  onChange={(e) => {
                    setSlugEdited(true);
                    update("slug", e.target.value);
                  }}
                  placeholder="10-local-seo-strategies-delhi"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  URL: /blog/{form.slug || "your-slug"}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">
                  Category <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => update("category", v)}
                >
                  <SelectTrigger id="category" className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {BLOG_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={form.excerpt}
                onChange={(e) => update("excerpt", e.target.value)}
                placeholder="A short summary shown on the blog listing and in search results."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">
                Content <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="content"
                value={form.content}
                onChange={(e) => update("content", e.target.value)}
                placeholder="Write your full post content here. HTML is supported."
                rows={12}
                className="font-mono text-sm"
                required
              />
              <p className="text-xs text-muted-foreground">
                {form.content.length.toLocaleString()} characters · HTML tags
                supported (h2, p, ul, li, a, strong, em)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={form.tags}
                onChange={(e) => update("tags", e.target.value)}
                placeholder="Local SEO, Delhi, Map Pack, Reviews"
              />
              <p className="text-xs text-muted-foreground">
                Comma-separated list of tags.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Media + Author */}
        <Card>
          <CardHeader>
            <CardTitle>Media & Author</CardTitle>
            <CardDescription>
              Featured image, author info, and reading time.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="featuredImage">Featured Image URL</Label>
              <Input
                id="featuredImage"
                value={form.featuredImage}
                onChange={(e) => update("featuredImage", e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
              />
              {form.featuredImage && (
                <div className="mt-2 overflow-hidden rounded-md border">
                  { }
                  <img
                    src={form.featuredImage}
                    alt="Featured preview"
                    className="h-32 w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="author">Author Name</Label>
                <Input
                  id="author"
                  value={form.author}
                  onChange={(e) => update("author", e.target.value)}
                  placeholder="Priya Sharma"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="authorRole">Author Role</Label>
                <Input
                  id="authorRole"
                  value={form.authorRole}
                  onChange={(e) => update("authorRole", e.target.value)}
                  placeholder="Head of SEO, Social Viens"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="readTime">Read Time</Label>
              <Input
                id="readTime"
                value={form.readTime}
                onChange={(e) => update("readTime", e.target.value)}
                placeholder="5 min read"
              />
            </div>
          </CardContent>
        </Card>

        {/* SEO + Publish */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              SEO & Publish Settings
            </CardTitle>
            <CardDescription>
              Control how this post appears in search engines and on the site.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={form.status}
                onValueChange={(v) =>
                  update("status", v as "draft" | "published")
                }
              >
                <SelectTrigger id="status" className="w-full sm:w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft (not visible)</SelectItem>
                  <SelectItem value="published">
                    Published (live on site)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 rounded-md border p-3">
              <input
                id="featured"
                type="checkbox"
                checked={form.featured}
                onChange={(e) => update("featured", e.target.checked)}
                className="size-4 rounded border-border"
              />
              <Label
                htmlFor="featured"
                className="cursor-pointer text-sm font-medium"
              >
                Featured post (highlight on blog listing)
              </Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="metaTitle">Meta Title</Label>
              <Input
                id="metaTitle"
                value={form.metaTitle}
                onChange={(e) => update("metaTitle", e.target.value)}
                placeholder="SEO title for search engines (defaults to post title)"
              />
              <p className="text-xs text-muted-foreground">
                {form.metaTitle.length}/60 characters recommended
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="metaDescription">Meta Description</Label>
              <Textarea
                id="metaDescription"
                value={form.metaDescription}
                onChange={(e) => update("metaDescription", e.target.value)}
                placeholder="SEO description shown in search results."
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                {form.metaDescription.length}/160 characters recommended
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button asChild variant="outline" type="button">
            <Link href="/admin/blog">Cancel</Link>
          </Button>

          <div className="flex items-center gap-2">
            {mode === "edit" && (
              <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    variant="destructive"
                    disabled={deleting}
                  >
                    {deleting ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Trash2 className="size-4" />
                    )}
                    Delete
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete this blog post?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. The post &quot;
                      {form.title}&quot; will be permanently removed.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                      variant="destructive"
                      onClick={handleDelete}
                      disabled={deleting}
                    >
                      {deleting ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Trash2 className="size-4" />
                      )}
                      Delete Permanently
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}

            <Button type="submit" disabled={!canSubmit}>
              {saving ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Save className="size-4" />
              )}
              {mode === "edit" ? "Save Changes" : "Create Post"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
