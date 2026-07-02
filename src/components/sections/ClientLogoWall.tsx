"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ClientLogo {
  name: string;
  image?: string;
}

const row1Clients: ClientLogo[] = [
  { name: "LUXE RESIDENCES", image: "/logo-luxe.png" },
  { name: "MEDVISTA", image: "/logo-medvista.png" },
  { name: "THE LEGAL CHAMBERS", image: "/logo-legal-chambers.png" },
  { name: "EDUGROWTH" },
  { name: "AURORA BEAUTY", image: "/logo-aurora-beauty.png" },
  { name: "FITZONE PRO" },
  { name: "DINE LUXE" },
  { name: "STORE NEXT" },
  { name: "STARTUP HUB" },
  { name: "BRAND FORGE" },
];

const row2Clients: ClientLogo[] = [
  { name: "TECH VANGUARD", image: "/logo-tech-vanguard.png" },
  { name: "PRIME ESTATES", image: "/logo-prime-estates.png" },
  { name: "ELITE PROPERTIES" },
  { name: "HEALTH PLUS" },
  { name: "LEGAL EDGE" },
  { name: "BLOOM ACADEMY" },
  { name: "GLOW STUDIO" },
  { name: "FIT ELITE" },
  { name: "TASTE LUXE" },
  { name: "SHOP NEXT" },
];

function LogoCard({ logo }: { logo: ClientLogo }) {
  return (
    <div className="group relative flex-shrink-0">
      <div className="glass rounded-xl px-8 py-5 flex items-center justify-center h-20 cursor-pointer transition-all duration-500 hover:border-gold/30 mx-3">
        {logo.image ? (
          <Image
            src={logo.image}
            alt={logo.name}
            width={160}
            height={48}
            className="h-10 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-500"
          />
        ) : (
          <span className="text-sv-muted/50 text-sm font-semibold tracking-wider group-hover:text-gold transition-colors duration-500 whitespace-nowrap">
            {logo.name}
          </span>
        )}
      </div>
    </div>
  );
}

export default function ClientLogoWall() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="section-divider mb-16" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm tracking-[0.3em] text-gold/70 uppercase mb-2">
            Trusted By Industry Leaders
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-cream">
            Brands That Trust <span className="text-gold-gradient">Social Viens</span>
          </h2>
        </motion.div>
      </div>

      {/* Marquee Rows */}
      <div className="relative space-y-6 hover-pause">
        {/* Fade masks - left and right edges */}
        <div className="pointer-events-none absolute inset-0 z-10"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        />

        {/* Row 1 - scrolls LEFT (right to left) */}
        <div className="overflow-hidden">
          <div className="flex animate-marquee-left w-max">
            {/* Double the logos for seamless loop */}
            {[...row1Clients, ...row1Clients].map((client, i) => (
              <LogoCard key={`r1-${i}`} logo={client} />
            ))}
          </div>
        </div>

        {/* Row 2 - scrolls RIGHT (left to right) */}
        <div className="overflow-hidden">
          <div className="flex animate-marquee-right w-max">
            {/* Double the logos for seamless loop */}
            {[...row2Clients, ...row2Clients].map((client, i) => (
              <LogoCard key={`r2-${i}`} logo={client} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
