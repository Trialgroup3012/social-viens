export type SeoOverride = {
  path: string;
  title: string;
  description: string;
};

export const SEO_SETTING_PREFIX = "seo_override:";

export const CORE_SEO_PAGES: SeoOverride[] = [
  {
    path: "/",
    title: "SOCIAL VIENS | Premium Digital Marketing Agency in India",
    description: "Premium digital marketing for ambitious Indian businesses: SEO, paid media, social, branding and website growth.",
  },
  { path: "/about", title: "About SOCIAL VIENS | Digital Growth Agency", description: "Meet the digital growth team helping ambitious Indian brands build visibility, leads and long-term revenue." },
  { path: "/services", title: "Digital Marketing Services | SOCIAL VIENS", description: "Explore strategy, SEO, paid ads, social media, branding and website services built to deliver measurable growth." },
  { path: "/portfolio", title: "Marketing Results & Portfolio | SOCIAL VIENS", description: "See selected growth, creative and performance marketing work from the Social Viens team." },
  { path: "/blog", title: "Digital Marketing Insights | SOCIAL VIENS", description: "Practical SEO, performance marketing and brand growth insights for ambitious businesses." },
  { path: "/pricing", title: "Digital Marketing Pricing | SOCIAL VIENS", description: "Explore clear digital marketing plans and request a tailored growth strategy for your business." },
  { path: "/contact", title: "Contact SOCIAL VIENS | Free Strategy Session", description: "Speak with the Social Viens team about your business goals and book a free strategy session." },
  { path: "/testimonials", title: "Client Testimonials | SOCIAL VIENS", description: "Read feedback and growth outcomes from businesses that partner with Social Viens." },
  { path: "/faq", title: "Digital Marketing FAQs | SOCIAL VIENS", description: "Answers to common questions about working with Social Viens and building sustainable digital growth." },
  { path: "/privacy-policy", title: "Privacy Policy | SOCIAL VIENS", description: "How Social Viens collects, uses and protects information on this website." },
  { path: "/terms", title: "Terms of Use | SOCIAL VIENS", description: "Terms governing use of the Social Viens website and services." },
];

export function normaliseSeoPath(value: string): string | null {
  const path = value.trim();
  if (!path || path.length > 180 || !path.startsWith("/") || path.startsWith("//")) return null;
  if (path.includes("?") || path.includes("#") || /\s/.test(path)) return null;
  return path === "/" ? path : path.replace(/\/+$/, "");
}

export function seoSettingKey(path: string): string {
  return `${SEO_SETTING_PREFIX}${encodeURIComponent(path)}`;
}

export function parseSeoSetting(key: string, value: string): SeoOverride | null {
  if (!key.startsWith(SEO_SETTING_PREFIX)) return null;
  try {
    const parsed = JSON.parse(value) as Partial<SeoOverride>;
    const path = normaliseSeoPath(parsed.path || decodeURIComponent(key.slice(SEO_SETTING_PREFIX.length)));
    if (!path || typeof parsed.title !== "string" || typeof parsed.description !== "string") return null;
    return { path, title: parsed.title, description: parsed.description };
  } catch {
    return null;
  }
}
