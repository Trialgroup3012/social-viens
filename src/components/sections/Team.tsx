"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Twitter } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
  gradient: string;
  /** Optional real AI-generated portrait (relative to /public) */
  image?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Arjun Malhotra",
    role: "Founder & CEO",
    bio: "Visionary growth strategist with 10+ years in digital marketing",
    initials: "AM",
    gradient: "from-gold via-gold-light to-gold",
    image: "/images/team/founder-ceo.png",
  },
  {
    name: "Priya Sharma",
    role: "Head of SEO",
    bio: "SEO architect who's ranked 200+ websites on page 1",
    initials: "PS",
    gradient: "from-bronze via-gold to-bronze",
    image: "/images/team/founder-seo.png",
  },
  {
    name: "Rahul Verma",
    role: "Creative Director",
    bio: "Award-winning designer crafting premium brand experiences",
    initials: "RV",
    gradient: "from-gold via-bronze to-gold-light",
    image: "/images/team/founder-creative.png",
  },
  {
    name: "Ananya Patel",
    role: "Performance Marketing Lead",
    bio: "Data-driven marketer delivering 300%+ ROAS consistently",
    initials: "AP",
    gradient: "from-gold-light via-gold to-bronze",
    image: "/images/team/founder-ops.png",
  },
  {
    name: "Vikram Singh",
    role: "Tech Lead",
    bio: "Full-stack developer building high-converting digital experiences",
    initials: "VS",
    gradient: "from-bronze via-gold-light to-gold",
  },
  {
    name: "Neha Gupta",
    role: "Social Media Strategist",
    bio: "Community builder with 10M+ organic reach generated",
    initials: "NG",
    gradient: "from-gold via-gold to-bronze",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Team() {
  return (
    <section id="team" className="relative py-24 overflow-hidden">
      <div className="section-divider mb-16" />

      {/* Floating gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-gold/5 blur-[120px] animate-float" />
        <div
          className="absolute bottom-20 right-[10%] w-80 h-80 rounded-full bg-bronze/5 blur-[140px] animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gold/3 blur-[160px] animate-float"
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
            The People Behind The Results
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-cream">Meet The</span>{" "}
            <span className="text-gold-gradient">Growth Team</span>
          </h2>
          <p className="max-w-2xl mx-auto text-sv-muted text-lg">
            The experts behind your success
          </p>
        </motion.div>

        {/* Team grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.name}
              variants={cardVariants}
              className="group"
            >
              <div className="glass rounded-2xl p-6 lg:p-8 h-full relative overflow-hidden card-hover border border-transparent hover:border-gold/30 hover:gold-glow transition-all duration-500">
                {/* Hover glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-gold/20 via-transparent to-gold/10" />
                </div>

                {/* Background accent */}
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gold/3 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Avatar */}
                  <div className="relative mb-6">
                    <div
                      className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center shadow-lg shadow-gold/10 overflow-hidden`}
                    >
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={`${member.name} — ${member.role}`}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl font-bold text-sv-bg tracking-wide">
                          {member.initials}
                        </span>
                      )}
                    </div>
                    {/* Ring accent */}
                    <div className="absolute -inset-1.5 rounded-full border border-gold/20 group-hover:border-gold/40 transition-colors duration-500" />
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-bold text-cream mb-1 group-hover:text-gold-light transition-colors duration-300">
                    {member.name}
                  </h3>

                  {/* Role */}
                  <p className="text-sm font-medium text-gold mb-3">
                    {member.role}
                  </p>

                  {/* Bio */}
                  <p className="text-sv-muted text-sm leading-relaxed mb-6 max-w-[240px]">
                    {member.bio}
                  </p>

                  {/* Social icons */}
                  <div className="flex items-center gap-3">
                    <a
                      href="#"
                      aria-label={`${member.name} LinkedIn`}
                      className="w-10 h-10 rounded-xl bg-sv-elevated border border-gold/10 flex items-center justify-center text-sv-muted hover:text-gold hover:border-gold/30 hover:bg-sv-elevated/80 transition-all duration-300"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href="#"
                      aria-label={`${member.name} Twitter`}
                      className="w-10 h-10 rounded-xl bg-sv-elevated border border-gold/10 flex items-center justify-center text-sv-muted hover:text-gold hover:border-gold/30 hover:bg-sv-elevated/80 transition-all duration-300"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
