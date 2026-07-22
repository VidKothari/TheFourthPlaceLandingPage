'use client';
import { useMemo, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion';
import { INK } from './shared';
import { EXHIBIT_CARDS, EXHIBIT_ITEMS } from './variants';

// ---------------------------------------------------------------------------
// THE EXHIBITION — floating gallery of posters + a faithful recreation of the
// app's "Add to collection" card at dead centre.
//
// As you scroll, the sticky viewport scrubs through the six media families
// (see EXHIBIT_CARDS order). On each family the ~10 posters scattered around
// the edges swap out (framer-motion stagger), and the centre card crossfades
// to that family's example item — mirroring the real app UI 1:1 in HTML/CSS.
// The card is pure scenography: pointer-events none, decorative controls
// aria-hidden.
//
// Kept from the previous version: section id="thread" (riso-halftone, INK.base
// ground, 3px ink borderTop), the sticky-scrub skeleton (scrub height =
// families × 100svh, sticky viewport at top 4.5rem), scrollYProgress→idx
// wiring, useReducedMotion, and the AnimatePresence crossfade.
// ---------------------------------------------------------------------------

// One curated example per family, in EXHIBIT_CARDS order. Titles/posterSrc/tags
// were visually verified against the artwork and are kept as-is. `label` is the
// app's own TYPE_LABELS name and `accent` its TYPE_ACCENT ink — the card is the
// app's UI, so it wears the app's chip + cover border colours.
// Scrub order + the headline word per family — Siddharth's exact list:
// "Add your favourite <x>" where only <x> changes.
const FAMILY_ORDER = ['films', 'albums', 'books', 'videos', 'games', 'spirals'];
const HEADLINE_WORDS = {
  films: 'Films and TV',
  albums: 'Songs/Albums/Artists',
  books: 'Books',
  videos: 'YouTube Videos and Channels',
  games: 'Games',
  spirals: 'Articles',
};

const FAMILY_ENTRIES = {
  films: {
    accent: '#ef6a55',
    title: 'Donnie Darko',
    posterSrc: '/assets/movie3.webp',
    tags: ['Time', 'Fate', 'Adolescence'],
  },
  albums: {
    accent: '#2b3fb8',
    title: 'Arctic Monkeys, AM',
    posterSrc: '/assets/music2.webp',
    tags: ['Nighttime', 'Longing', 'Ache'],
  },
  books: {
    accent: '#ef6a55',
    title: 'Crime and Punishment',
    posterSrc: '/assets/book1.webp',
    tags: ['Guilt', 'Conscience', 'Redemption'],
  },
  spirals: {
    accent: '#e8c53a',
    title: 'Olga Karlatos',
    posterSrc: '/assets/wikipedia1.webp',
    tags: ['Curiosity', 'Detours', 'Obscurity'],
  },
  videos: {
    accent: '#c8291e',
    title: 'Johnny Cash - Hurt',
    posterSrc: '/assets/youtubeVid7.webp',
    tags: ['Grief', 'Regret', 'Time'],
  },
  games: {
    accent: '#c6e02e',
    title: 'Elden Ring',
    posterSrc: '/assets/game1.jpg',
    tags: ['Solitude', 'Ruin', 'Persistence'],
  },
};

// Ten scatter slots in viewport-percent coordinates (poster top-left anchor +
// width as % of viewport width). Kept in the LEFT and RIGHT thirds plus the
// top/bottom corners so the centre column (header + card) stays clear.
const SLOTS = [
  { left: -4, top: 2, w: 22 },
  { left: -6, top: 38, w: 25 },
  { left: 2, top: 70, w: 20 },
  { left: 16, top: 14, w: 17 },
  { left: 13, top: 56, w: 19 },
  { left: 80, top: 1, w: 22 },
  { left: 83, top: 36, w: 25 },
  { left: 78, top: 66, w: 20 },
  { left: 66, top: 12, w: 17 },
  { left: 68, top: 55, w: 19 },
];

// Mobile slots: six posters peeking in from the screen edges — above the
// headline and below the card, some partially offscreen (the sticky viewport
// clips them). The centre column (z 5) stays readable on top.
const MOBILE_SLOTS = [
  { left: -18, top: -7, w: 60 },
  { left: 62, top: -2, w: 56 },
  { left: -26, top: 32, w: 54 },
  { left: 76, top: 40, w: 54 },
  { left: -10, top: 80, w: 56 },
  { left: 52, top: 84, w: 60 },
];

// Deterministic hash → [0,1). No Math.random(): the scatter must be identical
// on server and client (SSR) and stable across renders. familyIndex + slot +
// a channel seed derive independent jitter for x, y and rotation.
function hash01(a, b, c) {
  let h = (a * 73856093) ^ (b * 19349663) ^ (c * 83492791);
  h = Math.imul(h ^ (h >>> 13), 0x5bd1e995);
  h = (h ^ (h >>> 15)) >>> 0;
  return (h % 100000) / 100000;
}

// Group EXHIBIT_ITEMS by family once. Order preserved.
function groupItems() {
  const by = {};
  for (const item of EXHIBIT_ITEMS) {
    (by[item.group] ??= []).push(item);
  }
  return by;
}

const microStyle = {
  fontFamily: 'var(--sans)',
  fontWeight: 500,
  fontSize: '10px',
  letterSpacing: '2px',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.42)',
  display: 'block',
};

