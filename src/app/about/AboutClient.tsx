"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import PageShell from "@/components/layout/PageShell";
import AnimatedHeading from "@/components/ui/animated-heading";
import { Button } from "@/components/ui/button";
import {
  Lightbulb,
  Award,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  Linkedin,
  Twitter,
  Sparkles,
  Rocket,
  Calendar,
  CheckCircle2,
} from "lucide-react";

/* ───────── Animated counter ───────── */
function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) =>
    decimals > 0 ? latest.toFixed(decimals) : Math.round(latest).toString()
  );

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, {
        duration: 2,
        ease: [0.25, 0.46, 0.45, 0.94],
      });
      return controls.stop;
    }
  }, [inView, value, count]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

/* ───────── Stats data ───────── */
const stats = [
  { value: 750, suffix: "+", label: "Happy Clients", icon: TrendingUp },
  { value: 12, suffix: "+", label: "Years of Growth", icon: Calendar },
  { value: 750, suffix: "+", label: "Projects Delivered", icon: Rocket },
  { value: 4.9, suffix: "", label: "Average Rating", icon: Award, decimals: 1 },
];

/* ───────── Values data ───────── */
const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We embrace AI, automation, and emerging platforms to give our clients an unfair advantage. Complacency is the enemy of growth.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "Premium quality is non-negotiable. Every pixel, every word, every campaign is crafted to the highest standard — or we don't ship it.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    description:
      "We tell you the truth, even when it's uncomfortable. No vanity metrics, no hidden fees, no shortcuts. Just honest, transparent partnership.",
  },
  {
    icon: TrendingUp,
    title: "Results",
    description:
      "We measure ourselves by your growth, not our deliverables. If it doesn't move the needle on revenue, we don't do it.",
  },
];

/* ───────── Team data (smaller set for about preview) ───────── */
const teamMembers = [
  {
    name: "Arjun Malhotra",
    role: "Founder & CEO",
    bio: "10+ years building growth systems for ambitious brands",
    initials: "AM",
    gradient: "from-gold via-gold-light to-gold",
  },
  {
    name: "Priya Sharma",
    role: "Head of SEO",
    bio: "Ranked 200+ websites on page 1 of Google",
    initials: "PS",
    gradient: "from-bronze via-gold to-bronze",
  },
  {
    name: "Rahul Verma",
    role: "Creative Director",
    bio: "Award-winning designer crafting premium brand experiences",
    initials: "RV",
    gradient: "from-gold via-bronze to-gold-light",
  },
  {
    name: "Ananya Patel",
    role: "Performance Marketing Lead",
    bio: "Delivers 300%+ ROAS consistently across paid channels",
    initials: "AP",
    gradient: "from-gold-light via-gold to-bronze",
  },
];

