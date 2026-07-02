// Shared blog post data — used by /blog listing + /blog/[slug] detail pages
// + InsightsHub section component (kept separate to avoid circular deps).

export type BlogCategory =
  | "SEO"
  | "Social Media"
  | "Branding"
  | "Web Design"
  | "Paid Ads";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML string with h2/p/ul/li/a tags
  category: BlogCategory;
  tags: string[];
  author: string;
  authorRole: string;
  authorBio: string;
  publishedAt: string; // ISO date string
  readTime: number; // minutes
  featuredImageColor: string; // gradient theme key — used by cards
  /** Optional real AI-generated header image (relative to /public). */
  featuredImage?: string;
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "10-local-seo-strategies-delhi-2026",
    title: "10 Local SEO Strategies for Delhi Businesses in 2026",
    excerpt:
      "Delhi's local search landscape is more competitive than ever. These 10 proven local SEO tactics will help your business show up in the Map Pack and dominate neighbourhood-level searches across NCR.",
    category: "SEO",
    tags: ["Local SEO", "Google Business Profile", "Delhi", "Map Pack", "Reviews"],
    author: "Priya Sharma",
    authorRole: "Head of SEO, Social Viens",
    authorBio:
      "Priya leads the SEO practice at Social Viens. She has helped 80+ local businesses across Delhi NCR triple their organic leads through technical SEO, content strategy, and review-building playbooks.",
    publishedAt: "2026-01-12T09:00:00.000Z",
    readTime: 9,
    featuredImageColor: "emerald",
    featuredImage: "/images/blog/01-local-seo-delhi.png",
    featured: true,
    content: `
<p>If your business serves customers in Delhi, your most valuable traffic source in 2026 isn't Google's organic blue links — it's the <strong>Map Pack</strong>. The three listings that appear above organic results for "near me" queries capture roughly 44% of all clicks for local-intent searches. Yet most businesses still treat local SEO as an afterthought, leaving high-intent traffic on the table for competitors.</p>

<p>After auditing 200+ Delhi businesses last year, we identified the 10 tactics that consistently move the needle. None require a massive budget — but they do require consistency and the right sequence.</p>

<h2>1. Optimise Your Google Business Profile Like a Landing Page</h2>
<p>Your Google Business Profile (GBP) is no longer a directory listing — it's a conversion surface. Fill every field: primary category, secondary categories (up to 9), services, products, attributes, hours, and the description (750 characters with keywords placed naturally in the first 250). Add 3+ new photos every month — businesses with 100+ photos get 520% more calls than the average.</p>

<h2>2. Build Neighbourhood-Level Service Pages</h2>
<p>Google's local algorithm rewards relevance. If you serve Connaught Place, Dwarka, and Noida, create dedicated landing pages for each location with:</p>
<ul>
  <li>A unique H1 mentioning the neighbourhood + your service</li>
  <li>Local landmarks, nearby transit, and customer testimonials from that area</li>
  <li>An embedded Google Map and a NAP block (Name, Address, Phone) matching your GBP exactly</li>
  <li>Original content — never copy-paste the same page with just the location swapped</li>
</ul>

<h2>3. Engineer a Review Velocity Strategy</h2>
<p>Total review count matters, but <em>review velocity</em> (how many new reviews you get per month) matters more. We've seen businesses jump from position 7 to position 1 in the Map Pack just by getting 8–12 new reviews monthly for 90 days straight. Use a post-transaction SMS with a direct review link, and respond to every review — positive and negative — within 24 hours.</p>

<h2>4. Clean Up Your Local Citations</h2>
<p>NAP consistency across 50+ local directories (JustDial, IndiaMART, Sulekha, Foursquare, Apple Maps, Bing Places) is foundational. Inconsistent phone numbers or addresses confuse Google's entity graph and dilute trust. Use a citation management tool or run a manual audit quarterly.</p>

<h2>5. Win the "Near Me" Game with Schema Markup</h2>
<p>Add <code>LocalBusiness</code> schema with <code>areaServed</code>, <code>openingHoursSpecification</code>, and <code>aggregateRating</code> to every page. Pair this with FAQ schema answering questions like "What areas do you serve in Delhi?" — you'll often win featured snippets for local long-tail queries.</p>

<h2>6. Dominate Local Link Building</h2>
<p>Local backlinks carry disproportionate weight. Sponsor a Delhi NGO, get featured in a neighbourhood Facebook group, partner with complementary local businesses (a gym partnering with a physiotherapist, for example), and pitch stories to local news outlets like <em>Delhi Times</em> or <em>The Hindu Delhi</em>. One DR-40 local link is worth more than 10 generic directory links.</p>

<h2>7. Publish Hyperlocal Content</h2>
<p>Write blog posts and guides tied to Delhi events, news, and neighbourhoods. "Best Wedding Photographers in Hauz Khas 2026", "How Delhi Monsoon Affects Your Roof — and What to Do", "GST Filing Deadlines for Dwarka Small Businesses". This pulls in long-tail local traffic and signals to Google that your site is a Delhi authority.</p>

<h2>8. Speed Up Your Mobile Site to Sub-3-Second Load Times</h2>
<p>Google's mobile-first indexing means your mobile site speed directly impacts local rankings. Compress images, lazy-load below-the-fold content, and use a CDN with edge nodes in India. A site loading in 2.5s vs 5s can mean the difference between position 3 and position 8 in the Map Pack.</p>

<h2>9. Use Google Posts Weekly</h2>
<p>Google Posts (the offers, events, and updates on your GBP) expire after 7 days. Posting weekly signals active management and gives potential customers fresh reasons to engage. Use high-quality square images, clear CTAs ("Book Now", "Call"), and track UTM links to measure which posts drive real conversions.</p>

<h2>10. Track Local Rankings With Precision</h2>
<p>Don't rely on incognito searches — they're skewed by your location and search history. Use a tool like Local Falcon, BrightLocal, or Whitespark to track grid rankings across Delhi neighbourhoods. You'll spot geographic gaps (e.g., strong in South Delhi but invisible in West Delhi) and fix them with targeted content and citations.</p>

<h2>Putting It All Together</h2>
<p>Local SEO is a 6-month game, not a 6-week sprint. Sequence matters: fix your GBP and citations first (foundational), build neighbourhood pages and reviews second (relevance), then layer local links and content (authority). Most Delhi businesses see Map Pack movement in 60–90 days and meaningful lead growth by month 4. If you're not there yet, the issue is usually execution consistency — not the strategy itself.</p>

<p>Want a free local SEO audit for your Delhi business? <a href="/contact">Book a strategy session with our team</a> — we'll show you exactly where you're losing local traffic and how to fix it.</p>
`,
  },
  {
    slug: "google-business-profile-matters-more-than-website",
    featuredImage: "/images/blog/02-google-business-profile.png",
    title: "Why Your Google Business Profile Matters More Than Your Website",
    excerpt:
      "For local businesses, your Google Business Profile often sees 5-10x more impressions than your website. Here's why GBP is the new front door — and how to optimise it for conversions.",
    category: "SEO",
    tags: ["Google Business Profile", "Local SEO", "Conversion", "Reviews"],
    author: "Priya Sharma",
    authorRole: "Head of SEO, Social Viens",
    authorBio:
      "Priya leads the SEO practice at Social Viens. She has helped 80+ local businesses across Delhi NCR triple their organic leads through technical SEO, content strategy, and review-building playbooks.",
    publishedAt: "2026-01-08T09:00:00.000Z",
    readTime: 7,
    featuredImageColor: "emerald",
    featured: false,
    content: `
<p>Here's a truth most agencies won't tell you: for local service businesses — dentists, lawyers, restaurants, real estate agents, salons — your <strong>Google Business Profile gets 5 to 10 times more impressions than your website</strong>. Yet most businesses spend 95% of their marketing budget on the website and treat GBP as an afterthought.</p>

<p>This is a structural mistake. Your website is a destination; your GBP is a billboard on the busiest road in your city. Let's fix the asymmetry.</p>

<h2>The Numbers Don't Lie</h2>
<p>For a typical dentist in Delhi, here's what we see after 90 days of optimisation:</p>
<ul>
  <li><strong>Website impressions (Google Search):</strong> 2,400/month</li>
  <li><strong>GBP impressions (Search + Maps):</strong> 18,000/month</li>
  <li><strong>Website clicks from GBP:</strong> 1,200/month (50% of all website traffic)</li>
  <li><strong>Direct calls from GBP:</strong> 380/month (bypassing the website entirely)</li>
</ul>
<p>That's 7.5x more visibility on GBP than the website alone. And the calls that come directly from GBP? Those are the highest-intent leads you'll ever get — they searched for a dentist near them, saw you, and called within 60 seconds.</p>

<h2>Why GBP Outperforms Your Website</h2>
<p>Three reasons:</p>
<ul>
  <li><strong>Position:</strong> The Map Pack appears above organic results. Users click the top 3 before scrolling.</li>
  <li><strong>Friction:</strong> Calling or getting directions from GBP takes one tap. Going to your website, finding the contact page, and calling takes 4–5 taps.</li>
  <li><strong>Trust signals:</strong> Reviews, photos, hours, and busy-times are visible upfront — building confidence before the click.</li>
</ul>

<h2>The 7-Point GBP Optimisation Checklist</h2>

<h3>1. Choose the Right Primary Category</h3>
<p>This is the single highest-impact ranking factor on GBP. "Dentist" vs "Cosmetic Dentist" vs "Pediatric Dentist" puts you in entirely different result pools. Pick the most specific category that's still accurate for 70%+ of your work.</p>

<h3>2. Write a Description That Converts</h3>
<p>You get 750 characters. Use the first 250 for your primary keyword + value proposition. Use the rest for services, USPs, and a soft CTA. Don't keyword-stuff — Google flags it.</p>

<h3>3. Upload 50+ Photos (Yes, Really)</h3>
<p>Businesses with 100+ photos get 520% more calls and 2,717% more direction requests. Include: exterior (so customers can find you), team, services in action, before/after (for medical, dental, salon), and short videos. Add new photos monthly.</p>

<h3>4. Add Services & Products with Prices</h3>
<p>Each service is a mini landing page on GBP. Add descriptions, prices (transparency builds trust), and custom images. GBP now allows you to link each service directly to a booking page on your website.</p>

<h3>5. Enable Messaging & Respond in Under 60 Minutes</h3>
<p>GBP messaging lets customers text you directly. Response time is now a ranking factor. Use auto-replies for after-hours and aim for sub-15-minute response times during business hours.</p>

<h3>6. Post Weekly Using Google Posts</h3>
<p>Posts expire after 7 days but appear prominently on your profile. Use them for offers, events, new services, and educational content. Posts with images get 3x more engagement than text-only.</p>

<h3>7. Engineer Reviews Strategically</h3>
<p>Ask happy customers within 24 hours of service (peak memory & enthusiasm). Send a direct review link via SMS, not email — SMS has a 7x higher response rate. Respond to every review publicly with the customer's name and a specific reference to their visit.</p>

<h2>The "GBP-First" Marketing Stack</h2>
<p>If you're a local business with a limited budget, here's the order of investment that maximises ROI:</p>
<ul>
  <li><strong>Month 1:</strong> GBP optimisation + review engine + citation cleanup</li>
  <li><strong>Month 2:</strong> Google Posts cadence + photo updates + messaging setup</li>
  <li><strong>Month 3:</strong> A fast, mobile-first website with clear CTAs + LocalBusiness schema</li>
  <li><strong>Month 4+:</strong> Local content marketing + Google Ads for high-intent keywords</li>
</ul>
<p>Most businesses do this backwards — they spend ₹2 lakh on a beautiful website, then wonder why no one visits it. The fix is to invest where the eyeballs already are.</p>

<h2>Common GBP Mistakes Killing Your Conversions</h2>
<ul>
  <li><strong>Keyword-stuffed business names:</strong> "Smile Dental Clinic — Best Dentist in Delhi Connaught Place" can get your profile suspended. Use your real registered name.</li>
  <li><strong>Stock photos:</strong> Google's algorithm now detects stock images and downranks them. Use real photos of your business.</li>
  <li><strong>Ignoring Q&A:</strong> Customers ask questions on your GBP. Unanswered questions get answered by strangers — sometimes with wrong info. Monitor weekly.</li>
  <li><strong>Listing virtual offices:</strong> Google requires a real physical location where you serve customers. Virtual offices can trigger suspensions.</li>
</ul>

<p>Your Google Business Profile is not a "set it and forget it" channel — it's a living, breathing conversion asset. Treat it with the same care you'd give your website, and you'll see the leads follow.</p>

<p><a href="/contact">Need help optimising your GBP?</a> Our team offers a free 30-minute audit where we review your profile, identify gaps, and build a 90-day improvement plan.</p>
`,
  },
  {
    slug: "website-speed-hidden-conversion-killer",
    featuredImage: "/images/blog/04-website-conversion.png",
    title: "Website Speed: The Hidden Conversion Killer You're Ignoring",
    excerpt:
      "A 1-second delay can cut conversions by 20%. We break down why speed matters, how to measure it, and the 8 fixes that deliver the biggest performance gains for Indian businesses.",
    category: "Web Design",
    tags: ["Performance", "Core Web Vitals", "Conversion", "Page Speed"],
    author: "Neha Gupta",
    authorRole: "Lead Web Developer, Social Viens",
    authorBio:
      "Neha leads web development at Social Viens. A Core Web Vitals specialist, she has rebuilt 60+ slow websites into sub-2-second revenue machines without sacrificing design.",
    publishedAt: "2026-01-05T09:00:00.000Z",
    readTime: 8,
    featuredImageColor: "amber",
    featured: false,
    content: `
<p>Every 100 milliseconds of load time costs Amazon 1% in sales. For your business, the math is similar — except you don't have Amazon's margin to absorb it. If your website loads in 4 seconds, you're bleeding 25–35% of potential conversions to faster competitors.</p>

<p>Speed isn't a "nice to have." It's the foundation every other conversion tactic sits on. You can have the best copy, the most beautiful design, and the smartest funnel — if your site loads in 5 seconds, half your visitors never see it.</p>

<h2>The Real Cost of Slow Sites</h2>
<p>Here's what the data shows across industries:</p>
<ul>
  <li><strong>0–2 second load time:</strong> Average conversion rate 8.5%</li>
  <li><strong>2–3 second load time:</strong> Conversion drops to 5.2% (−39%)</li>
  <li><strong>3–4 second load time:</strong> Conversion drops to 3.8% (−55%)</li>
  <li><strong>5+ second load time:</strong> Conversion drops below 2% (−76%)</li>
</ul>
<p>The drop-off is steepest in the first 2 seconds. Going from 4s to 2s can literally double your leads without changing anything else on your site.</p>

<h2>How to Actually Measure Speed (Not What You Think)</h2>
<p>Most business owners check their site speed with one of those "free site speed test" tools, see a 60/100 score, and feel bad. That score is meaningless for conversion optimisation. What matters are three Core Web Vitals:</p>
<ul>
  <li><strong>LCP (Largest Contentful Paint):</strong> How long until the largest visible element renders. Target: under 2.5 seconds.</li>
  <li><strong>INP (Interaction to Next Paint):</strong> How fast the site responds to user clicks/taps. Target: under 200ms.</li>
  <li><strong>CLS (Cumulative Layout Shift):</strong> How much the page jumps around while loading. Target: under 0.1.</li>
</ul>
<p>Measure these with Google PageSpeed Insights (which shows real-world Chrome user data) or the Core Web Vitals report in Google Search Console. Lab data from Lighthouse is useful for diagnosis but field data is what determines rankings and conversions.</p>

<h2>The 8 Fixes That Actually Move the Needle</h2>

<h3>1. Compress and Serve Images in WebP/AVIF</h3>
<p>Images are 60–80% of page weight on most sites. Converting JPEGs to WebP cuts size by 30–50% with no visible quality loss; AVIF saves 50–70%. Use responsive image sizing — don't load a 4000px hero image on a 390px mobile screen. Set explicit width/height attributes to prevent CLS.</p>

<h3>2. Lazy-Load Below-the-Fold Content</h3>
<p>Why load images and videos the user hasn't scrolled to yet? Native <code>loading="lazy"</code> on img and iframe tags defers loading until they're near the viewport. This alone can cut initial load time by 30–50%.</p>

<h3>3. Eliminate Render-Blocking Resources</h3>
<p>CSS and JavaScript in the <code>&lt;head&gt;</code> block rendering. Defer non-critical JS, inline critical CSS, and preload your main font. Most WordPress sites have 5–10 render-blocking plugins — each adds 100–300ms.</p>

<h3>4. Use a CDN With Edge Nodes in India</h3>
<p>If your server is in the US and your customer is in Mumbai, every request travels 13,000 km round-trip — that's 200–400ms of latency minimum. A CDN like Cloudflare, Bunny, or Fastly caches your site at edge locations in Mumbai and Chennai, cutting latency to under 30ms.</p>

<h3>5. Audit and Remove Unused Third-Party Scripts</h3>
<p>Every analytics tag, chat widget, and pixel costs 50–150ms. We audited a client site with 23 third-party scripts — 9 were redundant (multiple analytics tools, two chat widgets, an old Facebook pixel). Cutting them improved load time by 1.8 seconds.</p>

<h3>6. Upgrade to PHP 8.2+ and Use Object Caching</h3>
<p>If you're on WordPress, PHP 8.2 is 30% faster than PHP 7.4. Pair it with Redis or Memcached object caching and full-page caching (LiteSpeed Cache or WP Rocket). The combination can take a 4-second site to 1.2 seconds.</p>

<h3>7. Self-Host Fonts and Use <code>font-display: swap</code></h3>
<p>Google Fonts and Adobe Fonts add DNS lookups and render-blocking CSS. Self-host your fonts (one or two families max — one display, one body), subset them to the characters you actually use, and add <code>font-display: swap</code> so text shows immediately in a system font while yours loads.</p>

<h3>8. Implement Code Splitting for JS-Heavy Sites</h3>
<p>If your site is a React/Vue SPA, ship only the JavaScript needed for the current route. Use dynamic imports for below-the-fold components. We've cut initial JS payloads from 800KB to 120KB with aggressive code splitting.</p>

<h2>Mobile Speed Is What Actually Matters</h2>
<p>India has 700M+ smartphone users, and 80% of them access the web primarily on mobile — often on 4G connections that throttle during peak hours. A site that loads in 2 seconds on your office WiFi might take 6 seconds on a congested Metro ride. Test on real mid-range Android devices (₹12,000–₹18,000 phones, not flagship iPhones) over throttled 4G. That's your real-world performance.</p>

<h2>Speed = Revenue</h2>
<p>One of our clients — a Delhi real estate developer — reduced their average load time from 5.8s to 1.9s. Result? Form submissions went up 47%. Bounce rate dropped from 68% to 41%. Average session duration doubled. Same traffic, same content, same ad spend — just a faster site.</p>

<p>The fix isn't always expensive. Many of the wins above can be implemented in a week by a competent developer. The question isn't <em>whether</em> to fix your site speed — it's how much money you're losing every day you don't.</p>

<p><a href="/contact">Get a free Core Web Vitals audit</a> — we'll measure your real-world mobile performance and prioritise the fixes with the highest ROI.</p>
`,
  },
  {
    slug: "real-estate-developers-100-leads-monthly",
    featuredImage: "/images/blog/07-content-marketing.png",
    title: "How Real Estate Developers Can Generate 100+ Qualified Leads Monthly",
    excerpt:
      "A proven paid + organic playbook that's helped Delhi-NCR developers build a predictable pipeline of high-intent buyers — without burning budget on generic awareness ads.",
    category: "Paid Ads",
    tags: ["Real Estate", "Lead Generation", "Google Ads", "Meta Ads", "Delhi NCR"],
    author: "Arjun Malhotra",
    authorRole: "Performance Marketing Lead, Social Viens",
    authorBio:
      "Arjun has led real estate performance campaigns across Google, Meta, and native platforms for Delhi-NCR developers. His campaigns consistently deliver ROAS of 6:1 or higher.",
    publishedAt: "2026-01-02T09:00:00.000Z",
    readTime: 10,
    featuredImageColor: "gold",
    featured: false,
    content: `
<p>Real estate is the hardest category in performance marketing. Ticket sizes are large (₹50L–₹5Cr), decision cycles are long (3–12 months), and competition is brutal — every developer in NCR is bidding on the same keywords and the same audiences. Generic "boost post" marketing doesn't work here.</p>

<p>After managing campaigns for 14 developers across Gurgaon, Noida, and Dwarka Expressway, we've distilled a playbook that consistently delivers 100+ qualified leads per month at a cost-per-lead under ₹2,800. Here's the system.</p>

<h2>Step 1: Define "Qualified" Before You Spend a Rupee</h2>
<p>Most developers define a lead as "someone who filled a form." That's why their cost-per-lead looks great but their sales team complains about quality. Define qualification in 3 tiers:</p>
<ul>
  <li><strong>Tier 1 (Hot):</strong> Filled form with phone + budget + timeline + project interest. ~15% of leads. Convert at 8–12%.</li>
  <li><strong>Tier 2 (Warm):</strong> Filled form with phone + project interest. ~35% of leads. Convert at 3–5%.</li>
  <li><strong>Tier 3 (Cold):</strong> Phone only, no other info. ~50% of leads. Convert at 0.5–1%.</li>
</ul>
<p>Track cost-per-Tier-1-lead, not cost-per-lead. That's the metric that determines whether your campaign is profitable.</p>

<h2>Step 2: Build a Conversion-Optimised Landing Page (Not Your Homepage)</h2>
<p>Driving ad traffic to your homepage is the #1 mistake in real estate marketing. Your homepage serves 50 different audiences. A landing page serves one. Build a dedicated page for each project with:</p>
<ul>
  <li>Hero with one stunning project image + clear price band + location pin</li>
  <li>Above-the-fold form (name, phone, budget, timeline) — not buried at the bottom</li>
  <li>3D walkthrough / video tour embedded (creates emotional investment in 90 seconds)</li>
  <li>Location advantages (metro, airport, schools, hospitals — with travel times)</li>
  <li>Floor plans & pricing PDFs gated behind form completion</li>
  <li>Rera number, builder history, and 5+ social proof elements (testimonials, ratings, awards)</li>
  <li>Single CTA repeated 3–4 times down the page</li>
</ul>

<h2>Step 3: Run Intent-Based Google Ads (Search)</h2>
<p>Search captures the highest-intent audience — people actively looking for property. Build campaigns around:</p>
<ul>
  <li><strong>Project-branded keywords:</strong> "luxury apartments Dwarka Expressway" — your warmest traffic</li>
  <li><strong>Competitor-branded keywords:</strong> bid on rival project names with comparison landing pages</li>
  <li><strong>Location-intent keywords:</strong> "3 BHK in Gurgaon Sector 56", "ready-to-move Noida Extension"</li>
  <li><strong>Budget-intent keywords:</strong> "2 BHK under 80 lakh Delhi NCR"</li>
  <li><strong>Negative keyword list:</strong> "rent", "PG", "jobs", "cheap" — exclude relentlessly</li>
</ul>
<p>Use sitelinks, callouts, and structured snippets to maximise real estate on the SERP. Enable call extensions — 35% of real estate leads come from direct calls, not form fills.</p>

<h2>Step 4: Run Demand-Generation Meta Ads (Awareness → Consideration)</h2>
<p>Meta (Facebook + Instagram) is where you create demand. People aren't searching for your project, but they're scrolling. Capture them with:</p>
<ul>
  <li><strong>Video-first creative:</strong> 30-60s cinematic walkthroughs. Skippable but emotional. View-through conversions are huge in real estate.</li>
  <li><strong>Carousel ads:</strong> Multiple unit types, floor plans, or amenities in one ad</li>
  <li><strong>Lead-form ads (in-app):</strong> Lower friction than landing page forms but lower quality. Pre-fill phone + name, ask 2 custom questions (budget, timeline).</li>
  <li><strong>Retargeting:</strong> 70% of conversions happen after multiple touchpoints. Retarget website visitors with testimonials, price reveals, and limited-time offers.</li>
  <li><strong>Lookalike audiences:</strong> Build lookalikes from past buyers, high-value website visitors, and engagement audiences.</li>
</ul>

<h2>Step 5: Layer WhatsApp Lead Nurturing</h2>
<p>Real estate leads go cold in 5 minutes. The first response time dictates conversion: leads contacted within 5 minutes convert 9x more than those contacted after 60 minutes. Use WhatsApp Business API for instant follow-up:</p>
<ul>
  <li>Auto-send project brochure + price sheet the moment a form is submitted</li>
  <li>Send a 30-second video tour in the same message</li>
  <li>Schedule a follow-up sequence: Day 1 brochure, Day 2 site visit invite, Day 4 comparison with 2 alternatives, Day 7 price-negotiation tip</li>
  <li>Use WhatsApp click-to-chat ads from Meta — leads land in your WhatsApp directly</li>
</ul>

<h2>Step 6: Build a Hyperlocal SEO Foundation</h2>
<p>Organic traffic takes 6–9 months to compound but delivers the cheapest Tier-1 leads. Build:</p>
<ul>
  <li>Project-specific landing pages optimised for "[project name] reviews", "[project name] price", "[project name] location"</li>
  <li>Neighbourhood guides ("Living in Dwarka Expressway: The Complete 2026 Guide")</li>
  <li>Comparison content ("Dwarka Expressway vs Noida Extension: Where Should You Buy in 2026?")</li>
  <li>Google Business Profile for each project location with weekly updates</li>
  <li>Schema markup for RealEstateListing and FAQ</li>
</ul>

<h2>Step 7: Track Everything With a CRM</h2>
<p>If you don't know which campaign produced the lead that closed, you're flying blind. Connect Google Ads, Meta Ads, your website forms, and your sales team's call log to a CRM (HubSpot, Zoho, or even a well-built Google Sheet). Track:</p>
<ul>
  <li>Cost per lead by campaign and platform</li>
  <li>Cost per Tier-1 lead (the real metric)</li>
  <li>Cost per site visit (the strongest conversion predictor)</li>
  <li>Cost per booking</li>
  <li>Revenue per booking vs total ad spend (true ROAS)</li>
</ul>
<p>Pause campaigns that produce cheap-but-cold leads. Double down on campaigns that produce expensive-but-Tier-1 leads. Most developers do the opposite.</p>

<h2>Real Numbers From a Recent Campaign</h2>
<p>Client: Mid-size developer, 3 BHK premium project, Dwarka Expressway. 90-day campaign:</p>
<ul>
  <li>Ad spend: ₹18,50,000 (Google 55%, Meta 45%)</li>
  <li>Total leads: 712</li>
  <li>Tier-1 leads: 118 (16.6%) — beat our 15% benchmark</li>
  <li>Cost per lead: ₹2,598</li>
  <li>Cost per Tier-1 lead: ₹15,678</li>
  <li>Site visits scheduled: 89 (75% of Tier-1 leads)</li>
  <li>Site visits completed: 62 (70% show rate)</li>
  <li>Bookings: 11 (17.7% of completed site visits)</li>
  <li>Average ticket: ₹1.65Cr</li>
  <li>Revenue: ₹18.15 Cr</li>
  <li><strong>ROAS: 9.8x</strong></li>
</ul>
<p>This is replicable. It's not magic — it's a system executed consistently with good creative, rigorous tracking, and a sales team that responds within 5 minutes.</p>

<h2>The Mistake Most Developers Make</h2>
<p>They switch agencies every 6 months because they don't see results. Real estate marketing compounds. Month 1 is foundation. Month 2–3 is optimisation. Month 4–6 is scaling. Month 7+ is when the system starts printing money. If you're switching agencies at month 4, you're paying the cost of setup three times and never reaching the scaling phase.</p>

<p>Pick a partner with real estate experience, give them 6 months, and trust the system. <a href="/contact">Talk to our team</a> if you want a free audit of your current campaigns — we'll tell you exactly where you're leaving leads on the table.</p>
`,
  },
  {
    slug: "luxury-brand-identity-90-day-playbook",
    featuredImage: "/images/blog/06-brand-identity-design.png",
    title: "Building a Luxury Brand Identity from Scratch: A 90-Day Playbook",
    excerpt:
      "Luxury isn't a logo — it's a feeling. Here's the step-by-step process we use to build premium brands that command higher prices and unshakeable customer trust.",
    category: "Branding",
    tags: ["Branding", "Luxury", "Positioning", "Visual Identity", "Strategy"],
    author: "Rahul Verma",
    authorRole: "Creative Director, Social Viens",
    authorBio:
      "Rahul leads brand strategy at Social Viens. In 12 years, he's shaped identities for 40+ premium brands across real estate, hospitality, beauty, and high-end services.",
    publishedAt: "2025-12-28T09:00:00.000Z",
    readTime: 8,
    featuredImageColor: "rose",
    featured: false,
    content: `
<p>A luxury brand is not a logo, a colour palette, or a tagline. A luxury brand is a <strong>promise of elevated experience</strong> — and every touchpoint, from your website's load speed to the way your salesperson answers the phone, either reinforces or breaks that promise.</p>

<p>Building a luxury brand from scratch is fundamentally different from building a mass-market brand. Mass marketing says "everyone." Luxury marketing says "the right few." Here's the 90-day system we use to build premium brands for our clients.</p>

<h2>Days 1–14: Discovery & Positioning</h2>
<p>Before any visual work, you need to know exactly who you are and who you're for. We run a 5-part discovery:</p>
<ul>
  <li><strong>Founder interview:</strong> What story, values, and obsessions drive this brand? Luxury brands always start with a founder's point of view.</li>
  <li><strong>Competitor audit:</strong> Map 10 competitors on a 2x2 matrix (Price vs Experience). Find the white space.</li>
  <li><strong>Customer interviews:</strong> 8–10 conversations with your ideal customers. Listen for emotional language, not demographics.</li>
  <li><strong>Cultural context:</strong> What's happening in your category right now? What's the dominant story? Where can you differentiate?</li>
  <li><strong>Positioning statement:</strong> One sentence: "For [audience] who [desire], [brand] is the [category] that [unique promise] because [reason to believe]."</li>
</ul>

<h2>Days 15–30: Brand Strategy</h2>
<p>Positioning gets translated into a usable strategy document:</p>
<ul>
  <li><strong>Brand archetype:</strong> Are you the Sage (expertise), the Ruler (control), the Magician (transformation), or the Lover (intimacy)? Pick one. Not three.</li>
  <li><strong>Brand voice:</strong> Three adjectives that describe how you sound. (Premium, Warm, Knowledgeable — not "professional, unique, innovative" — those are meaningless.)</li>
  <li><strong>Brand pillars:</strong> 3–5 themes everything you create must reinforce. (For a luxury real estate brand: Craft, Location, Lineage, Discretion.)</li>
  <li><strong>Brand story:</strong> The narrative arc customers hear at every touchpoint. Origin, struggle, transformation, promise.</li>
  <li><strong>Pricing strategy:</strong> Luxury never discounts. Build value first, justify price second.</li>
</ul>

<h2>Days 31–50: Visual Identity</h2>
<p>Now — and only now — do we design the logo and visual system. The strategy is the brief.</p>
<ul>
  <li><strong>Logo:</strong> Simple, timeless, scalable. Luxury logos work in single colour, reverse out, and at 16px favicons. Avoid trends.</li>
  <li><strong>Colour palette:</strong> One dominant colour, one accent, 3–4 neutrals. Luxury uses restraint — 2–3 colours max in any composition.</li>
  <li><strong>Typography:</strong> A serif for headlines (heritage, gravitas) + a clean sans-serif for body (modernity, legibility). Custom letter-spacing and line-heights.</li>
  <li><strong>Photography style:</strong> Defined before any shoot. Lighting, mood, composition, models, locations — all aligned to the brand archetype.</li>
  <li><strong>Iconography & texture:</strong> Subtle details (gold foil, embossed paper, custom illustrations) that signal craft.</li>
</ul>

<h2>Days 51–70: Brand Touchpoints</h2>
<p>The brand identity must work everywhere. Design and specify:</p>
<ul>
  <li><strong>Website:</strong> Generous white space, large imagery, slow deliberate animations, sub-2-second load time (slow = cheap; fast = premium)</li>
  <li><strong>Social media grid:</strong> Curated, magazine-quality, never more than 3 colours per post</li>
  <li><strong>Print collateral:</strong> Business cards (thick stock, soft-touch finish), brochures (uncoated paper, gold foil accents), packaging (minimal, tactile)</li>
  <li><strong>Email signature & templates:</strong> Clean, branded, with a single CTA</li>
  <li><strong>Signage & environmental design:</strong> Office, retail, or showroom experience</li>
  <li><strong>Sales collateral:</strong> Proposal decks, pricing sheets, FAQ documents — all consistent</li>
</ul>

<h2>Days 71–90: Brand Launch & Internalisation</h2>
<p>A brand only exists in the minds of customers. The launch is when it starts to live. We do this in 4 phases:</p>
<ul>
  <li><strong>Internal launch:</strong> Train every employee on the brand story, voice, and visual system. They're the brand now — not the logo.</li>
  <li><strong>Soft launch:</strong> Update all digital touchpoints (website, social, Google Business Profile, email signatures) on the same day. Inconsistency signals cheapness.</li>
  <li><strong>External launch:</strong> One coordinated moment — a launch event, a campaign video, a press feature, an influencer partnership. Luxury brands create moments, not ads.</li>
  <li><strong>90-day reinforcement:</strong> Audit every touchpoint monthly. Are we still on-brand? Where are we drifting?</li>
</ul>

<h2>What Luxury Brands Do Differently</h2>
<p>After 12 years of building premium brands, we've identified 5 patterns that separate true luxury from "premium-looking but not premium-feeling":</p>
<ul>
  <li><strong>Restraint over abundance:</strong> Luxury brands show less, not more. Three products on a clean page beats 30 products in a cluttered grid.</li>
  <li><strong>Story over features:</strong> Mass brands list features. Luxury brands tell origin stories. The Hermès Birkin isn't sold as "a leather bag with gold hardware."</li>
  <li><strong>Exclusivity over accessibility:</strong> Luxury doesn't chase customers. Customers chase luxury. Waiting lists, invitation-only events, limited editions.</li>
  <li><strong>Discretion over visibility:</strong> Luxury brands don't scream. They whisper. Logo size, colour saturation, ad frequency — all dialled down.</li>
  <li><strong>Craft over scale:</strong> Luxury brands talk about how something is made, who made it, and how long it took. Mass brands talk about how cheap it is.</li>
</ul>

<h2>The Most Common Luxury Branding Mistake</h2>
<p>Trying to look premium without <em>being</em> premium. A gold logo on a cheap business card signals "trying too hard." A simple wordmark on thick, soft-touch paper signals "I don't need to try." Luxury is felt in the smallest details — paper weight, kerning, the soft click of a website's hover state, the tone of a salesperson's voice.</p>

<p>If you're charging premium prices, every touchpoint must feel premium. One cheap touchpoint breaks the spell.</p>

<p><a href="/contact">Want to build a brand that commands premium prices?</a> Our team offers a free brand audit — we'll review your current identity across 12 touchpoints and identify what's reinforcing or undermining your premium positioning.</p>
`,
  },
  {
    slug: "social-media-strategies-that-convert-2026",
    featuredImage: "/images/blog/03-instagram-aesthetics.png",
    title: "Social Media Strategies That Actually Convert in 2026",
    excerpt:
      "Stop chasing likes. The platforms have changed, the algorithms have changed, and what worked in 2022 actively hurts you now. Here's the conversion-first framework we use.",
    category: "Social Media",
    tags: ["Social Media", "Content Strategy", "Conversion", "Instagram", "LinkedIn"],
    author: "Ananya Patel",
    authorRole: "Social Media Strategist, Social Viens",
    authorBio:
      "Ananya heads social media at Social Viens. She's built content engines for 30+ brands across D2C, B2B services, and luxury — focusing on conversion over vanity metrics.",
    publishedAt: "2025-12-22T09:00:00.000Z",
    readTime: 7,
    featuredImageColor: "teal",
    featured: false,
    content: `
<p>Most social media advice in 2026 is dangerously outdated. "Post 3 times a week." "Use trending audio." "Reply to every comment." This advice worked in 2020. In 2026, it actively damages your reach.</p>

<p>Here's the truth: social platforms are pay-to-play now. Organic reach for business accounts is 1–3% on Instagram, 2–5% on Facebook, and 5–10% on LinkedIn. The brands winning aren't the ones posting more — they're the ones posting smarter and amplifying with targeted spend.</p>

<h2>The Conversion-First Framework</h2>
<p>We structure every brand's social strategy around 4 content pillars. Each pillar has a job:</p>
<ul>
  <li><strong>Educational (40%):</strong> Solve your audience's problems. Position your brand as the expert. Drives saves and shares — the new engagement signals.</li>
  <li><strong>Social proof (25%):</strong> Customer testimonials, case studies, behind-the-scenes. Drives trust and conversions.</li>
  <li><strong>Entertainment/culture (20%):</strong> Trending formats with your brand's twist. Drives reach and new follower acquisition.</li>
  <li><strong>Promotional (15%):</strong> Offers, launches, CTAs. Direct revenue. Most brands over-index here and lose reach.</li>
</ul>

<h2>Platform-Specific Strategy (One Size Does Not Fit All)</h2>

<h3>Instagram: Reels Are the Only Game</h3>
<p>Reels get 3–5x the reach of static posts. But quality matters more than quantity. The algorithm now rewards:</p>
<ul>
  <li><strong>Hook in first 1.5 seconds:</strong> Visual + text + motion. If viewers don't engage in 1.5s, you're dead.</li>
  <li><strong>Watch time:</strong> 7+ second average view duration. Script for the full duration, not just the first 3 seconds.</li>
  <li><strong>Saves and shares:</strong> These signals are weighted 5x more than likes. Make content worth bookmarking.</li>
  <li><strong>Comments with substance:</strong> The algorithm detects one-word comments ("nice", "wow") and discounts them. Spark real conversations.</li>
</ul>
<p>Post 3–4 Reels per week. Use Stories daily for behind-the-scenes, polls, and time-sensitive offers. Use Broadcast Channels for VIP announcements to your most engaged followers.</p>

<h3>LinkedIn: The B2B Goldmine</h3>
<p>For B2B services, LinkedIn is the highest-ROI platform. The key is personal-brand content from founders/leaders, not corporate page posts:</p>
<ul>
  <li><strong>Text posts with line breaks:</strong> Story format. Short paragraphs. One idea per post. These outperform every other format.</li>
  <li><strong>Carousels (PDF uploads):</strong> Highest save rate of any LinkedIn format. 8–12 slides, one idea per slide.</li>
  <li><strong>Comment strategy:</strong> 30 minutes daily commenting on 10 industry posts. This builds more visibility than your own posts.</li>
  <li><strong>Direct outreach:</strong> LinkedIn InMail converts 3–5x better than cold email. Pair content with weekly outreach to your content's engagers.</li>
</ul>

<h3>YouTube: The Compounding Asset</h3>
<p>YouTube videos compound for years. A video you post today will get 60% of its views in months 2–12. Invest in evergreen how-to content (8–15 minutes) optimised for search. Each video becomes a salesperson working 24/7.</p>

<h2>The Creator-Brand Hybrid Model</h2>
<p>The highest-converting social strategy in 2026 isn't brands posting as brands — it's founders and team members posting as themselves. People buy from people. Build 2–3 personal brands within your company:</p>
<ul>
  <li><strong>Founder:</strong> Vision, strategy, leadership content</li>
  <li><strong>Head of product/service:</strong> How-it-works, behind-the-scenes, expertise</li>
  <li><strong>Customer success lead:</strong> Customer stories, case studies, FAQ content</li>
</ul>
<p>These personal brands amplify your corporate content and build trust faster than any ad can.</p>

<h2>Paid Amplification: The Force Multiplier</h2>
<p>Organic reach is dead. Paid amplification is mandatory. But not all paid is equal:</p>
<ul>
  <li><strong>Boost top organic posts:</strong> Identify your best-performing organic content from the past 30 days and put ₹1,000–₹5,000 behind each. Lower CPAs than scratch-built ad creative.</li>
  <li><strong>Retargeting:</strong> 70% of conversions happen after 3+ touchpoints. Retarget website visitors, video viewers, and engagers with progressive offers.</li>
  <li><strong>Lookalike audiences:</strong> Build lookalikes from your customer list, not from page likes. Past buyers are the highest-quality seed audience.</li>
  <li><strong>Advantage+ campaigns:</strong> Meta's AI optimisation now outperforms manual targeting for most campaigns. Let the algorithm find your buyers.</li>
</ul>

<h2>The 4 Metrics That Actually Matter</h2>
<p>Stop tracking followers, likes, and impressions. They're vanity metrics. Track:</p>
<ul>
  <li><strong>Saves:</strong> The strongest signal of value. Tracks how many people found your content worth revisiting.</li>
  <li><strong>Shares:</strong> The strongest signal of relevance. Tracks how many people found your content worth endorsing.</li>
  <li><strong>Click-through rate to website:</strong> The strongest signal of intent. Tracks how many people took a measurable action.</li>
  <li><strong>Cost per qualified lead from social:</strong> The only metric that matters to your CFO. Tracks the actual business value of your social spend.</li>
</ul>

<h2>The 90-Day Social Media Audit</h2>
<p>If your social media isn't driving business results, here's the audit to run:</p>
<ul>
  <li>Are you posting for your audience or for your ego? (Most brands post for ego.)</li>
  <li>Are your top 10 posts of the last 90 days aligned with your 4 content pillars?</li>
  <li>What's your average save rate per post? (Above 1% is good. Above 3% is excellent.)</li>
  <li>Are you amplifying top organic content with paid spend? (If not, you're leaving 80% of the value on the table.)</li>
  <li>Do you have 2–3 personal brands amplifying your corporate account?</li>
  <li>Can you trace real revenue back to social media in the last 90 days?</li>
</ul>
<p>If you can't answer "yes" to at least 4 of these, your social media is leaking money. The fix usually takes 30–60 days and a budget reallocation, not a complete rebuild.</p>

<p><a href="/contact">Get a free social media audit</a> — we'll review your last 90 days across 12 metrics and tell you exactly what to fix first.</p>
`,
  },
  {
    slug: "google-ads-roas-300-percent-guide",
    featuredImage: "/images/blog/05-paid-ads-roas.png",
    title: "Google Ads ROAS: How to Hit 300%+ Consistently",
    excerpt:
      "Most accounts plateau at 150–200% ROAS because they're optimising for clicks, not revenue. Here's the account structure, bidding strategy, and tracking stack that breaks through.",
    category: "Paid Ads",
    tags: ["Google Ads", "ROAS", "Performance Max", "Conversion Tracking", "E-commerce"],
    author: "Vikram Singh",
    authorRole: "Senior PPC Specialist, Social Viens",
    authorBio:
      "Vikram has led Google Ads accounts across e-commerce, lead gen, and SaaS. His accounts average 4.2x ROAS — 40% above industry benchmarks.",
    publishedAt: "2025-12-18T09:00:00.000Z",
    readTime: 8,
    featuredImageColor: "gold",
    featured: false,
    content: `
<p>A 300% ROAS means for every ₹100 you spend on Google Ads, you get ₹300 back in revenue. That's a 3x return — solid but not exceptional. Yet most accounts we audit are stuck between 150% and 200%, bleeding 30–50% of potential revenue to fixable mistakes.</p>

<p>Hitting 300%+ consistently isn't about bidding tricks or secret keywords. It's about account structure, conversion tracking, and bidding strategy — done in the right order.</p>

<h2>The 5 Reasons Your ROAS Is Stuck Below 200%</h2>
<p>After auditing 80+ Google Ads accounts, the same 5 issues appear over and over:</p>
<ul>
  <li><strong>Broken or incomplete conversion tracking.</strong> If you're not tracking every conversion event (purchase, lead, call, WhatsApp, add-to-cart), Google's bidding is optimising on partial data.</li>
  <li><strong>Treating all keywords the same.</strong> Branded, generic, competitor, and long-tail keywords behave completely differently. Bundling them in one campaign destroys optimisation.</li>
  <li><strong>Wrong bidding strategy for the stage.</strong> Using Target ROAS before you have 30+ conversions per month is the #1 cause of stalled accounts.</li>
  <li><strong>Ignoring search terms.</strong> 30–50% of your spend goes to irrelevant queries. If you're not adding negative keywords weekly, you're burning money.</li>
  <li><strong>Bad landing pages.</strong> Great ads with bad landing pages = wasted clicks. The ad gets the click; the landing page gets the conversion.</li>
</ul>

<h2>The Account Structure That Works</h2>
<p>Structure beats tactics. Split your account into 5 campaign types, each with its own budget and bidding strategy:</p>
<ul>
  <li><strong>Branded search campaign:</strong> Your brand name keywords. Highest ROAS (8–15x), lowest CPC. Budget: 10–15% of total. Bidding: Maximise Clicks (you'll be #1 anyway).</li>
  <li><strong>Non-branded search campaign:</strong> Generic and long-tail keywords. Mid ROAS (3–5x). Budget: 30–40%. Bidding: Maximise Conversions → Target CPA → Target ROAS as data matures.</li>
  <li><strong>Competitor conquest campaign:</strong> Competitor brand keywords. Lower ROAS (2–3x) but steals market share. Budget: 10–15%. Bidding: Maximise Clicks with low CPC caps.</li>
  <li><strong>Performance Max campaign:</strong> Cross-channel (Search, Display, YouTube, Gmail, Discover). Lower ROAS (2.5–4x) but huge reach. Budget: 25–35%. Bidding: Maximise Conversion Value with target ROAS.</li>
  <li><strong>Retargeting campaign:</strong> Display + YouTube retargeting. Highest ROAS (5–10x) on small budgets. Budget: 5–10%. Bidding: Maximise Conversions.</li>
</ul>
<p>Most stuck accounts have everything in one or two campaigns. Segmentation is the unlock.</p>

<h2>The Conversion Tracking Stack (Non-Negotiable)</h2>
<p>Before changing bids or adding keywords, fix tracking. Implement in this order:</p>
<ul>
  <li><strong>Google Tag Manager</strong> as the single source of truth for all tags</li>
  <li><strong>Enhanced Conversions</strong> for accurate cross-device attribution (catches 15–30% more conversions)</li>
  <li><strong>Conversion Value tracking</strong> — pass the actual order value, not just a "conversion happened" signal. Without value, ROAS bidding can't work.</li>
  <li><strong>Offline conversion tracking</strong> for lead-gen accounts — push closed-won deals back to Google Ads from your CRM</li>
  <li><strong>Server-side tagging</strong> for iOS Safari users (recovers 10–20% of lost conversions)</li>
</ul>
<p>Once tracking is solid, give Google's algorithm 30 days of clean data before judging any bidding strategy.</p>

<h2>The Bidding Strategy Ladder</h2>
<p>Most accounts use the wrong bidding strategy for their stage. Here's the progression:</p>
<ul>
  <li><strong>0–15 conversions/month:</strong> Maximise Clicks with manual CPC caps. You need data first.</li>
  <li><strong>15–50 conversions/month:</strong> Maximise Conversions. Let Google find more people likely to convert.</li>
  <li><strong>50–100 conversions/month:</strong> Target CPA. Set your target cost-per-acquisition 10–20% above your actual CPA and let Google optimise.</li>
  <li><strong>100+ conversions/month with conversion values:</strong> Target ROAS. Start 20% below your actual ROAS and tighten over 30 days.</li>
</ul>
<p>Jumping to Target ROAS too early is the #1 reason accounts stall. The algorithm needs 30+ conversions per campaign per month to make smart bidding decisions.</p>

<h2>The Weekly Optimisation Routine</h2>
<p>Google Ads isn't "set and forget." Run this 30-minute weekly routine:</p>
<ul>
  <li><strong>Review search terms report:</strong> Add 5–10 new negative keywords weekly. Look for irrelevant queries draining budget.</li>
  <li><strong>Pause underperformers:</strong> Keywords with 50+ clicks and 0 conversions → pause. Ad groups with ROAS below 50% of target → pause or restructure.</li>
  <li><strong>Bid adjustments:</strong> If mobile ROAS is 3x desktop, increase mobile bid adjustment. If Delhi ROAS is 5x Mumbai, geo-adjust.</li>
  <li><strong>Add new keywords:</strong> Mine the search terms report for high-converting queries not yet in your account.</li>
  <li><strong>Refresh ad creative:</strong> Test 2 new ad variations per ad group every 2 weeks. Ad fatigue kicks in at 4–6 weeks.</li>
</ul>

<h2>The Landing Page Equation</h2>
<p>ROAS = (Conversion Rate × Average Order Value) ÷ Cost Per Click. You can improve ROAS by improving any of these 3 variables — but landing page conversion rate is the easiest lever.</p>
<p>For lead-gen, every 0.5% improvement in landing page conversion rate translates to roughly 25% ROAS improvement. Test:</p>
<ul>
  <li>Form length (5 fields vs 3 fields — usually 3 wins)</li>
  <li>Headline clarity (specific > clever)</li>
  <li>Social proof placement (above the fold > below)</li>
  <li>Page load speed (sub-2s = 30% higher conversion)</li>
  <li>Single CTA vs multiple CTAs (single wins for lead-gen)</li>
</ul>

<h2>Real Account Transformation</h2>
<p>Client: D2C skincare brand, ₹8 lakh/month Google Ads spend. Started at 165% ROAS.</p>
<ul>
  <li>Week 1: Fixed conversion tracking (added Enhanced Conversions + server-side tagging)</li>
  <li>Week 2: Restructured account into 5 campaign types</li>
  <li>Week 3: Switched to Maximise Conversions on non-branded (was using Target ROAS too early)</li>
  <li>Week 4–6: Built negative keyword list (250+ negatives)</li>
  <li>Week 6: A/B tested landing pages (new variant = 2.1x conversion rate)</li>
  <li>Week 8: Switched non-branded to Target ROAS</li>
  <li>Week 10: Scaled budget 40% as ROAS held</li>
</ul>
<p><strong>Result after 90 days: 387% ROAS — a 2.3x improvement on the same ad spend.</strong></p>

<p>This isn't unusual. It's what happens when you fix the fundamentals. Most accounts are 30–60 days away from a similar transformation — they just need the right sequence of fixes.</p>

<p><a href="/contact">Get a free Google Ads audit</a> — we'll review your account against our 47-point checklist and tell you exactly which fixes will deliver the biggest ROAS lift.</p>
`,
  },
  {
    slug: "why-your-website-isnt-converting-how-to-fix-it",
    featuredImage: "/images/blog/08-marketing-automation.png",
    title: "Why Your Website Isn't Converting (And How to Fix It)",
    excerpt:
      "You're getting traffic but no leads. The 7 most common conversion killers we see on every website audit — and the specific fixes that double or triple conversion rates.",
    category: "Web Design",
    tags: ["Conversion Rate", "UX", "Landing Pages", "CRO", "Forms"],
    author: "Neha Gupta",
    authorRole: "Lead Web Developer, Social Viens",
    authorBio:
      "Neha leads web development at Social Viens. A Core Web Vitals specialist, she has rebuilt 60+ slow websites into sub-2-second revenue machines without sacrificing design.",
    publishedAt: "2025-12-15T09:00:00.000Z",
    readTime: 7,
    featuredImageColor: "amber",
    featured: false,
    content: `
<p>You've spent ₹2 lakh on a beautiful website. You're running ads and getting traffic. But the form submissions aren't coming. Your bounce rate is 70%. Your sales team is starved for leads.</p>

<p>This is the most common problem we solve. After auditing 200+ websites, we've identified 7 conversion killers that show up in 90% of cases. None require a redesign — they're fixable in 2–4 weeks.</p>

<h2>Conversion Killer #1: Confusing Value Proposition</h2>
<p>When a visitor lands on your site, you have 5 seconds to answer 3 questions:</p>
<ul>
  <li>What do you do?</li>
  <li>Who is it for?</li>
  <li>Why should I choose you over alternatives?</li>
</ul>
<p>Most websites answer 1 of these questions, vaguely. Your hero section must answer all 3 in plain language. Not "We deliver exceptional digital experiences" (meaningless). But "We help Delhi real estate developers generate 100+ qualified leads monthly through paid ads + landing pages" (crystal clear).</p>

<h2>Conversion Killer #2: Buried or Confusing CTAs</h2>
<p>If your "Contact Us" button is in the footer, it's invisible. CTAs should be:</p>
<ul>
  <li><strong>Above the fold</strong> on every page (visible without scrolling)</li>
  <li><strong>Repeated 3–4 times</strong> down long pages (header, mid-page, footer, exit-intent)</li>
  <li><strong>Action-specific</strong>: "Book Your Free Audit" beats "Submit" or "Click Here"</li>
  <li><strong>Visually distinct</strong>: gold button on dark background, not another grey link</li>
  <li><strong>Mobile-friendly</strong>: 44x44px minimum tap target, thumb-reachable position</li>
</ul>

<h2>Conversion Killer #3: Form Friction</h2>
<p>Every form field reduces conversion rate by 5–10%. We've seen forms go from 1.2% to 4.8% conversion just by cutting from 9 fields to 4. The rule: ask only for what you absolutely need to make first contact.</p>
<p>Bad form: First name, last name, email, phone, company, job title, industry, country, message.</p>
<p>Good form: Name, phone, what you need help with.</p>
<p>Get the rest on the discovery call. Progressive profiling (asking more questions over time as trust builds) beats upfront interrogation.</p>

<h2>Conversion Killer #4: No Social Proof Above the Fold</h2>
<p>Visitors don't trust you. They've never heard of you. The fastest way to build trust: show them others have trusted you. Add above the fold:</p>
<ul>
  <li><strong>Client logos</strong> — 4–6 recognisable brand marks</li>
  <li><strong>Star rating</strong> with review count ("4.9/5 from 127 clients")</li>
  <li><strong>Result numbers</strong> ("Helped 50+ businesses grow 3x")</li>
  <li><strong>Press mentions</strong> or awards (if any)</li>
</ul>
<p>One of these is enough. Four is overkill. Pick the strongest signal for your audience.</p>

<h2>Conversion Killer #5: Slow Mobile Experience</h2>
<p>80% of your traffic is mobile. If your mobile site is slow, cluttered, or has tiny tap targets, you're losing 4 out of 5 visitors. Mobile-specific fixes:</p>
<ul>
  <li>Sticky header with phone number + CTA always visible</li>
  <li>Click-to-call buttons everywhere a phone number appears</li>
  <li>Single-column layout (no pinch-to-zoom required)</li>
  <li>Lazy-loaded images so the page renders fast on 4G</li>
  <li>Form fields with the correct input types (tel for phone, email for email — triggers the right keyboard)</li>
  <li>Sub-3-second load time on a mid-range Android device</li>
</ul>

<h2>Conversion Killer #6: No Trust Signals Through the Funnel</h2>
<p>Trust isn't built in the hero section alone. Layer trust signals throughout the page:</p>
<ul>
  <li><strong>Testimonials</strong> with photo, name, title, and company (anonymous testimonials = no testimonials)</li>
  <li><strong>Case studies</strong> with real numbers (traffic growth, revenue impact, timeline)</li>
  <li><strong>Guarantees</strong> (money-back, satisfaction guarantee, "no contracts")</li>
  <li><strong>FAQ section</strong> answering objection-based questions (cost, timeline, what if it doesn't work)</li>
  <li><strong>About page</strong> with team photos and bios (people buy from people)</li>
  <li><strong>Contact information</strong> — physical address, phone, email visible (not hidden in footer)</li>
</ul>

<h2>Conversion Killer #7: Weak or Confusing Offer</h2>
<p>"Get in touch" is not an offer. "Book a free 30-minute strategy session where we audit your current marketing and identify 3 quick wins" is an offer. The offer is what they get by filling out the form. Make it:</p>
<ul>
  <li><strong>Specific:</strong> "30-minute audit" beats "consultation"</li>
  <li><strong>Valuable:</strong> Something they'd pay for (audit, checklist, template)</li>
  <li><strong>Low-risk:</strong> "Free" + "no obligation" + "no commitment"</li>
  <li><strong>Time-bound:</strong> "This week" creates urgency</li>
  <li><strong>Tangible:</strong> They should know exactly what they'll walk away with</li>
</ul>

<h2>The Conversion Optimisation Process</h2>
<p>Fixing conversion isn't a one-time project — it's a continuous process. Here's the system:</p>
<ul>
  <li><strong>Week 1:</strong> Install proper analytics (Google Analytics 4 + Microsoft Clarity + heatmap recordings)</li>
  <li><strong>Week 2:</strong> Diagnose — where are visitors dropping off? Watch 50+ session recordings. Read 100+ rage clicks.</li>
  <li><strong>Week 3–4:</strong> Fix the 7 killers above. Don't redesign — just fix.</li>
  <li><strong>Week 5+:</strong> A/B test one variable at a time. Headline. CTA copy. Form length. Hero image. Each test = 2 weeks minimum.</li>
  <li><strong>Monthly:</strong> Review analytics. What changed? What's the new bottleneck?</li>
</ul>

<h2>Real Conversion Lifts From Real Clients</h2>
<p>Client: B2B SaaS company. Started at 0.8% landing page conversion. After fixing 4 of the 7 killers (value prop, CTA placement, form friction, mobile experience) in 3 weeks: 3.2% conversion. <strong>4x improvement, no redesign.</strong></p>
<p>Client: Real estate developer. Started at 1.4% landing page conversion. After fixing social proof placement, offer clarity, and form fields: 4.8% conversion. <strong>3.4x improvement in 4 weeks.</strong></p>
<p>Client: Healthcare clinic. Started at 2.1% landing page conversion. After fixing mobile experience, trust signals, and CTA copy: 5.6% conversion. <strong>2.7x improvement in 5 weeks.</strong></p>

<p>The pattern: most websites are 3–5 weeks of focused work away from doubling or tripling conversion. The fixes are simple — they just require someone to look at the site as a customer, not as a stakeholder.</p>

<p><a href="/contact">Get a free conversion audit</a> — we'll review your website against our 47-point CRO checklist and prioritise the fixes with the highest expected lift.</p>
`,
  },
];

// ---------- Helpers ----------

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getBlogPostBySlug(slug);
  if (!current) return blogPosts.slice(0, limit);

  // Same-category posts first (excluding current), then others.
  const sameCategory = blogPosts.filter(
    (p) => p.slug !== slug && p.category === current.category,
  );
  const others = blogPosts.filter(
    (p) => p.slug !== slug && p.category !== current.category,
  );

  return [...sameCategory, ...others].slice(0, limit);
}

export function getAllCategories(): BlogCategory[] {
  // Preserve order of first appearance.
  const seen = new Set<BlogCategory>();
  const result: BlogCategory[] = [];
  for (const post of blogPosts) {
    if (!seen.has(post.category)) {
      seen.add(post.category);
      result.push(post.category);
    }
  }
  return result;
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
