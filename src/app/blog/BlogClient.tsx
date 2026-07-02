"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Clock,
  Search,
  TrendingUp,
  Share2,
  Palette,
  BarChart3,
  Globe,
  Target,
  Sparkles,
  Mail,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import AnimatedHeading from "@/components/ui/animated-heading";
import {
  blogPosts,
  type BlogCategory,
  formatDate,
} from "@/lib/blog-data";

const categories: (BlogCategory | "All")[] = [
  "All",
  "SEO",
  "Social Media",
  "Branding",
  "Web Design",
  "Paid Ads",
];

// Map category -> color theme for badges + gradient headers.
function getCategoryConfig(category: string) {
  switch (category) {
    case "SEO":
      return {
        bg: "bg-emerald-500/15",
        text: "text-emerald-400",
        border: "border-emerald-500/20",
        gradient: "from-emerald-900/40 to-emerald-700/20",
        dot: "bg-emerald-400",
        Icon: Search,
      };
    case "Social Media":
      return {
        bg: "bg-teal-500/15",
        text: "text-teal-400",
        border: "border-teal-500/20",
        gradient: "from-teal-900/40 to-teal-700/20",
        dot: "bg-teal-400",
        Icon: Share2,
      };
    case "Branding":
      return {
        bg: "bg-rose-500/15",
        text: "text-rose-400",
        border: "border-rose-500/20",
        gradient: "from-rose-900/40 to-rose-700/20",
        dot: "bg-rose-400",
        Icon: Palette,
      };
    case "Web Design":
      return {
        bg: "bg-amber-500/15",
        text: "text-amber-400",
        border: "border-amber-500/20",
        gradient: "from-amber-900/40 to-amber-700/20",
        dot: "bg-amber-400",
        Icon: Globe,
      };
    case "Paid Ads":
      return {
        bg: "bg-gold/15",
        text: "text-gold",
        border: "border-gold/20",
        gradient: "from-gold/20 to-bronze/10",
        dot: "bg-gold",
        Icon: Target,
      };
    default:
      return {
        bg: "bg-gold/15",
        text: "text-gold",
        border: "border-gold/20",
        gradient: "from-gold/20 to-bronze/10",
        dot: "bg-gold",
        Icon: BarChart3,
      };
  }
}

