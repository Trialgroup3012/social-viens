"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Search,
  Lightbulb,
  Rocket,
  Settings,
  TrendingUp,
} from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Discover",
    description:
      "We deep-dive into your business, audience, competitors, and market to understand your unique growth opportunities.",
    details: [
      "Business Audit",
      "Competitor Analysis",
      "Audience Research",
      "Goal Setting",
    ],
  },
  {
    icon: Lightbulb,
    number: "02",
    title: "Strategize",
    description:
      "We craft a custom growth strategy with clear milestones, KPIs, and execution timelines.",
    details: [
      "Growth Roadmap",
      "Channel Strategy",
      "Budget Allocation",
      "KPI Framework",
    ],
  },
  {
    icon: Rocket,
    number: "03",
    title: "Execute",
    description:
      "Our expert team implements the strategy with precision — from campaigns to content to code.",
    details: [
      "Campaign Launch",
      "Content Creation",
      "Development Sprint",
      "Brand Activation",
    ],
  },
  {
    icon: Settings,
    number: "04",
    title: "Optimize",
    description:
      "We continuously monitor, test, and refine every element to maximize performance and ROI.",
    details: [
      "A/B Testing",
      "Performance Tracking",
      "Conversion Optimization",
      "Budget Optimization",
    ],
  },
  {
    icon: TrendingUp,
    number: "05",
    title: "Scale",
    description:
      "Once we find what works, we scale it aggressively — multiplying your results while maintaining efficiency.",
    details: [
      "Scale Winning Campaigns",
      "Expand Channels",
      "Automate Workflows",
      "Revenue Growth",
    ],
  },
];

