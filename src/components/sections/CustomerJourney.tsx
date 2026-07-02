"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Search,
  Phone,
  FileText,
  Rocket,
  Settings,
  TrendingUp,
} from "lucide-react";
import AnimatedHeading from "@/components/ui/animated-heading";

/* ───────── Journey stage data ───────── */
const stages = [
  {
    icon: Search,
    number: 1,
    title: "Discovery",
    description:
      "You find Social Viens through our thought leadership, client referrals, or search results — the first spark of transformation.",
    timeframe: "Day 1",
  },
  {
    icon: Phone,
    number: 2,
    title: "Strategy Call",
    description:
      "A free, no-obligation consultation where we audit your current presence and identify untapped growth potential.",
    timeframe: "Day 2–3",
  },
  {
    icon: FileText,
    number: 3,
    title: "Custom Plan",
    description:
      "We craft a tailored growth roadmap with clear milestones, channel strategy, and projected ROI — built for your business.",
    timeframe: "Week 1",
  },
  {
    icon: Rocket,
    number: 4,
    title: "Execution",
    description:
      "Campaigns go live. Our expert team implements every element with precision — from creative to targeting to deployment.",
    timeframe: "Week 2–3",
    isCurrent: true,
  },
  {
    icon: Settings,
    number: 5,
    title: "Optimization",
    description:
      "Data-driven refinement. We monitor, test, and iterate on every element to maximize performance and ROI.",
    timeframe: "Ongoing",
  },
  {
    icon: TrendingUp,
    number: 6,
    title: "Scale & Grow",
    description:
      "Results multiply. We scale winning strategies, expand channels, and automate workflows for compounding growth.",
    timeframe: "Month 2+",
  },
];

/* ───────── Animated horizontal path (desktop) ───────── */
function HorizontalPath() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="absolute top-[52px] left-0 right-0 z-0 pointer-events-none">
      <svg
        width="100%"
        height="4"
        viewBox="0 0 1200 4"
        preserveAspectRatio="none"
        fill="none"
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="hPathGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.1" />
            <stop offset="15%" stopColor="#D4AF37" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#F5D680" stopOpacity="0.7" />
            <stop offset="85%" stopColor="#D4AF37" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {/* Glow line behind */}
        <motion.line
          x1="0"
          y1="2"
          x2="1200"
          y2="2"
          stroke="url(#hPathGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.15"
          style={{ filter: "blur(4px)" }}
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 2.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        {/* Main line */}
        <motion.line
          x1="0"
          y1="2"
          x2="1200"
          y2="2"
          stroke="url(#hPathGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 2.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </svg>

      {/* Gold dots along the path between stages */}
      {[10, 25, 40, 55, 70, 85].map((pct, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ delay: 0.8 + i * 0.15, duration: 0.4, type: "spring" }}
          className="absolute top-[18px] w-2 h-2 rounded-full bg-gold/40"
          style={{ left: `${pct}%` }}
        />
      ))}
    </div>
  );
}

/* ───────── Animated vertical path (mobile) ───────── */
function VerticalPath() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const lineHeight = stages.length * 280;

  return (
    <div ref={ref} className="absolute left-[27px] top-0 z-0 pointer-events-none" style={{ height: lineHeight }}>
      <svg
        width="3"
        height={lineHeight}
        viewBox={`0 0 3 ${lineHeight}`}
        fill="none"
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="vPathGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.15" />
            <stop offset="30%" stopColor="#D4AF37" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#F5D680" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <motion.line
          x1="1.5"
          y1="0"
          x2="1.5"
          y2={lineHeight}
          stroke="url(#vPathGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 2.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </svg>
    </div>
  );
}

