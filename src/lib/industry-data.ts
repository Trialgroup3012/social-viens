/**
 * industry-data.ts
 * ----------------
 * Single source of truth for the 12 SEO industry-landing pages per
 * Spec §5.2 (Real Estate, Medical, Law Firm, Startup/IT, Restaurant,
 * Education, Ecommerce, Salon, Fitness, Event Shoots, SEO Ranking,
 * Brand Shoot).
 *
 * Each `IndustryPage` object is consumed by:
 *   - the shared `IndustryLandingPage` client template
 *   - the per-slug `app/[slug]/page.tsx` server routes
 *   - JSON-LD schema generators in `lib/schema.ts`
 *
 * The `icon` field stores a lucide-react icon NAME (string). The shared
 * template imports an icon map to convert the string to a React component
 * — keeping this file free of client-only React imports so it can be
 * safely imported from server components.
 *
 * CRITICAL: every industry has its OWN challenges, audience, compliance
 * constraints, and channel mix. Do NOT duplicate copy across industries.
 * Real estate is not restaurant is not legal is not medical. Each page
 * reads as if written by a specialist, not a generalist agency.
 */

export interface IndustryCard {
  icon: string;
  title: string;
  description: string;
}

export interface IndustryProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface IndustryStat {
  value: number;
  suffix: string;
  label: string;
}

export interface IndustryFAQ {
  q: string;
  a: string;
}

export interface IndustryCaseStudy {
  client: string;
  challenge: string;
  solution: string;
  results: string[];
}

export interface IndustryPage {
  slug: string;
  title: string;
  h1: string;
  targetKeyword: string;
  category: string;
  /** Lucide icon name (string — resolved via iconMap in the template). */
  icon: string;
  heroSubtitle: string;
  metaTitle: string;
  metaDescription: string;
  /** Optional AI-generated cover image (relative to /public). */
  coverImage?: string;

  overviewTitle: string;
  overviewText: string; // ~400 words unique

  whyChooseUs: IndustryCard[];
  processSteps: IndustryProcessStep[];
  benefits: IndustryCard[];
  stats: IndustryStat[];
  faqs: IndustryFAQ[];
  caseStudy?: IndustryCaseStudy;

  /** Slugs of sibling industry pages. */
  relatedServices: string[];
}

/* ====================================================================== */
/*  1. REAL ESTATE MARKETING                                               */
/* ====================================================================== */

const realEstateMarketing: IndustryPage = {
  slug: "real-estate-marketing",
  coverImage: "/images/industries/real-estate.png",
  title: "Real Estate Marketing",
  h1: "Real Estate Marketing",
  targetKeyword: "real estate marketing",
  category: "Real Estate",
  icon: "Building2",
  heroSubtitle:
    "Sell out launches, fill vacant units, and build broker pipelines — without burning brokerage on low-intent leads. Performance marketing engineered for developers, brokers, and REITs across Delhi NCR.",
  metaTitle:
    "Real Estate Marketing Agency in Delhi NCR | Property Lead Generation | SOCIAL VIENS",
  metaDescription:
    "Real estate marketing that fills your sales pipeline with qualified buyers and investors. RERA-compliant campaigns, virtual tours, broker enablement. 40+ projects launched. Free strategy session.",
  overviewTitle: "Marketing built for property developers, not generic agencies",
  overviewText:
    "Real estate is the hardest category in Indian performance marketing. Inventory is expensive, sales cycles stretch 90 to 180 days, buyers research across 6 to 9 touchpoints before booking, and one wrong creative can attract RERA scrutiny that shuts down a campaign overnight. Most generic agencies apply a one-size-fits-all lead-gen playbook — boost a Facebook post, route the leads to a call centre, and call it done. The result is a pipeline full of tyre-kickers, RERA violations, broker channel conflict, and a CAC that eats the entire margin on a 2BHK sale. Our real estate marketing practice is built specifically for the complexity of this category, withdevelopers, organised brokers, and REITs in Delhi NCR. We build full-funnel campaigns that match how property buyers actually behave: discovery on Instagram Reels and YouTube Shorts, validation through Google Search and Project Pages, consideration through virtual tours and site-visit microsites, and conversion through WhatsApp-led sales conversations and CRM-routed broker handoffs. Every campaign is RERA-compliant from creative approval through landing-page disclaimers — we know the difference between carpet area and built-up area, we know what cannot be promised in an ad, and we know how to file creatives for RERA pre-approval in each state. Our team has launched 40+ residential and commercial projects across Gurgaon, Noida, Dwarka Expressway, and South Delhi, and we have lived through the post-GST, post-RERA reset that killed half the marketing tactics developers used to rely on. We integrate directly with your CRM (Salesforce, HubSpot, LeadSquared, or PropTiger's broker stack) so every lead is scored, routed, and nurtured with the right cadence of WhatsApp messages, retargeting ads, and site-visit invites. We also build virtual-tour microsites, drone walkthrough reels, and broker-enablement kits — because in 2025, a buyer in Delhi who has not seen the unit on video does not book it. Whether you are launching a luxury tower in South Delhi, an affordable project in Greater Noida, or a commercial space on Dwarka Expressway, our playbook is engineered to deliver qualified site visits — not vanity leads.",
  whyChooseUs: [
    {
      icon: "Building2",
      title: "Developer-grade campaign ops",
      description:
        "We have launched 40+ residential and commercial projects in Delhi NCR. Our campaign templates, lead-scoring models, and broker-routing logic are purpose-built for the cadence of property launches — not retail e-commerce.",
    },
    {
      icon: "ShieldCheck",
      title: "RERA-compliant by default",
      description:
        "Every creative, landing page, and lead form is reviewed against RERA advertising guidelines before launch. Carpet area, pricing claims, project registration numbers — all surfaced correctly so your campaign never gets pulled mid-launch.",
    },
    {
      icon: "Users",
      title: "Broker enablement, not conflict",
      description:
        "We design campaigns that fill your broker channel rather than cannibalising it. Co-branded landing pages, broker-attributed WhatsApp funnels, and lead-routing rules that respect your channel-partner agreements.",
    },
    {
      icon: "Camera",
      title: "Virtual tour + drone content",
      description:
        "In-house production team shoots 4K drone walkthroughs, 360-degree unit tours, and amenity reels. Buyers who watch a virtual tour are 3.4x more likely to book a site visit — we make that content production-grade.",
    },
  ],
  processSteps: [
    {
      step: "01",
      title: "Project Positioning",
      description:
        "We map the project to its buyer personas — end-user vs investor, NRI vs resident, first-home vs upgrade — and craft the USP, price ladder, and launch narrative.",
    },
    {
      step: "02",
      title: "Creative + Microsite",
      description:
        "Drone walkthrough, 360-degree virtual tour, amenity reels, floor-plan carousel, RERA-compliant microsite with site-visit booking flow. Delivered in 2 weeks.",
    },
    {
      step: "03",
      title: "Launch Campaign",
      description:
        "Meta, Google Search, YouTube, and Programmatic — layered with RERA-compliant disclaimers and broker-attributed funnels. Live in 5 business days after creative approval.",
    },
    {
      step: "04",
      title: "Lead Nurturing + Sales",
      description:
        "CRM-integrated WhatsApp cadence, retargeting, site-visit invites, and broker handoff rules. Weekly pipeline reviews with your sales head — every lead accounted for.",
    },
  ],
  benefits: [
    {
      icon: "TrendingUp",
      title: "Qualified site visits, not leads",
      description:
        "Our lead-scoring model filters out tyre-kickers before they reach your sales team. Average 38% of our leads convert to confirmed site visits — vs 9% industry average.",
    },
    {
      icon: "Gauge",
      title: "Lower CAC per booking",
      description:
        "We track cost-per-site-visit and cost-per-booking, not cost-per-lead. Average developer client sees 41% lower CAC per confirmed booking within 90 days.",
    },
    {
      icon: "Smartphone",
      title: "WhatsApp-first funnel",
      description:
        "70% of Delhi NCR property buyers prefer WhatsApp over phone calls. We route, nurture, and qualify leads on WhatsApp — with human handoff only for sales-ready conversations.",
    },
    {
      icon: "MapPinned",
      title: "Geo-targeted launches",
      description:
        "Pin-code-level targeting for catchment buyers, plus radius targeting around competitor projects, employment hubs, and existing resident clusters.",
    },
    {
      icon: "BarChart3",
      title: "Broker attribution reporting",
      description:
        "Every lead is attributed to a broker, channel partner, or direct source — so your channel conflict disappears and your broker payouts are defensible.",
    },
    {
      icon: "ShieldCheck",
      title: "RERA-safe campaigns",
      description:
        "We pre-clear every creative against RERA advertising rules — carpet area, registration number, pricing claims — so your campaign never gets pulled mid-launch.",
    },
  ],
  stats: [
    { value: 40, suffix: "+", label: "Projects launched" },
    { value: 38, suffix: "%", label: "Lead-to-site-visit rate" },
    { value: 41, suffix: "%", label: "Lower CAC per booking" },
    { value: 180, suffix: "+", label: "Bookings driven" },
  ],
  faqs: [
    {
      q: "How much does real estate marketing cost in Delhi NCR?",
      a: "Our real estate retainers start at ₹1,50,000/month for a single project launch (including creative production, microsite, and paid media management) and scale to ₹8,00,000+/month for portfolio campaigns across multiple projects. Project-launch packages with a 6-week sprint typically land at ₹4,50,000 — ₹7,50,000 plus ad spend. We provide a fixed-scope proposal after a 45-minute discovery call.",
    },
    {
      q: "How do you make campaigns RERA-compliant?",
      a: "Every creative is reviewed against the RERA advertising guidelines for the project's state — including mandatory disclosures (project registration number, promoter name, carpet area, completion date), prohibited claims (guaranteed returns, fictitious pricing), and disclaimer placement. We file creatives for pre-approval with your RERA consultant before launch and maintain an audit log of every variation.",
    },
    {
      q: "Do you work with brokers or only with developers directly?",
      a: "Both. We design campaigns that fill your broker channel — co-branded landing pages, broker-attributed WhatsApp funnels, and lead-routing rules that respect your channel-partner agreements. We do NOT bypass your broker network — we make it more productive by feeding it qualified, attributed leads.",
    },
    {
      q: "How long until I see bookings from a campaign?",
      a: "Site visits begin within 7 days of launch. First confirmed bookings typically land in week 4-6 for residential, week 8-12 for luxury or commercial. Real estate has a long sales cycle — any agency promising bookings in week 1 is either lying or selling low-intent leads. We optimise for cost-per-site-visit first, then cost-per-booking, with weekly pipeline reviews.",
    },
    {
      q: "Can you handle NRI and international buyer campaigns?",
      a: "Yes — we run NRI-focused campaigns targeting Dubai, Singapore, and the US/UK Indian diaspora via Meta, Google, and programmatic. We handle currency disclaimers, FEMA-compliant messaging, and time-zone-aware WhatsApp funnels. NRI leads convert at lower volume but 2.3x higher ticket size.",
    },
    {
      q: "Do you also build the project microsite and virtual tour?",
      a: "Yes — both are included in launch packages. Microsite is a fast-loading, mobile-first Next.js build with floor plans, amenities, location map, RERA disclosures, and a site-visit booking flow. Virtual tour is a 360-degree unit walkthrough plus a drone site reel — produced in-house by our content team.",
    },
  ],
  caseStudy: {
    client: "Premium residential project, Dwarka Expressway (name withheld under NDA)",
    challenge:
      "Developer had 220 unsold units across 3 towers, 9 months from possession. Previous agency burned ₹38 lakh on Meta ads with 4 confirmed bookings and a 92% tyre-kicker rate. Sales team had stopped trusting digital leads entirely.",
    solution:
      "We rebuilt the funnel from scratch: new microsite with RERA disclosures and virtual tour, drone walkthrough reels, broker-attributed WhatsApp funnel, Meta + YouTube + Google Search layered campaign, and weekly lead-scoring reviews with the sales head. Banned the previous agency's 'lowest price guaranteed' creative that was attracting bargain-hunters.",
    results: [
      "Site-visit rate jumped from 9% to 41% within 60 days",
      "Cost per confirmed booking dropped 47% (₹14.2 lakh → ₹7.6 lakh)",
      "147 qualified site visits in first 90 days, 22 confirmed bookings",
      "Sales team's trust in digital leads restored within 4 weeks",
    ],
  },
  relatedServices: [
    "seo-ranking",
    "brand-shoot",
    "event-shoots-management",
    "ecommerce-marketing",
  ],
};

/* ====================================================================== */
/*  2. MEDICAL MARKETING                                                   */
/* ====================================================================== */

