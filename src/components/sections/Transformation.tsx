"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Transformation {
  client: string;
  industry: string;
  beforeSummary: string;
  afterSummary: string;
  beforeStats: { label: string; value: string }[];
  afterStats: { label: string; value: string }[];
  gradient: string;
  timeline: string;
}

const transformations: Transformation[] = [
  {
    client: "Luxe Residences",
    industry: "Real Estate",
    beforeSummary:
      "Invisible online. Zero organic leads. Losing market share to competitors with strong digital presence.",
    afterSummary:
      "Dominating local search. 85+ qualified leads/month. #1 ranking for 15+ high-value keywords.",
    beforeStats: [
      { label: "Monthly Leads", value: "8" },
      { label: "Organic Traffic", value: "1.2K" },
      { label: "Google Rank", value: "100+" },
    ],
    afterStats: [
      { label: "Monthly Leads", value: "85" },
      { label: "Organic Traffic", value: "45K" },
      { label: "Google Rank", value: "#1" },
    ],
    gradient: "from-amber-600/20 via-gold/10 to-transparent",
    timeline: "6 months",
  },
  {
    client: "MedVista Healthcare",
    industry: "Healthcare",
    beforeSummary:
      "Outdated website. No local SEO. Patients couldn't find them online. Losing to bigger hospital chains.",
    afterSummary:
      "7x more patient inquiries. Top 3 local rankings across all practice areas. Multi-location dominance.",
    beforeStats: [
      { label: "Monthly Inquiries", value: "15" },
      { label: "Local Visibility", value: "Low" },
      { label: "Site Speed", value: "8.2s" },
    ],
    afterStats: [
      { label: "Monthly Inquiries", value: "120" },
      { label: "Local Visibility", value: "Top 3" },
      { label: "Site Speed", value: "1.8s" },
    ],
    gradient: "from-emerald-600/20 via-gold/10 to-transparent",
    timeline: "5 months",
  },
  {
    client: "Beauté Elite",
    industry: "Beauty & Salon",
    beforeSummary:
      "No social media strategy. Word-of-mouth only. Struggling to fill appointment slots consistently.",
    afterSummary:
      "Most searched beauty brand in the city. 50K+ social following. Consistent bookings 3 weeks out.",
    beforeStats: [
      { label: "Monthly Bookings", value: "20" },
      { label: "Social Following", value: "800" },
      { label: "Brand Searches", value: "0" },
    ],
    afterStats: [
      { label: "Monthly Bookings", value: "95" },
      { label: "Social Following", value: "50K+" },
      { label: "Brand Searches", value: "2K/mo" },
    ],
    gradient: "from-rose-600/20 via-gold/10 to-transparent",
    timeline: "4 months",
  },
];

export default function Transformation() {
  return (
    <section id="transformations" className="relative py-24 overflow-hidden">
      <div className="section-divider mb-16" />

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-gold/[0.03] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-bronze/[0.04] rounded-full blur-[150px]" />
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
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/20 bg-gold/5 text-gold text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Real Transformations
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-cream">Before & </span>
            <span className="text-gold-gradient">After</span>
          </h2>
          <p className="max-w-2xl mx-auto text-sv-muted text-lg">
            See the dramatic difference our strategies make. Real businesses,
            real results, real growth.
          </p>
        </motion.div>

        {/* Transformation cards */}
        <div className="space-y-8">
          {transformations.map((t, i) => (
            <motion.div
              key={t.client}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              className="group"
            >
              <div className="glass rounded-3xl overflow-hidden glow-border-hover">
                {/* Card header */}
                <div className="p-6 md:p-8 border-b border-gold/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gold/10 text-gold border border-gold/20">
                      {t.industry}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-cream">
                      {t.client}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-sv-muted">
                    <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    Transformed in{" "}
                    <span className="text-gold font-semibold">
                      {t.timeline}
                    </span>
                  </div>
                </div>

                {/* Before / After comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Before */}
                  <div className="p-6 md:p-8 border-r border-gold/10 relative">
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500/40 to-red-500/0" />
                    <div className="mb-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-400/80 bg-red-500/10 border border-red-500/15 px-3 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                        Before
                      </span>
                    </div>
                    <p className="text-sv-muted text-sm leading-relaxed mb-6">
                      {t.beforeSummary}
                    </p>
                    <div className="space-y-3">
                      {t.beforeStats.map((stat, j) => (
                        <div
                          key={j}
                          className="flex items-center justify-between py-2 px-4 rounded-lg bg-sv-bg/50 border border-sv-muted/10"
                        >
                          <span className="text-sm text-sv-muted/70">
                            {stat.label}
                          </span>
                          <span className="text-sm font-semibold text-sv-muted/50">
                            {stat.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* After */}
                  <div className="p-6 md:p-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold/0 to-gold/60" />
                    {/* Subtle gradient glow */}
                    <div
                      className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${t.gradient} rounded-full blur-[80px] pointer-events-none`}
                    />
                    <div className="relative z-10">
                      <div className="mb-4">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold bg-gold/10 border border-gold/20 px-3 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                          After Social Viens
                        </span>
                      </div>
                      <p className="text-cream/90 text-sm leading-relaxed mb-6">
                        {t.afterSummary}
                      </p>
                      <div className="space-y-3">
                        {t.afterStats.map((stat, j) => (
                          <motion.div
                            key={j}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              delay: i * 0.15 + j * 0.1 + 0.3,
                              duration: 0.5,
                            }}
                            className="flex items-center justify-between py-2 px-4 rounded-lg bg-gold/[0.06] border border-gold/15"
                          >
                            <span className="text-sm text-sv-muted">
                              {stat.label}
                            </span>
                            <span className="text-sm font-bold text-gold-gradient">
                              {stat.value}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Arrow indicator between before/after - visible on md+ */}
                <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gold to-bronze flex items-center justify-center shadow-lg shadow-gold/20">
                    <ArrowRight className="w-5 h-5 text-sv-bg" />
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
            className="bg-gradient-to-r from-gold to-bronze text-sv-bg font-bold px-8 py-6 text-base hover:shadow-xl hover:shadow-gold/25 transition-all duration-300 group ripple-effect"
          >
            <a href="#contact">
              Want a Transformation Like This?
              <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
