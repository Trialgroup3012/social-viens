"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, ChevronDown, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

const servicesDropdown = [
  { label: "Website Design", href: "/services/website-design", desc: "Conversion-focused websites" },
  { label: "SEO Services", href: "/services/seo-services", desc: "Rank higher on Google" },
  { label: "Local SEO", href: "/services/local-seo", desc: "Dominate local search" },
  { label: "Google Business Profile", href: "/services/google-business-profile", desc: "Optimize your GMB" },
  { label: "Paid Ads / PPC", href: "/services/paid-ads-ppc", desc: "Maximize ad ROI" },
  { label: "Social Media", href: "/services/social-media", desc: "Grow your audience" },
  { label: "Branding", href: "/services/branding", desc: "Memorable brand identity" },
  { label: "Automation", href: "/services/automation", desc: "Streamline marketing" },
  { label: "Lead Generation", href: "/services/lead-generation", desc: "Quality leads on autopilot" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close all menus (used by link onClick handlers on navigation)
  const closeMenus = useCallback(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, []);

  const isActive = useCallback(
    (href: string) => {
      if (href === "/") return pathname === "/";
      // Services root + sub-routes both highlight "Services"
      if (href === "/services") return pathname === "/services" || pathname.startsWith("/services/");
      return pathname === href || pathname.startsWith(href + "/");
    },
    [pathname]
  );

  return (
    <>
      {/* Main navbar */}
      <motion.nav
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "top-0" : "top-0 sm:top-9"
        } ${
          scrolled
            ? "glass-strong shadow-lg shadow-black/20 border-b border-gold/10"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group min-w-0 flex-shrink-0">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-lg overflow-hidden flex items-center justify-center bg-gradient-to-br from-gold/20 to-bronze/20 border border-gold/20 group-hover:border-gold/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-gold/20 flex-shrink-0">
              <Image
                src="/social-viens-logo.png"
                alt="Social Viens Logo"
                fill
                sizes="44px"
                className="object-contain p-1 group-hover:scale-110 transition-transform duration-500"
                priority
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-base sm:text-lg font-bold tracking-wider text-cream group-hover:text-gold transition-colors duration-300 truncate">SOCIAL VIENS</span>
              <span className="hidden min-[400px]:block text-[10px] tracking-[0.3em] text-sv-muted uppercase">Digital Growth Partners</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              if (link.hasDropdown) {
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMenus}
                      className={`px-4 py-2 text-sm relative group transition-colors duration-300 flex items-center gap-1 ${
                        active ? "text-gold" : "text-sv-muted hover:text-gold"
                      }`}
                    >
                      {link.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`} />
                      <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gold transition-all duration-300 ${active || servicesOpen ? "w-3/4" : "w-0 group-hover:w-3/4"}`} />
                    </Link>

                    {/* Services Dropdown */}
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[480px]"
                        >
                          <div className="glass-strong rounded-2xl border border-gold/15 shadow-2xl shadow-black/40 p-3">
                            <div className="px-3 py-2 mb-1 border-b border-border/60">
                              <p className="text-xs tracking-[0.25em] uppercase text-gold font-semibold">All Services</p>
                              <p className="text-xs text-sv-muted mt-0.5">End-to-end digital growth solutions</p>
                            </div>
                            <div className="grid grid-cols-2 gap-1">
                              {servicesDropdown.map((svc) => {
                                const svcActive = pathname === svc.href;
                                return (
                                  <Link
                                    key={svc.href}
                                    href={svc.href}
                                    onClick={closeMenus}
                                    className="group flex flex-col gap-0.5 px-3 py-2.5 rounded-lg hover:bg-gold/10 transition-colors"
                                  >
                                    <span className={`text-sm font-medium flex items-center gap-1.5 ${svcActive ? "text-gold" : "text-cream group-hover:text-gold"}`}>
                                      {svc.label}
                                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                    </span>
                                    <span className="text-xs text-sv-muted">{svc.desc}</span>
                                  </Link>
                                );
                              })}
                            </div>
                            <Link
                              href="/services"
                              onClick={closeMenus}
                              className="mt-2 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-gradient-to-r from-gold/10 to-bronze/10 border border-gold/20 text-gold text-sm font-medium hover:from-gold/20 hover:to-bronze/20 transition-colors"
                            >
                              View All Services <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenus}
                  className={`px-4 py-2 text-sm relative group transition-colors duration-300 ${
                    active ? "text-gold" : "text-sv-muted hover:text-gold"
                  }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gold transition-all duration-300 ${active ? "w-3/4" : "w-0 group-hover:w-3/4"}`} />
                  {active && (
                    <motion.span
                      layoutId="activeNavDot"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              asChild
              className="bg-gradient-to-r from-gold to-bronze text-sv-bg font-semibold hover:shadow-lg hover:shadow-gold/20 transition-all duration-300 px-6"
            >
              <Link href="/contact">Get Free Strategy Session</Link>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-cream p-2.5 -mr-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-gold/5 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden glass-strong border-t border-border overflow-hidden max-h-[85vh] overflow-y-auto scrollbar-thin"
              style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
            >
              <div className="px-4 sm:px-6 pt-4 pb-6 flex flex-col gap-1">
                {/* Mobile menu header with close button */}
                <div className="flex items-center justify-between mb-2 pb-3 border-b border-gold/10 sm:hidden">
                  <span className="text-sm font-semibold text-gold tracking-wider uppercase">Menu</span>
                  <button
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close menu"
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-sv-muted hover:text-cream hover:bg-gold/5 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  if (link.hasDropdown) {
                    return (
                      <div key={link.href}>
                        <button
                          onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                          className={`w-full flex items-center justify-between min-h-[48px] py-3 px-3 rounded-lg text-base font-medium transition-all duration-200 ${
                            active ? "text-gold bg-gold/10" : "text-cream hover:text-gold hover:bg-gold/5"
                          }`}
                          aria-expanded={mobileServicesOpen}
                        >
                          {link.label}
                          <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                          {mobileServicesOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden ml-3 pl-3 border-l border-gold/20 mt-1 mb-2"
                            >
                              {servicesDropdown.map((svc) => (
                                <Link
                                  key={svc.href}
                                  href={svc.href}
                                  onClick={closeMenus}
                                  className="block min-h-[44px] py-2.5 px-3 text-sm text-sv-muted hover:text-gold transition-colors flex items-center"
                                >
                                  {svc.label}
                                </Link>
                              ))}
                              <Link href="/services" onClick={closeMenus} className="block min-h-[44px] py-2.5 px-3 text-sm text-gold font-medium flex items-center">
                                View All Services →
                              </Link>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenus}
                      className={`flex items-center gap-3 min-h-[48px] py-3 px-3 rounded-lg text-base font-medium transition-all duration-200 ${
                        active ? "text-gold bg-gold/10" : "text-cream hover:text-gold hover:bg-gold/5"
                      }`}
                    >
                      {link.label}
                      {active && <span className="w-1.5 h-1.5 rounded-full bg-gold ml-auto" />}
                    </Link>
                  );
                })}
                <div className="pt-4 border-t border-border mt-3">
                  <Button asChild className="w-full min-h-[48px] h-12 bg-gradient-to-r from-gold to-bronze text-sv-bg font-semibold text-base">
                    <Link href="/contact">Get Free Strategy Session</Link>
                  </Button>
                </div>
                <div className="flex flex-col gap-2 pt-3 text-sm text-sv-muted">
                  <a href="tel:+918178004800" className="flex items-center gap-2 min-h-[44px] py-2 hover:text-gold transition-colors">
                    <Phone className="w-4 h-4" /> +91 81780 04800
                  </a>
                  <a href="mailto:socialviens@gmail.com" className="flex items-center gap-2 min-h-[44px] py-2 hover:text-gold transition-colors">
                    <Mail className="w-4 h-4" /> socialviens@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
