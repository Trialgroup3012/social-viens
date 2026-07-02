"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import PageShell from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  Star,
  TrendingUp,
  Shield,
  Zap,
  Loader2,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import {
  getServiceBySlug,
  getRelatedServices,
  type Service,
} from "@/lib/services-data";

/* ───────── Icon map: lucide icon name string → component ───────── */
import {
  Globe,
  Search,
  MapPin,
  Building2,
  Megaphone,
  Share2,
  Palette,
  Bot,
  Target,
  Lightbulb,
  Award,
  ShieldCheck,
  Rocket,
  Settings,
  Gauge,
  Code2,
  PenTool,
  LineChart,
  Users,
  Mail,
  Database,
  Cpu,
  MessageSquare,
  Calendar,
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

/* Feature icon rotation — keeps the feature grid visually varied. */
const featureIcons: LucideIcon[] = [
  Gauge,
  Code2,
  PenTool,
  LineChart,
  Database,
  Users,
  Cpu,
  MessageSquare,
  Lightbulb,
  Award,
  ShieldCheck,
  Rocket,
  Settings,
  Star,
  Mail,
  Calendar,
];

/* ───────── Section heading helper ───────── */
function SectionHeading({
  label,
  text1,
  text2,
  subtitle,
  align = "center",
}: {
  label: string;
  text1: string;
  text2: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <p className="text-sm tracking-[0.3em] text-gold/70 uppercase mb-4">
        {label}
      </p>
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight ${
          align === "center" ? "" : "text-left"
        }`}
      >
        <span className="text-cream">{text1} </span>
        <span className="text-gold-gradient">{text2}</span>
      </h2>
      {subtitle && (
        <p
          className={`text-sv-muted text-lg ${
            align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl"
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

/* ───────── Pricing card "What's included" checklist ───────── */
function buildInclusions(service: Service): string[] {
  // Derive a clean inclusion list from features + benefits + the results promise.
  return [
    ...service.benefits,
    ...service.features.slice(0, 4).map((f) => f.title),
    `Dedicated ${service.title.toLowerCase()} specialist`,
    "Monthly strategy calls & reporting",
    "Real-time performance dashboard",
  ].slice(0, 10);
}

/* ───────── Mini contact form (inline) ───────── */
function MiniContactForm({ serviceName }: { serviceName: string }) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="glass-strong rounded-3xl p-8 md:p-10 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-10"
        >
          <div className="w-16 h-16 rounded-full bg-success/10 border border-success/30 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-8 h-8 text-success" />
          </div>
          <h4 className="text-2xl font-bold text-cream mb-3">Thank You! 🎉</h4>
          <p className="text-sv-muted">
            Our growth expert will reach out within 24 hours with your custom{" "}
            {serviceName.toLowerCase()} strategy.
          </p>
        </motion.div>
      ) : (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setSubmitting(true);
            const formData = new FormData(e.currentTarget);
            const data = {
              name: formData.get("name"),
              email: formData.get("email"),
              phone: formData.get("phone"),
              service: serviceName,
              message: `I'm interested in ${serviceName}. Please reach out with a custom proposal.`,
            };
            try {
              const res = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
              });
              if (res.ok) setSubmitted(true);
            } catch {
              /* swallow — user can retry */
            } finally {
              setSubmitting(false);
            }
          }}
          className="space-y-4"
        >
          <h3 className="text-2xl font-bold text-cream mb-2">
            Get Your <span className="text-gold-gradient">Free Proposal</span>
          </h3>
          <p className="text-sv-muted text-sm mb-6">
            Tell us a bit about your business and our team will craft a custom{" "}
            {serviceName} proposal within 24 hours.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              type="text"
              required
              placeholder="Full Name *"
              className="w-full bg-sv-elevated border border-gold/15 rounded-xl px-4 py-3 text-cream focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/15 placeholder:text-sv-muted/40 transition-all"
            />
            <input
              name="phone"
              type="tel"
              required
              placeholder="Phone Number *"
              className="w-full bg-sv-elevated border border-gold/15 rounded-xl px-4 py-3 text-cream focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/15 placeholder:text-sv-muted/40 transition-all"
            />
          </div>
          <input
            name="email"
            type="email"
            required
            placeholder="Email Address *"
            className="w-full bg-sv-elevated border border-gold/15 rounded-xl px-4 py-3 text-cream focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/15 placeholder:text-sv-muted/40 transition-all"
          />

          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-to-r from-gold to-bronze text-sv-bg font-bold text-lg py-6 h-auto hover:shadow-xl hover:shadow-gold/20 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group"
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Get My Free Proposal
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>

          <div className="flex items-center justify-center gap-4 text-sv-muted/50 text-xs pt-2">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" /> Data encrypted
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> 24-hour response
            </span>
          </div>
        </form>
      )}
    </div>
  );
}