/* ───────── Milestones timeline ───────── */
const milestones = [
  {
    year: "2021",
    title: "The Beginning",
    description:
      "SOCIAL VIENS was founded in New Delhi with a single mission: bring global-agency quality digital marketing to ambitious Indian businesses. First client signed within 2 weeks.",
  },
  {
    year: "2022",
    title: "First 25 Clients",
    description:
      "Crossed 25 active retainer clients across real estate, healthcare, and law firms. Built our proprietary SEO framework and hit 96% client retention.",
  },
  {
    year: "2023",
    title: "Team Growth & Awards",
    description:
      "Expanded team to 15 specialists. Won 'Emerging Digital Marketing Agency of the Year' at the Indian Marketing Awards. Launched our automation practice.",
  },
  {
    year: "2024",
    title: "50+ Clients & AI Integration",
    description:
      "Crossed 50 active clients. Integrated AI across content, ad creative, and analytics — cutting delivery time by 40% while improving quality.",
  },
  {
    year: "2025",
    title: "100+ Brands & Counting",
    description:
      "Celebrated 100 successful brand transformations. Opened our Dwarka office. Now serving 9 service verticals with a 25-person specialist team.",
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

export default function AboutClient() {
  return (
    <PageShell
      breadcrumbs={[{ label: "About" }]}
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

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4" />
            OUR STORY
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
          >
            <span className="text-cream">About </span>
            <span className="text-gold-gradient">SOCIAL VIENS</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto text-sv-muted text-lg md:text-xl leading-relaxed"
          >
            We&apos;re not just another digital marketing agency. We&apos;re your
            outsourced growth department — a team of specialists obsessed with
            one outcome: measurable, scalable revenue growth for your business.
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
                Work With Us
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-gold/30 text-gold hover:bg-gold/10 font-semibold text-lg px-8 py-6 h-auto"
            >
              <Link href="/services">Explore Services</Link>
            </Button>
          </motion.div>

          {/* Office showcase image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="mt-16 relative rounded-3xl overflow-hidden glass border border-gold/15 mx-auto max-w-5xl group"
          >
            <div className="relative h-72 md:h-96">
              <Image
                src="/images/sections/about-office.png"
                alt="Social Viens luxury marketing agency office interior"
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sv-bg/85 via-sv-bg/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-left">
                <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-semibold">
                  Our Studio · Delhi NCR
                </p>
                <h2 className="text-2xl md:text-4xl font-bold text-cream leading-tight max-w-2xl">
                  Where ambition meets <span className="text-gold-gradient">execution</span>
                </h2>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom gradient line */}
        <div className="hero-gradient-line mt-20 max-w-4xl mx-auto" />
      </section>

      {/* ───────── STORY + STATS ───────── */}
      <section className="relative py-20 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-sm tracking-[0.3em] text-gold/70 uppercase mb-4">
                Our Journey
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                <span className="text-cream">From a Two-Person Team to a</span>{" "}
                <span className="text-gold-gradient">Growth Powerhouse</span>
              </h2>
              <div className="space-y-4 text-sv-muted text-base md:text-lg leading-relaxed">
                <p>
                  SOCIAL VIENS was born in 2021 from a simple frustration:
                  Indian businesses were paying global-agency prices for
                  template-grade digital marketing. We knew there was a better
                  way.
                </p>
                <p>
                  So we built an agency that combines the strategic depth and
                  creative polish of a global brand consultancy with the
                  agility, transparency, and affordability that Indian SMEs
                  actually need. No vanity metrics. No fluff. Just ROI-focused
                  execution.
                </p>
                <p>
                  Five years later, we&apos;ve helped{" "}
                  <span className="text-gold font-semibold">100+ brands</span>{" "}
                  across real estate, healthcare, law, e-commerce, and local
                  services grow their digital presence, generate qualified
                  leads, and scale revenue — all while maintaining a{" "}
                  <span className="text-gold font-semibold">96% retention</span>{" "}
                  rate that we&apos;re deeply proud of.
                </p>
              </div>

              {/* Quick values list */}
              <div className="grid grid-cols-2 gap-3 mt-8">
                {[
                  "Growth-first strategy",
                  "Premium creative direction",
                  "Transparent reporting",
                  "Dedicated growth team",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
                    <span className="text-cream text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: stats card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="glass-strong rounded-3xl p-8 md:p-10 gold-glow relative overflow-hidden">
                {/* Top gold accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

                {/* Background number */}
                <div className="absolute -top-8 -right-4 text-[180px] font-bold text-gold/5 leading-none pointer-events-none select-none">
                  5+
                </div>

                <div className="relative z-10">
                  <p className="text-sm tracking-[0.3em] text-gold/70 uppercase mb-2">
                    By The Numbers
                  </p>
                  <h3 className="text-2xl font-bold text-cream mb-8">
                    Five Years. Real Impact.
                  </h3>

                  <div className="grid grid-cols-2 gap-6">
                    {stats.map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * i + 0.3, duration: 0.5 }}
                        className="text-center p-4 rounded-2xl bg-sv-elevated/40 border border-gold/10"
                      >
                        <stat.icon className="w-6 h-6 text-gold mx-auto mb-2" />
                        <div className="text-3xl md:text-4xl font-bold text-gold-gradient mb-1">
                          <AnimatedCounter
                            value={stat.value}
                            suffix={stat.suffix}
                            decimals={stat.decimals ?? 0}
                          />
                        </div>
                        <div className="text-xs text-sv-muted uppercase tracking-wider">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        <div className="gold-divider" />
      </div>

      {/* ───────── VALUES ───────── */}
      <section className="relative py-20 md:py-24 overflow-hidden pattern-dots">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/[0.03] blur-[200px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeading
            label="What We Stand For"
            text1="Our Core"
            text2="Values"
            subtitle="Four principles that guide every decision, every campaign, and every client relationship."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group"
              >
                <div className="glass rounded-2xl p-8 h-full card-hover border border-transparent hover:border-gold/30 hover:gold-glow transition-all duration-500 relative overflow-hidden">
                  {/* Background number */}
                  <div className="absolute top-4 right-4 text-6xl font-bold text-gold/5 group-hover:text-gold/10 transition-colors duration-500">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold/10 to-bronze/10 border border-gold/20 flex items-center justify-center mb-6 group-hover:border-gold/40 group-hover:shadow-lg group-hover:shadow-gold/10 transition-all duration-500">
                      <value.icon className="w-7 h-7 text-gold group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <h3 className="text-xl font-bold text-cream mb-3 group-hover:text-gold transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-sv-muted leading-relaxed text-sm">
                      {value.description}
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

      {/* ───────── TEAM PREVIEW ───────── */}
      {/* Team section temporarily hidden — will be re-added later */}
      {false && (
      <section className="relative py-20 md:py-24 overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-gold/5 blur-[120px] animate-float" />
          <div
            className="absolute bottom-20 right-[10%] w-80 h-80 rounded-full bg-bronze/5 blur-[140px] animate-float"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeading
            label="The People Behind The Results"
            text1="Meet The"
            text2="Growth Team"
            subtitle="Senior specialists who've shipped results for 100+ brands across India."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group"
              >
                <div className="glass rounded-2xl p-6 h-full relative overflow-hidden card-hover border border-transparent hover:border-gold/30 hover:gold-glow transition-all duration-500">
                  {/* Background accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gold/3 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 flex flex-col items-center text-center">
                    {/* Avatar */}
                    <div className="relative mb-5">
                      <div
                        className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center shadow-lg shadow-gold/10`}
                      >
                        <span className="text-xl font-bold text-sv-bg tracking-wide">
                          {member.initials}
                        </span>
                      </div>
                      <div className="absolute -inset-1.5 rounded-full border border-gold/20 group-hover:border-gold/40 transition-colors duration-500" />
                    </div>

                    <h3 className="text-lg font-bold text-cream mb-1 group-hover:text-gold-light transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-sm font-medium text-gold mb-3">
                      {member.role}
                    </p>
                    <p className="text-sv-muted text-xs leading-relaxed mb-5">
                      {member.bio}
                    </p>

                    {/* Social icons */}
                    <div className="flex items-center gap-3">
                      <a
                        href="#"
                        aria-label={`${member.name} LinkedIn`}
                        className="w-9 h-9 rounded-lg bg-sv-elevated border border-gold/10 flex items-center justify-center text-sv-muted hover:text-gold hover:border-gold/30 transition-all duration-300"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a
                        href="#"
                        aria-label={`${member.name} Twitter`}
                        className="w-9 h-9 rounded-lg bg-sv-elevated border border-gold/10 flex items-center justify-center text-sv-muted hover:text-gold hover:border-gold/30 transition-all duration-300"
                      >
                        <Twitter className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Link to full team / homepage team section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link
              href="/#team"
              className="inline-flex items-center gap-2 text-gold hover:text-gold-light font-medium group transition-colors"
            >
              See the full team
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
      )}

      <div className="max-w-7xl mx-auto px-6">
        <div className="gold-divider" />
      </div>

      {/* ───────── MILESTONES TIMELINE ───────── */}
      <section className="relative py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-gold/[0.03] blur-[180px]" />
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <SectionHeading
            label="Milestones"
            text1="Our Journey"
            text2="So Far"
            subtitle="Five years of growth, learning, and brand transformations — with much more to come."
          />

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent md:-translate-x-1/2" />

            <div className="space-y-12">
              {milestones.map((m, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: i * 0.05 }}
                    className={`relative flex items-center gap-6 md:gap-12 ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Year dot */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gold to-bronze ring-4 ring-sv-bg shadow-lg shadow-gold/30" />
                    </div>

                    {/* Spacer for desktop alternating layout */}
                    <div className="hidden md:block flex-1" />

                    {/* Card */}
                    <div className="flex-1 ml-12 md:ml-0">
                      <div className="glass rounded-2xl p-6 md:p-8 relative overflow-hidden card-hover border border-transparent hover:border-gold/30 transition-all duration-500 group">
                        {/* Top accent line */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/0 to-transparent group-hover:via-gold/60 transition-all duration-500" />

                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-3xl md:text-4xl font-bold text-gold-gradient">
                            {m.year}
                          </span>
                          <div className="h-px flex-1 bg-gradient-to-r from-gold/30 to-transparent" />
                        </div>
                        <h3 className="text-xl font-bold text-cream mb-2 group-hover:text-gold transition-colors duration-300">
                          {m.title}
                        </h3>
                        <p className="text-sv-muted text-sm leading-relaxed">
                          {m.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
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
              Let&apos;s Build Something Great
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-cream">Ready to Work</span>{" "}
              <span className="text-gold-gradient">Together?</span>
            </h2>
            <p className="max-w-2xl mx-auto text-sv-muted text-lg mb-10 leading-relaxed">
              Book a free strategy session with our growth experts. We&apos;ll
              analyze your business, identify opportunities, and create a
              custom growth roadmap — no strings attached.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-gold to-bronze text-sv-bg font-bold text-lg px-10 py-7 h-auto hover:shadow-xl hover:shadow-gold/25 transition-all duration-300 group"
              >
                <Link href="/contact">
                  <Calendar className="mr-2 w-5 h-5" />
                  Book Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-gold/30 text-gold hover:bg-gold/10 font-semibold text-lg px-10 py-7 h-auto"
              >
                <Link href="/services">View Our Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageShell>
  );
}
