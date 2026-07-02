"use client";

import { useRef, useState, useEffect, type ComponentType } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  MapPin,
  Globe,
  Search,
  Share2,
  Target,
  Palette,
  MapPinned,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Users,
  Building2,
  Compass,
} from "lucide-react";
import AnimatedHeading from "@/components/ui/animated-heading";

interface Service {
  icon: ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  description: string;
  /** URL-safe service slug — used to build the per-location landing-page href. */
  serviceKey: string;
}

/**
 * Shared service catalogue for both Delhi & Dwarka hubs.
 * Icons match the spec (Globe / Search / Share2 / Target / Palette /
 * MapPinned / Smartphone).
 *
 * The `serviceKey` matches the slug suffix used in
 * /src/lib/location-data.ts so the cards can deep-link into the
 * dedicated landing pages (e.g. /website-development-delhi).
 */
const services: Service[] = [
  {
    icon: Globe,
    title: "Website Development",
    subtitle: "Web Design & Development",
    description:
      "Conversion-focused websites that turn visitors into paying customers across every device.",
    serviceKey: "website-development",
  },
  {
    icon: Search,
    title: "SEO Services",
    subtitle: "Search Engine Optimization",
    description:
      "Rank on Google's first page and dominate local search results with proven white-hat SEO.",
    serviceKey: "seo-services",
  },
  {
    icon: Share2,
    title: "Social Media",
    subtitle: "Social Media Marketing",
    description:
      "Build engaged audiences and drive brand love across Instagram, LinkedIn & Facebook.",
    serviceKey: "social-media",
  },
  {
    icon: Target,
    title: "Paid Ads",
    subtitle: "Performance Marketing",
    description:
      "Google, Meta & LinkedIn ad campaigns engineered for maximum ROAS and predictable scale.",
    serviceKey: "paid-ads",
  },
  {
    icon: Palette,
    title: "Branding",
    subtitle: "Brand Identity & Strategy",
    description:
      "Distinctive brand identities that command premium positioning and lasting recall.",
    serviceKey: "branding",
  },
  {
    icon: MapPinned,
    title: "Google Business Profile",
    subtitle: "Local SEO & GMB",
    description:
      "Own the map pack and win nearby customers ready to buy from you today, not tomorrow.",
    serviceKey: "google-business-profile",
  },
  {
    icon: Smartphone,
    title: "App Development",
    subtitle: "Mobile App Development",
    description:
      "Native & cross-platform apps with seamless UX that keep users coming back daily.",
    serviceKey: "app-development",
  },
];

interface LocationStat {
  value: number;
  suffix: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
}

const stats: LocationStat[] = [
  { value: 500, suffix: "+", label: "Local Clients", icon: Users },
  { value: 2, suffix: "", label: "Service Hubs", icon: Building2 },
  { value: 100, suffix: "%", label: "Delhi NCR Coverage", icon: Compass },
];

/**
 * Animated counter — mirrors the easing pattern used in Results.tsx
 * (easeOutCubic) so the strip feels consistent with the rest of the page.
 */