const medicalMarketing: IndustryPage = {
  slug: "medical-marketing",
  coverImage: "/images/industries/medical.png",
  title: "Medical Marketing",
  h1: "Medical Marketing",
  targetKeyword: "medical marketing",
  category: "Healthcare",
  icon: "Stethoscope",
  heroSubtitle:
    "Fill appointment slots with the right patients — not just any patients. Healthcare-specific marketing for clinics, hospitals, dental practices, and specialist doctors across Delhi NCR.",
  metaTitle:
    "Medical Marketing Agency in Delhi NCR | Healthcare Digital Marketing | SOCIAL VIENS",
  metaDescription:
    "Medical marketing that fills appointment calendars with qualified patients. HIPAA-aware funnels, doctor personal branding, Map Pack dominance. 60+ clinics served. Free strategy session.",
  overviewTitle: "Healthcare marketing built around patients, not clicks",
  overviewText:
    "Healthcare is the most regulated category in performance marketing. Drug-name restrictions, ASA and MCI advertising guidelines, patient privacy norms, and a buyer journey that is fundamentally different from retail — patients do not impulse-buy a knee replacement. Most agencies apply retail tactics to medical marketing and produce one of two outcomes: campaigns that get pulled for non-compliance, or campaigns that flood the clinic with low-intent enquiries that drain the front-desk team. Our medical marketing practice is built specifically for clinics, hospitals, dental practices, dermatology centres, IVF clinics, and specialist doctors across Delhi NCR. We understand the patient journey: discovery through symptom-driven Google searches ('knee pain specialist South Delhi'), validation through doctor bios and Google reviews, consideration through educational content on YouTube and Instagram, and conversion through online appointment booking or WhatsApp. Every campaign we run for a healthcare client starts with a compliance review — what can be said, what cannot, which disclaimers are mandatory, which patient testimonials are usable. We map this to the MCI Code of Ethics, the Drugs and Magic Remedies Act, and Google's healthcare ad policies — so your campaign stays live and your medical council registration stays clean. Our healthcare-specialist content team includes writers who have worked in medical communications and can produce patient-education content that is accurate, accessible, and engaging — without overclaiming or making regulated promises. We build doctor personal-brand assets: professional bios, treatment-explainer videos, patient-testimonial reels (with proper consent), and LinkedIn thought-leadership content for referring-physician outreach. Local SEO is critical for medical practices — 46% of patient searches end in a Map Pack click — so we optimise your Google Business Profile aggressively, manage reviews (with compliant solicitation flows), and build neighbourhood-level landing pages for each clinic location and speciality. We integrate with Practo, Lybrate, HMS, and custom hospital ERPs so appointment bookings flow straight into your calendar with no double-entry. We have served 60+ clinics, hospitals, and specialist practices across Delhi NCR, including dental, dermatology, IVF, orthopaedics, cardiology, ophthalmology, cosmetic surgery, paediatrics, and mental health. Whether you are a single-doctor clinic in Lajpat Nagar or a 200-bed hospital in Gurgaon, our playbook is engineered to fill appointment calendars with the right patients, not just any patients.",
  whyChooseUs: [
    {
      icon: "ShieldCheck",
      title: "Compliance-first creative",
      description:
        "Every creative, landing page, and patient testimonial is reviewed against MCI Code of Ethics, the Drugs and Magic Remedies Act, and Google's healthcare ad policies. We do not put your medical registration at risk for a click.",
    },
    {
      icon: "Stethoscope",
      title: "Medical-specialist writers",
      description:
        "Our content team includes writers with medical communications backgrounds. Patient-education articles, treatment-explainer videos, and doctor bios — accurate, accessible, and free of regulated overclaims.",
    },
    {
      icon: "MapPinned",
      title: "Map Pack dominance",
      description:
        "46% of patient searches end in a Map Pack click. We optimise your Google Business Profile for every clinic location and speciality — so you rank #1 for 'dermatologist near me' in your service radius.",
    },
    {
      icon: "Calendar",
      title: "Appointment integration",
      description:
        "Online bookings flow directly into Practo, Lybrate, HMS, or your custom ERP — no double-entry, no missed leads. Patients can book in 3 taps from any ad or page.",
    },
  ],
  processSteps: [
    {
      step: "01",
      title: "Compliance Audit",
      description:
        "We review your current marketing against MCI, Drugs and Magic Remedies Act, and Google healthcare policies. Every flagged item gets a fix-it plan before any new campaign goes live.",
    },
    {
      step: "02",
      title: "Doctor + Practice Branding",
      description:
        "We craft your doctor bios, treatment-explainer videos, patient-testimonial reels (with consent), and LinkedIn thought-leadership content — so patients trust you before they meet you.",
    },
    {
      step: "03",
      title: "Local SEO + Content Engine",
      description:
        "Google Business Profile optimisation, neighbourhood landing pages, symptom-driven blog content, and YouTube long-form — ranking for the searches your patients actually do.",
    },
    {
      step: "04",
      title: "Patient Acquisition",
      description:
        "Meta, Google Search, and YouTube campaigns with appointment-booking integrations. Lead scoring filters tyre-kickers; only qualified bookings hit your calendar.",
    },
  ],
  benefits: [
    {
      icon: "TrendingUp",
      title: "More qualified appointments",
      description:
        "Average clinic client sees 2.8x lift in qualified appointments within 90 days. We optimise for cost-per-booking, not cost-per-lead.",
    },
    {
      icon: "MapPinned",
      title: "Top 3 in Map Pack",
      description:
        "We move your clinic into the top 3 of Google Maps for your speciality and neighbourhood — where 46% of patient searches convert.",
    },
    {
      icon: "Users",
      title: "Doctor personal brand",
      description:
        "Patients choose doctors, not clinics. We build your professional bio, treatment-explainer videos, and patient-testimonial reels with proper consent.",
    },
    {
      icon: "Smartphone",
      title: "WhatsApp appointment flow",
      description:
        "70% of Delhi NCR patients prefer WhatsApp for healthcare enquiries. We route, qualify, and book appointments on WhatsApp with calendar sync.",
    },
    {
      icon: "ShieldCheck",
      title: "Compliant testimonials",
      description:
        "Patient testimonials with proper written consent, MCI-compliant messaging, and no regulated claims. Marketing that protects your medical registration.",
    },
    {
      icon: "BarChart3",
      title: "Speciality-specific funnels",
      description:
        "Dental, IVF, dermatology, orthopaedics, cardiology — each speciality has its own buyer journey. We do not apply the same funnel to a root canal and a knee replacement.",
    },
  ],
  stats: [
    { value: 60, suffix: "+", label: "Clinics served" },
    { value: 2.8, suffix: "x", label: "Lift in appointments" },
    { value: 46, suffix: "%", label: "Map Pack conversion" },
    { value: 3, suffix: "tap", label: "Booking flow" },
  ],
  faqs: [
    {
      q: "Can we run ads for medical services in India?",
      a: "Yes — but with restrictions. Google allows healthcare ads in India with proper certification (Google Healthcare ad policy). Meta requires pre-approval for certain categories. The MCI Code of Ethics and the Drugs and Magic Remedies Act govern what can be said. We handle certification, ad-copy compliance, and creative review so your campaign stays live and your medical council registration stays clean.",
    },
    {
      q: "How do you handle patient testimonials?",
      a: "Patient testimonials are powerful but regulated. We use only testimonials with written, signed consent, with no regulated claims (cure guarantees, before/after with medical promises), and we keep a consent-and-release form on file for every testimonial we publish. We never use stock images of patients or fabricated testimonials.",
    },
    {
      q: "How much does medical marketing cost?",
      a: "Our healthcare retainers start at ₹50,000/month for a single-doctor clinic and scale to ₹3,00,000+/month for multi-speciality hospitals. Most clinic engagements land in the ₹75,000 — ₹1,50,000/month range. We provide a fixed-scope proposal after a free audit of your current digital presence.",
    },
    {
      q: "How long does it take to rank in the Map Pack?",
      a: "Map Pack movement typically happens in 30-60 days for non-competitive specialities, 60-90 days for competitive ones (dentist, dermatologist in dense areas like Lajpat Nagar). We optimise your Google Business Profile, build neighbourhood landing pages, and run compliant review-acquisition flows that move you up the rankings.",
    },
    {
      q: "Do you work with super-speciality hospitals?",
      a: "Yes. We have served single-doctor clinics, multi-speciality hospitals, IVF centres, and super-speciality practices (cardiology, oncology, neurology). Each engagement is staffed with a healthcare-specialist strategist who understands the patient journey, referral dynamics, and compliance requirements for that speciality.",
    },
    {
      q: "Can you integrate with our hospital ERP or Practo?",
      a: "Yes — we integrate with Practo, Lybrate, HMS, MediRoute, LeadSquared for Healthcare, and custom hospital ERPs. Online bookings flow directly into your calendar with no double-entry, and follow-up cadences are automated through WhatsApp and email.",
    },
  ],
  caseStudy: {
    client: "Multi-chain dental clinic, South + East Delhi (6 locations)",
    challenge:
      "Chain had 6 locations but ranked outside the top 10 in Map Pack for 'dentist near me' in 4 of them. Booking conversion from website was 1.8%. Front desk was overwhelmed with low-intent enquiries that did not convert to chairs filled.",
    solution:
      "Rebuilt Google Business Profiles for all 6 locations with neighbourhood-specific content. Added WhatsApp-first booking flow with treatment-specific routing (root canal vs aligner vs cleaning). Built doctor personal-brand pages with consented patient testimonials. Compliant Meta + Google campaigns focused on cost-per-chair-filled.",
    results: [
      "5 of 6 locations in Map Pack top 3 within 90 days",
      "Booking conversion rate 1.8% → 6.4%",
      "Cost per booked appointment dropped 52%",
      "Front-desk enquiry handling time cut by 60% via WhatsApp routing",
    ],
  },
  relatedServices: [
    "seo-ranking",
    "brand-shoot",
    "education-marketing",
    "law-firm-marketing",
  ],
};

/* ====================================================================== */
/*  3. LAW FIRM MARKETING                                                   */
/* ====================================================================== */

const lawFirmMarketing: IndustryPage = {
  slug: "law-firm-marketing",
  coverImage: "/images/industries/law-firm.png",
  title: "Law Firm Marketing",
  h1: "Law Firm Marketing",
  targetKeyword: "law firm marketing",
  category: "Legal Services",
  icon: "Scale",
  heroSubtitle:
    "Build a pipeline of high-value retainer clients — without violating Bar Council rules. Marketing engineered for advocates, law firms, and legal-tech practices across Delhi NCR.",
  metaTitle:
    "Law Firm Marketing Agency in Delhi NCR | Lawyer SEO & Lead Gen | SOCIAL VIENS",
  metaDescription:
    "Law firm marketing that fills your practice with high-value retainer clients. Bar Council-compliant campaigns, case-result content, practice-area SEO. Free strategy session.",
  overviewTitle: "Marketing that respects the robe and builds the practice",
  overviewText:
    "Legal marketing in India is governed by the Bar Council of India Rules, which prohibit solicitation, advertising of services, and direct client outreach. Most agencies either ignore this (and put your Bar Council registration at risk) or refuse to do any marketing at all (and leave your practice invisible to clients searching for legal help online). Our law firm marketing practice threads the needle: we use the channels the rules permit — educational content, thought-leadership, professional directories, search-engine optimisation, and brand awareness campaigns — to make you the obvious choice when a potential client searches for legal expertise. We work with individual senior advocates, boutique law firms, and full-service legal practices across Delhi NCR. We understand the difference between practice-area pages that read like genuine expertise (permitted) and direct solicitation pages (prohibited). We know how to write case-result content that shares learnings without naming clients or soliciting similar matters. We know how to build LinkedIn thought-leadership that positions you as the go-to authority in your practice area — corporate litigation, M&A, IPR, family law, criminal defence, real estate disputes, GST, taxation, arbitration — without crossing the line into advertising. Search is the most important channel for legal practices. When a corporate client needs a lawyer for an M&A matter, the GC's team searches Google, reads 3-5 firms' practice-area pages, checks LinkedIn for the partners' recent posts, and shortlists. If you are not visible in those searches, you do not get shortlisted. We build search-optimised practice-area pages that rank for the queries your clients actually use — 'M&A lawyer Delhi', 'IPR litigation firm India', 'GST appeal advocate Delhi NCR'. We optimise your Google Business Profile for the Map Pack, build out a content calendar of legal updates and case analyses, and run compliant LinkedIn personal-brand campaigns for partners. We have helped advocates and law firms across Delhi NCR build practices that are visible online without compromising Bar Council compliance. We know the rules — and we know how to market within them.",
  whyChooseUs: [
    {
      icon: "Scale",
      title: "Bar Council-compliant by design",
      description:
        "Every page, post, and campaign is reviewed against the Bar Council of India Rules on advertising and solicitation. We do not put your registration at risk for a click.",
    },
    {
      icon: "PenTool",
      title: "Legal-content specialists",
      description:
        "Our content team includes writers with legal backgrounds who can draft case-result summaries, practice-area pages, and legal updates that read as expertise — not advertising.",
    },
    {
      icon: "Search",
      title: "Practice-area SEO",
      description:
        "We rank your practice-area pages for the queries corporate GCs and individual clients actually search — 'M&A lawyer Delhi', 'GST appeal advocate', 'IPR litigation firm'.",
    },
    {
      icon: "Users",
      title: "Partner personal branding",
      description:
        "LinkedIn thought-leadership for senior partners — case analyses, legal updates, regulatory commentary — that positions you as the go-to authority in your practice area.",
    },
  ],
  processSteps: [
    {
      step: "01",
      title: "Compliance Review",
      description:
        "We audit your current website and marketing against Bar Council of India Rules. Flagged items get a fix-it plan before any new content goes live.",
    },
    {
      step: "02",
      title: "Practice-Area Pages",
      description:
        "Search-optimised pages for each practice area you serve — corporate, litigation, IPR, real estate, family, tax — written as expertise, not solicitation.",
    },
    {
      step: "03",
      title: "Content Engine",
      description:
        "Weekly legal updates, case analyses, and regulatory commentary published on your blog and LinkedIn. Position yourself as the authority in your practice area.",
    },
    {
      step: "04",
      title: "Lead Intake",
      description:
        "Compliant intake form on your site captures enquiries from clients who need your expertise. Routed to the right partner via CRM, with full audit trail.",
    },
  ],
  benefits: [
    {
      icon: "TrendingUp",
      title: "More retainer enquiries",
      description:
        "Average law firm client sees 3.2x lift in qualified retainer enquiries within 6 months — from GCs, founders, and individual clients searching for legal expertise.",
    },
    {
      icon: "Search",
      title: "Top 3 for practice-area keywords",
      description:
        "We move your practice-area pages into the top 3 of Google for the queries corporate GCs actually search — 'M&A lawyer Delhi', 'IPR litigation firm'.",
    },
    {
      icon: "Users",
      title: "Partner authority",
      description:
        "LinkedIn thought-leadership for senior partners — case analyses, legal updates, regulatory commentary — that builds your personal brand as the go-to authority.",
    },
    {
      icon: "ShieldCheck",
      title: "Bar Council-safe",
      description:
        "Every page, post, and campaign is reviewed against the Bar Council Rules on advertising and solicitation. Marketing that protects your registration.",
    },
    {
      icon: "PenTool",
      title: "Case-result content",
      description:
        "We write case-result summaries that share learnings without naming clients or soliciting similar matters — expertise-driven, not advertising-driven.",
    },
    {
      icon: "BarChart3",
      title: "Practice-area-specific funnels",
      description:
        "Corporate, litigation, IPR, family, tax — each practice area has its own buyer journey. We do not apply the same funnel to an M&A retainer and a family dispute.",
    },
  ],
  stats: [
    { value: 35, suffix: "+", label: "Advocates served" },
    { value: 3.2, suffix: "x", label: "Retainer enquiries" },
    { value: 6, suffix: "mo", label: "Avg time to top 3" },
    { value: 100, suffix: "%", label: "BCI compliant" },
  ],
  faqs: [
    {
      q: "Are lawyers allowed to market themselves in India?",
      a: "The Bar Council of India Rules restrict direct advertising and solicitation but permit informative communication about practice areas, expertise, and educational content. We work strictly within these rules — search-optimised practice-area pages, educational blog content, LinkedIn thought-leadership, and directory listings — without ever crossing into solicitation. We do not put your registration at risk.",
    },
    {
      q: "Can we run Google or Meta ads for our law firm?",
      a: "Direct advertising of legal services is restricted. However, educational content, brand-awareness campaigns, and awareness of practice areas may be permissible depending on the jurisdiction and format. We advise on the lines you can and cannot cross, and we build campaigns that stay on the permitted side. Each strategy is reviewed against the current BCI guidelines before launch.",
    },
    {
      q: "How long does SEO take to rank a law firm website?",
      a: "Practice-area keyword rankings typically move in 90-120 days for low-competition long-tails, 6-9 months for competitive head terms ('corporate lawyer Delhi'). Legal SEO is competitive because every firm is competing for the same corporate GC searches — but the firms that publish consistently and optimise their practice-area pages will rank. We provide a 12-month roadmap with quarterly milestones.",
    },
    {
      q: "How much does law firm marketing cost?",
      a: "Our retainers for law firms start at ₹40,000/month for a single advocate and scale to ₹2,00,000+/month for full-service firms with multiple practice areas. Most engagements land in the ₹60,000 — ₹1,20,000/month range. SEO is the highest-ROI channel for legal — we recommend a 6-month minimum commitment to see meaningful rankings.",
    },
    {
      q: "Do you write the legal content yourself?",
      a: "Yes — our content team includes writers with legal backgrounds who draft practice-area pages, case-result summaries, and legal updates. All content is reviewed by you (the advocate) before publication. We never fabricate case results, never name clients without consent, and never make claims that could be construed as solicitation.",
    },
    {
      q: "Can you build personal brands for senior partners?",
      a: "Yes — LinkedIn thought-leadership for partners is one of our highest-ROI offerings. We draft case analyses, legal updates, and regulatory commentary in your voice, optimise your LinkedIn profile for search, and run a consistent posting cadence that builds your authority in your practice area. Average partner sees 3-5x profile-view growth in 90 days.",
    },
  ],
  caseStudy: {
    client: "Boutique corporate litigation firm, Delhi (name withheld under NDA)",
    challenge:
      "Firm had 4 partners and a strong track record in NCLT matters, but was invisible online. Referral pipeline was ageing. Corporate GCs searching 'NCLT lawyer Delhi' could not find them. Website was a 5-page brochure from 2018.",
    solution:
      "Rebuilt site with 12 practice-area pages written as expertise. Published 2 case-result summaries per month (with client consent and anonymisation). Ran LinkedIn thought-leadership for all 4 partners. SEO-focused on long-tail NCLT, IBC, and corporate-dispute keywords.",
    results: [
      "Top 3 ranking for 'NCLT lawyer Delhi' within 7 months",
      "5 inbound retainer enquiries from GCs in first 90 days",
      "Partner LinkedIn profile views up 4.2x in 6 months",
      "Inbound retainer revenue exceeded retainer cost 8:1 in year 1",
    ],
  },
  relatedServices: [
    "seo-ranking",
    "medical-marketing",
    "startup-it-support",
    "brand-shoot",
  ],
};

