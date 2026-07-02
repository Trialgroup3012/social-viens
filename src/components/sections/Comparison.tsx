"use client";

import { motion } from "framer-motion";
import { Check, X, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedHeading from "@/components/ui/animated-heading";

interface ComparisonRow {
  feature: string;
  us: boolean;
  usLabel: string;
  others: boolean;
  othersLabel: string;
}

const comparisons: ComparisonRow[] = [
  {
    feature: "Dedicated Growth Team",
    us: true,
    usLabel: "Included",
    others: false,
    othersLabel: "Shared resources",
  },
  {
    feature: "AI-Powered Optimization",
    us: true,
    usLabel: "Included",
    others: false,
    othersLabel: "Manual only",
  },
  {
    feature: "Custom Strategy (Not Templates)",
    us: true,
    usLabel: "Included",
    others: false,
    othersLabel: "Cookie-cutter",
  },
  {
    feature: "24/7 Support & Reporting",
    us: true,
    usLabel: "Included",
    others: false,
    othersLabel: "Business hours only",
  },
  {
    feature: "Transparent Pricing",
    us: true,
    usLabel: "Included",
    others: false,
    othersLabel: "Hidden fees",
  },
  {
    feature: "Industry-Specific Expertise",
    us: true,
    usLabel: "Included",
    others: false,
    othersLabel: "General approach",
  },
  {
    feature: "Weekly Strategy Calls",
    us: true,
    usLabel: "Included",
    others: false,
    othersLabel: "Monthly at best",
  },
  {
    feature: "Performance Guarantees",
    us: true,
    usLabel: "Included",
    others: false,
    othersLabel: "No guarantees",
  },
  {
    feature: "In-House Creative Team",
    us: true,
    usLabel: "Included",
    others: false,
    othersLabel: "Outsourced",
  },
  {
    feature: "Real-Time Dashboard Access",
    us: true,
    usLabel: "Included",
    others: false,
    othersLabel: "Basic reports",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function Comparison() {
  return (
    <section id="comparison" className="relative py-24 overflow-hidden">
      <div className="section-divider mb-16" />

      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gold/5 blur-[180px]" />
        <div
          className="absolute top-1/4 right-[15%] w-72 h-72 rounded-full bg-bronze/5 blur-[120px] animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-1/4 left-[10%] w-64 h-64 rounded-full bg-gold/4 blur-[100px] animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] text-gold/70 uppercase mb-4">
            The Clear Choice
          </p>
          <AnimatedHeading text1="Why Choose Us" text2="Vs Others" />
          <p className="max-w-2xl mx-auto text-sv-muted text-lg">
            See how Social Viens outperforms typical agencies across every
            dimension that matters.
          </p>
        </motion.div>

        {/* Desktop 3-column table */}
        <motion.div
          className="hidden md:block"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <div className="glass rounded-2xl overflow-hidden gold-glow border border-gold/10">
            {/* Table Header */}
            <div className="grid grid-cols-3 border-b border-gold/10">
              {/* Feature header */}
              <div className="p-5 md:p-6 flex items-center">
                <span className="text-sm md:text-base font-semibold text-sv-muted uppercase tracking-wider">
                  Feature
                </span>
              </div>
              {/* Social Viens header - highlighted */}
              <div className="relative p-5 md:p-6 bg-gradient-to-b from-gold/15 via-gold/8 to-transparent border-l border-r border-gold/15">
                {/* RECOMMENDED badge */}
                <div className="absolute -top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-gradient-to-r from-gold via-gold-light to-gold text-sv-bg text-[10px] md:text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-gold/30 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    Recommended
                  </div>
                </div>
                <div className="text-center pt-2">
                  <span className="text-lg md:text-xl font-bold text-gold-gradient">
                    Social Viens
                  </span>
                </div>
              </div>
              {/* Others header */}
              <div className="p-5 md:p-6 flex items-center justify-center">
                <span className="text-sm md:text-base font-semibold text-sv-muted/60 uppercase tracking-wider">
                  Typical Agency
                </span>
              </div>
            </div>

            {/* Table Body */}
            {comparisons.map((row, i) => (
              <motion.div
                key={row.feature}
                variants={rowVariants}
                className={`grid grid-cols-3 group hover:bg-gold/[0.03] transition-colors duration-300 ${
                  i < comparisons.length - 1
                    ? "border-b border-gold/[0.06]"
                    : ""
                }`}
              >
                {/* Feature name */}
                <div className="p-4 md:p-5 flex items-center">
                  <span className="text-sm md:text-base font-medium text-cream/90 group-hover:text-gold transition-colors duration-300">
                    {row.feature}
                  </span>
                </div>
                {/* Social Viens value */}
                <div className="p-4 md:p-5 flex items-center justify-center border-l border-r border-gold/[0.08] bg-gradient-to-b from-gold/[0.02] to-transparent">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-success/15 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-success" />
                    </div>
                    <span className="text-sm font-medium text-success">
                      {row.usLabel}
                    </span>
                  </div>
                </div>
                {/* Others value */}
                <div className="p-4 md:p-5 flex items-center justify-center">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center">
                      <X className="w-3.5 h-3.5 text-red-400/70" />
                    </div>
                    <span className="text-sm text-sv-muted/60">
                      {row.othersLabel}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mobile card layout */}
        <div className="md:hidden space-y-4">
          {comparisons.map((row, i) => (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
            >
              <div className="glass rounded-xl p-4 border border-gold/10 hover:border-gold/20 transition-all duration-300">
                {/* Feature title */}
                <h4 className="text-base font-semibold text-cream mb-3">
                  {row.feature}
                </h4>
                {/* Two value columns */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Us */}
                  <div className="rounded-lg bg-gold/[0.06] border border-gold/15 p-3 text-center">
                    <div className="text-[10px] font-semibold text-gold/70 uppercase tracking-wider mb-2">
                      Social Viens
                    </div>
                    <div className="flex items-center justify-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-success/15 flex items-center justify-center">
                        <Check className="w-3 h-3 text-success" />
                      </div>
                      <span className="text-xs font-medium text-success">
                        {row.usLabel}
                      </span>
                    </div>
                  </div>
                  {/* Others */}
                  <div className="rounded-lg bg-sv-elevated/50 border border-white/5 p-3 text-center">
                    <div className="text-[10px] font-semibold text-sv-muted/50 uppercase tracking-wider mb-2">
                      Typical Agency
                    </div>
                    <div className="flex items-center justify-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center">
                        <X className="w-3 h-3 text-red-400/70" />
                      </div>
                      <span className="text-xs text-sv-muted/60">
                        {row.othersLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-gold via-gold-light to-gold text-sv-bg font-bold px-8 py-6 text-base rounded-full hover:shadow-lg hover:shadow-gold/30 hover:scale-105 transition-all duration-300 group"
          >
            <a href="#contact">
              See The Difference Yourself
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
