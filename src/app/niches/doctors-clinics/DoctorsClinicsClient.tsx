"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  Stethoscope,
  ArrowRight,
  MessageCircle,
  Sparkles,
  Search,
  Building2,
  UserCircle,
  Star,
  FileText,
  Target,
  TrendingUp,
  Users,
  Heart,
  Award,
  ShieldCheck,
  Lock,
  HeartPulse,
  Zap,
  ChevronDown,
  Quote,
  CheckCircle2,
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

/* ───────── Healthcare services ───────── */
const healthcareServices = [
  {
    icon: Search,
    title: "Medical SEO",
    description:
      "Rank for high-intent treatment and symptom searches. From 'best cardiologist in Delhi' to 'knee replacement cost' — we own the keywords that bring patients.",
  },
  {
    icon: Building2,
    title: "Google Business Profile for Clinics",
    description:
      "Dominate the local Map Pack in your service area. Optimised GBP, location pages, and review velocity engineered for patient acquisition.",
  },
  {
    icon: UserCircle,
    title: "Doctor Personal Branding",
    description:
      "Build authority for individual practitioners through LinkedIn, HealthArticles, PR, and a content engine that positions you as the go-to expert.",
  },
  {
    icon: Star,
    title: "Patient Review Management",
    description:
      "Systematic review generation, response management, and reputation recovery. Healthcare consumers read 7+ reviews before booking — make yours work for you.",
  },
  {
    icon: FileText,
    title: "Healthcare Content Marketing",
    description:
      "Compliance-aware medical content that ranks, educates, and converts. Written with medical accuracy and reviewed for ASCI and MCI guidelines.",
  },
  {
    icon: Target,
    title: "Paid Ads for Patient Acquisition",
    description:
      "Google & Meta ads engineered for appointment bookings. We've run hundreds of healthcare ad campaigns with strict attention to compliance.",
  },
];

