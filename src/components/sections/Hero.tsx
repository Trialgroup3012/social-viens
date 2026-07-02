"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  Star,
  User,
  Phone,
  LayoutGrid,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMounted } from "@/hooks/use-mounted";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* ------------------------------------------------------------------ */
/* Static data                                                         */
/* ------------------------------------------------------------------ */

const SERVICES = [
  "Website Design",
  "SEO Services",
  "Local SEO",
  "Google Business Profile",
  "Paid Ads / PPC",
  "Social Media Marketing",
  "Branding & Design",
  "Marketing Automation",
  "Lead Generation",
] as const;

const trustStats = [
  { value: 750, suffix: "+", label: "Businesses Trust Us" },
  { value: 12, suffix: "+", label: "Years of Excellence" },
  { value: 350, suffix: "%", label: "Result-Driven ROI" },
];

// Deterministic particle positions to avoid hydration mismatch
const particlePositions = [
  { left: 5, top: 15 }, { left: 12, top: 72 }, { left: 18, top: 35 },
  { left: 25, top: 88 }, { left: 32, top: 42 }, { left: 38, top: 10 },
  { left: 45, top: 65 }, { left: 52, top: 28 }, { left: 58, top: 93 },
  { left: 65, top: 50 }, { left: 72, top: 18 }, { left: 78, top: 75 },
  { left: 85, top: 40 }, { left: 92, top: 60 }, { left: 15, top: 55 },
  { left: 35, top: 20 }, { left: 55, top: 80 }, { left: 75, top: 45 },
  { left: 8, top: 90 }, { left: 48, top: 5 },
];

const particleDurations = [
  5.2, 6.8, 4.5, 7.1, 5.9, 6.3, 4.8, 7.5, 5.4, 6.1,
  5.7, 4.3, 6.6, 5.1, 7.2, 4.9, 6.4, 5.6, 7.3, 4.7,
];

const particleDelays = [
  0.5, 1.8, 3.2, 0.9, 2.5, 1.1, 3.8, 0.3, 2.1, 1.5,
  3.5, 0.7, 2.8, 1.9, 0.2, 3.1, 1.4, 2.6, 0.8, 3.4,
];

const notificationMessages = [
  "🔥 New: AI-Powered SEO",
  "📈 3 clients joined today",
  "⚡ Free audit available",
];

const WHATSAPP_NUMBER = "918178004800";

/* ------------------------------------------------------------------ */
/* Animated counter (count-up on inView)                               */
/* ------------------------------------------------------------------ */

