"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Loader2, CheckCircle2, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const services = [
  "Website Development",
  "SEO",
  "Local SEO",
  "Google Business Profile",
  "Paid Ads",
  "Social Media Marketing",
  "Branding",
  "Marketing Automation",
  "Lead Generation",
  "Complete Digital Marketing",
];

function FloatingInput({
  name,
  label,
  type = "text",
  required = false,
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder: string;
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="relative">
      <label
        className={`absolute left-4 transition-all duration-300 pointer-events-none z-10 ${
          focused || value
            ? "top-1 text-xs text-gold"
            : "top-3.5 text-sm text-sv-muted/60"
        }`}
      >
        {label}
        {required && <span className="text-gold ml-0.5">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-sv-elevated border border-gold/15 rounded-xl px-4 pt-6 pb-2 text-cream focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/15 placeholder:text-transparent transition-all duration-300"
        placeholder={placeholder}
      />
      {focused && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-gold/0 via-gold/50 to-gold/0 origin-left"
        />
      )}
    </div>
  );
}

export default function FinalCTA() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <div className="section-divider mb-16" />

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
          style={{ backgroundImage: "url(/images/sections/final-cta-bg.png)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sv-bg via-sv-bg/95 to-sv-bg" />
      </div>

      {/* Animated orbs */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/5 blur-[120px]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm tracking-[0.3em] text-gold/70 uppercase mb-6">
            Your Growth Journey Starts Here
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-cream">Ready To Become The</span>
            <br />
            <span className="text-gold-gradient">Next Success Story?</span>
          </h2>
          <p className="max-w-2xl mx-auto text-sv-muted text-lg mb-10 leading-relaxed">
            Book a free strategy session with our growth experts. We&apos;ll
            analyze your business, identify opportunities, and create a custom
            growth roadmap — no strings attached.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-gold to-bronze text-sv-bg font-bold text-lg px-10 py-7 h-auto hover:shadow-xl hover:shadow-gold/25 transition-all duration-300 group ripple-effect cta-breathing"
            >
              <a href="#contact-form">
                <Calendar className="mr-2 w-5 h-5" />
                Book Free Consultation
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-whatsapp/30 text-whatsapp hover:bg-whatsapp/10 font-semibold text-lg px-10 py-7 h-auto"
            >
              <a
                href="https://wa.me/918178004800?text=Hi%2C%20I%27m%20interested%20in%20your%20digital%20marketing%20services"
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 Chat on WhatsApp
              </a>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sv-muted text-sm">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success" /> Free
              Consultation
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success" /> No
              Commitment Required
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success" /> 24-Hour
              Response
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success" /> Custom
              Growth Roadmap
            </span>
          </div>
        </motion.div>
      </div>

      {/* Contact Form Section */}
      <div id="contact-form" className="max-w-4xl mx-auto px-6 relative z-10 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass rounded-3xl p-8 md:p-12 gold-glow relative overflow-hidden"
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

          <h3 className="text-2xl md:text-3xl font-bold text-cream mb-2 text-center">
            Get Your{" "}
            <span className="text-gold-gradient">Free Strategy Session</span>
          </h3>
          <p className="text-sv-muted text-center mb-8">
            Fill in your details and our growth expert will reach out within 24
            hours.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 rounded-full bg-success/10 border border-success/30 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-success" />
              </div>
              <h4 className="text-2xl font-bold text-cream mb-3">
                Thank You! 🎉
              </h4>
              <p className="text-sv-muted text-lg mb-6">
                Our growth expert will reach out within 24 hours with your
                custom strategy.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button
                  asChild
                  variant="outline"
                  className="border-whatsapp/30 text-whatsapp hover:bg-whatsapp/10"
                >
                  <a
                    href="https://wa.me/918178004800?text=Hi%2C%20I%20just%20submitted%20a%20consultation%20request"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    💬 Get Faster Response on WhatsApp
                  </a>
                </Button>
              </div>
            </motion.div>
          ) : (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setSubmitting(true);
                const formData = new FormData(e.currentTarget);
                const data = {
                  name: formData.get("name"),
                  email: formData.get("email"),
                  phone: formData.get("phone"),
                  business: formData.get("business"),
                  service: formData.get("service"),
                  message: formData.get("message"),
                };

                try {
                  const res = await fetch("/api/leads", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                  });
                  if (res.ok) {
                    setSubmitted(true);
                    toast({
                      title: "🎉 Request Submitted!",
                      description:
                        "Our growth expert will reach out within 24 hours.",
                    });
                  } else {
                    toast({
                      title: "Something went wrong",
                      description:
                        "Please try again or contact us on WhatsApp.",
                      variant: "destructive",
                    });
                  }
                } catch {
                  toast({
                    title: "Something went wrong",
                    description:
                      "Please try again or contact us on WhatsApp.",
                    variant: "destructive",
                  });
                } finally {
                  setSubmitting(false);
                }
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              <FloatingInput
                name="name"
                label="Full Name"
                required
                placeholder="John Doe"
              />
              <FloatingInput
                name="email"
                label="Email Address"
                type="email"
                required
                placeholder="john@company.com"
              />
              <FloatingInput
                name="phone"
                label="Phone Number"
                type="tel"
                required
                placeholder="+91 81780 04800"
              />
              <FloatingInput
                name="business"
                label="Business Name"
                placeholder="Your Company"
              />
              <div className="md:col-span-2 relative">
                <label className="block text-xs font-medium text-gold mb-1.5">
                  Service Interested In
                </label>
                <select
                  name="service"
                  className="w-full bg-sv-elevated border border-gold/15 rounded-xl px-4 py-3 text-cream focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/15 transition-all duration-300 appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M6 8L1 3h10z' fill='%23D4AF37'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 16px center",
                  }}
                >
                  <option value="">Select a service...</option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gold mb-1.5">
                  How Can We Help?
                </label>
                <textarea
                  name="message"
                  rows={4}
                  className="w-full bg-sv-elevated border border-gold/15 rounded-xl px-4 py-3 text-cream focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/15 placeholder:text-sv-muted/40 resize-none transition-all duration-300"
                  placeholder="Tell us about your business goals..."
                />
              </div>
              <div className="md:col-span-2">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-gold to-bronze text-sv-bg font-bold text-lg py-6 h-auto hover:shadow-xl hover:shadow-gold/20 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group ripple-effect"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit & Get Free Strategy Session
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </div>
              <div className="md:col-span-2 flex items-center justify-center gap-4 text-sv-muted/50 text-xs">
                <span className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" />
                  Your data is safe & encrypted
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" />
                  Response within 24 hours
                </span>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
