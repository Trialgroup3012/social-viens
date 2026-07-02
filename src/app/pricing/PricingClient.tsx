"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Check,
  Crown,
  Rocket,
  TrendingUp,
  Sparkles,
  Shield,
  Zap,
  X,
  ArrowRight,
  Headphones,
  FileBarChart,
  PhoneCall,
  MessageCircle,
  LayoutDashboard,
  Unlock,
  Calculator,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnimatedHeading from "@/components/ui/animated-heading";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

/* ------------------------------------------------------------------ */
/*  Pricing tiers                                                      */
/* ------------------------------------------------------------------ */

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingTier {
  name: string;
  monthlyPrice: string;
  quarterlyPrice: string;
  period: string;
  description: string;
  icon: React.ReactNode;
  features: PricingFeature[];
  popular: boolean;
  cta: string;
  badge?: string;
  emoji?: string;
}

const tiers: PricingTier[] = [
  {
    name: "Starter",
    monthlyPrice: "₹25,000",
    quarterlyPrice: "₹21,250",
    period: "/month",
    description:
      "Perfect for small businesses getting started with digital marketing.",
    icon: <Rocket className="w-6 h-6" />,
    features: [
      { text: "Basic SEO (10 keywords)", included: true },
      { text: "Social Media Management (2 platforms)", included: true },
      { text: "Google Business Profile", included: true },
      { text: "Monthly Reporting", included: true },
      { text: "1 Landing Page", included: true },
      { text: "Email Support", included: true },
      { text: "Google Ads Management", included: false },
      { text: "Content Marketing", included: false },
      { text: "Lead Generation Funnels", included: false },
      { text: "Dedicated Account Manager", included: false },
    ],
    popular: false,
    cta: "Get Started",
  },
  {
    name: "Professional",
    monthlyPrice: "₹65,000",
    quarterlyPrice: "₹55,250",
    period: "/month",
    description:
      "For growing businesses ready to scale their digital presence.",
    icon: <TrendingUp className="w-6 h-6" />,
    features: [
      { text: "Advanced SEO (30 keywords)", included: true },
      { text: "Social Media (4 platforms)", included: true },
      { text: "Google Ads Management", included: true },
      { text: "Content Marketing", included: true },
      { text: "3 Landing Pages", included: true },
      { text: "Lead Generation Funnels", included: true },
      { text: "Bi-weekly Reports", included: true },
      { text: "Dedicated Account Manager", included: true },
      { text: "Priority Support", included: true },
      { text: "Marketing Automation", included: false },
    ],
    popular: true,
    cta: "Get Started",
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    monthlyPrice: "Custom",
    quarterlyPrice: "Custom",
    period: "",
    description:
      "For established businesses dominating their market with full-stack growth.",
    icon: <Crown className="w-6 h-6" />,
    features: [
      { text: "Full SEO Suite (unlimited keywords)", included: true },
      { text: "Paid Ads (Google + Meta + LinkedIn)", included: true },
      { text: "Social Media (6 platforms)", included: true },
      { text: "Brand Strategy", included: true },
      { text: "Marketing Automation", included: true },
      { text: "Unlimited Landing Pages", included: true },
      { text: "Advanced Analytics", included: true },
      { text: "AI-Powered Optimization", included: true },
      { text: "Weekly Strategy Calls", included: true },
      { text: "Dedicated Growth Team", included: true },
    ],
    popular: false,
    cta: "Book Consultation",
    emoji: "👑",
  },
];

/* ------------------------------------------------------------------ */
/*  What's included in every plan                                      */
/* ------------------------------------------------------------------ */

const inclusions = [
  {
    Icon: Headphones,
    title: "Dedicated Account Manager",
    desc: "One point of contact who knows your business inside out.",
  },
  {
    Icon: FileBarChart,
    title: "Monthly Reports",
    desc: "Transparent performance reports with clear KPIs.",
  },
  {
    Icon: PhoneCall,
    title: "Strategy Calls",
    desc: "Regular deep-dive strategy & roadmap sessions.",
  },
  {
    Icon: MessageCircle,
    title: "WhatsApp Support",
    desc: "Quick answers on the channel you already use.",
  },
  {
    Icon: LayoutDashboard,
    title: "Performance Dashboard",
    desc: "Real-time access to your live metrics & spend.",
  },
  {
    Icon: Unlock,
    title: "No Long-Term Contracts",
    desc: "Cancel anytime. We earn your business every month.",
  },
];

/* ------------------------------------------------------------------ */
/*  Comparison table                                                   */
/* ------------------------------------------------------------------ */

