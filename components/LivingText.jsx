"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";

const fonts = ["font-sans", "font-serif", "font-mono", "font-playfair", "font-libre"];

// Synchronous before-paint detection to avoid animation flash
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function LivingText({ text, className = "" }) {
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useIsomorphicLayoutEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getRandomFont = () => fonts[Math.floor(Math.random() * fonts.length)];

  // Static render on mobile or before hydration — no per-character animation overhead
  if (!isClient || isMobile) return <span className={className}>{text}</span>;

  return (
    <span className={className}>
      {text.split(" ").map((word, wi) => (
        <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.split("").map((char, ci) => (
            <motion.span
              key={ci}
              className={`inline-block ${getRandomFont()}`}
              animate={{ opacity: [0.8, 1, 0.8], y: [0, -1, 0] }}
              transition={{
                duration: Math.random() * 2 + 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
              whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
            >
              {char}
            </motion.span>
          ))}
          {wi < text.split(" ").length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}