/* ═══════════════════ MAIN COMPONENT ═══════════════════ */
export default function ServiceDetailClient({ slug }: { slug: string }) {
  const service = getServiceBySlug(slug);
  if (!service) {
    return (
      <PageShell breadcrumbs={[{ label: "Services" }, { label: "Not Found" }]}>
        <div className="min-h-[60vh] flex items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-cream mb-4">
              Service Not Found
            </h1>
            <p className="text-sv-muted mb-8">
              The service you&apos;re looking for doesn&apos;t exist.
            </p>
            <Button asChild>
              <Link href="/services">
                <ArrowLeft className="mr-2 w-4 h-4" /> Back to all services
              </Link>
            </Button>
          </div>
        </div>
      </PageShell>
    );
  }

  const Icon = iconMap[service.icon] ?? Globe;
  const related = getRelatedServices(slug, 4);
  const inclusions = buildInclusions(service);

  return (
    <PageShell
      breadcrumbs={[
        { label: "Services", href: "/services" },
        { label: service.title },
      ]}
    >
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

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Gold badge with icon */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-sm font-medium mb-6">
                <Icon className="w-4 h-4" />
                {service.title.toUpperCase()}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-gold-gradient">{service.title}</span>
              </h1>

              <p className="text-sv-muted text-lg md:text-xl leading-relaxed mb-8">
                {service.longDescription}
              </p>

              {/* Quick stats */}
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-success" />
                  <span className="text-cream font-semibold">
                    {service.results}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-gold" />
                  <span className="text-cream font-semibold">
                    Starting at {service.startingPrice}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-gold to-bronze text-sv-bg font-bold text-lg px-8 py-6 h-auto hover:shadow-xl hover:shadow-gold/25 transition-all duration-300 group"
                >
                  <Link href="/contact">
                    Get Started
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
              </div>
            </motion.div>

            {/* Right: floating icon card with cover image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="glass-strong rounded-3xl gold-glow relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

                {/* Cover image banner */}
                {service.coverImage && (
                  <div className="relative h-44 md:h-52 overflow-hidden">
                    <Image
                      src={service.coverImage}
                      alt={`${service.title} cover image`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-sv-bg via-sv-bg/40 to-transparent" />
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-gold/15 text-gold border border-gold/30 backdrop-blur-sm">
                      {service.title}
                    </div>
                  </div>
                )}

                <div className="p-8 md:p-10">
                {/* Large floating icon */}
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-gold/15 to-bronze/15 border border-gold/30 flex items-center justify-center mx-auto shadow-2xl shadow-gold/20">
                    <Icon className="w-12 h-12 text-gold drop-shadow-[0_0_12px_rgba(212,175,55,0.5)]" />
                  </div>
                </div>

                {/* Benefits chips */}
                <div className="space-y-3">
                  <p className="text-sm tracking-[0.2em] text-gold/70 uppercase mb-3 text-center">
                    What&apos;s Included
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {service.benefits.map((b, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-full text-xs font-medium bg-gold/10 text-gold border border-gold/20"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats strip */}
                <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gold/10">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gold-gradient">
                      {service.results}
                    </div>
                    <div className="text-xs text-sv-muted uppercase tracking-wider mt-1">
                      Typical Outcome
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gold-gradient">
                      {service.startingPrice}
                    </div>
                    <div className="text-xs text-sv-muted uppercase tracking-wider mt-1">
                      Starting Price
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="hero-gradient-line mt-20 max-w-7xl mx-auto" />
      </section>

      {/* ───────── FEATURES / BENEFITS GRID ───────── */}
      <section className="relative py-16 md:py-24 overflow-hidden pattern-dots">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gold/[0.03] blur-[200px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeading
            label="What You Get"
            text1="Features &"
            text2="Benefits"
            subtitle={`Everything included in our ${service.title} package — engineered to deliver measurable growth.`}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.features.map((feature, i) => {
              const FeatureIcon = featureIcons[i % featureIcons.length];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 4) * 0.08, duration: 0.5 }}
                  className="group"
                >
                  <div className="glass rounded-2xl p-6 h-full card-hover border border-transparent hover:border-gold/30 hover:gold-glow transition-all duration-500 relative overflow-hidden">
                    <div className="absolute top-3 right-3 text-5xl font-bold text-gold/5 group-hover:text-gold/10 transition-colors duration-500">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/10 to-bronze/10 border border-gold/20 flex items-center justify-center mb-4 group-hover:border-gold/40 group-hover:shadow-lg group-hover:shadow-gold/10 transition-all duration-500">
                        <FeatureIcon className="w-6 h-6 text-gold group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <h3 className="text-base font-bold text-cream mb-2 group-hover:text-gold transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-sv-muted leading-relaxed text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        <div className="gold-divider" />
      </div>

      {/* ───────── PROCESS STEPS ───────── */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-gold/[0.04] blur-[150px]" />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <SectionHeading
            label="How It Works"
            text1="Our"
            text2="Process"
            subtitle={`A proven four-step process for delivering ${service.title.toLowerCase()} that drives real business outcomes.`}
          />

          <div className="relative">
            {/* Connecting line (desktop) */}
            <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.process.map((step, i) => (
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
                          <span className="text-lg font-bold font-mono text-gold-gradient">
                            {step.step}
                          </span>
                        </div>
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
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        <div className="gold-divider" />
      </div>

      {/* ───────── PRICING CARD + MINI CONTACT FORM ───────── */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gold/3 blur-[200px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <SectionHeading
            label="Pricing & Onboarding"
            text1="Transparent"
            text2="Pricing"
            subtitle={`No hidden fees. No long-term contracts. Just clear, value-based pricing for ${service.title.toLowerCase()}.`}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pricing card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="glass-strong rounded-3xl p-8 md:p-10 relative overflow-hidden h-full">
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

                {service.popular && (
                  <div className="absolute -top-3 right-6">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-gold to-bronze text-sv-bg shadow-lg shadow-gold/30">
                      <Sparkles className="w-3 h-3" /> Most Popular
                    </span>
                  </div>
                )}

                <p className="text-sm tracking-[0.3em] text-gold/70 uppercase mb-2">
                  Starting at
                </p>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl md:text-6xl font-bold text-gold-gradient">
                    {service.startingPrice}
                  </span>
                  <span className="text-sv-muted text-sm">/month</span>
                </div>
                <p className="text-sv-muted text-sm mb-8">
                  {service.shortDescription} Custom pricing based on scope,
                  industry, and goals.
                </p>

                {/* What's included checklist */}
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-cream uppercase tracking-wider mb-3">
                    What&apos;s Included:
                  </p>
                  {inclusions.map((inc, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04, duration: 0.4 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-gold" />
                      </div>
                      <span className="text-cream text-sm leading-snug">
                        {inc}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <Button
                  asChild
                  size="lg"
                  className="w-full mt-8 bg-gradient-to-r from-gold to-bronze text-sv-bg font-bold text-lg py-6 h-auto hover:shadow-xl hover:shadow-gold/25 transition-all duration-300 group"
                >
                  <Link href="/contact">
                    Get Started Today
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>

                <p className="text-center text-sv-muted/60 text-xs mt-4">
                  No long-term contracts · Cancel anytime · 30-day money-back
                  guarantee
                </p>
              </div>
            </motion.div>

            {/* Mini contact form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <MiniContactForm serviceName={service.title} />
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        <div className="gold-divider" />
      </div>

      {/* ───────── FAQ ───────── */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/[0.03] blur-[150px]" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <SectionHeading
            label="Common Questions"
            text1={`${service.title}`}
            text2="FAQs"
            subtitle={`Answers to the questions we hear most often about our ${service.title.toLowerCase()} service.`}
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {service.faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="glass rounded-xl border-0 px-6 data-[state=open]:gold-glow data-[state=open]:border-gold/20 transition-all duration-300 group"
                >
                  <AccordionTrigger className="text-left text-cream hover:text-gold hover:no-underline py-5 text-base md:text-lg font-medium group-data-[state=open]:text-gold transition-colors duration-300">
                    <span className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-gold/10 border border-gold/15 flex items-center justify-center text-gold text-xs font-bold shrink-0 group-data-[state=open]:bg-gold/20 group-data-[state=open]:border-gold/30 transition-all duration-300">
                        {i + 1}
                      </span>
                      {faq.q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sv-muted leading-relaxed pb-5 pl-10">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        <div className="gold-divider" />
      </div>

      {/* ───────── RELATED SERVICES ───────── */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-gold/[0.03] blur-[180px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeading
            label="Explore More"
            text1="Related"
            text2="Services"
            subtitle="Complementary services that pair perfectly with what you're exploring."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((rel, i) => {
              const RelIcon = iconMap[rel.icon] ?? Globe;
              return (
                <motion.div
                  key={rel.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="h-full"
                >
                  <Link
                    href={`/services/${rel.slug}`}
                    className="group glass rounded-2xl p-6 h-full flex flex-col card-hover border border-transparent hover:border-gold/30 hover:gold-glow transition-all duration-500 relative overflow-hidden block"
                  >
                    <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/10 to-bronze/10 border border-gold/20 flex items-center justify-center mb-4 group-hover:border-gold/40 transition-all duration-500">
                      <RelIcon className="w-6 h-6 text-gold group-hover:scale-110 transition-transform duration-500" />
                    </div>

                    <h3 className="text-lg font-bold text-cream mb-2 group-hover:text-gold transition-colors duration-300">
                      {rel.title}
                    </h3>
                    <p className="text-sv-muted text-sm leading-relaxed mb-4 flex-1">
                      {rel.shortDescription}
                    </p>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gold font-semibold">
                        {rel.startingPrice}
                      </span>
                      <span className="flex items-center gap-1 text-gold font-medium">
                        Explore
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Link back to all services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-gold hover:text-gold-light font-medium group transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              View All Services
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ───────── FINAL CTA ───────── */}
      <section className="relative py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/5 blur-[120px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm tracking-[0.3em] text-gold/70 uppercase mb-6">
              Ready to Grow?
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-cream">Let&apos;s Build Your</span>{" "}
              <span className="text-gold-gradient">{service.title} Plan</span>
            </h2>
            <p className="max-w-2xl mx-auto text-sv-muted text-lg mb-10 leading-relaxed">
              Book a free strategy session with our {service.title.toLowerCase()}{" "}
              specialists. We&apos;ll analyze your business, identify
              opportunities, and craft a custom roadmap — no strings attached.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-gold to-bronze text-sv-bg font-bold text-lg px-10 py-7 h-auto hover:shadow-xl hover:shadow-gold/25 transition-all duration-300 group"
              >
                <Link href="/contact">
                  <ArrowRight className="mr-2 w-5 h-5" />
                  Book Free Consultation
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-gold/30 text-gold hover:bg-gold/10 font-semibold text-lg px-10 py-7 h-auto"
              >
                <Link href="/services">Explore Other Services</Link>
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
    </PageShell>
  );
}
