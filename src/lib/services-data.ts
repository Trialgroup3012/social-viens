/**
 * services-data.ts
 * Single source of truth for all 9 SOCIAL VIENS services.
 * Used by /services and /services/[slug] routes.
 *
 * The icon field stores a lucide-react icon NAME (string). Pages import a
 * small icon map to convert the string into a React component — this keeps
 * the data file free of client-only React imports so it can be safely
 * imported from server components.
 */

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServiceProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  title: string;
  /** Lucide icon name (e.g. "Globe", "Search"). See iconMap in pages. */
  icon: string;
  shortDescription: string;
  longDescription: string;
  benefits: string[];
  results: string;
  features: ServiceFeature[];
  process: ServiceProcessStep[];
  startingPrice: string;
  popular?: boolean;
  faqs: ServiceFAQ[];
  /** Optional AI-generated cover image (relative to /public). */
  coverImage?: string;
}

export const services: Service[] = [
  {
    slug: "website-design",
    title: "Website Development",
    coverImage: "/images/services/website-design.png",
    icon: "Globe",
    shortDescription:
      "Stunning, high-performance websites that convert visitors into customers.",
    longDescription:
      "We design and build conversion-optimized websites that blend premium aesthetics with technical excellence. Every site is mobile-first, lightning fast, SEO-ready, and engineered to turn visitors into paying customers. From brochure sites to complex web apps, our dev team delivers pixel-perfect experiences that scale with your business.",
    benefits: ["Custom Design", "Mobile-First", "Fast Loading", "SEO Ready"],
    results: "3x More Conversions",
    startingPrice: "₹25,000",
    popular: false,
    features: [
      {
        title: "Custom UI/UX Design",
        description:
          "Bespoke layouts crafted around your brand identity and conversion goals — never templates.",
      },
      {
        title: "Mobile-First Development",
        description:
          "Pixel-perfect responsive builds that look flawless on every device from 320px to 4K.",
      },
      {
        title: "Core Web Vitals Optimization",
        description:
          "Sub-2-second load times, perfect Lighthouse scores, and Google's preferred performance signals.",
      },
      {
        title: "SEO-Ready Architecture",
        description:
          "Semantic HTML, structured data, clean URLs, and optimized metadata baked in from day one.",
      },
      {
        title: "CMS Integration",
        description:
          "WordPress, Sanity, Strapi, or Payload — manage your content with a workflow that fits your team.",
      },
      {
        title: "Conversion Optimization",
        description:
          "Strategic CTAs, A/B-tested layouts, and frictionless forms designed to maximize lead capture.",
      },
      {
        title: "Analytics & Tracking",
        description:
          "GA4, Meta Pixel, Hotjar, and conversion events wired up so you can measure every interaction.",
      },
      {
        title: "Security & Maintenance",
        description:
          "SSL, firewall, daily backups, and ongoing updates to keep your site secure and current.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Discovery & Strategy",
        description:
          "We audit your brand, competitors, and audience to define the site architecture, goals, and conversion paths.",
      },
      {
        step: "02",
        title: "Design & Wireframe",
        description:
          "Low-fidelity wireframes evolve into high-fidelity Figma mockups with your brand identity and CTA strategy.",
      },
      {
        step: "03",
        title: "Development & QA",
        description:
          "Our engineers build the site in Next.js/WordPress, run cross-device QA, and optimize for speed and SEO.",
      },
      {
        step: "04",
        title: "Launch & Optimize",
        description:
          "We deploy, wire up analytics, monitor Core Web Vitals, and iterate based on real user behavior.",
      },
    ],
    faqs: [
      {
        q: "How long does a website take to build?",
        a: "A standard 5-7 page business site takes 3-4 weeks. E-commerce or custom web apps take 6-10 weeks depending on complexity. We share a detailed timeline after the discovery call.",
      },
      {
        q: "Do you redesign existing websites or only build new ones?",
        a: "Both. We can refresh your current site's design and performance, or build a brand-new site from scratch. A redesign typically takes 2-3 weeks since content is already in place.",
      },
      {
        q: "Will my website rank on Google?",
        a: "Every site we build is SEO-ready — semantic HTML, fast load times, structured data, and optimized metadata. For competitive rankings, pair the build with our SEO Services package for ongoing optimization.",
      },
      {
        q: "What tech stack do you use?",
        a: "For custom builds we use Next.js, TypeScript, and Tailwind. For content-managed sites we use WordPress, Sanity, or Payload CMS. We recommend the best stack based on your needs during discovery.",
      },
      {
        q: "Do you provide hosting and maintenance?",
        a: "Yes. We offer managed hosting on Vercel/AWS with daily backups, SSL, security monitoring, and monthly updates. Maintenance plans start at ₹5,000/month.",
      },
      {
        q: "Can I edit the website content myself?",
        a: "Absolutely. Every site includes a CMS so you can update text, images, and pages without touching code. We also provide a 1-hour training session after launch.",
      },
    ],
  },
  {
    slug: "seo-services",
    coverImage: "/images/services/seo-services.png",
    title: "SEO Services",
    icon: "Search",
    shortDescription:
      "Dominate search rankings and drive qualified organic traffic to your business.",
    longDescription:
      "Our full-spectrum SEO service combines technical audits, content strategy, on-page optimization, and authority-building link acquisition to push your website up the rankings. We target commercial-intent keywords that bring buyers — not just visitors — and back everything with transparent monthly reporting.",
    benefits: ["Keyword Strategy", "On-Page SEO", "Link Building", "Technical SEO"],
    results: "5x Organic Traffic",
    startingPrice: "₹15,000",
    popular: true,
    features: [
      {
        title: "Keyword Research & Strategy",
        description:
          "We identify high-intent, commercially-viable keywords with realistic ranking timelines and traffic potential.",
      },
      {
        title: "Technical SEO Audit",
        description:
          "Crawlability, indexability, schema markup, Core Web Vitals, and site architecture — all audited and fixed.",
      },
      {
        title: "On-Page Optimization",
        description:
          "Title tags, meta descriptions, headers, internal linking, and content optimization for every target page.",
      },
      {
        title: "Content Strategy & Creation",
        description:
          "Topic clusters, pillar pages, and SEO-optimized blog content that captures every stage of the funnel.",
      },
      {
        title: "Link Building",
        description:
          "White-hat outreach, guest posts, digital PR, and niche citations that build real domain authority.",
      },
      {
        title: "Local & Map SEO",
        description:
          "Google Business Profile optimization, local citations, and review strategy to win the local pack.",
      },
      {
        title: "Competitor Analysis",
        description:
          "We reverse-engineer what's working for your top competitors and build a strategy to outrank them.",
      },
      {
        title: "Monthly Reporting",
        description:
          "Transparent dashboards showing rankings, traffic, conversions, and ROI — no vanity metrics, ever.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Audit & Research",
        description:
          "Full technical audit, competitor analysis, keyword research, and content gap identification.",
      },
      {
        step: "02",
        title: "Strategy & Roadmap",
        description:
          "We build a 6-month SEO roadmap with target keywords, content calendar, and link acquisition plan.",
      },
      {
        step: "03",
        title: "Execution",
        description:
          "On-page fixes, technical optimizations, content production, and link building executed monthly.",
      },
      {
        step: "04",
        title: "Measure & Scale",
        description:
          "Monthly reporting, quarterly strategy reviews, and scaling what works to compound results.",
      },
    ],
    faqs: [
      {
        q: "How long until I see SEO results?",
        a: "Most clients see ranking improvements in months 2-3 and significant traffic growth by months 4-6. SEO compounds over time — the longer we work together, the stronger the results.",
      },
      {
        q: "Do you guarantee #1 rankings?",
        a: "No reputable agency can guarantee #1 — Google's algorithm has 200+ factors. What we guarantee is transparent execution of best-practice SEO, monthly reporting, and continuous optimization toward your goals.",
      },
      {
        q: "What's included in the monthly retainer?",
        a: "Technical fixes, on-page optimization for 5-10 target pages, 2-4 blog posts, 5-10 quality backlinks, rank tracking, and a monthly strategy call. Scope scales with the retainer tier.",
      },
      {
        q: "Do you write the content yourself?",
        a: "Yes. Our in-house content team includes SEO writers and editors who create optimized, original content. You review and approve every piece before publishing.",
      },
      {
        q: "Can you fix my existing website's SEO?",
        a: "Absolutely. We start every engagement with a full technical audit and provide a prioritized fix list. Most sites have quick wins we can implement in the first 30 days.",
      },
      {
        q: "What industries do you have SEO experience in?",
        a: "Real estate, healthcare, law, education, e-commerce, SaaS, hospitality, and local services. We adapt our strategy to your industry's competitive landscape.",
      },
    ],
  },
  {
    slug: "local-seo",
    coverImage: "/images/services/local-seo.png",
    title: "Local SEO",
    icon: "MapPin",
    shortDescription:
      "Become the top choice in your city with powerful local search optimization.",
    longDescription:
      "Local SEO puts your business in front of customers searching nearby. We optimize your Google Business Profile, build consistent local citations, manage reviews, and implement schema markup that signals to Google you're the most relevant local result — winning you the coveted map pack and a flood of nearby customers.",
    benefits: ["Google Maps", "Local Citations", "Reviews", "NAP Consistency"],
    results: "First Page Rankings",
    startingPrice: "₹10,000",
    popular: false,
    features: [
      {
        title: "Google Business Profile Optimization",
        description:
          "Complete profile setup, category optimization, service descriptions, photos, and post scheduling.",
      },
      {
        title: "Local Citation Building",
        description:
          "Consistent NAP (Name, Address, Phone) across 50+ directories including JustDial, Sulekha, and IndiaMART.",
      },
      {
        title: "Review Generation Strategy",
        description:
          "Automated review request flows, response templates, and reputation management for every new review.",
      },
      {
        title: "Local Link Building",
        description:
          "Sponsorships, local press, chamber of commerce, and geo-relevant backlinks that boost local authority.",
      },
      {
        title: "Location Page Creation",
        description:
          "SEO-optimized landing pages for every city/neighborhood you serve, targeting 'near me' searches.",
      },
      {
        title: "Schema Markup",
        description:
          "LocalBusiness, Review, and FAQ schema that helps Google understand and feature your business.",
      },
      {
        title: "Competitor Map Analysis",
        description:
          "We track who's winning the local pack in your area and reverse-engineer their strategy to beat them.",
      },
      {
        title: "Call & Direction Tracking",
        description:
          "CallRail integration to attribute calls, form fills, and direction requests to your local SEO efforts.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Local Audit",
        description:
          "Audit your Google Business Profile, local citations, reviews, and competitor map pack presence.",
      },
      {
        step: "02",
        title: "Optimize Foundation",
        description:
          "Fix NAP inconsistencies, fully optimize your GBP, and build out your local citation portfolio.",
      },
      {
        step: "03",
        title: "Build Authority",
        description:
          "Generate reviews weekly, build local backlinks, and create location pages for each service area.",
      },
      {
        step: "04",
        title: "Track & Scale",
        description:
          "Monitor map pack rankings, call volume, and direction requests — scale to additional locations.",
      },
    ],
    faqs: [
      {
        q: "How is Local SEO different from regular SEO?",
        a: "Local SEO focuses on winning the Google Map Pack and 'near me' searches for a specific geographic area. Regular SEO targets broader national or global keywords. Local SEO is essential for service businesses with a physical presence.",
      },
      {
        q: "How quickly will I see map pack improvements?",
        a: "Most clients see map pack movement within 4-6 weeks. Significant ranking jumps typically happen in months 2-3 as citations propagate and reviews accumulate.",
      },
      {
        q: "Do you handle review responses?",
        a: "Yes. We respond to every review (positive and negative) on your behalf using approved brand voice templates. This signals active management to Google and customers.",
      },
      {
        q: "Can you optimize multiple business locations?",
        a: "Absolutely. We have experience managing 10+ location portfolios. Each location gets its own GBP, citation set, and location page. Volume discounts apply.",
      },
      {
        q: "What if I don't have a physical storefront?",
        a: "Service-area businesses (SABs) can hide their address and list service areas instead. We optimize SAB profiles differently — focusing on service area coverage and proximity signals.",
      },
      {
        q: "Do you guarantee map pack rankings?",
        a: "We can't guarantee specific positions (Google's algorithm is too complex), but we guarantee execution of every local SEO best practice that influences rankings. Most clients reach the top 3 within 3-6 months.",
      },
    ],
  },
  {
    slug: "google-business-profile",
    coverImage: "/images/services/google-business-profile.png",
    title: "Google Business Profile",
    icon: "Building2",
    shortDescription:
      "Maximize your Google Business presence for more calls and directions.",
    longDescription:
      "Your Google Business Profile is the most important digital asset for local discovery. We set up, optimize, and actively manage your profile to maximize impressions, calls, direction requests, and bookings — with weekly posts, photo updates, Q&A management, and review responses that keep your profile fresh and competitive.",
    benefits: ["Profile Setup", "Optimization", "Review Management", "Posts"],
    results: "2x More Calls",
    startingPrice: "₹8,000",
    popular: false,
    features: [
      {
        title: "Full Profile Setup",
        description:
          "Complete creation or claim of your GBP with verified categories, services, hours, and attributes.",
      },
      {
        title: "Keyword-Optimized Description",
        description:
          "We craft a 750-character description loaded with commercial keywords that rank in local searches.",
      },
      {
        title: "Weekly Post Creation",
        description:
          "Offers, updates, events, and product posts published weekly to keep your profile active and engaging.",
      },
      {
        title: "Photo & Video Updates",
        description:
          "Monthly uploads of interior, exterior, team, and product photos — Google favors active profiles.",
      },
      {
        title: "Review Management",
        description:
          "Automated review request flows plus professional responses to every review within 24 hours.",
      },
      {
        title: "Q&A Management",
        description:
          "We seed and answer common questions on your profile to preempt customer objections.",
      },
      {
        title: "Messaging Setup",
        description:
          "Enable GBP messaging so customers can chat with you directly from search — we set up auto-responses.",
      },
      {
        title: "Insights & Reporting",
        description:
          "Monthly reports on impressions, calls, directions, and search queries driving your profile traffic.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Profile Audit",
        description:
          "Audit existing GBP for completeness, accuracy, and optimization opportunities.",
      },
      {
        step: "02",
        title: "Optimize & Verify",
        description:
          "Complete every field, add photos, verify ownership, and submit for Google's review.",
      },
      {
        step: "03",
        title: "Active Management",
        description:
          "Weekly posts, monthly photos, review responses, and Q&A seeding to keep the profile active.",
      },
      {
        step: "04",
        title: "Report & Refine",
        description:
          "Monthly insights review and strategy refinement based on what's driving calls and directions.",
      },
    ],
    faqs: [
      {
        q: "What if I haven't claimed my Google Business Profile yet?",
        a: "No problem — we handle the entire claim and verification process for you, including postcard verification if required. Most profiles are verified within 5-7 days.",
      },
      {
        q: "How often will you post on my profile?",
        a: "We publish 2-4 posts per week (offers, updates, products, events) and add new photos monthly. Active profiles get a significant ranking boost from Google.",
      },
      {
        q: "Can you remove negative reviews?",
        a: "We can't remove legitimate reviews, but we respond professionally to mitigate their impact. For fake or policy-violating reviews, we escalate to Google for removal — successful in ~40% of cases.",
      },
      {
        q: "Do I still need a website if I have a GBP?",
        a: "Yes. Your GBP drives local discovery, but your website is where conversions happen. Most high-intent customers visit your website before calling. We recommend both for maximum ROI.",
      },
      {
        q: "How is this different from your Local SEO service?",
        a: "GBP Management is a focused subset of Local SEO. It only covers your Google Business Profile. Local SEO includes GBP plus citations, location pages, schema, and link building. Choose GBP if you want to start small.",
      },
      {
        q: "What's the difference between GBP and Google Ads?",
        a: "GBP is free organic placement in the map pack. Google Ads is paid placement at the top of search results. Both work together — GBP builds long-term equity, Ads drive immediate leads.",
      },
    ],
  },
  {
    slug: "paid-ads-ppc",
    coverImage: "/images/services/paid-ads-ppc.png",
    title: "Paid Ads (PPC)",
    icon: "Megaphone",
    shortDescription:
      "High-ROI advertising campaigns that deliver measurable business results.",
    longDescription:
      "We architect profitable paid media campaigns across Google Ads, Meta (Facebook/Instagram), YouTube, and LinkedIn. Our performance marketing team obsesses over ROAS — combining laser-focused targeting, conversion-optimized ad creative, and relentless A/B testing to scale your revenue without wasting budget.",
    benefits: ["Google Ads", "Meta Ads", "YouTube Ads", "Retargeting"],
    results: "300% ROAS",
    startingPrice: "₹20,000",
    popular: false,
    features: [
      {
        title: "Google Search Ads",
        description:
          "Capture high-intent searches with keyword-targeted text ads optimized for Quality Score and CPC.",
      },
      {
        title: "Meta Ads (Facebook + Instagram)",
        description:
          "Visual campaigns with audience targeting, lookalikes, and Advantage+ shopping for D2C brands.",
      },
      {
        title: "YouTube Ads",
        description:
          "Skippable, non-skippable, and bumper ads that build awareness and retarget website visitors.",
      },
      {
        title: "Retargeting Campaigns",
        description:
          "Bring back website visitors with dynamic product ads and abandoned cart reminders across platforms.",
      },
      {
        title: "Landing Page Optimization",
        description:
          "We build, A/B test, and optimize dedicated landing pages for every ad group to maximize conversion rate.",
      },
      {
        title: "Conversion Tracking",
        description:
          "Server-side tracking, GA4 events, and Pixel setup so every rupee is attributed to revenue.",
      },
      {
        title: "Creative Testing",
        description:
          "Continuous ad copy and creative testing — we run 5-10 variants per ad group to find winners.",
      },
      {
        title: "Weekly Optimization",
        description:
          "Bid adjustments, negative keywords, audience exclusions, and budget reallocation every single week.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Strategy & Setup",
        description:
          "Account audit, competitor research, keyword/audience strategy, conversion tracking, and landing pages.",
      },
      {
        step: "02",
        title: "Launch & Test",
        description:
          "We launch campaigns with 5-10 creative variants per ad group and start gathering performance data.",
      },
      {
        step: "03",
        title: "Optimize & Scale",
        description:
          "Kill losers, scale winners, refine targeting, and reinvest budget into the highest-ROAS campaigns.",
      },
      {
        step: "04",
        title: "Expand & Automate",
        description:
          "Add new platforms, automate bidding with Smart Bidding, and build always-on retargeting funnels.",
      },
    ],
    faqs: [
      {
        q: "What's the minimum ad budget I need?",
        a: "We recommend a minimum of ₹30,000/month in ad spend (separate from our management fee) for Google or Meta. Lower budgets make it hard to gather enough data for optimization. E-commerce typically needs ₹50,000+ to scale profitably.",
      },
      {
        q: "How quickly will I see results?",
        a: "Google Search Ads often produce leads in the first 24-48 hours. Meta and YouTube take 1-2 weeks to optimize. We typically hit target ROAS within 30-45 days as the algorithm learns.",
      },
      {
        q: "What's your management fee structure?",
        a: "We charge a flat monthly retainer (starting at ₹20,000) or a percentage of ad spend (typically 15-20%) — whichever is higher. The fee covers strategy, creative, optimization, and reporting.",
      },
      {
        q: "Do you create the ad creatives?",
        a: "Yes. Our in-house design team creates static images, carousels, and short-form video ads. For larger productions (TVCs, brand films) we partner with production houses and manage the brief.",
      },
      {
        q: "Which platform should I start with?",
        a: "If you sell B2B or high-intent services (legal, healthcare, home services), start with Google Search. If you sell B2C lifestyle, fashion, or impulse-buy products, start with Meta. We'll recommend the best mix during strategy.",
      },
      {
        q: "How do you measure success?",
        a: "By ROAS (Return on Ad Spend) and Cost Per Acquisition (CPA), not vanity metrics like impressions or clicks. We tie every campaign to revenue and report on actual business outcomes monthly.",
      },
    ],
  },
  {
    slug: "social-media",
    coverImage: "/images/services/social-media.png",
    title: "Social Media Marketing",
    icon: "Share2",
    shortDescription:
      "Build a powerful social presence that drives brand awareness and sales.",
    longDescription:
      "We turn social media into a revenue channel — not just a brand awareness exercise. Our team handles content strategy, premium creative production, community management, and influencer partnerships across Instagram, Facebook, LinkedIn, YouTube, and X. Every post ladders up to business goals: engagement, leads, and sales.",
    benefits: ["Content Strategy", "Community", "Influencer", "Analytics"],
    results: "10x Engagement",
    startingPrice: "₹12,000",
    popular: false,
    features: [
      {
        title: "Content Strategy & Calendar",
        description:
          "Monthly content calendars with platform-specific themes, formats, and posting schedules aligned to goals.",
      },
      {
        title: "Premium Creative Production",
        description:
          "Scroll-stopping graphics, reels, carousels, and stories produced by our award-winning design team.",
      },
      {
        title: "Community Management",
        description:
          "We respond to comments, DMs, and mentions within 4 hours — building genuine relationships with your audience.",
      },
      {
        title: "Influencer Partnerships",
        description:
          "Sourcing, vetting, negotiation, and campaign management with micro and macro influencers in your niche.",
      },
      {
        title: "Paid Social Amplification",
        description:
          "Boost top-performing organic posts and run targeted paid campaigns to scale reach and conversions.",
      },
      {
        title: "User-Generated Content",
        description:
          "We design campaigns and contests that turn your customers into brand advocates creating authentic UGC.",
      },
      {
        title: "Social Listening",
        description:
          "Track brand mentions, competitor activity, and industry trends — turning insights into content opportunities.",
      },
      {
        title: "Analytics & Reporting",
        description:
          "Monthly reports on reach, engagement, follower growth, and most importantly — leads and sales attributed.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Audit & Strategy",
        description:
          "Audit current channels, competitors, and audience to define platform mix, voice, and content pillars.",
      },
      {
        step: "02",
        title: "Content Production",
        description:
          "Monthly batch production of graphics, reels, and copywriting — approved by you before publishing.",
      },
      {
        step: "03",
        title: "Publishing & Engagement",
        description:
          "Scheduled posts go live at peak times; we engage with comments and DMs daily to build community.",
      },
      {
        step: "04",
        title: "Analyze & Optimize",
        description:
          "Monthly performance review, content refinement, and amplification of winners via paid boost.",
      },
    ],
    faqs: [
      {
        q: "Which platforms should my business be on?",
        a: "It depends on your audience. B2B: LinkedIn + YouTube. Lifestyle/fashion: Instagram + TikTok. Local services: Instagram + Facebook. We recommend the optimal mix during strategy — usually 2-3 platforms to start.",
      },
      {
        q: "How often will you post?",
        a: "Typical cadence: Instagram 4-5 posts/week + daily stories, LinkedIn 3 posts/week, YouTube 1-2 videos/month. We tailor frequency to your audience and platform algorithms.",
      },
      {
        q: "Do you create the content or just schedule it?",
        a: "We do everything end-to-end: strategy, copywriting, graphic design, video editing, scheduling, and community management. You approve content before it goes live.",
      },
      {
        q: "Can you work with our in-house designer?",
        a: "Absolutely. We can take on strategy, scheduling, and community management while your team handles creative — or vice versa. We're flexible and collaborative.",
      },
      {
        q: "How do you measure social media ROI?",
        a: "Beyond vanity metrics, we track link clicks, lead form submissions, DMs to sales conversations, and revenue attributed via UTM tracking. We report on real business impact monthly.",
      },
      {
        q: "Do you handle influencer marketing?",
        a: "Yes. We have a network of 500+ vetted influencers across niches (fashion, food, fitness, tech, B2B). We handle sourcing, negotiation, briefs, contracts, and campaign reporting.",
      },
    ],
  },
  {
    slug: "branding",
    coverImage: "/images/services/branding.png",
    title: "Branding & Identity",
    icon: "Palette",
    shortDescription:
      "Craft a premium brand identity that commands attention and trust.",
    longDescription:
      "Your brand is the single most valuable intangible asset you own. We help you build it deliberately — from strategy and positioning to logo systems, visual identity, brand guidelines, and messaging frameworks. The result: a cohesive, premium brand that customers trust, employees champion, and competitors envy.",
    benefits: ["Brand Strategy", "Visual Identity", "Guidelines", "Messaging"],
    results: "Strong Brand Recall",
    startingPrice: "₹30,000",
    popular: false,
    features: [
      {
        title: "Brand Strategy & Positioning",
        description:
          "We define your purpose, values, personality, positioning, and unique value proposition through stakeholder workshops.",
      },
      {
        title: "Logo & Visual Identity",
        description:
          "Primary logo, logo variants, monogram, color palette, typography, and iconography — all crafted to feel premium.",
      },
      {
        title: "Brand Guidelines",
        description:
          "A 40-60 page brand book covering logo usage, color, typography, imagery, voice, and application examples.",
      },
      {
        title: "Messaging Framework",
        description:
          "Brand story, tagline, value propositions, elevator pitch, and tone of voice guidelines for every channel.",
      },
      {
        title: "Stationery & Collateral",
        description:
          "Business cards, letterheads, email signatures, presentation templates, and social media profile kits.",
      },
      {
        title: "Brand Photography Direction",
        description:
          "Photography style guide, shot lists, and art direction for brand photoshoots that capture your essence.",
      },
      {
        title: "Brand Voice & Copywriting",
        description:
          "We craft website copy, about page, brand manifesto, and key messaging pillars in your unique voice.",
      },
      {
        title: "Launch & Rollout Support",
        description:
          "We support your brand launch with social announcements, internal team training, and rollout checklists.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Discover & Strategize",
        description:
          "Stakeholder workshops, market research, and competitor analysis to define your brand foundation.",
      },
      {
        step: "02",
        title: "Design & Iterate",
        description:
          "Three logo directions, evolved into one preferred route with full visual identity system.",
      },
      {
        step: "03",
        title: "Codify & Document",
        description:
          "We build the brand guidelines, messaging framework, and all collateral templates.",
      },
      {
        step: "04",
        title: "Launch & Train",
        description:
          "We deliver all assets, train your team on usage, and support the brand launch across channels.",
      },
    ],
    faqs: [
      {
        q: "How long does a brand identity project take?",
        a: "A complete brand identity (strategy + visual system + guidelines) takes 6-8 weeks. Logo-only projects take 2-3 weeks. Full rebrands with messaging and collateral take 10-12 weeks.",
      },
      {
        q: "Do you offer logo design only?",
        a: "Yes, we offer standalone logo design packages starting at ₹15,000. However, we recommend the full identity system for cohesion — a logo alone rarely captures your full brand.",
      },
      {
        q: "How many logo concepts do I get?",
        a: "Three distinct directions in round one. We refine the preferred route through 2-3 rounds of revisions until you're 100% happy with the final mark.",
      },
      {
        q: "Do I own the brand assets outright?",
        a: "Yes. Upon final payment, all source files (AI, PSD, SVG, PNG, PDF) and fonts (where licensing permits) transfer to you with full commercial rights.",
      },
      {
        q: "Can you rebrand an existing business?",
        a: "Absolutely — rebrands are our specialty. We audit your current brand equity, identify what to keep vs. evolve, and manage a smooth transition that doesn't alienate existing customers.",
      },
      {
        q: "Do you handle brand implementation (website, signage, etc.)?",
        a: "Yes. Beyond the identity, we can apply your brand to website, packaging, signage, vehicle wraps, uniforms, and any other touchpoints through our partner network.",
      },
    ],
  },
  {
    slug: "automation",
    coverImage: "/images/services/automation.png",
    title: "Marketing Automation",
    icon: "Bot",
    shortDescription:
      "Automate repetitive tasks and nurture leads 24/7 with intelligent systems.",
    longDescription:
      "We build intelligent automation systems that work while you sleep — capturing, qualifying, and nurturing leads across email, WhatsApp, SMS, and chat. Our automations integrate with your CRM, website, and ad campaigns so no lead falls through the cracks and your team focuses on closing, not chasing.",
    benefits: ["Chatbots", "Email Flows", "CRM Integration", "Workflows"],
    results: "60% Time Saved",
    startingPrice: "₹18,000",
    popular: false,
    features: [
      {
        title: "Lead Capture Automation",
        description:
          "Smart forms, exit-intent popups, and chatbots that capture leads 24/7 with progressive profiling.",
      },
      {
        title: "Email Nurture Sequences",
        description:
          "Welcome, onboarding, abandoned cart, and re-engagement flows that turn cold leads into customers.",
      },
      {
        title: "WhatsApp Business Automation",
        description:
          "Official WhatsApp Business API setup with auto-replies, broadcast campaigns, and drip sequences.",
      },
      {
        title: "AI Chatbots",
        description:
          "Custom GPT-trained chatbots for your website and WhatsApp that qualify leads and answer FAQs 24/7.",
      },
      {
        title: "CRM Integration",
        description:
          "HubSpot, Zoho, Salesforce, or Pipedrive — we sync every lead and activity automatically.",
      },
      {
        title: "Lead Scoring & Routing",
        description:
          "Score leads by behavior and demographics, then auto-route hot leads to the right sales rep instantly.",
      },
      {
        title: "SMS & RCS Campaigns",
        description:
          "Transactional and promotional SMS plus next-gen RCS messages with rich media and CTAs.",
      },
      {
        title: "Reporting & Attribution",
        description:
          "Full-funnel attribution showing which automations drive revenue — not just opens and clicks.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Audit & Map",
        description:
          "Map your current customer journey, identify automation opportunities, and audit existing tools.",
      },
      {
        step: "02",
        title: "Build & Integrate",
        description:
          "We build workflows, integrate your CRM, set up chatbots, and connect all your marketing tools.",
      },
      {
        step: "03",
        title: "Test & Launch",
        description:
          "End-to-end testing of every flow, edge case handling, and staged rollout to your live audience.",
      },
      {
        step: "04",
        title: "Optimize & Scale",
        description:
          "Monitor conversion rates, A/B test messaging, and add new automations as your business scales.",
      },
    ],
    faqs: [
      {
        q: "What tools do you work with?",
        a: "HubSpot, ActiveCampaign, Klaviyo, Mailchimp, Zoho, Zapier, Make, Pipedrive, Salesforce, and custom builds with Node.js. We recommend the best stack for your budget and complexity.",
      },
      {
        q: "Can you build a custom chatbot for my website?",
        a: "Yes. We build GPT-powered chatbots trained on your business data (website, FAQs, docs) that handle FAQs, qualify leads, and book meetings — deployed on website, WhatsApp, or both.",
      },
      {
        q: "How long does an automation project take?",
        a: "Simple email flows: 1-2 weeks. Full multi-channel automation with CRM integration: 4-6 weeks. Enterprise-grade systems with custom chatbots: 8-12 weeks.",
      },
      {
        q: "Do I need a CRM in place first?",
        a: "Helpful but not required. If you don't have one, we'll recommend and set up the right CRM for your business size and budget (often HubSpot Free or Zoho Bigin).",
      },
      {
        q: "How do you measure automation success?",
        a: "By time saved, leads captured automatically, conversion rate of automated flows, and revenue attributed to automation. We provide monthly ROI reports.",
      },
      {
        q: "Can you automate WhatsApp marketing?",
        a: "Yes — using the official WhatsApp Business API via partners like Interakt, Wati, or AiSensy. We set up templates, broadcasts, drip campaigns, and chatbots — fully compliant with WhatsApp's policies.",
      },
    ],
  },
  {
    slug: "lead-generation",
    coverImage: "/images/services/lead-generation.png",
    title: "Lead Generation",
    icon: "Target",
    shortDescription:
      "Generate a steady stream of qualified leads with conversion-focused funnels.",
    longDescription:
      "We build end-to-end lead generation engines that deliver qualified, sales-ready leads predictably. From high-converting landing pages and lead magnets to multi-channel traffic, automated nurturing, and CRM routing — every step is engineered to maximize qualified lead volume at the lowest possible cost per lead.",
    benefits: ["Landing Pages", "Funnels", "A/B Testing", "Lead Magnets"],
    results: "5x More Leads",
    startingPrice: "₹15,000",
    popular: false,
    features: [
      {
        title: "High-Converting Landing Pages",
        description:
          "Custom-designed, A/B-tested landing pages optimized for one specific conversion goal — built in Webflow or Next.js.",
      },
      {
        title: "Lead Magnet Creation",
        description:
          "Ebooks, checklists, templates, webinars, and free audits that compel prospects to share their contact info.",
      },
      {
        title: "Multi-Channel Traffic",
        description:
          "Google Ads, Meta Ads, LinkedIn Ads, and SEO — we drive qualified traffic from the channels your buyers use.",
      },
      {
        title: "Conversion-Focused Funnels",
        description:
          "Complete funnel architecture: traffic → landing page → opt-in → nurture → sales call → close.",
      },
      {
        title: "A/B Testing Program",
        description:
          "Continuous testing of headlines, copy, CTAs, forms, and offers to compound conversion rate over time.",
      },
      {
        title: "Lead Qualification & Scoring",
        description:
          "We score and route leads by ICP fit and intent so your sales team only talks to sales-ready prospects.",
      },
      {
        title: "Email & WhatsApp Nurture",
        description:
          "Automated 5-7 touch sequences across email and WhatsApp that warm cold leads into sales conversations.",
      },
      {
        title: "ROI Tracking & Reporting",
        description:
          "Cost per lead, lead-to-close rate, and revenue per channel — full-funnel attribution in real-time dashboards.",
      },
    ],
    process: [
      {
        step: "01",
        title: "ICP & Offer Strategy",
        description:
          "Define your ideal customer profile, craft irresistible offers, and design the lead magnet.",
      },
      {
        step: "02",
        title: "Build Funnel Assets",
        description:
          "Landing pages, lead magnets, email sequences, CRM routing, and conversion tracking — all built.",
      },
      {
        step: "03",
        title: "Launch Traffic",
        description:
          "We launch paid + organic traffic campaigns and start filling your pipeline with qualified leads.",
      },
      {
        step: "04",
        title: "Optimize & Scale",
        description:
          "A/B test every element, kill underperforming campaigns, and scale winners to drive down CPL.",
      },
    ],
    faqs: [
      {
        q: "What's a good cost per lead (CPL)?",
        a: "It varies wildly by industry and channel. B2B SaaS: ₹500-2,000. Real estate: ₹200-800. Local services: ₹50-300. We benchmark against your industry and continuously optimize to drive CPL down.",
      },
      {
        q: "Do you guarantee a specific number of leads?",
        a: "We can't guarantee exact numbers (lead gen depends on many variables), but we commit to a target CPL range and lead volume based on your budget and industry benchmarks. We hit targets in 80%+ of cases within 60 days.",
      },
      {
        q: "What's included in the monthly retainer?",
        a: "Landing page A/B testing, lead magnet creation, ad campaign management, email nurture sequences, CRM optimization, and weekly reporting. Ad spend is separate and we recommend minimum ₹30,000/month.",
      },
      {
        q: "Do you handle lead qualification?",
        a: "Yes. We implement lead scoring based on ICP fit (industry, size, role) and intent (pages visited, content downloaded). Only sales-ready leads get routed to your team — saving hours of qualification time.",
      },
      {
        q: "Can you integrate with our existing CRM?",
        a: "Yes — HubSpot, Zoho, Salesforce, Pipedrive, or any custom CRM with an API. We sync leads in real-time with full attribution data so your sales team has context on every lead.",
      },
      {
        q: "How quickly will leads start coming in?",
        a: "With paid traffic, leads typically start within 3-5 days of campaign launch. Volume scales as the algorithm optimizes — usually hitting target CPL by week 3-4. Organic (SEO) lead gen takes 3-6 months to compound.",
      },
    ],
  },
];

/** Look up a single service by its slug. Returns undefined if not found. */
export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** Get the N most related services (excluding the current slug). */
export function getRelatedServices(slug: string, count = 4): Service[] {
  return services.filter((s) => s.slug !== slug).slice(0, count);
}

/** Return all slugs — used by generateStaticParams. */
export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}
