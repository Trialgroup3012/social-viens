"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Volume2 } from "lucide-react";

export default function VideoShowreel() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section id="showreel" className="relative py-24 overflow-hidden">
      <div className="section-divider mb-16" />

      {/* Floating gradient orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 left-1/4 w-72 h-72 rounded-full bg-gold/5 blur-[100px]"
          animate={{
            x: [0, 40, 0],
            y: [0, -25, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-bronze/6 blur-[100px]"
          animate={{
            x: [0, -35, 0],
            y: [0, 30, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/3 blur-[140px]"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/20 bg-gold/5">
            <Volume2 className="w-4 h-4 text-gold" />
            <span className="text-gold text-sm font-medium tracking-wide">
              Our Story
            </span>
          </div>
        </motion.div>

        {/* Heading */}
        <div className="text-center mb-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight"
          >
            <span className="text-cream">See The Social Viens</span>{" "}
            <span className="text-gold-gradient">Difference</span>
          </motion.h2>
        </div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-center text-sv-muted text-lg max-w-2xl mx-auto mb-14 leading-relaxed"
        >
          From strategy to execution, discover how we craft data-driven
          campaigns that transform businesses and deliver measurable growth
          at every stage.
        </motion.p>

        {/* Video Player Area */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Gold border frame with glow */}
          <div className="relative rounded-2xl p-[2px] bg-gradient-to-br from-gold/40 via-gold/10 to-bronze/30 gold-glow-strong">
            {/* Glass morphism border container */}
            <div className="glass-strong rounded-2xl overflow-hidden">
              {/* 16:9 Aspect Ratio Video Container */}
              <div
                className="relative w-full cursor-pointer group"
                style={{ aspectRatio: "16 / 9" }}
                onClick={openModal}
              >
                {/* AI-generated cinematic showreel poster */}
                <Image
                  src="/images/sections/showreel-poster.png"
                  alt="Social Viens showreel — cinematic film reel and clapperboard"
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                  priority
                />

                {/* Gradient overlay background */}
                <div className="absolute inset-0 bg-gradient-to-br from-sv-bg/70 via-sv-bg/40 to-sv-bg/70" />

                {/* Decorative grid pattern */}
                <div className="absolute inset-0 opacity-[0.04]">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(212,175,55,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.4) 1px, transparent 1px)",
                      backgroundSize: "60px 60px",
                    }}
                  />
                </div>

                {/* Cinematic dark overlay with gold accents */}
                <div className="absolute inset-0 bg-gradient-to-t from-sv-bg/90 via-sv-bg/40 to-sv-bg/60" />
                <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-bronze/5" />

                {/* Subtle vignette */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, transparent 40%, rgba(15,10,12,0.7) 100%)",
                  }}
                />

                {/* Shimmer line at top */}
                <div className="absolute top-0 left-0 right-0 h-[1px] overflow-hidden">
                  <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-gold/60 to-transparent animate-shimmer" />
                </div>

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                  {/* Play Button */}
                  <motion.div
                    className="relative mb-6"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Outer pulse ring */}
                    <div className="absolute inset-0 rounded-full bg-gold/10 animate-pulse-gold" style={{ margin: "-12px" }} />

                    {/* Middle ring */}
                    <div className="absolute inset-0 rounded-full border border-gold/20" style={{ margin: "-6px" }} />

                    {/* Main play button */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-gold via-gold-light to-bronze flex items-center justify-center shadow-2xl shadow-gold/30 group-hover:shadow-gold/50 transition-shadow duration-500">
                      <Play className="w-8 h-8 sm:w-10 sm:h-10 text-sv-bg ml-1" fill="currentColor" />
                    </div>
                  </motion.div>

                  {/* Text overlay */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-cream text-lg sm:text-xl md:text-2xl font-semibold tracking-wide text-center px-4"
                  >
                    Watch How We Transform Businesses
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="text-sv-muted text-sm mt-2"
                  >
                    2 min showreel
                  </motion.p>
                </div>

                {/* Bottom decorative bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold/0 via-gold/30 to-gold/0" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Video Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            onClick={closeModal}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-sv-bg/95 backdrop-blur-md"
            />

            {/* Modal content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full max-w-5xl z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 sm:-top-14 sm:right-0 w-10 h-10 rounded-full glass flex items-center justify-center text-cream hover:text-gold hover:border-gold/30 transition-colors duration-300 z-20"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Gold border frame */}
              <div className="rounded-2xl p-[2px] bg-gradient-to-br from-gold/40 via-gold/10 to-bronze/30 gold-glow-strong">
                <div className="glass-strong rounded-2xl overflow-hidden">
                  {/* Mock video player area - 16:9 */}
                  <div
                    className="relative w-full flex items-center justify-center"
                    style={{ aspectRatio: "16 / 9" }}
                  >
                    {/* Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-sv-bg via-sv-surface to-sv-elevated" />

                    {/* Grid pattern */}
                    <div className="absolute inset-0 opacity-[0.03]">
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)",
                          backgroundSize: "40px 40px",
                        }}
                      />
                    </div>

                    {/* Central content */}
                    <div className="relative z-10 text-center px-6">
                      {/* Decorative play icon */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-gold/30 flex items-center justify-center mx-auto mb-6"
                      >
                        <Play className="w-6 h-6 sm:w-8 sm:h-8 text-gold/60 ml-0.5" fill="currentColor" />
                      </motion.div>

                      <motion.h3
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-cream text-xl sm:text-2xl md:text-3xl font-bold mb-3"
                      >
                        Video Coming Soon
                      </motion.h3>

                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-sv-muted text-sm sm:text-base max-w-md mx-auto leading-relaxed"
                      >
                        Our cinematic showreel is being crafted with the same
                        precision we bring to every client project. Stay tuned
                        for the full experience.
                      </motion.p>

                      {/* Animated gold line */}
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "120px" }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mt-6"
                      />
                    </div>

                    {/* Corner accents */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-gold/20 rounded-tl" />
                    <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-gold/20 rounded-tr" />
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-gold/20 rounded-bl" />
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-gold/20 rounded-br" />
                  </div>

                  {/* Bottom progress bar placeholder */}
                  <div className="h-1 bg-sv-elevated">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "35%" }}
                      transition={{ duration: 3, delay: 0.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-gold to-bronze"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
