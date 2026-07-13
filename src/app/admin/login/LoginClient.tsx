"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";

const ADMIN_TOKEN_KEY = "admin_token";
const ADMIN_USER_KEY = "admin_user";

// useSyncExternalStore-based hydration guard — avoids setState-in-effect.
const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function LoginClient() {
  const router = useRouter();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // After mount, if a token is already present, redirect straight to /admin.
  useEffect(() => {
    const token = localStorage.getItem(ADMIN_TOKEN_KEY);
    if (token) {
      router.replace("/admin");
    }
  }, [router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Invalid credentials.");
        setLoading(false);
        return;
      }

      localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
      localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(data.user));
      // Use a hard navigation so the new admin layout mounts fresh.
      window.location.href = "/admin";
    } catch (err: any) {
      setError(err?.message ?? "Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="admin-light min-h-screen bg-[#f6f3ee] px-4 py-4 text-[#2b2b32] sm:px-6 sm:py-6 lg:flex lg:items-center lg:justify-center lg:p-8">
      <main className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_24px_70px_rgba(43,32,22,0.12)] lg:min-h-[640px] lg:grid-cols-[0.92fr_1.08fr]">
        <section className="relative hidden flex-col justify-between overflow-hidden bg-[#211719] p-10 text-[#f8f4ed] lg:flex">
          <div className="absolute inset-x-0 top-0 h-1 bg-[#d4af37]" aria-hidden="true" />

          <Link
            href="/"
            className="inline-flex w-fit items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5d680] focus-visible:ring-offset-4 focus-visible:ring-offset-[#211719]"
          >
            <span className="font-sans text-xl font-black tracking-[-0.04em]">
              SOCIAL <span className="text-[#f5d680]">VIENS</span>
            </span>
          </Link>

          <div className="max-w-sm">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#f5d680]">
              Admin workspace
            </p>
            <h1 className="text-balance text-4xl font-bold leading-[1.08] tracking-[-0.04em]">
              Your team&apos;s command centre.
            </h1>
            <p className="mt-5 max-w-xs text-base leading-7 text-[#d9d1c7]">
              Manage leads, services and site content from one protected workspace.
            </p>
          </div>

          <div className="flex items-center gap-3 border-t border-white/15 pt-6 text-sm text-[#d9d1c7]">
            <ShieldCheck className="size-5 shrink-0 text-[#f5d680]" aria-hidden="true" />
            <span>Private access for authorised team members.</span>
          </div>
        </section>

        <section className="flex min-h-[calc(100vh-2rem)] flex-col px-6 py-7 sm:min-h-[calc(100vh-3rem)] sm:px-10 sm:py-10 lg:min-h-0 lg:px-14 lg:py-12">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              className="font-sans text-lg font-black tracking-[-0.04em] text-[#2b2b32] transition-colors hover:text-[#8e7013] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] focus-visible:ring-offset-4 lg:hidden"
            >
              SOCIAL <span className="text-[#b8860b]">VIENS</span>
            </Link>
            <span className="hidden lg:block" aria-hidden="true" />
            <Link
              href="/"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#655c55] transition-colors hover:text-[#2b2b32] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] focus-visible:ring-offset-4"
            >
              Back to website
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="my-auto w-full max-w-md py-12 lg:py-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8e7013]">
              Secure sign in
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-[#2b2b32] sm:text-[2.15rem]">
              Welcome back
            </h2>
            <p className="mt-3 text-base leading-7 text-[#655c55]">
              Use your authorised account to open the admin dashboard.
            </p>

            <form onSubmit={handleSubmit} className="mt-9 space-y-5" noValidate>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-[#2b2b32]">
                  Email address
                </Label>
                <div className="relative">
                  <Mail
                    className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#726a63]"
                    aria-hidden="true"
                  />
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="h-12 border-black/15 bg-white pl-11 text-base text-[#2b2b32] shadow-none placeholder:text-[#8a8179] focus-visible:border-[#b8860b] focus-visible:ring-[#d4af37]/30"
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-[#2b2b32]">
                  Password
                </Label>
                <div className="relative">
                  <Lock
                    className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#726a63]"
                    aria-hidden="true"
                  />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="h-12 border-black/15 bg-white pl-11 pr-12 text-base text-[#2b2b32] shadow-none placeholder:text-[#8a8179] focus-visible:border-[#b8860b] focus-visible:ring-[#d4af37]/30"
                    disabled={loading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-md text-[#726a63] transition-colors hover:bg-[#f5f0e8] hover:text-[#2b2b32] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div
                  role="alert"
                  className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive"
                >
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading || !mounted}
                className="h-12 w-full bg-[#d4af37] text-base font-bold text-[#201719] shadow-none transition-colors hover:bg-[#b8860b] focus-visible:ring-[#d4af37]"
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Signing in…
                  </>
                ) : (
                  <>
                    Open dashboard
                    <ArrowRight className="size-4" />
                  </>
                )}
              </Button>
            </form>
          </div>

          <p className="flex items-start gap-2 text-sm leading-6 text-[#655c55]">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#8e7013]" aria-hidden="true" />
            This area is restricted to authorised SOCIAL VIENS personnel.
          </p>
        </section>
      </main>
    </div>
  );
}
