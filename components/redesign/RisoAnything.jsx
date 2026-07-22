'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { INK } from './shared';

// ---------------------------------------------------------------------------
// "and Literally Anything" — the Exhibition's coda. Left column: the punchline
// text with the torn-link burst artwork tucked beneath it. Right column: a
// self-shuffling DECK of real internet fragments (X posts, subreddits,
// Instagram profiles, Medium articles, Wikipedia articles) that auto-rotates
// forever on a timer.
//
// Advance mechanic — the WHOLE stack moves as one on every tick, never just
// the front. Four cards are rendered at once (front + three peeks); each is
// keyed by its own src (identity, never index) and animates to the style of
// whatever depth it now occupies. On advance framer-motion tweens every card
// between depths simultaneously: peek1 glides into the front slot, peek2 into
// peek1, peek3 into peek2, a fresh card rises in at the back, and the outgoing
// front lifts up-and-off. AnimatePresence handles only that entering back card
// and exiting front; the middle cards are pure re-targets. Nothing snaps.
//
// Cards keep rounded corners (the site's one sharp-corner exception). Honors
// prefers-reduced-motion: static stack, no cycling.
// ---------------------------------------------------------------------------

const STACK = '/assets/redesign/anything-stack';

// Interleaved (round-robin X → reddit → instagram → medium → wikipedia, one card
// each per pass) so the deck never shows a run of the same platform — any four
// consecutive cards (the front + three peeks) are all different platforms. Five
// platforms × three cards each = a perfectly even cycle. A flat index walks this.
const CARDS = [
  { platform: 'x',         src: `${STACK}/tweet-sama.webp`,        alt: 'A post on X by Sam Altman' },
  { platform: 'reddit',    src: `${STACK}/reddit-lsd.webp`,        alt: 'The r/LSD subreddit' },
  { platform: 'instagram', src: `${STACK}/ig-profile-bojack.webp`, alt: 'An Instagram profile' },
  { platform: 'medium',    src: `${STACK}/medium-1.webp`,          alt: 'A Medium article' },
  { platform: 'wikipedia', src: `${STACK}/wiki-karlatos.webp`,     alt: 'A Wikipedia article' },
  { platform: 'x',         src: `${STACK}/tweet-trump.webp`,       alt: 'A post on X by Donald J. Trump' },
  { platform: 'reddit',    src: `${STACK}/reddit-wsb.webp`,        alt: 'The r/wallstreetbets subreddit' },
  { platform: 'instagram', src: `${STACK}/ig-profile-priya.webp`,  alt: 'An Instagram profile' },
  { platform: 'medium',    src: `${STACK}/medium-2.webp`,          alt: 'A Medium article' },
  { platform: 'wikipedia', src: `${STACK}/wiki-obersalzberg.webp`, alt: 'A Wikipedia article' },
  { platform: 'x',         src: `${STACK}/tweet-salman.webp`,      alt: 'A post on X by Salman Khan' },
  { platform: 'reddit',    src: `${STACK}/reddit-askreddit.webp`,  alt: 'The r/AskReddit subreddit' },
  { platform: 'instagram', src: `${STACK}/ig-profile-satvik.webp`, alt: 'An Instagram profile' },
  { platform: 'medium',    src: `${STACK}/medium-3.webp`,          alt: 'A Medium article' },
  { platform: 'wikipedia', src: `${STACK}/wiki-nomouth.webp`,      alt: 'A Wikipedia article' },
];

const N = CARDS.length;
const DEPTHS = 4; // front + 3 peeks rendered at once — a deep stack reads as "more items".

