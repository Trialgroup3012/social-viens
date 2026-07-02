"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  Mail,
  Phone,
  MessageCircle,
  ArrowRight,
  ChevronRight,
  ScrollText,
} from "lucide-react";
import PageShell from "@/components/layout/PageShell";

const tocSections = [
  { id: "acceptance", label: "Acceptance of Terms" },
  { id: "services", label: "Services Description" },
  { id: "client-responsibilities", label: "Client Responsibilities" },
  { id: "payment-terms", label: "Payment Terms" },
  { id: "intellectual-property", label: "Intellectual Property" },
  { id: "confidentiality", label: "Confidentiality" },
  { id: "liability", label: "Limitation of Liability" },
  { id: "termination", label: "Termination" },
  { id: "governing-law", label: "Governing Law" },
  { id: "changes-to-terms", label: "Changes to Terms" },
  { id: "contact", label: "Contact" },
];

export default function TermsClient() {
  const [activeSection, setActiveSection] = useState<string>("acceptance");

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
    <PageShell breadcrumbs={[{ label: "Terms of Service" }]}>
      {/* ===== Hero ===== */}
      <section className="relative pt-12 md:pt-16 pb-12 overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-gold/10 rounded-full blur-[120px] animate-float pointer-events-none" />
        <div
          className="absolute top-20 right-1/4 w-72 h-72 bg-bronze/10 rounded-full blur-[110px] animate-float pointer-events-none"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-64 h-64 bg-amber-500/[0.05] rounded-full blur-[100px] animate-float pointer-events-none"
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
              <ScrollText className="w-3.5 h-3.5" />
              Legal
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-gold-gradient">Terms of Service</span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-sv-muted text-lg md:text-xl leading-relaxed"
            >
              The terms below form the agreement between you and Social Viens
              when you engage us for digital marketing services. Please read
              them carefully before signing any proposal.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full glass border border-gold/15 text-sm text-sv-muted"
            >
              <FileText className="w-3.5 h-3.5 text-gold" />
              Last updated:{" "}
              <span className="text-cream font-medium">June 17, 2026</span>
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
                  <ScrollText className="w-5 h-5 text-gold mb-2" />
                  <h4 className="text-cream font-bold text-sm mb-2">
                    Need clarification?
                  </h4>
                  <p className="text-xs text-sv-muted leading-relaxed mb-3">
                    Our team is happy to walk you through any clause before you
                    sign.
                  </p>
                  <Link
                    href="/contact"
                    className="text-xs text-gold hover:text-gold-light flex items-center gap-1.5 font-medium"
                  >
                    Get in touch
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
              <h2 id="acceptance">Acceptance of Terms</h2>
              <p>
                These Terms of Service (&quot;Terms&quot;) form a legally
                binding agreement between Social Viens (&quot;Social Viens&quot;,
                &quot;we&quot;, &quot;us&quot;, &quot;our&quot;) and the
                individual or entity (&quot;Client&quot;, &quot;you&quot;)
                engaging us for digital marketing services. By signing a
                proposal, paying an invoice, or otherwise initiating work with
                us, you acknowledge that you have read, understood, and agree to
                be bound by these Terms.
              </p>
              <p>
                If you do not agree with any part of these Terms, you must not
                engage our services. If you are entering into this agreement on
                behalf of a company, you represent that you have the legal
                authority to bind that entity.
              </p>
              <p>
                These Terms supplement — and do not replace — any specific
                Statement of Work (SOW), proposal, or service agreement signed
                between us. In the event of a conflict, the specific SOW shall
                prevail for the scope it covers.
              </p>

              <h2 id="services">Services Description</h2>
              <p>
                Social Viens provides digital marketing services, including but
                not limited to:
              </p>
              <ul>
                <li>
                  Search Engine Optimisation (SEO) — on-page, technical, and
                  local SEO for Google.
                </li>
                <li>
                  Pay-per-click (PPC) advertising — Google Ads, Meta Ads
                  (Facebook/Instagram), LinkedIn Ads, YouTube Ads.
                </li>
                <li>
                  Social Media Management — content strategy, design, posting,
                  community management.
                </li>
                <li>
                  Website Development — design, development, hosting setup, and
                  maintenance of websites and landing pages.
                </li>
                <li>
                  Branding — logo design, brand identity, brand guidelines,
                  collateral.
                </li>
                <li>
                  Google Business Profile optimisation and management.
                </li>
                <li>
                  Online Reputation Management (ORM) — review management, brand
                  monitoring.
                </li>
                <li>
                  Analytics, reporting, and conversion rate optimisation (CRO).
                </li>
              </ul>
              <p>
                The exact scope, deliverables, timeline, and fees for each
                engagement shall be defined in a separate SOW or proposal
                signed by both parties. We reserve the right to decline or
                terminate engagements that conflict with our values, ethics, or
                applicable laws (e.g., get-rich-quick schemes, adult content,
                illegal services, or misleading advertising).
              </p>

              <h2 id="client-responsibilities">Client Responsibilities</h2>
              <p>
                To enable us to deliver the agreed services effectively, the
                Client agrees to:
              </p>
              <ul>
                <li>
                  <strong>Timely access:</strong> Provide timely access to all
                  necessary accounts, platforms, brand assets, product
                  information, and personnel within 5 business days of request.
                </li>
                <li>
                  <strong>Accurate information:</strong> Provide accurate,
                  complete, and lawful information for use in campaigns,
                  websites, and content.
                </li>
                <li>
                  <strong>Approvals:</strong> Respond to review and approval
                  requests within 3 business days. Delays in approval may
                  postpone deliverables and impact campaign performance.
                </li>
                <li>
                  <strong>Compliance:</strong> Ensure that all products,
                  services, claims, and content provided to us comply with
                  applicable laws (e.g., ASCI guidelines, FDA for healthcare,
                  RERA for real estate).
                </li>
                <li>
                  <strong>Account credentials:</strong> Maintain ownership of
                  and admin access to all advertising, analytics, and social
                  accounts. We act as a manager/editor on your accounts — never
                  as the sole owner.
                </li>
                <li>
                  <strong>Payment:</strong> Pay all invoices in full and on
                  time per the agreed schedule.
                </li>
                <li>
                  <strong>Cooperation:</strong> Make available a primary point
                  of contact for the duration of the engagement.
                </li>
              </ul>

              <h2 id="payment-terms">Payment Terms</h2>
              <h3>Fees &amp; Invoicing</h3>
              <ul>
                <li>
                  Fees for each engagement are defined in the signed SOW or
                  proposal. Unless stated otherwise, all fees are quoted in
                  Indian Rupees (INR) and exclusive of applicable taxes (GST at
                  18%).
                </li>
                <li>
                  Retainer-based services are invoiced monthly in advance, due
                  within 7 days of invoice date.
                </li>
                <li>
                  Project-based work is typically invoiced on a milestone basis
                  — 50% advance, 30% on mid-milestone, 20% on delivery.
                </li>
                <li>
                  Ad spend on Google, Meta, and other platforms is billed
                  directly to the Client&apos;s payment method. Social Viens
                  does not fund ad spend on behalf of the Client unless
                  explicitly agreed in writing.
                </li>
              </ul>
              <h3>Late Payments</h3>
              <ul>
                <li>
                  Invoices not paid within 7 days of the due date attract a
                  late fee of 1.5% per month (18% per annum) on the outstanding
                  amount.
                </li>
                <li>
                  We may pause services — including pausing live ad campaigns —
                  if invoices remain unpaid for more than 15 days. Resumption
                  may take up to 3 business days after payment is received.
                </li>
                <li>
                  Repeated late payments (3+ instances in 6 months) may be
                  grounds for termination of the engagement.
                </li>
              </ul>
              <h3>Refunds</h3>
              <p>
                Due to the nature of our services (time-based and
                deliverable-based work), all fees paid are{" "}
                <strong>non-refundable</strong> once work has commenced. Unused
                monthly retainers may, at our discretion, be credited toward
                future services if termination notice is provided in line with
                the Termination clause below.
              </p>

              <h2 id="intellectual-property">Intellectual Property</h2>
              <h3>Client-Owned IP</h3>
              <p>
                The Client retains all rights to their existing brand assets,
                trademarks, logos, content, product information, and any
                materials provided to us for use in the engagement. The Client
                grants us a non-exclusive, royalty-free licence to use such
                materials solely for the purpose of delivering the agreed
                services.
              </p>
              <h3>Deliverables</h3>
              <p>
                Upon full payment of all fees due, all final deliverables
                created by Social Viens for the Client (e.g., website code,
                ad creatives, content, design files) transfer to the Client
                under a perpetual, worldwide, royalty-free licence. We reserve
                the right to:
              </p>
              <ul>
                <li>
                  Use the engagement in our portfolio and marketing materials
                  (anonymised or with Client consent).
                </li>
                <li>
                  Retain internal copies for archival and reference.
                </li>
                <li>
                  Use generic techniques, methodologies, and frameworks
                  developed during the engagement for other clients (but never
                  the Client&apos;s confidential information or trade secrets).
                </li>
              </ul>
              <h3>Third-Party Materials</h3>
              <p>
                We may use third-party assets (stock images, fonts, plugins,
                libraries) in deliverables. Such assets are licensed to the
                Client under the respective third-party terms. The Client is
                responsible for renewing any recurring licences (e.g., premium
                fonts, SaaS subscriptions) post-engagement.
              </p>

              <h2 id="confidentiality">Confidentiality</h2>
              <p>
                Both parties agree to keep confidential all non-public
                information disclosed by the other party, including business
                strategies, financial data, customer lists, pricing, campaign
                data, and trade secrets (&quot;Confidential Information&quot;).
                This obligation:
              </p>
              <ul>
                <li>
                  Applies for the duration of the engagement and for 3 years
                  thereafter.
                </li>
                <li>
                  Does not apply to information that is publicly available, was
                  already known to the receiving party, is independently
                  developed, or is required to be disclosed by law (in which
                  case the receiving party shall give reasonable notice to
                  allow the other party to seek a protective order).
                </li>
                <li>
                  Includes a requirement to use reasonable security measures to
                  protect Confidential Information (at least the same standard
                  used for their own confidential data).
                </li>
              </ul>
              <p>
                We treat client data in line with our{" "}
                <Link href="/privacy-policy">Privacy Policy</Link>, which forms
                part of these Terms by reference.
              </p>

              <h2 id="liability">Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law:
              </p>
              <ul>
                <li>
                  Social Viens provides services on an &quot;as is&quot; and
                  &quot;best efforts&quot; basis. We do not guarantee specific
                  results — including but not limited to search rankings, ad
                  performance, lead volumes, or revenue figures — as these
                  depend on factors outside our control (Google algorithm
                  changes, market dynamics, Client product/market fit, etc.).
                </li>
                <li>
                  Any performance metrics mentioned in proposals or marketing
                  materials are illustrative, based on past experience, and not
                  a guarantee of future results.
                </li>
                <li>
                  Our total aggregate liability for any claim arising out of or
                  relating to the engagement shall not exceed the total fees
                  paid by the Client to us in the 3 months preceding the event
                  giving rise to the claim.
                </li>
                <li>
                  We shall not be liable for any indirect, incidental,
                  special, consequential, or punitive damages, including loss
                  of profits, loss of data, business interruption, or loss of
                  goodwill.
                </li>
                <li>
                  The Client is solely responsible for the products and
                  services they sell and any legal compliance related to their
                  business operations.
                </li>
              </ul>

              <h2 id="termination">Termination</h2>
              <h3>Termination for Convenience</h3>
              <p>
                Either party may terminate the engagement for convenience with
                30 days&apos; written notice. The Client is responsible for
                fees accrued up to the effective termination date. For monthly
                retainers, the retainer for the notice period is non-refundable
                even if services are not availed.
              </p>
              <h3>Termination for Cause</h3>
              <p>
                Either party may terminate immediately for cause if the other
                party:
              </p>
              <ul>
                <li>
                  Materially breaches these Terms or the SOW and fails to cure
                  the breach within 14 days of written notice.
                </li>
                <li>
                  Becomes insolvent, bankrupt, or ceases normal business
                  operations.
                </li>
                <li>
                  Engages in fraud, misrepresentation, or unlawful activity
                  affecting the engagement.
                </li>
              </ul>
              <h3>Effect of Termination</h3>
              <ul>
                <li>
                  All outstanding invoices become immediately due and payable.
                </li>
                <li>
                  We will hand over final deliverables and provide reasonable
                  transition support (up to 10 hours, included at no charge).
                </li>
                <li>
                  Access to client accounts will be transferred back to the
                  Client; our manager-level access will be revoked.
                </li>
                <li>
                  Confidentiality, IP, and Liability clauses survive
                  termination.
                </li>
              </ul>

              <h2 id="governing-law">Governing Law &amp; Dispute Resolution</h2>
              <p>
                These Terms are governed by the laws of the Republic of India.
                The courts of Noida, Uttar Pradesh, shall have exclusive
                jurisdiction over any disputes arising out of or relating to
                these Terms or any engagement.
              </p>
              <p>
                Before initiating litigation, the parties agree to attempt
                good-faith negotiation for 30 days. If unresolved, the dispute
                shall be referred to mediation under the Mediation Act, 2023.
                Only if mediation fails shall either party initiate court
                proceedings.
              </p>

              <h2 id="changes-to-terms">Changes to Terms</h2>
              <p>
                We reserve the right to update these Terms at any time.
                Material changes will be communicated to active Clients via
                email at least 30 days before they take effect. For website
                visitors and prospective clients, the updated Terms will be
                posted on this page with a revised &quot;Last updated&quot;
                date.
              </p>
              <p>
                Continued use of our services or website after the effective
                date of any change constitutes acceptance of the updated Terms.
                If you do not agree with the changes, you may terminate the
                engagement as per the Termination clause above.
              </p>

              <h2 id="contact">Contact</h2>
              <p>
                For any questions about these Terms, please contact us:
              </p>
              <ul>
                <li>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:legal@socialviens.com">legal@socialviens.com</a>
                </li>
                <li>
                  <strong>Phone:</strong>{" "}
                  <a href="tel:+918178004800">+91 81780 04800</a>
                </li>
                <li>
                  <strong>WhatsApp:</strong>{" "}
                  <a href="https://wa.me/918178004800">Message us</a>
                </li>
                <li>
                  <strong>Address:</strong> Social Viens, Coworking Hub, Sector
                  18, Noida, Uttar Pradesh 201301, India
                </li>
              </ul>
              <p>
                For all other queries, please use our{" "}
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
                  <ScrollText className="w-8 h-8 text-gold mx-auto mb-3" />
                  <h2 className="text-3xl md:text-4xl font-bold text-cream mb-3">
                    Have questions about{" "}
                    <span className="text-gold-gradient">these terms?</span>
                  </h2>
                  <p className="text-sv-muted text-lg max-w-xl mx-auto">
                    We believe in transparent, fair engagements. Our team is
                    happy to clarify any clause before you sign.
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
                    href="mailto:legal@socialviens.com"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full glass border border-gold/30 text-gold font-semibold text-sm hover:bg-gold/10 hover:border-gold/50 transition-all duration-300"
                  >
                    <Mail className="w-4 h-4" />
                    Email Legal Team
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
                    href="mailto:legal@socialviens.com"
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
                        legal@socialviens.com
                      </p>
                    </div>
                  </a>
                  <a
                    href="https://wa.me/918178004800?text=Hi%20Social%20Viens%2C%20I%20have%20a%20question%20about%20your%20terms"
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
