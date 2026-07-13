"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";

const CONSENT_KEY = "sv-cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    window.dispatchEvent(new Event("sv-consent-change"));
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    window.dispatchEvent(new Event("sv-consent-change"));
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50"
        >
          {/* Gold gradient line at top */}
          <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

          {/* Banner */}
          <div className="glass-strong border-t border-gold/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                {/* Left side - Icon + Text */}
                <div className="flex items-start gap-3 flex-1">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-gold/20 to-bronze/20 border border-gold/20 flex items-center justify-center">
                    <Cookie className="w-5 h-5 text-gold" />
                  </div>
                  <p className="text-sm text-sv-muted leading-relaxed">
                    We use cookies to enhance your experience. By continuing, you
                    agree to our{" "}
                    <a
                      href="#"
                      className="text-gold hover:text-gold-light underline underline-offset-4 transition-colors"
                    >
                      privacy policy
                    </a>
                    .
                  </p>
                </div>

                {/* Right side - Buttons */}
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={handleDecline}
                    className="px-5 py-2.5 rounded-lg border border-gold/30 text-sv-muted text-sm font-medium hover:bg-gold/5 hover:border-gold/50 hover:text-cream transition-all duration-300"
                  >
                    Decline
                  </button>
                  <button
                    onClick={handleAccept}
                    className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-gold via-gold-light to-gold text-sv-bg text-sm font-bold hover:shadow-lg hover:shadow-gold/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
