"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import Link from "next/link";
import {
  Building2,
  Stethoscope,
  Scale,
  Rocket,
  UtensilsCrossed,
  GraduationCap,
  ShoppingCart,
  Scissors,
  Dumbbell,
  Camera,
  TrendingUp,
  Palette,
  MapPin,
  ArrowRight,
  MessageCircle,
  Sparkles,
  ChevronDown,
  CheckCircle2,
  Loader2,
  Send,
  Star,
  Search,
  Target,
  MapPinned,
  Smartphone,
  Zap,
  ShieldCheck,
  Gauge,
  Link2,
  Layers,
  BarChart3,
  Users,
  Compass,
  PenTool,
  Award,
  Heart,
  Phone,
  Clock,
  Bell,
  RefreshCw,
  Code,
  Youtube,
  Film,
  Calendar,
  Quote,
  Briefcase,
  PieChart,
  DollarSign,
  Eye,
  type LucideIcon,
} from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import AnimatedHeading from "@/components/ui/animated-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  industryPages,
  type IndustryPage,
} from "@/lib/industry-data";

/* ──────────────────────────────────────────────────────────────────────── */
/*  Icon map — string name → Lucide component.                              */
/*  Keeping this in the client component lets industry-data.ts stay         */
/*  free of client-only React imports (server-safe).                        */
/* ──────────────────────────────────────────────────────────────────────── */

const ICON_MAP: Record<string, LucideIcon> = {
  Building2,
  Stethoscope,
  Scale,
  Rocket,
  UtensilsCrossed,
  GraduationCap,
  ShoppingCart,
  Scissors,
  Dumbbell,
  Camera,
  TrendingUp,
  Palette,
  MapPin,
  Search,
  Target,
  MapPinned,
  Smartphone,
  Zap,
  ShieldCheck,
  Gauge,
  Link2,
  Layers,
  BarChart3,
  Users,
  MessageCircle,
  Sparkles,
  Compass,
  PenTool,
  Award,
  Heart,
  Phone,
  Clock,
  Star,
  Bell,
  RefreshCw,
  Code,
  Youtube,
  Film,
  Calendar,
  Quote,
  Briefcase,
  PieChart,
  DollarSign,
  Eye,
};

function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Sparkles;
}

/**
 * Render an icon by name (string) without aliasing it to a capitalized
 * local inside the render body — which would trip the
 * `react-hooks/static-components` lint rule.
 */
function DynamicIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICON_MAP[name] ?? Sparkles;
  return <Icon className={className} />;
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  AnimatedCounter                                                         */
/* ──────────────────────────────────────────────────────────────────────── */

function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) =>
    decimals > 0 ? latest.toFixed(decimals) : Math.round(latest).toString(),
  );

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, {
        duration: 2,
        ease: [0.25, 0.46, 0.45, 0.94],
      });
      return controls.stop;
    }
  }, [inView, value, count]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Contact form section                                                    */
/* ──────────────────────────────────────────────────────────────────────── */

const WHATSAPP_NUMBER = "918178004800";

