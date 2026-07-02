"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, MapPin, Clock } from "lucide-react";

interface SocialProofItem {
  name: string;
  city: string;
  action: string;
  timeAgo: string;
}

const socialProofData: SocialProofItem[] = [
  {
    name: "Rajesh",
    city: "New Delhi",
    action: "booked a strategy session",
    timeAgo: "2 minutes ago",
  },
  {
    name: "Priya",
    city: "Mumbai",
    action: "signed up for SEO services",
    timeAgo: "5 minutes ago",
  },
  {
    name: "Amit",
    city: "Bangalore",
    action: "started a free audit",
    timeAgo: "8 minutes ago",
  },
  {
    name: "Neha",
    city: "Hyderabad",
    action: "enquired about Paid Ads",
    timeAgo: "12 minutes ago",
  },
  {
    name: "Vikram",
    city: "Chennai",
    action: "chose the Business Accelerator plan",
    timeAgo: "15 minutes ago",
  },
  {
    name: "Anita",
    city: "Pune",
    action: "requested a branding consultation",
    timeAgo: "18 minutes ago",
  },
  {
    name: "Suresh",
    city: "Jaipur",
    action: "booked a Local SEO session",
    timeAgo: "23 minutes ago",
  },
  {
    name: "Kavita",
    city: "Kolkata",
    action: "started a free audit",
    timeAgo: "28 minutes ago",
  },
];

export default function SocialProofPopup() {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [seenCount, setSeenCount] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  // Check desktop on mount + resize
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth > 768);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    // First popup after 8 seconds
    const initialTimer = setTimeout(() => {
      setVisible(true);
      setSeenCount(1);
    }, 8000);

    return () => clearTimeout(initialTimer);
  }, [isDesktop]);

  useEffect(() => {
    if (!visible || !isDesktop) return;

    // Show popup for 4 seconds, then hide
    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 4000);

    return () => clearTimeout(hideTimer);
  }, [visible, isDesktop]);

  useEffect(() => {
    if (visible || !isDesktop) return;
    if (seenCount >= 5) return;

    // After hiding, wait a random 15-30 seconds before showing next
    const delay = 15000 + Math.random() * 15000;
    const nextTimer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % socialProofData.length);
      setVisible(true);
      setSeenCount((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(nextTimer);
  }, [visible, isDesktop, seenCount]);

  if (!isDesktop || seenCount >= 5) return null;

  const item = socialProofData[currentIndex];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: -120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-24 left-4 z-[55] max-w-[320px] w-full"
        >
          <div className="glass rounded-xl border-l-[3px] border-gold gold-glow p-4 flex items-start gap-3">
            {/* Icon */}
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gold/15 border border-gold/25 flex items-center justify-center">
              <UserPlus className="w-4 h-4 text-gold" />
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <p className="text-cream text-sm leading-snug truncate">
                <span className="font-semibold">{item.name}</span>{" "}
                <span className="text-cream/80">{item.action}</span>
              </p>
              <div className="flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1 text-sv-muted text-xs">
                  <MapPin className="w-3 h-3" />
                  {item.city}
                </span>
                <span className="flex items-center gap-1 text-sv-muted text-xs">
                  <Clock className="w-3 h-3" />
                  {item.timeAgo}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