const comparisonRows: {
  feature: string;
  starter: string | boolean;
  professional: string | boolean;
  enterprise: string | boolean;
}[] = [
  { feature: "SEO Keywords", starter: "10", professional: "30", enterprise: "Unlimited" },
  { feature: "Social Platforms", starter: "2", professional: "4", enterprise: "6" },
  { feature: "Landing Pages", starter: "1", professional: "3", enterprise: "Unlimited" },
  { feature: "Google Ads", starter: false, professional: true, enterprise: true },
  { feature: "Meta + LinkedIn Ads", starter: false, professional: false, enterprise: true },
  { feature: "Content Marketing", starter: false, professional: true, enterprise: true },
  { feature: "Marketing Automation", starter: false, professional: false, enterprise: true },
  { feature: "Dedicated Account Mgr", starter: false, professional: true, enterprise: true },
  { feature: "Strategy Calls", starter: "Monthly", professional: "Bi-weekly", enterprise: "Weekly" },
  { feature: "Support SLA", starter: "48 hrs", professional: "24 hrs", enterprise: "Priority 24/7" },
];

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    q: "Are there any setup fees or hidden charges?",
    a: "No. The prices you see are exactly what you pay. We don't charge setup fees, onboarding fees, or any hidden costs. The only optional add-ons are paid ad budgets (which go directly to Google/Meta) and third-party tools if you need premium ones.",
  },
  {
    q: "Can I switch plans or cancel anytime?",
    a: "Absolutely. There are no long-term contracts on Starter or Professional plans. You can upgrade, downgrade, or cancel anytime with 30 days' notice. Enterprise plans are typically 6–12 month commitments, but terms are flexible.",
  },
  {
    q: "What does the 30-day money-back guarantee cover?",
    a: "If you're not satisfied with our service in the first 30 days, we'll refund your fee in full — no questions asked. We're confident in our work and want you to feel zero risk giving us a try.",
  },
  {
    q: "Do you offer custom or hybrid plans?",
    a: "Yes. Many of our clients fall between tiers or need specialized services (e.g. CRO, email automation, influencer marketing). Book a free consultation and we'll craft a custom plan that fits your goals and budget.",
  },
  {
    q: "What's the difference between monthly and quarterly billing?",
    a: "Monthly billing is paid month-to-month. Quarterly billing is billed every 3 months and gives you a 15% discount versus paying monthly. Annual billing (best value) gives 25% off — contact us for annual invoicing.",
  },
  {
    q: "Do you work with businesses outside India?",
    a: "Yes. While most of our clients are in Delhi NCR and across India, we work with businesses globally. All communication is in English and we accommodate time zones for strategy calls.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function PricingClient() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isQuarterly, setIsQuarterly] = useState(false);

  return (
    <div className="bg-sv-bg text-cream">
      {/* ============================== HERO ============================== */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 hero-gradient-line" />
        <div className="absolute top-10 left-[5%] w-[28rem] h-[28rem] rounded-full bg-gold/[0.05] blur-[140px] animate-float pointer-events-none" />
        <div
          className="absolute bottom-0 right-[8%] w-[24rem] h-[24rem] rounded-full bg-bronze/[0.06] blur-[130px] animate-float pointer-events-none"
          style={{ animationDelay: "2s", animationDuration: "11s" }}
        />
        <div className="absolute inset-0 pattern-dots opacity-[0.4] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/20 bg-gold/5 text-gold text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Investment Plans
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-6"
          >
            <AnimatedHeading text1="Transparent" text2="Pricing" className="!mb-0" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto text-cream/70 text-lg leading-relaxed mb-10"
          >
            No hidden fees. No long-term lock-ins. Just clear plans designed
            to deliver measurable ROI — scale up or down anytime.
          </motion.p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <span
              className={`text-sm font-medium transition-colors duration-300 ${
                !isQuarterly ? "text-cream" : "text-sv-muted"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsQuarterly(!isQuarterly)}
              className="relative w-14 h-7 rounded-full bg-sv-elevated border border-gold/20 transition-all duration-300 hover:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/20 cursor-pointer"
              aria-label="Toggle billing period"
            >
              <motion.div
                className="absolute top-0.5 w-6 h-6 rounded-full bg-gradient-to-r from-gold to-bronze shadow-lg shadow-gold/20"
                animate={{ left: isQuarterly ? "calc(100% - 26px)" : "2px" }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            </button>
            <span
              className={`text-sm font-medium transition-colors duration-300 ${
                isQuarterly ? "text-cream" : "text-sv-muted"
              }`}
            >
              Quarterly
            </span>
            <AnimatePresence>
              {isQuarterly && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-xs font-bold text-success bg-success/10 border border-success/20 px-2.5 py-1 rounded-full"
                >
                  Save 15%
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ============================== PRICING CARDS ============================== */}
      <section className="relative py-8 md:py-12" ref={ref}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
            }}
          >
            {tiers.map((tier) => (
              <motion.div
                key={tier.name}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: "easeOut" },
                  },
                }}
                className={`relative group ${tier.popular ? "lg:-mt-4 lg:mb-4 lg:scale-[1.03]" : ""}`}
              >
                {tier.popular && (
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-gold/40 via-gold/20 to-gold/40 opacity-60 blur-sm" />
                )}

                <div
                  className={`relative rounded-2xl p-6 lg:p-8 h-full flex flex-col transition-all duration-500 ${
                    tier.popular
                      ? "bg-gradient-to-b from-sv-elevated to-sv-surface border-2 border-gold/40 gold-glow-strong"
                      : "glass border border-border hover:border-gold/30"
                  }`}
                >
                  {tier.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1 rounded-full bg-gradient-to-r from-gold to-bronze text-sv-bg text-xs font-bold uppercase tracking-wider shadow-lg shadow-gold/20">
                        {tier.badge}
                      </span>
                    </div>
                  )}

                  {/* Header */}
                  <div className="mb-6 pt-2">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          tier.popular
                            ? "bg-gradient-to-br from-gold to-bronze text-sv-bg"
                            : "bg-sv-elevated border border-border text-gold"
                        }`}
                      >
                        {tier.emoji ? (
                          <span className="text-lg">{tier.emoji}</span>
                        ) : (
                          tier.icon
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-cream">
                        {tier.name}
                      </h3>
                    </div>

                    <div className="flex items-baseline gap-1 mb-2">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={isQuarterly ? "quarterly" : "monthly"}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="text-4xl lg:text-5xl font-bold text-cream"
                        >
                          {isQuarterly
                            ? tier.quarterlyPrice
                            : tier.monthlyPrice}
                        </motion.span>
                      </AnimatePresence>
                      {tier.period && (
                        <span className="text-sv-muted text-sm">
                          {tier.period}
                        </span>
                      )}
                    </div>
                    {isQuarterly && tier.monthlyPrice !== "Custom" && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs text-success/80 mb-1"
                      >
                        Billed quarterly — Save 15% vs monthly
                      </motion.p>
                    )}
                    <p className="text-sv-muted text-sm leading-relaxed">
                      {tier.description}
                    </p>
                  </div>

                  <div className="section-divider mb-6" />

                  {/* Features */}
                  <div className="flex-1 mb-8">
                    <ul className="space-y-3">
                      {tier.features.map((feature) => (
                        <li
                          key={feature.text}
                          className={`flex items-start gap-3 text-sm ${
                            feature.included
                              ? "text-cream"
                              : "text-sv-muted/40"
                          }`}
                        >
                          <div className="mt-0.5 shrink-0">
                            {feature.included ? (
                              <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center">
                                <Check className="w-3 h-3 text-success" />
                              </div>
                            ) : (
                              <div className="w-5 h-5 rounded-full bg-sv-elevated flex items-center justify-center">
                                <X className="w-3 h-3 text-sv-muted/30" />
                              </div>
                            )}
                          </div>
                          <span className={feature.included ? "" : "line-through"}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <Button
                    asChild
                    className={`w-full py-5 text-sm font-semibold transition-all duration-300 ripple-effect ${
                      tier.popular
                        ? "bg-gradient-to-r from-gold via-gold-light to-gold text-sv-bg hover:shadow-lg hover:shadow-gold/30 hover:scale-[1.02] active:scale-[0.98]"
                        : "bg-transparent border-2 border-gold/30 text-gold hover:bg-gold/10 hover:border-gold/50 hover:scale-[1.02] active:scale-[0.98]"
                    }`}
                  >
                    <Link href="/contact">{tier.cta}</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Guarantee Badge */}
          <motion.div
            className="mt-12 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass rounded-2xl px-8 py-5 flex items-center gap-4 border border-gold/15 gold-glow max-w-2xl">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/15 to-bronze/15 border border-gold/20 flex items-center justify-center shrink-0">
                <Shield className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h4 className="font-bold text-cream text-sm flex items-center gap-2">
                  <Zap className="w-4 h-4 text-gold" />
                  30-Day Money-Back Guarantee
                </h4>
                <p className="text-sv-muted text-xs mt-0.5">
                  Not seeing results in 30 days? We&apos;ll refund your fee in
                  full — zero risk, all upside.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================== WHAT'S INCLUDED ============================== */}
      <section className="relative py-16 md:py-24 border-t border-gold/10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="text-cream">Included in </span>
              <span className="text-gold-gradient">Every Plan</span>
            </h2>
            <p className="text-cream/60 text-sm md:text-base max-w-2xl mx-auto">
              No matter which tier you choose, these six essentials come
              standard.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {inclusions.map((item, i) => {
              const { Icon } = item;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="glass rounded-2xl p-6 card-hover group"
                >
                  <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-4 group-hover:gold-glow transition-all duration-300">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <h4 className="text-cream font-semibold mb-1.5">
                    {item.title}
                  </h4>
                  <p className="text-sv-muted text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================== COMPARISON TABLE ============================== */}
      <section className="relative py-16 md:py-24 border-t border-gold/10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="text-cream">Plan </span>
              <span className="text-gold-gradient">Comparison</span>
            </h2>
            <p className="text-cream/60 text-sm md:text-base max-w-2xl mx-auto">
              A side-by-side breakdown to help you decide.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass rounded-2xl overflow-hidden border border-gold/10"
          >
            {/* Table head */}
            <div className="grid grid-cols-4 bg-sv-elevated/60 border-b border-gold/15">
              <div className="p-4 md:p-5 text-xs md:text-sm font-semibold text-cream/70 uppercase tracking-wider">
                Feature
              </div>
              {tiers.map((t) => (
                <div
                  key={t.name}
                  className={`p-4 md:p-5 text-center ${
                    t.popular ? "bg-gold/5" : ""
                  }`}
                >
                  <div
                    className={`text-sm md:text-base font-bold ${
                      t.popular ? "text-gold" : "text-cream"
                    }`}
                  >
                    {t.name}
                  </div>
                  {t.popular && (
                    <div className="text-[10px] text-gold/70 uppercase tracking-wider mt-0.5">
                      Popular
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Table rows */}
            {comparisonRows.map((row, idx) => (
              <div
                key={row.feature}
                className={`grid grid-cols-4 border-b last:border-b-0 border-gold/5 ${
                  idx % 2 === 1 ? "bg-sv-elevated/20" : ""
                }`}
              >
                <div className="p-4 md:p-5 text-xs md:text-sm text-cream/80 font-medium">
                  {row.feature}
                </div>
                {[row.starter, row.professional, row.enterprise].map(
                  (val, i) => (
                    <div
                      key={i}
                      className={`p-4 md:p-5 text-center flex items-center justify-center ${
                        i === 1 ? "bg-gold/[0.03]" : ""
                      }`}
                    >
                      {typeof val === "boolean" ? (
                        val ? (
                          <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center">
                            <Check className="w-3 h-3 text-success" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-sv-elevated flex items-center justify-center">
                            <X className="w-3 h-3 text-sv-muted/30" />
                          </div>
                        )
                      ) : (
                        <span className="text-xs md:text-sm text-cream/80 font-medium">
                          {val}
                        </span>
                      )}
                    </div>
                  ),
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================== ROI CALCULATOR CTA ============================== */}
      <section className="relative py-16 md:py-20 border-t border-gold/10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gold/[0.05] blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-strong rounded-3xl p-8 md:p-12 border border-gold/15"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 mb-5">
              <Calculator className="w-7 h-7 text-gold" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              <span className="text-cream">Project Your </span>
              <span className="text-gold-gradient">ROI</span>
            </h2>
            <p className="text-cream/70 text-sm md:text-base mb-6 max-w-xl mx-auto">
              Use our interactive ROI calculator on the homepage to estimate
              your potential returns based on your industry, traffic & budget.
            </p>
            <Link
              href="/#roi-calculator"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-gold/30 text-gold font-semibold text-sm hover:bg-gold/10 hover:border-gold/50 transition-all duration-300 ripple-effect group"
            >
              Open ROI Calculator
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ============================== FAQ ============================== */}
      <section className="relative py-16 md:py-24 border-t border-gold/10">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <p className="text-gold text-xs tracking-widest uppercase mb-3 font-semibold">
              Pricing Questions
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="text-cream">Frequently </span>
              <span className="text-gold-gradient">Asked</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass rounded-2xl p-6 md:p-8 border border-gold/10"
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border-gold/10"
                >
                  <AccordionTrigger className="text-left text-cream hover:text-gold hover:no-underline text-sm md:text-base font-semibold py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sv-muted text-sm md:text-[15px] leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* ============================== CTA ============================== */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 gold-divider" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/[0.05] blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4 font-semibold">
              We&apos;re Here To Help
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-5 leading-tight">
              <span className="text-cream">Still have </span>
              <span className="text-gold-gradient">questions?</span>
            </h2>
            <p className="text-cream/70 text-lg mb-8 max-w-2xl mx-auto">
              Book a free strategy call. We&apos;ll help you pick the right
              plan — or build a custom one — for your goals.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-gold to-bronze text-sv-bg font-bold text-base hover:shadow-xl hover:shadow-gold/25 transition-all duration-300 ripple-effect group"
            >
              Talk to a strategist
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
