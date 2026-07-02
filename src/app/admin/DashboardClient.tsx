"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Users,
  Briefcase,
  Star,
  PlusCircle,
  Settings as SettingsIcon,
  ArrowUpRight,
  CheckCircle2,
  BellRing,
  Bell,
  MessageSquare,
  Loader2,
  AlertCircle,
  Inbox,
} from "lucide-react";

// =============================================================================
// Types
// =============================================================================

interface AdminStats {
  blogCount?: number;
  leadCount?: number;
  portfolioCount?: number;
  testimonialCount?: number;
  publishedPosts?: number;
  newLeads?: number;
  pricingCount?: number;
  serviceCount?: number;
  chatSessionCount?: number;
}

interface LeadRow {
  id: string;
  name: string;
  email: string;
  phone?: string;
  business?: string | null;
  message?: string | null;
  source?: string | null;
  status: string;
  createdAt: string;
}

interface BlogPostRow {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: string;
  createdAt: string;
  publishedAt?: string | null;
}

interface DashboardData {
  stats: AdminStats;
  leads: LeadRow[];
  posts: BlogPostRow[];
}

interface NotificationRow {
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
  notifications: NotificationRow[];
  unreadCount: number;
  total: number;
}

type LoadState = "loading" | "success" | "error";

// =============================================================================
// Helpers
// =============================================================================

function leadStatusBadge(status: string) {
  const s = (status || "").toLowerCase();
  if (s === "new") {
    return (
      <Badge className="bg-emerald-500/15 text-emerald-700 border-emerald-500/30 hover:bg-emerald-500/20">
        New
      </Badge>
    );
  }
  if (s === "read") {
    return (
      <Badge className="bg-sky-500/15 text-sky-700 border-sky-500/30 hover:bg-sky-500/20">
        Read
      </Badge>
    );
  }
  if (s === "replied") {
    return (
      <Badge className="bg-[#D4AF37]/15 text-[#B8860B] border-[#D4AF37]/40 hover:bg-[#D4AF37]/25">
        Replied
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="text-muted-foreground">
      {status || "—"}
    </Badge>
  );
}

function postStatusBadge(status: string) {
  const s = (status || "").toLowerCase();
  if (s === "published") {
    return (
      <Badge className="bg-emerald-500/15 text-emerald-700 border-emerald-500/30 hover:bg-emerald-500/20">
        Published
      </Badge>
    );
  }
  if (s === "draft") {
    return (
      <Badge className="bg-amber-500/15 text-amber-700 border-amber-500/30 hover:bg-amber-500/20">
        Draft
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="text-muted-foreground">
      {status || "—"}
    </Badge>
  );
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "—";
  }
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
    return formatDate(iso);
  } catch {
    return "—";
  }
}

// =============================================================================
// Subcomponents
// =============================================================================

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
  href,
  footer,
}: {
  label: string;
  value: number | string | undefined;
  icon: React.ComponentType<{ className?: string }>;
  accent: string; // tailwind text/bg classes for the icon chip
  href?: string;
  footer?: React.ReactNode;
}) {
  const inner = (
    <Card className="bg-card border-border hover:border-[#D4AF37]/40 transition-colors h-full">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="space-y-0.5">
          <CardDescription className="text-muted-foreground text-xs uppercase tracking-wider font-medium">
            {label}
          </CardDescription>
          <CardTitle className="text-3xl font-bold text-foreground tabular-nums">
            {value === undefined ? "—" : value}
          </CardTitle>
        </div>
        <div className={`size-10 rounded-lg flex items-center justify-center ${accent}`}>
          <Icon className="size-5" />
        </div>
      </CardHeader>
      {footer && (
        <CardContent className="pt-0">
          <div className="text-xs text-muted-foreground">{footer}</div>
        </CardContent>
      )}
    </Card>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {inner}
      </Link>
    );
  }
  return inner;
}

