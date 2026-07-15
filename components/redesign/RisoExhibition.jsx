/* eslint-disable react/no-unescaped-entities */
'use client';
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { INK, eyebrowStyle } from './shared';
import InkSettleHeading from './InkSettle';
import { WALL_SEQUENCE } from './variants';

// The 1,200vh scroll becomes one poster wall in the dark gallery:
// real artwork as cutouts with glow outlines on the cobalt bed.
// Seamless with the taste map above: the heading sits on the same newsprint
// ground; only the wall itself is the cobalt room (July 16 review).
export default function RisoExhibition() {
  const reduce = useReducedMotion();
  // Hovering one artifact makes its whole family pop (same-group items scale up
  // and their glow ring brightens); everything settles when the hover ends.
  const [activeGroup, setActiveGroup] = useState(null);
  return (
    <section id="thread" style={{ position: 'relative', background: INK.paperDeep, paddingTop: 'clamp(40px, 6vw, 80px)', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/assets/redesign/map-newsprint.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
        opacity: 0.22,
        pointerEvents: 'none',
      }} />
      <div className="mobile-padding" style={{ position: 'relative', maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 60px)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            maxWidth: '46rem',
            marginBottom: 'clamp(2rem, 4vw, 3.5rem)',
            background: INK.paper,
            padding: 'clamp(1.25rem, 2.5vw, 2rem)',
            boxShadow: '8px 8px 0 rgba(22,19,16,0.15)',
          }}
        >
          <div style={{ ...eyebrowStyle(INK.ink), opacity: 0.75, fontFamily: 'var(--font-mono)', marginBottom: '1.3rem' }}>
            III. The Exhibition
          </div>
          <InkSettleHeading
            as="h2"
            ink={INK.cobalt}
            style={{
              fontFamily: 'var(--serif)', fontWeight: 400,
              fontSize: 'clamp(2rem, 4.4vw, 3.8rem)', lineHeight: 1.08,
              color: INK.ink, marginBottom: '1.1rem', textWrap: 'balance',
            }}
          >
            What you can <em style={{ fontStyle: 'italic' }}>add.</em>
          </InkSettleHeading>
          <p style={{
            fontFamily: 'var(--sans)', fontWeight: 300,
            fontSize: 'clamp(0.98rem, 1.4vw, 1.12rem)', lineHeight: 1.7,
            color: INK.ink, maxWidth: '38rem',
          }}>
            You save the things that actually moved you and write a line
            about why. Each one becomes a star on the map you just saw.
            These are the kinds of things people keep:
          </p>
        </motion.div>
      </div>

      {/* The salon hang: matted, framed, disciplined. Hover one piece and its
          whole family (same group) leans forward with it. */}
      <div
        className="wall"
        style={{
          position: 'relative',
          backgroundImage: 'url(/assets/redesign/exhibition-wall.webp)',
          backgroundColor: INK.cobalt,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderTop: `3px solid ${INK.ink}`,
          padding: 'clamp(32px, 5vw, 72px) clamp(20px, 5vw, 60px) clamp(48px, 6vw, 88px)',
        }}
      >
        <div
          className="salon-grid"
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: 'clamp(14px, 2vw, 26px)',
            alignItems: 'center',
          }}
        >
          {WALL_SEQUENCE.map((item, i) => {
            const active = activeGroup === item.group;
            if (item.type === 'label') {
              return (
                <motion.div
                  key={item.num}
                  className="salon-label"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  animate={{ scale: active ? 1.04 : 1 }}
                  onHoverStart={() => setActiveGroup(item.group)}
                  onHoverEnd={() => setActiveGroup(null)}
                  viewport={{ once: true, margin: '-8%' }}
                  transition={{ duration: 0.7, delay: (i % 6) * 0.06, ease: [0.16, 1, 0.3, 1], scale: { duration: 0.25, delay: 0 } }}
                  style={{
                    gridColumn: 'span 2',
                    rotate: reduce ? 0 : item.rot,
                    background: INK.paper,
                    border: `2px solid ${INK.ink}`,
                    boxShadow: active ? '8px 8px 0 rgba(0,0,0,0.45)' : '6px 6px 0 rgba(0,0,0,0.35)',
                    padding: '1.1rem 1.2rem',
                    transition: 'box-shadow 0.25s ease',
                  }}
                >
                  <div style={{
                    fontFamily: 'var(--sans)', fontWeight: 500, fontSize: '0.6rem',
                    letterSpacing: '0.22em', textTransform: 'uppercase',
                    color: 'rgba(22,19,16,0.55)', marginBottom: '0.45rem',
                  }}>
                    {item.num}
                  </div>
                  <div style={{
                    fontFamily: 'var(--serif)', fontStyle: 'italic',
                    fontSize: '1.2rem', color: INK.ink, marginBottom: '0.4rem',
                  }}>
                    {item.label}
                  </div>
                  <p style={{
                    fontFamily: 'var(--sans)', fontWeight: 300, fontSize: '0.84rem',
                    lineHeight: 1.55, color: 'rgba(22,19,16,0.8)',
                  }}>
                    {item.text}
                  </p>
                </motion.div>
              );
            }
            return (
              <motion.div
                key={item.src}
                className="salon-frame"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={{ scale: active ? 1.06 : 1 }}
                whileHover={{ y: -4 }}
                onHoverStart={() => setActiveGroup(item.group)}
                onHoverEnd={() => setActiveGroup(null)}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.7, delay: (i % 6) * 0.06, ease: [0.16, 1, 0.3, 1], scale: { duration: 0.25, delay: 0 } }}
                style={{
                  gridColumn: item.wide ? 'span 2' : 'span 1',
                  rotate: reduce ? 0 : item.rot,
                  zIndex: active ? 2 : 1,
                  background: INK.paper,
                  border: `2px solid ${INK.ink}`,
                  padding: 'clamp(8px, 1vw, 14px)',
                  boxShadow: active ? '10px 12px 0 rgba(0,0,0,0.5)' : '7px 8px 0 rgba(0,0,0,0.38)',
                  transition: 'box-shadow 0.25s ease',
                }}
              >
                <img
                  src={item.src}
                  alt=""
                  style={{ width: '100%', height: 'auto', display: 'block', border: `1px solid ${INK.ink}` }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 860px) {
          .salon-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .salon-grid :global(.salon-label) {
            grid-column: span 2 !important;
          }
          .salon-grid :global(.salon-frame) {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
