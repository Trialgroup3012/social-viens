"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface PreloaderProps {
  children: React.ReactNode;
}

export default function Preloader({ children }: PreloaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const handleComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Snappy premium loader — progress completes in ~0.5s, total fade ~1s perceived
    const duration = 500; // Progress bar animation (ms)
    const interval = 16; // ~60fps
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;

      // Eased progress: fast start, smooth finish (snappy, premium feel)
      const t = currentStep / steps;
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic

      setProgress(Math.min(Math.round(eased * 100), 100));

      if (currentStep >= steps) {
        clearInterval(timer);
        // Very brief hold at 100% then trigger fade-out
        setTimeout(handleComplete, 60);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [handleComplete]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.25,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-sv-bg"
          >
            {/* Subtle radial glow behind logo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-[400px] h-[400px] rounded-full opacity-20"
                style={{
                  background: "radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)",
                }}
              />
            </div>

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative mb-8"
            >
              {/* Outer ring with gold gradient */}
              <motion.div
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.05,
                }}
                className="w-28 h-28 rounded-full border-2 flex items-center justify-center relative"
                style={{
                  borderColor: "rgba(212, 175, 55, 0.3)",
                }}
              >
                {/* Animated ring stroke */}
                <svg
                  className="absolute inset-0 w-full h-full -rotate-90"
                  viewBox="0 0 112 112"
                >
                  <motion.circle
                    cx="56"
                    cy="56"
                    r="54"
                    fill="none"
                    stroke="url(#goldGradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 0.7,
                      ease: [0.4, 0, 0.2, 1],
                      delay: 0.1,
                    }}
                  />
                  <defs>
                    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#D4AF37" />
                      <stop offset="50%" stopColor="#F5D680" />
                      <stop offset="100%" stopColor="#A87842" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Actual logo image */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="relative w-16 h-16"
                >
                  <Image
                    src="/social-viens-logo.png"
                    alt="Social Viens Logo"
                    fill
                    sizes="64px"
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 text-center"
            >
              <h2
                className="text-lg font-light tracking-[0.35em] uppercase mb-1"
                style={{
                  background: "linear-gradient(135deg, #D4AF37 0%, #F5D680 50%, #D4AF37 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Social Viens
              </h2>
              <p className="text-[11px] tracking-[0.5em] uppercase text-sv-muted font-light">
                Digital Excellence
              </p>
            </motion.div>

            {/* Progress bar container */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-44 relative"
            >
              {/* Track */}
              <div className="h-[2px] w-full rounded-full bg-sv-elevated overflow-hidden">
                {/* Fill */}
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #D4AF37, #F5D680, #A87842)",
                    backgroundSize: "200% 100%",
                    animation: "gradientShift 2s ease infinite",
                  }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>

              {/* Progress percentage */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 0.2, delay: 0.25 }}
                className="text-[10px] tracking-[0.3em] uppercase text-sv-muted text-center mt-3 font-light"
              >
                {progress}%
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content - hidden during load, then revealed */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{
          duration: 0.25,
          delay: isLoading ? 0 : 0.03,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