function useCounter(value: number, inView: boolean, duration = 1800): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const startTime = Date.now();
    const tick = () => {
      const progress = Math.min((Date.now() - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return count;
}

interface LocationCarouselProps {
  location: string;
  tagline: string;
  index: number;
}

function LocationCarousel({
  location,
  tagline,
  index,
}: LocationCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    // ~ card width (280) + gap (20)
    const delta = dir === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full glass flex items-center justify-center border border-gold/20 shrink-0">
            <MapPin className="w-5 h-5 text-gold" />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-gold tracking-tight">
              {location}
            </h3>
            <p className="text-sm text-sv-muted mt-0.5">{tagline}</p>
          </div>
        </div>

        {/* Desktop arrow controls — hidden on mobile (swipe instead) */}
        <div className="hidden md:flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label={`Scroll ${location} services left`}
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-gold/70 hover:text-gold hover:bg-gold/10 border border-gold/10 hover:border-gold/40 transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label={`Scroll ${location} services right`}
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-gold/70 hover:text-gold hover:bg-gold/10 border border-gold/10 hover:border-gold/40 transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal scroll-snap row (hidden scrollbar) */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-2 px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {services.map((service, i) => {
          /**
           * Resolve the location-suffix to match the dedicated landing-page
           * routes under /src/app/[slug]/page.tsx. Delhi cards link to
           * `/{serviceKey}-delhi`, Dwarka cards link to
           * `/{serviceKey}-dwarka`. Falls back to /contact if no match.
           */
          const locationSuffix =
            location.toLowerCase() === "delhi" ? "delhi" : "dwarka";
          const href = `/${service.serviceKey}-${locationSuffix}`;
          return (
          <Link
            key={`${location}-${i}`}
            href={href}
            aria-label={`Learn more about ${service.title} in ${location}`}
            className="group relative flex-shrink-0 w-[280px] snap-start focus:outline-none"
          >
            <div className="glass rounded-2xl p-6 h-full border border-gold/10 hover:border-gold/40 transition-all duration-500 hover:-translate-y-1 overflow-hidden relative">
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-gold/10 via-transparent to-gold/5" />
              </div>

              {/* Icon with glow on hover */}
              <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-gold/15 to-bronze/10 border border-gold/15 flex items-center justify-center mb-5 transition-all duration-500 group-hover:border-gold/40 group-hover:drop-shadow-[0_0_12px_rgba(212,175,55,0.5)]">
                <service.icon className="w-7 h-7 text-gold" />
              </div>

              {/* Title + subtitle */}
              <h4 className="text-lg font-bold text-cream mb-1 group-hover:text-gold transition-colors duration-300">
                {service.title}
              </h4>
              <p className="text-[11px] text-gold/60 uppercase tracking-[0.15em] mb-3">
                {service.subtitle}
              </p>

              {/* Description (2-line clamp) */}
              <p className="text-sm text-sv-muted leading-relaxed mb-5 line-clamp-2">
                {service.description}
              </p>

              {/* Learn More link */}
              <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function LocationServices() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const clientCount = useCounter(stats[0].value, inView);
  const hubsCount = useCounter(stats[1].value, inView);
  const coverageCount = useCounter(stats[2].value, inView);
  const statDisplay = [
    `${clientCount}${stats[0].suffix}`,
    `${hubsCount}${stats[1].suffix}`,
    `${coverageCount}${stats[2].suffix}`,
  ];

  return (
    <section
      id="locations"
      className="relative py-20 md:py-28 overflow-hidden bg-gradient-maroon"
    >
      {/* Decorative gold divider at top */}
      <div className="gold-divider mb-16" />

      {/* Floating gradient orbs — gold + maroon tones.
          Note: project defines `.animate-float` (no -orb variant); we use
          it with staggered inline delays for a layered ambient feel. */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[8%] left-[4%] w-72 h-72 rounded-full bg-gold/8 blur-[140px] animate-float" />
        <div
          className="absolute bottom-[12%] right-[6%] w-80 h-80 rounded-full bg-rose-900/20 blur-[150px] animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-[45%] left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-gold/4 blur-[180px] animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div
        className="max-w-7xl mx-auto px-6 relative z-10"
        ref={sectionRef}
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.3em] text-gold uppercase mb-4 font-semibold">
            Local Presence
          </p>
          <AnimatedHeading
            text1="Serving Delhi NCR"
            text2="with Excellence"
          />
          <p className="max-w-2xl mx-auto text-sv-muted text-lg mt-4">
            On-the-ground presence in two strategic hubs across Delhi NCR —
            built to deliver local market dominance, not just campaigns.
          </p>
        </motion.div>

        <div className="space-y-14">
          {/* Delhi carousel */}
          <LocationCarousel
            location="Delhi"
            tagline="Capital city — premium digital presence"
            index={0}
          />

          {/* Stats strip between carousels */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-2xl px-6 py-6 border border-gold/15 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 gold-glow"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 ${
                  i < stats.length - 1
                    ? "sm:border-r sm:border-gold/10 sm:pr-4"
                    : ""
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/15 to-bronze/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                  <stat.icon className="w-6 h-6 text-gold" />
                </div>
                <div className="min-w-0">
                  <div className="text-2xl md:text-3xl font-bold text-gold-gradient leading-tight">
                    {statDisplay[i]}
                  </div>
                  <div className="text-[11px] text-sv-muted uppercase tracking-[0.18em] mt-1">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Dwarka carousel */}
          <LocationCarousel
            location="Dwarka"
            tagline="Sub-city hub — local market dominance"
            index={1}
          />
        </div>
      </div>
    </section>
  );
}