function MiniContactForm({
  category,
  title,
}: {
  category: string;
  title: string;
}) {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          message:
            form.message ||
            `Enquiry for ${title} (${category}). Please reach out.`,
        }),
      });
      if (!res.ok) throw new Error("Network response was not ok");
      setStatus("success");
      setForm({ name: "", email: "", phone: "", business: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const waMessage = encodeURIComponent(
    `Hi Social Viens, I'm interested in ${title} for my ${category} business. Please share details.`,
  );

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-strong gold-glow rounded-2xl p-8 text-center"
      >
        <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-cream mb-2">Thank you!</h3>
        <p className="text-sv-muted mb-6">
          Your enquiry is in. Our team will reach out within 2 hours during
          business hours.
        </p>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-emerald-500/30 text-emerald-400 font-semibold text-sm hover:bg-emerald-500/10 transition-all"
        >
          <MessageCircle className="w-4 h-4" />
          Or WhatsApp us now
        </a>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="block mx-auto mt-4 text-xs text-sv-muted hover:text-gold transition-colors"
        >
          Send another enquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-strong rounded-2xl p-6 md:p-8 border border-gold/15"
    >
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs text-sv-muted uppercase tracking-wider mb-1.5">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-sv-surface/60 border border-gold/15 rounded-lg px-4 py-2.5 text-cream text-sm focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-xs text-sv-muted uppercase tracking-wider mb-1.5">
            Phone *
          </label>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full bg-sv-surface/60 border border-gold/15 rounded-lg px-4 py-2.5 text-cream text-sm focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all"
            placeholder="+91 ..."
          />
        </div>
        <div>
          <label className="block text-xs text-sv-muted uppercase tracking-wider mb-1.5">
            Email *
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-sv-surface/60 border border-gold/15 rounded-lg px-4 py-2.5 text-cream text-sm focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all"
            placeholder="you@business.com"
          />
        </div>
        <div>
          <label className="block text-xs text-sv-muted uppercase tracking-wider mb-1.5">
            Business
          </label>
          <input
            type="text"
            value={form.business}
            onChange={(e) => setForm({ ...form, business: e.target.value })}
            className="w-full bg-sv-surface/60 border border-gold/15 rounded-lg px-4 py-2.5 text-cream text-sm focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all"
            placeholder="Your business name"
          />
        </div>
      </div>
      <div className="mb-5">
        <label className="block text-xs text-sv-muted uppercase tracking-wider mb-1.5">
          Message (optional)
        </label>
        <textarea
          rows={3}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full bg-sv-surface/60 border border-gold/15 rounded-lg px-4 py-2.5 text-cream text-sm focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all resize-none"
          placeholder={`Tell us about your ${category} business goals...`}
        />
      </div>

      {status === "error" && (
        <p className="text-rose-400 text-xs mb-4">
          Something went wrong. Please try again or WhatsApp us directly.
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-gold to-bronze text-sv-bg font-bold text-sm hover:shadow-lg hover:shadow-gold/20 hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Get Free Strategy Session
            </>
          )}
        </button>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full glass border border-emerald-500/30 text-emerald-400 font-semibold text-sm hover:bg-emerald-500/10 transition-all"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp Us
        </a>
      </div>
    </form>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Case study section                                                      */
/* ──────────────────────────────────────────────────────────────────────── */

function CaseStudyBlock({ caseStudy }: { caseStudy: NonNullable<IndustryPage["caseStudy"]> }) {
  return (
    <section className="relative py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-medium tracking-[0.25em] uppercase mb-6">
            <Award className="w-3.5 h-3.5" />
            Case Study
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-cream mb-4">
            Real results for a{" "}
            <span className="text-gold-gradient">real client</span>
          </h2>
          <p className="text-sv-muted text-lg">
            We do not share client names without consent — but we share the
            numbers that matter.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-strong rounded-3xl p-8 md:p-12 border border-gold/15 gold-glow relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-gold/10 rounded-full blur-[110px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-bronze/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gold/15 border border-gold/20 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-cream">
                    {caseStudy.client}
                  </h3>
                  <p className="text-xs text-sv-muted uppercase tracking-wider mt-0.5">
                    Engagement summary
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <p className="text-xs text-gold uppercase tracking-wider font-semibold mb-2">
                    Challenge
                  </p>
                  <p className="text-sv-muted leading-relaxed text-sm md:text-base">
                    {caseStudy.challenge}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gold uppercase tracking-wider font-semibold mb-2">
                    Solution
                  </p>
                  <p className="text-sv-muted leading-relaxed text-sm md:text-base">
                    {caseStudy.solution}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:border-l lg:border-gold/10 lg:pl-12">
              <p className="text-xs text-gold uppercase tracking-wider font-semibold mb-4">
                Results
              </p>
              <ul className="space-y-4">
                {caseStudy.results.map((result, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <span className="text-cream text-sm md:text-base leading-relaxed">
                      {result}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Related industries grid                                                 */
/* ──────────────────────────────────────────────────────────────────────── */

function RelatedIndustriesGrid({ industry }: { industry: IndustryPage }) {
  const related = industry.relatedServices
    .map((slug) => industryPages.find((p) => p.slug === slug))
    .filter((p): p is IndustryPage => Boolean(p))
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="relative py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-medium tracking-[0.25em] uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Related Industries
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-cream mb-4">
            Explore other{" "}
            <span className="text-gold-gradient">industries we serve</span>
          </h2>
          <p className="text-sv-muted text-lg">
            Same depth of category expertise across every vertical we work in.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {related.map((relatedPage, i) => {
            const Icon = getIcon(relatedPage.icon);
            return (
              <motion.div
                key={relatedPage.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link
                  href={`/${relatedPage.slug}`}
                  className="group block glass rounded-2xl p-6 border border-gold/10 hover:border-gold/30 card-hover h-full relative before:absolute before:inset-0 before:rounded-2xl before:border-t-2 before:border-transparent hover:before:border-gold before:transition-all before:duration-500 before:z-10 before:pointer-events-none"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/15 flex items-center justify-center mb-5 group-hover:bg-gold/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <p className="text-[10px] text-gold/70 uppercase tracking-wider font-semibold mb-1">
                    {relatedPage.category}
                  </p>
                  <h3 className="text-base font-bold text-cream mb-2 group-hover:text-gold transition-colors duration-300">
                    {relatedPage.title}
                  </h3>
                  <p className="text-sm text-sv-muted leading-relaxed mb-4 line-clamp-2">
                    {relatedPage.heroSubtitle}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-gold text-sm font-medium group-hover:gap-2.5 transition-all duration-300">
                    Learn More
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Main component                                                          */
/* ──────────────────────────────────────────────────────────────────────── */

export default function IndustryLandingPage({
  industry,
}: {
  industry: IndustryPage;
}) {
  const breadcrumbs = [
    { label: "Industries", href: "/#industries" },
    { label: industry.category },
  ];

  return (
    <PageShell breadcrumbs={breadcrumbs}>
      {/* ===== HERO ===== */}
      <section className="relative pt-12 md:pt-16 pb-12 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-gold/10 rounded-full blur-[120px] animate-float pointer-events-none" />
        <div
          className="absolute top-20 right-1/4 w-72 h-72 bg-bronze/10 rounded-full blur-[110px] animate-float pointer-events-none"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-64 h-64 bg-emerald-500/[0.05] rounded-full blur-[100px] animate-float pointer-events-none"
          style={{ animationDelay: "4s" }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-medium tracking-[0.25em] uppercase mb-6"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {industry.category} Industry
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-gold/15 to-bronze/10 border border-gold/15 mb-6"
            >
              <DynamicIcon name={industry.icon} className="w-10 h-10 text-gold" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-gold-gradient">{industry.h1}</span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-sv-muted text-lg md:text-xl leading-relaxed"
            >
              {industry.heroSubtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-gold to-bronze text-sv-bg font-bold text-sm hover:shadow-lg hover:shadow-gold/20 hover:scale-[1.02] transition-all duration-300"
              >
                Get Free Strategy Session
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full glass border border-gold/30 text-gold font-semibold text-sm hover:bg-gold/10 hover:border-gold/50 transition-all duration-300"
              >
                View All Services
                <Sparkles className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Industry cover image banner */}
          {industry.coverImage && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="relative max-w-5xl mx-auto mt-12 rounded-3xl overflow-hidden glass border border-gold/15 group"
            >
              <div className="relative h-56 md:h-80">
                <img
                  src={industry.coverImage}
                  alt={`${industry.title} — premium marketing showcase`}
                  className="object-cover w-full h-full transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sv-bg/85 via-sv-bg/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 text-left">
                  <p className="text-gold text-xs tracking-[0.25em] uppercase mb-2 font-semibold">
                    {industry.category} · Delhi NCR
                  </p>
                  <h2 className="text-xl md:text-3xl font-bold text-cream leading-tight">
                    Premium {industry.title.toLowerCase()} crafted for measurable growth
                  </h2>
                </div>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="hero-gradient-line max-w-md mx-auto mt-12"
          />
        </div>
      </section>

      {/* ===== OVERVIEW + STATS CARD ===== */}
      <section className="relative py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-medium tracking-[0.25em] uppercase mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Overview
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-cream mb-6 leading-tight">
                {industry.overviewTitle}
              </h2>
              <p className="text-sv-muted leading-relaxed whitespace-pre-line">
                {industry.overviewText}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="glass-strong rounded-3xl p-8 md:p-10 border border-gold/15 gold-glow relative overflow-hidden lg:sticky lg:top-32"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-[100px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-gold/15 border border-gold/20 flex items-center justify-center">
                    <DynamicIcon name={industry.icon} className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-cream font-bold text-lg">
                      {industry.category} by the numbers
                    </h3>
                    <p className="text-xs text-sv-muted">
                      The depth we bring to this vertical
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {industry.stats.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                      className="bg-sv-surface/40 border border-gold/10 rounded-2xl p-5 hover:border-gold/30 hover:bg-sv-surface/60 transition-all duration-300"
                    >
                      <p className="text-3xl md:text-4xl font-bold text-gold-gradient mb-1">
                        <AnimatedCounter
                          value={stat.value}
                          suffix={stat.suffix}
                          decimals={Number.isInteger(stat.value) ? 0 : 1}
                        />
                      </p>
                      <p className="text-xs text-sv-muted">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="relative py-16 md:py-24 bg-gradient-maroon">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-medium tracking-[0.25em] uppercase mb-6">
              <Star className="w-3.5 h-3.5" />
              Why Choose Us
            </div>
            <AnimatedHeading
              text1={`Why ${industry.category} Businesses`}
              text2="Choose Us"
            />
            <p className="text-sv-muted text-lg leading-relaxed mt-2">
              We know the {industry.category.toLowerCase()} vertical — and we
              prove it in every engagement.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industry.whyChooseUs.map((item, i) => {
              const Icon = getIcon(item.icon);
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="glass rounded-2xl p-6 border border-gold/10 hover:border-gold/30 card-hover h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/15 flex items-center justify-center mb-5 hover:bg-gold/20 transition-colors">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="text-lg font-bold text-cream mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-sv-muted leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== PROCESS (horizontal timeline) ===== */}
      <section className="relative py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-medium tracking-[0.25em] uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Our Process
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-cream mb-4">
              How we deliver{" "}
              <span className="text-gold-gradient">{industry.title}</span>
            </h2>
            <p className="text-sv-muted text-lg">
              A proven 4-step process — transparent, accountable, and built to
              deliver measurable results.
            </p>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {industry.processSteps.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="relative"
                >
                  <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 rounded-full bg-sv-bg border-2 border-gold/30 flex-shrink-0 relative z-10">
                    <span className="text-3xl font-bold text-gold-gradient">
                      {step.step}
                    </span>
                  </div>

                  <div className="glass rounded-2xl p-6 border border-gold/10 hover:border-gold/30 card-hover h-full text-center lg:text-left">
                    <h3 className="text-lg font-bold text-cream mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm text-sv-muted leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== BENEFITS ===== */}
      <section className="relative py-16 md:py-24 bg-gradient-maroon">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-medium tracking-[0.25em] uppercase mb-6">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Benefits
            </div>
            <AnimatedHeading
              text1="What You Get With"
              text2={`Our ${industry.category} Service`}
            />
            <p className="text-sv-muted text-lg leading-relaxed mt-2">
              Outcomes, not deliverables. Every benefit below is tied to
              measurable business impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industry.benefits.map((benefit, i) => {
              const Icon = getIcon(benefit.icon);
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="glass rounded-2xl p-6 border border-gold/10 hover:border-gold/30 card-hover h-full"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-gold/10 border border-gold/15 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-cream mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-sv-muted leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== INDUSTRY STATS STRIP ===== */}
      <section className="relative py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-medium tracking-[0.25em] uppercase mb-4">
              <TrendingUp className="w-3.5 h-3.5" />
              {industry.category} Impact
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-cream">
              Real results for{" "}
              <span className="text-gold-gradient">
                {industry.category.toLowerCase()} businesses
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {industry.stats.map((stat, i) => (
              <motion.div
                key={stat.label + "-strip"}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center glass rounded-2xl p-6 border border-gold/10 hover:border-gold/30 transition-all duration-300"
              >
                <p className="text-4xl md:text-5xl font-bold text-gold-gradient mb-2">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={Number.isInteger(stat.value) ? 0 : 1}
                  />
                </p>
                <p className="text-sm text-sv-muted">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CASE STUDY ===== */}
      {industry.caseStudy && <CaseStudyBlock caseStudy={industry.caseStudy} />}

      {/* ===== FAQ ===== */}
      <section className="relative py-16 md:py-24 bg-gradient-maroon">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-medium tracking-[0.25em] uppercase mb-6">
              <ChevronDown className="w-3.5 h-3.5" />
              Common Questions
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-cream mb-4">
              {industry.category}{" "}
              <span className="text-gold-gradient">Marketing FAQs</span>
            </h2>
            <p className="text-sv-muted text-lg">
              Straight answers to the questions {industry.category.toLowerCase()}{" "}
              businesses ask us most.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {industry.faqs.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`faq-${idx}`}
                  className="glass rounded-xl border-0 px-5 md:px-6 data-[state=open]:gold-glow data-[state=open]:border-gold/20 transition-all duration-300 group"
                >
                  <AccordionTrigger className="text-left text-cream hover:text-gold hover:no-underline py-5 text-base md:text-lg font-medium group-data-[state=open]:text-gold transition-colors duration-300">
                    <span className="flex items-start gap-3">
                      <span className="w-7 h-7 shrink-0 rounded-lg bg-gold/10 border border-gold/15 flex items-center justify-center text-gold text-xs font-bold mt-0.5 group-data-[state=open]:bg-gold/20 group-data-[state=open]:border-gold/30 transition-all duration-300">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1">{faq.q}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sv-muted leading-relaxed pb-5 pl-10 md:pl-[2.75rem]">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* ===== RELATED INDUSTRIES ===== */}
      <RelatedIndustriesGrid industry={industry} />

      {/* ===== FINAL CTA ===== */}
      <section className="relative py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-3xl"
          >
            <div className="glass-strong gold-glow-strong rounded-3xl p-8 md:p-12 relative">
              <div className="absolute top-0 right-0 w-72 h-72 bg-gold/10 rounded-full blur-[100px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-bronze/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <Sparkles className="w-8 h-8 text-gold mx-auto mb-3" />
                  <h2 className="text-3xl md:text-4xl font-bold text-cream mb-3">
                    Ready to Grow Your{" "}
                    <span className="text-gold-gradient">
                      {industry.category} Business?
                    </span>
                  </h2>
                  <p className="text-sv-muted text-lg max-w-xl mx-auto">
                    Book a free 45-minute strategy session with our{" "}
                    {industry.category.toLowerCase()} team. We&apos;ll audit
                    your current presence and build a roadmap to growth.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-gold to-bronze text-sv-bg font-bold text-sm hover:shadow-lg hover:shadow-gold/20 hover:scale-[1.02] transition-all duration-300"
                  >
                    Book Free Strategy Session
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      `Hi Social Viens, I'm a ${industry.category.toLowerCase()} business interested in ${industry.title}.`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full glass border border-emerald-500/30 text-emerald-400 font-semibold text-sm hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-all duration-300"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== CONTACT FORM ===== */}
      <section className="relative py-16 md:py-24 bg-gradient-maroon">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-medium tracking-[0.25em] uppercase mb-6">
              <Send className="w-3.5 h-3.5" />
              Get In Touch
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-cream mb-3">
              Start with a{" "}
              <span className="text-gold-gradient">free consultation</span>
            </h2>
            <p className="text-sv-muted text-lg max-w-xl mx-auto">
              Tell us about your {industry.category.toLowerCase()} business and
              goals. We&apos;ll respond within 2 hours during business hours.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <MiniContactForm
              category={industry.category}
              title={industry.title}
            />
          </motion.div>
        </div>
      </section>
    </PageShell>
  );
}
