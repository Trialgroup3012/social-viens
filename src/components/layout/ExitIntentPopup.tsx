"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function ExitIntentPopup() {
  const { toast } = useToast();
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (dismissed) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShow(true);
      }
    };

    // Only show after user has been on page for at least 15 seconds
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 15000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [dismissed]);

  const handleClose = () => {
    setShow(false);
    setDismissed(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !phone) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Exit Intent Lead",
          email,
          phone,
          business: "",
          message: "Requested FREE Digital Marketing Audit from exit intent popup",
          source: "exit-intent-popup",
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        toast({
          title: "🎉 Audit Request Submitted!",
          description: "We'll send your free audit within 24 hours.",
        });
        setTimeout(handleClose, 3000);
      } else {
        toast({
          title: "Something went wrong",
          description: "Please try the contact form instead.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try the contact form instead.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-[90%] max-w-lg"
          >
            <div className="glass-strong rounded-3xl p-8 md:p-10 relative overflow-hidden gold-glow-strong">
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-gold/5 blur-[60px]" />

              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-sv-muted hover:text-cream transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative z-10 text-center">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-success/10 border border-success/30 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-8 h-8 text-success" />
                    </div>
                    <h3 className="text-2xl font-bold text-cream mb-3">
                      You&apos;re All Set! 🎉
                    </h3>
                    <p className="text-sv-muted leading-relaxed">
                      We&apos;ll send your free audit within 24 hours. Check your email!
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold/20 to-bronze/20 border border-gold/20 flex items-center justify-center mx-auto mb-6">
                      <Gift className="w-8 h-8 text-gold" />
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-cream mb-3">
                      Wait! Don&apos;t Leave{" "}
                      <span className="text-gold-gradient">Empty-Handed</span>
                    </h3>
                    <p className="text-sv-muted mb-6 leading-relaxed">
                      Get a{" "}
                      <span className="text-gold font-semibold">
                        FREE Digital Marketing Audit
                      </span>{" "}
                      worth ₹15,000. Discover exactly how to grow your business
                      online.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-3 mb-6">
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-sv-elevated border border-gold/15 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 placeholder:text-sv-muted/40 transition-all duration-300"
                      />
                      <input
                        type="tel"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full bg-sv-elevated border border-gold/15 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 placeholder:text-sv-muted/40 transition-all duration-300"
                      />
                      <Button
                        type="submit"
                        disabled={submitting || !email || !phone}
                        className="w-full bg-gradient-to-r from-gold to-bronze text-sv-bg font-bold py-6 h-auto text-lg hover:shadow-xl hover:shadow-gold/20 transition-all duration-300 group disabled:opacity-70"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            Get My Free Audit
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    </form>

                    <p className="text-xs text-sv-muted/50">
                      No spam. Unsubscribe anytime. We respect your privacy.
                    </p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
