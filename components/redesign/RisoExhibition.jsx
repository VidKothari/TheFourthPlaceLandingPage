/* eslint-disable react/no-unescaped-entities */
'use client';
import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion';
import { INK, eyebrowStyle } from './shared';
import InkSettleHeading from './InkSettle';
import { EXHIBIT_CARDS, EXHIBIT_ITEMS } from './variants';

const keepClip = {
  src: 'add-flow-loop',
  num: '01',
  title: 'Keep',
  caption: 'Add the things that moved you. Write what they did to you, not what you think of them. They become your map.',
};

function KeepPoster({ reduce, compact = false }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    el.defaultMuted = true;
    const p = el.play();
    if (p) p.catch(() => {});
    const onCanPlay = () => { el.muted = true; el.play().catch(() => {}); };
    el.addEventListener('canplay', onCanPlay);
    return () => el.removeEventListener('canplay', onCanPlay);
  }, []);

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`keep-poster ${compact ? 'keep-poster-compact' : ''}`}
      style={{
        background: INK.paper,
        border: `3px solid ${INK.ink}`,
        boxShadow: '12px 14px 0 rgba(0,0,0,0.42)',
        padding: 'clamp(0.8rem, 1.6vw, 1.35rem)',
      }}
    >
      <div className="keep-media" style={{ border: `2px solid ${INK.ink}`, overflow: 'hidden', background: INK.ink }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={`/assets/demos/${keepClip.src}-poster.jpg`}
          style={{ width: '100%', height: 'auto', aspectRatio: '4 / 5', objectFit: 'contain', display: 'block' }}
        >
          <source src={`/assets/demos/${keepClip.src}.webm`} type="video/webm" />
          <source src={`/assets/demos/${keepClip.src}.mp4`} type="video/mp4" />
        </video>
      </div>
      <div className="keep-copy" style={{ padding: 'clamp(1.1rem, 2.5vw, 2rem) clamp(0.2rem, 1vw, 0.8rem) 0.35rem' }}>
        <div style={{
          fontFamily: 'var(--sans)', fontWeight: 500, fontSize: '0.62rem',
          letterSpacing: '0.24em', textTransform: 'uppercase',
          color: INK.red, marginBottom: '0.55rem',
        }}>
          {keepClip.num}
        </div>
        <h3 style={{
          fontFamily: 'var(--serif)', fontWeight: 400,
          fontSize: 'clamp(1.7rem, 3vw, 2.6rem)',
          color: INK.ink, marginBottom: '0.55rem',
        }}>
          {keepClip.title}
        </h3>
        <p style={{
          fontFamily: 'var(--sans)', fontWeight: 300,
          fontSize: 'clamp(0.9rem, 1.2vw, 1rem)', lineHeight: 1.65,
          color: 'rgba(22,19,16,0.82)', maxWidth: '42rem',
        }}>
          {keepClip.caption}
        </p>
      </div>
    </motion.article>
  );
}

