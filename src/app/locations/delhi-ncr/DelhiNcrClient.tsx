"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  MapPin,
  ArrowRight,
  MessageCircle,
  Sparkles,
  Globe,
  Search,
  Share2,
  Target,
  Palette,
  Building2,
  Smartphone,
  TrendingUp,
  Award,
  Users,
  Star,
  Quote,
  ShieldCheck,
  Zap,
  Clock,
  ChevronDown,
} from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import AnimatedHeading from "@/components/ui/animated-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { testimonials } from "@/lib/testimonials-data";

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

/* ───────── Services data ───────── */
const delhiServices = [
  {
    href: "/website-development-delhi",
    icon: Globe,
    title: "Website Development",
    description:
      "Conversion-optimised websites built for Delhi's competitive market. Lightning-fast, mobile-first, SEO-ready.",
  },
  {
    href: "/seo-services-delhi",
    icon: Search,
    title: "SEO Services",
    description:
      "Dominate Delhi search results with technical SEO, content strategy, and local Map Pack domination.",
  },
  {
    href: "/social-media-delhi",
    icon: Share2,
    title: "Social Media Marketing",
    description:
      "Build a Delhi-following on Instagram, LinkedIn, and Facebook with content that converts.",
  },
  {
    href: "/paid-ads-delhi",
    icon: Target,
    title: "Paid Advertising",
    description:
      "Google Ads, Meta Ads & more. 3.2x average ROAS for Delhi NCR businesses.",
  },
  {
    href: "/branding-delhi",
    icon: Palette,
    title: "Branding & Design",
    description:
      "Premium brand identities that help Delhi businesses stand out in a crowded market.",
  },
  {
    href: "/google-business-profile-delhi",
    icon: Building2,
    title: "Google Business Profile",
    description:
      "Own the local Map Pack in your Delhi neighbourhood with optimised GBP management.",
  },
  {
    href: "/app-development-delhi",
    icon: Smartphone,
    title: "App Development",
    description:
      "Native and cross-platform apps for Delhi startups, enterprises, and consumer brands.",
  },
];

/* ───────── Differentiators ───────── */
const differentiators = [
  {
    icon: MapPin,
    title: "Born & Based in NCR",
    description:
      "We're headquartered in Noida and operate across Delhi NCR. We understand the local market, the consumer psyche, and the regulatory landscape better than any remote agency.",
  },
  {
    icon: TrendingUp,
    title: "Proven Delhi ROI",
    description:
      "Our Delhi NCR clients see an average 200% ROI within 6 months. From real estate in Dwarka to clinics in South Delhi — we've delivered measurable growth across industries.",
  },
  {
    icon: Clock,
    title: "Same-Day Response",
    description:
      "Being local means we're in your timezone, available for in-person meetings, and can be on-site when needed. Response time: under 2 hours during business hours.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Reporting",
    description:
      "Real-time dashboards, weekly calls, monthly reports. No vanity metrics — just the numbers that tie directly to revenue. You always know what you're paying for.",
  },
];

/* ───────── Stat item type ───────── */
interface StatItem {
  value: number;
  suffix: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  decimals?: number;
}

/* ───────── Local stats ───────── */
const localStats: StatItem[] = [
  { value: 500, suffix: "+", label: "Delhi NCR Clients", icon: Users },
  { value: 350, suffix: "%", label: "Average ROI", icon: TrendingUp },
  { value: 4.9, suffix: "", label: "Client Rating", icon: Star, decimals: 1 },
  { value: 12, suffix: "+", label: "Years Operating", icon: Award },
];

/* ───────── Hero stats ───────── */
const heroStats: StatItem[] = [
  { value: 32, suffix: "M+", label: "Delhi NCR Population", icon: Users },
  { value: 500, suffix: "+", label: "Businesses Served", icon: Building2 },
  { value: 350, suffix: "%", label: "Avg ROI", icon: TrendingUp },
  { value: 12, suffix: "+", label: "Years Operating", icon: Award },
];

