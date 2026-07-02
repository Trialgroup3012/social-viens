"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedHeading from "@/components/ui/animated-heading";

const counters = [
  { value: 1000, suffix: "+", label: "Projects Completed", icon: "🏗️" },
  { value: 750, suffix: "+", label: "Happy Clients", icon: "🤝" },
  { value: 12, suffix: "+", label: "Years Experience", icon: "⏱️" },
  { value: 350, suffix: "%", label: "Average ROI", icon: "📈" },
];

function AnimatedCounter({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const current = Math.floor(eased * value);
      setCount(current);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [inView, value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function Results() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="results" className="relative py-24 overflow-hidden">
      <div className="section-divider mb-16" />

      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/3 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] text-gold/70 uppercase mb-4">
            Our Track Record
          </p>
          <AnimatedHeading text1="Results That" text2="Speak" />
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {counters.map((counter, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group"
            >
              <div className="glass rounded-2xl p-8 text-center card-hover gold-glow">
                <span className="text-4xl mb-4 block">{counter.icon}</span>
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-gold-gradient mb-3">
                  <AnimatedCounter
                    value={counter.value}
                    suffix={counter.suffix}
                    inView={inView}
                  />
                </div>
                <p className="text-sv-muted text-sm md:text-base">
                  {counter.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
