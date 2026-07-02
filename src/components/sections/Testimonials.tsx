"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Rajesh Sharma",
    role: "Director, Luxe Residences",
    industry: "Real Estate",
    quote:
      "Social Viens transformed our digital presence completely. Within 6 months, we went from barely any online leads to 85+ qualified inquiries per month. The ROI has been phenomenal.",
    rating: 5,
    result: "962% Lead Growth",
    avatar: "RS",
    image: "/images/team/client-1.png",
  },
  {
    name: "Dr. Priya Mehta",
    role: "Founder, MedVista Healthcare",
    industry: "Healthcare",
    quote:
      "As a healthcare provider, we needed a marketing partner who understood our industry. Social Viens delivered beyond expectations — our patient inquiries increased 7x.",
    rating: 5,
    result: "700% More Inquiries",
    avatar: "PM",
    image: "/images/team/client-2.png",
  },
  {
    name: "Anita Kapoor",
    role: "CEO, Beauté Elite",
    industry: "Beauty",
    quote:
      "The branding and social media work was absolutely stunning. Our salon is now the most searched beauty brand in our city. Worth every penny.",
    rating: 5,
    result: "300% More Bookings",
    avatar: "AK",
    image: "/images/team/client-4.png",
  },
  {
    name: "Vikram Singh",
    role: "Managing Partner, Legal Associates",
    industry: "Law Firm",
    quote:
      "We were skeptical about digital marketing for law firms. Social Viens proved us wrong — we now dominate local search for all our practice areas.",
    rating: 5,
    result: "Top 3 Rankings",
    avatar: "VS",
    image: "/images/team/client-3.png",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const total = testimonials.length;

  const goTo = useCallback(
    (index: number, dir?: number) => {
      setDirection(dir ?? (index > current ? 1 : -1));
      setCurrent(index);
    },
    [current]
  );

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      goNext();
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, goNext]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.92,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.92,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    }),
  };

  const peekCardVariants = {
    left: {
      x: 0,
      opacity: 0.35,
      scale: 0.88,
      filter: "blur(2px)",
    },
    right: {
      x: 0,
      opacity: 0.35,
      scale: 0.88,
      filter: "blur(2px)",
    },
  };

  const getPrevIndex = (i: number) => (i - 1 + total) % total;
  const getNextIndex = (i: number) => (i + 1) % total;

  return (
    <section
      id="testimonials"
      className="relative py-24 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="section-divider mb-16" />

      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/[0.04] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] text-gold/70 uppercase mb-4">
            Client Success Stories
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-cream">What Our Clients</span>{" "}
            <span className="text-gold-gradient">Say</span>
          </h2>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Arrow Buttons */}
          <button
            onClick={goPrev}
            className="absolute left-0 md:-left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full glass-strong flex items-center justify-center text-gold/70 hover:text-gold hover:gold-glow transition-all duration-300 cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-0 md:-right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full glass-strong flex items-center justify-center text-gold/70 hover:text-gold hover:gold-glow transition-all duration-300 cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Carousel viewport */}
          <div className="relative mx-auto max-w-3xl md:max-w-4xl lg:max-w-5xl overflow-hidden py-4">
            {/* Desktop peek cards */}
            <div className="hidden lg:block">
              {/* Previous card peek */}
              <motion.div
                key={`peek-prev-${getPrevIndex(current)}`}
                className="absolute top-4 left-0 w-[280px] h-full z-0 pointer-events-none"
                initial={false}
                animate="left"
                variants={peekCardVariants}
              >
                <div className="glass rounded-2xl p-6 h-full opacity-60 scale-[0.88] origin-left">
                  <div className="space-y-3 blur-[1.5px]">
                    <Quote className="w-8 h-8 text-gold/20" />
                    <p className="text-cream/40 text-sm line-clamp-3">
                      {testimonials[getPrevIndex(current)].quote}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Next card peek */}
              <motion.div
                key={`peek-next-${getNextIndex(current)}`}
                className="absolute top-4 right-0 w-[280px] h-full z-0 pointer-events-none"
                initial={false}
                animate="right"
                variants={peekCardVariants}
              >
                <div className="glass rounded-2xl p-6 h-full opacity-60 scale-[0.88] origin-right">
                  <div className="space-y-3 blur-[1.5px]">
                    <Quote className="w-8 h-8 text-gold/20" />
                    <p className="text-cream/40 text-sm line-clamp-3">
                      {testimonials[getNextIndex(current)].quote}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Active card */}
            <div className="relative z-10 flex justify-center">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={current}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl"
                >
                  <div className="glass-strong rounded-3xl p-8 md:p-10 lg:p-12 gold-glow-strong relative overflow-hidden">
                    {/* Gold border glow overlay */}
                    <div className="absolute inset-0 rounded-3xl border border-gold/20 pointer-events-none" />

                    {/* Decorative gradient accent top */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

                    {/* Large decorative quote mark */}
                    <div className="mb-6">
                      <Quote className="w-12 h-12 md:w-14 md:h-14 text-gold/30 fill-gold/10" />
                    </div>

                    {/* Star rating */}
                    <div className="flex gap-1.5 mb-6">
                      {Array.from({
                        length: testimonials[current].rating,
                      }).map((_, j) => (
                        <Star
                          key={j}
                          className="w-5 h-5 fill-gold text-gold"
                        />
                      ))}
                    </div>

                    {/* Quote text - larger and more impactful */}
                    <blockquote className="text-cream/95 leading-relaxed mb-8 text-lg md:text-xl lg:text-2xl font-light">
                      &ldquo;{testimonials[current].quote}&rdquo;
                    </blockquote>

                    {/* Result badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/[0.08] border border-gold/20 mb-8">
                      <span className="text-sm font-semibold text-gold-gradient">
                        📊 {testimonials[current].result}
                      </span>
                    </div>

                    {/* Author section */}
                    <div className="flex items-center gap-4 pt-6 border-t border-gold/10">
                      {/* Avatar */}
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold via-gold-light to-bronze flex items-center justify-center text-sv-bg font-bold text-lg shadow-lg shadow-gold/10 overflow-hidden">
                        {testimonials[current].image ? (
                          <Image
                            src={testimonials[current].image!}
                            alt={`${testimonials[current].name} — ${testimonials[current].role}`}
                            width={56}
                            height={56}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          testimonials[current].avatar
                        )}
                      </div>

                      {/* Name, role, industry */}
                      <div className="flex-1">
                        <p className="font-semibold text-cream text-lg">
                          {testimonials[current].name}
                        </p>
                        <p className="text-sm text-sv-muted mb-1">
                          {testimonials[current].role}
                        </p>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gold/[0.06] border border-gold/15 text-gold/80">
                          {testimonials[current].industry}
                        </span>
                      </div>
                    </div>

                    {/* Shimmer effect on active card */}
                    <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_4s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-gold/[0.03] to-transparent" />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="relative cursor-pointer group"
                aria-label={`Go to testimonial ${i + 1}`}
              >
                <span
                  className={`block rounded-full transition-all duration-500 ${
                    i === current
                      ? "w-8 h-3 bg-gradient-to-r from-gold to-gold-light shadow-lg shadow-gold/20"
                      : "w-3 h-3 bg-gold/20 group-hover:bg-gold/40"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Pause indicator */}
          <AnimatePresence>
            {isPaused && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="flex items-center justify-center mt-3"
              >
                <span className="text-xs text-sv-muted/50 flex items-center gap-1.5">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    className="text-sv-muted/40"
                  >
                    <rect x="1" y="1" width="3" height="8" rx="0.5" fill="currentColor" />
                    <rect x="6" y="1" width="3" height="8" rx="0.5" fill="currentColor" />
                  </svg>
                  Paused
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-gold/20 text-gold hover:bg-gold/10 px-8"
          >
            <a href="#contact">
              Join Our Success Stories <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
