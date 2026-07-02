"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bell, BellRing, ArrowUpRight, CheckCheck } from "lucide-react";

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

/**
 * Header bell icon with a live unread-count badge + recent-notifications
 * dropdown. Polls /api/admin/notifications every 30s while the admin
 * console is open. Clicking the icon opens the dropdown; clicking an
 * item navigates to the relevant admin page.
 */
export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/notifications?limit=6", {
        cache: "no-store",
      });
      if (!res.ok) return;
      const data = (await res.json()) as NotificationsResponse;
      setItems(data.notifications || []);
      setUnread(data.unreadCount || 0);
    } catch {
      // Silent — notification polling must NEVER block the admin UI.
    } finally {
      setLoading(false);
    }
  };

  // Initial load + 30s polling.
  useEffect(() => {
    load();
    const id = setInterval(load, 30000);
    return () => clearInterval(id);
  }, []);

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (btnRef.current && !btnRef.current.parentElement?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Escape closes.
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  const markAllRead = async () => {
    try {
      await fetch("/api/admin/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "markAllRead" }),
      });
      load();
    } catch {
      // Non-fatal.
    }
  };

  return (
    <div className="relative shrink-0">
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={`Notifications${unread > 0 ? `, ${unread} unread` : ""}`}
        aria-expanded={open}
        aria-haspopup="menu"
        className="relative size-9 rounded-full flex items-center justify-center text-foreground hover:bg-accent transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Bell className="size-5" />
        {unread > 0 && (
          <span
            className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-bold text-white bg-rose-600 rounded-full ring-2 ring-card"
            aria-hidden="true"
          >
            {unread > 99 ? "99+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+8px)] w-[min(380px,calc(100vw-2rem))] bg-card border border-border rounded-lg shadow-xl z-50 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-border bg-muted/40">
            <div className="flex items-center gap-2">
              <BellRing className="size-4 text-[#B8860B]" />
              <h3 className="text-sm font-semibold text-foreground">
                Notifications
              </h3>
              {unread > 0 && (
                <span className="text-[10px] font-bold text-white bg-rose-600 rounded-full px-1.5 py-0.5">
                  {unread}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={markAllRead}
              disabled={loading || unread === 0}
              className="text-xs text-muted-foreground hover:text-[#D4AF37] disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-1 transition-colors"
              title="Mark all as read"
            >
              <CheckCheck className="size-3.5" />
              Mark all read
            </button>
          </div>

          {/* List */}
          <div className="max-h-[360px] overflow-y-auto">
            {items.length === 0 ? (
              <div className="px-4 py-10 text-center">
                <Bell className="size-8 text-muted-foreground/50 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  You&apos;re all caught up.
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  New leads &amp; activity will appear here.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {items.map((n) => {
                  const isUnread = n.status === "unread";
                  return (
                    <li key={n.id}>
                      <Link
                        href={n.actionUrl || "/admin/notifications"}
                        onClick={() => setOpen(false)}
                        className="block px-4 py-3 hover:bg-accent/60 transition-colors"
                      >
                        <div className="flex items-start gap-2.5">
                          <span
                            className={[
                              "size-2 rounded-full mt-1.5 shrink-0",
                              isUnread ? "bg-[#D4AF37]" : "bg-transparent",
                            ].join(" ")}
                            aria-hidden="true"
                          />
                          <div className="flex-1 min-w-0">
                            <p
                              className={[
                                "text-sm line-clamp-1",
                                isUnread
                                  ? "font-semibold text-foreground"
                                  : "font-medium text-foreground/80",
                              ].join(" ")}
                              title={n.title}
                            >
                              {n.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                              {n.message}
                            </p>
                            <p className="text-[11px] text-muted-foreground/80 mt-1">
                              {formatRelative(n.createdAt)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-border bg-muted/30">
            <Link
              href="/admin/notifications"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-medium text-[#B8860B] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors"
            >
              View all notifications
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