/* ====================================================================== */
/*  4. STARTUP & IT SUPPORT                                                 */
/* ====================================================================== */

const startupItSupport: IndustryPage = {
  slug: "startup-it-support",
  coverImage: "/images/industries/startup-it.png",
  title: "Startup & IT Marketing",
  h1: "Startup & IT Marketing",
  targetKeyword: "startup marketing",
  category: "Startups & SaaS",
  icon: "Rocket",
  heroSubtitle:
    "Go from launch to PMF to Series A — with marketing that investors can underwrite. Founder-led growth for SaaS, D2C, fintech, and deep-tech startups across Delhi NCR.",
  metaTitle:
    "Startup Marketing Agency in Delhi NCR | SaaS & Founder-Led Growth | SOCIAL VIENS",
  metaDescription:
    "Startup marketing that compounds — founder-led growth, ProductHunt launches, B2B funnels, investor narratives. 30+ startups served across SaaS, D2C, fintech. Free strategy session.",
  overviewTitle: "Marketing that earns you a term sheet — not just traffic",
  overviewText:
    "Startups do not need an agency that ships 'campaigns'. They need a growth partner who can architect the funnel from launch to product-market fit to Series A, build the narrative investors can underwrite, and instrument every metric so the next round is a data conversation, not a story. Most agencies apply enterprise tactics to startups and produce bloated retainers, vanity dashboards, and a launch that does not compound. Our startup marketing practice is built specifically for the constraints and pace of early-stage companies. We work with SaaS, D2C, fintech, healthtech, edtech, and deep-tech startups across Delhi NCR — pre-seed to Series B. We have shipped ProductHunt launches that hit #1, B2B LinkedIn funnels that drove 6-figure ARR, and D2C growth campaigns that turned ₹1 lakh ad budgets into ₹8 lakh months. Our founder-led growth playbook is built around the channels that actually compound for startups: founder personal brand on LinkedIn and Twitter, content marketing that ranks and educates, product-led signup funnels with activation tracking, paid acquisition layered once CAC:LTV is known, and a brand narrative that turns your pitch deck into a customer-acquisition asset. We do not sell you a 12-month retainer before we have validated the funnel. We start with a 90-day sprint that finds your ICP, validates your messaging, instruments your funnel end-to-end, and proves that your CAC is fundable. If it is, we scale. If it is not, we tell you before you burn runway chasing the wrong segment. We integrate with your stack from day one — Segment, Mixpanel, Amplitude, HubSpot, Stripe, Razorpay, Posthog, Vercel Analytics — so attribution is clean and your investor updates write themselves. We understand the specific tactics that work for B2B SaaS (founder-led outbound, community-led growth, free-tier activation, expansion via product usage), D2C (creator partnerships, retention-led LTV, WhatsApp post-purchase flows), fintech (compliance-aware ad copy, trust-building content, UPI-led onboarding), and deep-tech (technical content marketing, conference talks, GitHub-led developer funnels). Whether you are a 2-person pre-seed team in a co-working space in Gurgaon or a 50-person Series A SaaS in Noida, our playbook is engineered to compound — not to look busy.",
  whyChooseUs: [
    {
      icon: "Rocket",
      title: "Founder-led growth specialists",
      description:
        "We architect the founder personal-brand engine on LinkedIn and Twitter that compounds into inbound pipeline. 70% of B2B SaaS pipeline for our clients now originates from founder content.",
    },
    {
      icon: "BarChart3",
      title: "Investor-grade attribution",
      description:
        "We instrument your funnel end-to-end in Segment, Mixpanel, Amplitude, or Posthog — so your investor updates write themselves and your next round is a data conversation.",
    },
    {
      icon: "Target",
      title: "ICP validation first",
      description:
        "We do not run paid ads until we have validated your ICP, messaging, and CAC:LTV. The 90-day sprint finds your fundable funnel before you burn runway chasing the wrong segment.",
    },
    {
      icon: "Zap",
      title: "Launch sprint specialists",
      description:
        "ProductHunt, LinkedIn, Twitter, and HackerNews launch playbooks that have hit #1 on ProductHunt multiple times and driven 6-figure ARR signups in 48 hours.",
    },
  ],
  processSteps: [
    {
      step: "01",
      title: "ICP + Funnel Audit",
      description:
        "We map your ideal customer profile, audit your current funnel end-to-end, instrument attribution, and validate (or kill) the messaging hypothesis. Deliverable: growth strategy doc.",
    },
    {
      step: "02",
      title: "Founder Brand + Content",
      description:
        "Founder LinkedIn/Twitter content engine, blog posts that rank, product-led signup flow with activation tracking. Compounding pipeline from day 30.",
    },
    {
      step: "03",
      title: "Launch Sprint",
      description:
        "ProductHunt, LinkedIn, Twitter, and community-led launch — 2-week sprint designed to drive 4-figure signups and validate your funnel at scale.",
    },
    {
      step: "04",
      title: "Paid Acquisition",
      description:
        "Once CAC:LTV is validated, we layer paid acquisition — Google, Meta, LinkedIn, programmatic — with weekly CAC payback reviews and quarterly scale-up plans.",
    },
  ],
  benefits: [
    {
      icon: "TrendingUp",
      title: "Fundable CAC in 90 days",
      description:
        "Our 90-day sprint validates (or kills) your funnel hypothesis before you burn runway. Average startup client has a fundable CAC:LTV ratio by day 90 — or knows exactly why not.",
    },
    {
      icon: "Users",
      title: "Founder-led inbound",
      description:
        "70% of B2B SaaS pipeline for our clients now originates from founder content on LinkedIn and Twitter. Compounding, free, and impossible for competitors to copy.",
    },
    {
      icon: "BarChart3",
      title: "Investor-grade metrics",
      description:
        "Every funnel step instrumented in Segment, Mixpanel, Amplitude, or Posthog. Your investor updates write themselves; your next round is a data conversation.",
    },
    {
      icon: "Zap",
      title: "Launch that compounds",
      description:
        "ProductHunt launches that have hit #1, B2B LinkedIn funnels that drove 6-figure ARR, D2C campaigns that turned ₹1 lakh into ₹8 lakh months. Playbooks that work.",
    },
    {
      icon: "Code",
      title: "Technical content",
      description:
        "Developer funnels, GitHub-led growth, conference talk decks, technical blog posts. We can write for an engineering audience — not just a marketing one.",
    },
    {
      icon: "ShieldCheck",
      title: "Compliance-aware",
      description:
        "Fintech, healthtech, edtech — we know the compliance lines you cannot cross in ad copy and onboarding flows. Marketing that does not get your license pulled.",
    },
  ],
  stats: [
    { value: 30, suffix: "+", label: "Startups served" },
    { value: 90, suffix: "days", label: "To fundable CAC" },
    { value: 6, suffix: "x", label: "Founder-led ARR" },
    { value: 4, suffix: "x", label: "ProductHunt #1 hits" },
  ],
  faqs: [
    {
      q: "We are pre-seed — can we afford a marketing agency?",
      a: "Probably not a full retainer — and we will tell you that honestly. For pre-seed startups, we offer a 30-day founder-brand sprint (₹40,000) that sets up your LinkedIn content engine, audit your funnel, and gives you a 90-day growth roadmap you can execute yourself. We are not the agency for startups that need cheap execution — we are the agency for startups that need a fundable funnel.",
    },
    {
      q: "How much do startup marketing retainers cost?",
      a: "Our retainers start at ₹1,00,000/month for a seed-stage startup (founder brand + content + funnel instrumentation) and scale to ₹3,50,000+/month for Series A+ companies with multi-channel paid acquisition. We typically engage in 90-day sprints with quarterly renewal — no 12-month lock-in. If the funnel is not fundable by day 90, we tell you.",
    },
    {
      q: "Can you help with our ProductHunt or launch day?",
      a: "Yes — launch sprint is one of our highest-ROI offerings. We have hit #1 ProductHunt of the Day multiple times, driven 6-figure ARR signups in 48 hours, and architected B2B LinkedIn launches that produced inbound demos for 60+ days after launch. Launch is a 2-week sprint with a 4-week pre-launch buildup.",
    },
    {
      q: "Do you do paid ads or only organic?",
      a: "Both — but we layer paid only after organic has validated the ICP and messaging. We have seen too many startups burn ₹10 lakh on Meta ads before discovering their ICP was wrong. Our 90-day sprint instruments attribution, validates the funnel organically, and then layers paid acquisition once CAC:LTV is known.",
    },
    {
      q: "Can you write technical content for developer audiences?",
      a: "Yes — our content team includes writers who can produce technical blog posts, GitHub READMEs, API documentation marketing, conference talk decks, and developer-led growth content. We have written for SaaS, devtools, and deep-tech startups where the buyer is a senior engineer or VP of Engineering.",
    },
    {
      q: "Do you help with investor narrative and pitch decks?",
      a: "Yes — we help craft the growth narrative for pitch decks, build the metrics slides from your instrumented funnel, and prep founders for the growth questions investors will ask. We are not a deck-design shop, but we are the growth partner that makes your growth slides defensible in a Series A diligence call.",
    },
  ],
  caseStudy: {
    client: "B2B SaaS startup, HR-tech vertical (name withheld under NDA)",
    challenge:
      "Seed-funded startup with ₹50 lakh runway left. CAC:LTV was unknown. Founder was posting on LinkedIn irregularly. Paid ads had burned ₹8 lakh with no attributed pipeline. Investor updates were a spreadsheet of vanity metrics.",
    solution:
      "90-day sprint: instrumented funnel in Mixpanel + HubSpot, validated ICP (mid-market HR leaders, not enterprise), built founder LinkedIn content engine (3 posts/week), killed the broad Meta ads, layered LinkedIn founder-led outbound + retargeting.",
    results: [
      "Founder LinkedIn became #1 pipeline source within 60 days",
      "First ₹12 lakh ARR closed from inbound founder content",
      "CAC payback dropped from 'unknown' to 7 months",
      "Series A term sheet secured 4 months after sprint end",
    ],
  },
  relatedServices: [
    "seo-ranking",
    "ecommerce-marketing",
    "brand-shoot",
    "law-firm-marketing",
  ],
};

/* ====================================================================== */
/*  5. RESTAURANT MARKETING                                                 */
/* ====================================================================== */

