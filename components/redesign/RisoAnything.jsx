'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { INK } from './shared';

// ---------------------------------------------------------------------------
// "and Literally Anything" — the Exhibition's coda. A small band (≤40vh on
// desktop) directly after the scrub: the torn-link burst artwork on the right
// (Instagram / Reddit / X / Substack / Medium / Wikipedia badges leaping out
// of a ripped paper address bar), the punchline text on the left. Same gallery
// ground as the Exhibition so it reads as its last breath, not a new room.
// ---------------------------------------------------------------------------
export default function RisoAnything() {
  const reduce = useReducedMotion();
  return (
    <section className="riso-halftone" style={{ background: INK.base }}>
      <div className="anyt-band">
        <motion.div
          className="anyt-text"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="anyt-h">
            and <em>Literally Anything</em>
          </h3>
          <p className="anyt-sub">
            reels, blog posts, any website that inspires you, just add a link
          </p>
        </motion.div>
        <motion.img
          className="anyt-art"
          src="/assets/redesign/anything-burst.png"
          alt="Instagram, Reddit, X, Substack, Medium and Wikipedia badges bursting out of a torn paper link bar"
          loading="lazy"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <style jsx global>{`
        .anyt-band {
          position: relative;
          max-width: 1400px;
          margin: 0 auto;
          height: 62vh;
          max-height: 700px;
          display: flex;
          align-items: center;
          gap: clamp(1.5rem, 4vw, 4rem);
          padding: 0 clamp(20px, 5vw, 60px);
          box-sizing: border-box;
          overflow: hidden;
        }
        .anyt-text {
          flex: 0 0 auto;
          max-width: 30rem;
        }
        .anyt-h {
          font-family: var(--serif);
          font-weight: 400;
          font-size: clamp(2rem, 4vw, 3.55rem);
          line-height: 1.1;
          color: ${INK.paper};
          margin: 0 0 0.9rem;
          text-wrap: balance;
        }
        .anyt-h em {
          font-style: italic;
        }
        .anyt-sub {
          font-family: var(--sans);
          font-weight: 300;
          font-size: clamp(1rem, 1.45vw, 1.25rem);
          line-height: 1.6;
          color: rgba(239, 230, 208, 0.78);
          margin: 0;
          max-width: 24rem;
        }
        .anyt-art {
          flex: 1 1 auto;
          min-width: 0;
          height: 100%;
          object-fit: contain;
          object-position: right center;
          display: block;
        }
        @media (max-width: 860px) {
          .anyt-band {
            height: auto;
            max-height: none;
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
            padding: clamp(1.5rem, 6vw, 2.5rem) clamp(16px, 5vw, 28px) 0.5rem;
          }
          .anyt-art {
            width: 100%;
            height: auto;
            max-height: 46vh;
            object-position: center;
          }
        }
      `}</style>
    </section>
  );
}
