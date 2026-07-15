/* eslint-disable react/no-unescaped-entities */
'use client';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { INK, cutout, eyebrowStyle } from './shared';
import InkSettleHeading from './InkSettle';

export default function RisoTasteMap({ eyesTile }) {
  const [load, setLoad] = useState(false);
  const holder = useRef(null);

  useEffect(() => {
    const el = holder.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setLoad(true); io.disconnect(); } },
      { rootMargin: '400px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="tastemap"
      style={{
        position: 'relative',
        background: INK.paperDeep,
        padding: 'clamp(64px, 9vw, 130px) clamp(20px, 5vw, 60px)',
        overflow: 'hidden',
      }}
    >
      {/* Newsprint bed under everything, faded to texture. */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/assets/redesign/map-newsprint.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.22,
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', maxWidth: '1400px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem', marginBottom: 'clamp(2rem, 4vw, 3.5rem)', flexWrap: 'wrap' }}
        >
          {/* Solid paper backplate so the text never fights the newsprint texture. */}
          <div style={{
            maxWidth: '46rem',
            background: INK.paper,
            padding: 'clamp(1.25rem, 2.5vw, 2rem)',
            boxShadow: '8px 8px 0 rgba(22,19,16,0.15)',
          }}>
            <div style={{ ...eyebrowStyle(INK.ink), opacity: 0.75, marginBottom: '1.3rem' }}>
              II. The Taste Map
            </div>
            <InkSettleHeading
              as="h2"
              ink={INK.red}
              style={{
                fontFamily: 'var(--serif)', fontWeight: 400,
                fontSize: 'clamp(2rem, 4.4vw, 3.8rem)', lineHeight: 1.08,
                color: INK.ink, marginBottom: '1.1rem', textWrap: 'balance',
              }}
            >
              What goes <em style={{ fontStyle: 'italic' }}>on your map.</em>
            </InkSettleHeading>
            <p style={{
              fontFamily: 'var(--sans)', fontWeight: 300,
              fontSize: 'clamp(0.98rem, 1.4vw, 1.12rem)', lineHeight: 1.7,
              color: INK.ink, maxWidth: '38rem',
            }}>
              This one is live — it belongs to two people, Alex and Jordan. Drag it
              around, click any poster, switch between them, and hit{' '}
              <em style={{ fontStyle: 'italic' }}>Combined</em> to see exactly what they share.
            </p>
          </div>

          {eyesTile && (
            <img
              src="/assets/redesign/eyes-grid.webp"
              alt="Four eyes printed in four different acid colorways"
              style={{ ...cutout('rgba(22,19,16,0.25)'), width: 'clamp(7rem, 12vw, 10.5rem)', flexShrink: 0 }}
            />
          )}
        </motion.div>

        <motion.div
          ref={holder}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-5%' }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ border: `3px solid ${INK.ink}`, boxShadow: '12px 12px 0 rgba(22,19,16,0.28)', background: INK.paperDeep }}
        >
          {load ? (
            <iframe
              src="/tastemap-preview-riso.html"
              title="A live taste map — two people's collections as a constellation of posters"
              style={{ width: '100%', height: 'min(88vh, 820px)', border: 'none', display: 'block' }}
            />
          ) : (
            <div style={{ width: '100%', height: 'min(88vh, 820px)' }} />
          )}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.6rem',
            borderTop: `3px solid ${INK.ink}`, padding: '0.85rem 1.1rem', background: INK.paper,
          }}>
            <span style={{
              fontFamily: 'var(--sans)', fontWeight: 500, fontSize: '0.7rem',
              letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(22,19,16,0.7)',
            }}>
              Drag to rotate · click any poster · hit Combined
            </span>
            <span style={{
              fontFamily: 'var(--serif)', fontStyle: 'italic',
              fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)', color: INK.ink,
            }}>
              What you share is the picture.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