// Position style per depth. Peeks recede DOWN-and-behind with alternating tilt;
// the front sits flush. Transforms + opacity only (compositor-friendly); depth
// dimming is a separate opacity-animated scrim (SHADE), never a `filter`, so the
// GPU never has to repaint mid-glide. zIndex is applied as a discrete step.
const POS = [
  { y: 0,  x: 0,   scale: 1,     rotate: 0,    opacity: 1, zIndex: 40 }, // 0 front
  { y: 22, x: 16,  scale: 0.955, rotate: 1.9,  opacity: 1, zIndex: 30 }, // 1 peek
  { y: 42, x: -14, scale: 0.912, rotate: -1.7, opacity: 1, zIndex: 20 }, // 2 peek
  { y: 60, x: 10,  scale: 0.872, rotate: 1.3,  opacity: 1, zIndex: 10 }, // 3 peek (newest)
];
const SHADE = [0, 0.05, 0.11, 0.17]; // deeper cards sit a touch darker.

// Where a rising card starts (just below/behind the deepest peek) and where the
// outgoing front lifts off to. Both are pure transforms + opacity.
const POS_ENTER = { y: 78, x: -8, scale: 0.84, rotate: -1,  opacity: 0, zIndex: 5 };
const POS_EXIT  = { y: -78, x: 4, scale: 1.03, rotate: -4, opacity: 0, zIndex: 50 };

// One spring for every card so the whole stack shares a single physical feel.
// stiffness/damping tuned near-critical (little overshoot) — physical but calm.
const SPRING = { type: 'spring', stiffness: 200, damping: 26, mass: 0.9 };

// Per-platform dwell: dense reading (tweets, wiki, articles) lingers; a reddit
// banner is a glance. Feels better than a flat interval — the deck breathes with
// how much there actually is to read. All inside the 2.5–3.9s band.
const DWELL = { x: 3800, reddit: 2600, instagram: 3100, medium: 3200, wikipedia: 3400 };
const BASE_DWELL = 3200;
const HIDDEN_RECHECK = 700; // while the tab is hidden, re-check softly instead of advancing.

