"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PageShell from "@/components/layout/PageShell";
import AnimatedHeading from "@/components/ui/animated-heading";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Search,
  Palette,
  Rocket,
  Settings,
  Sparkles,
  Zap,
  ShieldCheck,
  TrendingUp,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import {
  services,
  type Service,
} from "@/lib/services-data";

/* ───────── Icon map: lucide icon name string → component ───────── */
import {
  Globe,
  MapPin,
  Building2,
  Megaphone,
  Share2,
  Bot,
  Target,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Search,
  MapPin,
  Building2,
  Megaphone,
  Share2,
  Palette,
  Bot,
  Target,
};

/* ───────── Differentiators ───────── */
const differentiators = [
  {
    icon: TrendingUp,
    title: "Growth-First, Not Deliverables-First",
    description:
      "Every recommendation is tied to revenue impact. We measure success by your ROI, not by hours billed or tasks completed.",
  },
  {
    icon: Palette,
    title: "Premium Creative Direction",
    description:
      "Award-winning designers and strategists craft every asset — your brand looks world-class across every touchpoint.",
  },
  {
    icon: Zap,
    title: "AI-Powered Execution",
    description:
      "We leverage AI for faster content, smarter targeting, and predictive analytics — delivering more output per rupee.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Reporting",
    description:
      "Real-time dashboards, weekly reports, monthly reviews. You always know exactly what you're paying for and what it's delivering.",
  },
];

/* ───────── Process steps (Discovery → Design → Launch → Grow) ───────── */
const processSteps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery",
    description:
      "We deep-dive into your business, audience, and competitors to identify the highest-impact growth opportunities.",
  },
  {
    number: "02",
    icon: Palette,
    title: "Design",
    description:
      "We craft a custom strategy with clear milestones, KPIs, and creative direction tailored to your brand.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Launch",
    description:
      "Our specialists execute the strategy with precision — campaigns, content, code, and creative shipped on time.",
  },
  {
    number: "04",
    icon: Settings,
    title: "Grow",
    description:
      "We monitor, test, and scale what works — compounding your results month after month with relentless optimization.",
  },
];

