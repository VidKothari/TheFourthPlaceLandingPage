"use client";

import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";

const defaultFonts = ["font-sans", "font-serif", "font-mono", "font-playfair", "font-libre"];

function subscribeToViewport(onChange) {
  window.addEventListener("resize", onChange);
  return () => window.removeEventListener("resize", onChange);
}

function getDesktopViewport() {
  return window.innerWidth >= 768;
}

function getServerDesktopViewport() {
  return false;
}

function getCharacterSeed(wordIndex, characterIndex, character) {
  return (
    (wordIndex + 1) * 131
    + (characterIndex + 1) * 67
    + character.codePointAt(0)
  );
}

export default function LivingText({ text, className = "", fonts = defaultFonts }) {
  const isDesktop = useSyncExternalStore(
    subscribeToViewport,
    getDesktopViewport,
    getServerDesktopViewport,
  );

  // Static render on mobile or before hydration — no per-character animation overhead
  if (!isDesktop) return <span className={className}>{text}</span>;

  return (
    <span className={className}>
      {text.split(" ").map((word, wi) => (
        <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.split("").map((char, ci) => {
            const seed = getCharacterSeed(wi, ci, char);
            const font = fonts.length > 0 ? fonts[seed % fonts.length] : "";
            const duration = 2 + (seed % 200) / 100;
            const delay = ((seed * 31) % 200) / 100;

            return (
              <motion.span
                key={ci}
                className={`inline-block ${font}`}
                animate={{ opacity: [0.8, 1, 0.8], y: [0, -1, 0] }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay,
                }}
                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
              >
                {char}
              </motion.span>
            );
          })}
          {wi < text.split(" ").length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}