/* ───────── Differentiators ───────── */
const differentiators = [
  {
    icon: ShieldCheck,
    title: "HIPAA-Aware Approach",
    description:
      "We treat patient data with the highest sensitivity. No PHI in marketing pixels, no identifiable information in case studies without explicit consent, and secure handling at every step.",
  },
  {
    icon: FileText,
    title: "Medical Compliance First",
    description:
      "Every ad, landing page, and piece of content is reviewed for MCI ethics, ASCI guidelines, FDA drug promotion rules, and platform-specific healthcare ad policies before launch.",
  },
  {
    icon: Lock,
    title: "Patient Privacy Protected",
    description:
      "We never use real patient stories, before/after photos, or testimonials without written consent. All review requests are routed through HIPAA-compliant tools.",
  },
  {
    icon: HeartPulse,
    title: "Healthcare Expertise",
    description:
      "We've worked with cardiologists, dentists, dermatologists, fertility clinics, multi-specialty hospitals, and diagnostic labs. We speak the language of healthcare.",
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

/* ───────── Hero stats ───────── */
const heroStats: StatItem[] = [
  { value: 2, suffix: "M+", label: "Patients Reached", icon: Users },
  { value: 25, suffix: "+", label: "Doctor Clients", icon: Stethoscope },
  { value: 7, suffix: "x", label: "Avg Appointment Increase", icon: TrendingUp },
  { value: 4.9, suffix: "", label: "Client Rating", icon: Star, decimals: 1 },
];

/* ───────── Local stats ───────── */
const localStats: StatItem[] = [
  { value: 25, suffix: "+", label: "Doctor Clients", icon: Stethoscope },
  { value: 7, suffix: "x", label: "Avg Patient Growth", icon: TrendingUp },
  { value: 4.9, suffix: "", label: "Client Rating", icon: Star, decimals: 1 },
  { value: 92, suffix: "%", label: "Patient Retention", icon: Heart },
];

/* ───────── Case study ───────── */
const caseStudy = {
  client: "Multi-Specialty Clinic Chain, Delhi NCR",
  challenge:
    "A 4-location multi-specialty clinic chain was struggling with declining patient footfall, low online visibility, and heavy dependence on referrals (which were slowing). Their GBP listings were unoptimised, no SEO presence, and paid ads were running but unprofitable.",
  approach: [
    "Audited all 4 locations' Google Business Profiles and rebuilt them with treatment-specific categories, services, photos, and posts.",
    "Built location + treatment landing pages (Cardiology, Orthopaedics, Gynaecology, Paediatrics) — 16 new pages total.",
    "Launched a Google Ads campaign targeting high-intent treatment keywords with HIPAA-compliant conversion tracking.",
    "Implemented a post-visit SMS review request flow, growing reviews from 23 to 412 in 6 months.",
    "Built a WhatsApp appointment booking system to reduce friction for new patient bookings.",
  ],
  results: [
    { value: "7x", label: "Patient inquiries in 6 months" },
    { value: "60%", label: "Of new patients now come from online" },
    { value: "412", label: "Google reviews (from 23)" },
    { value: "4.9★", label: "Average rating across locations" },
  ],
};

/* ───────── FAQ ───────── */
const faqs = [
  {
    q: "Is healthcare marketing legal in India?",
    a: "Yes, but with strict guidelines. The Medical Council of India (MCI) Code of Medical Ethics regulates medical advertising — doctors cannot run direct 'promotional' ads. However, educational content, GBP optimisation, SEO, brand awareness, and patient experience marketing are all permitted. We navigate these rules carefully to grow your practice ethically and legally.",
  },
  {
    q: "How do you ensure patient privacy in your marketing?",
    a: "We follow HIPAA-aware practices regardless of geography. We never use real patient names, photos, or case details without explicit written consent. Reviews are collected via compliant tools, ad pixels exclude PHI, and all patient data shared with us for marketing is anonymised. We can also sign BAAs (Business Associate Agreements) if your jurisdiction requires it.",
  },
  {
    q: "How long until I see more patients from digital marketing?",
    a: "Google Ads and Meta Ads can drive appointment bookings within 2-4 weeks. SEO typically shows Map Pack movement in 60-90 days and meaningful organic patient growth by month 4-6. Review velocity improvements often unlock Map Pack jumps within 90 days. Most clinics we work with see 3-5x patient inquiries by month 6.",
  },
  {
    q: "What types of healthcare providers do you work with?",
    a: "Individual practitioners (GPs, specialists, dentists, dermatologists), single-location clinics, multi-specialty clinic chains, multi-location hospitals, diagnostic labs, fertility clinics, physiotherapy centres, mental health practitioners, and alternative medicine (Ayurveda, Homeopathy) providers. Each has its own compliance nuances — we tailor the approach accordingly.",
  },
  {
    q: "Do you handle doctor personal branding?",
    a: "Yes. We build personal brands for doctors through LinkedIn thought leadership, PR features in healthcare publications (e.g., The Healthcare Today, Medical Dialogues), HealthArticles blog posts, YouTube educational content, and conference speaking opportunities. A strong personal brand can drive 30-40% of new patient inquiries for specialist practices.",
  },
];

/* ───────── Pick a healthcare testimonial ───────── */
const doctorTestimonial =
  testimonials.find((t) => t.id === 2) ?? testimonials[0];

export default function DoctorsClinicsClient() {
  return (
    <PageShell
      breadcrumbs={[
        { label: "Niches", href: "/services" },
        { label: "Doctors & Clinics" },
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
              <Stethoscope className="w-3.5 h-3.5" />
              Healthcare Marketing
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-cream">Digital Marketing for </span>
              <span className="text-gold-gradient">Doctors &amp; Clinics</span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-sv-muted text-lg md:text-xl leading-relaxed"
            >
              Compliance-aware healthcare marketing that builds trust, ranks for
              high-intent treatment searches, and turns online searches into
              booked appointments. 7x average patient inquiry growth.
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
                Get Free Practice Audit
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full glass border border-gold/30 text-gold font-semibold text-sm hover:bg-gold/10 hover:border-gold/50 transition-all duration-300"
              >
                Explore All Services
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

      {/* ===== About Healthcare Marketing ===== */}
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
                <HeartPulse className="w-3.5 h-3.5" />
                The Healthcare Marketing Challenge
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-cream mb-6 leading-tight">
                Patients Google before they book —{" "}
                <span className="text-gold-gradient">are you showing up?</span>
              </h2>
              <div className="space-y-4 text-sv-muted leading-relaxed">
                <p>
                  77% of patients use search engines before booking a healthcare
                  appointment. They research symptoms, compare specialists,
                  read reviews (7+ on average), check insurance acceptance, and
                  validate clinic credibility on Instagram — all before making
                  that first call. If your practice isn&apos;t visible at every
                  stage of this journey, you&apos;re invisible to the patients
                  who need you most.
                </p>
                <p>
                  Healthcare marketing is unlike any other vertical. You
                  can&apos;t run flash-sale ads. You can&apos;t use aggressive
                  &quot;book now&quot; tactics. You must comply with MCI ethics,
                  ASCI guidelines, FDA drug promotion rules, and
                  platform-specific healthcare ad policies — while still being
                  found by patients in their moment of need. Most agencies
                  don&apos;t understand this nuance, and their
                  &quot;healthcare&quot; campaigns get disapproved or, worse,
                  get the practitioner in regulatory trouble.
                </p>
                <p>
                  Then there&apos;s the trust gap. Patients don&apos;t choose a
                  doctor the way they choose a restaurant. They want
                  credentials, experience, peer endorsements, and an authentic
                  sense of care. A generic marketing playbook falls flat.
                  Healthcare marketing requires empathy, authority-building
                  content, compliance-aware messaging, and patient privacy
                  baked into every touchpoint.
                </p>
                <p>
                  At Social Viens, we&apos;ve spent 5+ years mastering
                  healthcare marketing for clinics, hospitals, and individual
                  practitioners across India. We know what works (educational
                  content, GBP optimisation, treatment-specific landing pages,
                  review velocity) and what doesn&apos;t (aggressive
                  discounting, false promises, fake reviews). We grow your
                  practice ethically, measurably, and compliantly.
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
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center">
                    <HeartPulse className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-cream font-bold text-lg">
                      Healthcare marketing impact
                    </h3>
                    <p className="text-xs text-sv-muted">
                      Real numbers from our practice
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

      {/* ===== Healthcare Services ===== */}
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
              <Stethoscope className="w-3.5 h-3.5" />
              Specialised Services
            </div>
            <AnimatedHeading text1="Healthcare Marketing" text2="Services" />
            <p className="text-sv-muted text-lg leading-relaxed mt-2">
              A full-stack growth engine engineered specifically for medical
              practices — compliant, ethical, and effective.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {healthcareServices.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="glass rounded-2xl p-6 border border-gold/10 hover:border-gold/30 card-hover h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/15 flex items-center justify-center mb-5 group-hover:bg-gold/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="text-lg font-bold text-cream mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-sv-muted leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Why Doctors Choose Us ===== */}
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
              Why Doctors Choose Us
            </div>
            <AnimatedHeading text1="Why Doctors" text2="Choose Us" />
            <p className="text-sv-muted text-lg leading-relaxed mt-2">
              We&apos;re not a generic agency that occasionally takes on
              healthcare clients. It&apos;s our specialty.
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
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-cream mb-3">
                    {d.title}
                  </h3>
                  <p className="text-sm text-sv-muted leading-relaxed">
                    {d.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Case Study Highlight ===== */}
      <section className="relative py-16 md:py-24 bg-gradient-maroon">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-medium tracking-[0.25em] uppercase mb-6">
              <TrendingUp className="w-3.5 h-3.5" />
              Case Study Highlight
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-cream mb-4">
              7x patient inquiries in{" "}
              <span className="text-gold-gradient">6 months</span>
            </h2>
            <p className="text-sv-muted text-lg">
              {caseStudy.client}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Challenge + Approach */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="glass rounded-3xl p-8 border border-gold/10"
            >
              <h3 className="text-xl font-bold text-cream mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-rose-500/15 border border-rose-500/20 flex items-center justify-center">
                  <span className="text-rose-400 text-xs font-bold">!</span>
                </span>
                The Challenge
              </h3>
              <p className="text-sm text-sv-muted leading-relaxed mb-6">
                {caseStudy.challenge}
              </p>

              <h3 className="text-xl font-bold text-cream mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-gold/15 border border-gold/20 flex items-center justify-center">
                  <Target className="w-4 h-4 text-gold" />
                </span>
                Our Approach
              </h3>
              <ul className="space-y-2.5">
                {caseStudy.approach.map((step, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-sv-muted leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="glass-strong rounded-3xl p-8 border border-gold/15 gold-glow relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-[100px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-cream mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </span>
                  The Results
                </h3>

                <div className="space-y-4">
                  {caseStudy.results.map((result, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                      className="flex items-center justify-between p-4 rounded-xl bg-sv-surface/40 border border-gold/10"
                    >
                      <p className="text-sm text-sv-muted flex-1 pr-4">
                        {result.label}
                      </p>
                      <p className="text-2xl md:text-3xl font-bold text-gold-gradient shrink-0">
                        {result.value}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== Healthcare stats strip ===== */}
      <section className="relative py-16 md:py-20">
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
                  <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-emerald-400" />
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

      {/* ===== Doctor testimonial ===== */}
      <section className="relative py-16 md:py-24 bg-gradient-maroon">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-3xl"
          >
            <div className="glass-strong gold-glow-strong rounded-3xl p-8 md:p-12 relative">
              <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-[100px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <Quote className="w-8 h-8 text-gold" />
                  <span className="text-xs tracking-[0.2em] text-gold/70 uppercase">
                    Healthcare Client
                  </span>
                </div>

                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: doctorTestimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-gold text-gold"
                    />
                  ))}
                </div>

                <p className="text-xl md:text-2xl text-cream leading-relaxed font-medium mb-8">
                  &ldquo;{doctorTestimonial.text}&rdquo;
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-gold/10">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400/40 to-emerald-700/40 border border-emerald-500/30 flex items-center justify-center text-emerald-200 font-bold text-lg shrink-0">
                      {doctorTestimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-cream font-bold text-base">
                        {doctorTestimonial.name}
                      </p>
                      <p className="text-sm text-sv-muted">
                        {doctorTestimonial.business}
                      </p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold shrink-0">
                    <TrendingUp className="w-4 h-4" />
                    {doctorTestimonial.results}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="relative py-16 md:py-24">
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
              Healthcare Marketing{" "}
              <span className="text-gold-gradient">FAQs</span>
            </h2>
            <p className="text-sv-muted text-lg">
              The questions doctors and clinic owners ask us most.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`faq-${idx}`}
                  className="glass rounded-xl border-0 px-5 md:px-6 data-[state=open]:gold-glow data-[state=open]:border-gold/20 transition-all duration-300 group"
                >
                  <AccordionTrigger className="text-left text-cream hover:text-gold hover:no-underline py-5 text-base md:text-lg font-medium group-data-[state=open]:text-gold transition-colors duration-300">
                    <span className="flex items-start gap-3">
                      <span className="w-7 h-7 shrink-0 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-bold mt-0.5 group-data-[state=open]:bg-emerald-500/20 group-data-[state=open]:border-emerald-500/30 transition-all duration-300">
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
      <section className="relative py-16 md:py-24 bg-gradient-maroon">
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
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <HeartPulse className="w-8 h-8 text-gold mx-auto mb-3" />
                  <h2 className="text-3xl md:text-4xl font-bold text-cream mb-3">
                    Grow your practice{" "}
                    <span className="text-gold-gradient">ethically</span>
                  </h2>
                  <p className="text-sv-muted text-lg max-w-xl mx-auto">
                    Get a free, no-obligation audit of your practice&apos;s
                    digital presence. We&apos;ll show you exactly where
                    you&apos;re losing patients — and how to fix it.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-gold to-bronze text-sv-bg font-bold text-sm hover:shadow-lg hover:shadow-gold/20 hover:scale-[1.02] transition-all duration-300"
                  >
                    Get Free Practice Audit
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="https://wa.me/918178004800?text=Hi%20Social%20Viens%2C%20I%27m%20a%20doctor%20interested%20in%20your%20healthcare%20marketing"
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
