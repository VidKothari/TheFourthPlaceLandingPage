/* eslint-disable react/no-unescaped-entities */
'use client';
import { useRef, useState } from 'react';
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
import AutoplayLoopVideo from './AutoplayLoopVideo';

const keepClip = {
  src: 'add-flow-loop',
  title: 'Keep',
  caption: 'Add the things that moved you. Write what they did to you, not what you think of them. They become your map.',
};

function KeepPoster({ reduce, compact = false }) {
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
        <AutoplayLoopVideo
          preload="metadata"
          poster={`/assets/demos/${keepClip.src}-poster.jpg`}
          style={{ width: '100%', height: 'auto', aspectRatio: '4 / 5', objectFit: 'contain', display: 'block' }}
        >
          <source src={`/assets/demos/${keepClip.src}.webm`} type="video/webm" />
          <source src={`/assets/demos/${keepClip.src}.mp4`} type="video/mp4" />
        </AutoplayLoopVideo>
      </div>
      <div className="keep-copy" style={{ padding: 'clamp(1.1rem, 2.5vw, 2rem) clamp(0.2rem, 1vw, 0.8rem) 0.35rem' }}>
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
        <div className="exhibit-label-heading">
          <div style={{
            display: 'inline-block', background: card.accent,
            border: `2px solid ${INK.ink}`, padding: '0.25rem 0.6rem',
            fontFamily: 'var(--sans)', fontWeight: 500, fontSize: '0.75rem',
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: card.accentInk || INK.ink, marginBottom: '0.6rem',
          }}>
            {card.num}
          </div>
          <h3 style={{
            fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400,
            fontSize: 'clamp(1.45rem, 2.3vw, 2.2rem)', lineHeight: 1.05,
            color: INK.ink, textWrap: 'balance',
          }}>
            {card.label}
          </h3>
        </div>
        <p style={{
          fontFamily: 'var(--sans)', fontWeight: 300, fontSize: 'clamp(0.875rem, 1vw, 0.95rem)',
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

export default function RisoExhibition() {
  const reduce = useReducedMotion();
  const containerRef = useRef(null);
  const [idx, setIdx] = useState(0);
  const [mobileKeepOpen, setMobileKeepOpen] = useState(false);
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
    setIdx(Math.min(families.length - 1, Math.floor(v * families.length)));
  });

  const activeFamily = families[idx] || families[0];

  return (
    <section
      id="thread"
      style={{
        background: '#0a0a09',
        backgroundImage: 'linear-gradient(135deg, #1a0e2e 0%, #0e1828 52%, #091a1a 100%)',
        borderTop: `3px solid ${INK.ink}`,
      }}
    >
      <div
        ref={containerRef}
        className="exhibition-scrub"
        style={{ height: `${families.length * 100}svh` }}
      >
        <div className="exhibition-viewport">
          <div className="exhibition-inner">
            <motion.header
              className="exhibition-intro"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{ ...eyebrowStyle(INK.paper), opacity: 0.75, fontFamily: 'var(--font-mono)' }}>
                III. The Exhibition
              </div>
              <InkSettleHeading
                as="h2"
                ink={INK.mustard}
                style={{
                  fontFamily: 'var(--serif)', fontWeight: 400,
                  fontSize: 'clamp(2rem, 4.1vw, 3.55rem)', lineHeight: 1.03,
                  color: INK.paper, textWrap: 'balance',
                }}
              >
                What you can <em style={{ fontStyle: 'italic' }}>add.</em>
              </InkSettleHeading>
              <p>
                Save what stayed with you. Say why.
              </p>
            </motion.header>

            <div className="exhibition-composition">
              <aside className={`keep-column ${mobileKeepOpen ? 'is-open' : ''}`}>
                <button
                  type="button"
                  className="mobile-keep-toggle"
                  onClick={() => setMobileKeepOpen((open) => !open)}
                  aria-expanded={mobileKeepOpen}
                  aria-label={mobileKeepOpen ? 'Hide the Keep card' : 'Show the Keep card'}
                >
                  <span aria-hidden="true">{mobileKeepOpen ? '›' : '‹'}</span>
                </button>
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
        </div>
      </div>

      <style jsx global>{`
        .exhibition-scrub {
          position: relative;
        }
        .exhibition-viewport {
          position: sticky;
          top: 4.5rem;
          height: calc(100svh - 4.5rem);
          overflow: hidden;
        }
        .exhibition-inner {
          width: 100%;
          max-width: 1400px;
          height: 100%;
          margin: 0 auto;
          padding: clamp(1rem, 2.2vh, 1.5rem) clamp(20px, 5vw, 60px) clamp(1.1rem, 2.5vh, 1.8rem);
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: clamp(0.8rem, 1.8vh, 1.25rem);
        }
        .exhibition-intro {
          flex: 0 0 auto;
          display: grid;
          gap: 0;
          max-width: 46rem;
          margin-bottom: clamp(1.5rem, 3vh, 2.25rem);
        }
        .exhibition-intro > div:first-child {
          margin-bottom: clamp(0.9rem, 1.8vh, 1.25rem);
        }
        .exhibition-intro h2 {
          margin-bottom: clamp(0.9rem, 1.7vh, 1.2rem);
        }
        .exhibition-intro p {
          max-width: 38rem;
          font-family: var(--sans);
          font-weight: 300;
          font-size: clamp(0.88rem, 1.25vw, 1.05rem);
          line-height: 1.55;
          color: rgba(239,230,208,0.9);
        }
        .exhibition-composition {
          position: relative;
          flex: 1 1 auto;
          min-height: 0;
          display: grid;
          grid-template-columns: minmax(14rem, 0.7fr) minmax(0, 2.3fr);
          gap: clamp(1.5rem, 3vw, 3.5rem);
          align-items: stretch;
        }
        .keep-column {
          min-width: 0;
          min-height: 0;
          max-width: 19rem;
        }
        .keep-poster {
          width: 100%;
        }
        .keep-media {
          min-height: 0;
        }
        .keep-poster-compact {
          height: 100%;
          max-height: 100%;
          padding: clamp(0.65rem, 1vw, 0.95rem) !important;
          box-shadow: 9px 10px 0 rgba(0,0,0,0.42) !important;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .keep-poster-compact .keep-media {
          flex: 1 1 auto;
        }
        .keep-poster-compact .keep-media video {
          width: 100% !important;
          height: 100% !important;
          aspect-ratio: auto !important;
          object-fit: contain !important;
        }
        .keep-poster-compact .keep-copy {
          flex: 0 0 auto;
          padding: clamp(0.65rem, 1.1vh, 0.95rem) 0.15rem 0.1rem !important;
        }
        .keep-poster-compact .keep-copy h3 {
          font-size: clamp(1.35rem, 2vw, 1.9rem) !important;
        }
        .keep-poster-compact .keep-copy p {
          font-size: clamp(0.875rem, 0.9vw, 0.9rem) !important;
          line-height: 1.5 !important;
        }
        .exhibition-stage {
          min-width: 0;
          min-height: 0;
        }
        .exhibit-slide {
          display: grid;
          grid-template-rows: auto minmax(0, 1fr);
          gap: clamp(0.9rem, 1.8vh, 1.35rem);
          width: 100%;
          height: 100%;
          min-height: 0;
        }
        .exhibit-slide-label {
          display: grid;
          grid-template-columns: minmax(10rem, 0.8fr) minmax(14rem, 1.2fr);
          gap: clamp(1.25rem, 3vw, 3rem);
          align-items: center;
        }
        .exhibit-label-heading {
          min-width: 0;
        }
        .exhibit-slide-artifacts {
          width: 100%;
          height: 100%;
          min-height: 0;
          padding: 0 14px 14px 0;
          box-sizing: border-box;
        }
        .artifact-pair {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          grid-template-rows: minmax(0, 1fr);
          gap: clamp(1rem, 2.5vw, 2.3rem);
          align-items: stretch;
          justify-items: center;
          min-width: 0;
        }
        .artifact-frame {
          width: auto;
          max-width: 100%;
          min-width: 0;
          min-height: 0;
          height: 100%;
          aspect-ratio: 3 / 4;
          box-sizing: border-box;
          overflow: hidden;
        }
        .artifact-pair-wide .artifact-frame {
          aspect-ratio: 4 / 3;
        }
        .artifact-frame-1 {
          transform: rotate(-0.35deg);
        }
        .artifact-frame-2 {
          transform: rotate(0.45deg);
        }
        .mobile-keep-toggle {
          display: none;
        }
        @media (max-width: 860px) {
          .exhibition-inner {
            padding: 0.7rem 12px 0.8rem;
            gap: 0.65rem;
          }
          .exhibition-intro {
            padding-right: 1.75rem;
            margin-bottom: 1.5rem;
          }
          .exhibition-intro > div:first-child {
            font-size: 0.75rem !important;
            margin-bottom: 0.75rem;
          }
          .exhibition-intro h2 {
            font-size: clamp(1.7rem, 8.5vw, 2.25rem) !important;
            margin-bottom: 0.7rem;
          }
          .exhibition-intro p {
            max-width: 32rem;
            font-size: clamp(0.875rem, 3.6vw, 0.95rem);
            line-height: 1.5;
          }
          .exhibition-composition {
            display: block;
          }
          .exhibition-stage,
          .exhibit-slide {
            height: 100%;
          }
          .exhibit-slide {
            gap: 0.65rem;
          }
          .exhibit-slide-label {
            grid-template-columns: minmax(7.5rem, 0.85fr) minmax(0, 1.15fr);
            gap: 0.75rem;
            padding: 0.65rem 0.75rem !important;
            box-shadow: 5px 6px 0 rgba(0,0,0,0.4) !important;
          }
          .exhibit-label-heading > div {
            font-size: 0.75rem !important;
            padding: 0.18rem 0.38rem !important;
            margin-bottom: 0.35rem !important;
          }
          .exhibit-label-heading h3 {
            font-size: clamp(1rem, 4.8vw, 1.3rem) !important;
          }
          .exhibit-slide-label p {
            font-size: clamp(0.875rem, 3.5vw, 0.95rem) !important;
            line-height: 1.45 !important;
          }
          .keep-column {
            position: absolute;
            top: 5.75rem;
            right: -12px;
            width: calc(min(8.25rem, 34vw) + 2.65rem);
            max-width: none;
            z-index: 12;
            display: flex;
            align-items: flex-start;
            transform: translateX(calc(100% - 2.65rem));
            transition: transform 280ms cubic-bezier(0.16, 1, 0.3, 1);
          }
          .keep-column.is-open {
            transform: translateX(0);
          }
          .mobile-keep-toggle {
            flex: 0 0 2.65rem;
            display: grid;
            place-items: center;
            width: 2.65rem;
            height: 3.25rem;
            padding: 0;
            border: 2px solid ${INK.ink};
            border-right: 0;
            border-radius: 999px 0 0 999px;
            background: ${INK.paper};
            color: ${INK.ink};
            font-family: var(--font-mono);
            font-size: 1.65rem;
            font-weight: 500;
            line-height: 1;
            cursor: pointer;
            box-shadow: -4px 5px 0 rgba(0,0,0,0.32);
          }
          .mobile-keep-toggle:focus-visible {
            outline: 3px solid ${INK.paper};
            outline-offset: 2px;
          }
          .keep-column .keep-poster {
            flex: 0 0 min(8.25rem, 34vw);
            height: auto;
            max-height: none;
            padding: 0.35rem !important;
            border-width: 2px !important;
            border-left: 0 !important;
            box-shadow: 5px 6px 0 rgba(0,0,0,0.42) !important;
          }
          .keep-column .keep-media {
            flex: none;
            aspect-ratio: 4 / 5;
          }
          .keep-column .keep-media video {
            height: auto !important;
            aspect-ratio: 4 / 5 !important;
          }
          .keep-column .keep-copy {
            padding: 0.35rem 0.05rem 0.05rem !important;
          }
          .keep-column .keep-copy h3 {
            font-size: 1rem !important;
            margin-bottom: 0.2rem !important;
          }
          .keep-column .keep-copy p {
            font-size: 0.875rem !important;
            line-height: 1.45 !important;
          }
          .artifact-pair {
            gap: 0.6rem;
            padding: 0 8px 8px 0;
            grid-template-columns: minmax(0, 1fr);
            grid-template-rows: repeat(2, auto);
            align-items: start;
          }
          .artifact-frame {
            width: clamp(8rem, calc((100svh - 20rem) * 0.375), 54vw);
            height: auto;
            padding: 5px !important;
            box-shadow: 6px 7px 0 rgba(0,0,0,0.42) !important;
          }
          .artifact-pair-wide .artifact-frame {
            width: clamp(10rem, calc((100svh - 20rem) * 0.666), 82vw);
          }
          .artifact-frame-1,
          .artifact-frame-2 {
            transform: none;
          }
        }
        @media (max-width: 520px) {
          .exhibition-intro p {
            max-width: 22rem;
          }
        }
      `}</style>
    </section>
  );
}
