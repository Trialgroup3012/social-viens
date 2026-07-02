"use client";

import { motion } from "framer-motion";
import { MessageCircleQuestion } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AnimatedHeading from "@/components/ui/animated-heading";

const faqs = [
  {
    q: "What services does Social Viens offer?",
    a: "We offer a comprehensive suite of digital marketing services including Website Development, SEO, Local SEO, Google Business Profile Optimization, Paid Advertising (Google Ads & Meta Ads), Social Media Marketing, Branding & Design, Marketing Automation, and Lead Generation. Each service is tailored to deliver measurable business growth.",
  },
  {
    q: "Which industries do you specialize in?",
    a: "We have deep expertise in Real Estate, Healthcare, Law Firms, Education, Beauty & Salon, Fitness, Restaurants, E-Commerce, and Startups. Our industry-specific strategies are designed to deliver results that matter in your particular market.",
  },
  {
    q: "How much does digital marketing cost?",
    a: "Our pricing is customized based on your business goals, industry, and scope of work. We offer flexible packages starting from ₹25,000/month for small businesses and enterprise solutions for larger organizations. Book a free consultation to get a custom quote tailored to your needs.",
  },
  {
    q: "How long does it take to see results?",
    a: "Results vary by service and industry. Paid advertising campaigns typically show results within 2-4 weeks. SEO and organic growth strategies take 3-6 months for significant results. We provide weekly progress reports so you can track improvements from day one.",
  },
  {
    q: "Do you offer a free consultation?",
    a: "Yes! We offer a completely free, no-obligation strategy session where we analyze your business, identify growth opportunities, and create a custom roadmap. There's no commitment required — just valuable insights for your business.",
  },
  {
    q: "How is Social Viens different from other agencies?",
    a: "We're growth-first, not deliverables-first. Every strategy is built around ROI, not vanity metrics. We combine premium creative direction with data-driven performance marketing and AI-powered systems. Plus, you get a dedicated growth team — not shared resources.",
  },
  {
    q: "Do you work with businesses outside India?",
    a: "While our primary focus is the Indian market, we do work with international clients, particularly those targeting the Indian market or seeking cost-effective premium digital marketing services. Contact us to discuss your specific needs.",
  },
  {
    q: "What kind of reporting do you provide?",
    a: "We provide real-time dashboards, weekly performance reports, and monthly strategy reviews. Our transparent reporting covers all key metrics including traffic, leads, conversions, ROAS, and revenue impact. You always know exactly where your investment is going.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="relative py-24 overflow-hidden">
      <div className="section-divider mb-16" />

      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/[0.03] blur-[150px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/20 bg-gold/5 text-gold text-sm font-medium mb-6"
          >
            <MessageCircleQuestion className="w-4 h-4" />
            Got Questions?
          </motion.div>
          <AnimatedHeading text1="Frequently Asked" text2="Questions" />
          <p className="max-w-2xl mx-auto text-sv-muted text-lg mt-4">
            Everything you need to know about working with Social Viens.
            Can&apos;t find your answer?{" "}
            <a
              href="#contact"
              className="text-gold hover:text-gold-light underline underline-offset-4 transition-colors"
            >
              Ask us directly
            </a>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="glass rounded-xl border-0 px-6 data-[state=open]:gold-glow data-[state=open]:border-gold/20 transition-all duration-300 group"
              >
                <AccordionTrigger className="text-left text-cream hover:text-gold hover:no-underline py-5 text-base md:text-lg font-medium group-data-[state=open]:text-gold transition-colors duration-300">
                  <span className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-gold/10 border border-gold/15 flex items-center justify-center text-gold text-xs font-bold shrink-0 group-data-[state=open]:bg-gold/20 group-data-[state=open]:border-gold/30 transition-all duration-300">
                      {i + 1}
                    </span>
                    {faq.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-sv-muted leading-relaxed pb-5 pl-10">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-sv-muted text-base mb-4">
            Still have questions? We&apos;d love to help.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gold/30 text-gold hover:bg-gold/10 hover:border-gold/50 transition-all duration-300 font-medium text-sm"
          >
            💬 Chat With Our Team
          </a>
        </motion.div>
      </div>
    </section>
  );
}
