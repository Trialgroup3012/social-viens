"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Clock,
  Calendar,
  Search,
  Share2,
  Palette,
  Globe,
  Target,
  BarChart3,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
  Check,
  Sparkles,
  TrendingUp,
  Lightbulb,
} from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import {
  getBlogPostBySlug,
  getRelatedPosts,
  formatDate,
  type BlogCategory,
} from "@/lib/blog-data";

function getCategoryConfig(category: BlogCategory) {
  switch (category) {
    case "SEO":
      return {
        bg: "bg-emerald-500/15",
        text: "text-emerald-400",
        border: "border-emerald-500/20",
        gradient: "from-emerald-900/40 to-emerald-700/20",
        Icon: Search,
      };
    case "Social Media":
      return {
        bg: "bg-teal-500/15",
        text: "text-teal-400",
        border: "border-teal-500/20",
        gradient: "from-teal-900/40 to-teal-700/20",
        Icon: Share2,
      };
    case "Branding":
      return {
        bg: "bg-rose-500/15",
        text: "text-rose-400",
        border: "border-rose-500/20",
        gradient: "from-rose-900/40 to-rose-700/20",
        Icon: Palette,
      };
    case "Web Design":
      return {
        bg: "bg-amber-500/15",
        text: "text-amber-400",
        border: "border-amber-500/20",
        gradient: "from-amber-900/40 to-amber-700/20",
        Icon: Globe,
      };
    case "Paid Ads":
      return {
        bg: "bg-gold/15",
        text: "text-gold",
        border: "border-gold/20",
        gradient: "from-gold/20 to-bronze/10",
        Icon: Target,
      };
    default:
      return {
        bg: "bg-gold/15",
        text: "text-gold",
        border: "border-gold/20",
        gradient: "from-gold/20 to-bronze/10",
        Icon: BarChart3,
      };
  }
}