const restaurantMarketing: IndustryPage = {
  slug: "restaurant-marketing",
  coverImage: "/images/industries/restaurant.png",
  title: "Restaurant Marketing",
  h1: "Restaurant Marketing",
  targetKeyword: "restaurant marketing",
  category: "Restaurants & F&B",
  icon: "UtensilsCrossed",
  heroSubtitle:
    "Fill tables, drive delivery orders, and build a foodie following — without burning money on Zomato discounting. Instagram-led growth for restaurants, QSRs, and cloud kitchens in Delhi NCR.",
  metaTitle:
    "Restaurant Marketing Agency in Delhi NCR | Food & Beverage Growth | SOCIAL VIENS",
  metaDescription:
    "Restaurant marketing that fills tables and drives delivery orders. Instagram reels, Zomato/Swiggy optimisation, reservation funnels. 80+ F&B brands served. Free strategy session.",
  overviewTitle: "Marketing that fills tables — not just impresses food bloggers",
  overviewText:
    "Restaurant marketing in Delhi NCR is brutally competitive. The city has over 50,000 listed restaurants on Zomato, the average Delhi foodie scrolls Instagram for 47 minutes a day watching food content, and a single bad review can knock 12% off a restaurant's monthly revenue. Most agencies apply retail e-commerce tactics to restaurants — generic Meta ads, discount-led promotions that train customers to never pay full price, and food-blogger outreach that produces vanity posts but no covers filled. Our restaurant marketing practice is built specifically for the economics and pace of the F&B industry. We work with fine-dining restaurants, QSR chains, cafes, cloud kitchens, bakeries, and bars across Delhi NCR — from Hauz Khas to Cyber Hub to Khan Market to Hudson Lane. We understand the unit economics: a 30% food cost, a 4x rent-to-revenue ceiling, a delivery commission of 18-25%, and a customer LTV that lives or dies on the third visit. Every campaign we run for an F&B client is measured against covers filled, average bill value, repeat-customer rate, and delivery order volume — not vanity engagement. Our in-house content team shoots food reels on-site (we have a 48-hour shoot-to-publish SLA for daily specials), produces menu-engineering photography, and runs Instagram content calendars that turn your feed into the foodie destination your target customer scrolls daily. We build reservation funnels with Dineout, EasyDiner, and direct-booking integrations, optimise your Zomato and Swiggy listings for search and conversion (photos, menu structure, review velocity), and run review-acquisition flows that lift your aggregate rating without ever buying fake reviews. We understand cloud kitchen economics — we have built dark-kitchen brands from 0 to 500 orders/day, optimised aggregator listing performance, and built direct-order funnels via WhatsApp that bypass aggregator commissions entirely. We have served 80+ F&B brands across Delhi NCR, including Michelin-mentioned fine-dining, 30-location QSR chains, bakery D2C brands, and craft cocktail bars. Whether you are launching a new cafe in Shahpur Jat or scaling a QSR from 5 to 30 locations, our playbook is engineered to fill tables and drive orders — not to chase food blogger vanity metrics.",
  whyChooseUs: [
    {
      icon: "UtensilsCrossed",
      title: "F&B-specialist content team",
      description:
        "Our content team has shot for Michelin-mentioned fine-dining and 30-location QSR chains. 48-hour shoot-to-publish SLA for daily specials, menu-engineering photography, and Instagram reels that actually convert.",
    },
    {
      icon: "Star",
      title: "Aggregator optimisation",
      description:
        "We optimise your Zomato and Swiggy listings — photos, menu structure, review velocity, search keywords — to lift your aggregate rating and your listing conversion rate.",
    },
    {
      icon: "Calendar",
      title: "Reservation funnels",
      description:
        "Dineout, EasyDiner, and direct-booking integrations. WhatsApp-first reservation flow that captures the 70% of Delhi foodies who prefer WhatsApp over phone calls.",
    },
    {
      icon: "BarChart3",
      title: "Covers-filled attribution",
      description:
        "Every campaign is measured against covers filled, average bill value, repeat-customer rate, and delivery order volume — not vanity engagement or food blogger posts.",
    },
  ],
  processSteps: [
    {
      step: "01",
      title: "Menu + Concept Audit",
      description:
        "We audit your menu economics, concept positioning, and current digital presence. Identify hero dishes worth content investment, weak menu items dragging the bill, and aggregator listing gaps.",
    },
    {
      step: "02",
      title: "Content Engine",
      description:
        "On-site shoot day produces 30 days of Instagram reels, menu photography, and chef-feature content. 48-hour shoot-to-publish SLA for daily specials.",
    },
    {
      step: "03",
      title: "Aggregator Optimisation",
      description:
        "Zomato + Swiggy listing optimisation — photos, menu structure, review solicitation flows. Most clients see 18-32% lift in aggregator conversion within 60 days.",
    },
    {
      step: "04",
      title: "Acquisition + Retention",
      description:
        "Meta + Google paid campaigns for new customer acquisition. WhatsApp post-visit flows for retention. Weekly covers-filled and order-volume reports.",
    },
  ],
  benefits: [
    {
      icon: "TrendingUp",
      title: "More covers filled",
      description:
        "Average F&B client sees 2.4x lift in covers filled within 90 days — measured against actual POS data, not vanity engagement.",
    },
    {
      icon: "Star",
      title: "Higher aggregator rating",
      description:
        "Compliant review-acquisition flows lift your Zomato and Swiggy aggregate rating by 0.2-0.5 points within 90 days — without ever buying fake reviews.",
    },
    {
      icon: "Smartphone",
      title: "Direct-order WhatsApp funnel",
      description:
        "Cloud kitchen clients bypass aggregator commissions with direct-order WhatsApp funnels. Average 22% of order volume moved off-aggregator within 6 months.",
    },
    {
      icon: "Camera",
      title: "Daily content cadence",
      description:
        "48-hour shoot-to-publish SLA for daily specials, seasonal menus, and chef features. Your Instagram feed becomes a foodie destination, not a brochure.",
    },
    {
      icon: "Calendar",
      title: "Reservation optimisation",
      description:
        "Dineout, EasyDiner, and direct-booking integrations. WhatsApp-first reservation flow captures the 70% of Delhi foodies who prefer WhatsApp over phone calls.",
    },
    {
      icon: "BarChart3",
      title: "Repeat-customer focus",
      description:
        "We track repeat-customer rate, not just new-customer acquisition. WhatsApp post-visit flows and birthday/anniversary cadences that lift LTV.",
    },
  ],
  stats: [
    { value: 80, suffix: "+", label: "F&B brands served" },
    { value: 2.4, suffix: "x", label: "Lift in covers" },
    { value: 22, suffix: "%", label: "Off-aggregator orders" },
    { value: 48, suffix: "hr", label: "Content SLA" },
  ],
  faqs: [
    {
      q: "How much does restaurant marketing cost in Delhi NCR?",
      a: "Our restaurant retainers start at ₹40,000/month for a single-location cafe or QSR and scale to ₹2,50,000+/month for multi-location chains. Most single-location engagements land in the ₹50,000 — ₹90,000/month range. Content production (shoot days, photography) is billed separately at ₹15,000 — ₹40,000 per shoot day depending on scope.",
    },
    {
      q: "Do you also handle Zomato and Swiggy optimisation?",
      a: "Yes — aggregator optimisation is one of our highest-ROI offerings for F&B clients. We optimise your listing photos, menu structure, item descriptions, review-acquisition flows, and search keywords. Most clients see 18-32% lift in aggregator conversion within 60 days — meaning more orders from the same listing traffic.",
    },
    {
      q: "Can you help us reduce dependence on Zomato/Swiggy commissions?",
      a: "Yes — for cloud kitchens and direct-to-consumer F&B brands, we build WhatsApp direct-order funnels that bypass aggregator commissions entirely. Average cloud kitchen client moves 22% of order volume off-aggregator within 6 months — directly improving unit economics by 4-7 percentage points of margin.",
    },
    {
      q: "How often do you shoot content for our restaurant?",
      a: "Standard cadence is one full shoot day per month (producing 30 days of Instagram reels, menu photography, and chef features). For high-volume concepts we shoot weekly. We have a 48-hour shoot-to-publish SLA for daily specials — meaning if you launch a new dish on Friday, the reel is live by Sunday.",
    },
    {
      q: "Do you work with food bloggers and influencers?",
      a: "Yes — strategically, not as a vanity play. We have a curated Delhi NCR food-creator network (50+ creators across fine-dining, casual, QSR, and cloud kitchen niches) and we handle briefing, negotiation, content approval, and performance tracking. We do not pay for fake reviews or pay-to-play posts — only genuine creator partnerships with disclosed compensation.",
    },
    {
      q: "Can you help launch a new restaurant?",
      a: "Yes — restaurant launches are one of our specialties. We have launched 15+ new restaurants in Delhi NCR with a 6-week pre-launch + 4-week post-launch sprint: teaser content, influencer preview nights, soft-launch WhatsApp funnels, opening-week PR, and a paid acquisition campaign that fills tables from day one.",
    },
  ],
  caseStudy: {
    client: "Cloud kitchen brand, 3 locations in South Delhi (name withheld under NDA)",
    challenge:
      "Cloud kitchen was losing 28% of margin to Zomato/Swiggy commissions. Direct-order volume was 4% of total. Instagram following was 1,200. Customer repeat rate was 14%.",
    solution:
      "Built WhatsApp direct-order funnel with menu, ordering, payment, and delivery tracking. Launched Instagram content engine with daily reels and weekly chef features. Layered Meta retargeting for existing customers with a 30-day repeat-order campaign.",
    results: [
      "Direct-order volume 4% → 26% within 6 months",
      "Aggregate margin lifted by 5.8 percentage points",
      "Instagram following 1,200 → 18,400 in 6 months",
      "Customer repeat rate 14% → 31% via WhatsApp retention flows",
    ],
  },
  relatedServices: [
    "brand-shoot",
    "event-shoots-management",
    "seo-ranking",
    "salon-marketing",
  ],
};

/* ====================================================================== */
/*  6. EDUCATION MARKETING                                                  */
/* ====================================================================== */

const educationMarketing: IndustryPage = {
  slug: "education-marketing",
  coverImage: "/images/industries/education.png",
  title: "Education Marketing",
  h1: "Education Marketing",
  targetKeyword: "education marketing",
  category: "Education & EdTech",
  icon: "GraduationCap",
  heroSubtitle:
    "Fill admission calendars with the right students — without burning commission on lead-gen vendors. Performance marketing for schools, coaching institutes, colleges, and edtech startups.",
  metaTitle:
    "Education Marketing Agency in Delhi NCR | Admissions & EdTech Growth | SOCIAL VIENS",
  metaDescription:
    "Education marketing that fills admission calendars. Course-funnel optimisation, parent/student segments, YouTube long-form, compliant lead gen. 50+ institutions served. Free strategy session.",
  overviewTitle: "Marketing built around admissions calendars — not generic lead gen",
  overviewText:
    "Education marketing in India is fundamentally different from retail. The buyer is rarely the user — parents decide, students influence, and the sales cycle often stretches 6-12 months with multiple decision touchpoints. Most agencies apply retail lead-gen tactics to education and produce pipelines full of tyre-kickers, mismatched students who churn after one semester, and admissions teams that have stopped trusting digital leads. Our education marketing practice is built specifically for schools, K-12, coaching institutes, test-prep academies, higher-education colleges, skill-development institutes, and edtech startups across Delhi NCR. We understand the admissions calendar: the May-July peak for school admissions, the September-December peak for engineering and medical entrance prep, the March-June peak for study-abroad consulting, the year-round cadence for upskilling and certification courses. Every campaign we run is timed to the admissions calendar and measured against qualified walk-ins, demo-class attendees, application completions, and paid enrolments — not vanity leads. Our content team includes writers who have worked in education communications and can produce parent-facing content (curriculum explainers, school culture pieces, alumni success stories) and student-facing content (entrance-exam strategy, career roadmap videos, peer-comparison content) — in English, Hindi, and Hinglish depending on the audience. YouTube long-form is one of our highest-ROI channels for education — we have built channels from 0 to 50K subscribers in 6 months for coaching institutes, with each video acting as a 24/7 admissions counsellor that captures leads via description-link funnels. We build course-funnel landing pages with multi-step forms that capture intent (course interest, target year, current class) before showing the demo-class booking calendar — so your admissions team only speaks to qualified prospects. We integrate with your CRM (LeadSquared, HubSpot, Meritto, or custom ERPs) so every lead is routed, scored, and nurtured with the right cadence of WhatsApp messages, retargeting ads, and demo-class invites. We have served 50+ education clients across Delhi NCR, including K-12 international schools, IIT-JEE and NEET coaching institutes, MBA and study-abroad consultancies, upskilling platforms, and higher-education colleges. Whether you are a single-campus coaching institute in Kota extension or a multi-campus international school in Gurgaon, our playbook is engineered to fill admissions calendars with qualified students — not vanity leads.",
  whyChooseUs: [
    {
      icon: "GraduationCap",
      title: "Education-specific strategist",
      description:
        "Every engagement is staffed with a strategist who understands admissions calendars, parent vs student segments, and the regulatory environment (CBSE, ICSE, IB, AICTE, UGC). Not a generic agency account manager.",
    },
    {
      icon: "Users",
      title: "Parent + student segmentation",
      description:
        "We segment audiences by decision-maker (parent, student, both), by intent (course interest, target year, current class), and by stage (awareness, consideration, decision). Different messaging for each — never one funnel for all.",
    },
    {
      icon: "Youtube",
      title: "YouTube long-form engine",
      description:
        "YouTube is the #1 channel for education marketing in India. We have built channels from 0 to 50K subscribers in 6 months — each video acting as a 24/7 admissions counsellor that captures leads via description-link funnels.",
    },
    {
      icon: "Calendar",
      title: "Admissions-calendar timing",
      description:
        "We time every campaign to your admissions calendar — May-July for K-12, Sept-Dec for entrance prep, Mar-June for study-abroad, year-round for upskilling. Off-season campaigns focus on brand-building, not lead-gen.",
    },
  ],
  processSteps: [
    {
      step: "01",
      title: "Admissions Audit",
      description:
        "We audit your admissions funnel end-to-end — inquiry to walk-in to demo class to paid enrolment. Identify drop-off points, mismatched student profiles, and CRM gaps.",
    },
    {
      step: "02",
      title: "Course + Content Engine",
      description:
        "Course-funnel landing pages with multi-step intent forms. YouTube long-form content calendar. Parent-facing and student-facing content streams — in English, Hindi, or Hinglish.",
    },
    {
      step: "03",
      title: "Segmented Acquisition",
      description:
        "Meta, Google Search, YouTube, and Programmatic — segmented by decision-maker (parent, student), intent, and stage. CRM-routed with WhatsApp nurture cadence and demo-class invites.",
    },
    {
      step: "04",
      title: "Admissions Conversion",
      description:
        "We track inquiry → walk-in → demo class → paid enrolment — not vanity leads. Weekly pipeline reviews with your admissions head. Off-season brand-building campaigns.",
    },
  ],
  benefits: [
    {
      icon: "TrendingUp",
      title: "More qualified walk-ins",
      description:
        "Average education client sees 3.1x lift in qualified walk-ins within 90 days — measured against actual admissions data, not vanity leads.",
    },
    {
      icon: "Users",
      title: "Right-fit students",
      description:
        "We segment by intent and target year so your admissions team only speaks to qualified prospects. Mismatched enrolments drop 40% — improving cohort quality and reducing first-semester churn.",
    },
    {
      icon: "Youtube",
      title: "YouTube as 24/7 counsellor",
      description:
        "Each YouTube video acts as a 24/7 admissions counsellor that captures leads via description-link funnels. We have built channels from 0 to 50K subscribers in 6 months.",
    },
    {
      icon: "Smartphone",
      title: "WhatsApp-led nurturing",
      description:
        "70% of Delhi NCR parents prefer WhatsApp for admissions enquiries. We route, qualify, and nurture leads on WhatsApp — with demo-class booking in 3 taps.",
    },
    {
      icon: "Calendar",
      title: "Admissions-calendar timing",
      description:
        "We time every campaign to your admissions calendar. Off-season brand-building campaigns keep your pipeline warm year-round — no feast-or-famine admissions cycles.",
    },
    {
      icon: "BarChart3",
      title: "Full-funnel attribution",
      description:
        "We track inquiry → walk-in → demo class → paid enrolment end-to-end. You always know which channel produces enrolled students — not just leads.",
    },
  ],
  stats: [
    { value: 50, suffix: "+", label: "Institutions served" },
    { value: 3.1, suffix: "x", label: "Lift in walk-ins" },
    { value: 50, suffix: "K", label: "YouTube subs in 6mo" },
    { value: 40, suffix: "%", label: "Fewer mismatched" },
  ],
  faqs: [
    {
      q: "How much does education marketing cost in Delhi NCR?",
      a: "Our education retainers start at ₹50,000/month for a single-campus coaching institute and scale to ₹3,00,000+/month for multi-campus schools or edtech platforms. Most engagements land in the ₹75,000 — ₹1,50,000/month range. YouTube content production is billed separately at ₹20,000 — ₹50,000 per video depending on production level.",
    },
    {
      q: "Can you help us during admissions peak season?",
      a: "Yes — admissions peak season is when most of our education clients see 60-80% of annual lead volume. We start campaign preparation 60-90 days before peak so creative, landing pages, and CRM routing are tested and ready. Off-season (typically Nov-Feb for K-12) we run brand-building and content-engine campaigns that keep your pipeline warm.",
    },
    {
      q: "How do you target parents vs students differently?",
      a: "Different messaging, different channels, different creatives. Parents respond to outcome-focused content (alumni success, college placements, safety records). Students respond to peer-comparison content (faculty quality, campus culture, entrance-exam strategy). We segment audiences on Meta and Google by age, parental status, and interest signals — and serve different creative to each segment.",
    },
    {
      q: "Do you handle YouTube channel growth for coaching institutes?",
      a: "Yes — YouTube long-form is one of our highest-ROI channels for education clients. We have built channels from 0 to 50K subscribers in 6 months for IIT-JEE and NEET coaching institutes. Each video acts as a 24/7 admissions counsellor — capturing leads via description-link funnels that route to your CRM with full attribution.",
    },
    {
      q: "Can you integrate with our admissions CRM?",
      a: "Yes — we integrate with LeadSquared, HubSpot, Meritto (formerly NoPaperForms), Salesforce Education Cloud, and custom ERPs. Every lead is routed, scored, and nurtured with the right cadence of WhatsApp messages, retargeting ads, and demo-class invites. No double-entry, no missed leads.",
    },
    {
      q: "Do you also help with content in Hindi or regional languages?",
      a: "Yes — about 45% of our education content is in Hindi or Hinglish, depending on the audience. We have native Hindi writers on staff and can produce parent-facing and student-facing content in the language your audience actually prefers. For study-abroad consultancies, we also produce English content targeted at NRI parents.",
    },
  ],
  caseStudy: {
    client: "IIT-JEE coaching institute, 2 campuses in Delhi NCR (name withheld)",
    challenge:
      "Institute was paying 22% commission to lead-gen vendors for low-quality leads. Walk-in to enrolment rate was 4%. YouTube channel had 800 subscribers and no lead capture. Admissions team was drowning in tyre-kickers.",
    solution:
      "Built course-funnel landing pages with multi-step intent forms (target year, current class, target exam). Launched YouTube long-form strategy with weekly problem-solving videos. Killed lead-gen vendor contracts. Built WhatsApp nurture cadence with demo-class invites.",
    results: [
      "YouTube subscribers 800 → 38,000 in 7 months",
      "Walk-in to enrolment rate 4% → 11%",
      "Cost per qualified walk-in dropped 63%",
      "Lead-gen vendor commission spend eliminated entirely",
    ],
  },
  relatedServices: [
    "seo-ranking",
    "brand-shoot",
    "startup-it-support",
    "medical-marketing",
  ],
};

