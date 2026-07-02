"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  Globe,
  Search,
  Share2,
  Palette,
  ChevronDown,
  Briefcase,
  Layers,
  Heart,
  CalendarClock,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Category = "Website" | "SEO" | "Social Media" | "Branding";

interface PortfolioItem {
  id: number;
  title: string;
  client: string;
  category: Category;
  description: string;
  result: string;
  /** tailwind gradient stops used as the placeholder image fallback */
  gradient: string;
  /** lucide icon used as faded watermark */
  Icon: React.ComponentType<{ className?: string }>;
  /** real AI-generated cover image (relative to /public) */
  image?: string;
}

/* ------------------------------------------------------------------ */
/*  Data — 12 realistic portfolio items                                */
/* ------------------------------------------------------------------ */

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Luxury Real Estate Portal",
    client: "Aurum Estates",
    category: "Website",
    description: "Editorial property portal with cinematic listings & map search.",
    result: "+180% Lead Gen",
    gradient:
      "linear-gradient(135deg, #4A3A1F 0%, #D4AF37 55%, #1A1410 100%)",
    Icon: Globe,
    image: "/images/portfolio/01-aurum-estates.png",
  },
  {
    id: 2,
    title: "Healthcare SEO Dominance",
    client: "CareWell Clinics",
    category: "SEO",
    description: "Technical SEO + local pack sweep across 8 clinic locations.",
    result: "#1 Ranking",
    gradient:
      "linear-gradient(135deg, #0F2A1F 0%, #2E7D5B 55%, #1A1410 100%)",
    Icon: Search,
    image: "/images/portfolio/02-carewell-clinics.png",
  },
  {
    id: 3,
    title: "Restaurant Brand Refresh",
    client: "Saffron Kitchen",
    category: "Branding",
    description: "Heritage-rooted identity, menu system & packaging overhaul.",
    result: "3x Bookings",
    gradient:
      "linear-gradient(135deg, #2A0F1A 0%, #8E2B4A 55%, #1A1410 100%)",
    Icon: Palette,
    image: "/images/portfolio/03-saffron-kitchen.png",
  },
  {
    id: 4,
    title: "E-commerce Social Blitz",
    client: "Velvet & Co",
    category: "Social Media",
    description: "90-day content engine across Reels, Stories & influencer drops.",
    result: "+250% Engagement",
    gradient:
      "linear-gradient(135deg, #2A1A0E 0%, #A87842 55%, #1A1410 100%)",
    Icon: Share2,
    image: "/images/portfolio/04-velvet-and-co.png",
  },
  {
    id: 5,
    title: "Law Firm Website",
    client: "Verma & Associates",
    category: "Website",
    description: "Authority-driven practice area pages with lead capture funnels.",
    result: "+90% Inquiries",
    gradient:
      "linear-gradient(135deg, #3A2E14 0%, #D4AF37 55%, #1A1410 100%)",
    Icon: Globe,
    image: "/images/portfolio/05-verma-associates.png",
  },
  {
    id: 6,
    title: "Local SEO for Salon",
    client: "Glow Beauty Lounge",
    category: "SEO",
    description: "Google Business Profile optimization + review acceleration.",
    result: "4x Footfall",
    gradient:
      "linear-gradient(135deg, #0F2A1F 0%, #3FA37A 55%, #1A1410 100%)",
    Icon: Search,
    image: "/images/portfolio/06-glow-beauty-lounge.png",
  },
  {
    id: 7,
    title: "Fashion Brand Identity",
    client: "Aria Couture",
    category: "Branding",
    description: "Luxury wordmark, seasonal lookbook system & tagline toolkit.",
    result: "+200% Brand Recall",
    gradient:
      "linear-gradient(135deg, #2A0F1A 0%, #A6365A 55%, #1A1410 100%)",
    Icon: Palette,
    image: "/images/portfolio/07-aria-couture.png",
  },
  {
    id: 8,
    title: "Instagram Growth Campaign",
    client: "Bloom & Brew",
    category: "Social Media",
    description: "Aesthetic-first grid strategy with viral Reels production.",
    result: "120K Followers",
    gradient:
      "linear-gradient(135deg, #2A1A0E 0%, #C99560 55%, #1A1410 100%)",
    Icon: Share2,
    image: "/images/portfolio/08-bloom-and-brew.png",
  },
  {
    id: 9,
    title: "Fintech Landing Platform",
    client: "PayWise Capital",
    category: "Website",
    description: "Conversion-optimized product site with trust architecture.",
    result: "+150% Conversions",
    gradient:
      "linear-gradient(135deg, #4A3A1F 0%, #F5D680 55%, #1A1410 100%)",
    Icon: Globe,
    image: "/images/portfolio/09-paywise-capital.png",
  },
  {
    id: 10,
    title: "Dental Clinic SEO",
    client: "SmileStudio",
    category: "SEO",
    description: "Service-page silo + schema markup for treatment keywords.",
    result: "Top 3 Ranking",
    gradient:
      "linear-gradient(135deg, #0F2A1F 0%, #4FC18A 55%, #1A1410 100%)",
    Icon: Search,
    image: "/images/portfolio/10-smilestudio.png",
  },
  {
    id: 11,
    title: "Luxury Hotel Branding",
    client: "The Royal Crest",
    category: "Branding",
    description: "Heritage monogram, in-room collateral & digital signage kit.",
    result: "5x Direct Bookings",
    gradient:
      "linear-gradient(135deg, #2A0F1A 0%, #B8456E 55%, #1A1410 100%)",
    Icon: Palette,
    image: "/images/portfolio/11-the-royal-crest.png",
  },
  {
    id: 12,
    title: "YouTube Strategy for Startup",
    client: "NexaTech Labs",
    category: "Social Media",
    description: "Long-form thought leadership series with short-form remix.",
    result: "1M+ Views",
    gradient:
      "linear-gradient(135deg, #2A1A0E 0%, #BD8A4E 55%, #1A1410 100%)",
    Icon: Share2,
    image: "/images/portfolio/12-nexatech-labs.png",
  },
];

