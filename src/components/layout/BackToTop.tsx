'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  // Spring-animated progress for smooth visual
  const springProgress = useSpring(0, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const strokeDashoffset = useTransform(springProgress, [0, 100], [113.097, 0]);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (scrollTop > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    if (docHeight > 0) {
      const percent = (scrollTop / docHeight) * 100;
      setScrollPercent(Math.min(100, Math.max(0, percent)));
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Update spring target when scrollPercent changes
  useEffect(() => {
    springProgress.set(scrollPercent);
  }, [scrollPercent, springProgress]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Circle dimensions: radius=18, circumference = 2 * PI * 18 ≈ 113.097
  const radius = 18;
  const circumference = 2 * Math.PI * radius;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-4 sm:bottom-20 sm:right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer group"
          aria-label="Back to top"
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Glow effect on hover */}
          <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 gold-glow" />

          {/* Dark background circle */}
          <span className="absolute inset-0 rounded-full bg-sv-bg/90 border border-gold/20 group-hover:border-gold/50 transition-colors duration-300" />

          {/* SVG Progress Ring */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background track */}
            <circle
              cx="24"
              cy="24"
              r={radius}
              stroke="rgba(212,175,55,0.15)"
              strokeWidth="3"
              fill="none"
            />
            {/* Progress arc with gold gradient */}
            <defs>
              <linearGradient id="backToTopGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4AF37" />
                <stop offset="50%" stopColor="#F5D76E" />
                <stop offset="100%" stopColor="#A87842" />
              </linearGradient>
            </defs>
            <motion.circle
              cx="24"
              cy="24"
              r={radius}
              stroke="url(#backToTopGoldGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
              }}
            />
          </svg>

          {/* Arrow icon */}
          <ArrowUp className="w-4 h-4 text-gold relative z-10 group-hover:drop-shadow-[0_0_6px_rgba(212,175,55,0.6)] transition-all duration-300" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