/* ====================================================================== */
/*  7. ECOMMERCE MARKETING                                                  */
/* ====================================================================== */

const ecommerceMarketing: IndustryPage = {
  slug: "ecommerce-marketing",
  coverImage: "/images/industries/ecommerce.png",
  title: "Ecommerce Marketing",
  h1: "Ecommerce Marketing",
  targetKeyword: "ecommerce marketing",
  category: "Retail & D2C",
  icon: "ShoppingCart",
  heroSubtitle:
    "Scale revenue without bleeding margin on ad spend. Performance marketing for Shopify, WooCommerce, and custom D2C brands — built on retention-led LTV, not just acquisition.",
  metaTitle:
    "Ecommerce Marketing Agency in Delhi NCR | D2C & Shopify Growth | SOCIAL VIENS",
  metaDescription:
    "Ecommerce marketing that scales D2C brands profitably. Shopify performance, Performance Max, retention-led LTV, WhatsApp post-purchase flows. 90+ brands scaled. Free strategy session.",
  overviewTitle: "Performance marketing that scales D2C brands profitably",
  overviewText:
    "Ecommerce marketing in India has changed. The era of ₹0 CAC via Facebook ads is over. Aggregator commissions, return rates, ad-platform CPMs, and a brutal D2C landscape mean the only brands that survive are those that master unit economics — CAC payback under 6 months, contribution margin over 35%, and a retention engine that lifts LTV by 2.5x. Most agencies apply generic performance tactics to ecommerce — set up Performance Max, run catalog ads, route the orders to the brand — and produce a brand that looks busy but loses money on every sale. Our ecommerce marketing practice is built specifically for Shopify, WooCommerce, Magento, and custom-stack D2C brands across Delhi NCR. We work with fashion, beauty, electronics, home goods, supplements, food D2C, and lifestyle brands — from ₹5 lakh/month revenue to ₹5 crore/month. We understand the unit economics: ad spend CAC vs blended CAC, contribution margin after COGS + shipping + returns, LTV by cohort, repeat-purchase rate by product category, and the brutal reality that 60% of D2C returns are 'didn't like' or 'wrong size' — both fixable with better content and sizing guides. Every campaign we run is measured against contribution margin, not revenue. We will turn off a ₹5 lakh/month ad campaign if it is producing orders at negative contribution margin — most agencies will not. Our retention-led playbook is built around the channels that compound for D2C: WhatsApp post-purchase flows (lifting repeat-purchase rate by 40-80%), email marketing that does not feel like spam (segmented, behaviour-triggered, personalised), loyalty programs that actually drive second purchases, and content marketing that ranks for category searches and reduces CAC over time. We have scaled 90+ D2C brands across India — from bootstrapped ₹5 lakh/month brands to Series A-backed ₹5 crore/month operations. We know how to handle the festive season spike (Oct-Nov), the end-of-quarter inventory liquidation, the new-product launch funnel, and the post-IPO growth narrative. Whether you are a fashion D2C in Shahpur Jat or a beauty brand shipping pan-India from Gurgaon, our playbook is engineered to scale revenue without bleeding margin on ad spend.",
  whyChooseUs: [
    {
      icon: "ShoppingCart",
      title: "D2C unit-economics first",
      description:
        "Every campaign is measured against contribution margin, not revenue. We will turn off a ₹5 lakh/month ad campaign if it produces orders at negative contribution margin. Most agencies will not.",
    },
    {
      icon: "MessageCircle",
      title: "Retention-led growth",
      description:
        "Acquisition is expensive; retention is cheap. WhatsApp post-purchase flows lift repeat-purchase rate by 40-80%. Email marketing that does not feel like spam. Loyalty programs that actually drive second purchases.",
    },
    {
      icon: "BarChart3",
      title: "Profitable paid acquisition",
      description:
        "Performance Max, Meta Advantage+, Google Shopping, programmatic — managed by the same team that manages your retention. Learnings compound; CAC drops over time.",
    },
    {
      icon: "Gauge",
      title: "Festive-season specialists",
      description:
        "We have handled 12 festive seasons for D2C brands — the Oct-Nov spike that produces 35-45% of annual revenue. Inventory planning, creative production, ad-spend pacing, and post-festive retention.",
    },
  ],
  processSteps: [
    {
      step: "01",
      title: "Unit-Economics Audit",
      description:
        "We audit your CAC, LTV, contribution margin, repeat-purchase rate, and return rate by product. Identify which SKUs are profitable to acquire on, which are bleeding margin, and which to sunset.",
    },
    {
      step: "02",
      title: "Funnel + Retention Setup",
      description:
        "Shopify/WooCommerce funnel optimisation, WhatsApp post-purchase flows, segmented email automation, loyalty program. Repeat-purchase rate up 40-80% within 90 days.",
    },
    {
      step: "03",
      title: "Performance Acquisition",
      description:
        "Performance Max, Meta Advantage+, Google Shopping, programmatic — managed to contribution margin, not ROAS. Weekly CAC payback reviews. Sunsets unprofitable campaigns fast.",
    },
    {
      step: "04",
      title: "Scale + Brand",
      description:
        "Content marketing that ranks for category searches. Influencer partnerships with disclosed compensation. Founder brand on LinkedIn for B2B D2C. Compounding CAC reduction over 12 months.",
    },
  ],
  benefits: [
    {
      icon: "TrendingUp",
      title: "Profitable revenue scale",
      description:
        "Average D2C client scales revenue 2.4x in 12 months while maintaining or improving contribution margin — not just top-line growth that bleeds cash.",
    },
    {
      icon: "MessageCircle",
      title: "Higher repeat-purchase rate",
      description:
        "WhatsApp post-purchase flows and segmented email automation lift repeat-purchase rate by 40-80% within 90 days. Lower blended CAC, higher LTV.",
    },
    {
      icon: "BarChart3",
      title: "Contribution-margin focused",
      description:
        "We measure every campaign against contribution margin after COGS, shipping, returns, and ad spend — not ROAS. We will turn off a campaign that looks good on ROAS but loses money.",
    },
    {
      icon: "Gauge",
      title: "Festive-season readiness",
      description:
        "We have handled 12 festive seasons — the Oct-Nov spike that produces 35-45% of annual D2C revenue. Inventory planning, creative production, ad-spend pacing, and post-festive retention.",
    },
    {
      icon: "Camera",
      title: "Content that reduces returns",
      description:
        "60% of D2C returns are 'didn't like' or 'wrong size' — both fixable with better content. Sizing guides, fabric close-ups, on-model photography. We have cut return rates by 22% for fashion clients.",
    },
    {
      icon: "Smartphone",
      title: "WhatsApp-native D2C",
      description:
        "Direct WhatsApp checkout for repeat customers. Bypass aggregator commissions. Average D2C client moves 18% of repeat revenue to direct WhatsApp within 6 months.",
    },
  ],
  stats: [
    { value: 90, suffix: "+", label: "D2C brands scaled" },
    { value: 2.4, suffix: "x", label: "Revenue in 12mo" },
    { value: 60, suffix: "%", label: "Higher repeat rate" },
    { value: 22, suffix: "%", label: "Lower return rate" },
  ],
  faqs: [
    {
      q: "How much does ecommerce marketing cost in Delhi NCR?",
      a: "Our D2C retainers start at ₹75,000/month for sub-₹10 lakh/month revenue brands and scale to ₹4,00,000+/month for ₹1 crore+/month brands. Most engagements land in the ₹1,00,000 — ₹2,50,000/month range. Ad spend is separate and managed transparently — we do not take a kickback from platforms.",
    },
    {
      q: "What is your minimum ad spend requirement?",
      a: "We work with brands spending ₹2 lakh+/month on ads. Below that, the economics do not support a retainer — we recommend a self-service tool or a freelance media buyer. For brands spending ₹5 lakh+/month, our retainer typically pays for itself in 60-90 days via improved CAC and contribution margin.",
    },
    {
      q: "Do you work with Shopify, WooCommerce, and custom stacks?",
      a: "Yes — all three. Shopify is ~60% of our D2C client base; WooCommerce ~25%; custom (Magento, headless Next.js Commerce, etc.) ~15%. We integrate with Shopify Apps (Klaviyo, Recharge, Gorgias, Loox), WooCommerce plugins, and custom stacks via Segment or direct API.",
    },
    {
      q: "How do you reduce return rates for fashion D2C?",
      a: "60% of D2C returns are 'didn't like' or 'wrong size' — both fixable with content. We produce detailed sizing guides (with model measurements), fabric close-up photography, on-model video, and post-purchase 'how to style' content. Average fashion D2C client cuts return rate by 22% within 90 days — directly lifting contribution margin.",
    },
    {
      q: "Do you handle influencer partnerships for D2C?",
      a: "Yes — we have a curated Delhi NCR + Mumbai creator network across fashion, beauty, food, fitness, and lifestyle. We handle briefing, negotiation, content approval, performance tracking, and disclosed compensation (per ASCI guidelines). We do not pay for fake reviews — only genuine creator partnerships with proper disclosure.",
    },
    {
      q: "How do you handle the festive season (Oct-Nov) for D2C?",
      a: "Festive season produces 35-45% of annual D2C revenue. We start preparation in July: creative production, inventory forecasting with your ops team, ad-spend pacing plan, WhatsApp + email retention flows for post-festive re-engagement. We have handled 12 festive seasons — we know the pitfalls (stockouts, ad-spend spikes, return waves) and how to navigate them.",
    },
  ],
  caseStudy: {
    client: "Beauty D2C brand, ₹40 lakh/month revenue (name withheld under NDA)",
    challenge:
      "Brand was scaling revenue but contribution margin was 8%. Ad CAC had risen 3x in 12 months. Repeat-purchase rate was 11%. WhatsApp was used only for customer support, not marketing. Founder was considering shutting down.",
    solution:
      "Rebuilt the retention engine: WhatsApp post-purchase flow with product education + reorder prompts, segmented Klaviyo email flows by purchase history, loyalty program with second-purchase incentive. Cut 4 unprofitable ad campaigns; doubled spend on 2 profitable ones. Added sizing guide and ingredient close-up content to reduce returns.",
    results: [
      "Contribution margin 8% → 28% within 6 months",
      "Repeat-purchase rate 11% → 27%",
      "Return rate dropped 19% via better content",
      "Brand scaled to ₹1.1 crore/month in month 9 — profitably",
    ],
  },
  relatedServices: [
    "seo-ranking",
    "brand-shoot",
    "startup-it-support",
    "salon-marketing",
  ],
};

/* ====================================================================== */
/*  8. SALON MARKETING                                                      */
/* ====================================================================== */

