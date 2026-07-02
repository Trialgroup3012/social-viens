"use client";

import { motion } from "framer-motion";

interface Award {
  icon: string;
  name: string;
  org: string;
  year: string;
}

const awards: Award[] = [
  {
    icon: "🏆",
    name: "Best Digital Marketing Agency",
    org: "Digital Marketing Awards",
    year: "2024",
  },
  {
    icon: "⭐",
    name: "Top SEO Company",
    org: "Clutch.co",
    year: "2024",
  },
  {
    icon: "🥇",
    name: "Excellence in Lead Generation",
    org: "Marketing Excellence Awards",
    year: "2023",
  },
  {
    icon: "💎",
    name: "Premium Agency Partner",
    org: "Google Partners",
    year: "2024",
  },
  {
    icon: "🎖️",
    name: "Fastest Growing Agency",
    org: "Startup India",
    year: "2023",
  },
  {
    icon: "🌟",
    name: "Best Social Media Campaign",
    org: "Social Media Awards",
    year: "2024",
  },
  {
    icon: "🏅",
    name: "Top 50 Marketing Agencies",
    org: "Agency Spotter",
    year: "2024",
  },
  {
    icon: "🔥",
    name: "Innovation in AI Marketing",
    org: "Tech Marketing Summit",
    year: "2024",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function Awards() {
  return (
    <section id="awards" className="relative py-24 overflow-hidden">
      <div className="section-divider mb-16" />

      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-[160px]" />
        <div className="absolute top-1/4 left-[20%] w-64 h-64 rounded-full bg-bronze/5 blur-[120px] animate-float" />
        <div
          className="absolute bottom-1/4 right-[20%] w-72 h-72 rounded-full bg-gold/4 blur-[130px] animate-float"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] text-gold/70 uppercase mb-4">
            Industry Recognition
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-cream">Awards &</span>{" "}
            <span className="text-gold-gradient">Recognition</span>
          </h2>
          <p className="max-w-2xl mx-auto text-sv-muted text-lg">
            Recognized for excellence in digital marketing
          </p>
        </motion.div>

        {/* Awards grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {awards.map((award) => (
            <motion.div
              key={award.name}
              variants={cardVariants}
              className="group"
            >
              <div className="glass rounded-2xl p-5 md:p-6 h-full relative overflow-hidden border border-transparent hover:border-gold/30 transition-all duration-500 group-hover:scale-[1.05] group-hover:gold-glow">
                {/* Hover glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-gold/20 via-transparent to-gold/10" />
                </div>

                {/* Background accent */}
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-gold/3 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Icon */}
                  <div className="text-3xl md:text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {award.icon}
                  </div>

                  {/* Award name */}
                  <h3 className="text-sm md:text-base font-bold text-cream mb-1 leading-tight">
                    {award.name}
                  </h3>

                  {/* Issuing org */}
                  <p className="text-xs md:text-sm text-gold font-medium mb-2">
                    {award.org}
                  </p>

                  {/* Year */}
                  <p className="text-[10px] md:text-xs text-sv-muted">
                    {award.year}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
