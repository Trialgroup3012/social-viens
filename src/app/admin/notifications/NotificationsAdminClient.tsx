"use client";

import * as React from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Bell,
  BellRing,
  Trash2,
  Archive,
  CheckCheck,
  RefreshCw,
  Inbox,
  Loader2,
  ExternalLink,
  MessageCircle,
  Users,
  FileText,
  Mail,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

interface NotificationItem {
  id: string;
  type: string;
  title: string;
  message: string;
  metadata?: Record<string, unknown> | null;
  status: string;
  actionUrl?: string | null;
  createdAt: string;
}

interface NotificationsResponse {
  notifications: NotificationItem[];
  unreadCount: number;
  total: number;
}

type Filter = "all" | "unread" | "archived";

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

const FILTERS: Array<{ value: Filter; label: string }> = [
  { value: "all", label: "All" },
  { value: "unread", label: "Unread" },
  { value: "archived", label: "Archived" },
];

function formatRelative(iso: string): string {
  try {
    const d = new Date(iso);
    const diff = Date.now() - d.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 30) return `${days}d ago`;
    return d.toLocaleDateString();
  } catch {
    return "—";
  }
}

function formatDateFull(iso: string): string {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return "—";
  }
}

function statusBadge(status: string) {
  switch (status) {
    case "unread":
      return (
        <Badge className="bg-rose-500/15 text-rose-700 border-rose-500/30 hover:bg-rose-500/20">
          Unread
        </Badge>
      );
    case "read":
      return (
        <Badge className="bg-sky-500/15 text-sky-700 border-sky-500/30 hover:bg-sky-500/20">
          Read
        </Badge>
      );
    case "archived":
      return (
        <Badge className="bg-muted text-muted-foreground border-border">
          Archived
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="text-muted-foreground">
          {status}
        </Badge>
      );
  }
}

