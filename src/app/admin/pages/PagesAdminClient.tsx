"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  Plus,
  Pencil,
  Trash2,
  RefreshCw,
  Loader2,
  FileText,
  Hash,
  Eye,
  EyeOff,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type PageContent = {
  id: string;
  title: string;
  slug: string;
  content: string;
  metaTitle: string | null;
  metaDescription: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type FormState = {
  title: string;
  slug: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  status: string;
};

const EMPTY_FORM: FormState = {
  title: "",
  slug: "",
  content: "",
  metaTitle: "",
  metaDescription: "",
  status: "published",
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default function PagesAdminClient() {
  const [pages, setPages] = React.useState<PageContent[]>([]);
  const [loading, setLoading] = React.useState(false);

  const [formOpen, setFormOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<PageContent | null>(null);
  const [form, setForm] = React.useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = React.useState(false);

  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [deleteTarget, setDeleteTarget] = React.useState<PageContent | null>(null);
  const [deleting, setDeleting] = React.useState(false);

  const fetchPages = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/pages", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load pages");
      const data = await res.json();
      setPages(data.pages || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load pages");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    void fetchPages();
  }, [fetchPages]);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setFormOpen(true);
  };

  const openEdit = (page: PageContent) => {
    setEditing(page);
    setForm({
      title: page.title,
      slug: page.slug,
      content: page.content,
      metaTitle: page.metaTitle || "",
      metaDescription: page.metaDescription || "",
      status: page.status,
    });
    setFormOpen(true);
  };

  const submit = async () => {
    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!form.slug.trim()) {
      toast.error("Slug is required");
      return;
    }
    if (!form.content.trim()) {
      toast.error("Content is required");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        title: form.title.trim(),
        slug: form.slug.trim(),
        content: form.content,
        metaTitle: form.metaTitle.trim(),
        metaDescription: form.metaDescription.trim(),
        status: form.status,
      };

      const url = editing
        ? `/api/admin/pages/${editing.id}`
        : "/api/admin/pages";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to save page");
      }
      const data = await res.json();
      toast.success(editing ? "Page updated" : "Page created");
      if (editing) {
        setPages((prev) =>
          prev.map((p) => (p.id === editing.id ? { ...p, ...data.page } : p))
        );
      } else {
        setPages((prev) => [data.page, ...prev]);
      }
      setFormOpen(false);
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const openDelete = (page: PageContent) => {
    setDeleteTarget(page);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/pages/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to delete page");
      }
      toast.success("Page deleted");
      setPages((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      setDeleteOpen(false);
      setDeleteTarget(null);
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Failed to delete");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            Pages
          </h1>
          <p className="text-sm text-muted-foreground">
            {pages.length} page{pages.length === 1 ? "" : "s"} configured
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => void fetchPages()} disabled={loading}>
            <RefreshCw className={loading ? "animate-spin" : ""} />
            Refresh
          </Button>
          <Button size="sm" onClick={openCreate}>
            <Plus className="size-4" />
            New Page
          </Button>
        </div>
      </div>

      <Card className="premium-card">
        <CardHeader>
          <CardTitle>All Pages</CardTitle>
          <CardDescription>
            Manage custom pages with editable HTML or markdown content.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-h-[600px] overflow-y-auto rounded-md border">
            <Table>
              <TableHeader className="sticky top-0 z-10">
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading && pages.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-10 text-center">
                      <Loader2 className="text-muted-foreground mx-auto size-5 animate-spin" />
                    </TableCell>
                  </TableRow>
                ) : pages.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                      No pages yet. Click “New Page” to create one.
                    </TableCell>
                  </TableRow>
                ) : (
                  pages.map((page) => (
                    <TableRow key={page.id}>
                      <TableCell className="font-medium">
                        <span className="flex items-center gap-2">
                          <FileText className="text-muted-foreground size-4" />
                          {page.title}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        <span className="inline-flex items-center gap-1 font-mono text-xs">
                          <Hash className="size-3" /> {page.slug}
                        </span>
                      </TableCell>
                      <TableCell>
                        {page.status === "published" ? (
                          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                            <Eye className="size-3" /> Published
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-muted text-muted-foreground">
                            <EyeOff className="size-3" /> Draft
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-xs">
                        {formatDate(page.updatedAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEdit(page)}
                            aria-label="Edit page"
                          >
                            <Pencil className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDelete(page)}
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                            aria-label="Delete page"
                          >
                            <Trash2 className="size-4" />
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

      {/* Create / Edit Dialog */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Page" : "New Page"}</DialogTitle>
            <DialogDescription>
              {editing
                ? "Update the content of this page."
                : "Create a new custom page with HTML or markdown content."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="page-title">Title *</Label>
              <Input
                id="page-title"
                placeholder="e.g. About Us, Privacy Policy"
                value={form.title}
                onChange={(e) => {
                  const v = e.target.value;
                  setForm((prev) => ({
                    ...prev,
                    title: v,
                    slug: editing ? prev.slug : slugify(v),
                  }));
                }}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="page-slug">Slug *</Label>
              <Input
                id="page-slug"
                placeholder="about-us"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
              />
              <p className="text-muted-foreground text-xs">
                Used in the URL.
              </p>
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="page-content">Content *</Label>
              <Textarea
                id="page-content"
                placeholder={"Enter HTML or markdown content here...\n\n<h1>Page Title</h1>\n<p>Your content...</p>"}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                rows={12}
                className="font-mono text-sm"
              />
              <p className="text-muted-foreground text-xs">
                Supports HTML or markdown. Stored as raw text.
              </p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="page-meta-title">Meta Title</Label>
              <Input
                id="page-meta-title"
                placeholder="SEO title (optional)"
                value={form.metaTitle}
                onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="page-status">Status</Label>
              <Select
                value={form.status}
                onValueChange={(v) => setForm({ ...form, status: v })}
              >
                <SelectTrigger id="page-status" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="page-meta-desc">Meta Description</Label>
              <Textarea
                id="page-meta-desc"
                placeholder="SEO meta description (optional)"
                value={form.metaDescription}
                onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
                rows={2}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setFormOpen(false)}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button onClick={() => void submit()} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="animate-spin" />
                  Saving...
                </>
              ) : (
                editing ? "Save Changes" : "Create Page"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Page</DialogTitle>
            <DialogDescription>
              This action cannot be undone. The page{" "}
              <span className="font-medium text-foreground">
                {deleteTarget?.title}
              </span>{" "}
              (/{deleteTarget?.slug}) will be permanently removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteOpen(false)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => void confirmDelete()}
              disabled={deleting}
            >
              {deleting ? (
                <>
                  <Loader2 className="animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="size-4" />
                  Delete Page
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
