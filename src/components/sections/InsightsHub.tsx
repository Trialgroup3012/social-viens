"use client";

import { useState } from "react";
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
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedHeading from "@/components/ui/animated-heading";

const blogPosts = [
  {
    id: 1,
    title: "How Real Estate Developers Can Generate 100+ Leads Monthly",
    excerpt:
      "Discover the proven digital marketing strategies that top real estate developers use to fill their sales pipelines with qualified buyers.",
    category: "Growth",
    author: "Arjun Malhotra",
    authorAvatar: "AM",
    date: "Dec 15, 2024",
    readTime: 8,
    featured: true,
    image: "/images/blog/07-content-marketing.png",
  },
  {
    id: 2,
    title: "Local SEO for Doctors: The Complete 2025 Guide",
    excerpt:
      "Step-by-step guide to dominating local search results and attracting more patients to your practice.",
    category: "SEO",
    author: "Priya Sharma",
    authorAvatar: "PS",
    date: "Dec 10, 2024",
    readTime: 6,
    featured: false,
    image: "/images/blog/01-local-seo-delhi.png",
  },
  {
    id: 3,
    title: "Social Media Strategies That Actually Convert",
    excerpt:
      "Stop chasing likes. Learn the social media frameworks that drive real business results and revenue.",
    category: "Social Media",
    author: "Ananya Patel",
    authorAvatar: "AP",
    date: "Dec 5, 2024",
    readTime: 5,
    featured: false,
    image: "/images/blog/03-instagram-aesthetics.png",
  },
  {
    id: 4,
    title: "Building a Luxury Brand Identity from Scratch",
    excerpt:
      "The essential elements of premium branding that command higher prices and build unshakeable trust.",
    category: "Branding",
    author: "Rahul Verma",
    authorAvatar: "RV",
    date: "Nov 28, 2024",
    readTime: 7,
    featured: false,
    image: "/images/blog/06-brand-identity-design.png",
  },
  {
    id: 5,
    title: "Google Ads ROAS: How to Hit 300%+ Consistently",
    excerpt:
      "Advanced optimization techniques for Google Ads that maximize every rupee of your ad spend.",
    category: "Growth",
    author: "Vikram Singh",
    authorAvatar: "VS",
    date: "Nov 20, 2024",
    readTime: 6,
    featured: false,
    image: "/images/blog/05-paid-ads-roas.png",
  },
  {
    id: 6,
    title: "Why Your Website Isn't Converting (And How to Fix It)",
    excerpt:
      "The 7 most common conversion killers and the exact fixes that double your conversion rate.",
    category: "SEO",
    author: "Neha Gupta",
    authorAvatar: "NG",
    date: "Nov 15, 2024",
    readTime: 5,
    featured: false,
    image: "/images/blog/04-website-conversion.png",
  },
];

const categories = ["All", "SEO", "Social Media", "Growth", "Branding"] as const;
type Category = (typeof categories)[number];

function getCategoryConfig(category: string) {
  switch (category) {
    case "SEO":
      return {
        bg: "bg-emerald-500/15",
        text: "text-emerald-400",
        border: "border-emerald-500/20",
        gradient: "from-emerald-900/40 to-emerald-700/20",
        icon: Search,
        dot: "bg-emerald-400",
      };
    case "Social Media":
      return {
        bg: "bg-teal-500/15",
        text: "text-teal-400",
        border: "border-teal-500/20",
        gradient: "from-teal-900/40 to-teal-700/20",
        icon: Share2,
        dot: "bg-teal-400",
      };
    case "Growth":
      return {
        bg: "bg-amber-500/15",
        text: "text-amber-400",
        border: "border-amber-500/20",
        gradient: "from-amber-900/40 to-amber-700/20",
        icon: TrendingUp,
        dot: "bg-amber-400",
      };
    case "Branding":
      return {
        bg: "bg-rose-500/15",
        text: "text-rose-400",
        border: "border-rose-500/20",
        gradient: "from-rose-900/40 to-rose-700/20",
        icon: Palette,
        dot: "bg-rose-400",
      };
    default:
      return {
        bg: "bg-gold/15",
        text: "text-gold",
        border: "border-gold/20",
        gradient: "from-gold/20 to-bronze/10",
        icon: BarChart3,
        dot: "bg-gold",
      };
  }
}

function getCategoryIcon(category: string) {
  switch (category) {
    case "SEO":
      return Search;
    case "Social Media":
      return Share2;
    case "Growth":
      return TrendingUp;
    case "Branding":
      return Palette;
    default:
      return BarChart3;
  }
}