/* ───────── Section heading helper ───────── */
function SectionHeading({
  label,
  text1,
  text2,
  subtitle,
}: {
  label: string;
  text1: string;
  text2: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-center mb-16"
    >
      <p className="text-sm tracking-[0.3em] text-gold/70 uppercase mb-4">
        {label}
      </p>
      <AnimatedHeading text1={text1} text2={text2} />
      {subtitle && (
        <p className="max-w-2xl mx-auto text-sv-muted text-lg mt-4">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

/* ───────── Service card ───────── */
function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = iconMap[service.icon] ?? Globe;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 3) * 0.1, duration: 0.6 }}
      className="h-full"
    >
      <Link
        href={`/services/${service.slug}`}
        className="group glass rounded-2xl h-full flex flex-col card-hover border border-transparent hover:border-gold/30 hover:gold-glow transition-all duration-500 relative overflow-hidden block"
      >
        {/* Cover image banner */}
        {service.coverImage && (
          <div className="relative h-36 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/15 to-bronze/15" />
            <img
              src={service.coverImage}
              alt={`${service.title} cover image`}
              className="object-cover transition-transform duration-700 group-hover:scale-105 w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-sv-bg via-sv-bg/40 to-transparent" />
            {/* Icon badge */}
            <div className="absolute top-3 left-3 w-10 h-10 rounded-lg glass border border-gold/30 flex items-center justify-center">
              <Icon className="w-5 h-5 text-gold" />
            </div>
            {/* Popular badge */}
            {service.popular && (
              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-gradient-to-r from-gold to-bronze text-sv-bg shadow-lg shadow-gold/30">
                  <Sparkles className="w-2.5 h-2.5" /> Popular
                </span>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-8 flex flex-col flex-1">
        {/* Gold top accent */}
        <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Icon (shown only when no cover image) */}
        {!service.coverImage && (
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold/10 to-bronze/10 border border-gold/20 flex items-center justify-center mb-6 group-hover:border-gold/40 group-hover:shadow-lg group-hover:shadow-gold/10 transition-all duration-500">
            <Icon className="w-7 h-7 text-gold group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.5)] transition-all duration-500" />
          </div>
        )}

        {/* Title */}
        <h3 className="text-2xl font-bold text-cream mb-3 group-hover:text-gold transition-colors duration-300">
          {service.title}
        </h3>

        {/* Description (4-5 lines) */}
        <p className="text-sv-muted text-sm leading-relaxed mb-6 flex-1">
          {service.shortDescription} We deliver this through a proven
          framework combining strategy, premium creative, and data-driven
          optimization — engineered to move the metrics that matter to your
          business.
        </p>

        {/* Benefits */}
        <div className="flex flex-wrap gap-2 mb-6">
          {service.benefits.slice(0, 4).map((benefit, j) => (
            <span
              key={j}
              className="px-3 py-1 rounded-full text-xs font-medium bg-gold/5 text-gold/80 border border-gold/10"
            >
              {benefit}
            </span>
          ))}
        </div>

        {/* Results + price */}
        <div className="flex items-center justify-between mb-4 pt-4 border-t border-gold/10">
          <span className="text-sm font-semibold text-success flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            {service.results}
          </span>
          <span className="text-xs text-sv-muted/80 font-medium">
            Starting at{" "}
            <span className="text-gold font-semibold">
              {service.startingPrice}
            </span>
          </span>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-end text-gold font-medium text-sm group-hover:text-gold-light transition-colors">
          Explore Service
          <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ServicesClient() {
  return (
    <PageShell breadcrumbs={[{ label: "Services" }]}>
      {/* ───────── HERO ───────── */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Floating gradient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-[5%] w-72 h-72 rounded-full bg-gold/5 blur-[120px] animate-float" />
          <div
            className="absolute bottom-10 right-[5%] w-96 h-96 rounded-full bg-bronze/5 blur-[140px] animate-float"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/3 blur-[160px] animate-float"
            style={{ animationDelay: "4s" }}
          />
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4" />
            WHAT WE OFFER
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
          >
            <span className="text-cream">Our </span>
            <span className="text-gold-gradient">Services</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto text-sv-muted text-lg md:text-xl leading-relaxed"
          >
            Nine comprehensive digital marketing services designed to deliver
            measurable growth. From website development to lead generation,
            every service is engineered to move the metrics that matter to
            your business.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-gold to-bronze text-sv-bg font-bold text-lg px-8 py-6 h-auto hover:shadow-xl hover:shadow-gold/25 transition-all duration-300 group"
            >
              <Link href="/contact">
                Get a Free Proposal
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-gold/30 text-gold hover:bg-gold/10 font-semibold text-lg px-8 py-6 h-auto"
            >
              <Link href="/#schedule-call">Schedule a Call</Link>
            </Button>
          </motion.div>
        </div>

        <div className="hero-gradient-line mt-20 max-w-4xl mx-auto" />
      </section>

      {/* ───────── SERVICES GRID ───────── */}
      <section className="relative py-16 md:py-24 overflow-hidden pattern-dots">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gold/[0.03] blur-[200px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeading
            label="Premium Digital Marketing Services"
            text1="Everything You Need"
            text2="to Grow"
            subtitle="Pick a service to explore in detail — or contact us for a custom multi-service growth plan."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        <div className="gold-divider" />
      </div>

      {/* ───────── WHY CHOOSE OUR SERVICES ───────── */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gold/3 blur-[200px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeading
            label="The Social Viens Difference"
            text1="Why Choose"
            text2="Our Services"
            subtitle="We're not another agency. We're your growth department — and here's what that means in practice."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group"
              >
                <div className="glass rounded-2xl p-8 h-full card-hover border border-transparent hover:border-gold/30 hover:gold-glow transition-all duration-500 relative overflow-hidden">
                  <div className="absolute top-4 right-4 text-6xl font-bold text-gold/5 group-hover:text-gold/10 transition-colors duration-500">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold/10 to-bronze/10 border border-gold/20 flex items-center justify-center mb-6 group-hover:border-gold/40 group-hover:shadow-lg group-hover:shadow-gold/10 transition-all duration-500">
                      <d.icon className="w-7 h-7 text-gold group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <h3 className="text-lg font-bold text-cream mb-3 group-hover:text-gold transition-colors duration-300">
                      {d.title}
                    </h3>
                    <p className="text-sv-muted leading-relaxed text-sm">
                      {d.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        <div className="gold-divider" />
      </div>

      {/* ───────── PROCESS TIMELINE ───────── */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-gold/[0.04] blur-[150px]" />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <SectionHeading
            label="Our Methodology"
            text1="How We"
            text2="Work"
            subtitle="A proven four-step framework that turns your goals into measurable growth."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connecting line on desktop */}
            <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="relative"
              >
                <div className="glass rounded-2xl p-6 md:p-8 h-full card-hover border border-transparent hover:border-gold/30 transition-all duration-500 group text-center">
                  {/* Step number circle */}
                  <div className="relative w-16 h-16 mx-auto mb-5">
                    <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-br from-gold via-gold-light to-bronze">
                      <div className="w-full h-full rounded-full bg-sv-bg flex items-center justify-center">
                        <step.icon className="w-6 h-6 text-gold group-hover:scale-110 transition-transform duration-500" />
                      </div>
                    </div>
                    {/* Step number badge */}
                    <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-br from-gold to-bronze flex items-center justify-center text-xs font-bold text-sv-bg shadow-lg shadow-gold/30">
                      {step.number}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-cream mb-3 group-hover:text-gold transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-sv-muted text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── CTA SECTION ───────── */}
      <section className="relative py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/5 blur-[120px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-strong rounded-3xl p-8 md:p-12 gold-glow relative overflow-hidden text-center"
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

            <p className="text-sm tracking-[0.3em] text-gold/70 uppercase mb-6">
              We&apos;re Here to Help
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="text-cream">Not Sure Which Service</span>{" "}
              <span className="text-gold-gradient">You Need?</span>
            </h2>
            <p className="max-w-2xl mx-auto text-sv-muted text-lg mb-10 leading-relaxed">
              Book a free 30-minute strategy call. We&apos;ll analyze your
              business, recommend the right services (or combination), and give
              you a custom growth roadmap — no commitment required.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-gold to-bronze text-sv-bg font-bold text-lg px-10 py-7 h-auto hover:shadow-xl hover:shadow-gold/25 transition-all duration-300 group"
              >
                <Link href="/contact">
                  <ArrowRight className="mr-2 w-5 h-5" />
                  Get Free Consultation
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-gold/30 text-gold hover:bg-gold/10 font-semibold text-lg px-10 py-7 h-auto"
              >
                <Link href="/#schedule-call">
                  <Clock className="mr-2 w-5 h-5" />
                  Schedule a Call
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sv-muted text-sm mt-10 pt-8 border-t border-gold/10">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success" /> Free
                Consultation
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success" /> 24-Hour
                Response
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success" /> No
                Commitment
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success" /> Custom
                Roadmap
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Decorative bottom arrow link to contact */}
      <div className="text-center pb-16">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 text-gold hover:text-gold-light font-medium group transition-colors"
        >
          Or jump straight to our contact form
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Link>
      </div>
    </PageShell>
  );
}