/* ------------------------------------------------------------------ */
/*  Filter configuration                                               */
/* ------------------------------------------------------------------ */

const FILTERS: ("All" | Category)[] = [
  "All",
  "Website",
  "SEO",
  "Social Media",
  "Branding",
];

/** per-category badge styling */
const BADGE_STYLES: Record<
  Category,
  { badge: string; dot: string }
> = {
  Website: {
    badge: "bg-gold/15 text-gold border-gold/30",
    dot: "bg-gold",
  },
  SEO: {
    badge: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
    dot: "bg-emerald-400",
  },
  "Social Media": {
    badge: "bg-amber-700/20 text-amber-300 border-amber-500/30",
    dot: "bg-amber-500",
  },
  Branding: {
    badge: "bg-rose-500/15 text-rose-300 border-rose-400/30",
    dot: "bg-rose-400",
  },
};

/* ------------------------------------------------------------------ */
/*  Animated counter (mirrors Results.tsx pattern)                     */
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
      {/* Image area with category gradient + watermark icon */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* Real AI-generated cover image (with gradient fallback underneath) */}
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

        {/* Dark gradient overlay for legibility — only when image is shown */}
        {item.image && (
          <div className="absolute inset-0 bg-gradient-to-t from-sv-bg/80 via-sv-bg/10 to-transparent" />
        )}

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 pattern-dots opacity-30 pointer-events-none" />

        {/* Large faded watermark icon — only when no real image */}
        {!item.image && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Icon className="w-28 h-28 text-cream/[0.08] group-hover:text-cream/[0.12] transition-colors duration-500" />
          </div>
        )}

        {/* Top row — category badge + arrow */}
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

        {/* Hover overlay — dark gradient + gold border */}
        <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out">
          <div className="absolute inset-0 bg-gradient-to-t from-sv-bg via-sv-bg/85 to-sv-bg/30" />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-gold/30" />
        </div>

        {/* Title + client — appears on hover, bottom-left (leaves room for chip) */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-5 pr-28 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out delay-75">
          <p className="text-gold text-sm font-medium mb-1">{item.client}</p>
          <h3 className="text-cream font-semibold text-lg leading-tight mb-1.5">
            {item.title}
          </h3>
          <p className="text-cream/70 text-xs leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Results chip — bottom-right, always visible */}
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
/*  Main section                                                       */
/* ------------------------------------------------------------------ */

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<"All" | Category>("All");
  const [showAll, setShowAll] = useState(false);

  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  const filtered =
    activeFilter === "All"
      ? portfolioItems
      : portfolioItems.filter((i) => i.category === activeFilter);

  const visible = showAll ? filtered : filtered.slice(0, 6);

  const stats = [
    { value: 750, suffix: "+", label: "Projects Delivered", Icon: Briefcase },
    { value: 25, suffix: "+", label: "Industries Served", Icon: Layers },
    { value: 98, suffix: "%", label: "Client Satisfaction", Icon: Heart },
    { value: 12, suffix: "+", label: "Years of Craft", Icon: CalendarClock },
  ];

  return (
    <section
      id="portfolio"
      className="relative py-20 md:py-28 overflow-hidden bg-sv-bg"
    >
      {/* Decorative gold divider at top */}
      <div className="absolute top-0 left-0 right-0 hero-gradient-line" />

      {/* Floating gradient orbs */}
      <div
        className="absolute top-20 left-[5%] w-[28rem] h-[28rem] rounded-full bg-gold/[0.05] blur-[140px] animate-float pointer-events-none"
        style={{ animationDelay: "0s", animationDuration: "9s" }}
      />
      <div
        className="absolute bottom-10 right-[8%] w-[24rem] h-[24rem] rounded-full bg-bronze/[0.06] blur-[130px] animate-float pointer-events-none"
        style={{ animationDelay: "2s", animationDuration: "11s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20rem] h-[20rem] rounded-full bg-rose-700/[0.04] blur-[120px] animate-float pointer-events-none"
        style={{ animationDelay: "4s", animationDuration: "13s" }}
      />

      {/* Subtle pattern texture */}
      <div className="absolute inset-0 pattern-dots opacity-[0.4] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="text-gold text-xs tracking-widest uppercase mb-4 font-semibold">
            Our Work
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-cream">Crafted Excellence </span>
            <span className="text-gold-gradient">in Action</span>
          </h2>
          <p className="max-w-2xl mx-auto text-cream/70 text-lg leading-relaxed">
            Real results for real clients. Every project below is a partnership
            that translated ambition into measurable growth.
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
                onClick={() => {
                  setActiveFilter(filter);
                  setShowAll(false);
                }}
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

        {/* Portfolio grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((item, i) => (
              <PortfolioCard key={item.id} item={item} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state (rare — defensive) */}
        {visible.length === 0 && (
          <div className="text-center py-16 text-cream/50">
            No projects in this category yet.
          </div>
        )}

        {/* View All Projects toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => setShowAll((s) => !s)}
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-gold/30 text-gold font-semibold text-sm tracking-wide hover:bg-gold/10 hover:border-gold/50 transition-all duration-300 cursor-pointer"
            aria-expanded={showAll}
            aria-controls="portfolio-grid"
          >
            {showAll ? "Show Less Projects" : "View All Projects"}
            <motion.span
              animate={{ rotate: showAll ? 180 : 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="inline-flex"
            >
              <ChevronDown className="w-4 h-4" />
            </motion.span>
          </button>
        </motion.div>

        {/* Stats strip */}
        <div
          ref={statsRef}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
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

        {/* Inline CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-14"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-gold/80 hover:text-gold text-sm font-medium animated-underline group"
          >
            Ready to be our next case study?
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
