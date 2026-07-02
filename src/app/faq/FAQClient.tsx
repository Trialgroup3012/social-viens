"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Phone,
  Mail,
  MessageCircle,
  ChevronRight,
  Sparkles,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  faqCategories,
  faqContactOptions,
  type FAQCategoryName,
} from "@/lib/faq-data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Phone,
  Mail,
  MessageCircle,
};

const categoryColors: Record<
  FAQCategoryName,
  { bg: string; text: string; border: string; dot: string }
> = {
  Services: {
    bg: "bg-emerald-500/15",
    text: "text-emerald-400",
    border: "border-emerald-500/20",
    dot: "bg-emerald-400",
  },
  Pricing: {
    bg: "bg-amber-500/15",
    text: "text-amber-400",
    border: "border-amber-500/20",
    dot: "bg-amber-400",
  },
  Process: {
    bg: "bg-sky-500/15",
    text: "text-sky-400",
    border: "border-sky-500/20",
    dot: "bg-sky-400",
  },
  Support: {
    bg: "bg-rose-500/15",
    text: "text-rose-400",
    border: "border-rose-500/20",
    dot: "bg-rose-400",
  },
};

export default function FAQClient() {
  const [activeCategory, setActiveCategory] = useState<FAQCategoryName | "All">(
    "All",
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Filter categories + items based on search + active category.
  const filteredCategories = useMemo(() => {
    let cats = faqCategories;
    if (activeCategory !== "All") {
      cats = cats.filter((c) => c.name === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      cats = cats
        .map((c) => ({
          ...c,
          items: c.items.filter(
            (item) =>
              item.question.toLowerCase().includes(q) ||
              item.answer.toLowerCase().includes(q),
          ),
        }))
        .filter((c) => c.items.length > 0);
    }
    return cats;
  }, [activeCategory, searchQuery]);

  const totalQuestions = filteredCategories.reduce(
    (acc, c) => acc + c.items.length,
    0,
  );

  // Build a flat list of accordion values for the visible items.
  // Format: `${category}-${itemId}`
  const allValues = filteredCategories.flatMap((c) =>
    c.items.map((item) => `${c.name}-${item.id}`),
  );

  return (
    <PageShell breadcrumbs={[{ label: "FAQ" }]}>
      {/* ===== Hero ===== */}
      <section className="relative pt-12 md:pt-16 pb-12 overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-gold/10 rounded-full blur-[120px] animate-float pointer-events-none" />
        <div
          className="absolute top-20 right-1/4 w-72 h-72 bg-bronze/10 rounded-full blur-[110px] animate-float pointer-events-none"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-64 h-64 bg-sky-500/[0.05] rounded-full blur-[100px] animate-float pointer-events-none"
          style={{ animationDelay: "4s" }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-medium tracking-[0.25em] uppercase mb-6"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Help Center
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-cream">Frequently Asked</span>{" "}
              <span className="text-gold-gradient">Questions</span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-sv-muted text-lg md:text-xl leading-relaxed"
            >
              Everything you need to know about working with Social Viens.
              Can&apos;t find your answer?{" "}
              <Link
                href="/contact"
                className="text-gold hover:text-gold-light underline underline-offset-4 transition-colors"
              >
                Ask us directly
              </Link>
              .
            </motion.p>
          </motion.div>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="max-w-2xl mx-auto mt-10"
          >
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-sv-muted pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions..."
                className="w-full pl-14 pr-5 py-4 rounded-full glass-strong border border-gold/15 text-cream placeholder:text-sv-muted/60 focus:outline-none focus:border-gold/40 focus:ring-2 focus:ring-gold/15 transition-all text-sm md:text-base"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-sv-muted hover:text-gold transition-colors text-sm"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="hero-gradient-line max-w-md mx-auto mt-10"
          />
        </div>
      </section>

      {/* ===== Main content: sidebar + accordion ===== */}
      <section className="relative pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-12">
            {/* Sidebar (desktop vertical, mobile horizontal scroll) */}
            <aside>
              <div className="lg:sticky lg:top-28">
                <p className="hidden lg:block text-xs tracking-[0.2em] text-gold/70 uppercase mb-4 px-2">
                  Categories
                </p>

                {/* Desktop vertical sidebar */}
                <div className="hidden lg:flex flex-col gap-1.5">
                  <button
                    onClick={() => setActiveCategory("All")}
                    className={`
                      text-left px-4 py-3 rounded-xl text-sm font-medium
                      transition-all duration-300 cursor-pointer border
                      ${
                        activeCategory === "All"
                          ? "bg-gold/15 text-gold border-gold/20 shadow-lg"
                          : "bg-sv-surface/40 text-sv-muted border-transparent hover:border-gold/10 hover:text-cream"
                      }
                    `}
                  >
                    <span className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-gold" />
                        All Questions
                      </span>
                      <span className="text-xs opacity-60">
                        {faqCategories.reduce(
                          (acc, c) => acc + c.items.length,
                          0,
                        )}
                      </span>
                    </span>
                  </button>
                  {faqCategories.map((cat) => {
                    const color = categoryColors[cat.name];
                    const isActive = activeCategory === cat.name;
                    return (
                      <button
                        key={cat.name}
                        onClick={() => setActiveCategory(cat.name)}
                        className={`
                          text-left px-4 py-3 rounded-xl text-sm font-medium
                          transition-all duration-300 cursor-pointer border
                          ${
                            isActive
                              ? `${color.bg} ${color.text} ${color.border} shadow-lg`
                              : "bg-sv-surface/40 text-sv-muted border-transparent hover:border-gold/10 hover:text-cream"
                          }
                        `}
                      >
                        <span className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full ${color.dot}`}
                            />
                            {cat.label}
                          </span>
                          <span className="text-xs opacity-60">
                            {cat.items.length}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Mobile horizontal scroll pills */}
                <div className="lg:hidden flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-1 px-1">
                  <button
                    onClick={() => setActiveCategory("All")}
                    className={`
                      shrink-0 px-4 py-2 rounded-full text-xs font-medium
                      transition-all duration-300 cursor-pointer border
                      ${
                        activeCategory === "All"
                          ? "bg-gold/15 text-gold border-gold/20 shadow-lg"
                          : "bg-sv-surface/40 text-sv-muted border-transparent hover:border-gold/10 hover:text-cream"
                      }
                    `}
                  >
                    All
                  </button>
                  {faqCategories.map((cat) => {
                    const color = categoryColors[cat.name];
                    const isActive = activeCategory === cat.name;
                    return (
                      <button
                        key={cat.name}
                        onClick={() => setActiveCategory(cat.name)}
                        className={`
                          shrink-0 px-4 py-2 rounded-full text-xs font-medium
                          transition-all duration-300 cursor-pointer border
                          ${
                            isActive
                              ? `${color.bg} ${color.text} ${color.border} shadow-lg`
                              : "bg-sv-surface/40 text-sv-muted border-transparent hover:border-gold/10 hover:text-cream"
                          }
                        `}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>

                {/* Desktop-only CTA card */}
                <div className="hidden lg:block glass-strong rounded-2xl p-5 mt-6 border border-gold/15 gold-glow">
                  <Sparkles className="w-5 h-5 text-gold mb-2" />
                  <h4 className="text-cream font-bold text-sm mb-2">
                    Still have questions?
                  </h4>
                  <p className="text-xs text-sv-muted leading-relaxed mb-3">
                    Our team typically responds in under 2 hours during business
                    hours.
                  </p>
                  <Link
                    href="/contact"
                    className="text-xs text-gold hover:text-gold-light flex items-center gap-1.5 font-medium"
                  >
                    Get in touch
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </aside>

            {/* Accordion */}
            <div>
              {/* Result count */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-sv-muted">
                  Showing{" "}
                  <span className="text-gold font-semibold">
                    {totalQuestions}
                  </span>{" "}
                  {totalQuestions === 1 ? "question" : "questions"}
                  {activeCategory !== "All" && ` in ${activeCategory}`}
                </p>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeCategory}-${searchQuery}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  {filteredCategories.length === 0 ? (
                    <div className="text-center py-20 glass rounded-2xl border border-gold/10">
                      <Search className="w-12 h-12 text-sv-muted/30 mx-auto mb-4" />
                      <p className="text-sv-muted text-lg mb-2">
                        No questions found
                        {searchQuery && ` for &quot;${searchQuery}&quot;`}
                        {activeCategory !== "All" &&
                          !searchQuery &&
                          ` in ${activeCategory}`}
                        .
                      </p>
                      <p className="text-sv-muted/70 text-sm mb-6">
                        Try a different search or category.
                      </p>
                      <button
                        onClick={() => {
                          setSearchQuery("");
                          setActiveCategory("All");
                        }}
                        className="text-gold hover:text-gold-light underline underline-offset-4 text-sm cursor-pointer"
                      >
                        Reset filters
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-10">
                      {filteredCategories.map((cat) => {
                        const color = categoryColors[cat.name];
                        return (
                          <div key={cat.name}>
                            {/* Category header */}
                            <div className="flex items-center gap-3 mb-5">
                              <div
                                className={`w-10 h-10 rounded-xl ${color.bg} ${color.border} border flex items-center justify-center`}
                              >
                                <span
                                  className={`w-2.5 h-2.5 rounded-full ${color.dot}`}
                                />
                              </div>
                              <div>
                                <h2 className="text-xl md:text-2xl font-bold text-cream">
                                  {cat.name}
                                </h2>
                                <p className="text-xs text-sv-muted">
                                  {cat.description}
                                </p>
                              </div>
                            </div>

                            {/* Accordion items */}
                            <Accordion
                              type="single"
                              collapsible
                              className="space-y-3"
                            >
                              {cat.items.map((item, idx) => (
                                <AccordionItem
                                  key={item.id}
                                  value={`${cat.name}-${item.id}`}
                                  className="glass rounded-xl border-0 px-5 md:px-6 data-[state=open]:gold-glow data-[state=open]:border-gold/20 transition-all duration-300 group"
                                >
                                  <AccordionTrigger className="text-left text-cream hover:text-gold hover:no-underline py-5 text-base md:text-lg font-medium group-data-[state=open]:text-gold transition-colors duration-300">
                                    <span className="flex items-start gap-3">
                                      <span
                                        className={`w-7 h-7 shrink-0 rounded-lg ${color.bg} border ${color.border} flex items-center justify-center ${color.text} text-xs font-bold mt-0.5 group-data-[state=open]:bg-gold/20 group-data-[state=open]:border-gold/30 transition-all duration-300`}
                                      >
                                        {String(idx + 1).padStart(2, "0")}
                                      </span>
                                      <span className="flex-1">
                                        {item.question}
                                      </span>
                                    </span>
                                  </AccordionTrigger>
                                  <AccordionContent className="text-sv-muted leading-relaxed pb-5 pl-10 md:pl-[2.75rem]">
                                    {item.answer}
                                  </AccordionContent>
                                </AccordionItem>
                              ))}
                            </Accordion>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Hidden span to keep allValues referenced (used for debugging / future "expand all" feature) */}
              <span className="sr-only">{allValues.length} total</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Still have questions CTA ===== */}
      <section className="relative pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-3xl"
          >
            <div className="glass-strong gold-glow-strong rounded-3xl p-8 md:p-12 relative">
              <div className="absolute top-0 right-0 w-72 h-72 bg-gold/10 rounded-full blur-[100px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <Sparkles className="w-8 h-8 text-gold mx-auto mb-3" />
                  <h2 className="text-3xl md:text-4xl font-bold text-cream mb-3">
                    Still have{" "}
                    <span className="text-gold-gradient">questions?</span>
                  </h2>
                  <p className="text-sv-muted text-lg max-w-xl mx-auto">
                    Our team is ready to help. Reach out — we typically respond
                    in under 2 hours during business hours.
                  </p>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-gold to-bronze text-sv-bg font-bold text-sm hover:shadow-lg hover:shadow-gold/20 hover:scale-[1.02] transition-all duration-300"
                  >
                    Get in Touch
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="https://wa.me/918178004800?text=Hi%20Social%20Viens%2C%20I%20have%20a%20question"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full glass border border-emerald-500/30 text-emerald-400 font-semibold text-sm hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-all duration-300"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp Us
                  </a>
                </div>

                {/* Quick contact options */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-8 border-t border-gold/10">
                  {faqContactOptions.map((opt) => {
                    const Icon =
                      iconMap[opt.icon] ?? HelpCircle;
                    return (
                      <a
                        key={opt.label}
                        href={opt.href}
                        target={
                          opt.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          opt.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="flex items-center gap-3 p-4 rounded-xl bg-sv-surface/40 border border-gold/10 hover:border-gold/30 hover:bg-sv-surface/60 transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/15 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                          <Icon className="w-4 h-4 text-gold" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-sv-muted uppercase tracking-wider mb-0.5">
                            {opt.label}
                          </p>
                          <p className="text-sm text-cream font-medium truncate">
                            {opt.value}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageShell>
  );
}