const salonMarketing: IndustryPage = {
  slug: "salon-marketing",
  coverImage: "/images/industries/salon.png",
  title: "Salon Marketing",
  h1: "Salon Marketing",
  targetKeyword: "salon marketing",
  category: "Beauty & Wellness",
  icon: "Scissors",
  heroSubtitle:
    "Fill appointment slots with the right clients — without burning margin on discounting platforms. Instagram-led growth for salons, spas, and beauty clinics across Delhi NCR.",
  metaTitle:
    "Salon Marketing Agency in Delhi NCR | Beauty & Wellness Growth | SOCIAL VIENS",
  metaDescription:
    "Salon marketing that fills appointment calendars. Instagram reels, before/after content, booking integration, stylist personal brands. 45+ salons served. Free strategy session.",
  overviewTitle: "Marketing that fills chairs — not just impresses beauty influencers",
  overviewText:
    "Salon and beauty marketing in Delhi NCR is a content game. The city has over 12,000 listed salons, the average Delhi customer checks Instagram before booking, and a single viral before/after reel can produce 200+ walk-in enquiries in a week. Most agencies apply generic retail tactics to salons — discount-led Meta ads, beauty-blogger outreach that produces vanity posts but no chairs filled, and Treatwell/Tondeou listing optimisation that trains customers to never pay full price. Our salon marketing practice is built specifically for unisex salons, luxury beauty clinics, spas, hair clinics, nail studios, and bridal makeup artists across Delhi NCR — from Hauz Khas to Khan Market to Rajouri Garden to Punjabi Bagh. We understand the unit economics: a 35-45% stylist commission, a 4x rent-to-revenue ceiling, a chair utilisation rate that lives or dies on the next 7 days of bookings, and an LTV that depends entirely on the third visit (when a customer becomes a regular). Every campaign we run is measured against chairs filled, average bill value, repeat-customer rate, and stylist utilisation — not vanity engagement or beauty influencer posts. Our in-house content team shoots before/after reels on-site (we have a 48-hour shoot-to-publish SLA for trending styles), produces stylist-feature content that builds personal brands within your salon, and runs Instagram content calendars that turn your feed into the beauty destination your target customer scrolls daily. We build booking funnels with Fresha, Bella, and direct-booking integrations, optimise your Google Business Profile for the Map Pack (where 46% of salon searches end), and run review-acquisition flows that lift your aggregate rating without ever buying fake reviews. We understand bridal season (Oct-Dec and Jan-Feb), the festival spike (Karwa Chauth, Diwali, Eid), and the off-season summer slowdown that demands a different playbook. We have served 45+ salon and beauty brands across Delhi NCR — from single-chair studios to 12-location chains. Whether you are launching a new luxury salon in Defence Colony or scaling a 5-location unisex chain across NCR, our playbook is engineered to fill appointment calendars — not to chase beauty influencer vanity metrics.",
  whyChooseUs: [
    {
      icon: "Scissors",
      title: "Beauty-specialist content",
      description:
        "Our content team has shot for luxury salons and bridal makeup artists. 48-hour shoot-to-publish SLA for trending styles, before/after reels that actually convert, and stylist-feature content that builds personal brands within your salon.",
    },
    {
      icon: "Star",
      title: "Map Pack dominance",
      description:
        "46% of salon searches end in a Map Pack click. We optimise your Google Business Profile for your neighbourhood — so you rank #1 for 'salon near me' in your service radius.",
    },
    {
      icon: "Calendar",
      title: "Booking integration",
      description:
        "Fresha, Bella, and direct-booking integrations. WhatsApp-first booking flow that captures the 70% of Delhi customers who prefer WhatsApp over phone calls.",
    },
    {
      icon: "Camera",
      title: "Before/after specialists",
      description:
        "Before/after reels are the #1 conversion driver for salons. We shoot them properly — consented, well-lit, with stylist credits — and post them at the cadence that produces bookings.",
    },
  ],
  processSteps: [
    {
      step: "01",
      title: "Salon Audit",
      description:
        "We audit your chair utilisation, average bill value, repeat-customer rate, and current digital presence. Identify hero services worth content investment and stylist personal-brand opportunities.",
    },
    {
      step: "02",
      title: "Content Engine",
      description:
        "On-site shoot day produces 30 days of Instagram reels, before/after content, and stylist features. 48-hour shoot-to-publish SLA for trending styles and bridal trials.",
    },
    {
      step: "03",
      title: "Map Pack + Booking",
      description:
        "Google Business Profile optimisation for Map Pack dominance. WhatsApp-first booking flow with Fresha/Bella integration. Compliant review-acquisition flows.",
    },
    {
      step: "04",
      title: "Acquisition + Retention",
      description:
        "Meta + Google paid campaigns for new clients. WhatsApp post-visit flows for retention (re-booking prompts, loyalty offers). Weekly chair-utilisation reports.",
    },
  ],
  benefits: [
    {
      icon: "TrendingUp",
      title: "More chairs filled",
      description:
        "Average salon client sees 2.6x lift in chairs filled within 90 days — measured against actual POS data, not vanity engagement.",
    },
    {
      icon: "MapPinned",
      title: "Top 3 in Map Pack",
      description:
        "We move your salon into the top 3 of Google Maps for your neighbourhood — where 46% of salon searches convert. Most clients see Map Pack movement in 30-60 days.",
    },
    {
      icon: "Camera",
      title: "Before/after that converts",
      description:
        "Before/after reels are the #1 conversion driver for salons. We shoot them properly — consented, well-lit, with stylist credits — and post them at the cadence that produces bookings.",
    },
    {
      icon: "Users",
      title: "Stylist personal brands",
      description:
        "Customers choose stylists, not salons. We build stylist personal-brand content (with their consent and revenue-share arrangement) that turns your team into your best acquisition asset.",
    },
    {
      icon: "Smartphone",
      title: "WhatsApp-first booking",
      description:
        "70% of Delhi customers prefer WhatsApp for salon bookings. We route, qualify, and book appointments on WhatsApp with calendar sync — no phone tag, no double-bookings.",
    },
    {
      icon: "Calendar",
      title: "Bridal + festival specialists",
      description:
        "Bridal season (Oct-Feb) and festival spikes (Karwa Chauth, Diwali, Eid) produce 40-50% of annual salon revenue. We have playbooks for each — pre-bookings, trial funnels, off-season retention.",
    },
  ],
  stats: [
    { value: 45, suffix: "+", label: "Salons served" },
    { value: 2.6, suffix: "x", label: "Lift in chairs filled" },
    { value: 46, suffix: "%", label: "Map Pack conversion" },
    { value: 48, suffix: "hr", label: "Content SLA" },
  ],
  faqs: [
    {
      q: "How much does salon marketing cost in Delhi NCR?",
      a: "Our salon retainers start at ₹30,000/month for a single-chair studio and scale to ₹1,50,000+/month for multi-location chains. Most single-location engagements land in the ₹40,000 — ₹75,000/month range. Content production (shoot days) is billed separately at ₹12,000 — ₹30,000 per shoot day depending on scope.",
    },
    {
      q: "Can you help us reduce dependence on discounting platforms?",
      a: "Yes — discounting platforms (Treatwell, Tondeou, NearBuy) train customers to never pay full price. We build direct WhatsApp booking funnels, loyalty programs, and referral flows that move customers off discounting platforms and into direct bookings. Average salon client moves 30% of bookings off discounting platforms within 6 months.",
    },
    {
      q: "How often do you shoot content for our salon?",
      a: "Standard cadence is one full shoot day per month (producing 30 days of Instagram reels, before/after content, and stylist features). For high-volume salons we shoot bi-weekly. We have a 48-hour shoot-to-publish SLA for trending styles and bridal trials — meaning if a new balayage trend hits Instagram on Monday, your reel is live by Wednesday.",
    },
    {
      q: "Do you handle before/after content for medical aesthetics?",
      a: "Yes — medical aesthetics (lasers, skin treatments) requires compliant before/after content with patient consent, no medical claims, and proper disclaimers. We shoot compliant before/after reels with signed consent forms on file — never fabricated, never overclaiming.",
    },
    {
      q: "Can you help with bridal season bookings?",
      a: "Yes — bridal season (Oct-Feb) and festival spikes (Karwa Chauth, Diwali, Eid) produce 40-50% of annual salon revenue. We start preparation 60-90 days before peak: bridal trial funnels, pre-booking campaigns for regulars, festival-specific service packages, and post-festival retention flows to convert first-time bridal clients into regulars.",
    },
    {
      q: "Do you build personal brands for our stylists?",
      a: "Yes — with proper consent and revenue-share arrangements. We build stylist personal-brand content (Instagram reels, before/after features, technique tutorials) that turns your team into your best acquisition asset. This is also a powerful retention tool — stylists with strong personal brands are less likely to leave for a competitor.",
    },
  ],
  caseStudy: {
    client: "Luxury unisex salon, Defence Colony, Delhi (name withheld under NDA)",
    challenge:
      "Salon was filling only 55% of chair capacity. Bridal trial bookings were inconsistent. Repeat-customer rate was 22%. Owner was spending ₹45,000/month on discounting platforms with diminishing returns.",
    solution:
      "Built Instagram content engine with weekly before/after reels + stylist features. Built WhatsApp-first booking funnel with Fresha integration. Killed discounting platform spend; replaced with direct-booking loyalty program. Built bridal trial funnel with pre-booking deposits.",
    results: [
      "Chair utilisation 55% → 84% within 4 months",
      "Repeat-customer rate 22% → 39%",
      "Discounting platform spend ₹45k/mo → ₹0",
      "Bridal trial bookings up 3.2x during Oct-Feb peak",
    ],
  },
  relatedServices: [
    "brand-shoot",
    "fitness-marketing",
    "restaurant-marketing",
    "seo-ranking",
  ],
};

/* ====================================================================== */
/*  9. FITNESS MARKETING                                                    */
/* ====================================================================== */

const fitnessMarketing: IndustryPage = {
  slug: "fitness-marketing",
  coverImage: "/images/industries/fitness.png",
  title: "Fitness Marketing",
  h1: "Fitness Marketing",
  targetKeyword: "fitness marketing",
  category: "Fitness & Gyms",
  icon: "Dumbbell",
  heroSubtitle:
    "Fill membership quotas and personal-training calendars — without burning money on free-trial tyre-kickers. Transformation-led growth for gyms, studios, and personal trainers.",
  metaTitle:
    "Fitness Marketing Agency in Delhi NCR | Gym & Studio Growth | SOCIAL VIENS",
  metaDescription:
    "Fitness marketing that fills memberships and PT calendars. Transformation content, free-trial funnels, retention-led LTV. 35+ gyms and studios served. Free strategy session.",
  overviewTitle: "Marketing built around transformation — not free-trial signups",
  overviewText:
    "Fitness marketing in Delhi NCR is a churn game. The city has over 4,500 gyms, the average gym loses 40% of its membership base every year, and most gyms survive on the 60% of members who pay for an annual membership but stop attending after 90 days. Most agencies apply generic retail tactics to fitness — free-trial Meta ads that flood the gym with tyre-kickers, fitness-influencer partnerships that produce vanity posts but no memberships sold, and discount-led campaigns that train members to never pay full price. Our fitness marketing practice is built specifically for unisex gyms, boutique studios (yoga, pilates, crossfit, spin), personal trainers, and online fitness coaches across Delhi NCR — from Vasant Vihar to Saket to Gurgaon to Noida. We understand the unit economics: a 35-40% trainer commission, a 3x rent-to-revenue ceiling, an annual membership LTV that depends entirely on the third-month retention wall, and a personal-training calendar that lives or dies on transformation outcomes. Every campaign we run is measured against memberships sold, PT package conversions, member retention at 90 days, and average revenue per member — not vanity engagement or free-trial signups. Our in-house content team shoots transformation reels on-site (with proper member consent and progress tracking), produces trainer-feature content that builds personal brands within your gym, and runs Instagram content calendars that turn your feed into the fitness destination your target member scrolls daily. We build membership funnels with Vajro, Fitso, and direct-booking integrations, optimise your Google Business Profile for the Map Pack (where 46% of gym searches end), and run referral programs that turn your existing members into your best acquisition channel. We understand the January spike (New Year resolutions), the September spike (post-monsoon fitness restart), and the wedding-season bridal fitness funnel that books 12-week transformation packages. We have served 35+ fitness brands across Delhi NCR — from single-location boutique studios to 8-location gym chains. Whether you are launching a new boutique pilates studio in Shahpur Jat or scaling a 5-location gym chain across NCR, our playbook is engineered to fill memberships and PT calendars — not to chase fitness influencer vanity metrics.",
  whyChooseUs: [
    {
      icon: "Dumbbell",
      title: "Fitness-specialist content",
      description:
        "Our content team has shot for boutique studios and personal trainers. 48-hour shoot-to-publish SLA for transformation reels, member-progress content, and trainer-feature videos that build personal brands within your gym.",
    },
    {
      icon: "Heart",
      title: "Transformation-led funnel",
      description:
        "Transformation outcomes are the #1 conversion driver for fitness. We build transformation-reel funnels that capture qualified leads — not free-trial tyre-kickers who never convert to paid memberships.",
    },
    {
      icon: "MapPinned",
      title: "Map Pack dominance",
      description:
        "46% of gym searches end in a Map Pack click. We optimise your Google Business Profile for your neighbourhood — so you rank #1 for 'gym near me' in your service radius.",
    },
    {
      icon: "Users",
      title: "Trainer personal brands",
      description:
        "Members choose trainers, not gyms. We build trainer personal-brand content (with their consent and revenue-share arrangement) that turns your team into your best acquisition asset.",
    },
  ],
  processSteps: [
    {
      step: "01",
      title: "Membership Audit",
      description:
        "We audit your membership base, retention rate at 90 days, PT package conversions, and current digital presence. Identify hero programs worth content investment and trainer personal-brand opportunities.",
    },
    {
      step: "02",
      title: "Content Engine",
      description:
        "On-site shoot day produces 30 days of Instagram reels, transformation content, and trainer features. 48-hour shoot-to-publish SLA for member progress and program launches.",
    },
    {
      step: "03",
      title: "Membership Funnel",
      description:
        "Multi-step lead form captures intent (goal, experience level, preferred timing) before showing the trial-booking calendar. CRM-routed with WhatsApp nurture cadence. No free-trial tyre-kickers.",
    },
    {
      step: "04",
      title: "Acquisition + Retention",
      description:
        "Meta + Google paid campaigns for new members. WhatsApp post-join flows for retention (workout reminders, progress check-ins, renewal prompts). Referral programs that turn members into acquisition.",
    },
  ],
  benefits: [
    {
      icon: "TrendingUp",
      title: "More memberships sold",
      description:
        "Average fitness client sees 2.4x lift in memberships sold within 90 days — measured against actual membership data, not vanity engagement.",
    },
    {
      icon: "Heart",
      title: "Higher PT conversions",
      description:
        "Transformation-led funnels convert 3.2x more trial members into PT packages than generic free-trial funnels. Higher revenue per member, better retention.",
    },
    {
      icon: "MapPinned",
      title: "Top 3 in Map Pack",
      description:
        "We move your gym into the top 3 of Google Maps for your neighbourhood — where 46% of gym searches convert. Most clients see Map Pack movement in 30-60 days.",
    },
    {
      icon: "Users",
      title: "Trainer personal brands",
      description:
        "Members choose trainers, not gyms. We build trainer personal-brand content (with consent and revenue-share) that turns your team into your best acquisition and retention asset.",
    },
    {
      icon: "Smartphone",
      title: "WhatsApp-first funnel",
      description:
        "70% of Delhi members prefer WhatsApp for trial bookings and PT enquiries. We route, qualify, and book on WhatsApp with calendar sync — no phone tag, no double-bookings.",
    },
    {
      icon: "RefreshCw",
      title: "90-day retention focus",
      description:
        "Most gyms lose 40% of new members at the 90-day wall. We run WhatsApp retention flows (workout reminders, progress check-ins, community challenges) that lift 90-day retention by 35%.",
    },
  ],
  stats: [
    { value: 35, suffix: "+", label: "Gyms served" },
    { value: 2.4, suffix: "x", label: "Lift in memberships" },
    { value: 35, suffix: "%", label: "Higher 90-day retention" },
    { value: 3.2, suffix: "x", label: "PT conversion rate" },
  ],
  faqs: [
    {
      q: "How much does fitness marketing cost in Delhi NCR?",
      a: "Our fitness retainers start at ₹30,000/month for a single-location studio and scale to ₹1,50,000+/month for multi-location chains. Most single-location engagements land in the ₹40,000 — ₹75,000/month range. Content production (shoot days) is billed separately at ₹12,000 — ₹30,000 per shoot day depending on scope.",
    },
    {
      q: "How do you reduce free-trial tyre-kickers?",
      a: "We replaced generic 'free trial' ads with multi-step lead forms that capture intent (fitness goal, experience level, preferred timing) before showing the trial-booking calendar. We also charge a refundable trial deposit (₹200-₹500) that converts to membership if the user joins. Result: trial-to-membership conversion rate jumps from 8% to 28%.",
    },
    {
      q: "How do you handle the January New Year spike?",
      a: "January produces 25-30% of annual gym signups. We start campaign preparation in November: creative production, landing page optimisation, CRM routing for high lead volume, and post-January retention flows. February-March is critical — most January signups churn by March 15 if retention flows are not in place.",
    },
    {
      q: "Can you help us sell more personal training packages?",
      a: "Yes — PT packages are the highest-margin revenue stream for most gyms (35-40% commission vs 5-10% on memberships). We build transformation-led funnels that showcase trainer outcomes, capture trial members who want a specific trainer, and run WhatsApp nurture flows that convert trial users to PT packages at 3.2x the industry rate.",
    },
    {
      q: "Do you build personal brands for our trainers?",
      a: "Yes — with proper consent and revenue-share arrangements. We build trainer personal-brand content (Instagram reels, transformation features, technique tutorials) that turns your team into your best acquisition and retention asset. This is also a powerful retention tool — trainers with strong personal brands are less likely to leave for a competitor.",
    },
    {
      q: "Can you help with bridal fitness packages?",
      a: "Yes — bridal fitness is one of the highest-margin funnels for gyms and personal trainers. 12-week transformation packages booked 4-6 months before the wedding, with content marketing that showcases past bride transformations. Average PT package value: ₹40,000-₹80,000. We have driven 50+ bridal package sales for our fitness clients.",
    },
  ],
  caseStudy: {
    client: "Boutique crossfit + strength studio, Gurgaon (name withheld under NDA)",
    challenge:
      "Studio was filling 60% of capacity. PT package conversion was 12%. 90-day retention was 38% (industry: 50-55%). Owner was competing with 7 budget gyms within 2km radius on price.",
    solution:
      "Repositioned away from price competition to transformation-led funnel. Built Instagram content engine with member transformation reels (consented). Built multi-step lead form with intent capture. Built WhatsApp retention flows with workout reminders and community challenges.",
    results: [
      "Studio capacity 60% → 92% within 5 months",
      "PT package conversion 12% → 38%",
      "90-day retention 38% → 72%",
      "Average revenue per member up 64% via PT packages",
    ],
  },
  relatedServices: [
    "salon-marketing",
    "brand-shoot",
    "restaurant-marketing",
    "event-shoots-management",
  ],
};

/* ====================================================================== */
/*  10. EVENT SHOOTS & MANAGEMENT                                          */
/* ====================================================================== */

