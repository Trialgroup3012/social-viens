"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Loader2,
  Quote,
  Star,
  RefreshCw,
  Save,
  Video,
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

const TESTIMONIAL_INDUSTRIES = [
  "Real Estate",
  "Healthcare",
  "Law",
  "E-commerce",
  "Restaurant",
  "Beauty",
  "Fitness",
  "Education",
  "Startups & SaaS",
  "Events",
  "Other",
];

interface Testimonial {
  id: string;
  name: string;
  business?: string | null;
  company?: string | null;
  industry: string;
  role?: string | null;
  text?: string | null;
  quote?: string | null;
  rating: number;
  results?: string | null;
  result?: string | null;
  image?: string | null;
  avatar?: string | null;
  featured: boolean;
  hasVideo: boolean;
  order: number;
}

interface FormState {
  id?: string;
  name: string;
  business: string;
  industry: string;
  role: string;
  rating: number;
  text: string;
  results: string;
  image: string;
  featured: boolean;
  hasVideo: boolean;
  order: number;
}

const EMPTY_FORM: FormState = {
  name: "",
  business: "",
  industry: "Real Estate",
  role: "",
  rating: 5,
  text: "",
  results: "",
  image: "",
  featured: false,
  hasVideo: false,
  order: 0,
};

export default function TestimonialsAdminClient() {
  const router = useRouter();
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search.trim()) params.set("q", search.trim());
      params.set("limit", "100");
      const res = await fetch(
        `/api/admin/testimonials${
          params.toString() ? `?${params.toString()}` : ""
        }`,
        { cache: "no-store" }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setItems(data.items || []);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to load testimonials";
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

  function openCreate() {
    setForm(EMPTY_FORM);
    setFormOpen(true);
  }

  function openEdit(item: Testimonial) {
    setForm({
      id: item.id,
      name: item.name,
      business: item.business || item.company || "",
      industry: item.industry,
      role: item.role || "",
      rating: item.rating,
      text: item.text || item.quote || "",
      results: item.results || item.result || "",
      image: item.image || item.avatar || "",
      featured: item.featured,
      hasVideo: item.hasVideo,
      order: item.order,
    });
    setFormOpen(true);
  }

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.industry.trim()) {
      toast.error("Name and industry are required.");
      return;
    }
    if (form.rating < 1 || form.rating > 5) {
      toast.error("Rating must be between 1 and 5.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        business: form.business.trim(),
        industry: form.industry.trim(),
        role: form.role.trim(),
        rating: form.rating,
        text: form.text.trim(),
        results: form.results.trim(),
        image: form.image.trim(),
        featured: form.featured,
        hasVideo: form.hasVideo,
        order: form.order,
      };

      const isEdit = !!form.id;
      const url = isEdit
        ? `/api/admin/testimonials/${form.id}`
        : `/api/admin/testimonials`;
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

      const saved: Testimonial = await res.json();
      toast.success(
        isEdit ? "Testimonial updated" : "Testimonial created"
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
      const msg = e instanceof Error ? e.message : "Failed to save testimonial";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeletingId(deleteTarget.id);
    try {
      const res = await fetch(`/api/admin/testimonials/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `HTTP ${res.status}`);
      }
      toast.success(`Deleted testimonial from ${deleteTarget.name}`);
      setItems((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      setDeleteTarget(null);
      router.refresh();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to delete testimonial";
      toast.error(msg);
    } finally {
      setDeletingId(null);
    }
  }

  function renderStars(rating: number) {
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`size-3.5 ${
              i < rating
                ? "fill-amber-400 text-amber-400"
                : "fill-muted text-muted-foreground"
            }`}
          />
        ))}
        <span className="ml-1 text-xs text-muted-foreground">{rating}/5</span>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground">Testimonials</h1>
          <p className="text-sm text-muted-foreground">
            Manage client testimonials shown across the website.
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
            New Testimonial
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, business, or industry..."
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
            <span>Testimonials ({items.length})</span>
            {loading && (
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            )}
          </CardTitle>
          <CardDescription>
            Click edit to modify a testimonial, or delete to remove it
            permanently.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-[70vh] overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-muted/50 backdrop-blur">
                <TableRow>
                  <TableHead className="min-w-[200px]">Name</TableHead>
                  <TableHead>Business</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading && items.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-32 text-center">
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Loader2 className="size-5 animate-spin" />
                        Loading testimonials...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : items.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-32 text-center">
                      <div className="flex flex-col items-center gap-3 text-muted-foreground">
                        <Quote className="size-8 opacity-50" />
                        <div>
                          <p className="font-medium text-foreground">
                            No testimonials yet
                          </p>
                          <p className="text-sm">
                            Add your first testimonial to get started.
                          </p>
                        </div>
                        <Button size="sm" onClick={openCreate}>
                          <Plus className="size-4" />
                          New Testimonial
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEdit(item)}
                            className="font-medium text-foreground hover:text-primary hover:underline"
                          >
                            {item.name}
                          </button>
                          {item.hasVideo && (
                            <Badge
                              variant="outline"
                              className="border-primary/30 bg-primary/5 text-primary"
                            >
                              <Video className="size-3" />
                              Video
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {item.business || item.company || "—"}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.industry}</Badge>
                      </TableCell>
                      <TableCell>{renderStars(item.rating)}</TableCell>
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
              {form.id ? "Edit Testimonial" : "New Testimonial"}
            </DialogTitle>
            <DialogDescription>
              {form.id
                ? "Update the testimonial details."
                : "Add a new client testimonial."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="t-name">
                  Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="t-name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Rajesh Sharma"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="t-business">Business</Label>
                <Input
                  id="t-business"
                  value={form.business}
                  onChange={(e) => update("business", e.target.value)}
                  placeholder="Luxe Residences"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="t-industry">
                  Industry <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={form.industry}
                  onValueChange={(v) => update("industry", v)}
                >
                  <SelectTrigger id="t-industry" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TESTIMONIAL_INDUSTRIES.map((ind) => (
                      <SelectItem key={ind} value={ind}>
                        {ind}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="t-role">Role / Title</Label>
                <Input
                  id="t-role"
                  value={form.role}
                  onChange={(e) => update("role", e.target.value)}
                  placeholder="Founder & CEO"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="t-rating">Rating</Label>
                <Select
                  value={String(form.rating)}
                  onValueChange={(v) => update("rating", Number(v))}
                >
                  <SelectTrigger id="t-rating" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 4, 3, 2, 1].map((r) => (
                      <SelectItem key={r} value={String(r)}>
                        {r} {r === 1 ? "Star" : "Stars"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="t-order">Display Order</Label>
                <Input
                  id="t-order"
                  type="number"
                  value={form.order}
                  onChange={(e) =>
                    update("order", Number(e.target.value) || 0)
                  }
                  min={0}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="t-text">Testimonial Text</Label>
              <Textarea
                id="t-text"
                value={form.text}
                onChange={(e) => update("text", e.target.value)}
                placeholder="Social Viens transformed our digital presence completely..."
                rows={5}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="t-results">Results (metric chip)</Label>
              <Input
                id="t-results"
                value={form.results}
                onChange={(e) => update("results", e.target.value)}
                placeholder="+180% Lead Growth"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="t-image">Avatar / Image URL</Label>
              <Input
                id="t-image"
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

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-2 rounded-md border p-3">
                <Checkbox
                  id="t-featured"
                  checked={form.featured}
                  onCheckedChange={(v) => update("featured", Boolean(v))}
                />
                <Label
                  htmlFor="t-featured"
                  className="cursor-pointer text-sm font-medium"
                >
                  Featured (highlight on testimonials section)
                </Label>
              </div>
              <div className="flex items-center gap-2 rounded-md border p-3">
                <Checkbox
                  id="t-hasVideo"
                  checked={form.hasVideo}
                  onCheckedChange={(v) => update("hasVideo", Boolean(v))}
                />
                <Label
                  htmlFor="t-hasVideo"
                  className="cursor-pointer text-sm font-medium"
                >
                  Has video (show play button overlay)
                </Label>
              </div>
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
                {form.id ? "Save Changes" : "Create Testimonial"}
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
            <DialogTitle>Delete this testimonial?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. The testimonial from{" "}
              <span className="font-medium text-foreground">
                {deleteTarget?.name}
              </span>{" "}
              will be permanently removed.
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
