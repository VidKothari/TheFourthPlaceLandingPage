"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const fonts = [
  "font-sans",
  "font-serif",
  "font-mono",
  "font-playfair",
  "font-libre",
];

export default function LivingText({ text, className = "" }) {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const getRandomFont = () => fonts[Math.floor(Math.random() * fonts.length)];

  if (!isClient) return <span className={className}>{text}</span>;

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
