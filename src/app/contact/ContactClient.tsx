"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Loader2,
  CheckCircle2,
  Shield,
  Zap,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import AnimatedHeading from "@/components/ui/animated-heading";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const WHATSAPP_NUMBER = "918178004800";
const PHONE_DISPLAY = "+91 81780 04800";
const EMAIL = "socialviens@gmail.com";

const services = [
  "Website Development",
  "SEO",
  "Local SEO",
  "Google Business Profile",
  "Paid Ads (Google + Meta)",
  "Social Media Marketing",
  "Branding & Identity",
  "Marketing Automation",
  "Lead Generation",
];

const budgetRanges = [
  "Less than ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000 – ₹2,00,000",
  "₹2,00,000+",
];

const contactInfo = [
  {
    Icon: Phone,
    label: "Phone",
    value: PHONE_DISPLAY,
    href: `tel:${PHONE_DISPLAY.replace(/\s/g, "")}`,
    accent: "text-gold",
  },
  {
    Icon: Mail,
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    accent: "text-gold",
  },
  {
    Icon: MapPin,
    label: "Location",
    value: "Delhi NCR, India",
    href: "#map",
    accent: "text-gold",
  },
  {
    Icon: Clock,
    label: "Hours",
    value: "Mon – Sat · 9 AM – 7 PM IST",
    accent: "text-gold",
  },
];