export default function InsightsHub() {
  const [activeFilter, setActiveFilter] = useState<Category>("All");

  const filteredPosts =
    activeFilter === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeFilter);

  const featuredPost = filteredPosts.find((p) => p.featured);
  const regularPosts = filteredPosts.filter((p) => !p.featured);

  return (
    <section id="insights" className="relative py-24 overflow-hidden">
      <div className="section-divider mb-16" />

      {/* Background decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-sm tracking-[0.3em] text-gold/70 uppercase mb-4"
          >
            Knowledge Center
          </motion.p>
          <AnimatedHeading text1="Insights" text2="Hub" className="mb-6" />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="max-w-2xl mx-auto text-sv-muted text-lg"
          >
            Stay ahead with expert insights on digital marketing, growth
            strategies, and industry trends.
          </motion.p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            const config =
              cat === "All"
                ? { bg: "bg-gold/15", text: "text-gold", border: "border-gold/30", dot: "bg-gold" }
                : getCategoryConfig(cat);
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`
                  relative px-5 py-2.5 rounded-full text-sm font-medium
                  transition-all duration-300 cursor-pointer
                  border
                  ${
                    isActive
                      ? `${config.bg} ${config.text} ${config.border} shadow-lg`
                      : "bg-sv-surface/50 text-sv-muted border-transparent hover:border-gold/10 hover:text-cream"
                  }
                `}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilter"
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

        {/* Blog Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {filteredPosts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <Users className="w-12 h-12 text-sv-muted/30 mx-auto mb-4" />
                <p className="text-sv-muted text-lg">
                  No articles found in this category.
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Featured Post - spans 2 columns on desktop */}
                {featuredPost && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="md:col-span-2 lg:col-span-2 group"
                  >
                    <div className="glass rounded-2xl overflow-hidden card-hover h-full relative before:absolute before:inset-0 before:rounded-2xl before:border-t-2 before:border-transparent hover:before:border-gold before:transition-all before:duration-500 before:z-10 before:pointer-events-none">
                      <div className="md:flex h-full">
                        {/* Image area */}
                        <div className="relative md:w-1/2 h-56 md:h-auto overflow-hidden">
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${getCategoryConfig(featuredPost.category).gradient} transition-transform duration-700 group-hover:scale-105`}
                          />
                          {featuredPost.image && (
                            <Image
                              src={featuredPost.image}
                              alt={featuredPost.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                              priority
                            />
                          )}
                          {/* Dark gradient overlay for legibility */}
                          <div className="absolute inset-0 bg-gradient-to-t from-sv-bg/70 via-transparent to-transparent" />
                          {/* Category icon fallback (only when no image) */}
                          {!featuredPost.image && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              {(() => {
                                const Icon = getCategoryIcon(
                                  featuredPost.category
                                );
                                return <Icon className="w-16 h-16 text-white/10" />;
                              })()}
                            </div>
                          )}
                          {/* Category badge overlay */}
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

                        {/* Content area */}
                        <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-3 text-xs text-sv-muted mb-4">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />{" "}
                                {featuredPost.readTime} min read
                              </span>
                              <span className="w-1 h-1 rounded-full bg-sv-muted/40" />
                              <span>{featuredPost.date}</span>
                            </div>

                            <h3 className="text-2xl font-bold text-cream mb-3 group-hover:text-gold transition-colors duration-300 leading-tight">
                              {featuredPost.title}
                            </h3>
                            <p className="text-sv-muted leading-relaxed mb-6">
                              {featuredPost.excerpt}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold/30 to-bronze/30 flex items-center justify-center text-xs font-bold text-gold border border-gold/20">
                                {featuredPost.authorAvatar}
                              </div>
                              <span className="text-sm text-cream/80 font-medium">
                                {featuredPost.author}
                              </span>
                            </div>
                            <Button
                              variant="ghost"
                              className="text-gold hover:text-gold-light hover:bg-gold/10 p-0 h-auto group/btn"
                            >
                              Read Article
                              <ArrowRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Regular Posts */}
                {regularPosts.map((post, i) => {
                  const config = getCategoryConfig(post.category);
                  const Icon = getCategoryIcon(post.category);
                  return (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="group"
                    >
                      <div className="glass rounded-2xl overflow-hidden card-hover h-full flex flex-col relative before:absolute before:inset-0 before:rounded-2xl before:border-t-2 before:border-transparent hover:before:border-gold before:transition-all before:duration-500 before:z-10 before:pointer-events-none">
                        {/* Image placeholder area */}
                        <div className="relative h-44 overflow-hidden">
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${config.gradient} transition-transform duration-700 group-hover:scale-110`}
                          />
                          {post.image && (
                            <Image
                              src={post.image}
                              alt={post.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          )}
                          {/* Dark gradient overlay for legibility */}
                          <div className="absolute inset-0 bg-gradient-to-t from-sv-bg/70 via-transparent to-transparent" />
                          {/* Category icon fallback (only when no image) */}
                          {!post.image && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Icon className="w-12 h-12 text-white/10" />
                            </div>
                          )}
                          {/* Category badge overlay */}
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
                              <Clock className="w-3 h-3" /> {post.readTime} min
                              read
                            </span>
                            <span className="w-1 h-1 rounded-full bg-sv-muted/40" />
                            <span>{post.date}</span>
                          </div>

                          <h3 className="text-lg font-bold text-cream mb-2 group-hover:text-gold transition-colors duration-300 leading-snug">
                            {post.title}
                          </h3>
                          <p className="text-sm text-sv-muted leading-relaxed mb-4 flex-1">
                            {post.excerpt}
                          </p>

                          {/* Footer */}
                          <div className="flex items-center justify-between pt-4 border-t border-gold/10">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/30 to-bronze/30 flex items-center justify-center text-[10px] font-bold text-gold border border-gold/20">
                                {post.authorAvatar}
                              </div>
                              <span className="text-sm text-cream/70 font-medium">
                                {post.author}
                              </span>
                            </div>
                            <div className="text-gold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* View All Insights CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-14"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-gold to-bronze text-sv-bg font-bold px-8 py-6 rounded-full text-base hover:shadow-lg hover:shadow-gold/20 transition-all duration-300 hover:scale-105 group cursor-pointer"
          >
            View All Insights
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
