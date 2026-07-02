"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Loader2,
  Briefcase,
  Star,
  RefreshCw,
  Save,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PORTFOLIO_CATEGORIES = [
  "Website",
  "SEO",
  "Social Media",
  "Branding",
  "Paid Ads",
  "Content",
  "Other",
];

interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  client: string;
  category: string;
  description: string;
  results?: string | null;
  image?: string | null;
  featured: boolean;
  order: number;
  services?: string[];
}

interface FormState {
  id?: string;
  title: string;
  slug: string;
  client: string;
  category: string;
  description: string;
  results: string;
  image: string;
  featured: boolean;
  order: number;
}

const EMPTY_FORM: FormState = {
  title: "",
  slug: "",
  client: "",
  category: "Website",
  description: "",
  results: "",
  image: "",
  featured: false,
  order: 0,
};

/** Generate a URL-safe slug from a string. */
function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function PortfolioAdminClient() {
  const router = useRouter();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [slugEdited, setSlugEdited] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<PortfolioItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search.trim()) params.set("q", search.trim());
      params.set("limit", "100");
      const res = await fetch(
        `/api/admin/portfolio${params.toString() ? `?${params.toString()}` : ""}`,
        { cache: "no-store" }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setItems(data.items || []);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to load items";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchItems();
     
  }, []);

  useEffect(() => {
    const t = setTimeout(() => fetchItems(), 300);
    return () => clearTimeout(t);
     
  }, [search]);

  // Auto-generate slug from title when creating.
  useEffect(() => {
    if (slugEdited || form.id) return;
    setForm((prev) => ({ ...prev, slug: slugify(prev.title) }));
  }, [form.title, slugEdited, form.id]);

  function openCreate() {
    setForm(EMPTY_FORM);
    setSlugEdited(false);
    setFormOpen(true);
  }

  function openEdit(item: PortfolioItem) {
    setForm({
      id: item.id,
      title: item.title,
      slug: item.slug,
      client: item.client,
      category: item.category,
      description: item.description,
      results: item.results || "",
      image: item.image || "",
      featured: item.featured,
      order: item.order,
    });
    setSlugEdited(true);
    setFormOpen(true);
  }

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.client.trim() || !form.description.trim()) {
      toast.error("Title, client, and description are required.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: form.title.trim(),
        slug: form.slug.trim() || slugify(form.title),
        client: form.client.trim(),
        category: form.category.trim(),
        description: form.description.trim(),
        results: form.results.trim(),
        image: form.image.trim(),
        featured: form.featured,
        order: form.order,
      };

      const isEdit = !!form.id;
      const url = isEdit
        ? `/api/admin/portfolio/${form.id}`
        : `/api/admin/portfolio`;
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `HTTP ${res.status}`);
      }

      const saved: PortfolioItem = await res.json();
      toast.success(
        isEdit ? "Portfolio item updated" : "Portfolio item created"
      );

      setItems((prev) => {
        if (isEdit) {
          return prev.map((p) => (p.id === saved.id ? saved : p));
        }
        return [...prev, saved];
      });
      setFormOpen(false);
      router.refresh();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to save item";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeletingId(deleteTarget.id);
    try {
      const res = await fetch(`/api/admin/portfolio/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `HTTP ${res.status}`);
      }
      toast.success(`Deleted "${deleteTarget.title}"`);
      setItems((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      setDeleteTarget(null);
      router.refresh();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to delete item";
      toast.error(msg);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground">Portfolio</h1>
          <p className="text-sm text-muted-foreground">
            Manage case studies and project highlights shown on the website.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchItems}
            disabled={loading}
          >
            <RefreshCw
              className={`size-4 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button size="sm" onClick={openCreate}>
            <Plus className="size-4" />
            New Item
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by title, client, or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Items ({items.length})</span>
            {loading && (
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            )}
          </CardTitle>
          <CardDescription>
            Click edit to modify an item, or delete to remove it permanently.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-[70vh] overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-muted/50 backdrop-blur">
                <TableRow>
                  <TableHead className="min-w-[260px]">Title</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading && items.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center">
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Loader2 className="size-5 animate-spin" />
                        Loading items...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : items.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center">
                      <div className="flex flex-col items-center gap-3 text-muted-foreground">
                        <Briefcase className="size-8 opacity-50" />
                        <div>
                          <p className="font-medium text-foreground">
                            No portfolio items yet
                          </p>
                          <p className="text-sm">
                            Add your first case study to get started.
                          </p>
                        </div>
                        <Button size="sm" onClick={openCreate}>
                          <Plus className="size-4" />
                          New Item
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex flex-col gap-0.5">
                          <button
                            onClick={() => openEdit(item)}
                            className="text-left font-medium text-foreground hover:text-primary hover:underline"
                          >
                            {item.title}
                          </button>
                          <span className="text-xs text-muted-foreground">
                            /portfolio/{item.slug}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {item.client}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.category}</Badge>
                      </TableCell>
                      <TableCell>
                        {item.featured ? (
                          <Badge
                            variant="outline"
                            className="border-primary/30 bg-primary/10 text-primary"
                          >
                            <Star className="size-3" />
                            Featured
                          </Badge>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {item.order}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEdit(item)}
                          >
                            <Pencil className="size-3.5" />
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeleteTarget(item)}
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="size-3.5" />
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {form.id ? "Edit Portfolio Item" : "New Portfolio Item"}
            </DialogTitle>
            <DialogDescription>
              {form.id
                ? "Update the details for this case study."
                : "Add a new case study to your portfolio."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="p-title">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="p-title"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="Luxury Real Estate Portal"
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="p-slug">Slug</Label>
                <Input
                  id="p-slug"
                  value={form.slug}
                  onChange={(e) => {
                    setSlugEdited(true);
                    update("slug", e.target.value);
                  }}
                  placeholder="luxury-real-estate-portal"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="p-client">
                  Client <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="p-client"
                  value={form.client}
                  onChange={(e) => update("client", e.target.value)}
                  placeholder="Aurum Estates"
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="p-category">
                  Category <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => update("category", v)}
                >
                  <SelectTrigger id="p-category" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PORTFOLIO_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="p-order">Display Order</Label>
                <Input
                  id="p-order"
                  type="number"
                  value={form.order}
                  onChange={(e) =>
                    update("order", Number(e.target.value) || 0)
                  }
                  min={0}
                />
                <p className="text-xs text-muted-foreground">
                  Lower numbers appear first.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="p-description">
                Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="p-description"
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="Editorial property portal with cinematic listings & map search."
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="p-results">Results (metric chip)</Label>
              <Input
                id="p-results"
                value={form.results}
                onChange={(e) => update("results", e.target.value)}
                placeholder="+180% Lead Gen"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="p-image">Image URL</Label>
              <Input
                id="p-image"
                value={form.image}
                onChange={(e) => update("image", e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
              />
              {form.image && (
                <div className="mt-2 overflow-hidden rounded-md border">
                  { }
                  <img
                    src={form.image}
                    alt="Preview"
                    className="h-24 w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 rounded-md border p-3">
              <Checkbox
                id="p-featured"
                checked={form.featured}
                onCheckedChange={(v) => update("featured", Boolean(v))}
              />
              <Label
                htmlFor="p-featured"
                className="cursor-pointer text-sm font-medium"
              >
                Featured (highlight on portfolio section)
              </Label>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Save className="size-4" />
                )}
                {form.id ? "Save Changes" : "Create Item"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete this portfolio item?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. &quot;
              <span className="font-medium text-foreground">
                {deleteTarget?.title}
              </span>
              &quot; will be permanently removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deletingId === deleteTarget?.id}
            >
              {deletingId === deleteTarget?.id ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Trash2 className="size-4" />
              )}
              Delete Permanently
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