const socials = [
  { Icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { Icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { Icon: Facebook, label: "Facebook", href: "https://facebook.com" },
  { Icon: Twitter, label: "Twitter", href: "https://twitter.com" },
];

const checklist = [
  "Free Strategy Session",
  "No Obligation",
  "Response in 24hrs",
  "100% Confidential",
];

/* ------------------------------------------------------------------ */
/*  Reusable input                                                     */
/* ------------------------------------------------------------------ */

function FloatingInput({
  name,
  label,
  type = "text",
  required = false,
  placeholder,
  value,
  onChange,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
      <label
        className={`absolute left-4 transition-all duration-300 pointer-events-none z-10 ${
          focused || value
            ? "top-1.5 text-[10px] uppercase tracking-wider text-gold"
            : "top-3.5 text-sm text-sv-muted/60"
        }`}
      >
        {label}
        {required && <span className="text-gold ml-0.5">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-sv-elevated border border-gold/15 rounded-xl px-4 pt-6 pb-2 text-cream focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/15 placeholder:text-transparent transition-all duration-300"
        placeholder={placeholder}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function ContactClient() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // controlled form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });

  const update =
    (field: keyof typeof form) => (v: string) =>
      setForm((f) => ({ ...f, [field]: v }));

  const buildWhatsappMessage = () => {
    const lines = [
      "*New Contact Form Submission — Social Viens*",
      "",
      `*Name:* ${form.name}`,
      `*Email:* ${form.email}`,
      `*Phone:* ${form.phone}`,
      form.company ? `*Company:* ${form.company}` : null,
      form.service ? `*Service:* ${form.service}` : null,
      form.budget ? `*Budget:* ${form.budget}` : null,
      form.message ? `*Message:* ${form.message}` : null,
      "",
      "_Sent via /contact page_",
    ].filter(Boolean);
    return encodeURIComponent(lines.join("\n"));
  };

  const validate = () => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return "Please enter a valid email address.";
    if (form.phone.replace(/\D/g, "").length < 10)
      return "Please enter a valid phone number.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      toast({ title: "Check your details", description: err, variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      // POST to API (non-blocking — WhatsApp still opens on success)
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          business: form.company,
          service: form.service,
          budget: form.budget,
          message: form.message,
          source: "contact-page",
        }),
      }).catch(() => null);

      setSubmitted(true);
      toast({
        title: "🎉 Message Sent!",
        description: "Opening WhatsApp for instant follow-up...",
      });

      // open WhatsApp pre-filled
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsappMessage()}`,
        "_blank",
        "noopener,noreferrer",
      );
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us on WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

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
            <Send className="w-4 h-4" />
            Contact Us
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-6"
          >
            <AnimatedHeading text1="Get In" text2="Touch" className="!mb-0" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto text-cream/70 text-lg leading-relaxed"
          >
            Tell us where you want to go — we&apos;ll architect the growth
            plan to get you there. Free strategy session, response within 24
            hours.
          </motion.p>
        </div>
      </section>

      {/* ============================== FORM + SIDEBAR ============================== */}
      <section className="relative py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[3fr_2fr] gap-8 items-start">
            {/* ============== LEFT — FORM ============== */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="glass rounded-3xl p-6 md:p-10 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

              <h2 className="text-2xl md:text-3xl font-bold text-cream mb-2">
                Send us a{" "}
                <span className="text-gold-gradient">message</span>
              </h2>
              <p className="text-sv-muted text-sm mb-8">
                Fill in the form below — we&apos;ll route it straight to a
                strategist and follow up on WhatsApp.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-success/10 border border-success/30 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-success" />
                  </div>
                  <h4 className="text-2xl font-bold text-cream mb-3">
                    Thank You! 🎉
                  </h4>
                  <p className="text-sv-muted text-base mb-6 max-w-md mx-auto">
                    We&apos;ve received your message and opened WhatsApp for
                    an instant follow-up. Our strategist will reach out
                    within 24 hours.
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="border-whatsapp/30 text-whatsapp hover:bg-whatsapp/10"
                  >
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                        "Hi! I just submitted the contact form.",
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Open WhatsApp Again
                    </a>
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <FloatingInput
                      name="name"
                      label="Full Name"
                      required
                      placeholder="John Doe"
                      value={form.name}
                      onChange={update("name")}
                    />
                    <FloatingInput
                      name="email"
                      label="Email Address"
                      type="email"
                      required
                      placeholder="john@company.com"
                      value={form.email}
                      onChange={update("email")}
                    />
                    <FloatingInput
                      name="phone"
                      label="Phone Number"
                      type="tel"
                      required
                      placeholder="+91 81780 04800"
                      value={form.phone}
                      onChange={update("phone")}
                    />
                    <FloatingInput
                      name="company"
                      label="Company (optional)"
                      placeholder="Your Company Pvt. Ltd."
                      value={form.company}
                      onChange={update("company")}
                    />
                  </div>

                  {/* Service + Budget selects */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-medium text-gold mb-1.5 uppercase tracking-wider">
                        Service Interested In
                      </label>
                      <select
                        name="service"
                        value={form.service}
                        onChange={(e) => update("service")(e.target.value)}
                        className="w-full bg-sv-elevated border border-gold/15 rounded-xl px-4 py-3.5 text-cream focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/15 transition-all duration-300 appearance-none cursor-pointer text-sm"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M6 8L1 3h10z' fill='%23D4AF37'/%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 16px center",
                        }}
                      >
                        <option value="">Select a service...</option>
                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-medium text-gold mb-1.5 uppercase tracking-wider">
                        Budget Range
                      </label>
                      <select
                        name="budget"
                        value={form.budget}
                        onChange={(e) => update("budget")(e.target.value)}
                        className="w-full bg-sv-elevated border border-gold/15 rounded-xl px-4 py-3.5 text-cream focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/15 transition-all duration-300 appearance-none cursor-pointer text-sm"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M6 8L1 3h10z' fill='%23D4AF37'/%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 16px center",
                        }}
                      >
                        <option value="">Select budget...</option>
                        {budgetRanges.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[10px] font-medium text-gold mb-1.5 uppercase tracking-wider">
                      How can we help?
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => update("message")(e.target.value)}
                      className="w-full bg-sv-elevated border border-gold/15 rounded-xl px-4 py-3 text-cream focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/15 placeholder:text-sv-muted/40 resize-none transition-all duration-300 text-sm"
                      placeholder="Tell us about your business goals, current challenges, timeline..."
                    />
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-[#25D366] to-[#1da851] text-white font-bold text-base py-6 h-auto hover:shadow-xl hover:shadow-[#25D366]/25 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group ripple-effect"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <MessageCircle className="mr-2 w-5 h-5" />
                        Send via WhatsApp
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>

                  <div className="flex items-center justify-center gap-6 text-sv-muted/50 text-xs flex-wrap">
                    <span className="flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-gold/60" />
                      Your data is safe & encrypted
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-gold/60" />
                      Response within 24 hours
                    </span>
                  </div>
                </form>
              )}
            </motion.div>

            {/* ============== RIGHT — SIDEBAR ============== */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-5"
            >
              {/* Contact info cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((item, i) => {
                  const { Icon } = item;
                  const inner = (
                    <div className="glass rounded-2xl p-5 card-hover group h-full border border-gold/10">
                      <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center mb-3 group-hover:gold-glow transition-all duration-300">
                        <Icon className={`w-5 h-5 ${item.accent}`} />
                      </div>
                      <p className="text-[10px] uppercase tracking-wider text-sv-muted mb-1">
                        {item.label}
                      </p>
                      <p className="text-cream text-sm font-medium leading-snug">
                        {item.value}
                      </p>
                    </div>
                  );
                  return item.href ? (
                    <a
                      key={i}
                      href={item.href}
                      className="block"
                      {...(item.href.startsWith("http") || item.href.startsWith("tel") || item.href.startsWith("mailto")
                        ? {}
                        : {})}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div key={i}>{inner}</div>
                  );
                })}
              </div>

              {/* WhatsApp quick chat */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  "Hi Social Viens! I'd like to chat about my project.",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="glass-strong rounded-2xl p-5 border border-[#25D366]/30 hover:border-[#25D366]/50 transition-all duration-300 group flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#25D366] to-[#1da851] flex items-center justify-center shrink-0 shadow-lg shadow-[#25D366]/20 group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-cream font-semibold text-sm">
                      Quick chat on WhatsApp
                    </p>
                    <p className="text-sv-muted text-xs">
                      Tap to start a conversation instantly
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#25D366] ml-auto group-hover:translate-x-1 transition-transform" />
                </div>
              </a>

              {/* Social row */}
              <div className="glass rounded-2xl p-5 border border-gold/10">
                <p className="text-[10px] uppercase tracking-wider text-sv-muted mb-3">
                  Follow our work
                </p>
                <div className="flex gap-3">
                  {socials.map((s) => {
                    const { Icon } = s;
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="w-10 h-10 rounded-lg bg-sv-elevated border border-gold/15 flex items-center justify-center text-cream/70 hover:text-gold hover:border-gold/40 hover:-translate-y-0.5 transition-all duration-300"
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Response promise */}
              <div className="glass rounded-2xl p-5 border border-gold/15 gold-glow flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-success/10 border border-success/30 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-cream font-semibold text-sm mb-0.5">
                    We respond within 24 hours
                  </p>
                  <p className="text-sv-muted text-xs leading-relaxed">
                    Every inquiry gets a real, human response from a
                    strategist — not an autoresponder.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================== MAP ============================== */}
      <section id="map" className="relative py-16 md:py-20 border-t border-gold/10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              <span className="text-cream">Find us in </span>
              <span className="text-gold-gradient">Delhi NCR</span>
            </h2>
            <p className="text-sv-muted text-sm">
              Serving clients across India & beyond — remotely & in-person.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass rounded-3xl p-3 border border-gold/15 overflow-hidden"
          >
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
              <iframe
                title="Social Viens — Delhi NCR location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923192776!2d76.81306785!3d28.6448097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi%20NCR!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) saturate(0.6)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================== CHECKLIST STRIP ============================== */}
      <section className="relative py-10 border-t border-gold/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {checklist.map((item) => (
              <span
                key={item}
                className="flex items-center gap-2 text-sm text-cream/80"
              >
                <CheckCircle2 className="w-4 h-4 text-success" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== CTA ============================== */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 gold-divider" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gold/[0.05] blur-[120px] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
              <span className="text-cream">Prefer to talk? </span>
              <span className="text-gold-gradient">Book a call.</span>
            </h2>
            <p className="text-cream/70 text-base mb-6">
              Skip the form — schedule a free 30-minute strategy session
              directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-gold to-bronze text-sv-bg font-bold text-sm hover:shadow-xl hover:shadow-gold/25 transition-all duration-300 ripple-effect group"
              >
                <Calendar className="w-4 h-4" />
                Book Free Strategy Call
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  "Hi! I'd like to book a free strategy call.",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full border border-[#25D366]/40 text-[#25D366] font-semibold text-sm hover:bg-[#25D366]/10 hover:border-[#25D366]/60 transition-all duration-300 ripple-effect group"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