/* ───────── Step number circle with gold gradient ───────── */
function StepCircle({
  number,
  index,
  isCurrent,
}: {
  number: number;
  index: number;
  isCurrent?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{
        delay: index * 0.2,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 15,
      }}
      className="relative z-10 shrink-0"
    >
      <div
        className={`w-14 h-14 rounded-full flex items-center justify-center relative ${
          isCurrent ? "gold-border-pulse" : ""
        }`}
      >
        {/* Outer glow ring */}
        <div
          className={`absolute inset-0 rounded-full transition-opacity duration-500 blur-md scale-125 ${
            isCurrent
              ? "bg-gradient-to-br from-gold/40 via-gold-light/30 to-bronze/40 opacity-100"
              : "bg-gradient-to-br from-gold/20 via-gold-light/10 to-bronze/20 opacity-0 group-hover:opacity-100"
          }`}
        />

        {/* Gold gradient border ring */}
        <div
          className={`absolute inset-0 rounded-full p-[2px] bg-gradient-to-br from-gold via-gold-light to-bronze ${
            isCurrent ? "animate-pulse" : ""
          }`}
        >
          <div
            className={`w-full h-full rounded-full ${
              isCurrent ? "bg-sv-elevated" : "bg-sv-bg"
            }`}
          />
        </div>

        {/* Inner content */}
        <span className="relative z-10 text-sm font-bold font-mono text-gold-gradient">
          {String(number).padStart(2, "0")}
        </span>

        {/* Pulsing ring for current */}
        {isCurrent && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-gold/30"
            animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </div>
    </motion.div>
  );
}

