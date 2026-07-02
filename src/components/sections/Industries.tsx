"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Building2,
  Heart,
  Scale,
  GraduationCap,
  Sparkles,
  Dumbbell,
  UtensilsCrossed,
  ShoppingBag,
  Rocket,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import AnimatedHeading from "@/components/ui/animated-heading";

const industries = [
  {
    icon: Building2,
    name: "Real Estate",
    description: "Generate qualified buyer leads and sell out projects faster with targeted digital campaigns.",
    stats: "3x More Qualified Leads",
    gradient: "from-amber-500/20 to-orange-500/20",
    image: "/images/industries/real-estate.png",
  },
  {
    icon: Heart,
    name: "Healthcare",
    description: "Attract patients, build trust, and grow your practice with HIPAA-compliant marketing.",
    stats: "5x Patient Inquiries",
    gradient: "from-rose-500/20 to-pink-500/20",
    image: "/images/industries/medical.png",
  },
  {
    icon: Scale,
    name: "Law Firms",
    description: "Dominate local search and establish authority in your practice area.",
    stats: "Top 3 Google Rankings",
    gradient: "from-slate-500/20 to-gray-500/20",
    image: "/images/industries/law-firm.png",
  },
  {
    icon: GraduationCap,
    name: "Education",
    description: "Boost enrollments and build institutional prestige through digital channels.",
    stats: "4x Enrollment Rate",
    gradient: "from-blue-500/20 to-indigo-500/20",
    image: "/images/industries/education.png",
  },
  {
    icon: Sparkles,
    name: "Beauty & Salon",
    description: "Create a stunning online presence that drives bookings and brand loyalty.",
    stats: "300% More Bookings",
    gradient: "from-pink-500/20 to-fuchsia-500/20",
    image: "/images/industries/salon.png",
  },
  {
    icon: Dumbbell,
    name: "Fitness",
    description: "Attract members and build a thriving fitness community online.",
    stats: "2x Membership Growth",
    gradient: "from-emerald-500/20 to-green-500/20",
    image: "/images/industries/fitness.png",
  },
  {
    icon: UtensilsCrossed,
    name: "Restaurants",
    description: "Fill tables and grow delivery orders with appetite-driving marketing.",
    stats: "5x Online Orders",
    gradient: "from-orange-500/20 to-red-500/20",
    image: "/images/industries/restaurant.png",
  },
  {
    icon: ShoppingBag,
    name: "E-Commerce",
    description: "Scale your online store with performance marketing and conversion optimization.",
    stats: "400% ROAS",
    gradient: "from-violet-500/20 to-purple-500/20",
    image: "/images/industries/ecommerce.png",
  },
  {
    icon: Rocket,
    name: "Startups",
    description: "Launch and scale with growth hacking strategies built for speed.",
    stats: "10x User Acquisition",
    gradient: "from-cyan-500/20 to-teal-500/20",
    image: "/images/industries/startup-it.png",
  },
];

export default function Industries() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const visibleCount = 3;

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % industries.length);
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + industries.length) % industries.length
    );
  }, []);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(next, 3000);
    return () => clearInterval(interval);
  }, [autoPlay, next]);

  const getVisibleIndustries = () => {
    const items: typeof industries = [];
    for (let i = 0; i < visibleCount; i++) {
      items.push(industries[(currentIndex + i) % industries.length]);
    }
    return items;
  };

  return (
    <section id="industries" className="relative py-24 overflow-hidden">
      <div className="section-divider mb-16" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] text-gold/70 uppercase mb-4">
            Industries We Serve
          </p>
          <AnimatedHeading text1="Industries We" text2="Dominate" />
          <p className="max-w-2xl mx-auto text-sv-muted text-lg">
            Deep expertise across industries. We don&apos;t just market — we
            understand your business.
          </p>
        </motion.div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {industries.map((industry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="group"
            >
              <div className="glass rounded-2xl overflow-hidden card-hover h-full flex flex-col">
                {/* Cover image */}
                <div className="relative h-44 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${industry.gradient}`}
                  />
                  {industry.image && (
                    <Image
                      src={industry.image}
                      alt={`${industry.name} industry marketing showcase`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-sv-bg/85 via-sv-bg/20 to-transparent" />
                  {/* Icon badge */}
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-xl glass border border-gold/20 flex items-center justify-center">
                    <industry.icon className="w-6 h-6 text-gold" />
                  </div>
                  {/* Name on image */}
                  <h3 className="absolute bottom-3 left-5 text-xl font-bold text-cream group-hover:text-gold transition-colors">
                    {industry.name}
                  </h3>
                </div>
                {/* Body */}
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-sv-muted text-sm leading-relaxed mb-4 flex-1">
                    {industry.description}
                  </p>
                  <span className="text-sm font-semibold text-success">
                    📊 {industry.stats}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden relative">
          <div
            className="flex gap-4 overflow-hidden"
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
          >
            {getVisibleIndustries().map((industry, i) => (
              <div key={`${currentIndex}-${i}`} className="min-w-[85%] flex-shrink-0">
                <div className="glass rounded-2xl overflow-hidden">
                  <div className="relative h-32 overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${industry.gradient}`}
                    />
                    {industry.image && (
                      <Image
                        src={industry.image}
                        alt={`${industry.name} industry marketing showcase`}
                        fill
                        sizes="85vw"
                        className="object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-sv-bg/85 via-sv-bg/20 to-transparent" />
                    <div className="absolute top-3 left-3 w-10 h-10 rounded-lg glass border border-gold/20 flex items-center justify-center">
                      <industry.icon className="w-5 h-5 text-gold" />
                    </div>
                    <h3 className="absolute bottom-2 left-4 text-lg font-bold text-cream">
                      {industry.name}
                    </h3>
                  </div>
                  <div className="p-5">
                    <p className="text-sv-muted text-sm leading-relaxed mb-3">
                      {industry.description}
                    </p>
                    <span className="text-sm font-semibold text-success">
                      📊 {industry.stats}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={prev}
              className="p-2 rounded-full glass text-gold hover:bg-gold/10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="p-2 rounded-full glass text-gold hover:bg-gold/10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