function QuickActionCard({
  title,
  description,
  href,
  icon: Icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Link href={href} className="block h-full group">
      <Card className="bg-card border-border hover:border-[#D4AF37]/50 hover:shadow-md transition-all h-full">
        <CardContent className="flex items-start gap-4 p-5">
          <div className="size-10 rounded-lg bg-[#D4AF37]/12 text-[#B8860B] flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37]/20 transition-colors">
            <Icon className="size-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-semibold text-foreground text-sm">{title}</h3>
              <ArrowUpRight className="size-3.5 text-muted-foreground group-hover:text-[#D4AF37] transition-colors" />
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              {description}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function SectionCard({
  title,
  description,
  viewAllHref,
  children,
  icon: Icon,
}: {
  title: string;
  description?: string;
  viewAllHref?: string;
  children: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Card className="bg-card border-border h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="size-8 rounded-md bg-muted text-muted-foreground flex items-center justify-center shrink-0">
            <Icon className="size-4" />
          </div>
          <div className="min-w-0">
            <CardTitle className="text-base font-semibold text-foreground truncate">
              {title}
            </CardTitle>
            {description && (
              <CardDescription className="text-xs text-muted-foreground truncate">
                {description}
              </CardDescription>
            )}
          </div>
        </div>
        {viewAllHref && (
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 shrink-0"
          >
            <Link href={viewAllHref}>
              View all
              <ArrowUpRight className="size-3.5" />
            </Link>
          </Button>
        )}
      </CardHeader>
      <CardContent className="pt-0">{children}</CardContent>
    </Card>
  );
}

function SkeletonRow() {
  return (
    <div className="flex items-center gap-3 py-3">
      <div className="size-9 rounded-full bg-muted animate-pulse" />
      <div className="flex-1 space-y-1.5">
        <div className="h-3 w-1/3 bg-muted rounded animate-pulse" />
        <div className="h-2.5 w-1/2 bg-muted/70 rounded animate-pulse" />
      </div>
      <div className="size-12 bg-muted rounded animate-pulse" />
    </div>
  );
}

// =============================================================================
// Main component
// =============================================================================

export default function DashboardClient() {
  const [state, setState] = useState<LoadState>("loading");
  const [data, setData] = useState<DashboardData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [notifications, setNotifications] = useState<NotificationRow[]>([]);
  const [unreadNotifs, setUnreadNotifs] = useState<number>(0);

  const load = useCallback(async () => {
    setState("loading");
    setErrorMsg("");
    try {
      const [statsRes, leadsRes, postsRes, notifsRes] = await Promise.all([
        fetch("/api/admin/stats", { cache: "no-store" }),
        fetch("/api/admin/leads?limit=5", { cache: "no-store" }),
        fetch("/api/admin/blog?limit=5", { cache: "no-store" }),
        fetch("/api/admin/notifications?limit=5", { cache: "no-store" }),
      ]);

      if (!statsRes.ok) {
        throw new Error(`stats responded ${statsRes.status}`);
      }

      const stats = (await statsRes.json()) as AdminStats;
      const leadsBody = leadsRes.ok ? await leadsRes.json() : { leads: [] };
      const postsBody = postsRes.ok ? await postsRes.json() : { posts: [] };
      const notifsBody: NotificationsResponse = notifsRes.ok
        ? await notifsRes.json()
        : { notifications: [], unreadCount: 0, total: 0 };

      setData({
        stats,
        leads: leadsBody.leads || [],
        posts: postsBody.posts || [],
      });
      setNotifications(notifsBody.notifications || []);
      setUnreadNotifs(notifsBody.unreadCount || 0);
      setState("success");
    } catch (err: any) {
      setErrorMsg(err?.message ?? "Failed to load dashboard data.");
      setState("error");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const stats = data?.stats || {};
  const leads = data?.leads || [];
  const posts = data?.posts || [];

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Welcome back. Here&apos;s what&apos;s happening across your site.
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString(undefined, {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
      </div>

      {/* Error banner */}
      {state === "error" && (
        <div className="flex items-start gap-3 bg-destructive/10 border border-destructive/30 rounded-lg p-4">
          <AlertCircle className="size-5 text-destructive shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-destructive">
              Failed to load dashboard data
            </p>
            <p className="text-xs text-destructive/80 mt-0.5 break-all">
              {errorMsg}
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={load}
            className="border-destructive/40 text-destructive hover:bg-destructive/10"
          >
            Retry
          </Button>
        </div>
      )}

      {/* Primary stat cards */}
      <section
        aria-label="Key metrics"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard
          label="Blog Posts"
          value={state === "loading" ? undefined : stats.blogCount}
          icon={FileText}
          accent="bg-[#D4AF37]/15 text-[#B8860B]"
          href="/admin/blog"
          footer={
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-emerald-600" />
              {stats.publishedPosts ?? 0} published
            </span>
          }
        />
        <StatCard
          label="Total Leads"
          value={state === "loading" ? undefined : stats.leadCount}
          icon={Users}
          accent="bg-sky-500/15 text-sky-700"
          href="/admin/leads"
          footer={
            <span className="inline-flex items-center gap-1.5">
              <BellRing className="size-3.5 text-amber-600" />
              {stats.newLeads ?? 0} new unread
            </span>
          }
        />
        <StatCard
          label="Portfolio Items"
          value={state === "loading" ? undefined : stats.portfolioCount}
          icon={Briefcase}
          accent="bg-emerald-500/15 text-emerald-700"
          href="/admin/portfolio"
        />
        <StatCard
          label="Testimonials"
          value={state === "loading" ? undefined : stats.testimonialCount}
          icon={Star}
          accent="bg-purple-500/15 text-purple-700"
          href="/admin/testimonials"
        />
      </section>

      {/* Secondary stat row — notifications + chat */}
      <section aria-label="Notifications" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Unread Notifications"
          value={state === "loading" ? undefined : unreadNotifs}
          icon={Bell}
          accent="bg-rose-500/15 text-rose-700"
          href="/admin/notifications"
          footer={
            <span className="inline-flex items-center gap-1.5">
              <BellRing className="size-3.5 text-amber-600" />
              Admin alerts center
            </span>
          }
        />
        <StatCard
          label="Chat Sessions"
          value={state === "loading" ? undefined : stats.chatSessionCount}
          icon={MessageSquare}
          accent="bg-amber-500/15 text-amber-700"
          href="/admin/chat"
          footer={
            <span className="inline-flex items-center gap-1.5">
              <MessageSquare className="size-3.5 text-[#B8860B]" />
              AI assistant conversations
            </span>
          }
        />
      </section>

      {/* Recent activity (two columns) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Leads */}
        <SectionCard
          title="Recent Leads"
          description="5 most recent inquiries"
          viewAllHref="/admin/leads"
          icon={Users}
        >
          {state === "loading" ? (
            <div className="divide-y divide-border">
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
            </div>
          ) : leads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Inbox className="size-8 text-muted-foreground/60 mb-2" />
              <p className="text-sm text-muted-foreground">No leads yet.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
                    Name
                  </TableHead>
                  <TableHead className="text-xs uppercase tracking-wider text-muted-foreground hidden sm:table-cell">
                    Business
                  </TableHead>
                  <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
                    Status
                  </TableHead>
                  <TableHead className="text-xs uppercase tracking-wider text-muted-foreground text-right">
                    Date
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="py-2.5">
                      <div className="font-medium text-foreground text-sm truncate max-w-[160px]">
                        {lead.name}
                      </div>
                      <div className="text-xs text-muted-foreground truncate max-w-[160px]">
                        {lead.email}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                      {lead.business || "—"}
                    </TableCell>
                    <TableCell>{leadStatusBadge(lead.status)}</TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground whitespace-nowrap">
                      {formatRelative(lead.createdAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </SectionCard>

        {/* Recent Blog Posts */}
        <SectionCard
          title="Recent Blog Posts"
          description="Latest published & drafts"
          viewAllHref="/admin/blog"
          icon={FileText}
        >
          {state === "loading" ? (
            <div className="divide-y divide-border">
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
            </div>
          ) : posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Inbox className="size-8 text-muted-foreground/60 mb-2" />
              <p className="text-sm text-muted-foreground">No blog posts yet.</p>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {posts.map((post) => (
                <li
                  key={post.id}
                  className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <div className="size-9 rounded-md bg-[#D4AF37]/12 text-[#B8860B] flex items-center justify-center shrink-0">
                    <FileText className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/admin/blog/${post.slug}`}
                      className="font-medium text-sm text-foreground hover:text-[#D4AF37] transition-colors line-clamp-1"
                      title={post.title}
                    >
                      {post.title}
                    </Link>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-muted-foreground">
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(post.publishedAt || post.createdAt)}
                      </span>
                    </div>
                  </div>
                  {postStatusBadge(post.status)}
                </li>
              ))}
            </ul>
          )}
        </SectionCard>
      </section>

      {/* Recent Notifications */}
      <section aria-label="Recent notifications">
        <SectionCard
          title="Recent Notifications"
          description="Latest admin alerts (new leads, chat conversions, signups)"
          viewAllHref="/admin/notifications"
          icon={Bell}
        >
          {state === "loading" ? (
            <div className="divide-y divide-border">
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Inbox className="size-8 text-muted-foreground/60 mb-2" />
              <p className="text-sm text-muted-foreground">
                No notifications yet.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {notifications.map((n) => {
                const meta =
                  (n.metadata as Record<string, unknown> | null) || {};
                const waLink =
                  typeof meta.waLink === "string" ? meta.waLink : null;
                const isUnread = n.status === "unread";
                return (
                  <li
                    key={n.id}
                    className="flex items-start gap-3 py-3 first:pt-0 last:pb-0"
                  >
                    <div
                      className={[
                        "size-9 rounded-md flex items-center justify-center shrink-0",
                        isUnread
                          ? "bg-[#D4AF37]/15 text-[#B8860B]"
                          : "bg-muted text-muted-foreground",
                      ].join(" ")}
                    >
                      <Bell className="size-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Link
                          href={n.actionUrl || "/admin/notifications"}
                          className="font-medium text-sm text-foreground hover:text-[#D4AF37] transition-colors line-clamp-1"
                          title={n.title}
                        >
                          {n.title}
                        </Link>
                        {isUnread && (
                          <Badge className="bg-rose-500/15 text-rose-700 border-rose-500/30 text-[10px] uppercase tracking-wider px-1.5 py-0">
                            New
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                        {n.message}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] text-muted-foreground">
                          {formatRelative(n.createdAt)}
                        </span>
                        <Link
                          href="/admin/notifications"
                          className="text-[11px] text-[#B8860B] hover:text-[#D4AF37] hover:underline font-medium"
                        >
                          View
                        </Link>
                        {waLink && (
                          <>
                            <span className="text-[11px] text-muted-foreground">·</span>
                            <a
                              href={waLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] text-emerald-700 hover:text-emerald-800 hover:underline font-medium"
                            >
                              WhatsApp
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </SectionCard>
      </section>

      {/* Quick actions */}
      <section aria-label="Quick actions">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Quick Actions
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActionCard
            title="Add New Post"
            description="Create a new blog article or draft."
            href="/admin/blog/new"
            icon={PlusCircle}
          />
          <QuickActionCard
            title="View Leads"
            description="Review and respond to incoming inquiries."
            href="/admin/leads"
            icon={Users}
          />
          <QuickActionCard
            title="Manage Portfolio"
            description="Add or edit case studies and work samples."
            href="/admin/portfolio"
            icon={Briefcase}
          />
          <QuickActionCard
            title="Site Settings"
            description="Update contact info, social links, branding."
            href="/admin/settings"
            icon={SettingsIcon}
          />
        </div>
      </section>

      {/* Footer status */}
      <div className="flex items-center justify-center pt-2 pb-1">
        <p className="text-xs text-muted-foreground inline-flex items-center gap-1.5">
          {state === "loading" ? (
            <>
              <Loader2 className="size-3 animate-spin" />
              Loading dashboard data…
            </>
          ) : state === "error" ? (
            <>
              <AlertCircle className="size-3" />
              Showing partial data due to load error.
            </>
          ) : (
            <>
              <CheckCircle2 className="size-3 text-emerald-600" />
              All data up to date.
            </>
          )}
        </p>
      </div>
    </div>
  );
}
