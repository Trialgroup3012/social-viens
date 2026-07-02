"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";

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
  const [email, setEmail] = useState("admin@socialviens.com");
  const [password, setPassword] = useState("admin123");
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
    <div className="admin-light min-h-screen bg-background flex flex-col items-center justify-center px-4 py-10">
      {/* Logo / brand */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-block">
          <span className="font-sans text-2xl font-black tracking-tight text-foreground">
            SOCIAL <span className="text-[#D4AF37]">VIENS</span>
          </span>
        </Link>
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mt-1.5">
          Admin Console
        </p>
      </div>

      <Card className="w-full max-w-md shadow-md border-border bg-card">
        <CardHeader className="space-y-1.5 pb-2">
          <CardTitle className="text-2xl font-bold text-foreground">
            Sign in
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access the dashboard.
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-foreground text-sm font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@socialviens.com"
                  className="pl-9 bg-background text-foreground border-border"
                  disabled={loading}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-foreground text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-9 pr-9 bg-background text-foreground border-border"
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-foreground rounded transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-md px-3 py-2"
              >
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading || !mounted}
              className="w-full bg-[#D4AF37] text-[#0F0A0C] hover:bg-[#B8860B] font-semibold h-10"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-5 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              <span className="font-medium text-foreground/80">Demo credentials:</span>{" "}
              <code className="px-1.5 py-0.5 rounded bg-muted text-foreground font-mono text-[11px]">
                admin@socialviens.com
              </code>{" "}
              /{" "}
              <code className="px-1.5 py-0.5 rounded bg-muted text-foreground font-mono text-[11px]">
                admin123
              </code>
            </p>
          </div>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground mt-6 text-center max-w-sm">
        Authorized personnel only. By signing in you acknowledge that all actions
        are logged.
      </p>
    </div>
  );
}