// ── The app's AddCollectionCard, recreated in HTML. Pure scenography. ────────
function AddCard({ entry, quote, reduce }) {
  return (
    <div className="exh-card" aria-hidden="true">
      {/* Header — cover + type placard + title */}
      <div className="exh-card-head">
        <img
          className="exh-cover"
          src={entry.posterSrc}
          alt=""
          style={{ borderColor: entry.accent }}
          loading="lazy"
        />
        <div className="exh-head-text">
          <div className="exh-title">{entry.title}</div>
        </div>
      </div>

      {/* Note — the family quote rendered as the user's mid-typed note */}
      <div className="exh-field">
        <span style={microStyle}>What does this mean to you?</span>
        <div className="exh-note">
          {quote}
          <span className={`exh-caret ${reduce ? 'is-static' : ''}`} />
        </div>
      </div>

      {/* Tags */}
      <div className="exh-field">
        <span style={microStyle}>Clusters / Tags</span>
        <div className="exh-tags">
          {entry.tags.map((t) => (
            <span className="exh-tag-wrap" key={t}>
              <span className="exh-inktag">{t}</span>
              <span className="exh-tag-x">×</span>
            </span>
          ))}
        </div>
      </div>

      {/* Visibility */}
      <div className="exh-field">
        <span style={microStyle}>Visibility</span>
        <div className="exh-vis">
          <span className="exh-vis-cell is-on">Public</span>
          <span className="exh-vis-cell">Friends</span>
          <span className="exh-vis-cell">Private</span>
        </div>
      </div>

      {/* CTAs */}
      <div className="exh-cta-row">
        <span className="exh-ticket exh-ticket-outline">Cancel</span>
        <span className="exh-ticket exh-ticket-filled">Add to collection</span>
      </div>
    </div>
  );
}