function typeIcon(type: string) {
  switch (type) {
    case "lead":
      return Users;
    case "chat":
      return MessageCircle;
    case "newsletter":
      return Mail;
    case "report":
      return FileText;
    default:
      return Bell;
  }
}

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export default function NotificationsAdminClient() {
  const [filter, setFilter] = React.useState<Filter>("all");
  const [items, setItems] = React.useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [busyId, setBusyId] = React.useState<string | null>(null);
  const [bulkBusy, setBulkBusy] = React.useState(false);

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const url =
        filter === "all"
          ? "/api/admin/notifications?limit=50"
          : `/api/admin/notifications?limit=50&status=${filter}`;
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as NotificationsResponse;
      setItems(data.notifications || []);
      setUnreadCount(data.unreadCount || 0);
      setTotal(data.total || 0);
    } catch (err: any) {
      toast.error("Failed to load notifications", {
        description: err?.message || String(err),
      });
    } finally {
      setLoading(false);
    }
  }, [filter]);

  React.useEffect(() => {
    load();
  }, [load]);

  const patchNotification = async (id: string, status: "read" | "archived" | "unread") => {
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/notifications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      toast.success(`Marked as ${status}`);
      await load();
    } catch (err: any) {
      toast.error("Failed to update notification", {
        description: err?.message || String(err),
      });
    } finally {
      setBusyId(null);
    }
  };

  const deleteNotification = async (id: string) => {
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/notifications/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      toast.success("Notification deleted");
      await load();
    } catch (err: any) {
      toast.error("Failed to delete notification", {
        description: err?.message || String(err),
      });
    } finally {
      setBusyId(null);
    }
  };

  const markAllRead = async () => {
    setBulkBusy(true);
    try {
      const res = await fetch("/api/admin/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "markAllRead" }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      toast.success(`Marked ${data?.updated ?? 0} notification(s) as read`);
      await load();
    } catch (err: any) {
      toast.error("Failed to mark all as read", {
        description: err?.message || String(err),
      });
    } finally {
      setBulkBusy(false);
    }
  };

  return (
    <div className="space-y-6 max-w-[1200px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            Notifications
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review admin alerts for new leads, chat conversions and signups.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={load}
            disabled={loading}
            className="border-border text-foreground hover:bg-accent"
          >
            <RefreshCw
              className={`size-4 mr-1.5 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button
            size="sm"
            onClick={markAllRead}
            disabled={bulkBusy || unreadCount === 0}
            className="bg-[#D4AF37] text-[#1a1a1a] hover:bg-[#B8860B] font-semibold"
          >
            {bulkBusy ? (
              <Loader2 className="size-4 mr-1.5 animate-spin" />
            ) : (
              <CheckCheck className="size-4 mr-1.5" />
            )}
            Mark all as read
          </Button>
        </div>
      </div>

      {/* Stats / filter row */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base font-semibold text-foreground">
                {total} notification{total === 1 ? "" : "s"}
              </CardTitle>
              {unreadCount > 0 && (
                <Badge className="bg-rose-500/15 text-rose-700 border-rose-500/30">
                  <BellRing className="size-3 mr-1" />
                  {unreadCount} unread
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setFilter(f.value)}
                  className={[
                    "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                    filter === f.value
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  ].join(" ")}
                  aria-pressed={filter === f.value}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <CardDescription className="text-xs text-muted-foreground mt-2">
            Filter to view all, unread, or archived notifications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* List */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Loader2 className="size-6 text-muted-foreground animate-spin mb-3" />
              <p className="text-sm text-muted-foreground">
                Loading notifications…
              </p>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Inbox className="size-10 text-muted-foreground/50 mb-3" />
              <p className="text-sm font-medium text-foreground">
                No notifications to show.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {filter === "unread"
                  ? "You've read everything new."
                  : filter === "archived"
                  ? "No archived notifications yet."
                  : "New leads and activity will appear here automatically."}
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {items.map((n) => {
                const Icon = typeIcon(n.type);
                const meta =
                  (n.metadata as Record<string, unknown> | null) || {};
                const waLink =
                  typeof meta.waLink === "string" ? meta.waLink : null;
                const leadEmail =
                  typeof meta.leadEmail === "string" ? meta.leadEmail : null;
                const leadPhone =
                  typeof meta.leadPhone === "string" ? meta.leadPhone : null;
                const isUnread = n.status === "unread";
                const isArchived = n.status === "archived";
                const actionUrl = n.actionUrl || "/admin/notifications";

                return (
                  <li
                    key={n.id}
                    className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-start gap-3"
                  >
                    {/* Icon */}
                    <div
                      className={[
                        "size-10 rounded-lg flex items-center justify-center shrink-0",
                        isUnread
                          ? "bg-[#D4AF37]/15 text-[#B8860B]"
                          : "bg-muted text-muted-foreground",
                      ].join(" ")}
                    >
                      <Icon className="size-5" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3
                              className={[
                                "text-sm line-clamp-1",
                                isUnread
                                  ? "font-semibold text-foreground"
                                  : "font-medium text-foreground/85",
                              ].join(" ")}
                              title={n.title}
                            >
                              {n.title}
                            </h3>
                            {statusBadge(n.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                            {n.message}
                          </p>

                          {/* Meta row */}
                          <div className="flex items-center gap-3 mt-2 flex-wrap text-xs text-muted-foreground">
                            <span title={formatDateFull(n.createdAt)}>
                              {formatRelative(n.createdAt)}
                            </span>
                            <span className="text-muted-foreground/50">·</span>
                            <span className="uppercase tracking-wider text-[10px] font-medium">
                              {n.type}
                            </span>
                          </div>

                          {/* Action buttons */}
                          <div className="flex items-center gap-2 mt-3 flex-wrap">
                            <Button asChild size="sm" variant="outline" className="h-7 text-xs border-border text-foreground hover:bg-accent">
                              <Link href={actionUrl}>
                                <ExternalLink className="size-3 mr-1" />
                                View {n.type === "lead" ? "Lead" : n.type === "chat" ? "Chat" : "Details"}
                              </Link>
                            </Button>
                            {waLink && (
                              <Button asChild size="sm" variant="outline" className="h-7 text-xs border-emerald-500/30 text-emerald-700 hover:bg-emerald-500/10">
                                <a href={waLink} target="_blank" rel="noopener noreferrer">
                                  <MessageCircle className="size-3 mr-1" />
                                  WhatsApp
                                </a>
                              </Button>
                            )}
                            {leadEmail && (
                              <Button asChild size="sm" variant="outline" className="h-7 text-xs border-border text-foreground hover:bg-accent">
                                <a href={`mailto:${leadEmail}`}>
                                  <Mail className="size-3 mr-1" />
                                  Email
                                </a>
                              </Button>
                            )}
                            {leadPhone && (
                              <Button asChild size="sm" variant="outline" className="h-7 text-xs border-border text-foreground hover:bg-accent">
                                <a href={`tel:${leadPhone.replace(/\s+/g, "")}`}>
                                  <Users className="size-3 mr-1" />
                                  Call
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>

                        {/* Per-row action buttons */}
                        <div className="flex items-center gap-1 shrink-0">
                          {isUnread && (
                            <Button
                              size="icon"
                              variant="ghost"
                              className="size-8 text-muted-foreground hover:text-foreground hover:bg-accent"
                              onClick={() => patchNotification(n.id, "read")}
                              disabled={busyId === n.id}
                              title="Mark as read"
                            >
                              {busyId === n.id ? (
                                <Loader2 className="size-3.5 animate-spin" />
                              ) : (
                                <CheckCheck className="size-3.5" />
                              )}
                            </Button>
                          )}
                          {!isArchived && (
                            <Button
                              size="icon"
                              variant="ghost"
                              className="size-8 text-muted-foreground hover:text-foreground hover:bg-accent"
                              onClick={() => patchNotification(n.id, "archived")}
                              disabled={busyId === n.id}
                              title="Archive"
                            >
                              <Archive className="size-3.5" />
                            </Button>
                          )}
                          <Button
                            size="icon"
                            variant="ghost"
                            className="size-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                            onClick={() => deleteNotification(n.id)}
                            disabled={busyId === n.id}
                            title="Delete"
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
