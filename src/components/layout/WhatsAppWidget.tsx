"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

export default function WhatsAppWidget() {
  const [visible, setVisible] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTooltipVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Tooltip */}
      <AnimatePresence>
        {tooltipVisible && !visible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="glass rounded-xl p-4 max-w-[250px] relative"
          >
            <button
              onClick={() => setTooltipVisible(false)}
              className="absolute top-2 right-2 text-sv-muted hover:text-cream"
            >
              <X className="w-3 h-3" />
            </button>
            <p className="text-sm text-cream font-medium mb-1">
              Need Help? 💬
            </p>
            <p className="text-xs text-sv-muted">
              Chat with us on WhatsApp for instant support!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat popup */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="glass rounded-2xl p-6 max-w-[300px] w-full"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-bronze flex items-center justify-center font-bold text-sv-bg text-sm">
                  SV
                </div>
                <div>
                  <p className="text-sm font-semibold text-cream">
                    Social Viens
                  </p>
                  <p className="text-xs text-success flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-success" />
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setVisible(false)}
                className="text-sv-muted hover:text-cream"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-sv-bg rounded-xl p-3 mb-4">
              <p className="text-sm text-sv-muted">
                👋 Hello! How can we help you grow your business today?
              </p>
              <p className="text-[10px] text-sv-muted/50 mt-1">Just now</p>
            </div>
            <a
              href="https://wa.me/918178004800?text=Hi%2C%20I%27m%20interested%20in%20your%20digital%20marketing%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-whatsapp text-white font-semibold hover:bg-whatsapp/90 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Start WhatsApp Chat
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.button
        onClick={() => setVisible(!visible)}
        className="w-14 h-14 rounded-full bg-whatsapp text-white flex items-center justify-center shadow-lg shadow-whatsapp/30 whatsapp-pulse hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {visible ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>
    </div>
  );
}
