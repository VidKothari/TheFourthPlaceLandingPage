/* eslint-disable react/no-unescaped-entities */
'use client';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { INK, cutout, eyebrowStyle } from './shared';
import InkSettleHeading from './InkSettle';
import AutoplayLoopVideo from './AutoplayLoopVideo';

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

  // The map hands scroll back to the page once it's fully zoomed out.
  useEffect(() => {
    const onMessage = (e) => {
      if (e.data && typeof e.data.tfpScrollBy === 'number') {
        window.scrollBy({ top: e.data.tfpScrollBy, behavior: 'auto' });
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
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

        <div className="map-row" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) clamp(17rem, 24vw, 22rem)',
          gap: 'clamp(1.5rem, 3vw, 2.5rem)',
          alignItems: 'stretch',
        }}>
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
              className="tastemap-frame"
              src="/tastemap-preview-riso.html"
              title="A live taste map — two people's collections as a constellation of posters"
              style={{ width: '100%', height: 'min(88vh, 820px)', border: 'none', display: 'block' }}
            />
          ) : (
            <div className="tastemap-frame" style={{ width: '100%', height: 'min(88vh, 820px)' }} />
          )}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.6rem',
            borderTop: `3px solid ${INK.ink}`, padding: '0.85rem 1.1rem', background: INK.paper,
          }}>
            <span style={{
              fontFamily: 'var(--sans)', fontWeight: 500, fontSize: '0.75rem', lineHeight: 1.45,
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

        {/* The share card: your map travels. Cobalt, like the card in the artwork. */}
        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-5%' }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: INK.cobalt,
            border: `3px solid ${INK.ink}`,
            boxShadow: '12px 12px 0 rgba(22,19,16,0.28)',
            padding: 'clamp(1.4rem, 2.2vw, 2rem)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.1rem',
            justifyContent: 'center',
          }}
        >
          <AutoplayLoopVideo
            preload="metadata"
            poster="/assets/demos/profile-share-loop-poster.jpg"
            aria-label="A profile link is copied from The Fourth Place and pasted into a social profile"
            style={{ width: '100%', aspectRatio: '4 / 5', objectFit: 'cover', border: `2px solid ${INK.ink}`, display: 'block', background: '#0a0a09' }}
          >
            <source src="/assets/demos/profile-share-loop.webm" type="video/webm" />
            <source src="/assets/demos/profile-share-loop.mp4" type="video/mp4" />
          </AutoplayLoopVideo>
          <div>
            <h3 style={{
              fontFamily: 'var(--serif)', fontWeight: 400,
              fontSize: 'clamp(1.4rem, 2vw, 1.8rem)', lineHeight: 1.2,
              color: INK.paper, marginBottom: '0.6rem', fontStyle: 'italic',
            }}>
              Your map travels.
            </h3>
            <p style={{
              fontFamily: 'var(--sans)', fontWeight: 300,
              fontSize: '0.95rem', lineHeight: 1.65,
              color: 'rgba(239,230,208,0.88)',
            }}>
              Your map and profile share as one link — drop it in a bio, a story,
              a chat. No screenshots, no explaining: anyone can walk through what
              you love in one tap.
            </p>
          </div>
        </motion.aside>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .map-row {
            grid-template-columns: 1fr !important;
          }
          .tastemap-frame {
            height: min(72svh, 620px) !important;
          }
        }
      `}</style>
    </section>
  );
}