// ── Header — one title, one subheading. The family word is the only thing
// that changes: "Add your favourite <x>", x in mustard italic (the section's
// single ink pop, inherited from the old heading's mustard ghost).
function ExhibitHeader({ reduce, activeGroup }) {
  const word = HEADLINE_WORDS[activeGroup];
  return (
    <motion.header
      className="exh-header"
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
    >
      <h2
        style={{
          fontFamily: 'var(--serif)',
          fontWeight: 400,
          fontSize: 'clamp(2rem, 4.1vw, 3.55rem)',
          lineHeight: 1.08,
          color: INK.paper,
          textWrap: 'balance',
          margin: 0,
          // Crisp ground-colour "stroke" + soft halo: keeps the headline
          // legible when a paper poster drifts underneath it. (text-shadow is
          // inherited, so the swapping <em> gets it too.)
          textShadow:
            '-1.5px 0 0 #0a0a09, 1.5px 0 0 #0a0a09, 0 -1.5px 0 #0a0a09, 0 1.5px 0 #0a0a09, 0 0 22px rgba(10,10,9,0.95), 0 0 48px rgba(10,10,9,0.8)',
        }}
      >
        Add your favourite{' '}
        <AnimatePresence mode="wait" initial={false}>
          <motion.em
            key={word}
            style={{ fontStyle: 'italic', color: INK.paper, display: 'inline-block' }}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduce ? 0.2 : 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.em>
        </AnimatePresence>
      </h2>
      <p className="exh-sub">Save what stayed with you. Say why.</p>
    </motion.header>
  );
}

// Poster stagger container + child variants.
const layerVar = {
  enter: { transition: { staggerChildren: 0.04 } },
  exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
};
const posterVar = {
  initial: { opacity: 0, y: 12, scale: 0.98 },
  enter: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};
const posterVarReduce = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