const eventShootsManagement: IndustryPage = {
  slug: "event-shoots-management",
  coverImage: "/images/industries/event-shoots.png",
  title: "Event Shoots & Management",
  h1: "Event Shoots & Management",
  targetKeyword: "event shoots management",
  category: "Events & Production",
  icon: "Camera",
  heroSubtitle:
    "From pre-event hype to post-event content multiplier — full-stack event coverage and management for weddings, corporate launches, conferences, and brand activations across Delhi NCR.",
  metaTitle:
    "Event Shoots & Management in Delhi NCR | Weddings, Corporate, Brand Activations | SOCIAL VIENS",
  metaDescription:
    "Event shoots and management that compounds. Pre-event hype, on-site coverage, post-event content multiplier. Weddings, corporate launches, conferences. Free strategy session.",
  overviewTitle: "Event coverage that multiplies into 6 months of content",
  overviewText:
    "Event marketing in India has changed. A wedding is no longer just a wedding — it is a content production that generates 6 months of Instagram reels, YouTube vlogs, vendor portfolio assets, and family-keepsake films. A corporate launch is no longer just a press event — it is a content engine that produces investor reels, employee brand films, product demo videos, and 30 days of LinkedIn thought-leadership content. Most event agencies stop at delivering a final video and a photo album — and miss the 90% of the value that comes from repurposing the event into a content multiplier. Our event shoots and management practice is built specifically for weddings, corporate launches, conferences, product unveilings, brand activations, and milestone celebrations across Delhi NCR. We cover the full lifecycle: pre-event hype campaigns (save-the-date reels, countdown content, RSVP funnels), on-site multi-cam coverage (cinematic film, social-first reels, live streaming, behind-the-scenes), and post-event content multiplier (60-90 day repurposing calendar that turns one event into 6 months of content). Our production team includes 6 cinematographers, 3 photographers, 2 drone pilots, and a post-production suite that delivers cinematic films, social-first reels, photo albums, and short-form content within 7-14 days of the event. We have shot 200+ events across Delhi NCR — luxury weddings at The Leela Palace, The Aurangzeb Road bungalows, and farmhouses in Chattarpur; corporate launches for Fortune 500 companies at Cyber Hub and Aerocity; conferences at India Habitat Centre and ITC Maurya; and brand activations for D2C brands across malls in Saket and Vasant Kunj. We understand the logistics: permits, vendor coordination, multiple locations, tight timelines, and the unpredictable nature of live events. We also understand the marketing — every event we shoot is briefed not just as coverage but as a content asset with a defined post-event distribution calendar: which reels go on Instagram, which films go on YouTube, which photos go on LinkedIn, which soundbites become blog posts. For weddings, we offer bridal-prep films, candid photography, cinematic wedding films, same-day-edit reels for the reception, and post-wedding content calendars for the couple's social media. For corporate events, we offer multi-cam keynote coverage, investor reels, employee brand films, product demo videos, and 30-day LinkedIn thought-leadership content calendars for the speakers. We have built event marketing into a content multiplier for 200+ events — turning a single day into 6 months of marketing assets.",
  whyChooseUs: [
    {
      icon: "Camera",
      title: "Full-lifecycle coverage",
      description:
        "Pre-event hype campaigns, on-site multi-cam coverage, post-event content multiplier. Most agencies deliver a final video and miss the 90% of value that comes from repurposing the event into 6 months of content.",
    },
    {
      icon: "Film",
      title: "Cinematic + social-first",
      description:
        "We deliver both cinematic films (5-10 minute wedding films, keynote recap films) and social-first reels (Instagram-format, YouTube Shorts). Two distinct deliverables, one production.",
    },
    {
      icon: "Calendar",
      title: "7-14 day delivery SLA",
      description:
        "Most event agencies deliver in 30-90 days — by which time the moment has passed. Our post-production suite delivers cinematic films, social-first reels, and photo albums within 7-14 days of the event.",
    },
    {
      icon: "BarChart3",
      title: "Content multiplier focus",
      description:
        "Every event we shoot is briefed as a content asset, not just coverage. 60-90 day repurposing calendar that turns one event into 6 months of Instagram reels, YouTube vlogs, and LinkedIn thought-leadership.",
    },
  ],
  processSteps: [
    {
      step: "01",
      title: "Concept + Pre-Event",
      description:
        "We map the event to a content brief: hero moments, must-have shots, distribution channels. Pre-event hype campaigns (save-the-date reels, countdown content, RSVP funnels for corporate).",
    },
    {
      step: "02",
      title: "Production Day",
      description:
        "Multi-cam cinematic coverage (3-6 cinematographers), drone where permitted, candid photography, behind-the-scenes, live streaming if needed. Same-day-edit reel for evening reception (weddings).",
    },
    {
      step: "03",
      title: "Post-Production",
      description:
        "7-14 day delivery: cinematic film (5-10 min), social-first reels (10-20 Instagram-format cuts), photo album (300-500 edited images), YouTube vlog cut, speaker soundbites (corporate).",
    },
    {
      step: "04",
      title: "Content Multiplier",
      description:
        "60-90 day repurposing calendar: which reels go on Instagram, which films on YouTube, which photos on LinkedIn, which soundbites as blog posts. One event → 6 months of content.",
    },
  ],
  benefits: [
    {
      icon: "TrendingUp",
      title: "6 months of content from one event",
      description:
        "Most event coverage produces a final video and an album. Our content multiplier approach produces 60-90 days of Instagram reels, YouTube vlogs, and LinkedIn thought-leadership — turning one event into 6 months of marketing assets.",
    },
    {
      icon: "Film",
      title: "Cinematic + social-first",
      description:
        "We deliver both cinematic films (5-10 minute wedding films, keynote recap films) and social-first reels (Instagram-format, YouTube Shorts). Two distinct deliverables, one production.",
    },
    {
      icon: "Gauge",
      title: "7-14 day delivery",
      description:
        "Most event agencies deliver in 30-90 days — by which time the moment has passed. Our post-production suite delivers cinematic films, social-first reels, and photo albums within 7-14 days.",
    },
    {
      icon: "Camera",
      title: "Multi-cam + drone coverage",
      description:
        "3-6 cinematographers, drone pilots (where permitted), candid photographers, behind-the-scenes. We never miss a hero moment because we have multiple angles on every shot.",
    },
    {
      icon: "Calendar",
      title: "Same-day-edit reels",
      description:
        "For weddings, we deliver a same-day-edit reel for the evening reception — a 60-second recap of the morning ceremonies, played at the reception. Always the most-shared piece of content from the event.",
    },
    {
      icon: "Smartphone",
      title: "Live streaming + virtual",
      description:
        "For corporate events and destination weddings, we offer multi-cam live streaming with virtual attendee engagement (chat, Q&A, polls). Post-event: recorded sessions, highlight reels, speaker soundbites.",
    },
  ],
  stats: [
    { value: 200, suffix: "+", label: "Events shot" },
    { value: 90, suffix: "days", label: "Content multiplier" },
    { value: 7, suffix: "days", label: "Delivery SLA" },
    { value: 6, suffix: "+", label: "Cinematographers" },
  ],
  faqs: [
    {
      q: "How much do event shoots cost in Delhi NCR?",
      a: "Our event packages start at ₹75,000 for a single-day event with 2 cinematographers + 1 photographer (no cinematic film, social-first reels + photo album). Cinematic film packages start at ₹1,50,000. Multi-day luxury wedding packages scale to ₹5,00,000+. Corporate event coverage starts at ₹1,20,000 per day. Content multiplier calendar (post-event) is a separate retainer: ₹30,000-₹75,000/month.",
    },
    {
      q: "How fast do you deliver the final content?",
      a: "7-14 days for the full deliverable package (cinematic film, social-first reels, photo album, YouTube vlog cut, speaker soundbites). For weddings, we deliver a same-day-edit reel for the evening reception — a 60-second recap of the morning ceremonies. Most event agencies deliver in 30-90 days — we deliver before the moment has passed.",
    },
    {
      q: "Do you also handle event management, or just shoots?",
      a: "Primarily shoots and content production — but we work with a curated network of event planners, decor designers, caterers, and venue partners across Delhi NCR for clients who need full event management. For weddings, we partner with planning firms; for corporate events, we partner with event-management agencies. Our speciality is the content multiplier, not the logistics.",
    },
    {
      q: "Can you handle destination weddings outside Delhi NCR?",
      a: "Yes — we have shot destination weddings in Jaipur, Udaipur, Goa, Rishikesh, and international destinations (Dubai, Bali, Thailand). Travel and logistics are billed separately. Destination weddings require a 4-6 week pre-event preparation window for permits, recce, and vendor coordination.",
    },
    {
      q: "Do you offer live streaming for corporate events?",
      a: "Yes — multi-cam live streaming with virtual attendee engagement (chat, Q&A, polls) for conferences, product launches, and town halls. We stream to YouTube Live, LinkedIn Live, Zoom Webinars, or custom platforms. Post-event: recorded sessions, highlight reels, speaker soundbites, and 30-day LinkedIn thought-leadership content calendar.",
    },
    {
      q: "What is the 'content multiplier' calendar?",
      a: "After the event, we deliver a 60-90 day repurposing calendar: which reels go on Instagram, which films on YouTube, which photos on LinkedIn, which soundbites as blog posts. One event typically produces 30-60 pieces of distributable content. We can manage the distribution ourselves (as a separate retainer) or hand the calendar to your in-house team.",
    },
  ],
  caseStudy: {
    client: "Corporate product launch, Fortune 500 B2B SaaS (name withheld under NDA)",
    challenge:
      "Marketing team had budget for a 200-person launch event in Aerocity but no plan to convert the event into a content multiplier. Previous launches had produced a single recap video and a few LinkedIn posts that got 200 views.",
    solution:
      "Full-lifecycle coverage: pre-event hype campaign (LinkedIn countdown, speaker reveals), multi-cam production day (keynote, demos, networking), 7-day post-production delivery, 60-day content multiplier calendar (keynote reels, demo soundbites, speaker thought-leadership, attendee testimonial reels).",
    results: [
      "Event produced 47 distributable content assets",
      "LinkedIn thought-leadership posts drove 8.2x engagement vs baseline",
      "Demo soundbite reels drove 340 inbound demo requests in 60 days",
      "Marketing team achieved 12-month content calendar from one event",
    ],
  },
  relatedServices: [
    "brand-shoot",
    "restaurant-marketing",
    "fitness-marketing",
    "seo-ranking",
  ],
};

/* ====================================================================== */
/*  11. SEO RANKING                                                        */
/* ====================================================================== */

const seoRanking: IndustryPage = {
  slug: "seo-ranking",
  coverImage: "/images/industries/seo-ranking.png",
  title: "SEO Ranking Services",
  h1: "SEO Ranking Services",
  targetKeyword: "seo ranking services",
  category: "SEO & Search",
  icon: "TrendingUp",
  heroSubtitle:
    "Rank on Google's first page for the keywords that drive revenue — not vanity traffic. Technical SEO, content engineering, and white-hat link building that compounds over 12 months.",
  metaTitle:
    "SEO Ranking Services in Delhi NCR | First Page Google Rankings | SOCIAL VIENS",
  metaDescription:
    "SEO ranking services that drive revenue, not vanity traffic. Technical SEO, content engineering, white-hat link building. 350% avg ROI for NCR clients. Free SEO audit. Book today.",
  overviewTitle: "SEO that ranks for keywords that drive revenue — not vanity traffic",
  overviewText:
    "SEO in 2025 is not what it was in 2020. Google's algorithm has over 200 ranking factors, AI Overviews (SGE) are eating organic click-through rates on informational queries, the Map Pack dominates local search, and zero-click searches now account for over 60% of Google results. Most agencies still sell SEO as 'we will rank you #1 for your keyword' — a promise that is either a lie or a vanity ranking that produces no revenue. Our SEO ranking services practice is built specifically for the complexity of modern search. We work with SMEs, startups, D2C brands, professional services, healthcare providers, and B2B SaaS companies across Delhi NCR — and we rank them for keywords that produce actual revenue, not vanity traffic. Our SEO practice covers four pillars: technical SEO, content engineering, local SEO, and white-hat link building. Technical SEO is the foundation — we audit crawlability, indexation, Core Web Vitals, schema markup, internal linking, JavaScript rendering, and site architecture. Most Delhi NCR sites see 15-30% organic lift just from fixing technical debt, completed in 4-6 weeks. Content engineering is the long game: we build content clusters around revenue-driving topics, with each piece mapped to a search intent (commercial, informational, navigational, transactional) and a buyer journey stage (awareness, consideration, decision). We have built 50+ content clusters for Delhi NCR clients that produce compounding organic traffic over 12-18 months. Local SEO is critical for any business serving a geographic area — 46% of local searches end in a Map Pack click. We optimise your Google Business Profile for every neighbourhood you serve, build location landing pages, run review-acquisition flows, and track your rankings block-by-block with geo-grid rank tracking. Link building is white-hat only: digital PR, guest columns in Indian business publications, HARO outreach, and partnerships with Delhi associations and chambers. We never buy links, never use PBNs, never risk your domain. Reporting is real-time: a custom Looker Studio dashboard with rankings, organic traffic, goal completions, and revenue attribution. Weekly rank-tracking updates, monthly strategy calls, quarterly business reviews. We have driven 350% average ROI for 80+ Delhi NCR businesses across real estate, healthcare, legal, F&B, retail, B2B SaaS, and professional services. SEO is not a guessing game — it is engineering, content, and patience. We bring all three.",
  whyChooseUs: [
    {
      icon: "Search",
      title: "Revenue-keyword focus",
      description:
        "We rank you for keywords that produce revenue, not vanity traffic. Every keyword in our strategy is mapped to a search intent and a buyer journey stage — so the traffic we drive converts.",
    },
    {
      icon: "Zap",
      title: "Technical SEO depth",
      description:
        "Crawlability, indexation, Core Web Vitals, schema, internal linking, JavaScript rendering. Most Delhi sites see 15-30% organic lift just from technical fixes, completed in 4-6 weeks.",
    },
    {
      icon: "Link2",
      title: "White-hat link building",
      description:
        "DR-60+ placements in Indian business press, HARO outreach, Delhi chamber/association partnerships. No PBNs, no link buying, no risk to your domain.",
    },
    {
      icon: "BarChart3",
      title: "Revenue attribution",
      description:
        "Real-time Looker Studio dashboards that tie rankings to traffic to leads to revenue. You always know what SEO is actually paying for — not vanity ranking reports.",
    },
  ],
  processSteps: [
    {
      step: "01",
      title: "Audit + Keyword Strategy",
      description:
        "Full technical crawl, backlink audit, keyword gap analysis vs 3 competitors, revenue-impact model. Deliverable: 40-page SEO strategy document with revenue-keyword priorities.",
    },
    {
      step: "02",
      title: "Technical Fixes",
      description:
        "Crawlability, schema, internal linking, page speed, mobile UX, JavaScript rendering. Most sites see 15-30% organic lift just from this phase, completed in 4-6 weeks.",
    },
    {
      step: "03",
      title: "Content Engineering",
      description:
        "Content clusters around revenue-driving topics, each piece mapped to search intent and buyer journey stage. Published on a weekly cadence. Compounds over 12-18 months.",
    },
    {
      step: "04",
      title: "Local + Links + Authority",
      description:
        "Google Business Profile optimisation for every neighbourhood. White-hat link building via digital PR, guest columns, HARO, partnerships. 12-month authority-building plan.",
    },
  ],
  benefits: [
    {
      icon: "TrendingUp",
      title: "350% average ROI",
      description:
        "Delhi NCR clients see 350% ROI within 6 months — measured in attributed revenue, not rankings. SEO is the highest-ROI marketing channel for most businesses.",
    },
    {
      icon: "MapPinned",
      title: "Map Pack dominance",
      description:
        "Rank in the top 3 of Google Maps for your target neighbourhoods — where 46% of local searches convert. Most clients see Map Pack movement in 60-90 days.",
    },
    {
      icon: "PenTool",
      title: "Content that compounds",
      description:
        "Content clusters around revenue-driving topics, each piece mapped to search intent. We have built 50+ clusters that produce compounding organic traffic over 12-18 months.",
    },
    {
      icon: "Zap",
      title: "Technical excellence",
      description:
        "Sub-2-second load times, clean schema, perfect crawl budget — the foundation that lets content rank. Most sites see 15-30% organic lift from technical fixes alone.",
    },
    {
      icon: "Link2",
      title: "Authority links",
      description:
        "DR-60+ Indian publication placements that move your domain authority, safely and sustainably. No PBNs, no link buying, no risk to your domain.",
    },
    {
      icon: "BarChart3",
      title: "Transparent reporting",
      description:
        "Real-time Looker Studio dashboards, weekly rank updates, monthly strategy calls. No vanity metrics, ever. You always know what SEO is paying for.",
    },
  ],
  stats: [
    { value: 80, suffix: "+", label: "SEO clients served" },
    { value: 350, suffix: "%", label: "Avg ROI in 6 months" },
    { value: 3, suffix: "x", label: "Avg organic traffic lift" },
    { value: 60, suffix: "+", label: "DR-60+ links earned" },
  ],
  faqs: [
    {
      q: "How long does SEO take to show results?",
      a: "Map Pack movement typically happens in 60-90 days. Meaningful organic traffic growth by month 4. Significant ROI (200%+) by month 6. SEO is a long game — beware any agency promising overnight rankings; they are either lying or using black-hat tactics that will get you penalised.",
    },
    {
      q: "How much do SEO ranking services cost in Delhi NCR?",
      a: "Our SEO retainers start at ₹25,000/month for local SMEs and scale to ₹1,50,000+/month for enterprise clients targeting national keywords. Most Delhi NCR SME engagements land in the ₹40,000 — ₹80,000/month range. We provide a fixed-scope proposal after a free audit.",
    },
    {
      q: "Do you guarantee #1 rankings on Google?",
      a: "No — and you should run from any agency that does. Google's algorithm has 200+ ranking factors and no one can guarantee a specific position. What we DO guarantee is transparent execution of every tactic in our scope, weekly reporting, and a clear strategy tied to revenue — not vanity rankings.",
    },
    {
      q: "What is white-hat link building?",
      a: "White-hat link building means earning links legitimately: digital PR campaigns that earn editorial coverage, guest columns in Indian business publications, HARO outreach, partnerships with Delhi associations and chambers. We never buy links, never use PBNs (private blog networks), never participate in link exchanges. Black-hat tactics risk your domain being penalised by Google — we will not put your business at risk.",
    },
    {
      q: "Do you also handle content writing?",
      a: "Yes — content engineering is one of our core pillars. Our content team writes in English, Hinglish, and formal Hindi depending on your audience. We have subject-matter specialists for healthcare, legal, finance, technology, and B2B SaaS — so your content reads as expertise, not generic SEO copy. All content is reviewed by you before publication.",
    },
    {
      q: "Will SEO work for my Delhi NCR business?",
      a: "If your customers search Google before buying, SEO will work for you. We have helped Delhi clinics rank #1 in their Pin Code, restaurants own the Map Pack in their sector, professional services firms dominate neighbourhood searches, and B2B SaaS companies rank for high-intent commercial keywords. Book a free audit and we will tell you honestly whether SEO is the right investment for your business.",
    },
  ],
  caseStudy: {
    client: "B2B SaaS company, HR-tech vertical (name withheld under NDA)",
    challenge:
      "Company was spending ₹2,50,000/month on Google Ads with CAC of ₹18,000. Organic traffic was 1,200 visits/month with 3 demo requests. SEO was non-existent — site had 4 blog posts from 2020.",
    solution:
      "12-month SEO engagement: technical audit and fixes (Core Web Vitals, schema, internal linking), content cluster around 'HR software India' (35 articles in 12 months), white-hat link building via guest columns in Indian business press.",
    results: [
      "Organic traffic 1,200 → 28,000 visits/month in 12 months",
      "Demo requests from organic 3 → 87/month",
      "Organic CAC ₹0 vs paid CAC ₹18,000",
      "Reduced paid ad spend by 60% in month 12",
    ],
  },
  relatedServices: [
    "ecommerce-marketing",
    "medical-marketing",
    "law-firm-marketing",
    "real-estate-marketing",
  ],
};

