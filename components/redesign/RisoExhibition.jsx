/* eslint-disable react/no-unescaped-entities */
'use client';
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { INK, eyebrowStyle } from './shared';
import InkSettleHeading from './InkSettle';
import { WALL_ARTIFACTS, WALL_LABELS } from './variants';

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

      {/* The wall. Desktop: scattered constellation. Mobile: tidy grid. */}
      <div
        className="wall"
        style={{
          position: 'relative',
          backgroundImage: 'url(/assets/redesign/exhibition-bed.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderTop: `3px solid ${INK.ink}`,
          minHeight: 'min(92vh, 860px)',
          overflow: 'hidden',
        }}
      >
        {/* Artifacts hang with a slight extra tilt and settle to their final angle
            as they enter — just hung on the wall. Hover lifts them 3px (shadow
            grows via CSS below): exhibits worth leaning in to. Rotation lives in
            framer's `rotate` so it survives the y animation (a string transform
            gets overwritten by motion values). */}
        {WALL_ARTIFACTS.map((a, i) => {
          const inActiveGroup = activeGroup === a.group;
          return (
            <motion.img
              key={a.src}
              src={a.src}
              alt=""
              className="wall-item"
              initial={{ opacity: 0, y: 18, rotate: reduce ? a.rot : a.rot + (i % 2 === 0 ? -2 : 2) }}
              whileInView={{ opacity: 1, y: 0, rotate: a.rot }}
              animate={{ scale: inActiveGroup ? 1.08 : 1 }}
              whileHover={{ y: -3 }}
              onHoverStart={() => setActiveGroup(a.group)}
              onHoverEnd={() => setActiveGroup(null)}
              viewport={{ once: true, margin: '-8%' }}
              transition={{
                duration: 0.8,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
                scale: { duration: 0.25, delay: 0, ease: 'easeOut' },
              }}
              style={{
                position: 'absolute',
                top: `${a.top}%`,
                left: `${a.left}%`,
                width: `${a.w}%`,
                zIndex: inActiveGroup ? 2 : 1,
                '--glow-ring': inActiveGroup ? `${a.glow}aa` : `${a.glow}55`,
                border: `3px solid ${a.glow}`,
                boxShadow: `0 0 0 ${inActiveGroup ? 7 : 5}px var(--glow-ring), 8px 8px 0 rgba(0,0,0,0.35)`,
              }}
            />
          );
        })}

        {WALL_LABELS.map((l, i) => (
          <motion.div
            key={l.num}
            className="wall-label"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              top: `${l.top}%`,
              left: `${l.left}%`,
              width: 'clamp(13rem, 17vw, 16rem)',
              rotate: l.rot,
              background: INK.paper,
              border: `2px solid ${INK.ink}`,
              boxShadow: '6px 6px 0 rgba(0,0,0,0.35)',
              padding: '1rem 1.1rem',
            }}
          >
            <div style={{
              fontFamily: 'var(--sans)', fontWeight: 500, fontSize: '0.6rem',
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'rgba(22,19,16,0.55)', marginBottom: '0.45rem',
            }}>
              {l.num}
            </div>
            <div style={{
              fontFamily: 'var(--serif)', fontStyle: 'italic',
              fontSize: '1.15rem', color: INK.ink, marginBottom: '0.4rem',
            }}>
              {l.label}
            </div>
            <p style={{
              fontFamily: 'var(--sans)', fontWeight: 300, fontSize: '0.82rem',
              lineHeight: 1.55, color: 'rgba(22,19,16,0.8)',
            }}>
              {l.text}
            </p>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        .wall :global(.wall-item) {
          transition: box-shadow 0.25s ease;
        }
        .wall :global(.wall-item:hover) {
          box-shadow: 0 0 0 6px var(--glow-ring), 11px 11px 0 rgba(0, 0, 0, 0.4) !important;
        }
        @media (max-width: 860px) {
          .wall {
            min-height: 0 !important;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 18px;
            padding: 24px 20px 40px;
          }
          .wall :global(.wall-item),
          .wall :global(.wall-label) {
            position: static !important;
            width: 100% !important;
            top: auto !important;
            left: auto !important;
          }
          .wall :global(.wall-label) {
            grid-column: span 2;
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
