"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  LayoutDashboard,
  FileText,
  Files,
  Briefcase,
  Star,
  Users,
  DollarSign,
  Layers,
  Bell,
  MessageSquare,
  Settings as SettingsIcon,
  FileSearch,
  LogOut,
  Menu,
  ExternalLink,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import NotificationBell from "./NotificationBell";

// =============================================================================
// Types & constants
// =============================================================================

interface AdminUser {
  id?: string;
  email?: string;
  name?: string;
  role?: string;
}

// Sidebar navigation items — Spec §8.1.
// Note: "Services" and "Settings" intentionally use different icons to avoid
// visual ambiguity in the sidebar.
const navItems: Array<{
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/blog", label: "Blog Posts", icon: FileText },
  { href: "/admin/pages", label: "Pages", icon: Files },
  { href: "/admin/portfolio", label: "Portfolio", icon: Briefcase },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/notifications", label: "Notifications", icon: Bell },
  { href: "/admin/chat", label: "Chat History", icon: MessageSquare },
  { href: "/admin/pricing", label: "Pricing", icon: DollarSign },
  { href: "/admin/services", label: "Services", icon: Layers },
  { href: "/admin/seo", label: "SEO Manager", icon: FileSearch },
  { href: "/admin/settings", label: "Settings", icon: SettingsIcon },
];

const ADMIN_TOKEN_KEY = "admin_token";
const ADMIN_USER_KEY = "admin_user";

// useSyncExternalStore-based hydration guards. Both `mounted` and the
// localStorage reads return `null`/`false` on the server AND during the first
// client render (so the markup matches the server snapshot), then resolve to
// the actual client value after React commits. This avoids calling setState
// directly inside useEffect (which trips react-hooks/set-state-in-effect)
// while still giving us hydration-safe values.
const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function subscribeToStorage(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", cb);
  // The `storage` event only fires in OTHER tabs. To catch same-tab writes
  // (e.g. sign-out), also listen on a custom event we dispatch ourselves.
  window.addEventListener("admin-auth-change", cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener("admin-auth-change", cb);
  };
}

