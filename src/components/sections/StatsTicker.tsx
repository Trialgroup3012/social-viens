"use client";

import { useEffect, useRef, useState } from "react";
import { motion, animate, useInView } from "framer-motion";
import { Building2, TrendingUp, Target, Heart, Activity } from "lucide-react";

type Stat = {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  progress: number;
  sparkSeed: number;
};

const stats: Stat[] = [
  {
    value: "750+",
    label: "Businesses Served",
    icon: Building2,
    progress: 82,
    sparkSeed: 1,
  },
  {
    value: "25K+",
    label: "Leads Generated",
    icon: TrendingUp,
    progress: 88,
    sparkSeed: 2,
  },
  {
    value: "350%",
    label: "Average ROI",
    icon: Target,
    progress: 94,
    sparkSeed: 3,
  },
  {
    value: "96%",
    label: "Client Retention",
    icon: Heart,
    progress: 96,
    sparkSeed: 4,
  },
];

/**
 * CountUp — animates a numeric value from 0 to target when scrolled into view.
 * Preserves non-numeric prefix/suffix (e.g. "₹", "Cr+", "%", "+").
 */
function CountUp({ value, duration = 2 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState("0");

  const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  const prefix = match?.[1] ?? "";
  const target = match ? parseFloat(match[2]) : 0;
  const suffix = match?.[3] ?? "";
  const decimals = match?.[2]?.includes(".") ? 1 : 0;

  useEffect(() => {
    if (!inView || !match) return;
    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, target, duration, decimals]);

  if (!match) return <>{value}</>;
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/**
 * Sparkline — tiny inline SVG trend line, deterministic (no Math.random)
 * so SSR and client render match exactly.
 */
function Sparkline({ seed }: { seed: number }) {
  const points = Array.from({ length: 8 }, (_, i) => {
    const x = (i / 7) * 100;
    // deterministic pseudo-random based on seed + index
    const noise = ((seed * 17 + i * 11) % 18) - 9;
    const trend = i * 6; // gentle upward bias
    const y = Math.max(8, Math.min(92, 78 - trend + noise));
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="w-16 h-7 opacity-80"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`spark-${seed}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#A87842" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#F5D680" stopOpacity="1" />
        </linearGradient>
      </defs>
      <polyline
        points={points}
        fill="none"
        stroke={`url(#spark-${seed})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export default function StatsTicker() {
  return (
    <section className="relative py-16 lg:py-20 overflow-hidden bg-gradient-to-b from-[#0f080a] via-[#14090d] to-[#0f080a]">
      {/* Faint gold radial glow background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="glow-gold"
          style={{
            top: "-20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "700px",
            height: "400px",
            opacity: 0.7,
          }}
        />
      </div>

      {/* Top + bottom hairline gold borders */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header row — eyebrow + live indicator */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10"
        >
          <span className="eyebrow-label">Live Performance Metrics</span>
          <div className="metric-chip-premium">
            <span className="live-dot" />
            <span className="text-cream/80">Real-time data</span>
            <Activity className="w-3.5 h-3.5 text-gold/70" />
          </div>
        </motion.div>

        {/* Stats grid — 2 cols mobile, 4 cols desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              className="group relative"
            >
              <div className="card-premium sheen-sweep relative h-full p-5 sm:p-6">
                {/* Top row — icon + sparkline */}
                <div className="flex items-start justify-between mb-4">
                  <div className="relative">
                    {/* radial glow behind icon */}
                    <div
                      aria-hidden="true"
                      className="absolute -inset-2 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(212,175,55,0.22) 0%, transparent 70%)",
                        filter: "blur(6px)",
                      }}
                    />
                    <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-gold/15 to-bronze/10 border border-gold/25 flex items-center justify-center group-hover:border-gold/45 transition-colors duration-500">
                      <stat.icon className="w-5 h-5 text-gold" />
                    </div>
                  </div>
                  <Sparkline seed={stat.sparkSeed} />
                </div>

                {/* Big number — gold gradient, count-up, scales on hover */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="text-premium-gradient text-4xl lg:text-5xl font-bold leading-none tracking-tight mb-2"
                >
                  <CountUp value={stat.value} />
                </motion.div>

                {/* Thin gold divider */}
                <div className="h-px w-full bg-gradient-to-r from-gold/40 via-gold/15 to-transparent mb-3" />

                {/* Label — tracked uppercase */}
                <p className="text-[0.7rem] sm:text-xs tracking-[0.18em] uppercase text-sv-muted font-medium mb-4">
                  {stat.label}
                </p>

                {/* Progress bar */}
                <div className="h-[3px] w-full rounded-full bg-gold/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-bronze via-gold to-gold-light"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${stat.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: 0.4 + i * 0.1, ease: "easeOut" }}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between text-[0.65rem] text-sv-muted/70">
                  <span>Achieved</span>
                  <span className="text-gold/80 font-semibold tabular-nums">
                    {stat.progress}%
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
