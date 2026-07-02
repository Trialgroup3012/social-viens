import {
  Globe,
  Search,
  Share2,
  Palette,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type Category = "Website" | "SEO" | "Social Media" | "Branding";

export interface PortfolioItem {
  id: number;
  title: string;
  client: string;
  category: Category;
  description: string;
  result: string;
  /** tailwind gradient stops used for the placeholder image */
  gradient: string;
  /** lucide icon used as faded watermark */
  Icon: LucideIcon;
  /** featured flag — only one item is featured */
  featured?: boolean;
  /** metrics shown on the featured case study highlight */
  metrics?: { label: string; value: string }[];
  /** real AI-generated cover image (relative to /public) */
  image?: string;
}

/* ------------------------------------------------------------------ */
/*  Data — 12 realistic portfolio items                                */
/* ------------------------------------------------------------------ */

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Luxury Real Estate Portal",
    client: "Aurum Estates",
    category: "Website",
    description:
      "Editorial property portal with cinematic listings & map search.",
    result: "+180% Lead Gen",
    gradient:
      "linear-gradient(135deg, #4A3A1F 0%, #D4AF37 55%, #1A1410 100%)",
    Icon: Globe,
    image: "/images/portfolio/01-aurum-estates.png",
    featured: true,
    metrics: [
      { label: "Lead Gen", value: "+180%" },
      { label: "Avg. Session", value: "4m 12s" },
      { label: "Bounce Rate", value: "-42%" },
    ],
  },
  {
    id: 2,
    title: "Healthcare SEO Dominance",
    client: "CareWell Clinics",
    category: "SEO",
    description:
      "Technical SEO + local pack sweep across 8 clinic locations.",
    result: "#1 Ranking",
    gradient:
      "linear-gradient(135deg, #0F2A1F 0%, #2E7D5B 55%, #1A1410 100%)",
    Icon: Search,
    image: "/images/portfolio/02-carewell-clinics.png",
  },
  {
    id: 3,
    title: "Restaurant Brand Refresh",
    client: "Saffron Kitchen",
    category: "Branding",
    description:
      "Heritage-rooted identity, menu system & packaging overhaul.",
    result: "3x Bookings",
    gradient:
      "linear-gradient(135deg, #2A0F1A 0%, #8E2B4A 55%, #1A1410 100%)",
    Icon: Palette,
    image: "/images/portfolio/03-saffron-kitchen.png",
  },
  {
    id: 4,
    title: "E-commerce Social Blitz",
    client: "Velvet & Co",
    category: "Social Media",
    description:
      "90-day content engine across Reels, Stories & influencer drops.",
    result: "+250% Engagement",
    gradient:
      "linear-gradient(135deg, #2A1A0E 0%, #A87842 55%, #1A1410 100%)",
    Icon: Share2,
    image: "/images/portfolio/04-velvet-and-co.png",
  },
  {
    id: 5,
    title: "Law Firm Website",
    client: "Verma & Associates",
    category: "Website",
    description:
      "Authority-driven practice area pages with lead capture funnels.",
    result: "+90% Inquiries",
    gradient:
      "linear-gradient(135deg, #3A2E14 0%, #D4AF37 55%, #1A1410 100%)",
    Icon: Globe,
    image: "/images/portfolio/05-verma-associates.png",
  },
  {
    id: 6,
    title: "Local SEO for Salon",
    client: "Glow Beauty Lounge",
    category: "SEO",
    description:
      "Google Business Profile optimization + review acceleration.",
    result: "4x Footfall",
    gradient:
      "linear-gradient(135deg, #0F2A1F 0%, #3FA37A 55%, #1A1410 100%)",
    Icon: Search,
    image: "/images/portfolio/06-glow-beauty-lounge.png",
  },
  {
    id: 7,
    title: "Fashion Brand Identity",
    client: "Aria Couture",
    category: "Branding",
    description:
      "Luxury wordmark, seasonal lookbook system & tagline toolkit.",
    result: "+200% Brand Recall",
    gradient:
      "linear-gradient(135deg, #2A0F1A 0%, #A6365A 55%, #1A1410 100%)",
    Icon: Palette,
    image: "/images/portfolio/07-aria-couture.png",
  },
  {
    id: 8,
    title: "Instagram Growth Campaign",
    client: "Bloom & Brew",
    category: "Social Media",
    description:
      "Aesthetic-first grid strategy with viral Reels production.",
    result: "120K Followers",
    gradient:
      "linear-gradient(135deg, #2A1A0E 0%, #C99560 55%, #1A1410 100%)",
    Icon: Share2,
    image: "/images/portfolio/08-bloom-and-brew.png",
  },
  {
    id: 9,
    title: "Fintech Landing Platform",
    client: "PayWise Capital",
    category: "Website",
    description:
      "Conversion-optimized product site with trust architecture.",
    result: "+150% Conversions",
    gradient:
      "linear-gradient(135deg, #4A3A1F 0%, #F5D680 55%, #1A1410 100%)",
    Icon: Globe,
    image: "/images/portfolio/09-paywise-capital.png",
  },
  {
    id: 10,
    title: "Dental Clinic SEO",
    client: "SmileStudio",
    category: "SEO",
    description:
      "Service-page silo + schema markup for treatment keywords.",
    result: "Top 3 Ranking",
    gradient:
      "linear-gradient(135deg, #0F2A1F 0%, #4FC18A 55%, #1A1410 100%)",
    Icon: Search,
    image: "/images/portfolio/10-smilestudio.png",
  },
  {
    id: 11,
    title: "Luxury Hotel Branding",
    client: "The Royal Crest",
    category: "Branding",
    description:
      "Heritage monogram, in-room collateral & digital signage kit.",
    result: "5x Direct Bookings",
    gradient:
      "linear-gradient(135deg, #2A0F1A 0%, #B8456E 55%, #1A1410 100%)",
    Icon: Palette,
    image: "/images/portfolio/11-the-royal-crest.png",
  },
  {
    id: 12,
    title: "YouTube Strategy for Startup",
    client: "NexaTech Labs",
    category: "Social Media",
    description:
      "Long-form thought leadership series with short-form remix.",
    result: "1M+ Views",
    gradient:
      "linear-gradient(135deg, #2A1A0E 0%, #BD8A4E 55%, #1A1410 100%)",
    Icon: Share2,
    image: "/images/portfolio/12-nexatech-labs.png",
  },
];

/* ------------------------------------------------------------------ */
/*  Filter configuration                                               */
/* ------------------------------------------------------------------ */

export const FILTERS: ("All" | Category)[] = [
  "All",
  "Website",
  "SEO",
  "Social Media",
  "Branding",
];

/** per-category badge styling */
export const BADGE_STYLES: Record<
  Category,
  { badge: string; dot: string }
> = {
  Website: {
    badge: "bg-gold/15 text-gold border-gold/30",
    dot: "bg-gold",
  },
  SEO: {
    badge: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
    dot: "bg-emerald-400",
  },
  "Social Media": {
    badge: "bg-amber-700/20 text-amber-300 border-amber-500/30",
    dot: "bg-amber-500",
  },
  Branding: {
    badge: "bg-rose-500/15 text-rose-300 border-rose-400/30",
    dot: "bg-rose-400",
  },
};