/* ───────── FAQ ───────── */
const faqs = [
  {
    q: "Why should I hire a local Delhi NCR marketing agency?",
    a: "A local agency understands the Delhi market — consumer behaviour, regional preferences, language nuances (English/Hindi/Hinglish), competition density, and regulatory requirements. We can meet you in person, attend on-site shoots, and respond in your timezone. Plus, our local SEO knowledge of neighbourhood-level search (Connaught Place, Dwarka, Noida, Gurgaon) is unmatched by remote agencies.",
  },
  {
    q: "How long does it take to see results from Delhi NCR SEO?",
    a: "For most Delhi businesses, Map Pack movement happens in 60-90 days and meaningful lead growth by month 4. Paid advertising (Google Ads, Meta Ads) shows results within 2-4 weeks. SEO is a 6-month game for sustainable results — beware of agencies promising overnight rankings.",
  },
  {
    q: "Which areas of Delhi NCR do you serve?",
    a: "All of Delhi NCR — including New Delhi, South Delhi, West Delhi, East Delhi, North Delhi, Dwarka, Rohini, Pitampura, Noida, Greater Noida, Gurgaon (Gurugram), Faridabad, Ghaziabad, and Bahadurgarh. We have clients across all major NCR zones.",
  },
  {
    q: "What industries do you specialise in for Delhi NCR?",
    a: "We have deep expertise across real estate (especially Dwarka, Noida, Gurgaon developers), healthcare (clinics, hospitals, dentists), legal services, restaurants, beauty & wellness, e-commerce, and professional services. Our Delhi portfolio spans 50+ businesses across these verticals.",
  },
  {
    q: "Do you offer in-person meetings in Delhi NCR?",
    a: "Yes. We're based in Noida Sector 18 and can meet you at your office anywhere in Delhi NCR. For new business enquiries, we offer a free 45-minute strategy session either at your location or over video call — whichever you prefer.",
  },
];

/* ───────── Pick a Delhi testimonial ───────── */
const delhiTestimonial = testimonials.find((t) => t.id === 7) ?? testimonials[0];

