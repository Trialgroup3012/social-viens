"use client";

import { motion } from "framer-motion";

interface AnimatedHeadingProps {
  text1: string;
  text2: string;
  className?: string;
  as?: "h1" | "h2";
}

export default function AnimatedHeading({ text1, text2, className = "", as: Tag = "h2" }: AnimatedHeadingProps) {
  // Split each word into characters for staggered reveal
  const words1 = text1.split(" ");
  const words2 = text2.split(" ");

  return (
    <Tag className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${className}`}>
      <span className="text-cream">
        {words1.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="inline-block whitespace-pre"
          >
            {word}{i < words1.length - 1 ? " " : ""}
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
            className="inline-block whitespace-pre"
          >
            {word}{i < words2.length - 1 ? " " : ""}
          </motion.span>
        ))}
      </span>
    </Tag>
  );
}