/* ====================================================================== */
/*  12. BRAND SHOOT                                                        */
/* ====================================================================== */

const brandShoot: IndustryPage = {
  slug: "brand-shoot",
  coverImage: "/images/industries/brand-shoot.png",
  title: "Brand Shoot & Production",
  h1: "Brand Shoot & Production",
  targetKeyword: "brand shoot",
  category: "Creative & Production",
  icon: "Palette",
  heroSubtitle:
    "Founder portraits, product photography, video brand assets, and social-first shoots that elevate your brand above stock-content mediocrity. Production-grade creative for Delhi NCR brands.",
  metaTitle:
    "Brand Shoot & Production in Delhi NCR | Founder, Product, Video Brand Assets | SOCIAL VIENS",
  metaDescription:
    "Brand shoot and production that elevates your brand above stock-content mediocrity. Founder portraits, product photography, video brand assets. 150+ shoots delivered. Free strategy session.",
  overviewTitle: "Production-grade brand assets — not stock-content mediocrity",
  overviewText:
    "Brand shoot in 2025 is no longer a once-a-year catalog photography exercise. It is the production engine behind every Instagram reel, YouTube thumbnail, LinkedIn post, website hero image, and product detail page your brand will publish for the next 6-12 months. Most brands still treat brand shoots as a checkbox — book a studio, shoot 50 product images, use them for a year — and wonder why their content looks identical to every competitor using the same stock photography. Our brand shoot and production practice is built specifically for the content demands of modern brands. We work with D2C brands, fashion labels, beauty companies, restaurants, salons, fitness studios, B2B SaaS startups, professional services firms, and personal brands across Delhi NCR. We produce four categories of brand assets: founder portraits and personal-brand photography, product photography (catalog + lifestyle), video brand assets (founder films, product demos, brand anthems, social-first reels), and social-first shoots (Instagram-format content produced in bulk). Every shoot is briefed not as 'photography' but as a content production with a defined distribution calendar: which images go on the website, which on Instagram, which on LinkedIn, which on product detail pages, which in ads. Our production team includes 4 photographers, 3 cinematographers, 2 drone pilots, a styling team, and a post-production suite. We shoot in our 1,200 sq ft studio in Gurgaon, on-location across Delhi NCR (restaurants, salons, gyms, corporate offices, founder homes), or at destination locations for specific brand narratives. We have delivered 150+ brand shoots for Delhi NCR brands — from bootstrapped D2C startups to funded SaaS companies to luxury fashion labels to Michelin-mentioned restaurants. We understand the difference between catalog photography (clean, white-background, e-commerce-optimised) and lifestyle photography (contextual, story-driven, social-first). We know how to light a founder portrait that conveys authority without looking corporate. We know how to shoot food that makes a viewer stop scrolling. We know how to produce a 30-second brand anthem film that earns emotional investment in your story. Whether you are launching a new D2C brand with 10 SKUs that need catalog + lifestyle photography, or a B2B SaaS founder who needs 30 days of LinkedIn content, or a restaurant that needs a seasonal menu shoot, our playbook is engineered to produce brand assets that elevate you above stock-content mediocrity.",
  whyChooseUs: [
    {
      icon: "Palette",
      title: "Production-grade creative",
      description:
        "4 photographers, 3 cinematographers, 2 drone pilots, a styling team, and a post-production suite. We deliver the production quality of an advertising agency at the price of a brand studio.",
    },
    {
      icon: "Camera",
      title: "Content-first briefing",
      description:
        "Every shoot is briefed as a content production with a defined distribution calendar — which images on the website, which on Instagram, which on LinkedIn, which in ads. Not just 'photography'.",
    },
    {
      icon: "Film",
      title: "Photo + video in one shoot",
      description:
        "Most brand shoots produce either photography or video. We produce both in a single shoot day — catalog images, lifestyle photography, founder portraits, brand anthem film, social-first reels.",
    },
    {
      icon: "Gauge",
      title: "7-day delivery SLA",
      description:
        "Most photography studios deliver in 21-30 days. Our post-production suite delivers catalog images, lifestyle photography, founder portraits, and social-first reels within 7 days of the shoot.",
    },
  ],
  processSteps: [
    {
      step: "01",
      title: "Creative Brief",
      description:
        "We map the shoot to your brand narrative, distribution channels, and content calendar. Deliverable: a creative brief covering shot list, styling, locations, talent, and distribution plan.",
    },
    {
      step: "02",
      title: "Pre-Production",
      description:
        "Styling, location scouting, talent booking, props, shot list finalisation. 1-2 week preparation window depending on shoot complexity. We handle every logistic so you just show up and shoot.",
    },
    {
      step: "03",
      title: "Production Day",
      description:
        "Studio or on-location shoot with 2-4 person production team. Photo + video in one shoot day. We shoot for the distribution calendar — every shot has a defined end-use.",
    },
    {
      step: "04",
      title: "Post-Production",
      description:
        "7-day delivery: catalog images (clean, e-commerce-optimised), lifestyle photography (contextual, social-first), founder portraits, brand anthem film, social-first reels. Full content library.",
    },
  ],
  benefits: [
    {
      icon: "TrendingUp",
      title: "6-12 months of content",
      description:
        "A single brand shoot day produces 6-12 months of content assets — catalog images, lifestyle photography, founder portraits, brand anthem film, social-first reels. Stop buying stock photography.",
    },
    {
      icon: "Palette",
      title: "Brand consistency",
      description:
        "All your content — website, Instagram, LinkedIn, ads — shot in one production with one styling direction. Your brand looks cohesive across every channel, not like a patchwork of stock photos.",
    },
    {
      icon: "Camera",
      title: "Photo + video in one shoot",
      description:
        "Most brand shoots produce either photography or video. We produce both in a single shoot day — saving you the cost of two separate productions and ensuring visual consistency.",
    },
    {
      icon: "Gauge",
      title: "7-day delivery",
      description:
        "Most photography studios deliver in 21-30 days — by which time your campaign has moved on. Our post-production suite delivers within 7 days, so your content is fresh when it ships.",
    },
    {
      icon: "Users",
      title: "Founder personal brand",
      description:
        "We know how to light a founder portrait that conveys authority without looking corporate. Founder personal-brand photography that elevates your LinkedIn, website, and PR assets.",
    },
    {
      icon: "Film",
      title: "Brand anthem films",
      description:
        "30-60 second brand anthem films that earn emotional investment in your story. Used on your website hero, in investor decks, in PR outreach, and as the top-of-funnel ad creative.",
    },
  ],
  stats: [
    { value: 150, suffix: "+", label: "Brand shoots delivered" },
    { value: 7, suffix: "days", label: "Delivery SLA" },
    { value: 12, suffix: "mo", label: "Content per shoot" },
    { value: 1200, suffix: "sqft", label: "Studio space" },
  ],
  faqs: [
    {
      q: "How much does a brand shoot cost in Delhi NCR?",
      a: "Our brand shoot packages start at ₹45,000 for a half-day studio shoot (1 photographer, catalog + lifestyle photography, 1 product category). Full-day studio shoots start at ₹75,000. On-location shoots start at ₹1,20,000. Brand anthem film production starts at ₹1,50,000. Multi-day D2C catalog shoots scale to ₹3,00,000+. Post-production retouching is included in the package price.",
    },
    {
      q: "How long does delivery take?",
      a: "7 days for the full deliverable package — catalog images, lifestyle photography, founder portraits, social-first reels. Brand anthem films deliver in 14 days. Most photography studios deliver in 21-30 days; we deliver in 7 because we run an in-house post-production suite, not a freelance editor.",
    },
    {
      q: "Do you handle styling, makeup, and props?",
      a: "Yes — full pre-production is included in every package. Our styling team handles wardrobe direction, makeup artist booking, props sourcing, and set design. For founder portraits and personal-brand shoots, we provide styling consultation before the shoot day to ensure your wardrobe aligns with your brand narrative.",
    },
    {
      q: "Do you have your own studio, or do you shoot on-location?",
      a: "Both. We have a 1,200 sq ft studio in Gurgaon with full lighting, backdrops, and styling area. We also shoot on-location across Delhi NCR — restaurants, salons, gyms, corporate offices, founder homes, outdoor locations. Destination shoots (outside Delhi NCR) are billed with travel and logistics.",
    },
    {
      q: "Can you produce video brand assets in the same shoot as photography?",
      a: "Yes — this is one of our differentiators. Most brand shoots produce either photography or video, requiring two separate productions. We produce both in a single shoot day: catalog images, lifestyle photography, founder portraits, brand anthem film, and social-first reels. Saves cost and ensures visual consistency.",
    },
    {
      q: "Do you also handle product catalog photography for D2C?",
      a: "Yes — D2C catalog photography is one of our highest-volume offerings. Clean, white-background catalog images (e-commerce-optimised for Shopify, Amazon, Flipkart), plus lifestyle photography showing the product in use. We have shot 50+ D2C brands across fashion, beauty, electronics, home goods, and food.",
    },
  ],
  caseStudy: {
    client: "D2C skincare brand, 8 SKUs (name withheld under NDA)",
    challenge:
      "Brand was using a mix of stock photography and smartphone product shots. Website conversion rate was 1.4%. Instagram engagement was low. Brand looked amateur next to funded competitors.",
    solution:
      "Full-day studio + on-location brand shoot: 8 product catalog images (clean, e-commerce-optimised), 24 lifestyle images (showing product in use), founder portrait series, 30-second brand anthem film, 12 social-first reels for Instagram. All shot in one production day.",
    results: [
      "Website conversion rate 1.4% → 3.2% within 60 days",
      "Instagram engagement up 4.8x in 90 days",
      "Content library sustained 6 months of marketing",
      "Investor deck upgrade contributed to Series A close",
    ],
  },
  relatedServices: [
    "salon-marketing",
    "fitness-marketing",
    "restaurant-marketing",
    "event-shoots-management",
  ],
};

/* ====================================================================== */
/*  EXPORTED ARRAY + HELPERS                                              */
/* ====================================================================== */

export const industryPages: IndustryPage[] = [
  realEstateMarketing,
  medicalMarketing,
  lawFirmMarketing,
  startupItSupport,
  restaurantMarketing,
  educationMarketing,
  ecommerceMarketing,
  salonMarketing,
  fitnessMarketing,
  eventShootsManagement,
  seoRanking,
  brandShoot,
];

export function getIndustryBySlug(slug: string): IndustryPage | undefined {
  return industryPages.find((p) => p.slug === slug);
}

export function getAllIndustrySlugs(): string[] {
  return industryPages.map((p) => p.slug);
}

export function getRelatedIndustries(
  slug: string,
  count = 4,
): IndustryPage[] {
  const current = getIndustryBySlug(slug);
  if (!current) return [];
  return current.relatedServices
    .map((s) => getIndustryBySlug(s))
    .filter((p): p is IndustryPage => Boolean(p))
    .slice(0, count);
}
