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
} from "lucide-react";
import { Button } from "@/components/ui/button";

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
    name: "Growth Starter",
    monthlyPrice: "₹25,000",
    quarterlyPrice: "₹22,500",
    period: "/month",
    description:
      "Perfect for small businesses getting started with digital marketing",
    icon: <Rocket className="w-6 h-6" />,
    features: [
      { text: "Basic SEO", included: true },
      { text: "Social Media Management (2 platforms)", included: true },
      { text: "Google Business Profile", included: true },
      { text: "Monthly Reporting", included: true },
      { text: "1 Landing Page", included: true },
      { text: "Email Support", included: true },
      { text: "Google Ads Management", included: false },
      { text: "Content Marketing", included: false },
      { text: "Lead Generation Funnels", included: false },
      { text: "Dedicated Account Manager", included: false },
      { text: "Marketing Automation", included: false },
      { text: "AI-Powered Optimization", included: false },
    ],
    popular: false,
    cta: "Get Started",
  },
  {
    name: "Business Accelerator",
    monthlyPrice: "₹55,000",
    quarterlyPrice: "₹49,500",
    period: "/month",
    description: "For growing businesses ready to scale their digital presence",
    icon: <TrendingUp className="w-6 h-6" />,
    features: [
      { text: "Advanced SEO", included: true },
      { text: "Social Media (4 platforms)", included: true },
      { text: "Google Ads Management", included: true },
      { text: "Content Marketing", included: true },
      { text: "3 Landing Pages", included: true },
      { text: "Lead Generation Funnels", included: true },
      { text: "Bi-weekly Reports", included: true },
      { text: "Dedicated Account Manager", included: true },
      { text: "Priority Support", included: true },
      { text: "Brand Strategy", included: false },
      { text: "Marketing Automation", included: false },
      { text: "AI-Powered Optimization", included: false },
    ],
    popular: true,
    cta: "Get Started",
    badge: "Most Popular",
  },
  {
    name: "Enterprise Growth",
    monthlyPrice: "₹1,20,000",
    quarterlyPrice: "₹1,08,000",
    period: "/month",
    description: "For established businesses dominating their market",
    icon: <Crown className="w-6 h-6" />,
    features: [
      { text: "Full SEO Suite", included: true },
      { text: "Paid Ads (Google + Meta)", included: true },
      { text: "Social Media (6 platforms)", included: true },
      { text: "Brand Strategy", included: true },
      { text: "Marketing Automation", included: true },
      { text: "Unlimited Landing Pages", included: true },
      { text: "Advanced Analytics", included: true },
      { text: "AI-Powered Optimization", included: true },
      { text: "Weekly Strategy Calls", included: true },
      { text: "Dedicated Growth Team", included: true },
      { text: "24/7 Support", included: true },
      { text: "Custom Integrations", included: true },
    ],
    popular: false,
    cta: "Book Consultation",
    emoji: "👑",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Pricing() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isQuarterly, setIsQuarterly] = useState(false);

  return (
    <section id="pricing" className="relative py-24 overflow-hidden pattern-diagonal">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-bronze/5 rounded-full blur-[120px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>

      <div
        className="max-w-7xl mx-auto px-6 relative z-10"
        ref={ref as React.RefObject<HTMLDivElement>}
      >
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/20 bg-gold/5 text-gold text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="w-4 h-4" />
            Investment Plans
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-cream">Choose Your </span>
            <span className="text-gold-gradient">Growth Plan</span>
          </h2>
          <p className="text-sv-muted text-lg max-w-2xl mx-auto mb-8">
            Transparent pricing, no hidden fees. Every plan is designed to
            deliver measurable ROI and accelerate your business growth.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span
              className={`text-sm font-medium transition-colors duration-300 ${
                !isQuarterly ? "text-cream" : "text-sv-muted"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsQuarterly(!isQuarterly)}
              className="relative w-14 h-7 rounded-full bg-sv-elevated border border-gold/20 transition-all duration-300 hover:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/20"
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
            {isQuarterly && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-xs font-bold text-success bg-success/10 border border-success/20 px-2.5 py-1 rounded-full"
              >
                Save 10%
              </motion.span>
            )}
          </div>
        </motion.div>

        {/* Pricing cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={cardVariants}
              className={`relative group ${tier.popular ? "lg:-mt-4 lg:mb-4" : ""}`}
            >
              {/* Popular glow background */}
              {tier.popular && (
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-gold/40 via-gold/20 to-gold/40 opacity-60 blur-sm" />
              )}

              {/* Card */}
              <div
                className={`relative rounded-2xl p-6 lg:p-8 h-full flex flex-col transition-all duration-500 ${
                  tier.popular
                    ? "bg-gradient-to-b from-sv-elevated to-sv-surface border-2 border-gold/40 gold-glow-strong"
                    : "glass border border-border hover:border-gold/30"
                }`}
              >
                {/* Badge */}
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
                    <span className="text-sv-muted text-sm">
                      {tier.period}
                    </span>
                  </div>
                  {isQuarterly && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-success/80 mb-1"
                    >
                      Billed quarterly — Save{" "}
                      {tier.monthlyPrice.replace(/[^\d,]/g, "") &&
                        "10% annually"}
                    </motion.p>
                  )}
                  <p className="text-sv-muted text-sm leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                {/* Divider */}
                <div className="section-divider mb-6" />

                {/* Features */}
                <div className="flex-1 mb-8">
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li
                        key={feature.text}
                        className={`flex items-start gap-3 text-sm ${
                          feature.included ? "text-cream" : "text-sv-muted/40"
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {feature.included ? (
                            <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center">
                              <Check className="w-3 h-3 text-success" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-sv-elevated flex items-center justify-center">
                              <span className="w-2 h-2 rounded-full bg-sv-muted/20" />
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
                  className={`w-full py-5 text-sm font-semibold transition-all duration-300 ${
                    tier.popular
                      ? "bg-gradient-to-r from-gold via-gold-light to-gold text-sv-bg hover:shadow-lg hover:shadow-gold/30 hover:scale-[1.02] active:scale-[0.98]"
                      : "bg-transparent border-2 border-gold/30 text-gold hover:bg-gold/10 hover:border-gold/50 hover:scale-[1.02] active:scale-[0.98]"
                  }`}
                >
                  <a href="#contact-form">{tier.cta}</a>
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Guarantee Badge */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <div className="glass rounded-2xl px-8 py-5 flex items-center gap-4 border border-gold/15 gold-glow">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/15 to-bronze/15 border border-gold/20 flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h4 className="font-bold text-cream text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-gold" />
                30-Day Performance Guarantee
              </h4>
              <p className="text-sv-muted text-xs mt-0.5">
                Not seeing results in 30 days? We&apos;ll work for free until you do.
                Zero risk, all upside.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom note */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <p className="text-sv-muted text-sm">
            All plans include monthly strategy review, competitive analysis, and
            performance dashboards.
            <br />
            <span className="text-gold">Need a custom plan?</span>{" "}
            <a
              href="#contact-form"
              className="underline underline-offset-4 hover:text-gold transition-colors"
            >
              Let&apos;s talk
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