// Newsletter subscription form.
function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "blog-newsletter-cta" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
        return;
      }
      setStatus("success");
      setMessage("You're subscribed! Check your inbox for a welcome email.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative mt-24 overflow-hidden rounded-3xl"
    >
      <div className="glass-strong gold-glow-strong rounded-3xl p-8 md:p-12 lg:p-16 relative">
        {/* Decorative orbs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-gold/10 rounded-full blur-[100px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-bronze/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-medium tracking-[0.2em] uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Growth Newsletter
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-cream">Get growth insights</span>{" "}
            <span className="text-gold-gradient">in your inbox</span>
          </h2>
          <p className="text-sv-muted mb-8 leading-relaxed">
            Join 2,000+ founders and marketers getting our weekly playbook on
            SEO, paid ads, branding, and conversion optimisation. No fluff, just
            tactics you can apply today.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-sv-muted pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={status === "loading" || status === "success"}
                className="w-full pl-11 pr-4 py-3.5 rounded-full glass border border-gold/15 text-cream placeholder:text-sv-muted/60 focus:outline-none focus:border-gold/40 focus:ring-2 focus:ring-gold/15 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="shimmer-sweep inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-gold to-bronze text-sv-bg font-semibold text-sm hover:shadow-lg hover:shadow-gold/20 hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {status === "loading" && (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}
              {status === "success" && (
                <CheckCircle2 className="w-4 h-4" />
              )}
              {status === "loading"
                ? "Subscribing..."
                : status === "success"
                  ? "Subscribed!"
                  : "Subscribe Free"}
            </button>
          </form>

          <AnimatePresence>
            {message && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className={`mt-4 text-sm ${
                  status === "success" ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {message}
              </motion.p>
            )}
          </AnimatePresence>

          <p className="text-xs text-sv-muted/60 mt-4">
            Unsubscribe anytime. We never share your email.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function BlogClient() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "All">(
    "All",
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    let posts = blogPosts;
    if (activeCategory !== "All") {
      posts = posts.filter((p) => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    return posts;
  }, [activeCategory, searchQuery]);

  const featuredPost = filteredPosts.find((p) => p.featured);
  const regularPosts = filteredPosts.filter((p) => !p.featured);

  return (
    <PageShell breadcrumbs={[{ label: "Blog" }]}>
      {/* ===== Hero ===== */}
      <section className="relative pt-12 md:pt-16 pb-12 md:pb-20 overflow-hidden">
        {/* Floating gradient orbs */}
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-gold/10 rounded-full blur-[120px] animate-float pointer-events-none" />
        <div
          className="absolute top-20 right-1/4 w-72 h-72 bg-bronze/10 rounded-full blur-[110px] animate-float pointer-events-none"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-64 h-64 bg-rose-500/[0.06] rounded-full blur-[100px] animate-float pointer-events-none"
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
              <Sparkles className="w-3.5 h-3.5" />
              Blog & Insights
            </motion.div>
            <AnimatedHeading text1="Growth" text2="Insights" />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-sv-muted text-lg md:text-xl leading-relaxed mt-2"
            >
              Real strategies, real data, real results. No fluff — just the
              playbooks we use to grow our clients&apos; businesses, written by
              the team that executes them.
            </motion.p>
          </motion.div>

          {/* Gold gradient line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="hero-gradient-line max-w-md mx-auto mt-12"
          />
        </div>
      </section>

      {/* ===== Search + Filters ===== */}
      <section className="relative pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-sv-muted pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by title, topic, or tag..."
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

          {/* Category filter pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-2"
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              const config =
                cat === "All"
                  ? {
                      bg: "bg-gold/15",
                      text: "text-gold",
                      dot: "bg-gold",
                      border: "border-gold/20",
                    }
                  : getCategoryConfig(cat);
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`
                    relative px-5 py-2.5 rounded-full text-sm font-medium
                    transition-all duration-300 cursor-pointer border
                    ${
                      isActive
                        ? `${config.bg} ${config.text} ${config.border} shadow-lg`
                        : "bg-sv-surface/50 text-sv-muted border-transparent hover:border-gold/10 hover:text-cream"
                    }
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute inset-0 rounded-full border border-current/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    {cat !== "All" && (
                      <span
                        className={`w-2 h-2 rounded-full ${config.dot} ${isActive ? "opacity-100" : "opacity-40"}`}
                      />
                    )}
                    {cat}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ===== Featured post ===== */}
      <section className="relative pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatePresence mode="wait">
            {featuredPost && (
              <motion.div
                key={`featured-${featuredPost.slug}-${activeCategory}-${searchQuery}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="group"
              >
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="block glass rounded-3xl overflow-hidden card-hover relative before:absolute before:inset-0 before:rounded-3xl before:border-t-2 before:border-transparent hover:before:border-gold before:transition-all before:duration-500 before:z-10 before:pointer-events-none"
                >
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Featured image (real AI-generated + gradient fallback) */}
                    <div className="relative h-64 md:h-auto min-h-[300px] overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${getCategoryConfig(featuredPost.category).gradient} transition-transform duration-700 group-hover:scale-105`}
                      />
                      {featuredPost.featuredImage && (
                        <Image
                          src={featuredPost.featuredImage}
                          alt={`${featuredPost.title} — featured image`}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          priority
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-sv-bg/70 via-transparent to-transparent" />
                      {!featuredPost.featuredImage && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          {(() => {
                            const { Icon } = getCategoryConfig(
                              featuredPost.category,
                            );
                            return <Icon className="w-20 h-20 text-white/10" />;
                          })()}
                        </div>
                      )}
                      <div className="absolute inset-0 pattern-dots opacity-30 pointer-events-none" />
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${getCategoryConfig(featuredPost.category).bg} ${getCategoryConfig(featuredPost.category).text} border ${getCategoryConfig(featuredPost.category).border}`}
                        >
                          {featuredPost.category}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-gold text-sv-bg text-xs font-bold">
                          FEATURED
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 text-xs text-sv-muted mb-4">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />{" "}
                            {featuredPost.readTime} min read
                          </span>
                          <span className="w-1 h-1 rounded-full bg-sv-muted/40" />
                          <span>{formatDate(featuredPost.publishedAt)}</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-cream mb-4 group-hover:text-gold transition-colors duration-300 leading-tight">
                          {featuredPost.title}
                        </h2>
                        <p className="text-sv-muted leading-relaxed mb-6">
                          {featuredPost.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {featuredPost.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2.5 py-1 rounded-full bg-sv-surface/60 border border-gold/10 text-sv-muted"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-gold/10">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold via-gold-light to-bronze flex items-center justify-center text-sv-bg font-bold text-sm">
                            {featuredPost.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <p className="text-sm text-cream font-medium">
                              {featuredPost.author}
                            </p>
                            <p className="text-xs text-sv-muted">
                              {featuredPost.authorRole}
                            </p>
                          </div>
                        </div>
                        <span className="text-gold font-medium text-sm flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300">
                          Read More
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ===== Posts grid ===== */}
      <section className="relative pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`grid-${activeCategory}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {regularPosts.length === 0 && !featuredPost ? (
                <div className="text-center py-20">
                  <Search className="w-12 h-12 text-sv-muted/30 mx-auto mb-4" />
                  <p className="text-sv-muted text-lg mb-2">
                    No articles found
                    {searchQuery && ` for &quot;${searchQuery}&quot;`}
                    {activeCategory !== "All" && ` in ${activeCategory}`}.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("All");
                    }}
                    className="mt-4 text-gold hover:text-gold-light underline underline-offset-4 text-sm cursor-pointer"
                  >
                    Reset filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularPosts.map((post, i) => {
                    const config = getCategoryConfig(post.category);
                    const Icon = config.Icon;
                    return (
                      <motion.div
                        key={post.slug}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08, duration: 0.5 }}
                        className="group"
                      >
                        <Link
                          href={`/blog/${post.slug}`}
                          className="block glass rounded-2xl overflow-hidden card-hover h-full flex flex-col relative before:absolute before:inset-0 before:rounded-2xl before:border-t-2 before:border-transparent hover:before:border-gold before:transition-all before:duration-500 before:z-10 before:pointer-events-none"
                        >
                          {/* Cover image (real AI-generated + gradient fallback) */}
                          <div className="relative h-44 overflow-hidden">
                            <div
                              className={`absolute inset-0 bg-gradient-to-br ${config.gradient}`}
                            />
                            {post.featuredImage && (
                              <Image
                                src={post.featuredImage}
                                alt={`${post.title} — cover image`}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-sv-bg/70 via-transparent to-transparent" />
                            {!post.featuredImage && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Icon className="w-12 h-12 text-white/10" />
                              </div>
                            )}
                            <div className="absolute inset-0 pattern-dots opacity-30 pointer-events-none" />
                            <div className="absolute top-3 left-3">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-bold ${config.bg} ${config.text} border ${config.border}`}
                              >
                                {post.category}
                              </span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-5 flex flex-col flex-1">
                            <div className="flex items-center gap-3 text-xs text-sv-muted mb-3">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {post.readTime}{" "}
                                min read
                              </span>
                              <span className="w-1 h-1 rounded-full bg-sv-muted/40" />
                              <span>{formatDate(post.publishedAt)}</span>
                            </div>
                            <h3 className="text-lg font-bold text-cream mb-2 group-hover:text-gold transition-colors duration-300 leading-snug">
                              {post.title}
                            </h3>
                            <p className="text-sm text-sv-muted leading-relaxed mb-4 flex-1 line-clamp-3">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center justify-between pt-4 border-t border-gold/10">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/30 to-bronze/30 flex items-center justify-center text-[10px] font-bold text-gold border border-gold/20">
                                  {post.author
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </div>
                                <span className="text-sm text-cream/70 font-medium">
                                  {post.author}
                                </span>
                              </div>
                              <span className="text-gold text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                Read
                                <ArrowRight className="w-3.5 h-3.5" />
                              </span>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ===== Newsletter CTA ===== */}
      <section className="relative pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <NewsletterCTA />
        </div>
      </section>
    </PageShell>
  );
}
