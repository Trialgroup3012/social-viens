"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Target,
  BarChart3,
  MessageCircle,
  CheckCircle2,
  CalendarCheck,
  Loader2,
  Phone,
  MessageSquare,
} from "lucide-react";
import AnimatedHeading from "@/components/ui/animated-heading";

/* ---------- Types ---------- */

type Step = 1 | 2 | 3 | 4;

interface BookingData {
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  company: string;
}

/* ---------- Constants ---------- */

const BENEFITS = [
  {
    icon: Target,
    title: "Custom Growth Strategy",
    description: "Get a tailored plan for your business goals",
  },
  {
    icon: BarChart3,
    title: "Expert Industry Analysis",
    description: "Deep-dive into your market opportunities",
  },
  {
    icon: MessageCircle,
    title: "No-Obligation Chat",
    description: "Zero pressure, just valuable insights",
  },
  {
    icon: CheckCircle2,
    title: "Actionable Next Steps",
    description: "Walk away with a clear roadmap",
  },
];

const TIME_SLOTS = ["10:00 AM", "12:00 PM", "3:00 PM", "5:00 PM"];

/* ---------- Helpers ---------- */

function getNext7Days(): { label: string; date: Date; key: string }[] {
  const days: { label: string; date: Date; key: string }[] = [];
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthLabels = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push({
      label: `${dayLabels[d.getDay()]} ${d.getDate()}`,
      date: d,
      key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
    });
  }
  return days;
}

