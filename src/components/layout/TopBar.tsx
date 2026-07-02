"use client";

import { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Clock, Instagram, Linkedin, Facebook } from "lucide-react";

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/socialviens", Icon: Instagram },
  { label: "LinkedIn", href: "https://linkedin.com/company/socialviens", Icon: Linkedin },
  { label: "Facebook", href: "https://facebook.com/socialviens", Icon: Facebook },
];

export default function TopBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHidden(window.scrollY > 40);
    };
    // Initialize on mount (in case the page was loaded already scrolled)
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`hidden sm:block fixed top-0 left-0 right-0 z-40 bg-maroon-dark/80 backdrop-blur-sm border-b border-gold/10 ${
        hidden ? "-translate-y-9 opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
      } [transition:transform_300ms_ease-in-out,opacity_300ms]`}
      aria-hidden={hidden ? "true" : undefined}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between text-xs">
        {/* Left side: contact info */}
        <div className="flex items-center gap-4 min-w-0">
          {/* Phone — visible on all screens >= sm */}
          <a
            href="tel:+918178004800"
            className="flex items-center gap-1.5 text-gold hover:text-gold-light transition-colors min-h-[36px]"
            aria-label="Call us at +91 81780 04800"
          >
            <Phone className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">+91 81780 04800</span>
          </a>

          {/* Email — md+ only */}
          <a
            href="mailto:socialviens@gmail.com"
            className="hidden md:flex items-center gap-1.5 text-cream-dark hover:text-gold transition-colors min-h-[36px]"
          >
            <Mail className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">socialviens@gmail.com</span>
          </a>

          {/* Location — md+ only */}
          <span className="hidden md:flex items-center gap-1.5 text-cream-dark">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span>Delhi NCR</span>
          </span>
        </div>

        {/* Right side: hours + socials (md+ only) */}
        <div className="hidden md:flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-cream-dark">
            <Clock className="w-3 h-3" />
            <span>Mon-Sat 9AM-7PM</span>
          </span>

          <div className="flex items-center gap-3 pl-3 border-l border-gold/15">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-gold hover:text-gold-light hover:scale-110 transition-transform min-w-[20px] min-h-[20px] flex items-center justify-center"
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