// Build a table of contents from h2 tags in the article HTML.
// Returns the modified HTML (with ids on h2s) + a list of TOC items.
function buildTOC(html: string): { contentWithIds: string; toc: { id: string; text: string }[] } {
  const toc: { id: string; text: string }[] = [];
  let counter = 0;
  // Use [\s\S] instead of `s` flag for pre-es2018 compatibility.
  const modified = html.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (match, inner) => {
    counter += 1;
    const id = `section-${counter}`;
    // Strip HTML tags from inner for TOC text.
    const text = String(inner).replace(/<[^>]+>/g, "").trim();
    toc.push({ id, text });
    // Replace with h2 that has the id (strip any existing attributes).
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { contentWithIds: modified, toc };
}

// Share buttons row.
function ShareButtons({ slug, title }: { slug: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/blog/${slug}`
      : `https://socialviens.com/blog/${slug}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      label: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "hover:text-blue-400",
    },
    {
      label: "Twitter",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: "hover:text-sky-400",
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "hover:text-blue-300",
    },
  ];

  const copyLink = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Silent fail — clipboard may be blocked.
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-sv-muted mr-2 flex items-center gap-1.5">
        <Share2 className="w-4 h-4" />
        Share:
      </span>
      {shareLinks.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${link.label}`}
            className={`w-9 h-9 rounded-full glass flex items-center justify-center text-sv-muted hover:text-gold hover:border-gold/30 transition-all duration-300 ${link.color}`}
          >
            <Icon className="w-4 h-4" />
          </a>
        );
      })}
      <button
        onClick={copyLink}
        aria-label="Copy link"
        className="w-9 h-9 rounded-full glass flex items-center justify-center text-sv-muted hover:text-gold hover:border-gold/30 transition-all duration-300 cursor-pointer"
      >
        {copied ? (
          <Check className="w-4 h-4 text-emerald-400" />
        ) : (
          <Link2 className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}

export default function BlogPostClient({ slug }: { slug: string }) {
  const router = useRouter();
  const post = getBlogPostBySlug(slug);
  const [activeSection, setActiveSection] = useState<string>("");

  const { contentWithIds, toc } = useMemo(() => {
    if (!post) return { contentWithIds: "", toc: [] as { id: string; text: string }[] };
    return buildTOC(post.content);
  }, [post]);

  // Scroll-spy for the TOC.
  useEffect(() => {
    if (toc.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );
    for (const item of toc) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [toc]);

  if (!post) {
    return (
      <PageShell breadcrumbs={[{ label: "Blog", href: "/blog" }, { label: "Not Found" }]}>
        <div className="max-w-3xl mx-auto px-6 py-32 text-center">
          <h1 className="text-4xl font-bold text-cream mb-4">Article not found</h1>
          <p className="text-sv-muted mb-8">
            The article you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-gold to-bronze text-sv-bg font-semibold text-sm hover:shadow-lg hover:shadow-gold/20 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </PageShell>
    );
  }

  const config = getCategoryConfig(post.category);
  const Icon = config.Icon;
  const relatedPosts = getRelatedPosts(slug, 3);
  const initials = post.author
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <PageShell
      breadcrumbs={[
        { label: "Blog", href: "/blog" },
        { label: post.title },
      ]}
    >
      {/* ===== Article Hero ===== */}
      <section className="relative pt-8 md:pt-12 pb-12 overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-gold/8 rounded-full blur-[120px] animate-float pointer-events-none" />
        <div
          className="absolute top-20 right-1/4 w-72 h-72 bg-bronze/8 rounded-full blur-[110px] animate-float pointer-events-none"
          style={{ animationDelay: "2s" }}
        />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Category badge */}
            <Link
              href="/blog"
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase ${config.bg} ${config.text} border ${config.border} mb-6 hover:scale-105 transition-transform`}
            >
              <Icon className="w-3.5 h-3.5" />
              {post.category}
            </Link>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-cream leading-tight mb-6">
              {post.title.split(" ").slice(0, -2).join(" ")}{" "}
              <span className="text-gold-gradient">
                {post.title.split(" ").slice(-2).join(" ")}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-sv-muted leading-relaxed mb-8">
              {post.excerpt}
            </p>

            {/* Author + meta row */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-gold/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold via-gold-light to-bronze flex items-center justify-center text-sv-bg font-bold">
                  {initials}
                </div>
                <div>
                  <p className="text-cream font-semibold">{post.author}</p>
                  <p className="text-sm text-sv-muted">{post.authorRole}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-sv-muted">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="w-1 h-1 rounded-full bg-sv-muted/40" />
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.readTime} min read
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== Featured image (real AI-generated + gradient fallback) ===== */}
      <section className="relative pb-12">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className={`relative aspect-[21/9] rounded-3xl overflow-hidden glass border border-gold/15`}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${config.gradient}`}
            />
            {post.featuredImage && (
              <Image
                src={post.featuredImage}
                alt={`${post.title} — featured image`}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-sv-bg/85 via-sv-bg/15 to-transparent" />
            {!post.featuredImage && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon className="w-32 h-32 text-white/10" />
              </div>
            )}
            <div className="absolute inset-0 pattern-dots opacity-30 pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1.5 rounded-full bg-sv-bg/60 backdrop-blur border border-gold/15 text-cream/90 font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== Article body + TOC ===== */}
      <section className="relative pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_280px] gap-12">
            {/* Article content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="max-w-3xl"
            >
              {/* Key takeaways callout */}
              {toc.length > 0 && (
                <div className="glass-strong rounded-2xl p-6 md:p-8 mb-10 border border-gold/15">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center">
                      <Lightbulb className="w-4 h-4 text-gold" />
                    </div>
                    <h3 className="text-cream font-bold text-lg">Key Sections</h3>
                  </div>
                  <ul className="space-y-2">
                    {toc.slice(0, 5).map((item) => (
                      <li key={item.id} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                        <a
                          href={`#${item.id}`}
                          className="text-sv-muted hover:text-gold transition-colors text-sm leading-relaxed"
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Prose content — styled with Tailwind arbitrary variants */}
              <div
                className="
                  text-sv-muted leading-relaxed text-base md:text-lg
                  [&_p]:mb-5 [&_p]:leading-relaxed
                  [&_h2]:text-cream [&_h2]:font-bold [&_h2]:text-2xl md:[&_h2]:text-3xl [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:scroll-mt-32
                  [&_h3]:text-cream [&_h3]:font-semibold [&_h3]:text-xl [&_h3]:mt-8 [&_h3]:mb-3
                  [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:my-5
                  [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:my-5
                  [&_li]:leading-relaxed [&_li]:text-sv-muted
                  [&_a]:text-gold [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-gold-light [&_a]:transition-colors
                  [&_strong]:text-cream [&_strong]:font-semibold
                  [&_code]:text-gold [&_code]:font-mono [&_code]:text-sm [&_code]:bg-sv-surface/60 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded
                  [&_blockquote]:border-l-2 [&_blockquote]:border-gold/40 [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:my-6 [&_blockquote]:text-cream/80
                  [&_img]:rounded-xl [&_img]:my-6
                "
                dangerouslySetInnerHTML={{ __html: contentWithIds }}
              />

              {/* Share buttons */}
              <div className="mt-12 pt-8 border-t border-gold/10">
                <ShareButtons slug={post.slug} title={post.title} />
              </div>

              {/* Tags */}
              <div className="mt-8 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => router.push("/blog")}
                    className="text-xs px-3 py-1.5 rounded-full bg-sv-surface/60 border border-gold/10 text-sv-muted hover:border-gold/30 hover:text-gold transition-all cursor-pointer"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </motion.article>

            {/* Sticky TOC sidebar */}
            {toc.length > 0 && (
              <aside className="hidden lg:block">
                <div className="sticky top-28">
                  <div className="glass rounded-2xl p-6 border border-gold/10">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-4 h-4 text-gold" />
                      <h4 className="text-cream font-bold text-sm tracking-wider uppercase">
                        Table of Contents
                      </h4>
                    </div>
                    <nav className="space-y-1.5">
                      {toc.map((item, idx) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className={`flex items-start gap-2.5 text-sm py-1.5 px-2 rounded-md transition-all ${
                            activeSection === item.id
                              ? "bg-gold/10 text-gold"
                              : "text-sv-muted hover:text-cream hover:bg-gold/5"
                          }`}
                        >
                          <span
                            className={`text-xs font-mono mt-0.5 ${activeSection === item.id ? "text-gold" : "text-sv-muted/50"}`}
                          >
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <span className="leading-snug">{item.text}</span>
                        </a>
                      ))}
                    </nav>
                  </div>

                  {/* CTA card */}
                  <div className="glass-strong rounded-2xl p-6 mt-6 gold-glow border border-gold/15">
                    <TrendingUp className="w-6 h-6 text-gold mb-3" />
                    <h4 className="text-cream font-bold mb-2">
                      Want results like this?
                    </h4>
                    <p className="text-sm text-sv-muted mb-4 leading-relaxed">
                      Get a free strategy session — we&apos;ll build you a custom
                      growth plan.
                    </p>
                    <Link
                      href="/contact"
                      className="block w-full text-center px-4 py-2.5 rounded-full bg-gradient-to-r from-gold to-bronze text-sv-bg font-semibold text-sm hover:shadow-lg hover:shadow-gold/20 transition-all"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </aside>
            )}
          </div>
        </div>
      </section>

      {/* ===== Author bio card ===== */}
      <section className="relative pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass rounded-3xl p-8 md:p-10 border border-gold/15 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/8 rounded-full blur-[80px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row gap-6">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-gold via-gold-light to-bronze flex items-center justify-center text-sv-bg font-bold text-3xl shrink-0 shadow-lg shadow-gold/10">
                {initials}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 text-xs text-gold tracking-wider uppercase mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Written By
                </div>
                <h3 className="text-2xl font-bold text-cream mb-1">
                  {post.author}
                </h3>
                <p className="text-gold text-sm mb-4">{post.authorRole}</p>
                <p className="text-sv-muted leading-relaxed mb-5">
                  {post.authorBio}
                </p>
                <div className="flex items-center gap-2">
                  <a
                    href="#"
                    aria-label={`${post.author} on LinkedIn`}
                    className="w-9 h-9 rounded-full glass flex items-center justify-center text-sv-muted hover:text-gold hover:border-gold/30 transition-all"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    aria-label={`${post.author} on Twitter`}
                    className="w-9 h-9 rounded-full glass flex items-center justify-center text-sv-muted hover:text-gold hover:border-gold/30 transition-all"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA banner ===== */}
      <section className="relative pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-3xl"
          >
            <div className="glass-strong gold-glow-strong rounded-3xl p-8 md:p-12 text-center relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-cream mb-4">
                  Want results like this for{" "}
                  <span className="text-gold-gradient">your business?</span>
                </h2>
                <p className="text-sv-muted text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                  Book a free 30-minute strategy session. We&apos;ll audit your
                  current marketing, identify quick wins, and build a 90-day
                  growth plan tailored to your business.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-gold to-bronze text-sv-bg font-bold text-sm hover:shadow-lg hover:shadow-gold/20 hover:scale-[1.02] transition-all duration-300"
                >
                  Get Your Free Strategy Session
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== Related posts ===== */}
      <section className="relative pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="hero-gradient-line max-w-xs mx-auto mb-12" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <p className="text-sm tracking-[0.3em] text-gold/70 uppercase mb-3">
              Keep Reading
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-cream">
              Related <span className="text-gold-gradient">Articles</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rp, i) => {
              const rpConfig = getCategoryConfig(rp.category);
              const RpIcon = rpConfig.Icon;
              return (
                <motion.div
                  key={rp.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group"
                >
                  <Link
                    href={`/blog/${rp.slug}`}
                    className="block glass rounded-2xl overflow-hidden card-hover h-full flex flex-col relative before:absolute before:inset-0 before:rounded-2xl before:border-t-2 before:border-transparent hover:before:border-gold before:transition-all before:duration-500 before:z-10 before:pointer-events-none"
                  >
                    <div className="relative h-36 overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${rpConfig.gradient} flex items-center justify-center transition-transform duration-700 group-hover:scale-110`}
                      >
                        <RpIcon className="w-10 h-10 text-white/10" />
                        <div className="absolute inset-0 pattern-dots opacity-30" />
                      </div>
                      <div className="absolute top-3 left-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${rpConfig.bg} ${rpConfig.text} border ${rpConfig.border}`}
                        >
                          {rp.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-3 text-xs text-sv-muted mb-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {rp.readTime} min
                        </span>
                        <span className="w-1 h-1 rounded-full bg-sv-muted/40" />
                        <span>{formatDate(rp.publishedAt)}</span>
                      </div>
                      <h3 className="text-base font-bold text-cream mb-2 group-hover:text-gold transition-colors leading-snug line-clamp-2">
                        {rp.title}
                      </h3>
                      <p className="text-sm text-sv-muted leading-relaxed line-clamp-2 flex-1">
                        {rp.excerpt}
                      </p>
                      <div className="mt-4 pt-4 border-t border-gold/10 flex items-center justify-between">
                        <span className="text-xs text-cream/70">{rp.author}</span>
                        <ArrowRight className="w-4 h-4 text-gold opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Back to blog link */}
          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sv-muted hover:text-gold transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all articles
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
