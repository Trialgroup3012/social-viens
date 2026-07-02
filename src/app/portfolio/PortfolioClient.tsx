"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Briefcase,
  Layers,
  Heart,
  CalendarClock,
} from "lucide-react";
import Link from "next/link";
import AnimatedHeading from "@/components/ui/animated-heading";
import {
  portfolioItems,
  FILTERS,
  BADGE_STYLES,
  type Category,
  type PortfolioItem,
} from "@/lib/portfolio-data";

/* ------------------------------------------------------------------ */
/*  Animated counter                                                   */
/* ------------------------------------------------------------------ */

function AnimatedCounter({
  value,
  suffix,
  inView,
  duration = 1800,
}: {
  value: number;
  suffix: string;
  inView: boolean;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, value, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Single portfolio card                                              */
/* ------------------------------------------------------------------ */

function PortfolioCard({
  item,
  index,
}: {
  item: PortfolioItem;
  index: number;
}) {
  const { Icon } = item;
  const badge = BADGE_STYLES[item.category];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.06, 0.4),
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group relative rounded-2xl overflow-hidden glass-premium cursor-pointer hover:-translate-y-1.5 hover:border-gold/35 hover:shadow-[0_24px_60px_-12px_rgba(212,175,55,0.25)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-[600ms] ease-out group-hover:scale-[1.05]"
          style={{ background: item.gradient }}
        />
        {item.image && (
          <Image
            src={item.image}
            alt={`${item.title} — ${item.client} case study`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.08]"
            priority={index < 3}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-sv-bg/80 via-sv-bg/10 to-transparent" />
        <div className="absolute inset-0 pattern-dots opacity-30 pointer-events-none" />
        {!item.image && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Icon className="w-28 h-28 text-cream/[0.08] group-hover:text-cream/[0.12] transition-colors duration-500" />
          </div>
        )}

        <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-20">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider glass border ${badge.badge}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
            {item.category}
          </span>
          <span className="w-9 h-9 rounded-full glass-strong flex items-center justify-center text-gold transition-all duration-300 group-hover:scale-110 group-hover:gold-glow group-hover:-translate-y-0.5">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>

        <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out">
          <div className="absolute inset-0 bg-gradient-to-t from-sv-bg via-sv-bg/85 to-sv-bg/30" />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-gold/30" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 p-5 pr-28 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out delay-75">
          <p className="text-gold text-sm font-medium mb-1">{item.client}</p>
          <h3 className="text-cream font-semibold text-lg leading-tight mb-1.5">
            {item.title}
          </h3>
          <p className="text-cream/70 text-xs leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </div>

        <div className="absolute bottom-4 right-4 z-30 transition-transform duration-300 group-hover:scale-105">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold glass border border-gold/30 text-gold">
            <ArrowUpRight className="w-3 h-3" />
            {item.result}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/*  Featured case study highlight                                      */
/* ------------------------------------------------------------------ */

function FeaturedHighlight({ item }: { item: PortfolioItem }) {
  const { Icon } = item;
  const badge = BADGE_STYLES[item.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8 }}
      className="grid lg:grid-cols-2 gap-8 items-center glass-strong rounded-3xl p-6 md:p-10 relative overflow-hidden"
    >
      {/* gold border top */}
      <div className="absolute top-0 left-0 right-0 hero-gradient-line" />

      {/* left — image */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden order-1">
        <div
          className="absolute inset-0"
          style={{ background: item.gradient }}
        />
        {item.image && (
          <Image
            src={item.image}
            alt={`${item.title} — ${item.client} featured case study`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-sv-bg/70 via-transparent to-transparent" />
        <div className="absolute inset-0 pattern-dots opacity-30 pointer-events-none" />
        {!item.image && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon className="w-40 h-40 text-cream/[0.1]" />
          </div>
        )}
        <div className="absolute top-5 left-5">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider glass border ${badge.badge}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
            Featured · {item.category}
          </span>
        </div>
        <div className="absolute bottom-5 right-5">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold glass border border-gold/40 text-gold">
            <ArrowUpRight className="w-4 h-4" />
            {item.result}
          </span>
        </div>
      </div>

      {/* right — content */}
      <div className="order-2">
        <p className="text-gold text-xs tracking-widest uppercase mb-3 font-semibold">
          Case Study Highlight
        </p>
        <p className="text-cream/60 text-sm mb-1.5">{item.client}</p>
        <h3 className="text-3xl md:text-4xl font-bold text-cream mb-4 leading-tight">
          {item.title}
        </h3>
        <p className="text-cream/70 text-base leading-relaxed mb-6">
          {item.description} We reimagined the entire digital experience,
          fusing editorial aesthetics with conversion-first architecture to
          deliver a portal that feels as luxurious as the listings it
          showcases.
        </p>

        {item.metrics && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            {item.metrics.map((m) => (
              <div
                key={m.label}
                className="text-center glass rounded-xl p-3 border border-gold/10"
              >
                <div className="text-xl md:text-2xl font-bold text-gold-gradient mb-0.5">
                  {m.value}
                </div>
                <p className="text-cream/50 text-[10px] md:text-xs uppercase tracking-wider">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        )}

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-gold to-gold-light text-sv-bg font-semibold text-sm hover:shadow-lg hover:shadow-gold/25 transition-all duration-300 ripple-effect group"
        >
          Start a project like this
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main client component                                              */
/* ------------------------------------------------------------------ */

export default function PortfolioClient() {
  const [activeFilter, setActiveFilter] = useState<"All" | Category>("All");

  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  const filtered =
    activeFilter === "All"
      ? portfolioItems
      : portfolioItems.filter((i) => i.category === activeFilter);

  const featured = portfolioItems.find((i) => i.featured) ?? portfolioItems[0];

  const stats = [
    { value: 750, suffix: "+", label: "Projects Delivered", Icon: Briefcase },
    { value: 25, suffix: "+", label: "Industries Served", Icon: Layers },
    { value: 98, suffix: "%", label: "Client Satisfaction", Icon: Heart },
    { value: 12, suffix: "+", label: "Years of Craft", Icon: CalendarClock },
  ];

  return (
    <div className="bg-sv-bg text-cream">
      {/* ============================== HERO ============================== */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 hero-gradient-line" />
        {/* Floating orbs */}
        <div className="absolute top-10 left-[5%] w-[28rem] h-[28rem] rounded-full bg-gold/[0.05] blur-[140px] animate-float pointer-events-none" />
        <div
          className="absolute bottom-0 right-[8%] w-[24rem] h-[24rem] rounded-full bg-bronze/[0.06] blur-[130px] animate-float pointer-events-none"
          style={{ animationDelay: "2s", animationDuration: "11s" }}
        />
        <div className="absolute inset-0 pattern-dots opacity-[0.4] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/20 bg-gold/5 text-gold text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Our Work
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-6"
          >
            <AnimatedHeading
              text1="Our"
              text2="Portfolio"
              className="!mb-0"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto text-cream/70 text-lg leading-relaxed"
          >
            Real results for real clients. Every project below is a
            partnership that translated ambition into measurable growth —
            across websites, search, social & brand.
          </motion.p>
        </div>
      </section>

      {/* ============================== FEATURED ============================== */}
      <section className="relative py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-6">
          <FeaturedHighlight item={featured} />
        </div>
      </section>

      {/* ============================== FILTER + GRID ============================== */}
      <section className="relative py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="text-cream">All </span>
              <span className="text-gold-gradient">Projects</span>
            </h2>
            <p className="text-cream/60 text-sm md:text-base">
              Filter by discipline to find work that matches your goals.
            </p>
          </motion.div>

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-12"
          >
            {FILTERS.map((filter) => {
              const active = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`relative px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                    active
                      ? "bg-gradient-to-r from-gold to-gold-light text-sv-bg shadow-lg shadow-gold/20"
                      : "glass text-cream/70 hover:text-gold hover:border-gold/30 border border-gold/10"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </motion.div>

          {/* Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <PortfolioCard key={item.id} item={item} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-cream/50">
              No projects in this category yet.
            </div>
          )}
        </div>
      </section>

      {/* ============================== STATS ============================== */}
      <section className="relative py-16 md:py-20 border-t border-gold/10">
        <div className="max-w-7xl mx-auto px-6">
          <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => {
              const { Icon } = stat;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass rounded-2xl p-6 text-center card-hover relative overflow-hidden"
                >
                  <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/10 border border-gold/20 mb-4">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gold-gradient mb-1">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      inView={statsInView}
                    />
                  </div>
                  <p className="text-cream/60 text-xs md:text-sm uppercase tracking-wider">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================== CTA ============================== */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 gold-divider" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/[0.05] blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4 font-semibold">
              Your Turn
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-5 leading-tight">
              <span className="text-cream">Want to be our </span>
              <span className="text-gold-gradient">next success story?</span>
            </h2>
            <p className="text-cream/70 text-lg mb-8 max-w-2xl mx-auto">
              Tell us about your goals and we&apos;ll architect a growth plan
              that belongs on this page.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-gold to-bronze text-sv-bg font-bold text-base hover:shadow-xl hover:shadow-gold/25 transition-all duration-300 ripple-effect group"
            >
              Start your project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
