/* eslint-disable react/no-unescaped-entities */
'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { INK, eyebrowStyle } from './shared';
import InkSettleHeading from './InkSettle';
import { EXHIBIT_CARDS, EXHIBIT_ITEMS } from './variants';

// v3 — the spotlight gallery. Album-cover confidence from the inspo: ONE artifact
// at a time, huge and matted on the quiet cobalt wall, its exhibit card beside it,
// a film-strip rail below. Click to re-hang; families pop together on hover; the
// wall re-hangs itself slowly when left alone.
export default function RisoExhibition() {
  const reduce = useReducedMotion();
  const [featured, setFeatured] = useState(0);
  const [activeGroup, setActiveGroup] = useState(null);
  const [paused, setPaused] = useState(false);

  const item = EXHIBIT_ITEMS[featured];
  const card = EXHIBIT_CARDS[item.group];

  // Slow self-advance, paused on any hover. Gentle state transition, not ambience.
  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(() => setFeatured((f) => (f + 1) % EXHIBIT_ITEMS.length), 4500);
    return () => clearInterval(t);
  }, [reduce, paused]);

  return (
    <section
      id="thread"
      style={{
        background: INK.cobalt,
        backgroundImage: 'url(/assets/redesign/exhibition-wall.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderTop: `3px solid ${INK.ink}`,
        padding: 'clamp(64px, 9vw, 130px) clamp(20px, 5vw, 60px)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: '46rem', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}
        >
          <div style={{ ...eyebrowStyle(INK.paper), opacity: 0.75, fontFamily: 'var(--font-mono)', marginBottom: '1.3rem' }}>
            III. The Exhibition
          </div>
          <InkSettleHeading
            as="h2"
            ink={INK.mustard}
            style={{
              fontFamily: 'var(--serif)', fontWeight: 400,
              fontSize: 'clamp(2rem, 4.4vw, 3.8rem)', lineHeight: 1.08,
              color: INK.paper, marginBottom: '1.1rem', textWrap: 'balance',
            }}
          >
            What you can <em style={{ fontStyle: 'italic' }}>add.</em>
          </InkSettleHeading>
          <p style={{
            fontFamily: 'var(--sans)', fontWeight: 300,
            fontSize: 'clamp(0.98rem, 1.4vw, 1.12rem)', lineHeight: 1.7,
            color: 'rgba(239,230,208,0.9)', maxWidth: '38rem',
          }}>
            You save the things that actually moved you and write a line
            about why. Each one becomes a star on the map you just saw.
            These are the kinds of things people keep:
          </p>
        </motion.div>

        {/* The stage: one huge framed piece + its wall card. */}
        <div
          className="stage"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.25fr) minmax(15rem, 0.75fr)',
            gap: 'clamp(2rem, 4vw, 4rem)',
            alignItems: 'center',
            marginBottom: 'clamp(2rem, 4vw, 3.5rem)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', minHeight: 'min(58vh, 560px)', alignItems: 'center' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={item.src}
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.035, rotate: -0.6 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.985 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: INK.paper,
                  border: `3px solid ${INK.ink}`,
                  padding: 'clamp(12px, 1.4vw, 22px)',
                  boxShadow: '14px 16px 0 rgba(0,0,0,0.45)',
                  maxWidth: item.wide ? 'min(44rem, 100%)' : 'min(26rem, 100%)',
                }}
              >
                <img
                  src={item.src}
                  alt={`${card.label} on the wall`}
                  style={{
                    width: '100%',
                    maxHeight: 'min(48vh, 470px)',
                    objectFit: 'contain',
                    display: 'block',
                    border: `1px solid ${INK.ink}`,
                    background: INK.ink,
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={card.num}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: INK.paper,
                border: `2px solid ${INK.ink}`,
                boxShadow: '8px 8px 0 rgba(0,0,0,0.4)',
                padding: 'clamp(1.3rem, 2vw, 1.8rem)',
                justifySelf: 'start',
                width: '100%',
                maxWidth: '24rem',
              }}
            >
              <div style={{
                display: 'inline-block',
                background: card.accent,
                border: `2px solid ${INK.ink}`,
                padding: '0.25rem 0.6rem',
                fontFamily: 'var(--sans)', fontWeight: 500, fontSize: '0.6rem',
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: card.accentInk || INK.ink,
                marginBottom: '0.9rem',
              }}>
                {card.num}
              </div>
              <div style={{
                fontFamily: 'var(--serif)', fontStyle: 'italic',
                fontSize: 'clamp(1.6rem, 2.6vw, 2.2rem)', color: INK.ink, marginBottom: '0.5rem',
              }}>
                {card.label}
              </div>
              <p style={{
                fontFamily: 'var(--sans)', fontWeight: 300, fontSize: '0.95rem',
                lineHeight: 1.65, color: 'rgba(22,19,16,0.82)',
              }}>
                {card.text}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* The rail: every piece in the collection. Click to re-hang the wall. */}
        <div
          className="rail"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => { setPaused(false); setActiveGroup(null); }}
          style={{
            display: 'flex',
            gap: 'clamp(10px, 1.4vw, 18px)',
            overflowX: 'auto',
            paddingBottom: '12px',
          }}
        >
          {EXHIBIT_ITEMS.map((t, i) => {
            const inGroup = activeGroup === t.group;
            const isFeatured = i === featured;
            return (
              <motion.button
                key={t.src}
                onClick={() => setFeatured(i)}
                onHoverStart={() => setActiveGroup(t.group)}
                onHoverEnd={() => setActiveGroup(null)}
                animate={{ scale: inGroup ? 1.07 : 1, y: inGroup ? -4 : 0 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                aria-label={`Show this ${EXHIBIT_CARDS[t.group].label.toLowerCase()}`}
                style={{
                  flex: '0 0 auto',
                  width: t.wide ? '7.5rem' : '4.6rem',
                  background: INK.paper,
                  border: `2px solid ${isFeatured ? EXHIBIT_CARDS[t.group].accent : INK.ink}`,
                  outline: isFeatured ? `2px solid ${EXHIBIT_CARDS[t.group].accent}` : 'none',
                  padding: '5px',
                  cursor: 'pointer',
                  boxShadow: '4px 4px 0 rgba(0,0,0,0.35)',
                  opacity: activeGroup && !inGroup ? 0.55 : 1,
                  transition: 'opacity 0.2s ease, border-color 0.2s ease',
                }}
              >
                <img src={t.src} alt="" style={{ width: '100%', height: '4.2rem', objectFit: 'cover', display: 'block' }} />
              </motion.button>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 860px) {
          .stage {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