export default function RisoAnything() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);

  // Timer-driven advance (NOT scroll). A self-scheduling loop rather than a flat
  // interval, so each card can dwell for its own platform's reading time. SSR-safe
  // (lives only in the effect); paused when the tab is hidden; fully disabled under
  // reduced motion.
  useEffect(() => {
    if (reduce) return undefined;
    let cancelled = false;
    let timer;
    const arm = (i) => {
      const delay = DWELL[CARDS[i].platform] || BASE_DWELL;
      timer = setTimeout(tick, delay, i);
    };
    const tick = (i) => {
      if (cancelled) return;
      if (typeof document !== 'undefined' && document.hidden) {
        timer = setTimeout(tick, HIDDEN_RECHECK, i);
        return;
      }
      const next = (i + 1) % N;
      setIndex(next);
      arm(next);
    };
    arm(indexRef.current);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [reduce]);

  // Pre-decode the two cards about to enter (index+3 is mounting at the back,
  // index+4 is next) so nothing rasterizes mid-animation. Client-only.
  useEffect(() => {
    indexRef.current = index;
    if (typeof window === 'undefined') return;
    for (let d = DEPTHS - 1; d <= DEPTHS; d += 1) {
      const img = new window.Image();
      img.src = CARDS[(index + d) % N].src;
      if (img.decode) img.decode().catch(() => {});
    }
  }, [index]);

  const shown = reduce ? 3 : DEPTHS;
  const visible = [];
  for (let d = 0; d < shown; d += 1) {
    visible.push({ card: CARDS[(index + d) % N], depth: d });
  }

  return (
    <section className="riso-halftone" style={{ background: INK.base }}>
      <div className="anyt-band">
        {/* LEFT — text + burst beneath it */}
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
          <img
            className="anyt-art"
            src="/assets/redesign/anything-burst.png"
            alt="Instagram, Reddit, X, Substack, Medium and Wikipedia badges bursting out of a torn paper link bar"
            loading="lazy"
          />
        </motion.div>

        {/* RIGHT — self-shuffling deck of real internet fragments */}
        <motion.div
          className="anyt-deckwrap"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="anyt-deck" aria-hidden="true">
            {reduce ? (
              // Static stack — no timer, no motion. Just the top three cards
              // frozen at their depths.
              visible.map(({ card, depth }) => (
                <div
                  key={card.src}
                  className="anyt-layer"
                  style={{
                    zIndex: POS[depth].zIndex,
                    transform: `translate(${POS[depth].x}px, ${POS[depth].y}px) rotate(${POS[depth].rotate}deg) scale(${POS[depth].scale})`,
                  }}
                >
                  <div className="anyt-frame">
                    <img src={card.src} alt="" loading="lazy" />
                    <div className="anyt-shade" style={{ opacity: SHADE[depth] }} />
                  </div>
                </div>
              ))
            ) : (
              <AnimatePresence initial={false}>
                {visible.map(({ card, depth }) => (
                  <motion.div
                    key={card.src}
                    className="anyt-layer"
                    initial={POS_ENTER}
                    animate={POS[depth]}
                    exit={POS_EXIT}
                    transition={SPRING}
                  >
                    <div className="anyt-frame">
                      <img src={card.src} alt="" />
                      <motion.div
                        className="anyt-shade"
                        animate={{ opacity: SHADE[depth] }}
                        transition={SPRING}
                      />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        .anyt-band {
          position: relative;
          max-width: 1400px;
          margin: 0 auto;
          min-height: 58vh;
          max-height: 68vh;
          display: flex;
          align-items: center;
          gap: clamp(1.5rem, 5vw, 4.5rem);
          padding: clamp(2rem, 5vh, 3.5rem) clamp(20px, 5vw, 60px);
          box-sizing: border-box;
        }
        .anyt-text {
          flex: 0 0 auto;
          max-width: 32rem;
          display: flex;
          flex-direction: column;
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
          margin-top: clamp(1.4rem, 3vh, 2.2rem);
          max-width: min(24rem, 100%);
          max-height: 24vh;
          height: auto;
          object-fit: contain;
          object-position: left center;
          display: block;
        }

        /* ── Deck ──
           A fixed-size stage that only sets the vertical centre line and reserves
           layout height. Each card keeps its OWN native aspect ratio (reddit
           banners stay short strips, IG profiles stay tall) — the frame is width:
           100% of the deck, height:auto from the image. Cards are vertically
           centred, so the (intended) height differences read as symmetric growth/
           shrink about the middle rather than a lurch, and each card's own size is
           constant as it moves — only translate/scale/rotate/opacity animate. */
        .anyt-deckwrap {
          flex: 1 1 auto;
          min-width: 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .anyt-deck {
          position: relative;
          width: min(33rem, 100%);
          height: clamp(19rem, 32vh, 23rem);
        }
        .anyt-layer {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transform-origin: center center;
          will-change: transform, opacity;
          backface-visibility: hidden;
        }
        .anyt-frame {
          position: relative;
          width: 100%;
          border-radius: 12px; /* deliberate exception to the sharp-corner rule */
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.14);
          box-shadow: 0 22px 55px -16px rgba(0, 0, 0, 0.6);
          background: #fff;
        }
        .anyt-frame img {
          display: block;
          width: 100%;
          height: auto;
        }
        .anyt-shade {
          position: absolute;
          inset: 0;
          background: #0b0a09;
          pointer-events: none;
          will-change: opacity;
        }

        @media (max-width: 860px) {
          .anyt-band {
            min-height: 0;
            max-height: none;
            flex-direction: column;
            align-items: stretch;
            gap: clamp(1.6rem, 6vw, 2.4rem);
            padding: clamp(1.8rem, 7vw, 2.6rem) clamp(16px, 5vw, 28px) clamp(2rem, 8vw, 3rem);
          }
          .anyt-text {
            max-width: none;
            align-items: flex-start;
          }
          .anyt-art {
            max-height: 20vh;
          }
          .anyt-deckwrap {
            width: 100%;
            padding-bottom: 3rem; /* room for the peeks that poke below the front */
          }
          .anyt-deck {
            width: 100%;
            max-width: 30rem;
            margin: 0 auto;
            height: clamp(17rem, 60vw, 22rem);
          }
        }
      `}</style>
    </section>
  );
}
