"use client";

import { motion } from "framer-motion";
import AnimatedHeading from "@/components/ui/animated-heading";

interface Partner {
  name: string;
  icon: React.ReactNode;
}

interface PartnerCategory {
  label: string;
  partners: Partner[];
}

const categories: PartnerCategory[] = [
  {
    label: "Advertising",
    partners: [
      {
        name: "Google Ads",
        icon: (
          <svg viewBox="0 0 40 40" className="w-10 h-10">
            <rect width="40" height="40" rx="10" fill="#1a1a2e" />
            <path d="M20 8C13.37 8 8 13.37 8 20s5.37 12 12 12c3.31 0 6.31-1.34 8.49-3.51l-4.24-4.24C23.1 25.4 21.62 26 20 26c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.62 0 3.1.6 4.24 1.76l4.24-4.24C26.31 9.34 23.31 8 20 8z" fill="#4285F4" />
            <path d="M28.49 16.51L24.24 20l4.25 3.49C29.42 22.02 30 21.08 30 20s-.58-2.02-1.51-3.49z" fill="#EA4335" />
            <path d="M20 14c-3.31 0-6 2.69-6 6 0 2.21 1.19 4.14 2.97 5.21l3.27-5.21h6.76c-.5-3.44-3.44-6-6.76-6h-.24z" fill="#FBBC05" />
            <path d="M16.97 25.21C18.38 26.02 20.09 26.24 21.76 25.76l-3.52-5.55-1.27 4.99z" fill="#34A853" />
          </svg>
        ),
      },
      {
        name: "Meta",
        icon: (
          <svg viewBox="0 0 40 40" className="w-10 h-10">
            <rect width="40" height="40" rx="10" fill="#1a1a2e" />
            <path d="M10 14.5c0-2 1-3.5 2.8-3.5 1.2 0 2 .6 3 2l4.2 7 4.2-7c1-1.4 1.8-2 3-2 1.8 0 2.8 1.5 2.8 3.5 0 .8-.2 1.5-.6 2.2l-5.8 9.8c-.8 1.3-1.8 2-3.6 2s-2.8-.7-3.6-2l-5.8-9.8c-.4-.7-.6-1.4-.6-2.2z" fill="none" stroke="#0668E1" strokeWidth="1.5" />
            <path d="M12.8 11c-.6 0-1.1.3-1.5.9-.4.6-.6 1.4-.6 2.3l1.2-.8c0-.5.1-.9.3-1.2.2-.3.4-.4.6-.4.3 0 .6.2 1 .7l4.2 7 4.2-7c.4-.5.7-.7 1-.7.2 0 .4.1.6.4.2.3.3.7.3 1.2l1.2.8c0-.9-.2-1.7-.6-2.3-.4-.6-.9-.9-1.5-.9-.8 0-1.5.5-2.2 1.6L20 18.5l-3-5.9c-.7-1.1-1.4-1.6-2.2-1.6z" fill="#0668E1" opacity="0.6" />
          </svg>
        ),
      },
      {
        name: "LinkedIn Ads",
        icon: (
          <svg viewBox="0 0 40 40" className="w-10 h-10">
            <rect width="40" height="40" rx="10" fill="#1a1a2e" />
            <text x="20" y="26" textAnchor="middle" fill="#0A66C2" fontSize="16" fontWeight="700" fontFamily="Arial">in</text>
          </svg>
        ),
      },
      {
        name: "YouTube Ads",
        icon: (
          <svg viewBox="0 0 40 40" className="w-10 h-10">
            <rect width="40" height="40" rx="10" fill="#1a1a2e" />
            <rect x="8" y="13" width="24" height="14" rx="4" fill="#FF0000" opacity="0.9" />
            <polygon points="18,17 18,27 26,22" fill="white" transform="translate(-3,-4) scale(0.9)" />
            <polygon points="19,16.5 19,23.5 25,20" fill="white" />
          </svg>
        ),
      },
    ],
  },
  {
    label: "Analytics & Tools",
    partners: [
      {
        name: "Google Analytics",
        icon: (
          <svg viewBox="0 0 40 40" className="w-10 h-10">
            <rect width="40" height="40" rx="10" fill="#1a1a2e" />
            <rect x="10" y="22" width="5" height="10" rx="1" fill="#F9AB00" />
            <rect x="17.5" y="16" width="5" height="16" rx="1" fill="#E37400" />
            <rect x="25" y="10" width="5" height="22" rx="1" fill="#FF6D01" />
            <path d="M28 8l-6 6h4v6l6-6h-4V8z" fill="#F9AB00" opacity="0.6" />
          </svg>
        ),
      },
      {
        name: "SEMrush",
        icon: (
          <svg viewBox="0 0 40 40" className="w-10 h-10">
            <rect width="40" height="40" rx="10" fill="#1a1a2e" />
            <text x="20" y="27" textAnchor="middle" fill="#FF642D" fontSize="18" fontWeight="700" fontFamily="Arial">S</text>
          </svg>
        ),
      },
      {
        name: "Ahrefs",
        icon: (
          <svg viewBox="0 0 40 40" className="w-10 h-10">
            <rect width="40" height="40" rx="10" fill="#1a1a2e" />
            <text x="20" y="27" textAnchor="middle" fill="#FF8C00" fontSize="18" fontWeight="700" fontFamily="Arial">A</text>
          </svg>
        ),
      },
      {
        name: "HubSpot",
        icon: (
          <svg viewBox="0 0 40 40" className="w-10 h-10">
            <rect width="40" height="40" rx="10" fill="#1a1a2e" />
            <text x="20" y="27" textAnchor="middle" fill="#FF7A59" fontSize="18" fontWeight="700" fontFamily="Arial">H</text>
          </svg>
        ),
      },
    ],
  },
  {
    label: "Platforms",
    partners: [
      {
        name: "WordPress",
        icon: (
          <svg viewBox="0 0 40 40" className="w-10 h-10">
            <rect width="40" height="40" rx="10" fill="#1a1a2e" />
            <text x="20" y="27" textAnchor="middle" fill="#21759B" fontSize="18" fontWeight="700" fontFamily="Georgia, serif">W</text>
          </svg>
        ),
      },
      {
        name: "Shopify",
        icon: (
          <svg viewBox="0 0 40 40" className="w-10 h-10">
            <rect width="40" height="40" rx="10" fill="#1a1a2e" />
            <path d="M14 26l-1-8h14l-1 8H14z" fill="#95BF47" opacity="0.3" />
            <path d="M20 14c-2.2 0-4 1.8-4 4v2h8v-2c0-2.2-1.8-4-4-4z" fill="none" stroke="#95BF47" strokeWidth="1.5" />
            <path d="M14 20h12l-1 8H15l-1-8z" fill="none" stroke="#95BF47" strokeWidth="1.5" />
            <circle cx="18" cy="23" r="1" fill="#95BF47" />
            <circle cx="22" cy="23" r="1" fill="#95BF47" />
          </svg>
        ),
      },
      {
        name: "Mailchimp",
        icon: (
          <svg viewBox="0 0 40 40" className="w-10 h-10">
            <rect width="40" height="40" rx="10" fill="#1a1a2e" />
            <circle cx="17" cy="20" r="4" fill="none" stroke="#FFE01B" strokeWidth="1.5" />
            <circle cx="23" cy="20" r="4" fill="none" stroke="#FFE01B" strokeWidth="1.5" />
            <circle cx="16" cy="18" r="1" fill="#FFE01B" />
            <circle cx="24" cy="18" r="1" fill="#FFE01B" />
            <path d="M15 23c1 2 3 3 5 3s4-1 5-3" fill="none" stroke="#FFE01B" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M20 14c-1 0-2 .5-2 1.5s1 1.5 2 1 2-.5 2-1.5-1-1.5-2-1z" fill="#FFE01B" opacity="0.5" />
          </svg>
        ),
      },
      {
        name: "Zapier",
        icon: (
          <svg viewBox="0 0 40 40" className="w-10 h-10">
            <rect width="40" height="40" rx="10" fill="#1a1a2e" />
            <text x="20" y="27" textAnchor="middle" fill="#FF4A00" fontSize="18" fontWeight="700" fontFamily="Arial">Z</text>
          </svg>
        ),
      },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Partners() {
  return (
    <section id="partners" className="relative py-24 overflow-hidden">
      <div className="section-divider mb-16" />

      {/* Floating gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[15%] left-[10%] w-72 h-72 rounded-full bg-gold/5 blur-[140px] animate-float"
        />
        <div
          className="absolute bottom-[20%] right-[15%] w-80 h-80 rounded-full bg-bronze/5 blur-[150px] animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gold/3 blur-[180px]"
        />
        <div
          className="absolute top-[30%] right-[30%] w-48 h-48 rounded-full bg-gold/4 blur-[100px] animate-float"
          style={{ animationDelay: "4s" }}
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
            Integrations & Tools
          </p>
          <AnimatedHeading text1="Our Technology" text2="Partners" />
          <p className="max-w-2xl mx-auto text-sv-muted text-lg mt-4">
            We leverage the most powerful platforms and tools to drive exceptional results for our clients
          </p>
        </motion.div>

        {/* Partner categories */}
        <div className="space-y-14">
          {categories.map((category, catIdx) => (
            <motion.div
              key={category.label}
              variants={categoryVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {/* Category label */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="flex items-center gap-4 mb-6"
              >
                <div className="h-px flex-1 bg-gradient-to-r from-gold/30 to-transparent" />
                <span className="text-xs tracking-[0.25em] text-gold/60 uppercase font-semibold whitespace-nowrap">
                  {category.label}
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-gold/30 to-transparent" />
              </motion.div>

              {/* Partner cards grid */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
              >
                {category.partners.map((partner, pIdx) => (
                  <motion.div
                    key={partner.name}
                    variants={cardVariants}
                    transition={{ delay: catIdx * 0.05 + pIdx * 0.08 }}
                    className="group"
                  >
                    <div className="glass rounded-2xl p-5 md:p-6 h-full relative overflow-hidden border border-white/[0.06] hover:border-gold/30 transition-all duration-500 group-hover:-translate-y-1 group-hover:gold-glow cursor-default">
                      {/* Hover glow overlay */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-gold/15 via-transparent to-gold/5" />
                      </div>

                      {/* Background accent */}
                      <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-gold/3 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="relative z-10 flex flex-col items-center text-center gap-3">
                        {/* Icon container */}
                        <div className="transition-all duration-500 group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">
                          <div className="transition-all duration-500 [&_svg]:group-hover:brightness-125 [&_rect]:group-hover:fill-[#222244]">
                            {partner.icon}
                          </div>
                        </div>

                        {/* Partner name */}
                        <h3 className="text-sm md:text-base font-semibold text-cream/80 group-hover:text-cream transition-colors duration-300">
                          {partner.name}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-16"
        >
          <p className="text-sv-muted text-lg mb-6">
            And <span className="text-gold font-bold">50+</span> more tools integrated into our growth stack
          </p>
          <button className="group relative inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-gold/50 text-gold hover:border-gold hover:bg-gold/10 transition-all duration-500 font-semibold tracking-wide">
            <span>See Full Stack</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            {/* Button glow */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-gold/5 via-gold/10 to-gold/5 blur-sm" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
