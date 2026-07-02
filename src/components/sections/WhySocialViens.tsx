"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedHeading from "@/components/ui/animated-heading";
import {
  TrendingUp,
  Palette,
  BarChart3,
  Users,
  Bot,
  Eye,
} from "lucide-react";

const reasons = [
  {
    icon: TrendingUp,
    title: "Growth-First Strategy",
    description:
      "Every decision we make is driven by one metric: your business growth. We don't do vanity metrics — only ROI-focused execution.",
    stat: 96,
    statLabel: "Client Retention",
  },
  {
    icon: Palette,
    title: "Premium Creative Direction",
    description:
      "Our creative team delivers brand experiences that rival global agencies. Every pixel, every word, every interaction is crafted to perfection.",
    stat: 100,
    statLabel: "Design Satisfaction",
  },
  {
    icon: BarChart3,
    title: "Performance Marketing Experts",
    description:
      "Data-driven campaigns that maximize every rupee spent. We optimize relentlessly to deliver the highest possible ROAS.",
    stat: 300,
    statLabel: "Avg. ROAS %",
  },
  {
    icon: Users,
    title: "Dedicated Growth Team",
    description:
      "You get a dedicated strategist, designer, and developer — not a shared resource. Your business gets the focus it deserves.",
    stat: 98,
    statLabel: "Response Rate",
  },
  {
    icon: Bot,
    title: "AI-Powered Systems",
    description:
      "We leverage cutting-edge AI tools for smarter targeting, faster content creation, predictive analytics, and automated optimization.",
    stat: 60,
    statLabel: "Time Saved %",
  },
  {
    icon: Eye,
    title: "Transparent Reporting",
    description:
      "Real-time dashboards, weekly reports, monthly reviews. You always know exactly where your investment is going and what it's delivering.",
    stat: 24,
    statLabel: "Hour Reporting",
  },
];

export default function WhySocialViens() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="section-divider mb-16" />

      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gold/3 blur-[200px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] text-gold/70 uppercase mb-4">
            The Social Viens Difference
          </p>
          <AnimatedHeading text1="Why Choose" text2="Social Viens" />
          <p className="max-w-2xl mx-auto text-sv-muted text-lg">
            We&apos;re not another agency. We&apos;re your growth department.
          </p>
        </motion.div>

        {/* Showcase image strip — office + team collaboration */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16"
        >
          <div className="md:col-span-2 relative rounded-2xl overflow-hidden glass border border-gold/15 h-72 md:h-80 group">
            <Image
              src="/images/sections/office-workspace.png"
              alt="Social Viens luxury office workspace at golden hour"
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-sv-bg/85 via-sv-bg/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-gold text-xs tracking-[0.25em] uppercase mb-2 font-semibold">
                Our Studio
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-cream leading-tight">
                Where strategy meets <span className="text-gold-gradient">craftsmanship</span>
              </h3>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden glass border border-gold/15 h-72 md:h-80 group">
            <Image
              src="/images/sections/team-meeting.png"
              alt="Social Viens team collaborating on strategy"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-sv-bg/85 via-sv-bg/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-gold text-xs tracking-[0.25em] uppercase mb-1.5 font-semibold">
                Our Team
              </p>
              <h3 className="text-lg md:text-xl font-bold text-cream leading-tight">
                Senior practitioners, not account managers
              </h3>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group"
            >
              <div className="glass rounded-2xl p-8 card-hover h-full relative overflow-hidden">
                {/* Background number */}
                <div className="absolute top-4 right-4 text-7xl font-bold text-gold/5 group-hover:text-gold/10 transition-colors duration-500">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold/10 to-bronze/10 border border-gold/20 flex items-center justify-center mb-6 group-hover:border-gold/40 group-hover:shadow-lg group-hover:shadow-gold/10 transition-all duration-500">
                    <reason.icon className="w-7 h-7 text-gold group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h3 className="text-xl font-bold text-cream mb-3 group-hover:text-gold transition-colors duration-300">
                    {reason.title}
                  </h3>
                  <p className="text-sv-muted leading-relaxed mb-5">
                    {reason.description}
                  </p>

                  {/* Animated progress bar */}
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-sv-muted uppercase tracking-wider">
                        {reason.statLabel}
                      </span>
                      <span className="text-sm font-bold text-gold">
                        {reason.stat}
                        {reason.stat < 100 ? "%" : reason.stat === 24 ? "hr" : "%"}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-sv-elevated overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-gold via-gold-light to-bronze"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.min(reason.stat, 100)}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1.5,
                          delay: i * 0.1 + 0.3,
                          ease: [0.4, 0, 0.2, 1],
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
