// Shared FAQ data — used by /faq page + FAQ section.
// Categorized: Services, Pricing, Process, Support — 5-6 questions each.

export type FAQCategoryName = "Services" | "Pricing" | "Process" | "Support";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQCategory {
  name: FAQCategoryName;
  label: string; // short label for sidebar/tabs
  description: string;
  items: FAQItem[];
}

export const faqCategories: FAQCategory[] = [
  {
    name: "Services",
    label: "Services",
    description: "What we do and how we can help your business grow.",
    items: [
      {
        id: "services-1",
        question: "What services does Social Viens offer?",
        answer:
          "We offer a comprehensive suite of digital marketing services including Website Development, SEO, Local SEO, Google Business Profile Optimization, Paid Advertising (Google Ads & Meta Ads), Social Media Marketing, Branding & Design, Marketing Automation, and Lead Generation. Each service is tailored to deliver measurable business growth — not vanity metrics.",
      },
      {
        id: "services-2",
        question: "Which industries do you specialize in?",
        answer:
          "We have deep expertise in Real Estate, Healthcare, Law Firms, E-commerce, Restaurants, Beauty & Salon, Education, Fitness, and Startups. Our industry-specific strategies are built on real campaign data — we've launched thousands of campaigns across these verticals and know what actually converts.",
      },
      {
        id: "services-3",
        question: "Do you offer a full-service retainer or project-based work?",
        answer:
          "Both. Most clients start with a 3-month pilot on a specific service (e.g. Google Ads or Local SEO) and expand into a full-service retainer once they see results. We also take on one-time projects like website redesigns, brand identity builds, and landing page development.",
      },
      {
        id: "services-4",
        question: "Can you work with our existing website and brand?",
        answer:
          "Yes. We frequently work with existing websites and brand identities — improving conversion rates, speed, and SEO without a full redesign. If a redesign is warranted, we'll tell you honestly and quote it separately. We never push unnecessary work.",
      },
      {
        id: "services-5",
        question: "Do you handle content creation or just strategy?",
        answer:
          "Both. Our in-house team includes copywriters, designers, video editors, and photographers. For specialised content (3D walkthroughs, drone footage, professional photoshoots), we have a vetted partner network. You get a single point of contact regardless of who's producing the work.",
      },
      {
        id: "services-6",
        question: "What makes your agency different from others?",
        answer:
          "We're growth-first, not deliverables-first. Every strategy is built around ROI, not vanity metrics. We combine premium creative direction with data-driven performance marketing and AI-powered systems. Plus, you get a dedicated growth team — not shared resources or junior account managers learning on your budget.",
      },
    ],
  },
  {
    name: "Pricing",
    label: "Pricing",
    description: "How we price, what's included, and how to budget.",
    items: [
      {
        id: "pricing-1",
        question: "How much does digital marketing cost?",
        answer:
          "Our pricing is customised based on your business goals, industry, and scope of work. We offer flexible packages starting from ₹25,000/month for small businesses and enterprise solutions for larger organisations. Book a free consultation to get a custom quote tailored to your needs — we won't waste your time with generic pricing.",
      },
      {
        id: "pricing-2",
        question: "Is there a minimum commitment period?",
        answer:
          "Our standard retainer is 3 months minimum — this gives us enough time to demonstrate real results (especially for SEO and brand-building work). After the initial 3 months, the contract becomes month-to-month. We don't believe in locking unhappy clients into annual contracts.",
      },
      {
        id: "pricing-3",
        question: "Do you charge separate ad management fees and ad spend?",
        answer:
          "Yes. Ad spend goes directly to Google/Meta (you're billed by them, we never touch the money). Our management fee covers strategy, creative, optimisation, and reporting. This separation keeps your ad spend transparent and ensures we're incentivised to optimise, not to inflate budgets.",
      },
      {
        id: "pricing-4",
        question: "What's included in your monthly retainer?",
        answer:
          "Depends on the scope, but typically includes: dedicated account manager, strategy calls (weekly or bi-weekly), campaign management and optimisation, creative production (ads, landing pages, social posts), real-time dashboard access, monthly performance reviews, and priority support via WhatsApp/Slack. Each retainer is custom-built — no two are identical.",
      },
      {
        id: "pricing-5",
        question: "Do you offer performance-based pricing?",
        answer:
          "For select clients with proven products and reliable tracking, we offer hybrid models — a reduced monthly retainer plus a performance bonus tied to revenue or qualified leads generated. This aligns our incentives with yours. We're selective about who we offer this to (it requires mutual trust and clean data).",
      },
      {
        id: "pricing-6",
        question: "Are there any setup or onboarding fees?",
        answer:
          "For new clients, we charge a one-time onboarding fee (₹15,000–₹40,000 depending on scope) that covers account audit, tracking setup, strategy document creation, and initial creative production. This is a one-time cost — your monthly retainer starts after onboarding is complete.",
      },
    ],
  },
  {
    name: "Process",
    label: "Process",
    description: "How we work, from first call to ongoing optimisation.",
    items: [
      {
        id: "process-1",
        question: "What's your onboarding process like?",
        answer:
          "Our onboarding takes 7–10 days: (Day 1) Kickoff call to align on goals, access, and communication. (Day 2–5) Account audit, competitor research, and tracking setup. (Day 6–8) Strategy document and 90-day roadmap review. (Day 9–10) Creative production and campaign launch. You'll know exactly what's happening each day — no black boxes.",
      },
      {
        id: "process-2",
        question: "How long does it take to see results?",
        answer:
          "Results vary by service and industry. Paid advertising typically shows initial results within 2–4 weeks and meaningful ROAS improvement by week 8. SEO and organic growth strategies take 3–6 months for significant results. Brand-building work compounds over 6–12 months. We provide weekly progress reports so you can track improvements from day one.",
      },
      {
        id: "process-3",
        question: "How often will we communicate?",
        answer:
          "Weekly strategy calls (30–45 minutes), monthly performance reviews (60 minutes, with a written report), and async communication via WhatsApp/Slack during business hours. For urgent items, our average response time is under 2 hours. You'll never wonder what's happening with your campaigns.",
      },
      {
        id: "process-4",
        question: "Who will be working on my account?",
        answer:
          "A dedicated team: an Account Manager (your single point of contact), a Strategist (oversees the plan), and 1–3 Specialists (executing the work — e.g. a Google Ads specialist, a designer, a copywriter). You meet the team in the kickoff call and they remain consistent throughout the engagement.",
      },
      {
        id: "process-5",
        question: "Do you provide reporting and dashboards?",
        answer:
          "Yes — we provide real-time dashboards (updated hourly) accessible 24/7, weekly performance reports via email, and monthly strategy reviews with a comprehensive written report. Our transparent reporting covers all key metrics including traffic, leads, conversions, ROAS, and revenue impact. You always know exactly where your investment is going.",
      },
      {
        id: "process-6",
        question: "What happens if I want to pause or cancel?",
        answer:
          "After the initial 3-month commitment, you can pause (hold campaigns for up to 60 days while keeping the team reserved) or cancel with 30 days' written notice. We hand over all creative assets, campaign data, and access cleanly — no hostage situations. Many of our cancelled clients come back within 6 months.",
      },
    ],
  },
  {
    name: "Support",
    label: "Support",
    description: "How to reach us and what to expect from our team.",
    items: [
      {
        id: "support-1",
        question: "How do I get in touch with my account team?",
        answer:
          "Three ways: WhatsApp (fastest — average response under 15 minutes during business hours), email (for detailed briefs and attachments — 4-hour response), and scheduled calls (book via Calendly link in your onboarding doc). For urgent ad-spend issues (campaign overspend, broken tracking), we have a 24/7 emergency line.",
      },
      {
        id: "support-2",
        question: "What are your business hours?",
        answer:
          "Monday–Saturday, 10:00 AM – 7:00 PM IST. We're closed on Sundays and major national holidays. However, ad campaigns run 24/7 and our monitoring alerts trigger outside business hours for critical issues (campaign down, tracking broken, budget exhausted early).",
      },
      {
        id: "support-3",
        question: "Do you offer support after project completion?",
        answer:
          "Yes. Every project includes 30 days of post-completion support (free) to handle bugs, tweaks, and questions. After that, we offer affordable monthly maintenance retainers (₹8,000–₹25,000/month depending on scope) for ongoing tweaks, security updates, and priority support.",
      },
      {
        id: "support-4",
        question: "Can I upgrade or downgrade my package mid-contract?",
        answer:
          "Yes, you can upgrade anytime (pro-rated for the remainder of the month). Downgrades take effect at the start of the next billing cycle. We don't make it hard to scale down — if your needs change, your package should too. Many clients start small, scale up as they see results, then scale back during slow seasons.",
      },
      {
        id: "support-5",
        question: "What if I'm not satisfied with the results?",
        answer:
          "First, we'll have an honest conversation about what's working and what's not. If we can't fix it within 30 days, you can exit the contract with no penalty (after the initial 3-month commitment). We retain 92% of our clients long-term — not because of contracts, but because the work performs. If it's not performing, we'd rather you find a better fit.",
      },
    ],
  },
];

// Flat list — useful for the FAQ section on homepage.
export const allFAQs: { category: FAQCategoryName; items: FAQItem[] }[] =
  faqCategories.map((c) => ({ category: c.name, items: c.items }));

// Quick contact options — used on the FAQ page CTA card.
export const faqContactOptions = [
  {
    label: "Call Us",
    value: "+91 81780 04800",
    href: "tel:+918178004800",
    icon: "Phone",
  },
  {
    label: "Email Us",
    value: "socialviens@gmail.com",
    href: "mailto:socialviens@gmail.com",
    icon: "Mail",
  },
  {
    label: "WhatsApp",
    value: "Chat with us instantly",
    href: "https://wa.me/918178004800?text=Hi%20Social%20Viens%2C%20I%20have%20a%20question",
    icon: "MessageCircle",
  },
];
