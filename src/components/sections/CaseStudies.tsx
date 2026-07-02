"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BarMetric {
  label: string;
  beforeDisplay: string;
  afterDisplay: string;
  beforePercent: number;
  afterPercent: number;
  increase: string;
}

const caseStudies = [
  {
    client: "Luxe Residences",
    industry: "Real Estate",
    title: "From Zero Online Presence to Market Dominance",
    image: "/images/portfolio/01-aurum-estates.png",
    barMetrics: [
      {
        label: "Monthly Leads",
        beforeDisplay: "8",
        afterDisplay: "85",
        beforePercent: 9,
        afterPercent: 100,
        increase: "962%",
      },
      {
        label: "Organic Traffic",
        beforeDisplay: "1.2K",
        afterDisplay: "45K",
        beforePercent: 3,
        afterPercent: 100,
        increase: "3650%",
      },
      {
        label: "Google Ranking",
        beforeDisplay: "Not in Top 100",
        afterDisplay: "#1 for 15+ KW",
        beforePercent: 5,
        afterPercent: 95,
        increase: "Top 1",
      },
      {
        label: "Conversion Rate",
        beforeDisplay: "0.8%",
        afterDisplay: "4.2%",
        beforePercent: 19,
        afterPercent: 100,
        increase: "425%",
      },
    ],
    metrics: [
      { label: "Lead Growth", value: "962%", icon: "📈" },
      { label: "Traffic Growth", value: "3650%", icon: "🚀" },
      { label: "Revenue Impact", value: "₹2.4Cr", icon: "💰" },
    ],
  },
  {
    client: "MedVista Healthcare",
    industry: "Healthcare",
    title: "Digital Transformation for Multi-Location Clinic",
    image: "/images/portfolio/02-carewell-clinics.png",
    barMetrics: [
      {
        label: "Monthly Leads",
        beforeDisplay: "15",
        afterDisplay: "120",
        beforePercent: 13,
        afterPercent: 100,
        increase: "700%",
      },
      {
        label: "Organic Traffic",
        beforeDisplay: "3K",
        afterDisplay: "38K",
        beforePercent: 8,
        afterPercent: 100,
        increase: "1167%",
      },
      {
        label: "Google Ranking",
        beforeDisplay: "Page 3+",
        afterDisplay: "Top 3 for 20+ KW",
        beforePercent: 15,
        afterPercent: 90,
        increase: "Top 3",
      },
      {
        label: "Conversion Rate",
        beforeDisplay: "1.2%",
        afterDisplay: "5.8%",
        beforePercent: 21,
        afterPercent: 100,
        increase: "383%",
      },
    ],
    metrics: [
      { label: "Patient Inquiries", value: "700%", icon: "📈" },
      { label: "Local Visibility", value: "Top 3", icon: "🎯" },
      { label: "Revenue Impact", value: "₹1.8Cr", icon: "💰" },
    ],
  },
  {
    client: "Beauté Elite",
    industry: "Beauty & Salon",
    title: "Luxury Salon Brand Refresh & Local SEO Dominance",
    image: "/images/portfolio/06-glow-beauty-lounge.png",
    barMetrics: [
      {
        label: "Monthly Leads",
        beforeDisplay: "20",
        afterDisplay: "95",
        beforePercent: 21,
        afterPercent: 100,
        increase: "375%",
      },
      {
        label: "Organic Traffic",
        beforeDisplay: "800",
        afterDisplay: "22K",
        beforePercent: 4,
        afterPercent: 100,
        increase: "2650%",
      },
      {
        label: "Google Ranking",
        beforeDisplay: "Page 5+",
        afterDisplay: "#1 Local Search",
        beforePercent: 10,
        afterPercent: 95,
        increase: "#1",
      },
      {
        label: "Conversion Rate",
        beforeDisplay: "1.5%",
        afterDisplay: "6.2%",
        beforePercent: 24,
        afterPercent: 100,
        increase: "313%",
      },
    ],
    metrics: [
      { label: "Booking Growth", value: "375%", icon: "📈" },
      { label: "Social Following", value: "50K+", icon: "⭐" },
      { label: "Revenue Impact", value: "₹85L", icon: "💰" },
    ],
  },
];

