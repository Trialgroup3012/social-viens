"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Star,
  Quote,
  ArrowRight,
  Play,
  TrendingUp,
  Users,
  Award,
  Target,
  Sparkles,
} from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import {
  testimonials,
  testimonialIndustries,
  testimonialStats,
  type TestimonialIndustry,
} from "@/lib/testimonials-data";

// Animated counter — mirrors Results.tsx pattern.
function AnimatedCounter({
  value,
  suffix = "",
  isFloat = false,
}: {
  value: number;
  suffix?: string;
  isFloat?: boolean;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // easeOutExpo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setCount(value * eased);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setCount(value);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  const display = isFloat ? count.toFixed(1) : Math.round(count);
  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <div className={`flex gap-1 ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating
              ? "fill-gold text-gold"
              : "fill-sv-muted/20 text-sv-muted/20"
          }`}
        />
      ))}
    </div>
  );
}

function getIndustryColor(industry: TestimonialIndustry) {
  switch (industry) {
    case "Real Estate":
      return {
        bg: "bg-amber-500/15",
        text: "text-amber-400",
        border: "border-amber-500/20",
        gradient: "from-amber-900/40 to-amber-700/20",
      };
    case "Healthcare":
      return {
        bg: "bg-emerald-500/15",
        text: "text-emerald-400",
        border: "border-emerald-500/20",
        gradient: "from-emerald-900/40 to-emerald-700/20",
      };
    case "Law":
      return {
        bg: "bg-sky-500/15",
        text: "text-sky-400",
        border: "border-sky-500/20",
        gradient: "from-sky-900/40 to-sky-700/20",
      };
    case "E-commerce":
      return {
        bg: "bg-rose-500/15",
        text: "text-rose-400",
        border: "border-rose-500/20",
        gradient: "from-rose-900/40 to-rose-700/20",
      };
    case "Restaurant":
      return {
        bg: "bg-orange-500/15",
        text: "text-orange-400",
        border: "border-orange-500/20",
        gradient: "from-orange-900/40 to-orange-700/20",
      };
    case "Beauty":
      return {
        bg: "bg-pink-500/15",
        text: "text-pink-400",
        border: "border-pink-500/20",
        gradient: "from-pink-900/40 to-pink-700/20",
      };
    default:
      return {
        bg: "bg-gold/15",
        text: "text-gold",
        border: "border-gold/20",
        gradient: "from-gold/20 to-bronze/10",
      };
  }
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

export default function TestimonialsClient() {
  const [activeIndustry, setActiveIndustry] = useState<
    TestimonialIndustry | "All"
  >("All");

  const filtered = useMemo(() => {
    if (activeIndustry === "All") return testimonials;
    return testimonials.filter((t) => t.industry === activeIndustry);
  }, [activeIndustry]);

  const featured = filtered.find((t) => t.featured) ?? filtered[0];
  const regular = filtered.filter((t) => t.id !== featured?.id);
  const videoTestimonials = testimonials.filter((t) => t.hasVideo).slice(0, 3);

  const statsConfig = [
    { ...testimonialStats[0], icon: Users },
    { ...testimonialStats[1], icon: Star },
    { ...testimonialStats[2], icon: Award },
    { ...testimonialStats[3], icon: TrendingUp },
  ];

  return (
    <PageShell breadcrumbs={[{ label: "Testimonials" }]}>
      {/* ===== Hero ===== */}
      <section className="relative pt-12 md:pt-16 pb-12 overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-gold/10 rounded-full blur-[120px] animate-float pointer-events-none" />
        <div
          className="absolute top-20 right-1/4 w-72 h-72 bg-bronze/10 rounded-full blur-[110px] animate-float pointer-events-none"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-64 h-64 bg-rose-500/[0.06] rounded-full blur-[100px] animate-float pointer-events-none"
          style={{ animationDelay: "4s" }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-medium tracking-[0.25em] uppercase mb-6"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Testimonials
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-cream">Client</span>{" "}
              <span className="text-gold-gradient">Success Stories</span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-sv-muted text-lg md:text-xl leading-relaxed"
            >
              We don&apos;t just promise results — we deliver them. Here&apos;s
              what 50+ businesses across 6 industries say about working with
              Social Viens.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="hero-gradient-line max-w-md mx-auto mt-12"
          />
        </div>
      </section>

      {/* ===== Stats strip ===== */}
      <section className="relative pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {statsConfig.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="glass rounded-2xl p-6 text-center border border-gold/10 hover:border-gold/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gold-gradient mb-1">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      isFloat={stat.isFloat}
                    />
                  </div>
                  <p className="text-sv-muted text-xs md:text-sm tracking-wide uppercase">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ===== Industry filter pills ===== */}
      <section className="relative pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-2"
          >
            {testimonialIndustries.map((ind) => {
              const isActive = activeIndustry === ind;
              return (
                <button
                  key={ind}
                  onClick={() => setActiveIndustry(ind)}
                  className={`
                    relative px-5 py-2.5 rounded-full text-sm font-medium
                    transition-all duration-300 cursor-pointer border
                    ${
                      isActive
                        ? "bg-gold/15 text-gold border-gold/20 shadow-lg"
                        : "bg-sv-surface/50 text-sv-muted border-transparent hover:border-gold/10 hover:text-cream"
                    }
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeIndustry"
                      className="absolute inset-0 rounded-full border border-current/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative">{ind}</span>
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ===== Featured testimonial ===== */}
      <section className="relative pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatePresence mode="wait">
            {featured && (
              <motion.div
                key={`featured-${featured.id}-${activeIndustry}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="glass-strong gold-glow-strong rounded-3xl overflow-hidden border border-gold/15">
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Left: gradient + play overlay */}
                    <div className="relative min-h-[300px] lg:min-h-[440px] overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${getIndustryColor(featured.industry).gradient} flex items-center justify-center`}
                      >
                        <Quote className="w-32 h-32 text-white/5" />
                        <div className="absolute inset-0 pattern-dots opacity-30" />
                      </div>
                      {/* Video play overlay */}
                      {featured.hasVideo && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button
                            aria-label={`Watch ${featured.name}'s story`}
                            className="group/play relative w-20 h-20 rounded-full glass-strong border-2 border-gold/40 flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer"
                          >
                            <span className="absolute inset-0 rounded-full bg-gold/20 animate-ping opacity-50" />
                            <Play className="w-8 h-8 text-gold fill-gold ml-1 relative z-10" />
                          </button>
                        </div>
                      )}
                      <div className="absolute bottom-6 left-6 right-6">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getIndustryColor(featured.industry).bg} ${getIndustryColor(featured.industry).text} border ${getIndustryColor(featured.industry).border}`}
                        >
                          {featured.industry}
                        </span>
                      </div>
                    </div>

                    {/* Right: quote content */}
                    <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                      <Quote className="w-12 h-12 text-gold/30 fill-gold/10 mb-6" />
                      <Stars rating={featured.rating} className="mb-5" />
                      <blockquote className="text-cream/95 text-lg md:text-xl leading-relaxed font-light mb-6">
                        &ldquo;{featured.text}&rdquo;
                      </blockquote>
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/[0.08] border border-gold/20 mb-6 self-start">
                        <TrendingUp className="w-4 h-4 text-gold" />
                        <span className="text-sm font-semibold text-gold-gradient">
                          {featured.results}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 pt-6 border-t border-gold/10">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold via-gold-light to-bronze flex items-center justify-center text-sv-bg font-bold text-lg">
                          {getInitials(featured.name)}
                        </div>
                        <div>
                          <p className="text-cream font-semibold text-lg">
                            {featured.name}
                          </p>
                          <p className="text-sm text-sv-muted">
                            {featured.business}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ===== Testimonials masonry grid ===== */}
      <section className="relative pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`grid-${activeIndustry}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {regular.length === 0 ? (
                <div className="text-center py-16">
                  <Users className="w-12 h-12 text-sv-muted/30 mx-auto mb-4" />
                  <p className="text-sv-muted text-lg">
                    No testimonials in this industry yet.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regular.map((t, i) => {
                    const color = getIndustryColor(t.industry);
                    return (
                      <motion.div
                        key={t.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.07, duration: 0.5 }}
                        className="group"
                      >
                        <div className="glass rounded-2xl p-6 md:p-7 card-hover h-full flex flex-col border border-gold/10 hover:border-gold/30 relative overflow-hidden">
                          {/* Quote mark */}
                          <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                            <Quote className="w-12 h-12 text-gold" />
                          </div>

                          {/* Rating */}
                          <Stars rating={t.rating} className="mb-4" />

                          {/* Quote text */}
                          <p className="text-cream/90 leading-relaxed mb-6 text-sm md:text-base flex-1 relative z-10">
                            {t.text}
                          </p>

                          {/* Divider */}
                          <div className="gold-divider mb-5 opacity-50" />

                          {/* Client info */}
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gold/30 to-bronze/30 flex items-center justify-center text-gold font-bold text-sm border border-gold/20">
                              {getInitials(t.name)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-cream font-semibold text-sm">
                                {t.name}
                              </p>
                              <p className="text-xs text-sv-muted truncate">
                                {t.business}
                              </p>
                            </div>
                          </div>

                          {/* Footer: industry + results */}
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <span
                              className={`text-[10px] px-2.5 py-1 rounded-full font-bold ${color.bg} ${color.text} border ${color.border}`}
                            >
                              {t.industry}
                            </span>
                            <span className="text-xs font-semibold text-gold flex items-center gap-1">
                              <Target className="w-3 h-3" />
                              {t.results}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ===== Video testimonials ===== */}
      <section className="relative pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="hero-gradient-line max-w-xs mx-auto mb-12" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <p className="text-sm tracking-[0.3em] text-gold/70 uppercase mb-3">
              In Their Own Words
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-cream">
              Video <span className="text-gold-gradient">Testimonials</span>
            </h2>
            <p className="text-sv-muted mt-3 max-w-xl mx-auto">
              Hear directly from our clients about their experience working with
              the Social Viens team.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videoTestimonials.map((t, i) => {
              const color = getIndustryColor(t.industry);
              return (
                <motion.div
                  key={`video-${t.id}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group"
                >
                  <button
                    aria-label={`Watch ${t.name}'s story`}
                    className="block w-full text-left rounded-2xl overflow-hidden card-hover relative cursor-pointer"
                  >
                    <div
                      className={`relative aspect-video bg-gradient-to-br ${color.gradient} flex items-center justify-center overflow-hidden`}
                    >
                      <div className="absolute inset-0 pattern-dots opacity-30" />
                      {/* Avatar */}
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold via-gold-light to-bronze flex items-center justify-center text-sv-bg font-bold text-xs">
                          {getInitials(t.name)}
                        </div>
                        <span className="text-xs text-cream/80 font-medium">
                          {t.name}
                        </span>
                      </div>

                      {/* Play button */}
                      <div className="relative z-10">
                        <div className="w-16 h-16 rounded-full glass-strong border-2 border-gold/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Play className="w-7 h-7 text-gold fill-gold ml-1" />
                        </div>
                      </div>

                      {/* Industry badge */}
                      <div className="absolute bottom-4 left-4">
                        <span
                          className={`text-[10px] px-2.5 py-1 rounded-full font-bold ${color.bg} ${color.text} border ${color.border}`}
                        >
                          {t.industry}
                        </span>
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-sv-bg/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="glass p-4 border-t-0 rounded-b-2xl">
                      <p className="text-cream font-semibold text-sm mb-1">
                        Watch {t.name.split(" ")[0]}&apos;s Story
                      </p>
                      <p className="text-xs text-sv-muted">
                        {t.business} · {t.results}
                      </p>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-3xl"
          >
            <div className="glass-strong gold-glow-strong rounded-3xl p-8 md:p-12 text-center relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="relative z-10">
                <Sparkles className="w-8 h-8 text-gold mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-cream mb-4">
                  Join 50+ satisfied{" "}
                  <span className="text-gold-gradient">clients</span>
                </h2>
                <p className="text-sv-muted text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                  Ready to be our next success story? Book a free strategy
                  session and discover how we can transform your business —
                  just like we did for these clients.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-gold to-bronze text-sv-bg font-bold text-sm hover:shadow-lg hover:shadow-gold/20 hover:scale-[1.02] transition-all duration-300"
                  >
                    Get Your Free Strategy Session
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/blog"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full glass border border-gold/20 text-gold font-semibold text-sm hover:bg-gold/10 hover:border-gold/40 transition-all duration-300"
                  >
                    Read Our Insights
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageShell>
  );
}
