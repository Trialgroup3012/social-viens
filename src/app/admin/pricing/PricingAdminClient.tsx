"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  Plus,
  Pencil,
  Trash2,
  Star,
  RefreshCw,
  Loader2,
  IndianRupee,
  Tag,
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

type PricingPackage = {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string; // JSON-encoded string[]
  highlighted: boolean;
  ctaText: string;
  ctaLink: string;
  order: number;
  createdAt: string;
  updatedAt: string;
};

type FormState = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string; // newline or comma separated
  highlighted: boolean;
  ctaText: string;
  ctaLink: string;
  order: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  price: "",
  period: "month",
  description: "",
  features: "",
  highlighted: false,
  ctaText: "Get Started",
  ctaLink: "/contact",
  order: "0",
};

const PERIOD_OPTIONS = [
  { value: "month", label: "Month" },
  { value: "quarter", label: "Quarter" },
  { value: "year", label: "Year" },
  { value: "one-time", label: "One-time" },
];

function parseFeatures(raw: string): string[] {
  try {
    const arr = JSON.parse(raw);
    if (Array.isArray(arr)) return arr.filter((x) => typeof x === "string");
  } catch {
    // not JSON
  }
  return [];
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN").format(price);
}

export default function PricingAdminClient() {
  const [packages, setPackages] = React.useState<PricingPackage[]>([]);
  const [loading, setLoading] = React.useState(false);

  const [formOpen, setFormOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<PricingPackage | null>(null);
  const [form, setForm] = React.useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = React.useState(false);

  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [deleteTarget, setDeleteTarget] = React.useState<PricingPackage | null>(null);
  const [deleting, setDeleting] = React.useState(false);

  const fetchPackages = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/pricing", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load pricing packages");
      const data = await res.json();
      setPackages(data.packages || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load pricing packages");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    void fetchPackages();
  }, [fetchPackages]);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setFormOpen(true);
  };

  const openEdit = (pkg: PricingPackage) => {
    setEditing(pkg);
    setForm({
      name: pkg.name,
      price: String(pkg.price),
      period: pkg.period,
      description: pkg.description,
      features: parseFeatures(pkg.features).join("\n"),
      highlighted: pkg.highlighted,
      ctaText: pkg.ctaText,
      ctaLink: pkg.ctaLink,
      order: String(pkg.order),
    });
    setFormOpen(true);
  };

  const submit = async () => {
    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!form.price.trim() || isNaN(Number(form.price))) {
      toast.error("Valid price is required");
      return;
    }
    if (!form.description.trim()) {
      toast.error("Description is required");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        price: Number(form.price),
        period: form.period,
        description: form.description.trim(),
        features: form.features,
        highlighted: form.highlighted,
        ctaText: form.ctaText || "Get Started",
        ctaLink: form.ctaLink || "/contact",
        order: Number(form.order) || 0,
      };

      const url = editing
        ? `/api/admin/pricing/${editing.id}`
        : "/api/admin/pricing";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to save package");
      }
      const data = await res.json();
      toast.success(editing ? "Package updated" : "Package created");
      if (editing) {
        setPackages((prev) =>
          prev.map((p) => (p.id === editing.id ? { ...p, ...data.package } : p))
        );
      } else {
        setPackages((prev) => [...prev, data.package]);
      }
      setFormOpen(false);
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const openDelete = (pkg: PricingPackage) => {
    setDeleteTarget(pkg);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/pricing/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to delete package");
      }
      toast.success("Package deleted");
      setPackages((prev) => prev.filter((p) => p.id !== deleteTarget.id));
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
            Pricing Packages
          </h1>
          <p className="text-sm text-muted-foreground">
            {packages.length} package{packages.length === 1 ? "" : "s"} configured
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => void fetchPackages()} disabled={loading}>
            <RefreshCw className={loading ? "animate-spin" : ""} />
            Refresh
          </Button>
          <Button size="sm" onClick={openCreate}>
            <Plus className="size-4" />
            New Package
          </Button>
        </div>
      </div>

      <Card className="premium-card">
        <CardHeader>
          <CardTitle>All Packages</CardTitle>
          <CardDescription>
            Manage the pricing tiers shown on the public Pricing page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-h-[600px] overflow-y-auto rounded-md border">
            <Table>
              <TableHeader className="sticky top-0 z-10">
                <TableRow>
                  <TableHead>Plan</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading && packages.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-10 text-center">
                      <Loader2 className="text-muted-foreground mx-auto size-5 animate-spin" />
                    </TableCell>
                  </TableRow>
                ) : packages.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                      No packages yet. Click “New Package” to create one.
                    </TableCell>
                  </TableRow>
                ) : (
                  packages.map((pkg) => (
                    <TableRow key={pkg.id}>
                      <TableCell className="font-medium">
                        {pkg.name}
                        <div className="text-muted-foreground text-xs max-w-md truncate">
                          {pkg.description}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center font-semibold">
                          <IndianRupee className="size-3" />
                          {formatPrice(pkg.price)}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Tag className="size-3" /> {pkg.period}
                        </span>
                      </TableCell>
                      <TableCell>
                        {pkg.highlighted ? (
                          <Badge className="bg-primary/15 text-primary border-primary/30">
                            <Star className="size-3" /> Featured
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground text-xs">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{pkg.order}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEdit(pkg)}
                            aria-label="Edit package"
                          >
                            <Pencil className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDelete(pkg)}
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                            aria-label="Delete package"
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
            <DialogTitle>{editing ? "Edit Package" : "New Package"}</DialogTitle>
            <DialogDescription>
              {editing
                ? "Update the details of this pricing package."
                : "Fill in the details to create a new pricing package."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="pkg-name">Plan Name *</Label>
              <Input
                id="pkg-name"
                placeholder="e.g. Starter, Professional, Enterprise"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pkg-price">Price (INR) *</Label>
              <Input
                id="pkg-price"
                type="number"
                placeholder="e.g. 25000"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pkg-period">Period *</Label>
              <Select
                value={form.period}
                onValueChange={(v) => setForm({ ...form, period: v })}
              >
                <SelectTrigger id="pkg-period" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PERIOD_OPTIONS.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="pkg-desc">Description *</Label>
              <Textarea
                id="pkg-desc"
                placeholder="Short description shown below the plan name"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={2}
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="pkg-features">Features</Label>
              <Textarea
                id="pkg-features"
                placeholder={"One feature per line (or comma-separated)\ne.g.\n1 Service of Choice\nMonthly Reporting\nEmail Support"}
                value={form.features}
                onChange={(e) => setForm({ ...form, features: e.target.value })}
                rows={6}
              />
              <p className="text-muted-foreground text-xs">
                Each line becomes one bullet point on the pricing card.
              </p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pkg-cta-text">CTA Text</Label>
              <Input
                id="pkg-cta-text"
                placeholder="e.g. Get Started"
                value={form.ctaText}
                onChange={(e) => setForm({ ...form, ctaText: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pkg-cta-link">CTA Link</Label>
              <Input
                id="pkg-cta-link"
                placeholder="/contact"
                value={form.ctaLink}
                onChange={(e) => setForm({ ...form, ctaLink: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pkg-order">Order</Label>
              <Input
                id="pkg-order"
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
                  checked={form.highlighted}
                  onCheckedChange={(v) => setForm({ ...form, highlighted: v === true })}
                />
                <span className="flex items-center gap-1 text-sm">
                  <Star className="size-3.5 text-primary" /> Featured / Highlighted
                </span>
              </Label>
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
                editing ? "Save Changes" : "Create Package"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Package</DialogTitle>
            <DialogDescription>
              This action cannot be undone. The package{" "}
              <span className="font-medium text-foreground">
                {deleteTarget?.name}
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
                  Delete Package
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