function MetricBarRow({
  metric,
  index,
}: {
  metric: BarMetric;
  index: number;
}) {
  return (
    <div className="flex flex-col gap-2">
      {/* Label row */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-sv-muted font-medium">
          {metric.label}
        </span>
        <span className="text-xs font-bold text-gold bg-gold/10 px-2 py-0.5 rounded-full border border-gold/20 flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          {metric.increase}
        </span>
      </div>

      {/* Before bar */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-sv-muted/70 w-12 text-right shrink-0">
          {metric.beforeDisplay}
        </span>
        <div className="flex-1 h-5 rounded-full bg-sv-muted/5 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${metric.beforePercent}%` }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.1,
              duration: 1.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="h-full rounded-full"
            style={{ backgroundColor: "rgba(181, 173, 163, 0.3)" }}
          />
        </div>
      </div>

      {/* After bar */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-gold font-semibold w-12 text-right shrink-0">
          {metric.afterDisplay}
        </span>
        <div className="flex-1 h-5 rounded-full bg-sv-muted/5 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${metric.afterPercent}%` }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.1 + 0.2,
              duration: 1.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="h-full rounded-full"
            style={{
              background:
                "linear-gradient(90deg, #D4AF37, #A87842, #D4AF37)",
              backgroundSize: "200% 100%",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function CaseStudies() {
  return (
    <section id="case-studies" className="relative py-24 overflow-hidden">
      <div className="section-divider mb-16" />

      {/* Background accent */}
      <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-gold/3 blur-[150px] -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] text-gold/70 uppercase mb-4">
            Proven Results
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-cream">Case</span>{" "}
            <span className="text-gold-gradient">Studies</span>
          </h2>
          <p className="max-w-2xl mx-auto text-sv-muted text-lg">
            Real results for real businesses. Every number tells a growth story.
          </p>
        </motion.div>

        <div className="space-y-8">
          {caseStudies.map((study, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              className="glass rounded-3xl overflow-hidden card-hover"
            >
              <div className="p-8 md:p-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                  <div className="flex items-start gap-5">
                    {/* Case study thumbnail */}
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border border-gold/20 shrink-0 hidden sm:block">
                      <Image
                        src={study.image}
                        alt={`${study.client} case study thumbnail`}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-sv-bg/40 to-transparent" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gold/10 text-gold border border-gold/20">
                          {study.industry}
                        </span>
                        <span className="text-sv-muted text-sm">
                          {study.client}
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-cream">
                        {study.title}
                      </h3>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="border-gold/20 text-gold hover:bg-gold/10 self-start"
                  >
                    View Full Case Study <ArrowUpRight className="ml-1 w-4 h-4" />
                  </Button>
                </div>

                {/* Before/After Bar Charts */}
                <div className="rounded-2xl p-6 md:p-8 bg-sv-bg/80 border border-sv-muted/10">
                  {/* Legend */}
                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: "rgba(181, 173, 163, 0.3)" }}
                      />
                      <span className="text-xs text-sv-muted/70 uppercase tracking-wider font-semibold">
                        Before
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{
                          background:
                            "linear-gradient(90deg, #D4AF37, #A87842)",
                        }}
                      />
                      <span className="text-xs text-gold uppercase tracking-wider font-semibold">
                        After
                      </span>
                    </div>
                  </div>

                  {/* Metric rows */}
                  <div className="space-y-5">
                    {study.barMetrics.map((metric, j) => (
                      <MetricBarRow key={j} metric={metric} index={j} />
                    ))}
                  </div>
                </div>

                {/* Key metrics */}
                <div className="flex flex-wrap gap-4 mt-8">
                  {study.metrics.map((metric, j) => (
                    <div
                      key={j}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold/5 border border-gold/10"
                    >
                      <span className="text-lg">{metric.icon}</span>
                      <div>
                        <p className="text-sm font-bold text-gold">
                          {metric.value}
                        </p>
                        <p className="text-xs text-sv-muted">{metric.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-gold/20 text-gold hover:bg-gold/10 px-8"
          >
            <a href="#contact">
              Want Results Like These?{" "}
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