export default function DelhiNcrClient() {
  return (
    <PageShell
      breadcrumbs={[
        { label: "Locations", href: "/services" },
        { label: "Delhi NCR" },
      ]}
    >
      {/* ===== Hero ===== */}
      <section className="relative pt-12 md:pt-16 pb-12 overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-gold/10 rounded-full blur-[120px] animate-float pointer-events-none" />
        <div
          className="absolute top-20 right-1/4 w-72 h-72 bg-bronze/10 rounded-full blur-[110px] animate-float pointer-events-none"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-64 h-64 bg-emerald-500/[0.05] rounded-full blur-[100px] animate-float pointer-events-none"
          style={{ animationDelay: "4s" }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-medium tracking-[0.25em] uppercase mb-6"
            >
              <MapPin className="w-3.5 h-3.5" />
              Our Location
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-cream">Digital Marketing Services in </span>
              <span className="text-gold-gradient">Delhi NCR</span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-sv-muted text-lg md:text-xl leading-relaxed"
            >
              Helping Delhi NCR businesses dominate search, generate quality
              leads, and scale revenue. 500+ local clients, 350% average ROI,
              and a team that actually understands the NCR market.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-gold to-bronze text-sv-bg font-bold text-sm hover:shadow-lg hover:shadow-gold/20 hover:scale-[1.02] transition-all duration-300"
              >
                Get Free Strategy Session
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full glass border border-gold/30 text-gold font-semibold text-sm hover:bg-gold/10 hover:border-gold/50 transition-all duration-300"
              >
                View All Services
                <Sparkles className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="hero-gradient-line max-w-md mx-auto mt-12"
          />
        </div>
      </section>

      {/* ===== About Delhi NCR ===== */}
      <section className="relative py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-medium tracking-[0.25em] uppercase mb-6">
                <MapPin className="w-3.5 h-3.5" />
                Why Delhi NCR
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-cream mb-6 leading-tight">
                The NCR market is brutal —{" "}
                <span className="text-gold-gradient">and full of opportunity</span>
              </h2>
              <div className="space-y-4 text-sv-muted leading-relaxed">
                <p>
                  Delhi NCR is India&apos;s largest consumer market — over 32
                  million people, 800,000+ registered businesses, and the
                  country&apos;s highest per-capita digital ad spend. But with
                  opportunity comes competition: every category from real
                  estate to restaurants is saturated, and standing out requires
                  more than a generic website and a few Google Ads.
                </p>
                <p>
                  Delhi consumers are savvy, time-poor, and mobile-first. They
                  research on Google, validate on Instagram, check reviews on
                  JustDial and Google, and convert on WhatsApp — often all
                  within a single hour. If your brand isn&apos;t visible,
                  credible, and easy to engage across every touchpoint, your
                  competitors win the lead.
                </p>
                <p>
                  That&apos;s where we come in. Social Viens was born in Noida
                  and has spent 5+ years mastering the NCR market&apos;s
                  nuances — the regulatory complexity (RERA for real estate,
                  MCI for healthcare), the language mix (Hinglish works best),
                  the neighbourhood-level search behaviour, and the
                  high-expectation Delhi consumer. We&apos;ve helped 50+ local
                  businesses turn digital into their #1 revenue channel.
                </p>
                <p>
                  Whether you&apos;re a South Delhi clinic, a Dwarka real
                  estate developer, a Gurgaon SaaS startup, or a Noida
                  restaurant — we have the local playbook to grow your business
                  online. And we do it with the data, transparency, and
                  premium craft that the Delhi market demands.
                </p>
              </div>
            </motion.div>

            {/* Right: stats card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="glass-strong rounded-3xl p-8 md:p-10 border border-gold/15 gold-glow relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-[100px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-gold/15 border border-gold/20 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-cream font-bold text-lg">
                      Delhi NCR by the numbers
                    </h3>
                    <p className="text-xs text-sv-muted">
                      The market we know best
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {heroStats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                        className="bg-sv-surface/40 border border-gold/10 rounded-2xl p-5 hover:border-gold/30 hover:bg-sv-surface/60 transition-all duration-300"
                      >
                        <Icon className="w-5 h-5 text-gold mb-3" />
                        <p className="text-3xl md:text-4xl font-bold text-cream mb-1">
                          <AnimatedCounter
                            value={stat.value}
                            suffix={stat.suffix}
                            decimals={stat.decimals ?? 0}
                          />
                        </p>
                        <p className="text-xs text-sv-muted">{stat.label}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== Our Delhi NCR Services ===== */}
      <section className="relative py-16 md:py-24 bg-gradient-maroon">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-medium tracking-[0.25em] uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              What We Offer
            </div>
            <AnimatedHeading text1="Our Delhi NCR" text2="Services" />
            <p className="text-sv-muted text-lg leading-relaxed mt-2">
              Full-stack digital marketing services tailored for Delhi NCR
              businesses. Pick a service to learn how we deliver it locally.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {delhiServices.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.href}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <Link
                    href={service.href}
                    className="group block glass rounded-2xl p-6 border border-gold/10 hover:border-gold/30 card-hover h-full relative before:absolute before:inset-0 before:rounded-2xl before:border-t-2 before:border-transparent hover:before:border-gold before:transition-all before:duration-500 before:z-10 before:pointer-events-none"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/15 flex items-center justify-center mb-5 group-hover:bg-gold/20 group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <h3 className="text-lg font-bold text-cream mb-2 group-hover:text-gold transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-sm text-sv-muted leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-gold text-sm font-medium group-hover:gap-2.5 transition-all duration-300">
                      Learn More
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Why Delhi NCR Businesses Choose Us ===== */}
      <section className="relative py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-medium tracking-[0.25em] uppercase mb-6">
              <Award className="w-3.5 h-3.5" />
              Why Choose Us
            </div>
            <AnimatedHeading text1="Why Delhi NCR" text2="Chooses Us" />
            <p className="text-sv-muted text-lg leading-relaxed mt-2">
              We&apos;re not a remote agency learning your market — we live in
              it, every day.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map((d, i) => {
              const Icon = d.icon;
              return (
                <motion.div
                  key={d.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="glass rounded-2xl p-6 border border-gold/10 hover:border-gold/30 card-hover h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/15 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="text-lg font-bold text-cream mb-3">{d.title}</h3>
                  <p className="text-sm text-sv-muted leading-relaxed">
                    {d.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Local stats strip ===== */}
      <section className="relative py-16 md:py-20 bg-gradient-maroon">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {localStats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="text-center glass rounded-2xl p-6 border border-gold/10 hover:border-gold/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 mx-auto rounded-xl bg-gold/10 border border-gold/15 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <p className="text-4xl md:text-5xl font-bold text-gold-gradient mb-2">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      decimals={stat.decimals ?? 0}
                    />
                  </p>
                  <p className="text-sm text-sv-muted">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Delhi testimonial ===== */}
      <section className="relative py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-3xl"
          >
            <div className="glass-strong gold-glow-strong rounded-3xl p-8 md:p-12 relative">
              <div className="absolute top-0 right-0 w-72 h-72 bg-gold/10 rounded-full blur-[100px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <Quote className="w-8 h-8 text-gold" />
                  <span className="text-xs tracking-[0.2em] text-gold/70 uppercase">
                    Delhi NCR Client
                  </span>
                </div>

                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: delhiTestimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-gold text-gold"
                    />
                  ))}
                </div>

                <p className="text-xl md:text-2xl text-cream leading-relaxed font-medium mb-8">
                  &ldquo;{delhiTestimonial.text}&rdquo;
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-gold/10">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold via-gold-light to-bronze flex items-center justify-center text-sv-bg font-bold text-lg shrink-0">
                      {delhiTestimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-cream font-bold text-base">
                        {delhiTestimonial.name}
                      </p>
                      <p className="text-sm text-sv-muted">
                        {delhiTestimonial.business}
                      </p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold shrink-0">
                    <TrendingUp className="w-4 h-4" />
                    {delhiTestimonial.results}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="relative py-16 md:py-24 bg-gradient-maroon">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-medium tracking-[0.25em] uppercase mb-6">
              <ChevronDown className="w-3.5 h-3.5" />
              Common Questions
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-cream mb-4">
              Delhi NCR{" "}
              <span className="text-gold-gradient">Marketing FAQs</span>
            </h2>
            <p className="text-sv-muted text-lg">
              Straight answers to the questions Delhi businesses ask us most.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <Accordion
              type="single"
              collapsible
              className="space-y-3"
            >
              {faqs.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`faq-${idx}`}
                  className="glass rounded-xl border-0 px-5 md:px-6 data-[state=open]:gold-glow data-[state=open]:border-gold/20 transition-all duration-300 group"
                >
                  <AccordionTrigger className="text-left text-cream hover:text-gold hover:no-underline py-5 text-base md:text-lg font-medium group-data-[state=open]:text-gold transition-colors duration-300">
                    <span className="flex items-start gap-3">
                      <span className="w-7 h-7 shrink-0 rounded-lg bg-gold/10 border border-gold/15 flex items-center justify-center text-gold text-xs font-bold mt-0.5 group-data-[state=open]:bg-gold/20 group-data-[state=open]:border-gold/30 transition-all duration-300">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1">{faq.q}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sv-muted leading-relaxed pb-5 pl-10 md:pl-[2.75rem]">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* ===== Final CTA ===== */}
      <section className="relative py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-3xl"
          >
            <div className="glass-strong gold-glow-strong rounded-3xl p-8 md:p-12 relative">
              <div className="absolute top-0 right-0 w-72 h-72 bg-gold/10 rounded-full blur-[100px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-bronze/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <Zap className="w-8 h-8 text-gold mx-auto mb-3" />
                  <h2 className="text-3xl md:text-4xl font-bold text-cream mb-3">
                    Ready to dominate{" "}
                    <span className="text-gold-gradient">Delhi NCR?</span>
                  </h2>
                  <p className="text-sv-muted text-lg max-w-xl mx-auto">
                    Book a free 45-minute strategy session with our Delhi team.
                    We&apos;ll audit your current presence and build a roadmap
                    to growth.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-gold to-bronze text-sv-bg font-bold text-sm hover:shadow-lg hover:shadow-gold/20 hover:scale-[1.02] transition-all duration-300"
                  >
                    Book Free Strategy Session
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="https://wa.me/918178004800?text=Hi%20Social%20Viens%2C%20I%27m%20a%20Delhi%20NCR%20business%20interested%20in%20your%20services"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full glass border border-emerald-500/30 text-emerald-400 font-semibold text-sm hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-all duration-300"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageShell>
  );
}
