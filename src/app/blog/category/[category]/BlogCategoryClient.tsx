"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
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
  FolderOpen,
} from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import {
  blogPosts,
  getAllCategories,
  formatDate,
  type BlogCategory,
} from "@/lib/blog-data";
import { slugifyCategory, categoryDescriptions } from "./category-utils";

interface BlogCategoryClientProps {
  categorySlug: string;
  category: BlogCategory;
}

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
        body: JSON.stringify({ email, source: "blog-category-newsletter-cta" }),
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
      className="relative overflow-hidden rounded-3xl"
    >
      <div className="glass-strong gold-glow-strong rounded-3xl p-8 md:p-12 relative">
        <div className="absolute top-0 right-0 w-72 h-72 bg-gold/10 rounded-full blur-[100px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-bronze/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-medium tracking-[0.2em] uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Growth Newsletter
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-cream">More growth insights</span>{" "}
            <span className="text-gold-gradient">in your inbox</span>
          </h2>
          <p className="text-sv-muted mb-8 leading-relaxed">
            Join 2,000+ founders and marketers getting our weekly playbook on
            SEO, paid ads, branding, and conversion optimisation. No fluff,
            just tactics you can apply today.
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
              {status === "loading" && <Loader2 className="w-4 h-4 animate-spin" />}
              {status === "success" && <CheckCircle2 className="w-4 h-4" />}
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

export default function BlogCategoryClient({
  categorySlug,
  category,
}: BlogCategoryClientProps) {
  const allCategories = useMemo(() => getAllCategories(), []);
  const config = getCategoryConfig(category);
  const CategoryIcon = config.Icon;

  const postsInCategory = useMemo(
    () => blogPosts.filter((p) => p.category === category),
    [category],
  );

  const description = categoryDescriptions[category];

  return (
    <PageShell
      breadcrumbs={[
        { label: "Blog", href: "/blog" },
        { label: category },
      ]}
    >
      {/* ===== Hero ===== */}
      <section className="relative pt-12 md:pt-16 pb-12 md:pb-16 overflow-hidden">
        {/* Floating orbs */}
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
              <FolderOpen className="w-3.5 h-3.5" />
              Blog Category
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-cream">{category}</span>{" "}
              <span className="text-gold-gradient">Articles</span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-sv-muted text-lg md:text-xl leading-relaxed"
            >
              {postsInCategory.length}{" "}
              {postsInCategory.length === 1 ? "article" : "articles"} in this
              category — hand-picked playbooks from the Social Viens team.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="hero-gradient-line max-w-md mx-auto mt-10"
          />
        </div>
      </section>

      {/* ===== Main content: posts + sidebar ===== */}
      <section className="relative pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
            {/* Sidebar */}
            <aside>
              <div className="lg:sticky lg:top-28 space-y-6">
                {/* Category description */}
                <div className="glass-strong rounded-2xl p-6 border border-gold/15 gold-glow">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-10 h-10 rounded-xl ${config.bg} ${config.border} border flex items-center justify-center`}
                    >
                      <CategoryIcon className={`w-5 h-5 ${config.text}`} />
                    </div>
                    <div>
                      <p className="text-xs tracking-[0.2em] text-gold/70 uppercase">
                        Category
                      </p>
                      <h3 className="text-cream font-bold text-base">
                        {category}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-sv-muted leading-relaxed">
                    {description}
                  </p>
                  <div className="mt-4 pt-4 border-t border-gold/10">
                    <p className="text-xs text-sv-muted uppercase tracking-wider mb-1">
                      Articles in this category
                    </p>
                    <p className="text-2xl font-bold text-gold">
                      {postsInCategory.length}
                    </p>
                  </div>
                </div>

                {/* Other categories */}
                <div className="glass rounded-2xl p-6 border border-gold/10">
                  <p className="text-xs tracking-[0.2em] text-gold/70 uppercase mb-4">
                    Browse other categories
                  </p>
                  <div className="space-y-1.5">
                    {allCategories.map((cat) => {
                      const otherConfig = getCategoryConfig(cat);
                      const OtherIcon = otherConfig.Icon;
                      const isActive = cat === category;
                      return (
                        <Link
                          key={cat}
                          href={`/blog/category/${slugifyCategory(cat)}`}
                          className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border group ${
                            isActive
                              ? "bg-gold/15 text-gold border-gold/20"
                              : "bg-sv-surface/40 text-sv-muted border-transparent hover:border-gold/10 hover:text-cream"
                          }`}
                        >
                          <span className="flex items-center gap-2.5">
                            <OtherIcon className="w-4 h-4" />
                            {cat}
                          </span>
                          <span
                            className={`text-xs ${
                              isActive ? "opacity-100" : "opacity-60"
                            }`}
                          >
                            {blogPosts.filter((p) => p.category === cat).length}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Back to all articles */}
                <Link
                  href="/blog"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl glass border border-gold/15 text-gold hover:bg-gold/10 hover:border-gold/30 text-sm font-medium transition-all duration-300"
                >
                  <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                  Back to All Articles
                </Link>
              </div>
            </aside>

            {/* Posts grid */}
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`grid-${categorySlug}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  {postsInCategory.length === 0 ? (
                    /* Empty state */
                    <div className="text-center py-20 glass rounded-2xl border border-gold/10">
                      <FolderOpen className="w-12 h-12 text-sv-muted/30 mx-auto mb-4" />
                      <p className="text-sv-muted text-lg mb-2">
                        No articles found in {category}.
                      </p>
                      <p className="text-sv-muted/70 text-sm mb-6">
                        We&apos;re working on new content for this category.
                        Check back soon!
                      </p>
                      <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-gold to-bronze text-sv-bg font-semibold text-sm hover:shadow-lg hover:shadow-gold/20 transition-all duration-300"
                      >
                        Browse All Articles
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {postsInCategory.map((post, i) => {
                        const postConfig = getCategoryConfig(post.category);
                        const Icon = postConfig.Icon;
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
                              {/* Gradient header */}
                              <div className="relative h-44 overflow-hidden">
                                <div
                                  className={`absolute inset-0 bg-gradient-to-br ${postConfig.gradient} flex items-center justify-center transition-transform duration-700 group-hover:scale-110`}
                                >
                                  <Icon className="w-12 h-12 text-white/10" />
                                  <div className="absolute inset-0 pattern-dots opacity-30" />
                                </div>
                                <div className="absolute top-3 left-3">
                                  <span
                                    className={`px-3 py-1 rounded-full text-xs font-bold ${postConfig.bg} ${postConfig.text} border ${postConfig.border}`}
                                  >
                                    {post.category}
                                  </span>
                                </div>
                                {post.featured && (
                                  <div className="absolute top-3 right-3">
                                    <span className="px-2.5 py-1 rounded-full bg-gold text-sv-bg text-[10px] font-bold tracking-wider">
                                      FEATURED
                                    </span>
                                  </div>
                                )}
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
          </div>
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