function readLocalStorage(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

// Hook: returns the current admin token (or null) in a hydration-safe way.
function useAdminToken(): string | null {
  return useSyncExternalStore(
    subscribeToStorage,
    () => readLocalStorage(ADMIN_TOKEN_KEY),
    () => null
  );
}

// Hook: returns the parsed admin user object (or null) in a hydration-safe way.
function useAdminUser(): AdminUser | null {
  const userStr = useSyncExternalStore(
    subscribeToStorage,
    () => readLocalStorage(ADMIN_USER_KEY),
    () => null
  );
  return useMemo(() => {
    if (!userStr) return null;
    try {
      return JSON.parse(userStr) as AdminUser;
    } catch {
      return null;
    }
  }, [userStr]);
}

// =============================================================================
// Helpers
// =============================================================================

function isActive(pathname: string, href: string): boolean {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(href + "/");
}

function getInitials(name?: string | null, email?: string | null): string {
  if (name) {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }
  if (email) return email.slice(0, 2).toUpperCase();
  return "AD";
}

function getBreadcrumbs(
  pathname: string
): Array<{ label: string; href?: string }> {
  if (pathname === "/admin" || pathname === "/admin/") {
    return [{ label: "Dashboard" }];
  }

  const segments = pathname.replace(/^\/admin\/?/, "").split("/");
  const crumbs: Array<{ label: string; href?: string }> = [
    { label: "Admin", href: "/admin" },
  ];

  let path = "/admin";
  for (const seg of segments) {
    if (!seg) continue;
    path += "/" + seg;
    const navItem = navItems.find((n) => n.href === path);
    const label = navItem
      ? navItem.label
      : seg.charAt(0).toUpperCase() + seg.slice(1);
    crumbs.push({ label, href: path });
  }

  // Mark last crumb as the current page (no link).
  crumbs[crumbs.length - 1].href = undefined;
  return crumbs;
}

async function signOut(router: ReturnType<typeof useRouter>) {
  if (typeof window !== "undefined") {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    localStorage.removeItem(ADMIN_USER_KEY);
    // Dispatch a custom event so useSyncExternalStore subscribers in this tab
    // re-read localStorage and update their snapshot immediately.
    window.dispatchEvent(new Event("admin-auth-change"));
  }
  try {
    await fetch("/api/admin/logout", { method: "POST" });
  } catch {
    // Network errors are non-fatal — we still redirect.
  }
  router.push("/admin/login");
}

// =============================================================================
// Layout
// =============================================================================

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot
  );
  const token = useAdminToken();
  const user = useAdminUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isAuthenticated = !!token;

  // Redirect to login if no token (and not already on the login page).
  // Guard with `mounted` so we only redirect AFTER hydration is complete
  // and localStorage has been read — otherwise the token is null during the
  // first render and we'd redirect every direct URL navigation to /admin/login
  // (which then bounces back to /admin, causing a redirect loop to /admin).
  useEffect(() => {
    if (mounted && !token && pathname !== "/admin/login") {
      router.replace("/admin/login");
    }
  }, [mounted, token, pathname, router]);

  // Login page renders bare (no sidebar / header).
  if (pathname === "/admin/login") {
    return (
      <div className="admin-light min-h-screen bg-background text-foreground">
        {children}
      </div>
    );
  }

  // Pre-hydration / pending auth check — show a neutral loading state.
  // Skipped on the server so the markup matches the first client render
  // (mounted=false on both sides → no hydration mismatch).
  if (!mounted || !isAuthenticated) {
    return (
      <div className="admin-light min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <div className="size-8 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin" />
          <p className="text-sm">Loading admin…</p>
        </div>
      </div>
    );
  }

  const breadcrumbs = getBreadcrumbs(pathname);

  // --- Sidebar content (shared between desktop and mobile Sheet) ----------
  const SidebarInner = (
    <div className="flex flex-col h-full bg-[#0F0A0C] text-[#F5F0E8]">
      <div className="px-6 py-6 border-b border-[rgba(212,175,55,0.12)]">
        <Link
          href="/admin"
          onClick={() => setSidebarOpen(false)}
          className="block"
        >
          <span className="font-sans text-xl font-black tracking-tight text-[#F5F0E8]">
            SOCIAL <span className="text-[#D4AF37]">VIENS</span>
          </span>
          <p className="text-[11px] mt-1 font-medium tracking-[0.18em] uppercase text-[#F5F0E8]/55">
            Admin Console
          </p>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto" aria-label="Admin">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium",
                    "transition-colors relative outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/40",
                    active
                      ? "bg-[#22151A] text-[#D4AF37]"
                      : "text-[#F5F0E8]/80 hover:bg-[#22151A]/70 hover:text-[#F5F0E8]",
                  ].join(" ")}
                  style={
                    active
                      ? { boxShadow: "inset 3px 0 0 0 #D4AF37" }
                      : undefined
                  }
                >
                  <Icon className="size-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-[rgba(212,175,55,0.12)] px-4 py-3">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs text-[#F5F0E8]/60 hover:text-[#D4AF37] transition-colors"
        >
          <ExternalLink className="size-3.5" />
          View Public Site
        </a>
      </div>
    </div>
  );

  // --- Render -------------------------------------------------------------
  return (
    <div className="admin-light min-h-screen bg-background text-foreground flex">
      {/* Desktop sidebar — fixed 280px */}
      <aside className="hidden lg:flex flex-col w-[280px] shrink-0 sticky top-0 h-screen">
        {SidebarInner}
      </aside>

      {/* Mobile sidebar — Sheet overlay */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent
          side="left"
          className="w-[280px] max-w-[85vw] p-0 border-0 bg-[#0F0A0C]"
        >
          <SheetTitle className="sr-only">Admin navigation</SheetTitle>
          {SidebarInner}
        </SheetContent>
      </Sheet>

      {/* Main content column */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 px-4 sm:px-6 h-16 bg-card border-b border-border">
          <div className="flex items-center gap-3 min-w-0">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-foreground hover:bg-accent"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu className="size-5" />
            </Button>

            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((crumb, i) => (
                  <span
                    key={`${crumb.label}-${i}`}
                    className="flex items-center gap-1.5"
                  >
                    {i > 0 && <BreadcrumbSeparator />}
                    <BreadcrumbItem>
                      {crumb.href ? (
                        <BreadcrumbLink asChild>
                          <Link
                            href={crumb.href}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            {crumb.label}
                          </Link>
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage className="text-foreground font-medium">
                          {crumb.label}
                        </BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                  </span>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center gap-2">
            <NotificationBell />

            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center gap-2 rounded-full pl-1 pr-2 sm:pr-3 py-1 hover:bg-accent transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Open user menu"
              >
                <Avatar className="size-8 border border-[#D4AF37]/40 bg-[#D4AF37]/15">
                  <AvatarFallback className="bg-transparent text-[#D4AF37] text-xs font-bold">
                    {getInitials(user?.name, user?.email)}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline text-sm font-medium text-foreground max-w-[12rem] truncate">
                  {user?.name || user?.email || "Admin"}
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
              <DropdownMenuLabel className="text-xs text-muted-foreground font-normal leading-relaxed">
                Signed in as
                <div className="text-foreground font-medium text-sm mt-0.5 truncate">
                  {user?.email || "admin@socialviens.com"}
                </div>
                {user?.role ? (
                  <span className="inline-block mt-1 text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#D4AF37]/15 text-[#B8860B] font-semibold">
                    {user.role}
                  </span>
                ) : null}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => signOut(router)}
                className="text-destructive focus:text-destructive cursor-pointer"
              >
                <LogOut className="size-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