// One family's worth of floating posters for a given slot set. Shared by the
// desktop scatter and the mobile edge-peek layer.
function PosterLayer({ slots, posters, groupKey, activeIndex, reduce }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={groupKey}
        className="exh-poster-layer"
        variants={layerVar}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {slots.map((slot, i) => {
          const item = posters[i % posters.length];
          if (!item) return null;
          const jx = (hash01(activeIndex, i, 1) - 0.5) * 3;
          const jy = (hash01(activeIndex, i, 2) - 0.5) * 3;
          const rot = (hash01(activeIndex, i, 3) - 0.5) * 6;
          const driftDur = 8 + hash01(activeIndex, i, 4) * 4;
          const driftDelay = hash01(activeIndex, i, 5) * -8;
          return (
            <motion.div
              key={`${groupKey}-${i}`}
              className="exh-poster-slot"
              variants={reduce ? posterVarReduce : posterVar}
              style={{
                left: `${slot.left + jx}%`,
                top: `${slot.top + jy}%`,
                width: `${slot.w}%`,
              }}
            >
              <div
                className="exh-poster-drift"
                style={
                  reduce
                    ? undefined
                    : { animationDuration: `${driftDur}s`, animationDelay: `${driftDelay}s` }
                }
              >
                <div className="exh-poster-mat" style={{ transform: `rotate(${rot}deg)` }}>
                  <div
                    className="exh-poster-img"
                    style={{ aspectRatio: item.wide ? '16 / 10' : '3 / 4' }}
                  >
                    <img src={item.src} alt="" loading="lazy" />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
}

export default function RisoExhibition() {
  const reduce = useReducedMotion();
  const containerRef = useRef(null);
  const [idx, setIdx] = useState(0);
  const families = useMemo(
    () => FAMILY_ORDER.map((group) => ({ group, card: EXHIBIT_CARDS[group] })),
    []
  );
  const grouped = useMemo(() => groupItems(), []);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setIdx(Math.min(families.length - 1, Math.floor(v * families.length)));
  });

  const activeFamily = families[idx] || families[0];
  const activeIndex = families.findIndex((f) => f.group === activeFamily.group);
  const posters = grouped[activeFamily.group] || [];

  return (
    <section
      id="thread"
      className="exhibition-section riso-halftone"
      style={{ background: INK.base, borderTop: `3px solid ${INK.ink}` }}
    >
      <div
        ref={containerRef}
        className="exhibition-scrub"
        style={{ height: `${families.length * 100}svh` }}
      >
        <div className="exhibition-viewport">
          {/* ---------- DESKTOP: floating scatter + centre card ---------- */}
          <div className="exh-stage">
            <PosterLayer
              slots={SLOTS}
              posters={posters}
              groupKey={activeFamily.group}
              activeIndex={activeIndex}
              reduce={reduce}
            />

            {/* Centre column — header + crossfading card */}
            <div className="exh-center">
              <ExhibitHeader reduce={reduce} activeGroup={activeFamily.group} />
              <div className="exh-card-hold">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeFamily.group}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    transition={{ duration: reduce ? 0.2 : 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <AddCard
                      entry={FAMILY_ENTRIES[activeFamily.group]}
                      quote={activeFamily.card.text}
                      reduce={reduce}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* ---------- MOBILE: same scrub, posters peek from the edges ---------- */}
          <div className="exh-stage-m">
            <PosterLayer
              slots={MOBILE_SLOTS}
              posters={posters}
              groupKey={activeFamily.group}
              activeIndex={activeIndex}
              reduce={reduce}
            />
            <div className="exh-center-m">
              <ExhibitHeader reduce={reduce} activeGroup={activeFamily.group} />
              <div className="exh-card-hold">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeFamily.group}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    transition={{ duration: reduce ? 0.2 : 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <AddCard
                      entry={FAMILY_ENTRIES[activeFamily.group]}
                      quote={activeFamily.card.text}
                      reduce={reduce}
                    />
                  </motion.div>
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

        /* ---------- Desktop stage ---------- */
        .exh-stage {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .exh-poster-layer {
          position: absolute;
          inset: 0;
          z-index: 1;
        }
        .exh-poster-slot {
          position: absolute;
          will-change: transform, opacity;
        }
        .exh-poster-drift {
          animation-name: exh-drift;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-direction: alternate;
        }
        /* A slow figure-of-motion: mostly vertical with a small lateral lean so
           the wall feels adrift, never animated-at-you. Long durations +
           alternate direction keep it below the threshold of "noticing". */
        @keyframes exh-drift {
          0%   { transform: translate(-3px, -10px); }
          55%  { transform: translate(2px, 3px); }
          100% { transform: translate(4px, 10px); }
        }
        .exh-poster-mat {
          background: #141312;
          padding: 5px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-sizing: border-box;
        }
        .exh-poster-img {
          width: 100%;
          overflow: hidden;
        }
        .exh-poster-img img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Centre column */
        .exh-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 5;
          width: min(35rem, 94vw);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(1.1rem, 2.4vh, 2rem);
          pointer-events: none;
        }
        .exh-header {
          text-align: center;
          display: grid;
          gap: 0.5rem;
          width: 100%;
        }
        .exh-header h2 {
          margin: 0;
        }
        .exh-sub {
          font-family: var(--sans);
          font-weight: 300;
          font-size: clamp(1.05rem, 1.35vw, 1.2rem);
          line-height: 1.5;
          color: rgba(239, 230, 208, 0.92);
          margin: 0;
          text-shadow: -1px 0 0 #0a0a09, 1px 0 0 #0a0a09, 0 -1px 0 #0a0a09,
            0 1px 0 #0a0a09, 0 0 16px rgba(10, 10, 9, 0.95), 0 0 34px rgba(10, 10, 9, 0.8);
        }
        .exh-card-hold {
          width: 100%;
        }

        /* ---------- The Add-to-collection card ---------- */
        .exh-card {
          background: #0f0f0e;
          width: 100%;
          border: 1px solid rgba(255, 255, 255, 0.16);
          padding: 32px;
          box-sizing: border-box;
          pointer-events: none;
        }
        .exh-card-head {
          display: flex;
          gap: 20px;
          margin-bottom: 32px;
          align-items: flex-start;
        }
        .exh-cover {
          width: 76px;
          height: 76px;
          flex-shrink: 0;
          border-width: 2px;
          border-style: solid;
          object-fit: cover;
          display: block;
        }
        .exh-head-text {
          flex: 1;
          min-width: 0;
        }
        .exh-title {
          font-family: var(--serif);
          font-weight: 300;
          font-size: 28px;
          line-height: 34px;
          color: rgba(255, 255, 255, 0.92);
        }
        .exh-field {
          margin-bottom: 28px;
        }
        .exh-note {
          font-family: var(--sans);
          font-weight: 400;
          font-size: 16px;
          line-height: 27px;
          color: rgba(255, 255, 255, 0.88);
          border-bottom: 0.5px solid rgba(255, 255, 255, 0.22);
          padding-top: 8px;
          padding-bottom: 12px;
          min-height: 84px;
        }
        .exh-caret {
          display: inline-block;
          width: 1px;
          height: 1.1em;
          margin-left: 2px;
          vertical-align: text-bottom;
          background: ${INK.paper};
          animation: exh-blink 1.1s steps(2, start) infinite;
        }
        .exh-caret.is-static {
          display: none;
        }
        @keyframes exh-blink {
          0%, 50% { opacity: 1; }
          50.01%, 100% { opacity: 0; }
        }
        .exh-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 10px;
        }
        .exh-tag-wrap {
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }
        .exh-inktag {
          border: 1px solid rgba(239, 230, 208, 0.55);
          color: rgba(239, 230, 208, 0.9);
          font-family: var(--sans);
          font-weight: 500;
          font-size: 10px;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          padding: 3px 8px;
        }
        .exh-tag-x {
          font-size: 15px;
          line-height: 17px;
          color: rgba(255, 255, 255, 0.45);
        }
        .exh-vis {
          display: flex;
          margin-top: 10px;
        }
        .exh-vis-cell {
          flex: 1;
          border: 0.5px solid rgba(255, 255, 255, 0.15);
          padding: 12px 0;
          text-align: center;
          font-family: var(--sans);
          font-weight: 500;
          font-size: 11px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.5);
        }
        .exh-vis-cell + .exh-vis-cell {
          margin-left: -0.5px;
        }
        .exh-vis-cell.is-on {
          background: ${INK.paper};
          border-color: ${INK.paper};
          color: #111;
        }
        .exh-cta-row {
          border-top: 0.5px solid rgba(255, 255, 255, 0.1);
          padding-top: 20px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 12px;
        }
        .exh-ticket {
          font-family: var(--sans);
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 12px 26px;
        }
        .exh-ticket-outline {
          border: 1px solid rgba(239, 230, 208, 0.45);
          color: rgba(239, 230, 208, 0.7);
          font-weight: 500;
        }
        .exh-ticket-filled {
          background: ${INK.paper};
          color: #111;
          font-weight: 700;
        }

        /* ---------- Mobile: same scrub, edge-peek posters ---------- */
        .exh-stage-m {
          display: none;
        }

        @media (max-width: 860px) {
          .exh-stage {
            display: none;
          }
          .exh-stage-m {
            display: block;
            position: relative;
            width: 100%;
            height: 100%;
          }
          .exh-center-m {
            position: absolute;
            inset: 0;
            z-index: 5;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: clamp(0.9rem, 2.5vh, 1.4rem);
            padding: 0 clamp(14px, 4vw, 24px);
            pointer-events: none;
          }
          .exh-header {
            text-align: left;
          }
          .exh-header h2 {
            font-size: clamp(1.7rem, 7.5vw, 2.25rem) !important;
          }
          .exh-sub {
            font-size: clamp(0.9rem, 3.6vw, 1rem);
          }
          .exh-card-hold {
            max-width: 560px;
          }
          /* Compact card scale so header + card fit one phone viewport */
          .exh-card {
            padding: 20px;
          }
          .exh-cover {
            width: 60px;
            height: 60px;
          }
          .exh-title {
            font-size: 23px;
            line-height: 28px;
          }
          .exh-card-head {
            gap: 14px;
            margin-bottom: 20px;
          }
          .exh-field {
            margin-bottom: 18px;
          }
          .exh-note {
            font-size: 15px;
            line-height: 24px;
            min-height: 0;
          }
          .exh-ticket {
            font-size: 11px;
            padding: 10px 20px;
          }
        }
        /* Very short phones: shed the subheading so the card never clips */
        @media (max-width: 860px) and (max-height: 660px) {
          .exh-sub {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