function AnimatedCounter({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const current = Math.floor(eased * value);
      setCount(current);
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(value);
    };

    requestAnimationFrame(animate);
  }, [inView, value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Lead form (right column)                                            */
/* ------------------------------------------------------------------ */

type SubmitState = "idle" | "submitting" | "success" | "error";

function LeadForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState<string>(SERVICES[0]);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [state, setState] = useState<SubmitState>("idle");
  // Fix Radix Select hydration mismatch — only render Select after mount
  const mounted = useMounted();

  const validate = () => {
    const next: { name?: string; phone?: string } = {};
    if (!name.trim()) next.name = "Please enter your name";
    if (!phone.trim()) next.phone = "Please enter your phone number";
    else if (phone.replace(/\D/g, "").length < 7) next.phone = "Enter a valid phone number";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setState("submitting");

    // Construct WhatsApp message first (always works even if API is offline)
    const message = `Hi! I'm ${name}. I'm interested in ${service}. My phone: ${phone}. Please reach out to me.`;
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    try {
      // POST to /api/contact — email is required by the API route but not
      // collected in this hero form, so we derive a deterministic placeholder.
      const derivedEmail = `lead+${phone.replace(/\D/g, "")}@socialviens.in`;
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: derivedEmail,
          phone,
          business: service,
          message: `Hero lead form — interested in: ${service}`,
          source: "hero-form",
        }),
      }).catch(() => {
        // Swallow — WhatsApp handoff is the primary conversion path
      });
    } catch {
      // Non-blocking; user is still routed to WhatsApp
    } finally {
      window.open(waUrl, "_blank", "noopener,noreferrer");
      setState("success");
      setName("");
      setPhone("");
      setService(SERVICES[0]);
      setErrors({});
    }
  };

  if (state === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="glass-strong gold-glow rounded-3xl p-8 md:p-10 max-w-md mx-auto w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.1 }}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-500/30"
        >
          <CheckCircle2 className="w-9 h-9 text-white" />
        </motion.div>
        <h3 className="text-2xl font-bold text-cream mb-2">Request Sent!</h3>
        <p className="text-sv-muted text-sm mb-6 leading-relaxed">
          We&apos;ve opened WhatsApp with your message pre-filled. We&apos;ll be in touch
          within 24 hours.
        </p>
        <Button
          onClick={() => setState("idle")}
          variant="outline"
          className="border-gold/30 text-gold hover:bg-gold/10"
        >
          Send another request
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="glass-strong gold-glow rounded-3xl p-6 md:p-8 max-w-md mx-auto w-full relative overflow-hidden"
    >
      {/* Corner gold sparkle accents */}
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-bronze/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span className="text-gold text-xs font-semibold tracking-[0.25em] uppercase">
            Get Started
          </span>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-cream leading-tight mb-2">
          Get Your Free Strategy Call
        </h3>
        <p className="text-sm text-sv-muted mb-6">
          Book a complimentary 30-min consultation. No obligation.
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="hero-name" className="sr-only">
              Your Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/60 pointer-events-none" />
              <Input
                id="hero-name"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
                }}
                placeholder="Your Name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "hero-name-err" : undefined}
                className={`pl-10 h-11 bg-sv-bg/60 border-gold/15 text-cream placeholder:text-sv-muted/60 focus-visible:border-gold/50 ${
                  errors.name ? "border-red-400/60" : ""
                }`}
              />
            </div>
            {errors.name && (
              <p id="hero-name-err" className="text-xs text-red-400 mt-1 ml-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="hero-phone" className="sr-only">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/60 pointer-events-none" />
              <Input
                id="hero-phone"
                name="phone"
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
                }}
                placeholder="+91 XXXXX XXXXX"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "hero-phone-err" : undefined}
                className={`pl-10 h-11 bg-sv-bg/60 border-gold/15 text-cream placeholder:text-sv-muted/60 focus-visible:border-gold/50 ${
                  errors.phone ? "border-red-400/60" : ""
                }`}
              />
            </div>
            {errors.phone && (
              <p id="hero-phone-err" className="text-xs text-red-400 mt-1 ml-1">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Service select */}
          <div>
            <label htmlFor="hero-service" className="sr-only">
              Service of Interest
            </label>
            {mounted ? (
              <Select value={service} onValueChange={setService}>
                <SelectTrigger
                  id="hero-service"
                  aria-label="Service of Interest"
                  className="w-full h-11 bg-sv-bg/60 border-gold/15 text-cream data-[placeholder]:text-sv-muted/60 focus-visible:border-gold/50 hover:bg-sv-bg/80"
                >
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent className="bg-sv-bg border-gold/20 text-cream">
                  {SERVICES.map((s) => (
                    <SelectItem
                      key={s}
                      value={s}
                      className="focus:bg-gold/10 focus:text-cream data-[state=checked]:text-gold"
                    >
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="w-full h-11 rounded-md bg-sv-bg/60 border border-gold/15 flex items-center px-3 text-sm text-sv-muted/60">
                {SERVICES[0]}
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={state === "submitting"}
            aria-label="Send via WhatsApp"
            className="btn-shine relative w-full h-12 rounded-md font-semibold text-white overflow-hidden transition-transform duration-200 hover:scale-[1.02] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2.5"
            style={{
              background:
                "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
              boxShadow:
                "0 8px 24px rgba(37, 211, 102, 0.25), 0 0 0 1px rgba(255,255,255,0.06) inset",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span>{state === "submitting" ? "Sending…" : "Send via WhatsApp"}</span>
          </button>

          {/* Microcopy */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 pt-1 text-[11px] text-sv-muted/80">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Free Strategy Session
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" /> No Obligation
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Response in 24hrs
            </span>
          </div>

          {/* Rating row */}
          <div className="flex items-center justify-center gap-2 pt-2 border-t border-gold/10 mt-3">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
              ))}
            </div>
            <span className="text-xs text-sv-muted">
              <span className="text-cream font-semibold">4.9/5</span> from 50+ clients
            </span>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [notificationIndex, setNotificationIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const trustInView = useInView(trustRef, { once: true, margin: "-50px" });

  // Parallax scroll for background orbs
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const orb1X = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const orb2X = useTransform(scrollYProgress, [0, 1], [0, -25]);
  const orb3Scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  // Cursor glow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Notification auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setNotificationIndex((prev) => (prev + 1) % notificationMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-x-hidden overflow-y-hidden pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-24"
    >
      {/* Background image + dark gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: "url(/hero-bg.png)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sv-bg via-sv-bg/80 to-sv-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-sv-bg/90 via-transparent to-sv-bg/90" />
      </div>

      {/* Animated orbs with parallax (gold + bronze + center gold) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold/5 blur-[120px]"
          style={{ y: orb1Y, x: orb1X }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-bronze/8 blur-[100px]"
          style={{ y: orb2Y, x: orb2X }}
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/3 blur-[150px]"
          style={{ scale: orb3Scale }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Cursor glow effect */}
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)",
            left: mousePos.x - 200,
            top: mousePos.y - 200,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 25 }}
        />
      </div>

      {/* Gold particles */}
      <div className="absolute inset-0 z-0">
        {particlePositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gold/40"
            style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
            animate={{ y: [0, -60, 0], opacity: [0, 1, 0] }}
            transition={{
              duration: particleDurations[i],
              repeat: Infinity,
              delay: particleDelays[i],
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Grid lines */}
      <div className="absolute inset-0 z-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Floating Notification Badge */}
      <div className="absolute top-20 right-3 sm:top-24 sm:right-6 md:top-28 md:right-10 z-20 max-w-[calc(100vw-1.5rem)] sm:max-w-none">
        <div className="hero-float-notification rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2 sm:gap-2.5">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse flex-shrink-0" />
          <AnimatePresence mode="wait">
            <motion.span
              key={notificationIndex}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="text-cream text-[11px] sm:text-xs md:text-sm font-medium whitespace-nowrap"
            >
              {notificationMessages[notificationIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* ============================ CONTENT ============================ */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-[55fr_45fr] gap-10 sm:gap-12 lg:gap-16 items-center">
          {/* ----------------------- LEFT COLUMN ----------------------- */}
          <div className="text-left">
            {/* Premium badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-gold/20 bg-gold/5 backdrop-blur-sm mb-5 sm:mb-7"
            >
              <Star className="w-3.5 h-3.5 fill-gold text-gold" />
              <span className="text-gold text-xs sm:text-sm font-medium tracking-wide">
                Premium Digital Agency
              </span>
            </motion.div>

            {/* Main heading */}
            <h1 className="text-4xl min-[400px]:text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] sm:leading-[1.05] tracking-tight mb-4 sm:mb-6">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-cream block"
              >
                Elevate Your
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.55 }}
                className="gold-shimmer block whitespace-nowrap"
              >
                Digital Presence
              </motion.span>
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="text-sm sm:text-base md:text-lg text-sv-muted leading-relaxed mb-6 sm:mb-8 max-w-xl"
            >
              We help ambitious businesses dominate search engines, generate
              quality leads, build unforgettable brands, and scale revenue
              through AI-powered digital marketing.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-12"
            >
              <Button
                asChild
                size="lg"
                className="btn-shine bg-gradient-to-r from-gold to-bronze text-sv-bg font-bold text-sm sm:text-base px-6 sm:px-7 h-12 hover:shadow-xl hover:shadow-gold/25 transition-all duration-300 group w-full sm:w-auto"
              >
                <Link href="/contact">
                  Get Started
                  <ArrowRight className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-gold/30 text-gold hover:bg-gold/10 font-medium text-sm sm:text-base px-6 sm:px-7 h-12 group w-full sm:w-auto"
              >
                <Link href="/services">
                  <LayoutGrid className="mr-1.5 w-4 h-4 group-hover:scale-110 transition-transform" />
                  Our Services
                </Link>
              </Button>
            </motion.div>

            {/* Trust strip with animated counters */}
            <motion.div
              ref={trustRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1 }}
              className="grid grid-cols-3 gap-3 sm:gap-4 max-w-md sm:max-w-lg"
            >
              {trustStats.map((stat, i) => (
                <div
                  key={i}
                  className="relative pl-3 sm:pl-4 border-l border-gold/20 first:pl-3 sm:first:pl-4 min-w-0"
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gold-gradient leading-none mb-1 sm:mb-1.5">
                    {stat.suffix === "%" ? (
                      <>
                        <AnimatedCounter
                          value={stat.value}
                          suffix=""
                          inView={trustInView}
                        />
                        <span className="text-xl sm:text-2xl md:text-3xl">%</span>
                      </>
                    ) : (
                      <AnimatedCounter
                        value={stat.value}
                        suffix={stat.suffix}
                        inView={trustInView}
                      />
                    )}
                  </div>
                  <div className="text-[11px] sm:text-xs text-sv-muted leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ----------------------- RIGHT COLUMN ----------------------- */}
          <LeadForm />
        </div>
      </div>

      {/* Scroll indicator with mouse icon */}
      <motion.div
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-3 z-20"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="mouse-scroll-icon" />
        <ChevronDown className="w-4 h-4 text-gold/40" />
      </motion.div>

      {/* Gradient line separator */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="hero-gradient-line" />
      </div>
    </section>
  );
}
