// /home/z/my-project/src/lib/fallback-data.ts
// Consolidated fallback data — used by safe-db.ts when DB is unavailable.
// Re-exports from existing single-purpose data files to avoid duplication.

import { services } from "./services-data";
import {
  blogPosts,
  getBlogPostBySlug,
  getRelatedPosts,
  getAllCategories,
} from "./blog-data";
import { portfolioItems } from "./portfolio-data";
import { testimonials } from "./testimonials-data";
import { faqCategories, allFAQs } from "./faq-data";

// Re-export the underlying helpers so safe-db.ts can import a single module
// if it wants to (kept here for convenience / future-proofing).
export {
  getBlogPostBySlug,
  getRelatedPosts,
  getAllCategories,
};

export const fallbackServices = services;
export const fallbackBlogPosts = blogPosts;
export const fallbackPortfolio = portfolioItems;
export const fallbackTestimonials = testimonials;
export const fallbackFAQCategories = faqCategories;
export const fallbackFAQs = allFAQs;

// Pricing packages fallback (3 tiers — match the Pricing page tier names).
export const fallbackPricingPackages = [
  {
    id: "starter",
    name: "Starter",
    price: 25000,
    period: "month",
    description:
      "Perfect for small businesses getting started with digital marketing",
    features: [
      "1 Service of Choice",
      "Monthly Reporting",
      "Email Support",
      "Basic SEO Setup",
      "Social Media Management (2 platforms)",
      "Monthly Strategy Call",
    ],
    highlighted: false,
    ctaText: "Get Started",
    ctaLink: "/contact",
    order: 1,
  },
  {
    id: "professional",
    name: "Professional",
    price: 55000,
    period: "month",
    description: "Our most popular package for growing businesses",
    features: [
      "3 Services of Choice",
      "Weekly Reporting",
      "Priority Support",
      "Advanced SEO + Local SEO",
      "Social Media Management (4 platforms)",
      "Google Ads Management",
      "Bi-weekly Strategy Calls",
      "Dedicated Account Manager",
    ],
    highlighted: true,
    ctaText: "Get Started",
    ctaLink: "/contact",
    order: 2,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 120000,
    period: "month",
    description: "Comprehensive solution for established businesses",
    features: [
      "All Services Included",
      "Real-time Dashboard",
      "24/7 Phone Support",
      "Enterprise SEO",
      "Full Social Media Suite",
      "Google + Meta Ads Management",
      "Custom Automation Workflows",
      "Weekly Strategy Sessions",
      "Dedicated Team",
    ],
    highlighted: false,
    ctaText: "Contact Sales",
    ctaLink: "/contact",
    order: 3,
  },
];

export const fallbackSiteSettings = {
  siteName: "SOCIAL VIENS",
  tagline: "Premium Digital Marketing Agency",
  phone: "+91 81780 04800",
  email: "socialviens@gmail.com",
  address: "Delhi NCR, India",
  hours: "Mon-Sat 9AM-7PM",
  instagram: "https://instagram.com/socialviens",
  linkedin: "https://linkedin.com/company/socialviens",
  facebook: "https://facebook.com/socialviens",
};
