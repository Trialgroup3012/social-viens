"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
  ArrowRight,
  Sparkles,
} from "lucide-react";
import TiltCard from "@/components/ui/tilt-card";
import AnimatedHeading from "@/components/ui/animated-heading";
import { GoldButton } from "@/components/ui/gold-button";

const services = [
  {
    icon: Globe,
    title: "Website Development",
    benefits: ["Custom Design", "Mobile-First", "Fast Loading", "SEO Ready"],
    results: "3x More Conversions",
    description:
      "Stunning, high-performance websites that convert visitors into customers.",
    pricing: "₹25,000",
    popular: false,
  },
  {
    icon: Search,
    title: "SEO Services",
    benefits: ["Keyword Strategy", "On-Page SEO", "Link Building", "Technical SEO"],
    results: "5x Organic Traffic",
    description:
      "Dominate search rankings and drive qualified organic traffic to your business.",
    pricing: "₹15,000",
    popular: true,
  },
  {
    icon: MapPin,
    title: "Local SEO",
    benefits: ["Google Maps", "Local Citations", "Reviews", "NAP Consistency"],
    results: "First Page Rankings",
    description:
      "Become the top choice in your city with powerful local search optimization.",
    pricing: "₹10,000",
    popular: false,
  },
  {
    icon: Building2,
    title: "Google Business Profile",
    benefits: ["Profile Setup", "Optimization", "Review Management", "Posts"],
    results: "2x More Calls",
    description:
      "Maximize your Google Business presence for more calls and directions.",
    pricing: "₹8,000",
    popular: false,
  },
  {
    icon: Megaphone,
    title: "Paid Ads",
    benefits: ["Google Ads", "Meta Ads", "YouTube Ads", "Retargeting"],
    results: "300% ROAS",
    description:
      "High-ROI advertising campaigns that deliver measurable business results.",
    pricing: "₹20,000",
    popular: false,
  },
  {
    icon: Share2,
    title: "Social Media",
    benefits: ["Content Strategy", "Community", "Influencer", "Analytics"],
    results: "10x Engagement",
    description:
      "Build a powerful social presence that drives brand awareness and sales.",
    pricing: "₹12,000",
    popular: false,
  },
  {
    icon: Palette,
    title: "Branding",
    benefits: ["Brand Strategy", "Visual Identity", "Guidelines", "Messaging"],
    results: "Strong Brand Recall",
    description:
      "Craft a premium brand identity that commands attention and trust.",
    pricing: "₹30,000",
    popular: false,
  },
  {
    icon: Bot,
    title: "Automation",
    benefits: ["Chatbots", "Email Flows", "CRM Integration", "Workflows"],
    results: "60% Time Saved",
    description:
      "Automate repetitive tasks and nurture leads 24/7 with intelligent systems.",
    pricing: "₹18,000",
    popular: false,
  },
  {
    icon: Target,
    title: "Lead Generation",
    benefits: ["Landing Pages", "Funnels", "A/B Testing", "Lead Magnets"],
    results: "5x More Leads",
    description:
      "Generate a steady stream of qualified leads with conversion-focused funnels.",
    pricing: "₹15,000",
    popular: false,
  },
];

const pad2 = (n: number) => String(n).padStart(2, "0");

export default function Services() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="relative py-24 lg:py-28 overflow-hidden pattern-dots"
    >
      {/* Section divider on top */}
      <div className="section-divider mb-16" />

      {/* Ambient gradient mesh — faint slowly moving gold radial glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="glow-gold glow-float"
          style={{
            top: "8%",
            left: "-6%",
            width: "420px",
            height: "420px",
          }}
        />
        <div
          className="glow-gold glow-float-delay"
          style={{
            top: "55%",
            right: "-8%",
            width: "460px",
            height: "460px",
          }}
        />
        <div
          className="glow-gold glow-float"
          style={{
            bottom: "-10%",
            left: "35%",
            width: "380px",
            height: "380px",
            opacity: 0.6,
          }}
        />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center mb-14 lg:mb-16"
        >
          <span className="eyebrow-label">What We Do</span>
          <div className="mt-5">
            <AnimatedHeading text1="Our Premium" text2="Services" />
          </div>
          <div className="heading-divider" />
          <p className="max-w-2xl mx-auto text-sv-muted text-base sm:text-lg mt-6 leading-relaxed">
            Every service is engineered to deliver measurable growth for your
            business. No fluff. Just results that compound.
          </p>
        </motion.div>

        {/* Services grid — 1 / 2 / 3 cols */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.6 }}
              className="h-full"
            >
              <TiltCard className="group h-full" tiltAmount={6}>
                <div
                  className="card-premium sheen-sweep relative h-full flex flex-col p-7 sm:p-8"
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Popular badge */}
                  {service.popular && (
                    <div className="absolute -top-3 right-6 z-20">
                      <span className="service-popular-badge">Popular</span>
                    </div>
                  )}

                  {/* Number badge (top-left corner) */}
                  <div className="absolute top-5 right-6 z-10 num-badge">
                    {pad2(i + 1)}
                  </div>

                  {/* Icon container with soft gold radial glow */}
                  <div className="relative mb-6">
                    {/* radial glow behind icon */}
                    <div
                      aria-hidden="true"
                      className="absolute -inset-3 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(212,175,55,0.18) 0%, transparent 70%)",
                        filter: "blur(8px)",
                      }}
                    />
                    <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-gold/15 to-bronze/10 border border-gold/25 flex items-center justify-center group-hover:border-gold/50 group-hover:shadow-lg group-hover:shadow-gold/15 transition-all duration-500">
                      <motion.div
                        animate={
                          hoveredCard === i
                            ? { scale: [1, 1.18, 1.06] }
                            : { scale: 1 }
                        }
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      >
                        <service.icon className="w-7 h-7 text-gold" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-cream mb-3 group-hover:text-gold transition-colors duration-300 tracking-tight">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sv-muted text-sm sm:text-base mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Benefits — pill-shaped with subtle gold border */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.benefits.map((benefit, j) => (
                      <span
                        key={j}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-gold/5 text-gold/85 border border-gold/15 hover:border-gold/40 hover:bg-gold/10 transition-all duration-300 cursor-default"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>

                  {/* Results + pricing */}
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-4 pt-4 border-t border-gold/10">
                      <span className="text-sm font-semibold text-success inline-flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        {service.results}
                      </span>
                      <span className="text-xs text-sv-muted/70 font-medium">
                        From{" "}
                        <span className="text-cream/90 font-semibold">
                          {service.pricing}
                        </span>
                      </span>
                    </div>

                    {/* Learn more link — animates in on hover */}
                    <div className="flex items-center justify-end">
                      <a
                        href="#contact"
                        className="group/link inline-flex items-center gap-1 text-sm font-semibold text-gold hover:text-gold-light transition-colors"
                      >
                        <span className="relative">
                          Learn more
                          <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold group-hover/link:w-full transition-all duration-400 ease-out" />
                        </span>
                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                      </a>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* View all services CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex justify-center mt-14 lg:mt-16"
        >
          <GoldButton href="#contact" size="lg" className="group">
            View All Services
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </GoldButton>
        </motion.div>
      </div>
    </section>
  );
}