function ExhibitSlide({ card, items, reduce }) {
  return (
    <motion.article
      key={card.num}
      className="exhibit-slide"
      initial={reduce ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: -14 }}
      transition={{ duration: reduce ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="exhibit-label exhibit-slide-label"
        style={{
          background: INK.paper,
          border: `2px solid ${INK.ink}`,
          boxShadow: '8px 8px 0 rgba(0,0,0,0.4)',
          padding: 'clamp(1.1rem, 1.8vw, 1.65rem)',
        }}
      >
        <div style={{
          display: 'inline-block', background: card.accent,
          border: `2px solid ${INK.ink}`, padding: '0.25rem 0.6rem',
          fontFamily: 'var(--sans)', fontWeight: 500, fontSize: '0.6rem',
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: card.accentInk || INK.ink, marginBottom: '0.9rem',
        }}>
          {card.num}
        </div>
        <h3 style={{
          fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400,
          fontSize: 'clamp(1.45rem, 2.3vw, 2.2rem)', lineHeight: 1.05,
          color: INK.ink, marginBottom: '0.65rem', textWrap: 'balance',
        }}>
          {card.label}
        </h3>
        <p style={{
          fontFamily: 'var(--sans)', fontWeight: 300, fontSize: 'clamp(0.82rem, 1vw, 0.95rem)',
          lineHeight: 1.6, color: 'rgba(22,19,16,0.82)',
        }}>
          {card.text}
        </p>
      </div>

      <div className={`artifact-pair exhibit-slide-artifacts ${items[0]?.wide ? 'artifact-pair-wide' : ''}`}>
        {items.map((item, itemIndex) => (
          <div
            className={`artifact-frame artifact-frame-${itemIndex + 1}`}
            key={item.src}
            style={{
              background: INK.paper,
              border: `3px solid ${INK.ink}`,
              boxShadow: '11px 13px 0 rgba(0,0,0,0.42)',
              padding: 'clamp(8px, 1vw, 14px)',
            }}
          >
            <img
              src={item.src}
              alt={`${card.label} artifact ${itemIndex + 1}`}
              style={{
                width: '100%', height: '100%', objectFit: 'contain',
                display: 'block', border: `1px solid ${INK.ink}`, background: INK.ink,
              }}
            />
          </div>
        ))}
      </div>
    </motion.article>
  );
}

function ExhibitRow({ card, items, index, reduce }) {
  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`exhibit-row ${index % 2 ? 'exhibit-row-reverse' : ''}`}
    >
      <div
        className="exhibit-label"
        style={{
          background: INK.paper,
          border: `2px solid ${INK.ink}`,
          boxShadow: '8px 8px 0 rgba(0,0,0,0.4)',
          padding: 'clamp(1.25rem, 2.2vw, 1.9rem)',
          alignSelf: 'center',
        }}
      >
        <div style={{
          display: 'inline-block', background: card.accent,
          border: `2px solid ${INK.ink}`, padding: '0.25rem 0.6rem',
          fontFamily: 'var(--sans)', fontWeight: 500, fontSize: '0.6rem',
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: card.accentInk || INK.ink, marginBottom: '0.9rem',
        }}>
          {card.num}
        </div>
        <h3 style={{
          fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400,
          fontSize: 'clamp(1.55rem, 2.7vw, 2.3rem)', lineHeight: 1.05,
          color: INK.ink, marginBottom: '0.65rem', textWrap: 'balance',
        }}>
          {card.label}
        </h3>
        <p style={{
          fontFamily: 'var(--sans)', fontWeight: 300, fontSize: '0.95rem',
          lineHeight: 1.65, color: 'rgba(22,19,16,0.82)',
        }}>
          {card.text}
        </p>
      </div>

      <div className={`artifact-pair ${items[0]?.wide ? 'artifact-pair-wide' : ''}`}>
        {items.map((item, itemIndex) => (
          <div
            className={`artifact-frame artifact-frame-${itemIndex + 1}`}
            key={item.src}
            style={{
              background: INK.paper,
              border: `3px solid ${INK.ink}`,
              boxShadow: '11px 13px 0 rgba(0,0,0,0.42)',
              padding: 'clamp(8px, 1.1vw, 15px)',
            }}
          >
            <img
              src={item.src}
              alt={`${card.label} artifact ${itemIndex + 1}`}
              style={{
                width: '100%', height: '100%', objectFit: 'contain',
                display: 'block', border: `1px solid ${INK.ink}`, background: INK.ink,
              }}
            />
          </div>
        ))}
      </div>
    </motion.article>
  );
}