/* ───────── Animated timeline line (desktop) ───────── */
function AnimatedTimelineLine({ totalSteps }: { totalSteps: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Each step card is roughly 200px tall + 24px gap
  const lineHeight = totalSteps * 224;

  return (
    <div ref={ref} className="hidden lg:block absolute left-1/2 top-0 -translate-x-1/2 z-0">
      <svg
        width="4"
        height={lineHeight}
        viewBox={`0 0 4 ${lineHeight}`}
        fill="none"
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="timelineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.1" />
            <stop offset="20%" stopColor="#D4AF37" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#F5D680" stopOpacity="0.8" />
            <stop offset="80%" stopColor="#D4AF37" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <motion.line
          x1="2"
          y1="0"
          x2="2"
          y2={lineHeight}
          stroke="url(#timelineGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 2.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        {/* Subtle glow line behind */}
        <motion.line
          x1="2"
          y1="0"
          x2="2"
          y2={lineHeight}
          stroke="url(#timelineGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.15"
          style={{ filter: "blur(4px)" }}
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 2.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </svg>
    </div>
  );
}

/* ───────── Mobile timeline line ───────── */
function MobileTimelineLine({ totalSteps }: { totalSteps: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const lineHeight = totalSteps * 260;

  return (
    <div ref={ref} className="lg:hidden absolute left-[27px] top-0 z-0">
      <svg
        width="3"
        height={lineHeight}
        viewBox={`0 0 3 ${lineHeight}`}
        fill="none"
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="mobileLineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <motion.line
          x1="1.5"
          y1="0"
          x2="1.5"
          y2={lineHeight}
          stroke="url(#mobileLineGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 2.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </svg>
    </div>
  );
}

/* ───────── Step number circle ───────── */
function StepCircle({ number, index }: { number: string; index: number }) {
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
      className="group relative z-10 shrink-0"
    >
      <div className="w-12 h-12 rounded-full flex items-center justify-center relative">
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/30 via-gold-light/20 to-bronze/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md scale-125" />

        {/* Gold gradient border ring */}
        <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-br from-gold via-gold-light to-bronze">
          <div className="w-full h-full rounded-full bg-sv-bg" />
        </div>

        {/* Inner content */}
        <span className="relative z-10 text-sm font-bold font-mono text-gold-gradient">
          {number}
        </span>
      </div>
    </motion.div>
  );
}

/* ───────── Detail tag with gold dot ───────── */
function DetailTag({
  text,
  delay,
}: {
  text: string;
  delay: number;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      className="group/tag inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-gold/5 text-gold/70 border border-gold/10 hover:bg-gold/10 hover:text-gold hover:border-gold/20 transition-all duration-300 cursor-default"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-gold/60 group-hover/tag:bg-gold transition-colors duration-300 shrink-0" />
      {text}
    </motion.span>
  );
}

/* ───────── Step card (desktop) ───────── */
function DesktopStepCard({
  step,
  index,
  isLeft,
}: {
  step: (typeof steps)[0];
  index: number;
  isLeft: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.18, duration: 0.7, ease: "easeOut" }}
      className={`relative ${isLeft ? "lg:pr-20 lg:text-right" : "lg:pl-20 lg:order-2"}`}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="group glass rounded-2xl p-8 relative overflow-hidden cursor-default"
      >
        {/* Gold top accent line on hover */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/0 to-transparent group-hover:via-gold/60 transition-all duration-500" />

        {/* Subtle gold border glow on hover */}
        <div className="absolute inset-0 rounded-2xl border border-gold/0 group-hover:border-gold/20 transition-all duration-500 pointer-events-none" />

        <div
          className={`flex items-center gap-4 mb-4 ${
            isLeft ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Icon container with glow */}
          <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-gold/10 to-bronze/10 border border-gold/20 flex items-center justify-center shrink-0 group-hover:border-gold/40 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-500">
            <step.icon className="w-6 h-6 text-gold group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div>
            <span className="text-xs font-mono text-gold/40 group-hover:text-gold/70 transition-colors duration-300">
              STEP {step.number}
            </span>
            <h3 className="text-2xl font-bold text-cream">{step.title}</h3>
          </div>
        </div>
        <p className="text-sv-muted leading-relaxed mb-5">{step.description}</p>
        <div
          className={`flex flex-wrap gap-2 ${
            isLeft ? "lg:justify-end" : ""
          }`}
        >
          {step.details.map((detail, j) => (
            <DetailTag
              key={j}
              text={detail}
              delay={index * 0.18 + 0.3 + j * 0.06}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ───────── Step card (mobile) ───────── */
function MobileStepCard({
  step,
  index,
}: {
  step: (typeof steps)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
      className="flex gap-4 items-start"
    >
      {/* Left: step circle */}
      <div className="flex flex-col items-center shrink-0 pt-2">
        <StepCircle number={step.number} index={index} />
      </div>

      {/* Right: card */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
        className="group glass rounded-2xl p-6 relative overflow-hidden flex-1 cursor-default"
      >
        {/* Gold top accent line on hover */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/0 to-transparent group-hover:via-gold/60 transition-all duration-500" />

        {/* Subtle gold border glow on hover */}
        <div className="absolute inset-0 rounded-2xl border border-gold/0 group-hover:border-gold/20 transition-all duration-500 pointer-events-none" />

        <div className="flex items-center gap-3 mb-3">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-gold/10 to-bronze/10 border border-gold/20 flex items-center justify-center shrink-0 group-hover:border-gold/40 group-hover:shadow-[0_0_16px_rgba(212,175,55,0.12)] transition-all duration-500">
            <step.icon className="w-5 h-5 text-gold group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-gold/40 group-hover:text-gold/70 transition-colors duration-300">
              STEP {step.number}
            </span>
            <h3 className="text-lg font-bold text-cream leading-tight">
              {step.title}
            </h3>
          </div>
        </div>
        <p className="text-sv-muted text-sm leading-relaxed mb-4">
          {step.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {step.details.map((detail, j) => (
            <DetailTag
              key={j}
              text={detail}
              delay={index * 0.15 + 0.25 + j * 0.05}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════ MAIN COMPONENT ═══════════════════ */
export default function Process() {
  return (
    <section id="process" className="relative py-24 overflow-hidden">
      <div className="section-divider mb-16" />

      {/* Background radial gradient glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-gold/[0.03] [background:radial-gradient(ellipse_at_center,rgba(212,175,55,0.06)_0%,rgba(168,120,66,0.03)_40%,transparent_70%)]" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-bronze/[0.02] [background:radial-gradient(ellipse_at_center,rgba(168,120,66,0.04)_0%,transparent_60%)]" />
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
            Our Methodology
          </motion.p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block text-cream mr-[0.3em]"
            >
              Our Growth
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="inline-block text-gold-gradient"
            >
              Process
            </motion.span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="max-w-2xl mx-auto text-sv-muted text-lg"
          >
            A battle-tested 5-step framework that delivers predictable,
            scalable growth.
          </motion.p>
        </motion.div>

        {/* ──── Desktop Timeline ──── */}
        <div className="hidden lg:block relative">
          <AnimatedTimelineLine totalSteps={steps.length} />

          <div className="space-y-6">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;

              return (
                <div
                  key={i}
                  className="relative lg:grid lg:grid-cols-2 lg:gap-16 items-center"
                >
                  {/* Center step circle */}
                  <div className="absolute left-1/2 top-8 -translate-x-1/2 z-10">
                    <StepCircle number={step.number} index={i} />
                  </div>

                  {/* Card */}
                  <DesktopStepCard step={step} index={i} isLeft={isLeft} />

                  {/* Spacer for alternating layout */}
                  <div className={isLeft ? "lg:order-2" : ""} />
                </div>
              );
            })}
          </div>
        </div>

        {/* ──── Mobile Timeline ──── */}
        <div className="lg:hidden relative">
          <MobileTimelineLine totalSteps={steps.length} />

          <div className="space-y-8 pl-0">
            {steps.map((step, i) => (
              <MobileStepCard key={i} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
