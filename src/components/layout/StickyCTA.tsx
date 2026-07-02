"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X, Phone } from "lucide-react";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const show = visible && !dismissed;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-40 glass-strong border-t border-gold/10"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-3">
            {/* Mobile: compact bar — dismiss on left, CTA fills remaining space,
                leaving room (~80px) on the right for the WhatsApp widget */}
            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss"
              className="sm:hidden min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-sv-muted hover:text-cream hover:bg-gold/10 transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
            <a
              href="#contact-form"
              className="sm:hidden flex items-center justify-center gap-2 flex-1 min-h-[44px] mr-20 px-4 rounded-lg bg-gradient-to-r from-gold to-bronze text-sv-bg font-semibold text-sm hover:shadow-lg hover:shadow-gold/20 transition-all duration-300"
            >
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">Free Strategy Session</span>
            </a>

            {/* Desktop: full layout */}
            <div className="hidden sm:flex items-center gap-3">
              <span className="text-sm text-sv-muted">
                Ready to grow your business?
              </span>
              <div className="flex items-center gap-1 text-xs text-gold">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                Limited slots available
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-3 ml-auto mr-20 lg:mr-0">
              <button
                onClick={() => setDismissed(true)}
                aria-label="Dismiss"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-sv-muted hover:text-cream hover:bg-gold/10 transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
              <a
                href="#contact-form"
                className="flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-lg bg-gradient-to-r from-gold to-bronze text-sv-bg font-semibold text-sm hover:shadow-lg hover:shadow-gold/20 transition-all duration-300"
              >
                <Calendar className="w-4 h-4" />
                Book Free Consultation
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