/* ───────── Desktop stage card ───────── */
function DesktopStageCard({
  stage,
  index,
}: {
  stage: (typeof stages)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isCurrent = stage.isCurrent ?? false;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.7, ease: "easeOut" }}
      className="relative flex flex-col items-center group"
    >
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`glass rounded-2xl p-6 relative overflow-hidden cursor-default w-full max-w-[220px] ${
          isCurrent ? "border-gold/30" : ""
        }`}
      >
        {/* CURRENT badge */}
        {isCurrent && (
          <div className="absolute top-3 right-3 z-20">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-gold to-gold-light text-sv-bg">
              Current
            </span>
          </div>
        )}

        {/* Gold top accent line on hover */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/0 to-transparent group-hover:via-gold/60 transition-all duration-500" />

        {/* Gold border glow on hover */}
        <div
          className={`absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none ${
            isCurrent
              ? "border border-gold/30 shadow-[0_0_30px_rgba(212,175,55,0.15)]"
              : "border border-gold/0 group-hover:border-gold/20"
          }`}
        />

        {/* Icon */}
        <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-gold/10 to-bronze/10 border border-gold/20 flex items-center justify-center mx-auto mb-4 group-hover:border-gold/40 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-500">
          <stage.icon className="w-5 h-5 text-gold group-hover:scale-110 transition-transform duration-300" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-cream text-center mb-2">
          {stage.title}
        </h3>

        {/* Description */}
        <p className="text-sv-muted text-sm leading-relaxed text-center mb-3">
          {stage.description}
        </p>

        {/* Time frame */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gold/5 text-gold/70 border border-gold/10">
            <span className="w-1.5 h-1.5 rounded-full bg-gold/50 shrink-0" />
            {stage.timeframe}
          </span>
        </div>

        {/* Pulsing border for current stage */}
        {isCurrent && (
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-gold/20 pointer-events-none"
            animate={{ borderColor: ["rgba(212,175,55,0.15)", "rgba(212,175,55,0.4)", "rgba(212,175,55,0.15)"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

/* ───────── Mobile stage card ───────── */
function MobileStageCard({
  stage,
  index,
}: {
  stage: (typeof stages)[0];
  index: number;
}) {
  const isLeft = index % 2 === 0;
  const isCurrent = stage.isCurrent ?? false;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: "easeOut" }}
      className="flex gap-4 items-start"
    >
      {/* Left: step circle */}
      <div className="flex flex-col items-center shrink-0 pt-1">
        <StepCircle number={stage.number} index={index} isCurrent={isCurrent} />
      </div>

      {/* Right: card */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
        className={`group glass rounded-2xl p-5 relative overflow-hidden flex-1 cursor-default ${
          isCurrent ? "border-gold/30" : ""
        }`}
      >
        {/* CURRENT badge */}
        {isCurrent && (
          <div className="absolute top-3 right-3 z-20">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-gold to-gold-light text-sv-bg">
              Current
            </span>
          </div>
        )}

        {/* Gold top accent line on hover */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/0 to-transparent group-hover:via-gold/60 transition-all duration-500" />

        {/* Gold border glow on hover */}
        <div
          className={`absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none ${
            isCurrent
              ? "border border-gold/30 shadow-[0_0_25px_rgba(212,175,55,0.12)]"
              : "border border-gold/0 group-hover:border-gold/20"
          }`}
        />

        <div className="flex items-center gap-3 mb-3">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-gold/10 to-bronze/10 border border-gold/20 flex items-center justify-center shrink-0 group-hover:border-gold/40 group-hover:shadow-[0_0_16px_rgba(212,175,55,0.12)] transition-all duration-500">
            <stage.icon className="w-5 h-5 text-gold group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-gold/40 group-hover:text-gold/70 transition-colors duration-300">
              STEP {String(stage.number).padStart(2, "0")}
            </span>
            <h3 className="text-lg font-bold text-cream leading-tight">
              {stage.title}
            </h3>
          </div>
        </div>
        <p className="text-sv-muted text-sm leading-relaxed mb-3">
          {stage.description}
        </p>
        <div className="flex">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gold/5 text-gold/70 border border-gold/10">
            <span className="w-1.5 h-1.5 rounded-full bg-gold/50 shrink-0" />
            {stage.timeframe}
          </span>
        </div>

        {/* Pulsing border for current stage */}
        {isCurrent && (
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-gold/20 pointer-events-none"
            animate={{ borderColor: ["rgba(212,175,55,0.15)", "rgba(212,175,55,0.4)", "rgba(212,175,55,0.15)"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════ MAIN COMPONENT ═══════════════════ */
export default function CustomerJourney() {
  return (
    <section
      id="customer-journey"
      className="relative py-24 overflow-hidden bg-sv-bg"
    >
      <div className="section-divider mb-16" />

      {/* Floating gradient orbs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-[10%] w-[500px] h-[500px] rounded-full bg-gold/[0.02] [background:radial-gradient(ellipse_at_center,rgba(212,175,55,0.06)_0%,rgba(168,120,66,0.02)_40%,transparent_70%)]" />
        <div className="absolute bottom-1/4 right-[10%] w-[400px] h-[400px] rounded-full bg-bronze/[0.02] [background:radial-gradient(ellipse_at_center,rgba(168,120,66,0.05)_0%,transparent_60%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-gold/[0.015] [background:radial-gradient(ellipse_at_center,rgba(212,175,55,0.04)_0%,rgba(168,120,66,0.02)_35%,transparent_65%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-sm tracking-[0.3em] text-gold/70 uppercase mb-4"
          >
            Your Path to Growth
          </motion.p>
          <AnimatedHeading text1="Your Growth" text2="Journey" />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="max-w-2xl mx-auto text-sv-muted text-lg mt-2"
          >
            From first click to measurable results — here&apos;s how we make it
            happen
          </motion.p>
        </motion.div>

        {/* ──── Desktop Horizontal Timeline ──── */}
        <div className="hidden lg:block relative">
          {/* Step circles row */}
          <div className="relative flex justify-between items-start mb-8 px-4">
            <HorizontalPath />
            {stages.map((stage, i) => (
              <div
                key={i}
                className="relative z-10 flex flex-col items-center"
              >
                <StepCircle
                  number={stage.number}
                  index={i}
                  isCurrent={stage.isCurrent}
                />
              </div>
            ))}
          </div>

          {/* Cards row */}
          <div className="grid grid-cols-6 gap-4 mt-4">
            {stages.map((stage, i) => (
              <DesktopStageCard key={i} stage={stage} index={i} />
            ))}
          </div>
        </div>

        {/* ──── Mobile Vertical Timeline ──── */}
        <div className="lg:hidden relative">
          <VerticalPath />
          <div className="space-y-8 pl-0">
            {stages.map((stage, i) => (
              <MobileStageCard key={i} stage={stage} index={i} />
            ))}
          </div>
        </div>

        {/* ──── CTA Button ──── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-16"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sv-bg bg-gradient-to-r from-gold via-gold-light to-gold hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all duration-500 hover:scale-105 group"
          >
            Start Your Journey
            <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