function formatFullDate(date: Date): string {
  const monthLabels = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${monthLabels[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

/* ---------- Benefit Card ---------- */

function BenefitCard({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="group glass rounded-xl p-5 border-l-2 border-l-gold/40 border border-gold/10 hover:border-l-gold/80 hover:border-gold/20 transition-all duration-400 hover:shadow-[0_0_30px_rgba(212,175,55,0.08)]"
    >
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors duration-300">
          <Icon className="w-5 h-5 text-gold" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-cream mb-1">{title}</h4>
          <p className="text-sm text-sv-muted leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- Main Component ---------- */

export default function ScheduleCall() {
  const [step, setStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData>({
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const next7Days = useMemo(() => getNext7Days(), []);

  const selectedDateObj = useMemo(() => {
    if (!bookingData.date) return null;
    return next7Days.find((d) => d.key === bookingData.date)?.date ?? null;
  }, [bookingData.date, next7Days]);

  const updateField = <K extends keyof BookingData>(field: K, value: BookingData[K]) => {
    setBookingData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = (): boolean => {
    switch (step) {
      case 1:
        return !!bookingData.date;
      case 2:
        return !!bookingData.time;
      case 3:
        return !!(bookingData.name && bookingData.email && bookingData.phone);
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (step < 4 && canProceed()) {
      setStep((prev) => (prev + 1) as Step);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as Step);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const message = `Schedule Call Request — Date: ${selectedDateObj ? formatFullDate(selectedDateObj) : bookingData.date}, Time: ${bookingData.time}${bookingData.company ? `, Company: ${bookingData.company}` : ""}`;

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: bookingData.name,
          email: bookingData.email,
          phone: bookingData.phone,
          business: bookingData.company || undefined,
          message,
          source: "schedule-call",
        }),
      });

      if (res.ok) {
        setIsSuccess(true);
      }
    } catch {
      // Silently handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepLabels = ["Date", "Time", "Details", "Confirm"];

  return (
    <section id="schedule-call" className="relative py-24 overflow-hidden">
      <div className="section-divider mb-16" />

      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating gradient orbs */}
        <motion.div
          className="absolute top-20 left-10 w-[400px] h-[400px] bg-gold/[0.04] rounded-full blur-[120px]"
          animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-[350px] h-[350px] bg-bronze/[0.05] rounded-full blur-[100px]"
          animate={{ y: [0, 25, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/[0.02] rounded-full blur-[150px]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Pattern dots texture */}
        <div className="absolute inset-0 pattern-dots opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/20 bg-gold/5 text-gold text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Calendar className="w-4 h-4" />
            Free Consultation
          </motion.div>

          <AnimatedHeading text1="Schedule a" text2="Growth Call" />

          <p className="max-w-2xl mx-auto text-sv-muted text-lg leading-relaxed mt-2">
            Book a free 30-minute strategy session with our growth experts. No obligations, just results.
          </p>
        </motion.div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* LEFT COLUMN - Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-xl font-bold text-cream mb-6 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-gradient-to-r from-gold to-gold-light rounded-full" />
              Why Book a Call?
            </h3>
            <div className="space-y-4">
              {BENEFITS.map((benefit, i) => (
                <BenefitCard
                  key={benefit.title}
                  icon={benefit.icon}
                  title={benefit.title}
                  description={benefit.description}
                  index={i}
                />
              ))}
            </div>

            {/* WhatsApp CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 flex items-center gap-3"
            >
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
              <a
                href="https://wa.me/1234567890?text=Hi!%20I'd%20like%20to%20chat%20about%20growing%20my%20business"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-sv-muted hover:text-whatsapp transition-colors duration-300 group"
              >
                <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                Prefer WhatsApp? Chat with us directly
              </a>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN - Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="glass rounded-2xl p-6 md:p-8 border border-gold/15 relative overflow-hidden">
              {/* Gold border accent glow */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none">
                <div className="absolute -top-px left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
              </div>

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  /* ---- Success State ---- */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="py-12 flex flex-col items-center text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.2 }}
                      className="w-20 h-20 rounded-full bg-emerald-500/15 border-2 border-emerald-500/30 flex items-center justify-center mb-6"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.5 }}
                      >
                        <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                      </motion.div>
                    </motion.div>
                    <h3 className="text-2xl font-bold text-cream mb-2">You&apos;re booked!</h3>
                    <p className="text-sv-muted text-sm max-w-xs">
                      We&apos;ll send a confirmation to{" "}
                      <span className="text-gold">{bookingData.email}</span>
                    </p>
                    <div className="mt-4 px-4 py-2 rounded-lg bg-sv-elevated/60 border border-gold/10 text-xs text-sv-muted">
                      {selectedDateObj && formatFullDate(selectedDateObj)} at {bookingData.time}
                    </div>
                  </motion.div>
                ) : (
                  /* ---- Booking Steps ---- */
                  <motion.div
                    key="form"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Progress Indicator */}
                    <div className="flex items-center justify-center gap-2 mb-8">
                      {([1, 2, 3, 4] as Step[]).map((s) => (
                        <div key={s} className="flex items-center gap-2">
                          <motion.div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                              s < step
                                ? "bg-gold/20 text-gold border border-gold/30"
                                : s === step
                                ? "bg-gradient-to-r from-gold to-gold-light text-sv-bg shadow-md shadow-gold/20"
                                : "bg-sv-elevated/60 text-sv-muted/40 border border-gold/10"
                            }`}
                            whileHover={s <= step ? { scale: 1.05 } : {}}
                          >
                            {s < step ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              s
                            )}
                          </motion.div>
                          {s < 4 && (
                            <div
                              className={`w-6 h-px transition-colors duration-300 ${
                                s < step ? "bg-gold/40" : "bg-gold/10"
                              }`}
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Step Labels */}
                    <p className="text-center text-xs text-sv-muted mb-6">
                      Step {step} — {stepLabels[step - 1]}
                    </p>

                    <AnimatePresence mode="wait">
                      {/* Step 1: Select Date */}
                      {step === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -30 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h4 className="text-sm font-semibold text-cream mb-4 flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gold" />
                            Select a Date
                          </h4>
                          <div className="grid grid-cols-4 gap-2 sm:gap-3">
                            {next7Days.map((day) => (
                              <motion.button
                                key={day.key}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={() => updateField("date", day.key)}
                                className={`py-3 px-2 rounded-xl text-center transition-all duration-300 border ${
                                  bookingData.date === day.key
                                    ? "bg-gold/15 border-gold/40 text-gold shadow-md shadow-gold/10"
                                    : "bg-sv-elevated/60 border-gold/10 text-cream/70 hover:border-gold/25 hover:bg-sv-elevated/80"
                                }`}
                              >
                                <span className="block text-xs font-medium">{day.label.split(" ")[0]}</span>
                                <span className="block text-lg font-bold mt-0.5">{day.label.split(" ")[1]}</span>
                              </motion.button>
                            ))}
                          </div>
                          {selectedDateObj && (
                            <motion.p
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-xs text-gold mt-3 text-center"
                            >
                              Selected: {formatFullDate(selectedDateObj)}
                            </motion.p>
                          )}
                        </motion.div>
                      )}

                      {/* Step 2: Select Time */}
                      {step === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -30 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h4 className="text-sm font-semibold text-cream mb-4 flex items-center gap-2">
                            <CalendarCheck className="w-4 h-4 text-gold" />
                            Select a Time
                          </h4>
                          <div className="grid grid-cols-2 gap-3">
                            {TIME_SLOTS.map((slot) => (
                              <motion.button
                                key={slot}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => updateField("time", slot)}
                                className={`py-4 px-4 rounded-xl text-center transition-all duration-300 border ${
                                  bookingData.time === slot
                                    ? "bg-gold/15 border-gold/40 text-gold shadow-md shadow-gold/10"
                                    : "bg-sv-elevated/60 border-gold/10 text-cream/70 hover:border-gold/25 hover:bg-sv-elevated/80"
                                }`}
                              >
                                <span className="text-sm font-semibold">{slot}</span>
                              </motion.button>
                            ))}
                          </div>
                          <p className="text-xs text-sv-muted mt-4 text-center">
                            All times are in your local timezone
                          </p>
                        </motion.div>
                      )}

                      {/* Step 3: Your Details */}
                      {step === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -30 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h4 className="text-sm font-semibold text-cream mb-4 flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gold" />
                            Your Details
                          </h4>
                          <div className="space-y-4">
                            <div>
                              <label className="text-xs text-sv-muted mb-1.5 block">Full Name *</label>
                              <input
                                type="text"
                                value={bookingData.name}
                                onChange={(e) => updateField("name", e.target.value)}
                                placeholder="John Doe"
                                className="w-full px-4 py-3 rounded-xl bg-sv-elevated/80 border border-gold/15 text-cream placeholder:text-sv-muted/40 text-sm focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all duration-300"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-sv-muted mb-1.5 block">Email Address *</label>
                              <input
                                type="email"
                                value={bookingData.email}
                                onChange={(e) => updateField("email", e.target.value)}
                                placeholder="john@company.com"
                                className="w-full px-4 py-3 rounded-xl bg-sv-elevated/80 border border-gold/15 text-cream placeholder:text-sv-muted/40 text-sm focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all duration-300"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-sv-muted mb-1.5 block">Phone Number *</label>
                              <input
                                type="tel"
                                value={bookingData.phone}
                                onChange={(e) => updateField("phone", e.target.value)}
                                placeholder="+1 (555) 000-0000"
                                className="w-full px-4 py-3 rounded-xl bg-sv-elevated/80 border border-gold/15 text-cream placeholder:text-sv-muted/40 text-sm focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all duration-300"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-sv-muted mb-1.5 block">Company (Optional)</label>
                              <input
                                type="text"
                                value={bookingData.company}
                                onChange={(e) => updateField("company", e.target.value)}
                                placeholder="Acme Inc."
                                className="w-full px-4 py-3 rounded-xl bg-sv-elevated/80 border border-gold/15 text-cream placeholder:text-sv-muted/40 text-sm focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all duration-300"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Step 4: Confirm */}
                      {step === 4 && (
                        <motion.div
                          key="step4"
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -30 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h4 className="text-sm font-semibold text-cream mb-4 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-gold" />
                            Confirm Your Booking
                          </h4>
                          <div className="space-y-3 mb-6">
                            <div className="rounded-xl bg-sv-elevated/60 border border-gold/10 p-4">
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <p className="text-xs text-sv-muted mb-1">Date</p>
                                  <p className="text-sm text-cream font-medium">
                                    {selectedDateObj ? formatFullDate(selectedDateObj) : "—"}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-sv-muted mb-1">Time</p>
                                  <p className="text-sm text-cream font-medium">{bookingData.time || "—"}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-sv-muted mb-1">Name</p>
                                  <p className="text-sm text-cream font-medium">{bookingData.name || "—"}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-sv-muted mb-1">Email</p>
                                  <p className="text-sm text-cream font-medium truncate">{bookingData.email || "—"}</p>
                                </div>
                                {bookingData.phone && (
                                  <div>
                                    <p className="text-xs text-sv-muted mb-1">Phone</p>
                                    <p className="text-sm text-cream font-medium">{bookingData.phone}</p>
                                  </div>
                                )}
                                {bookingData.company && (
                                  <div>
                                    <p className="text-xs text-sv-muted mb-1">Company</p>
                                    <p className="text-sm text-cream font-medium">{bookingData.company}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                            <p className="text-xs text-sv-muted text-center">
                              By confirming, you agree to receive a calendar invite and reminder emails.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-gold/10">
                      {step > 1 ? (
                        <motion.button
                          whileHover={{ x: -3 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={handleBack}
                          className="text-sm text-sv-muted hover:text-cream transition-colors duration-300 flex items-center gap-1"
                        >
                          ← Back
                        </motion.button>
                      ) : (
                        <div />
                      )}

                      {step < 4 ? (
                        <motion.button
                          whileHover={{ scale: canProceed() ? 1.03 : 1 }}
                          whileTap={{ scale: canProceed() ? 0.97 : 1 }}
                          onClick={handleNext}
                          disabled={!canProceed()}
                          className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                            canProceed()
                              ? "bg-gradient-to-r from-gold via-gold-light to-gold text-sv-bg hover:shadow-lg hover:shadow-gold/25"
                              : "bg-sv-elevated/60 text-sv-muted/40 border border-gold/10 cursor-not-allowed"
                          }`}
                        >
                          Continue
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.button>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-gold via-gold-light to-gold text-sv-bg hover:shadow-lg hover:shadow-gold/25 transition-all duration-300 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Booking...
                            </>
                          ) : (
                            <>
                              <CalendarCheck className="w-4 h-4" />
                              Confirm Booking
                            </>
                          )}
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
