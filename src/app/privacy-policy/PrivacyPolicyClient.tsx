"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Mail,
  Phone,
  MessageCircle,
  ArrowRight,
  ChevronRight,
  Lock,
  FileText,
} from "lucide-react";
import PageShell from "@/components/layout/PageShell";

const tocSections = [
  { id: "introduction", label: "Introduction" },
  { id: "information-we-collect", label: "Information We Collect" },
  { id: "how-we-use-information", label: "How We Use Information" },
  { id: "cookies-tracking", label: "Cookies & Tracking" },
  { id: "data-sharing", label: "Data Sharing" },
  { id: "data-security", label: "Data Security" },
  { id: "your-rights", label: "Your Rights" },
  { id: "contact-us", label: "Contact Us" },
];

export default function PrivacyPolicyClient() {
  const [activeSection, setActiveSection] = useState<string>("introduction");

  // Scroll-spy for TOC highlighting.
  useEffect(() => {
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
    for (const s of tocSections) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <PageShell breadcrumbs={[{ label: "Privacy Policy" }]}>
      {/* ===== Hero ===== */}
      <section className="relative pt-12 md:pt-16 pb-12 overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-gold/10 rounded-full blur-[120px] animate-float pointer-events-none" />
        <div
          className="absolute top-20 right-1/4 w-72 h-72 bg-bronze/10 rounded-full blur-[110px] animate-float pointer-events-none"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-64 h-64 bg-emerald-500/[0.05] rounded-full blur-[100px] animate-float pointer-events-none"
          style={{ animationDelay: "4s" }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-medium tracking-[0.25em] uppercase mb-6"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Legal
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-gold-gradient">Privacy Policy</span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-sv-muted text-lg md:text-xl leading-relaxed"
            >
              Your trust is the foundation of every engagement at Social Viens.
              This policy explains, in plain language, what data we collect, why
              we collect it, and the controls you have over it.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full glass border border-gold/15 text-sm text-sv-muted"
            >
              <FileText className="w-3.5 h-3.5 text-gold" />
              Last updated:{" "}
              <span className="text-cream font-medium">
                June 17, 2026
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="hero-gradient-line max-w-md mx-auto mt-10"
          />
        </div>
      </section>

      {/* ===== Main content: TOC + prose ===== */}
      <section className="relative pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-12">
            {/* Sticky TOC sidebar (desktop) */}
            <aside>
              <div className="lg:sticky lg:top-28">
                <p className="hidden lg:block text-xs tracking-[0.2em] text-gold/70 uppercase mb-4 px-2">
                  On This Page
                </p>
                <nav className="hidden lg:flex flex-col gap-1.5">
                  {tocSections.map((s) => {
                    const isActive = activeSection === s.id;
                    return (
                      <a
                        key={s.id}
                        href={`#${s.id}`}
                        className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border cursor-pointer ${
                          isActive
                            ? "bg-gold/15 text-gold border-gold/20 shadow-lg"
                            : "bg-sv-surface/40 text-sv-muted border-transparent hover:border-gold/10 hover:text-cream"
                        }`}
                      >
                        {s.label}
                      </a>
                    );
                  })}
                </nav>

                {/* Mobile TOC — horizontal pills */}
                <div className="lg:hidden flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-1 px-1">
                  {tocSections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="shrink-0 px-4 py-2 rounded-full text-xs font-medium bg-sv-surface/50 text-sv-muted border border-transparent hover:border-gold/10 hover:text-cream transition-all"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>

                {/* Desktop-only contact card */}
                <div className="hidden lg:block glass-strong rounded-2xl p-5 mt-6 border border-gold/15 gold-glow">
                  <Lock className="w-5 h-5 text-gold mb-2" />
                  <h4 className="text-cream font-bold text-sm mb-2">
                    Privacy questions?
                  </h4>
                  <p className="text-xs text-sv-muted leading-relaxed mb-3">
                    Email our Data Protection Officer at privacy@socialviens.com
                    for any data-related queries.
                  </p>
                  <Link
                    href="/contact"
                    className="text-xs text-gold hover:text-gold-light flex items-center gap-1.5 font-medium"
                  >
                    Contact us
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </aside>

            {/* Prose content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="glass rounded-3xl p-6 md:p-10 lg:p-12 [&_h2]:text-2xl md:[&_h2]:text-3xl [&_h2]:text-cream [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:scroll-mt-32 [&_h3]:text-xl [&_h3]:text-gold [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:text-sv-muted [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mb-4 [&_ul]:text-sv-muted [&_li]:leading-relaxed [&_a]:text-gold [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-gold-light [&_strong]:text-cream [&_strong]:font-semibold [&_code]:text-gold [&_code]:font-mono [&_code]:bg-sv-surface/60 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded"
            >
              <h2 id="introduction">Introduction</h2>
              <p>
                Social Viens (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;)
                is a digital marketing agency registered and operating out of
                Delhi NCR, India. We provide services including but not limited
                to search engine optimisation (SEO), paid advertising, social
                media management, website development, branding, and{" "}
                <strong>online reputation management</strong> to clients across
                India and overseas.
              </p>
              <p>
                This Privacy Policy describes how we collect, use, disclose, and
                safeguard your information when you visit our website{" "}
                <a href="https://socialviens.com">socialviens.com</a>, fill out
                a lead form, message us on WhatsApp, subscribe to our
                newsletter, use our free website analysis tools, or otherwise
                engage with us. This policy applies to all visitors, leads,
                prospects, clients, and subscribers (collectively,
                &quot;you&quot;).
              </p>
              <p>
                We are committed to complying with the{" "}
                <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>{" "}
                of India, and where applicable, the General Data Protection
                Regulation (GDPR) for our European users, and the California
                Consumer Privacy Act (CCPA) for our U.S. users. By using our
                website and services, you consent to the practices described in
                this policy.
              </p>

              <h2 id="information-we-collect">Information We Collect</h2>
              <p>
                We collect information in the following ways to deliver and
                improve our services:
              </p>

              <h3>1. Information You Provide Directly</h3>
              <ul>
                <li>
                  <strong>Contact forms:</strong> Name, email address, phone
                  number, company name, website URL, budget range, and any
                  message you send through our contact, lead capture, or
                  scheduling forms.
                </li>
                <li>
                  <strong>WhatsApp communications:</strong> Your phone number
                  and the contents of messages exchanged when you reach out via
                  our WhatsApp widget.
                </li>
                <li>
                  <strong>Newsletter subscriptions:</strong> Your email address
                  when you opt in to receive our growth insights newsletter.
                </li>
                <li>
                  <strong>Free audit tools:</strong> When you use our Website
                  X-Ray or Google Dominance Analyzer, we collect the URL and
                  keyword you submit, along with the email address you provide
                  to receive the full PDF report.
                </li>
                <li>
                  <strong>Client onboarding:</strong> Business details, brand
                  assets, account credentials (for marketing platforms such as
                  Google Ads, Meta Ads, Google Analytics, Google Business
                  Profile), and any other information necessary to deliver the
                  agreed scope of work.
                </li>
              </ul>

              <h3>2. Information Collected Automatically</h3>
              <ul>
                <li>
                  <strong>Usage data:</strong> IP address, browser type,
                  operating system, referring URLs, pages viewed, time on page,
                  and click patterns.
                </li>
                <li>
                  <strong>Cookies and similar technologies:</strong> Session
                  cookies, analytics cookies, and (with consent) marketing
                  cookies. See the Cookies &amp; Tracking section below for
                  details.
                </li>
                <li>
                  <strong>Device information:</strong> Device type, screen
                  resolution, language preferences, and approximate location
                  derived from IP (city-level).
                </li>
              </ul>

              <h3>3. Information From Third Parties</h3>
              <p>
                We may receive limited information from third-party platforms
                when you interact with our marketing, including:
              </p>
              <ul>
                <li>
                  Google Ads and Meta Ads: aggregated campaign performance data
                  when you click on our advertisements.
                </li>
                <li>
                  LinkedIn and Twitter: public profile information if you engage
                  with our content on those platforms.
                </li>
                <li>
                  Analytics providers (e.g., Google Analytics 4): aggregated
                  traffic and engagement metrics.
                </li>
              </ul>

              <h2 id="how-we-use-information">How We Use Your Information</h2>
              <p>
                We use the information we collect for the following legitimate
                business purposes:
              </p>
              <ul>
                <li>
                  <strong>Service delivery:</strong> To respond to your
                  inquiries, prepare proposals, onboard you as a client, and
                  execute the digital marketing services you have engaged us
                  for.
                </li>
                <li>
                  <strong>Communication:</strong> To send you account updates,
                  project reports, invoices, and important service-related
                  notices.
                </li>
                <li>
                  <strong>Marketing (with consent):</strong> To send you our
                  newsletter, case studies, and promotional offers. You can opt
                  out at any time using the unsubscribe link in any email.
                </li>
                <li>
                  <strong>Analytics and improvement:</strong> To analyse how
                  visitors use our website, identify popular content,
                  troubleshoot issues, and improve user experience.
                </li>
                <li>
                  <strong>Security and fraud prevention:</strong> To monitor
                  for suspicious activity, prevent fraud, and protect our
                  website and clients from abuse.
                </li>
                <li>
                  <strong>Legal compliance:</strong> To comply with applicable
                  Indian laws, tax regulations, and lawful requests from
                  authorities.
                </li>
              </ul>
              <p>
                We <strong>do not</strong> sell your personal information to
                third parties. We do not use your data to train third-party AI
                models without explicit consent.
              </p>

              <h2 id="cookies-tracking">Cookies &amp; Tracking Technologies</h2>
              <p>
                Our website uses cookies and similar tracking technologies
                (pixel tags, web beacons) to operate effectively and to
                understand how you interact with our content.
              </p>
              <h3>Types of Cookies We Use</h3>
              <ul>
                <li>
                  <strong>Essential cookies:</strong> Required for the website
                  to function (e.g., session management, cookie consent
                  banner). These cannot be disabled.
                </li>
                <li>
                  <strong>Analytics cookies:</strong> Help us understand
                  traffic patterns and user behaviour (e.g., Google Analytics).
                  Enabled only with your consent.
                </li>
                <li>
                  <strong>Marketing cookies:</strong> Used to deliver relevant
                  advertising on platforms like Google and Meta, and to measure
                  the effectiveness of our campaigns. Enabled only with your
                  consent.
                </li>
                <li>
                  <strong>Functional cookies:</strong> Remember your
                  preferences (e.g., theme, language) for a personalised
                  experience.
                </li>
              </ul>
              <p>
                When you first visit our site, a cookie consent banner appears
                asking for your permission to place non-essential cookies. You
                can change your preferences at any time by clicking the
                &quot;Cookie Preferences&quot; link in our footer. Most browsers
                also allow you to refuse or delete cookies through their
                settings — note that disabling cookies may affect website
                functionality.
              </p>

              <h2 id="data-sharing">Data Sharing &amp; Disclosure</h2>
              <p>
                We share your information only in the following circumstances:
              </p>
              <ul>
                <li>
                  <strong>Service providers:</strong> We use trusted
                  third-party tools to deliver our services (e.g., Google
                  Workspace for email, Stripe and Razorpay for payments, Meta
                  and Google for ad delivery, GitHub for code hosting, Vercel
                  for web hosting). These providers process data on our behalf
                  under contractual obligations and are prohibited from using
                  your data for their own purposes.
                </li>
                <li>
                  <strong>Client platforms:</strong> When you engage us for
                  services, we may access your Google Ads, Meta Ads, Google
                  Analytics, and Google Business Profile accounts using
                  credentials you provide. We use these solely to deliver and
                  report on the agreed services.
                </li>
                <li>
                  <strong>Legal compliance:</strong> We may disclose
                  information when required by law, court order, or government
                  authority, or to protect our legal rights, safety, or
                  property.
                </li>
                <li>
                  <strong>Business transfers:</strong> In the event of a
                  merger, acquisition, or sale of all or part of our business,
                  your data may be transferred to the acquiring entity. You will
                  be notified via email of any such change.
                </li>
              </ul>
              <p>
                We do <strong>not</strong> share your data with data brokers,
                advertising networks for their independent use, or any third
                party for commercial purposes unrelated to our service
                delivery.
              </p>

              <h2 id="data-security">Data Security</h2>
              <p>
                We implement industry-standard technical and organisational
                measures to protect your personal information against
                unauthorised access, alteration, disclosure, or destruction.
                These measures include:
              </p>
              <ul>
                <li>
                  <strong>Encryption:</strong> All data in transit is secured
                  using TLS 1.2+ (HTTPS). Sensitive credentials are encrypted
                  at rest using AES-256.
                </li>
                <li>
                  <strong>Access controls:</strong> Strict role-based access
                  controls (RBAC). Only authorised team members with a
                  legitimate business need can access client data.
                </li>
                <li>
                  <strong>Multi-factor authentication (MFA):</strong> Enforced
                  on all internal systems and client accounts we manage.
                </li>
                <li>
                  <strong>Regular audits:</strong> Quarterly security reviews
                  and annual third-party penetration testing of our web
                  properties.
                </li>
                <li>
                  <strong>Data minimisation:</strong> We collect only what is
                  necessary for the stated purpose and delete data when it is
                  no longer needed.
                </li>
                <li>
                  <strong>Staff training:</strong> All team members undergo
                  annual data protection and privacy training aligned with the
                  DPDP Act and ISO 27001 best practices.
                </li>
              </ul>
              <p>
                Despite our efforts, no system is 100% secure. In the event of
                a data breach affecting your personal information, we will
                notify you and the relevant Data Protection Board within 72
                hours, as required by the DPDP Act.
              </p>

              <h2 id="your-rights">Your Rights</h2>
              <p>
                Under the DPDP Act (and GDPR/CCPA where applicable), you have
                the following rights over your personal data:
              </p>
              <ul>
                <li>
                  <strong>Right to access:</strong> You can request a copy of
                  the personal data we hold about you.
                </li>
                <li>
                  <strong>Right to correction:</strong> You can ask us to
                  correct inaccurate or incomplete information.
                </li>
                <li>
                  <strong>Right to erasure:</strong> You can request deletion
                  of your personal data, subject to legal retention
                  requirements.
                </li>
                <li>
                  <strong>Right to opt-out:</strong> You can opt out of
                  marketing communications at any time via the unsubscribe link
                  or by emailing us.
                </li>
                <li>
                  <strong>Right to data portability:</strong> You can request
                  your data in a structured, machine-readable format.
                </li>
                <li>
                  <strong>Right to withdraw consent:</strong> You can withdraw
                  consent for non-essential processing at any time.
                </li>
                <li>
                  <strong>Right to grievance redressal:</strong> You can file a
                  grievance with our Data Protection Officer. We will respond
                  within 30 days.
                </li>
              </ul>
              <p>
                To exercise any of these rights, email us at{" "}
                <a href="mailto:privacy@socialviens.com">
                  privacy@socialviens.com
                </a>{" "}
                with the subject line &quot;Data Rights Request&quot;. We may
                need to verify your identity before processing your request.
              </p>

              <h2 id="contact-us">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, our data
                practices, or wish to exercise any of your rights, please
                contact our Data Protection Officer:
              </p>
              <ul>
                <li>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:privacy@socialviens.com">
                    privacy@socialviens.com
                  </a>
                </li>
                <li>
                  <strong>Phone:</strong>{" "}
                  <a href="tel:+918178004800">+91 81780 04800</a>
                </li>
                <li>
                  <strong>WhatsApp:</strong>{" "}
                  <a href="https://wa.me/918178004800">
                    Message us on WhatsApp
                  </a>
                </li>
                <li>
                  <strong>Address:</strong> Social Viens, Coworking Hub, Sector
                  18, Noida, Uttar Pradesh 201301, India
                </li>
              </ul>
              <p>
                We aim to respond to all privacy-related queries within 48
                business hours. For all other queries, please use our{" "}
                <Link href="/contact">contact page</Link>.
              </p>
            </motion.article>
          </div>
        </div>
      </section>

      {/* ===== Contact CTA ===== */}
      <section className="relative pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-3xl"
          >
            <div className="glass-strong gold-glow-strong rounded-3xl p-8 md:p-12 relative">
              <div className="absolute top-0 right-0 w-72 h-72 bg-gold/10 rounded-full blur-[100px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <ShieldCheck className="w-8 h-8 text-gold mx-auto mb-3" />
                  <h2 className="text-3xl md:text-4xl font-bold text-cream mb-3">
                    Questions about your{" "}
                    <span className="text-gold-gradient">privacy?</span>
                  </h2>
                  <p className="text-sv-muted text-lg max-w-xl mx-auto">
                    We&apos;re transparent about how we handle your data. Reach
                    out — our team typically responds in under 2 hours during
                    business hours.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-gold to-bronze text-sv-bg font-bold text-sm hover:shadow-lg hover:shadow-gold/20 hover:scale-[1.02] transition-all duration-300"
                  >
                    Contact Us
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="mailto:privacy@socialviens.com"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full glass border border-gold/30 text-gold font-semibold text-sm hover:bg-gold/10 hover:border-gold/50 transition-all duration-300"
                  >
                    <Mail className="w-4 h-4" />
                    Email Privacy Team
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-8 border-t border-gold/10">
                  <a
                    href="tel:+918178004800"
                    className="flex items-center gap-3 p-4 rounded-xl bg-sv-surface/40 border border-gold/10 hover:border-gold/30 hover:bg-sv-surface/60 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/15 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                      <Phone className="w-4 h-4 text-gold" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-sv-muted uppercase tracking-wider mb-0.5">
                        Call
                      </p>
                      <p className="text-sm text-cream font-medium truncate">
                        +91 81780 04800
                      </p>
                    </div>
                  </a>
                  <a
                    href="mailto:privacy@socialviens.com"
                    className="flex items-center gap-3 p-4 rounded-xl bg-sv-surface/40 border border-gold/10 hover:border-gold/30 hover:bg-sv-surface/60 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/15 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                      <Mail className="w-4 h-4 text-gold" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-sv-muted uppercase tracking-wider mb-0.5">
                        Email
                      </p>
                      <p className="text-sm text-cream font-medium truncate">
                        privacy@socialviens.com
                      </p>
                    </div>
                  </a>
                  <a
                    href="https://wa.me/918178004800?text=Hi%20Social%20Viens%2C%20I%20have%20a%20privacy%20question"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl bg-sv-surface/40 border border-gold/10 hover:border-gold/30 hover:bg-sv-surface/60 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-sv-muted uppercase tracking-wider mb-0.5">
                        WhatsApp
                      </p>
                      <p className="text-sm text-cream font-medium truncate">
                        Chat with us
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageShell>
  );
}
