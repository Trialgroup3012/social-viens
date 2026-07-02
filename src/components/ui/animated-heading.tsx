"use client";

import { motion } from "framer-motion";

interface AnimatedHeadingProps {
  text1: string;
  text2: string;
  className?: string;
}

export default function AnimatedHeading({ text1, text2, className = "" }: AnimatedHeadingProps) {
  // Split each word into characters for staggered reveal
  const words1 = text1.split(" ");
  const words2 = text2.split(" ");

  return (
    <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${className}`}>
      <span className="text-cream">
        {words1.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="inline-block mr-[0.3em]"
          >
            {word}
          </motion.span>
        ))}
      </span>{" "}
      <span className="text-gold-gradient">
        {words2.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (words1.length + i) * 0.08, duration: 0.5 }}
            className="inline-block mr-[0.3em]"
          >
            {word}
          </motion.span>
        ))}
      </span>
    </h2>
  );
}
