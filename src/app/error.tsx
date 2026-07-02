"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  RefreshCw,
  Home,
  ArrowRight,
  Sparkles,
  Mail,
} from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to console for now — in production this would go to Sentry/Logflare.
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col bg-sv-bg relative overflow-hidden">
      {/* Floating orbs */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-rose-500/10 rounded-full blur-[120px] animate-float pointer-events-none" />
      <div
        className="absolute top-20 right-1/4 w-72 h-72 bg-gold/10 rounded-full blur-[110px] animate-float pointer-events-none"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 w-64 h-64 bg-bronze/10 rounded-full blur-[100px] animate-float pointer-events-none"
        style={{ animationDelay: "4s" }}
      />

      {/* Minimal top brand */}
      <div className="relative z-10 pt-8 px-6">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-gold to-bronze flex items-center justify-center text-sv-bg font-bold text-sm shadow-lg shadow-gold/20 group-hover:scale-105 transition-transform">
            SV
          </div>
          <span className="text-cream font-bold tracking-[0.2em] text-sm">
            SOCIAL VIENS
          </span>
        </Link>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-6 py-16 relative z-10">
        <div className="max-w-3xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium tracking-[0.25em] uppercase mb-8"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Error Occurred
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            <span className="text-cream">Something</span>{" "}
            <span className="text-gold-gradient">Went Wrong</span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="hero-gradient-line max-w-md mx-auto mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-sv-muted text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8"
          >
            An unexpected error occurred while rendering this page. Our team has
            been notified. Please try again, or head back to safety.
          </motion.p>

          {/* Error message box */}
          {error?.message && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="glass rounded-2xl p-5 border border-rose-500/20 max-w-2xl mx-auto mb-10 text-left"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs tracking-[0.15em] uppercase text-rose-400/70 mb-1">
                    Error details
                  </p>
                  <p className="text-sm text-sv-muted font-mono break-words leading-relaxed">
                    {error.message}
                  </p>
                  {error.digest && (
                    <p className="text-xs text-sv-muted/50 mt-2 font-mono">
                      Digest: {error.digest}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
          >
            <button
              onClick={() => reset()}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-gold to-bronze text-sv-bg font-bold text-sm hover:shadow-lg hover:shadow-gold/20 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full glass border border-gold/30 text-gold font-semibold text-sm hover:bg-gold/10 hover:border-gold/50 transition-all duration-300"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
          </motion.div>

          {/* Secondary help */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="pt-8 border-t border-gold/10 max-w-xl mx-auto"
          >
            <p className="text-xs text-sv-muted/70 mb-4">
              If the issue persists, please reach out — we typically respond in
              under 2 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-1.5 text-gold hover:text-gold-light text-sm font-medium transition-colors"
              >
                Contact our team
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href="mailto:socialviens@gmail.com"
                className="inline-flex items-center justify-center gap-1.5 text-sv-muted hover:text-gold text-sm font-medium transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                socialviens@gmail.com
              </a>
            </div>
          </motion.div>

          {/* Sparkles footer line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-16 flex items-center justify-center gap-2 text-xs text-sv-muted/60"
          >
            <Sparkles className="w-3 h-3 text-gold/40" />
            <span className="tracking-[0.2em] uppercase">
              SOCIAL VIENS — Premium Digital Marketing
            </span>
            <Sparkles className="w-3 h-3 text-gold/40" />
          </motion.div>
        </div>
      </div>
    </main>
  );
}
