// Shared testimonials data — used by /testimonials page + Testimonials section.
// 12 items across 6 industries with real-sounding metrics and outcomes.

export type TestimonialIndustry =
  | "Real Estate"
  | "Healthcare"
  | "Law"
  | "E-commerce"
  | "Restaurant"
  | "Beauty";

export interface Testimonial {
  id: number;
  name: string;
  business: string;
  industry: TestimonialIndustry;
  rating: number; // 1-5
  text: string;
  results: string; // metric chip e.g. "+180% Traffic"
  featured: boolean;
  hasVideo?: boolean; // if true, render video-play overlay on the card
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rajesh Sharma",
    business: "Luxe Residences",
    industry: "Real Estate",
    rating: 5,
    text: "Social Viens transformed our digital presence completely. Within 6 months, we went from barely any online leads to 85+ qualified inquiries per month. The ROI has been phenomenal — every rupee we invest returns ₹9.80 in closed deals. They understand real estate marketing at a level I haven't seen from any other agency in NCR.",
    results: "962% Lead Growth",
    featured: true,
    hasVideo: true,
  },
  {
    id: 2,
    name: "Dr. Priya Mehta",
    business: "MedVista Healthcare",
    industry: "Healthcare",
    rating: 5,
    text: "As a healthcare provider, we needed a marketing partner who understood our industry's compliance and trust requirements. Social Viens delivered beyond expectations — our patient inquiries increased 7x, and our online appointment bookings now account for 60% of new patient flow. Their GBP optimisation alone was worth the engagement.",
    results: "700% More Inquiries",
    featured: false,
    hasVideo: true,
  },
  {
    id: 3,
    name: "Vikram Singh",
    business: "Singh Legal Associates",
    industry: "Law",
    rating: 5,
    text: "We were skeptical about digital marketing for law firms — most agencies treat us like e-commerce. Social Viens built a strategy that respected our profession's nuances. We now dominate local search for all our practice areas and receive 25+ qualified case inquiries monthly. Their team is responsive, ethical, and genuinely strategic.",
    results: "Top 3 Rankings",
    featured: false,
  },
  {
    id: 4,
    name: "Anita Kapoor",
    business: "Beauté Elite",
    industry: "Beauty",
    rating: 5,
    text: "The branding and social media work was absolutely stunning. Our salon is now the most searched beauty brand in our city. The Instagram strategy alone brought us 400+ new bookings in 90 days. Worth every rupee — and the team feels like an extension of our own.",
    results: "300% More Bookings",
    featured: false,
  },
  {
    id: 5,
    name: "Arjun Khanna",
    business: "Velvet Lounge",
    industry: "Restaurant",
    rating: 5,
    text: "We opened during a tough market and were struggling to fill tables. Social Viens built our launch campaign, Instagram presence, and Google Ads funnel. Within 4 months we were fully booked on weekends and had a 3-week waitlist for prime slots. The WhatsApp reservation system they set up alone saves us 10 hours weekly.",
    results: "Full Weekends",
    featured: false,
    hasVideo: true,
  },
  {
    id: 6,
    name: "Meera Iyer",
    business: "Saffron & Sage",
    industry: "E-commerce",
    rating: 5,
    text: "We went from ₹4 lakh/month in revenue to ₹28 lakh/month in 8 months. The Google Ads restructuring and landing page overhaul were game-changers. What I appreciate most is the transparency — I get a real-time dashboard and weekly calls that focus on what matters. No fluff, no vanity metrics.",
    results: "600% Revenue Growth",
    featured: true,
  },
  {
    id: 7,
    name: "Rohit Agarwal",
    business: "Prime Estates Dwarka",
    industry: "Real Estate",
    rating: 5,
    text: "We had a stalled project — 18 months of zero traction. Social Viens rebuilt the landing page, restructured our Google Ads, and added WhatsApp lead nurturing. We sold 23 units in the next 6 months. Their understanding of Delhi NCR real estate buyer psychology is unmatched.",
    results: "23 Units Sold",
    featured: false,
  },
  {
    id: 8,
    name: "Dr. Sameer Bhatia",
    business: "Bhatia Dental Clinic",
    industry: "Healthcare",
    rating: 5,
    text: "My clinic was invisible online despite being 15 years in practice. Social Viens optimised our Google Business Profile, built neighbourhood pages, and engineered a review strategy. We now get 40+ new patient calls per month from Google alone. Best marketing decision I've made.",
    results: "40+ Calls/Month",
    featured: false,
  },
  {
    id: 9,
    name: "Kavita Nair",
    business: "Nair & Co. Advocates",
    industry: "Law",
    rating: 5,
    text: "Professional, ethical, and effective. Social Viens understood that law firm marketing requires discretion and substance, not gimmicks. Our case inquiry volume tripled, and the quality of leads is excellent — we're closing 1 in 4 instead of 1 in 12.",
    results: "3x Inquiries",
    featured: false,
  },
  {
    id: 10,
    name: "Aditya Rao",
    business: "Terra & Tide",
    industry: "E-commerce",
    rating: 5,
    text: "Performance Max campaigns were a black box for us until Social Viens took over. They restructured the account, fixed our conversion tracking (which was broken), and built proper audience signals. ROAS went from 1.8x to 4.4x in 60 days. The reporting is honest — they tell us what's not working, not just what is.",
    results: "4.4x ROAS",
    featured: false,
  },
  {
    id: 11,
    name: "Sneha Reddy",
    business: "Olive & Oak Bistro",
    industry: "Restaurant",
    rating: 5,
    text: "The Instagram content they create for us is genuinely beautiful — and it converts. We've grown from 800 to 24,000 followers in 10 months, and our weekend brunches are booked 2 weeks out. The team understands hospitality marketing better than anyone we've worked with.",
    results: "30x Follower Growth",
    featured: false,
  },
  {
    id: 12,
    name: "Karan Malhotra",
    business: "The Grooming Co.",
    industry: "Beauty",
    rating: 5,
    text: "Premium branding, targeted Meta ads, and a WhatsApp booking system that just works. Our men's grooming lounge went from 8 bookings/day to 38/day. The brand identity work they did elevated us from a local shop to a destination. People now drive 25km to visit us.",
    results: "+375% Bookings",
    featured: false,
    hasVideo: true,
  },
];

export const testimonialIndustries: (TestimonialIndustry | "All")[] = [
  "All",
  "Real Estate",
  "Healthcare",
  "Law",
  "E-commerce",
  "Restaurant",
  "Beauty",
];

// Aggregate stats — used in the testimonials hero strip.
export const testimonialStats = [
  { label: "Happy Clients", value: 750, suffix: "+" },
  { label: "Average Rating", value: 4.9, suffix: "/5", isFloat: true },
  { label: "Client Retention", value: 98, suffix: "%" },
  { label: "Avg ROI", value: 350, suffix: "%" },
];