export default function RisoExhibition() {
  const reduce = useReducedMotion();
  const containerRef = useRef(null);
  const [idx, setIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const families = Object.entries(EXHIBIT_CARDS).map(([group, card]) => ({
    group,
    card,
    items: EXHIBIT_ITEMS.filter((item) => item.group === group),
  }));
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setIdx(Math.min(5, Math.floor(v * 6)));
  });

  useEffect(() => {
    const query = window.matchMedia('(max-width: 860px)');
    const syncMobile = () => setIsMobile(query.matches);
    syncMobile();
    query.addEventListener('change', syncMobile);
    return () => query.removeEventListener('change', syncMobile);
  }, []);

  const useStackedFlow = reduce || isMobile;
  const activeFamily = families[idx] || families[0];

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
          initial={reduce ? false : { opacity: 0, y: 20 }}
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
        {useStackedFlow ? (
          <div className="stacked-exhibition">
            <KeepPoster reduce={reduce} />
            <div className="exhibition-list">
              {families.map(({ group, card, items }, index) => (
                <ExhibitRow
                  key={group}
                  card={card}
                  items={items}
                  index={index}
                  reduce={reduce}
                />
              ))}
            </div>
          </div>
        ) : (
          <div
            ref={containerRef}
            className="exhibition-scrub"
            style={{ height: `${families.length * 90}vh` }}
          >
            <div className="exhibition-viewport">
              <aside className="keep-column">
                <KeepPoster reduce={reduce} compact />
              </aside>
              <div className="exhibition-stage">
                <AnimatePresence mode="wait" initial={false}>
                  <ExhibitSlide
                    key={activeFamily.group}
                    card={activeFamily.card}
                    items={activeFamily.items}
                    reduce={reduce}
                  />
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        .exhibition-scrub {
          position: relative;
        }
        .exhibition-viewport {
          position: sticky;
          top: 0;
          height: 100svh;
          display: grid;
          grid-template-columns: minmax(16rem, 1fr) minmax(0, 3fr);
          gap: clamp(1.5rem, 3vw, 3.5rem);
          align-items: center;
        }
        .keep-column {
          min-width: 0;
        }
        .keep-poster {
          width: 100%;
        }
        .keep-media {
          aspect-ratio: 4 / 5;
        }
        .keep-poster-compact {
          max-height: calc(100svh - 3rem);
          padding: clamp(0.65rem, 1vw, 0.95rem) !important;
          box-shadow: 9px 10px 0 rgba(0,0,0,0.42) !important;
        }
        .keep-poster-compact .keep-copy {
          padding: clamp(0.75rem, 1.2vw, 1.1rem) 0.15rem 0.1rem !important;
        }
        .keep-poster-compact .keep-copy h3 {
          font-size: clamp(1.45rem, 2.2vw, 2rem) !important;
        }
        .keep-poster-compact .keep-copy p {
          font-size: clamp(0.78rem, 0.9vw, 0.92rem) !important;
          line-height: 1.5 !important;
        }
        .exhibition-stage {
          min-width: 0;
        }
        .exhibit-slide {
          display: grid;
          grid-template-columns: minmax(12rem, 0.8fr) minmax(0, 2.2fr);
          gap: clamp(1.5rem, 2.7vw, 3rem);
          align-items: center;
          width: 100%;
        }
        .exhibit-slide-label {
          align-self: center;
        }
        .exhibit-slide-artifacts {
          width: 100%;
        }
        .stacked-exhibition > .keep-poster {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          max-width: 24rem;
          margin-bottom: clamp(5rem, 10vw, 9rem);
        }
        .exhibition-list {
          display: grid;
          gap: clamp(5rem, 10vw, 9rem);
        }
        .exhibit-row {
          display: grid;
          grid-template-columns: minmax(15rem, 0.68fr) minmax(0, 1.32fr);
          gap: clamp(2rem, 6vw, 6rem);
          align-items: center;
        }
        .exhibit-row-reverse {
          grid-template-columns: minmax(0, 1.32fr) minmax(15rem, 0.68fr);
        }
        .exhibit-row-reverse .exhibit-label {
          grid-column: 2;
          grid-row: 1;
        }
        .exhibit-row-reverse .artifact-pair {
          grid-column: 1;
          grid-row: 1;
        }
        .artifact-pair {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(1rem, 2.5vw, 2.3rem);
          align-items: center;
          min-width: 0;
        }
        .artifact-frame {
          aspect-ratio: 3 / 4;
          min-width: 0;
        }
        .artifact-pair-wide .artifact-frame {
          aspect-ratio: 4 / 3;
        }
        .artifact-frame-1 {
          transform: translateY(-clamp(0px, 2vw, 24px)) rotate(-0.5deg);
        }
        .artifact-frame-2 {
          transform: translateY(clamp(0px, 2vw, 24px)) rotate(0.65deg);
        }
        @media (max-width: 860px) {
          .stacked-exhibition > .keep-poster,
          .exhibit-row,
          .exhibit-row-reverse {
            grid-template-columns: 1fr;
          }
          .exhibit-row-reverse .exhibit-label,
          .exhibit-row-reverse .artifact-pair {
            grid-column: 1;
            grid-row: auto;
          }
          .exhibit-row-reverse .exhibit-label {
            order: 0;
          }
          .exhibit-row-reverse .artifact-pair {
            order: 1;
          }
          .keep-copy {
            padding-top: 0.4rem !important;
          }
        }
        @media (max-width: 520px) {
          .artifact-pair {
            gap: 0.75rem;
          }
          .artifact-frame {
            padding: 6px !important;
            box-shadow: 7px 8px 0 rgba(0,0,0,0.42) !important;
          }
        }
      `}</style>
    </section>
  );
}
