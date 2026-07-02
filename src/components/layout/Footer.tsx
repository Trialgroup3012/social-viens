"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useMounted } from "@/hooks/use-mounted";
import {
  ArrowUpRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Loader2,
  CheckCircle2,
  Heart,
  Award,
  Users,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

const footerLinks = {
  services: [
    "Website Development",
    "SEO Services",
    "Local SEO",
    "Google Business Profile",
    "Paid Advertising",
    "Social Media Marketing",
    "Branding & Design",
    "Marketing Automation",
    "Lead Generation",
  ],
  industries: [
    "Real Estate",
    "Healthcare",
    "Law Firms",
    "Education",
    "Beauty & Salon",
    "Restaurants",
    "E-Commerce",
    "Startups",
  ],
};

const achievements = [
  { icon: Users, value: "100+", label: "Clients Served" },
  { icon: TrendingUp, value: "200%", label: "Avg ROI" },
  { icon: Award, value: "4.9/5", label: "Client Rating" },
  { icon: Clock, value: "24hr", label: "Response Time" },
];

export default function Footer() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  // Fix hydration mismatch — render year only after mount
  const mounted = useMounted();
  const year = mounted ? new Date().getFullYear() : 2025;

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribing(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "newsletter-footer",
        }),
      });

      if (res.ok) {
        setSubscribed(true);
        toast({
          title: "🎉 Subscribed!",
          description: "You'll receive our latest growth insights.",
        });
      } else {
        toast({
          title: "Something went wrong",
          description: "Please try again.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <footer className="relative border-t border-gold/10 bg-sv-bg overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 pattern-grid opacity-30 pointer-events-none" />

      {/* Gold gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 relative z-10">
        {/* Achievements bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-12 pb-10 sm:pb-12 border-b border-gold/10"
        >
          {achievements.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-gold/10 to-bronze/10 border border-gold/15 mb-2 group-hover:border-gold/30 transition-colors duration-300">
                <item.icon className="w-5 h-5 text-gold" />
              </div>
              <div className="text-xl font-bold text-gold-gradient">{item.value}</div>
              <div className="text-xs text-sv-muted">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-gold/20 to-bronze/20 border border-gold/20 shadow-lg shadow-gold/10">
                <Image
                  src="/social-viens-logo.png"
                  alt="Social Viens Logo"
                  fill
                  sizes="56px"
                  className="object-contain p-1"
                />
              </div>
              <div>
                <span className="text-xl font-bold tracking-wider text-cream">
                  SOCIAL VIENS
                </span>
                <p className="text-[10px] tracking-[0.3em] text-gold/70 uppercase">
                  Digital Growth Partners
                </p>
              </div>
            </div>
            <p className="text-sv-muted leading-relaxed mb-6 max-w-md">
              India&apos;s premium digital marketing agency helping ambitious
              businesses dominate search engines, generate quality leads, and
              scale revenue through AI-powered strategies.
            </p>
            <div className="space-y-3 text-sm text-sv-muted">
              <a
                href="tel:+918178004800"
                className="flex items-center gap-2.5 hover:text-gold transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-sv-elevated border border-gold/10 flex items-center justify-center group-hover:border-gold/30 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-gold" />
                </div>
                +91 81780 04800
              </a>
              <a
                href="mailto:socialviens@gmail.com"
                className="flex items-center gap-2.5 hover:text-gold transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-sv-elevated border border-gold/10 flex items-center justify-center group-hover:border-gold/30 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-gold" />
                </div>
                socialviens@gmail.com
              </a>
              <span className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sv-elevated border border-gold/10 flex items-center justify-center">
                  <MapPin className="w-3.5 h-3.5 text-gold" />
                </div>
                New Delhi, India
              </span>
              <span className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sv-elevated border border-gold/10 flex items-center justify-center">
                  <Clock className="w-3.5 h-3.5 text-gold" />
                </div>
                Mon–Sat: 10AM–7PM IST
              </span>
            </div>

            {/* Social links */}
            <div className="mt-6 pt-6 border-t border-gold/10">
              <p className="text-sv-muted text-xs mb-3 uppercase tracking-wider">
                Follow Us
              </p>
              <div className="flex items-center justify-start sm:justify-start gap-3 flex-wrap">
                {[
                  {
                    name: "LinkedIn",
                    href: "#",
                    icon: (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    ),
                  },
                  {
                    name: "Twitter",
                    href: "#",
                    icon: (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    ),
                  },
                  {
                    name: "Instagram",
                    href: "#",
                    icon: (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    ),
                  },
                  {
                    name: "YouTube",
                    href: "#",
                    icon: (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    ),
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    className="w-11 h-11 rounded-xl bg-sv-elevated border border-gold/10 flex items-center justify-center text-sv-muted hover:text-gold hover:border-gold/30 hover:shadow-md hover:shadow-gold/10 transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-cream font-semibold mb-5 text-sm tracking-wider uppercase flex items-center gap-2">
              <span className="w-6 h-[2px] bg-gradient-to-r from-gold to-transparent" />
              Services
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link}>
                  <a
                    href="#services"
                    className="text-sv-muted text-sm hover:text-gold transition-colors flex items-center gap-1 group animated-underline"
                  >
                    {link}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="text-cream font-semibold mb-5 text-sm tracking-wider uppercase flex items-center gap-2">
              <span className="w-6 h-[2px] bg-gradient-to-r from-gold to-transparent" />
              Industries
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.industries.map((link) => (
                <li key={link}>
                  <a
                    href="#industries"
                    className="text-sv-muted text-sm hover:text-gold transition-colors flex items-center gap-1 group animated-underline"
                  >
                    {link}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-cream font-semibold mb-5 text-sm tracking-wider uppercase flex items-center gap-2">
              <span className="w-6 h-[2px] bg-gradient-to-r from-gold to-transparent" />
              Growth Insights
            </h4>
            <p className="text-sv-muted text-sm mb-4 leading-relaxed">
              Get weekly digital marketing tips, industry trends, and growth
              strategies delivered to your inbox.
            </p>
            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-xl px-4 py-3 flex items-center gap-2 text-success text-sm border border-success/20"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>You&apos;re subscribed!</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 sm:relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                    className="w-full bg-sv-elevated border border-gold/15 rounded-xl px-4 py-3 sm:pr-12 text-cream text-sm focus:outline-none focus:border-gold/40 focus:ring-2 focus:ring-gold/10 placeholder:text-sv-muted/40 transition-all duration-300 premium-input-glow min-h-[48px]"
                  />
                  <Button
                    type="submit"
                    disabled={subscribing || !email}
                    className="sm:absolute sm:right-1.5 sm:top-1/2 sm:-translate-y-1/2 w-full sm:w-8 sm:h-8 sm:p-0 h-11 bg-gradient-to-r from-gold to-bronze text-sv-bg rounded-lg hover:shadow-md hover:shadow-gold/20 disabled:opacity-50 transition-all flex items-center justify-center"
                  >
                    {subscribing ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span className="sm:hidden flex items-center gap-2 font-semibold text-sm">
                          Subscribe <Send className="w-4 h-4" />
                        </span>
                        <Send className="w-3.5 h-3.5 hidden sm:block" />
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-[11px] text-sv-muted/50">
                  Join 2,000+ marketers. No spam, unsubscribe anytime.
                </p>
              </form>
            )}

            {/* Certifications */}
            <div className="mt-6 pt-6 border-t border-gold/10">
              <p className="text-sv-muted text-xs mb-3 uppercase tracking-wider">
                Certifications
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 rounded-md bg-sv-elevated border border-gold/10 text-[10px] text-gold/70 font-medium">Google Partner</span>
                <span className="px-2.5 py-1 rounded-md bg-sv-elevated border border-gold/10 text-[10px] text-gold/70 font-medium">Meta Partner</span>
                <span className="px-2.5 py-1 rounded-md bg-sv-elevated border border-gold/10 text-[10px] text-gold/70 font-medium">HubSpot</span>
                <span className="px-2.5 py-1 rounded-md bg-sv-elevated border border-gold/10 text-[10px] text-gold/70 font-medium">Semrush</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="section-divider mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 text-sm text-sv-muted text-center md:text-left"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <p>
            © {year} Social Viens. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a href="#" className="hover:text-gold transition-colors animated-underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gold transition-colors animated-underline">
              Terms of Service
            </a>
            <a href="#" className="hover:text-gold transition-colors animated-underline">
              Sitemap
            </a>
            <p className="flex items-center gap-1.5">
              Crafted with <Heart className="w-3 h-3 text-gold fill-gold" /> in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
