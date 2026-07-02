"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Home,
  ArrowRight,
  Search,
  Sparkles,
  Compass,
  Briefcase,
  Image as ImageIcon,
  PenTool,
  Tags,
  Mail,
} from "lucide-react";

const popularLinks = [
  { href: "/services", label: "Services", desc: "Everything we do", icon: Briefcase },
  { href: "/portfolio", label: "Portfolio", desc: "Our recent work", icon: ImageIcon },
  { href: "/blog", label: "Blog", desc: "Growth insights", icon: PenTool },
  { href: "/pricing", label: "Pricing", desc: "Plans & packages", icon: Tags },
  { href: "/contact", label: "Contact", desc: "Get in touch", icon: Mail },
];

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col bg-sv-bg relative overflow-hidden">
      {/* Floating orbs */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-gold/10 rounded-full blur-[120px] animate-float pointer-events-none" />
      <div
        className="absolute top-20 right-1/4 w-72 h-72 bg-bronze/10 rounded-full blur-[110px] animate-float pointer-events-none"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 w-64 h-64 bg-rose-500/[0.05] rounded-full blur-[100px] animate-float pointer-events-none"
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
        <div className="max-w-4xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-medium tracking-[0.25em] uppercase mb-8"
          >
            <Compass className="w-3.5 h-3.5" />
            Lost in the void
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[8rem] md:text-[12rem] lg:text-[14rem] font-bold leading-none mb-2"
          >
            <span className="text-gold-gradient">404</span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="hero-gradient-line max-w-md mx-auto mb-8"
          />

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-cream mb-4"
          >
            Page Not Found
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-sv-muted text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10"
          >
            The page you&apos;re looking for has drifted into the digital
            ether. Let&apos;s get you back on track — try one of the routes
            below or head home.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-gold to-bronze text-sv-bg font-bold text-sm hover:shadow-lg hover:shadow-gold/20 hover:scale-[1.02] transition-all duration-300"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full glass border border-gold/30 text-gold font-semibold text-sm hover:bg-gold/10 hover:border-gold/50 transition-all duration-300"
            >
              View Our Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Popular pages */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Search className="w-4 h-4 text-gold/60" />
              <p className="text-xs tracking-[0.2em] text-gold/60 uppercase">
                Popular destinations
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-4xl mx-auto">
              {popularLinks.map((link, i) => {
                const Icon = link.icon;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + i * 0.08, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      className="group block glass rounded-2xl p-4 md:p-5 border border-gold/10 hover:border-gold/30 hover:bg-gold/5 card-hover h-full text-left"
                    >
                      <div className="w-9 h-9 rounded-lg bg-gold/10 border border-gold/15 flex items-center justify-center mb-3 group-hover:bg-gold/20 transition-colors">
                        <Icon className="w-4 h-4 text-gold" />
                      </div>
                      <p className="text-cream font-semibold text-sm mb-0.5 group-hover:text-gold transition-colors">
                        {link.label}
                      </p>
                      <p className="text-xs text-sv-muted">{link.desc}</p>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Sparkles footer line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
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
