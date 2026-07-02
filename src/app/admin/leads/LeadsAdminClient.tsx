"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  Plus,
  Search,
  RefreshCw,
  Trash2,
  Mail,
  Phone,
  Building2,
  Clock,
  Tag,
  ExternalLink,
  FileText,
  Loader2,
  ArrowLeft,
  ArrowRight,
  Download,
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

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  business: string | null;
  service: string | null;
  message: string | null;
  source: string;
  pageUrl: string | null;
  notes: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type LeadsResponse = {
  leads: Lead[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

const STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "new", label: "New" },
  { value: "read", label: "Read" },
  { value: "replied", label: "Replied" },
];

function statusBadgeClass(status: string) {
  switch (status) {
    case "new":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "read":
      return "bg-sky-100 text-sky-700 border-sky-200";
    case "replied":
      return "bg-amber-100 text-amber-700 border-amber-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
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

export default function LeadsAdminClient() {
  const [leads, setLeads] = React.useState<Lead[]>([]);
  const [total, setTotal] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(1);
  const [page, setPage] = React.useState(1);
  const [limit] = React.useState(10);
  const [status, setStatus] = React.useState("all");
  const [q, setQ] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [exporting, setExporting] = React.useState(false);

  // detail dialog
  const [selected, setSelected] = React.useState<Lead | null>(null);
  const [detailOpen, setDetailOpen] = React.useState(false);
  const [editStatus, setEditStatus] = React.useState("new");
  const [editNotes, setEditNotes] = React.useState("");
  const [saving, setSaving] = React.useState(false);

  // delete dialog
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [deleteTarget, setDeleteTarget] = React.useState<Lead | null>(null);
  const [deleting, setDeleting] = React.useState(false);

  const fetchLeads = React.useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });
      if (status !== "all") params.set("status", status);
      if (q.trim()) params.set("q", q.trim());
      const res = await fetch(`/api/admin/leads?${params.toString()}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to load leads");
      const data: LeadsResponse = await res.json();
      setLeads(data.leads || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load leads");
    } finally {
      setLoading(false);
    }
  }, [page, limit, status, q]);

  React.useEffect(() => {
    void fetchLeads();
  }, [fetchLeads]);

  const openDetail = (lead: Lead) => {
    setSelected(lead);
    setEditStatus(lead.status);
    setEditNotes(lead.notes || "");
    setDetailOpen(true);
  };

  const saveDetail = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/leads/${selected.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: editStatus, notes: editNotes }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to update lead");
      }
      const data = await res.json();
      toast.success("Lead updated");
      setLeads((prev) =>
        prev.map((l) => (l.id === selected.id ? { ...l, ...data.lead } : l))
      );
      setSelected({ ...selected, ...data.lead });
      setDetailOpen(false);
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Failed to update");
    } finally {
      setSaving(false);
    }
  };

  const openDelete = (lead: Lead) => {
    setDeleteTarget(lead);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/leads/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to delete lead");
      }
      toast.success("Lead deleted");
      setLeads((prev) => prev.filter((l) => l.id !== deleteTarget.id));
      setDeleteOpen(false);
      setDeleteTarget(null);
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Failed to delete");
    } finally {
      setDeleting(false);
    }
  };

  const goToPage = (p: number) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  const exportCsv = async () => {
    setExporting(true);
    try {
      const params = new URLSearchParams();
      if (status !== "all") params.set("status", status);
      if (q.trim()) params.set("q", q.trim());
      const res = await fetch(`/api/admin/leads/export?${params.toString()}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to export leads");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `social-viens-leads-${new Date()
        .toISOString()
        .split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success("Leads exported to CSV");
    } catch (err) {
      console.error(err);
      toast.error("Failed to export CSV");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            Leads
          </h1>
          <p className="text-sm text-muted-foreground">
            {total} total lead{total === 1 ? "" : "s"} captured from your website
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => void exportCsv()}
            disabled={exporting || loading}
          >
            {exporting ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Download className="size-4" />
            )}
            Export CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => void fetchLeads()}
            disabled={loading}
          >
            <RefreshCw className={loading ? "animate-spin" : ""} />
            Refresh
          </Button>
        </div>
      </div>

      <Card className="premium-card">
        <CardHeader>
          <CardTitle>All Leads</CardTitle>
          <CardDescription>
            Click any row to view full details, update status, or manage notes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
              <Input
                placeholder="Search name, email, phone, business..."
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setPage(1);
                }}
                className="pl-9"
              />
            </div>
            <Select
              value={status}
              onValueChange={(v) => {
                setStatus(v);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="max-h-[600px] overflow-y-auto rounded-md border">
            <Table>
              <TableHeader className="sticky top-0 z-10">
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading && leads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-10 text-center">
                      <Loader2 className="text-muted-foreground mx-auto size-5 animate-spin" />
                    </TableCell>
                  </TableRow>
                ) : leads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-10 text-center text-muted-foreground">
                      No leads found.
                    </TableCell>
                  </TableRow>
                ) : (
                  leads.map((lead) => (
                    <TableRow
                      key={lead.id}
                      className="cursor-pointer"
                      onClick={() => openDetail(lead)}
                    >
                      <TableCell className="font-medium">
                        {lead.name}
                        {lead.business ? (
                          <div className="text-muted-foreground text-xs">
                            {lead.business}
                          </div>
                        ) : null}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{lead.email}</TableCell>
                      <TableCell className="text-muted-foreground">{lead.phone}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {lead.service || "—"}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusBadgeClass(lead.status)}>
                          {lead.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-xs">
                        {formatDate(lead.createdAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            openDelete(lead);
                          }}
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                          aria-label="Delete lead"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 ? (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-muted-foreground text-xs">
                Page {page} of {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(page - 1)}
                  disabled={page === 1 || loading}
                >
                  <ArrowLeft className="size-4" />
                  Prev
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(page + 1)}
                  disabled={page === totalPages || loading}
                >
                  Next
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>

      {/* Detail / Edit Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Lead Details</DialogTitle>
            <DialogDescription>
              Captured {selected ? formatDate(selected.createdAt) : ""}
            </DialogDescription>
          </DialogHeader>

          {selected ? (
            <div className="max-h-[60vh] space-y-4 overflow-y-auto pr-1">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Name</Label>
                  <div className="text-sm font-medium">{selected.name}</div>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Business</Label>
                  <div className="text-sm">
                    {selected.business || "—"}
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs flex items-center gap-1">
                    <Mail className="size-3" /> Email
                  </Label>
                  <a
                    href={`mailto:${selected.email}`}
                    className="text-primary text-sm hover:underline"
                  >
                    {selected.email}
                  </a>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs flex items-center gap-1">
                    <Phone className="size-3" /> Phone
                  </Label>
                  <a
                    href={`tel:${selected.phone}`}
                    className="text-primary text-sm hover:underline"
                  >
                    {selected.phone}
                  </a>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs flex items-center gap-1">
                    <Tag className="size-3" /> Service
                  </Label>
                  <div className="text-sm">{selected.service || "—"}</div>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs flex items-center gap-1">
                    <Building2 className="size-3" /> Source
                  </Label>
                  <div className="text-sm">{selected.source}</div>
                </div>
                {selected.pageUrl ? (
                  <div className="space-y-1 md:col-span-2">
                    <Label className="text-muted-foreground text-xs flex items-center gap-1">
                      <ExternalLink className="size-3" /> Page URL
                    </Label>
                    <a
                      href={selected.pageUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary block truncate text-sm hover:underline"
                    >
                      {selected.pageUrl}
                    </a>
                  </div>
                ) : null}
                <div className="space-y-1 md:col-span-2">
                  <Label className="text-muted-foreground text-xs flex items-center gap-1">
                    <FileText className="size-3" /> Message
                  </Label>
                  <div className="bg-muted/30 rounded-md border p-3 text-sm whitespace-pre-wrap">
                    {selected.message || "No message provided."}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="space-y-1">
                  <Label htmlFor="lead-status">Status</Label>
                  <Select value={editStatus} onValueChange={setEditStatus}>
                    <SelectTrigger id="lead-status" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="read">Read</SelectItem>
                      <SelectItem value="replied">Replied</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs flex items-center gap-1">
                    <Clock className="size-3" /> Last Updated
                  </Label>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(selected.updatedAt)}
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="lead-notes">Internal Notes</Label>
                <Textarea
                  id="lead-notes"
                  placeholder="Add private notes about this lead..."
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          ) : null}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDetailOpen(false)}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button onClick={() => void saveDetail()} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Lead</DialogTitle>
            <DialogDescription>
              This action cannot be undone. The lead from{" "}
              <span className="font-medium text-foreground">
                {deleteTarget?.name}
              </span>{" "}
              ({deleteTarget?.email}) will be permanently removed.
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
                  Delete Lead
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
