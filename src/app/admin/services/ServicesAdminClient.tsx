"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  Plus,
  Pencil,
  Trash2,
  RefreshCw,
  Loader2,
  Star,
  GripVertical,
  Hash,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Service = {
  id: string;
  title: string;
  slug: string;
  icon: string;
  description: string;
  shortDescription: string | null;
  longDescription: string | null;
  benefits: string; // JSON string[]
  results: string;
  startingPrice: string | null;
  popular: boolean;
  features: string | null;
  process: string | null;
  faqs: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
};

type FormState = {
  title: string;
  slug: string;
  icon: string;
  description: string;
  shortDescription: string;
  longDescription: string;
  benefits: string;
  results: string;
  startingPrice: string;
  popular: boolean;
  features: string;
  process: string;
  faqs: string;
  order: string;
};

const EMPTY_FORM: FormState = {
  title: "",
  slug: "",
  icon: "Globe",
  description: "",
  shortDescription: "",
  longDescription: "",
  benefits: "",
  results: "",
  startingPrice: "",
  popular: false,
  features: "",
  process: "",
  faqs: "",
  order: "0",
};

function parseStringList(raw: string): string[] {
  try {
    const arr = JSON.parse(raw);
    if (Array.isArray(arr)) return arr.filter((x) => typeof x === "string");
  } catch {
    // not JSON
  }
  return [];
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function ServicesAdminClient() {
  const [services, setServices] = React.useState<Service[]>([]);
  const [loading, setLoading] = React.useState(false);

  const [formOpen, setFormOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Service | null>(null);
  const [form, setForm] = React.useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = React.useState(false);

  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [deleteTarget, setDeleteTarget] = React.useState<Service | null>(null);
  const [deleting, setDeleting] = React.useState(false);

  const fetchServices = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/services", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load services");
      const data = await res.json();
      setServices(data.services || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    void fetchServices();
  }, [fetchServices]);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setFormOpen(true);
  };

  const openEdit = (svc: Service) => {
    setEditing(svc);
    setForm({
      title: svc.title,
      slug: svc.slug,
      icon: svc.icon,
      description: svc.description,
      shortDescription: svc.shortDescription || "",
      longDescription: svc.longDescription || "",
      benefits: parseStringList(svc.benefits).join("\n"),
      results: svc.results,
      startingPrice: svc.startingPrice || "",
      popular: svc.popular,
      features: svc.features || "",
      process: svc.process || "",
      faqs: svc.faqs || "",
      order: String(svc.order),
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
    if (!form.description.trim()) {
      toast.error("Description is required");
      return;
    }
    if (!form.icon.trim()) {
      toast.error("Icon name is required");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: form.title.trim(),
        slug: form.slug.trim(),
        icon: form.icon.trim(),
        description: form.description.trim(),
        shortDescription: form.shortDescription.trim(),
        longDescription: form.longDescription.trim(),
        benefits: form.benefits,
        results: form.results.trim(),
        startingPrice: form.startingPrice.trim(),
        popular: form.popular,
        features: form.features.trim(),
        process: form.process.trim(),
        faqs: form.faqs.trim(),
        order: Number(form.order) || 0,
      };

      const url = editing
        ? `/api/admin/services/${editing.id}`
        : "/api/admin/services";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to save service");
      }
      const data = await res.json();
      toast.success(editing ? "Service updated" : "Service created");
      if (editing) {
        setServices((prev) =>
          prev.map((s) => (s.id === editing.id ? { ...s, ...data.service } : s))
        );
      } else {
        setServices((prev) => [...prev, data.service]);
      }
      setFormOpen(false);
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const openDelete = (svc: Service) => {
    setDeleteTarget(svc);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/services/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to delete service");
      }
      toast.success("Service deleted");
      setServices((prev) => prev.filter((s) => s.id !== deleteTarget.id));
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
            Services
          </h1>
          <p className="text-sm text-muted-foreground">
            {services.length} service{services.length === 1 ? "" : "s"} configured
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => void fetchServices()} disabled={loading}>
            <RefreshCw className={loading ? "animate-spin" : ""} />
            Refresh
          </Button>
          <Button size="sm" onClick={openCreate}>
            <Plus className="size-4" />
            New Service
          </Button>
        </div>
      </div>

      <Card className="premium-card">
        <CardHeader>
          <CardTitle>All Services</CardTitle>
          <CardDescription>
            Manage the services shown on the public Services page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-h-[600px] overflow-y-auto rounded-md border">
            <Table>
              <TableHeader className="sticky top-0 z-10">
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Icon</TableHead>
                  <TableHead>Popular</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading && services.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-10 text-center">
                      <Loader2 className="text-muted-foreground mx-auto size-5 animate-spin" />
                    </TableCell>
                  </TableRow>
                ) : services.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                      No services yet. Click “New Service” to create one.
                    </TableCell>
                  </TableRow>
                ) : (
                  services.map((svc) => (
                    <TableRow key={svc.id}>
                      <TableCell className="font-medium">
                        {svc.title}
                        <div className="text-muted-foreground text-xs max-w-md truncate">
                          {svc.shortDescription || svc.description}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        <span className="inline-flex items-center gap-1 font-mono text-xs">
                          <Hash className="size-3" /> {svc.slug}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground font-mono text-xs">
                        {svc.icon}
                      </TableCell>
                      <TableCell>
                        {svc.popular ? (
                          <Badge className="bg-primary/15 text-primary border-primary/30">
                            <Star className="size-3" /> Popular
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground text-xs">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <GripVertical className="size-3" /> {svc.order}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEdit(svc)}
                            aria-label="Edit service"
                          >
                            <Pencil className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDelete(svc)}
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                            aria-label="Delete service"
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
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Service" : "New Service"}</DialogTitle>
            <DialogDescription>
              {editing
                ? "Update the details of this service."
                : "Fill in the details to create a new service offering."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="svc-title">Title *</Label>
              <Input
                id="svc-title"
                placeholder="e.g. SEO Services"
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
              <Label htmlFor="svc-slug">Slug *</Label>
              <Input
                id="svc-slug"
                placeholder="seo-services"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
              />
              <p className="text-muted-foreground text-xs">
                Used in the URL: /services/&lt;slug&gt;
              </p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="svc-icon">Icon (Lucide name) *</Label>
              <Input
                id="svc-icon"
                placeholder="e.g. Globe, Search, Megaphone"
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
              />
              <p className="text-muted-foreground text-xs">
                A Lucide icon name. See <span className="font-mono">lucide.dev/icons</span>.
              </p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="svc-price">Starting Price</Label>
              <Input
                id="svc-price"
                placeholder="e.g. ₹15,000/month"
                value={form.startingPrice}
                onChange={(e) => setForm({ ...form, startingPrice: e.target.value })}
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="svc-desc">Description *</Label>
              <Textarea
                id="svc-desc"
                placeholder="Main description shown on the service card"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={2}
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="svc-short">Short Description</Label>
              <Input
                id="svc-short"
                placeholder="One-line summary"
                value={form.shortDescription}
                onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="svc-long">Long Description</Label>
              <Textarea
                id="svc-long"
                placeholder="Detailed description shown on the service detail page"
                value={form.longDescription}
                onChange={(e) => setForm({ ...form, longDescription: e.target.value })}
                rows={4}
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="svc-benefits">Benefits</Label>
              <Textarea
                id="svc-benefits"
                placeholder={"One benefit per line (or comma-separated)\ne.g.\nIncreased organic traffic\nHigher search rankings"}
                value={form.benefits}
                onChange={(e) => setForm({ ...form, benefits: e.target.value })}
                rows={5}
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="svc-results">Results</Label>
              <Input
                id="svc-results"
                placeholder="e.g. 3x traffic growth in 6 months"
                value={form.results}
                onChange={(e) => setForm({ ...form, results: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="svc-order">Order</Label>
              <Input
                id="svc-order"
                type="number"
                placeholder="0"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: e.target.value })}
              />
              <p className="text-muted-foreground text-xs">
                Lower numbers appear first.
              </p>
            </div>
            <div className="flex items-end pb-1">
              <Label className="flex cursor-pointer items-center gap-2">
                <Checkbox
                  checked={form.popular}
                  onCheckedChange={(v) => setForm({ ...form, popular: v === true })}
                />
                <span className="flex items-center gap-1 text-sm">
                  <Star className="size-3.5 text-primary" /> Mark as Popular
                </span>
              </Label>
            </div>
            <div className="space-y-1.5 md:col-span-2 rounded-md border border-amber-200 bg-amber-50/50 p-3">
              <Label htmlFor="svc-features" className="text-xs">
                Advanced: Features (one JSON object per line)
              </Label>
              <Textarea
                id="svc-features"
                placeholder={'{"title":"...","description":"..."}'}
                value={form.features}
                onChange={(e) => setForm({ ...form, features: e.target.value })}
                rows={3}
                className="font-mono text-xs"
              />
              <p className="text-muted-foreground text-xs">
                Optional. Each line must be a valid JSON object with{" "}
                <code>title</code> and <code>description</code>.
              </p>
            </div>
            <div className="space-y-1.5 md:col-span-2 rounded-md border border-amber-200 bg-amber-50/50 p-3">
              <Label htmlFor="svc-process" className="text-xs">
                Advanced: Process Steps (one JSON object per line)
              </Label>
              <Textarea
                id="svc-process"
                placeholder={'{"step":"1","title":"...","description":"..."}'}
                value={form.process}
                onChange={(e) => setForm({ ...form, process: e.target.value })}
                rows={3}
                className="font-mono text-xs"
              />
              <p className="text-muted-foreground text-xs">
                Optional. Each line must be a valid JSON object with{" "}
                <code>step</code>, <code>title</code>, <code>description</code>.
              </p>
            </div>
            <div className="space-y-1.5 md:col-span-2 rounded-md border border-amber-200 bg-amber-50/50 p-3">
              <Label htmlFor="svc-faqs" className="text-xs">
                Advanced: FAQs (one JSON object per line)
              </Label>
              <Textarea
                id="svc-faqs"
                placeholder={'{"q":"...","a":"..."}'}
                value={form.faqs}
                onChange={(e) => setForm({ ...form, faqs: e.target.value })}
                rows={3}
                className="font-mono text-xs"
              />
              <p className="text-muted-foreground text-xs">
                Optional. Each line must be a valid JSON object with <code>q</code> and <code>a</code>.
              </p>
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
                editing ? "Save Changes" : "Create Service"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Service</DialogTitle>
            <DialogDescription>
              This action cannot be undone. The service{" "}
              <span className="font-medium text-foreground">
                {deleteTarget?.title}
              </span>{" "}
              will be permanently removed.
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
                  Delete Service
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
