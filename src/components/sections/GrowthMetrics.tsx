"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  TrendingUp,
  Users,
  Eye,
  MousePointerClick,
  DollarSign,
  BarChart3,
  Activity,
  ArrowUpRight,
} from "lucide-react";
import AnimatedHeading from "@/components/ui/animated-heading";

/* ------------------------------------------------------------------ */
/*  Animated Counter Hook                                              */
/* ------------------------------------------------------------------ */
function useAnimatedCounter(target: number, inView: boolean, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, target, duration]);

  return count;
}

/* ------------------------------------------------------------------ */
/*  Live Leads Counter (increments randomly)                           */
/* ------------------------------------------------------------------ */
function LiveLeadsCounter({ inView }: { inView: boolean }) {
  const [leads, setLeads] = useState(47);

  useEffect(() => {
    if (!inView) return;
    const scheduleNext = () => {
      const delay = 3000 + Math.random() * 5000; // 3-8 seconds
      return setTimeout(() => {
        setLeads((prev) => prev + 1);
        timerRef = scheduleNext();
      }, delay);
    };
    let timerRef = scheduleNext();
    return () => clearTimeout(timerRef);
  }, [inView]);

  return <>{leads}</>;
}

/* ------------------------------------------------------------------ */
/*  Metric Card                                                        */
/* ------------------------------------------------------------------ */
interface MetricCardProps {
  icon: React.ReactNode;
  value: React.ReactNode;
  label: string;
  isLive?: boolean;
  inView: boolean;
  index: number;
}

function MetricCard({ icon, value, label, isLive, inView, index }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative glass rounded-2xl p-6 overflow-hidden group hover:border-gold/30 transition-all duration-500 gold-glow"
    >
      {/* Shimmer animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-gold/5 to-transparent" />
      </div>

      {/* LIVE badge */}
      {isLive && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-sv-bg/80 backdrop-blur-sm border border-green-500/30 rounded-full px-2.5 py-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-[10px] font-bold text-green-400 tracking-widest uppercase">
            Live
          </span>
        </div>
      )}

      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/20 to-bronze/10 flex items-center justify-center mb-4 group-hover:from-gold/30 group-hover:to-bronze/20 transition-all duration-500">
        {icon}
      </div>

      {/* Value */}
      <div className="text-3xl md:text-4xl font-bold text-gold-gradient mb-1">
        {value}
      </div>

      {/* Label */}
      <p className="text-sm text-sv-muted">{label}</p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Activity Feed                                                      */
/* ------------------------------------------------------------------ */
const activityEvents = [
  { text: "New lead from Google Ads — Delhi", time: "2m ago" },
  { text: "SEO ranking improved — #3 → #1", time: "5m ago" },
  { text: "Landing page conversion up 12%", time: "8m ago" },
  { text: "Social post reached 50K impressions", time: "12m ago" },
  { text: "Client renewed Business Accelerator plan", time: "18m ago" },
];

/* ------------------------------------------------------------------ */
/*  Mini Bar Chart                                                     */
/* ------------------------------------------------------------------ */
const weeklyLeads = [
  { day: "Mon", value: 12 },
  { day: "Tue", value: 18 },
  { day: "Wed", value: 15 },
  { day: "Thu", value: 22 },
  { day: "Fri", value: 28 },
  { day: "Sat", value: 25 },
  { day: "Sun", value: 31 },
];

const maxBarValue = Math.max(...weeklyLeads.map((d) => d.value));

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */
export default function GrowthMetrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const impressionsCount = useAnimatedCounter(520, isInView);
  const conversionsCount = useAnimatedCounter(1200, isInView);

  return (
    <section
      id="growth-metrics"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background: subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating gradient orbs */}
      <div className="absolute top-20 -left-32 w-96 h-96 bg-gold/5 rounded-full blur-[120px] animate-float" />
      <div
        className="absolute bottom-20 -right-32 w-80 h-80 bg-bronze/5 rounded-full blur-[100px]"
        style={{ animationDelay: "3s" }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/[0.02] rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <AnimatedHeading text1="Our Growth" text2="Dashboard" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-sv-muted text-lg max-w-xl mx-auto"
          >
            Real metrics from real campaigns. Updated live.
          </motion.p>
        </div>

        {/* Row 1: 4 Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <MetricCard
            icon={<Users className="w-6 h-6 text-gold" />}
            value={<LiveLeadsCounter inView={isInView} />}
            label="Live Leads Today"
            isLive
            inView={isInView}
            index={0}
          />
          <MetricCard
            icon={<Activity className="w-6 h-6 text-gold" />}
            value={
              <span className="flex items-center gap-2">
                23
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                </span>
              </span>
            }
            label="Active Campaigns"
            inView={isInView}
            index={1}
          />
          <MetricCard
            icon={<Eye className="w-6 h-6 text-gold" />}
            value={`${impressionsCount >= 520 ? "52.0" : (impressionsCount / 10).toFixed(1)}M`}
            label="Total Impressions (30d)"
            inView={isInView}
            index={2}
          />
          <MetricCard
            icon={<DollarSign className="w-6 h-6 text-gold" />}
            value={`${conversionsCount >= 1200 ? "1.2K" : (conversionsCount / 1).toFixed(0)}+`}
            label="Conversions (MTD)"
            inView={isInView}
            index={3}
          />
        </div>

        {/* Row 2: Activity Feed + Mini Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Activity Feed (2/3) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-2 glass rounded-2xl p-6 gold-glow"
          >
            <div className="flex items-center gap-2 mb-5">
              <MousePointerClick className="w-5 h-5 text-gold" />
              <h3 className="text-lg font-semibold text-cream">Live Activity Feed</h3>
            </div>
            <div className="space-y-3">
              {activityEvents.map((event, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                  className="flex items-start gap-3 glass rounded-xl p-4 hover:border-gold/20 transition-all duration-300 group"
                >
                  {/* Gold left dot */}
                  <span className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-gold to-gold-light shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-cream group-hover:text-gold-light transition-colors duration-300">
                      {event.text}
                    </p>
                  </div>
                  <span className="text-xs text-sv-muted flex-shrink-0">{event.time}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mini Bar Chart (1/3) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="glass rounded-2xl p-6 gold-glow"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-gold" />
                <h3 className="text-lg font-semibold text-cream">This Week</h3>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="flex items-end gap-2 h-40 mb-4">
              {weeklyLeads.map((bar, i) => (
                <div key={bar.day} className="flex-1 flex flex-col items-center gap-1">
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: `${(bar.value / maxBarValue) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.4 + i * 0.08,
                      duration: 0.6,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    className="w-full rounded-t-md bg-gradient-to-t from-gold/40 to-gold min-h-[4px] hover:from-gold/60 hover:to-gold-light transition-colors duration-300 cursor-default relative group"
                  >
                    {/* Tooltip on hover */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-sv-bg/90 border border-gold/20 text-xs text-cream px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                      {bar.value} leads
                    </div>
                  </motion.div>
                  <span className="text-[10px] text-sv-muted">{bar.day}</span>
                </div>
              ))}
            </div>

            {/* Trend info */}
            <div className="flex items-center gap-2 pt-3 border-t border-gold/10">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-sm font-medium text-success">+18% vs last week</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-success ml-auto" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
