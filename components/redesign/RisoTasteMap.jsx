'use client';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { INK, eyebrowStyle } from './shared';

// ---------------------------------------------------------------------------
// THE TASTE MAP — one compact dark band. Left: the section's whole story in a
// single column (Your Map → heading → sub → rule → the share pitch). Right: a
// pure HTML/CSS phone whose screen PLAYS the map film — a portrait cut of the
// real Three.js dark map (scripts/record-tastemap.mjs with PORTRAIT=1). The
// map is alive, and it lives at a link: one artifact does both jobs.
//
// Ground: INK.base + riso-halftone. Dim covers scatter behind via the
// exhibition's deterministic slot + hash01 pattern (no Math.random).
// ---------------------------------------------------------------------------

const FILM_SRC = '/assets/redesign/tastemap-merge-phone.mp4';
const FILM_POSTER = '/assets/redesign/tastemap-merge-phone-poster.webp';
const POSTER_DIR = '/assets/redesign/posters';

// Eight scatter slots hugging the section edges (left-anchor + width, both in
// %). Kept to the flanks + top/bottom bands so the centred band stays clear;
// partially offscreen edges welcome.
const SCATTER = [
  { poster: 'eternal-sunshine', left: -5, top: 3, w: 15 },
  { poster: 'wish-you-were-here', left: -6, top: 50, w: 17 },
  { poster: 'spirited-away', left: 4, top: 84, w: 14 },
  { poster: 'up', left: 19, top: -9, w: 13 },
  { poster: 'graduation', left: 83, top: 1, w: 16 },
  { poster: 'currents', left: 88, top: 42, w: 17 },
  { poster: 'la-la-land', left: 80, top: 80, w: 15 },
  { poster: 'the-godfather', left: 41, top: 88, w: 13 },
];

// Deterministic hash → [0,1). No Math.random(): scatter must be identical on
// server and client and stable across renders.
function hash01(a, b, c) {
  let h = (a * 73856093) ^ (b * 19349663) ^ (c * 83492791);
  h = Math.imul(h ^ (h >>> 13), 0x5bd1e995);
  h = (h ^ (h >>> 15)) >>> 0;
  return (h % 100000) / 100000;
}

// Exhibition's shadow-stroke + halo treatment, copied verbatim so the header
// stays legible over the dim posters behind it.
const H2_SHADOW =
  '0 -1px 0 #0a0a09, 0.7px -0.7px 0 #0a0a09, 1px 0 0 #0a0a09, 0.7px 0.7px 0 #0a0a09, 0 1px 0 #0a0a09, -0.7px 0.7px 0 #0a0a09, -1px 0 0 #0a0a09, -0.7px -0.7px 0 #0a0a09, 0 -2px 0 #0a0a09, 1.4px -1.4px 0 #0a0a09, 2px 0 0 #0a0a09, 1.4px 1.4px 0 #0a0a09, 0 2px 0 #0a0a09, -1.4px 1.4px 0 #0a0a09, -2px 0 0 #0a0a09, -1.4px -1.4px 0 #0a0a09, 0 0 6px rgba(10,10,9,1), 0 0 16px rgba(10,10,9,0.95), 0 2px 28px rgba(10,10,9,0.9), 0 0 56px rgba(10,10,9,0.75)';
const SUB_SHADOW =
  '0 -1px 0 #0a0a09, 0.7px -0.7px 0 #0a0a09, 1px 0 0 #0a0a09, 0.7px 0.7px 0 #0a0a09, 0 1px 0 #0a0a09, -0.7px 0.7px 0 #0a0a09, -1px 0 0 #0a0a09, -0.7px -0.7px 0 #0a0a09, 0 -1.5px 0 #0a0a09, 1.06px -1.06px 0 #0a0a09, 1.5px 0 0 #0a0a09, 1.06px 1.06px 0 #0a0a09, 0 1.5px 0 #0a0a09, -1.06px 1.06px 0 #0a0a09, -1.5px 0 0 #0a0a09, -1.06px -1.06px 0 #0a0a09, 0 0 5px rgba(10,10,9,1), 0 0 13px rgba(10,10,9,0.95), 0 1px 24px rgba(10,10,9,0.9), 0 0 44px rgba(10,10,9,0.72)';

// ── The shared profile phone — its screen plays the map film. ────────────────
// Play-once-and-hold on the merged constellation (the money shot doubles as
// the "profile"). React SSR drops the muted attribute, so the muted property
// is set directly with a canplay retry; reduced-motion stays on the poster.
function ProfilePhone() {
  const holder = useRef(null);
  const videoRef = useRef(null);
  const endedRef = useRef(false);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setMotionAllowed(!media.matches);
    sync();
    media.addEventListener?.('change', sync);
    return () => media.removeEventListener?.('change', sync);
  }, []);

  // Start the film only once the phone scrolls into view.
  useEffect(() => {
    const el = holder.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !motionAllowed || !inView) return undefined;
    const play = () => {
      if (endedRef.current) return; // hold the final frame; don't auto-restart
      if (document.visibilityState !== 'visible') {
        el.pause();
        return;
      }
      el.muted = true;
      el.defaultMuted = true;
      el.play()?.catch(() => {});
    };
    const onEnded = () => {
      endedRef.current = true;
    };
    el.load();
    play();
    el.addEventListener('canplay', play);
    el.addEventListener('ended', onEnded);
    document.addEventListener('visibilitychange', play);
    return () => {
      el.removeEventListener('canplay', play);
      el.removeEventListener('ended', onEnded);
      document.removeEventListener('visibilitychange', play);
    };
  }, [motionAllowed, inView]);

  return (
    <motion.div
      ref={holder}
      className="tm-phone-float"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="tm-phone"
        role="img"
        aria-label="A phone at thefourthplace.me/john playing John's taste map: a constellation of covers merging to what he shares"
      >
        <div className="tm-notch" aria-hidden="true" />
        <div className="tm-screen" aria-hidden="true">
          {/* Browser chrome */}
          <div className="tm-url">
            <span className="tm-url-lock">◌</span>
            <span className="tm-url-text">thefourthplace.me/john</span>
            <span className="tm-url-x">×</span>
          </div>

          {/* The map, alive, on the phone */}
          <div className="tm-film">
            <video
              ref={videoRef}
              muted
              playsInline
              preload="metadata"
              poster={FILM_POSTER}
            >
              {motionAllowed && inView ? <source src={FILM_SRC} type="video/mp4" /> : null}
            </video>
          </div>

          {/* Stats */}
          <div className="tm-stats">
            <div className="tm-stat">
              <span className="tm-stat-n">42</span>
              <span className="tm-stat-l">Books</span>
            </div>
            <div className="tm-stat">
              <span className="tm-stat-n">31</span>
              <span className="tm-stat-l">Albums</span>
            </div>
            <div className="tm-stat">
              <span className="tm-stat-n">28</span>
              <span className="tm-stat-l">Films</span>
            </div>
          </div>

          {/* CTA */}
          <div className="tm-view">View full map</div>

          {/* Footer */}
          <div className="tm-foot">
            <span className="tm-foot-made">Made with</span>
            <span className="tm-foot-brand">The Fourth Place</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function RisoTasteMap() {
  return (
    <section
      id="tastemap"
      className="riso-halftone"
      style={{
        position: 'relative',
        background: INK.base,
        padding: 'clamp(64px, 9vw, 130px) clamp(20px, 5vw, 60px)',
        overflow: 'hidden',
      }}
    >
      {/* Single relative shell so the halftone `>*` z-index rule applies once;
          scatter + content are stacked inside it. */}
      <div style={{ position: 'relative' }}>
        {/* Dim scattered covers behind everything. */}
        <div className="tm-scatter" aria-hidden="true">
          {SCATTER.map((s, i) => {
            const rot = (hash01(i, 1, 3) - 0.5) * 7;
            const op = 0.28 + hash01(i, 2, 5) * 0.07;
            return (
              <div
                key={s.poster}
                className="tm-scatter-slot"
                style={{ left: `${s.left}%`, top: `${s.top}%`, width: `${s.w}%`, opacity: op }}
              >
                <div className="tm-scatter-mat" style={{ transform: `rotate(${rot}deg)` }}>
                  <img src={`${POSTER_DIR}/${s.poster}.webp`} alt="" loading="lazy" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="tm-content">
          {/* One band: the whole story left, the film-playing phone right. */}
          <div className="tm-share">
            <motion.div
              className="tm-share-text"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{ ...eyebrowStyle('rgba(239,230,208,0.6)'), marginBottom: '1rem' }}>
                Your Map
              </div>
              <h2
                style={{
                  fontFamily: 'var(--serif)',
                  fontWeight: 400,
                  fontSize: 'clamp(2rem, 3.9vw, 3.4rem)',
                  lineHeight: 1.08,
                  color: INK.paper,
                  textWrap: 'balance',
                  margin: '0 0 0.8rem',
                  textShadow: H2_SHADOW,
                }}
              >
                What goes <em style={{ fontStyle: 'italic' }}>on your map.</em>
              </h2>
              <p
                style={{
                  fontFamily: 'var(--sans)',
                  fontWeight: 300,
                  fontSize: 'clamp(1.02rem, 1.4vw, 1.2rem)',
                  lineHeight: 1.5,
                  color: 'rgba(239,230,208,0.85)',
                  margin: 0,
                  textShadow: SUB_SHADOW,
                }}
              >
                Watch unexpected connections appear.
              </p>

              <div className="tm-rule" aria-hidden="true" />

              <h3
                style={{
                  fontFamily: 'var(--serif)',
                  fontWeight: 400,
                  fontSize: 'clamp(1.7rem, 2.9vw, 2.5rem)',
                  lineHeight: 1.1,
                  color: INK.paper,
                  margin: '0 0 1.1rem',
                  textShadow: H2_SHADOW,
                }}
              >
                One link. <br />
                <em style={{ fontStyle: 'italic' }}>Every story.</em>
              </h3>
              <p
                style={{
                  fontFamily: 'var(--sans)',
                  fontWeight: 300,
                  fontSize: 'clamp(1rem, 1.3vw, 1.12rem)',
                  lineHeight: 1.8,
                  color: 'rgba(239,230,208,0.8)',
                  margin: 0,
                  textShadow: SUB_SHADOW,
                }}
              >
                Drop it in your bio.
                <br />
                Send it to a friend.
                <br />
                Your map, everywhere.
              </p>
            </motion.div>

            <ProfilePhone />
          </div>
        </div>
      </div>

      <style jsx global>{`
        #tastemap .tm-scatter {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          filter: blur(7px);
        }
        #tastemap .tm-scatter-slot {
          position: absolute;
        }
        #tastemap .tm-scatter-mat {
          background: #141312;
          padding: 5px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-sizing: border-box;
        }
        #tastemap .tm-scatter-mat img {
          display: block;
          width: 100%;
          height: auto;
          filter: saturate(0.85) brightness(0.85);
        }
        #tastemap .tm-content {
          position: relative;
          z-index: 2;
          max-width: 1080px;
          margin: 0 auto;
        }

        /* ---------- The band ---------- */
        #tastemap .tm-share {
          display: grid;
          grid-template-columns: 1fr min(21rem, 80vw);
          gap: clamp(2.5rem, 7vw, 6.5rem);
          align-items: center;
        }
        #tastemap .tm-share-text {
          max-width: 32rem;
        }
        #tastemap .tm-rule {
          width: 2.5rem;
          height: 3px;
          background: #2b3fb8;
          margin: clamp(1.6rem, 3.2vw, 2.6rem) 0 1.4rem;
        }

        /* ---------- Phone mockup ---------- */
        #tastemap .tm-phone-float {
          display: flex;
          justify-content: center;
          animation: tm-phone-bob 7s ease-in-out infinite alternate;
        }
        @keyframes tm-phone-bob {
          from {
            transform: translateY(-5px);
          }
          to {
            transform: translateY(5px);
          }
        }
        #tastemap .tm-phone {
          position: relative;
          width: min(21rem, 80vw);
          aspect-ratio: 9 / 19;
          background: #050505;
          border: 2px solid rgba(255, 255, 255, 0.18);
          border-radius: 2.2rem;
          padding: 0.55rem;
          box-sizing: border-box;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
        }
        #tastemap .tm-notch {
          position: absolute;
          top: 0.8rem;
          left: 50%;
          transform: translateX(-50%);
          width: 32%;
          height: 5px;
          background: rgba(255, 255, 255, 0.14);
          border-radius: 3px;
          z-index: 2;
        }
        #tastemap .tm-screen {
          width: 100%;
          height: 100%;
          background: #0f0f0e;
          border-radius: 1.7rem;
          overflow: hidden;
          padding: 1.5rem 0.9rem 1rem;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
        }
        #tastemap .tm-url {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          background: #050505;
          border: 0.5px solid rgba(255, 255, 255, 0.08);
          padding: 5px 8px;
          margin-bottom: 0.8rem;
          flex-shrink: 0;
        }
        #tastemap .tm-url-lock,
        #tastemap .tm-url-x {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.35);
        }
        #tastemap .tm-url-text {
          font-family: var(--mono, ui-monospace, SFMono-Regular, Menlo, monospace);
          font-size: 11px;
          color: rgba(255, 255, 255, 0.6);
        }
        /* The film fills whatever height the screen has left; the portrait cut
           carries its own dark margins so cover-cropping is safe. */
        #tastemap .tm-film {
          flex: 1 1 auto;
          min-height: 0;
          margin-bottom: 0.8rem;
          background: #0a0a09;
          overflow: hidden;
        }
        #tastemap .tm-film video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        #tastemap .tm-stats {
          display: flex;
          border-top: 0.5px solid rgba(255, 255, 255, 0.12);
          border-bottom: 0.5px solid rgba(255, 255, 255, 0.12);
          margin-bottom: 0.8rem;
          flex-shrink: 0;
        }
        #tastemap .tm-stat {
          flex: 1;
          text-align: center;
          padding: 0.55rem 0;
        }
        #tastemap .tm-stat + .tm-stat {
          border-left: 0.5px solid rgba(255, 255, 255, 0.12);
        }
        #tastemap .tm-stat-n {
          display: block;
          font-family: var(--serif);
          font-size: 17px;
          color: rgba(239, 230, 208, 0.9);
          line-height: 1.1;
        }
        #tastemap .tm-stat-l {
          display: block;
          font-family: var(--sans);
          font-weight: 500;
          font-size: 8px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.4);
          margin-top: 0.25rem;
        }
        #tastemap .tm-view {
          border: 1px solid rgba(239, 230, 208, 0.5);
          color: rgba(239, 230, 208, 0.85);
          font-family: var(--sans);
          font-weight: 500;
          font-size: 10px;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          text-align: center;
          padding: 8px 0;
          pointer-events: none;
          flex-shrink: 0;
        }
        #tastemap .tm-foot {
          padding-top: 0.7rem;
          text-align: center;
          flex-shrink: 0;
        }
        #tastemap .tm-foot-made {
          font-family: var(--sans);
          font-size: 9px;
          color: rgba(255, 255, 255, 0.35);
          margin-right: 0.35rem;
        }
        #tastemap .tm-foot-brand {
          font-family: var(--serif);
          font-style: italic;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
        }

        /* ---------- Mobile ---------- */
        @media (max-width: 860px) {
          #tastemap .tm-share {
            grid-template-columns: 1fr;
            justify-items: center;
            text-align: center;
          }
          #tastemap .tm-share-text {
            max-width: 32rem;
          }
          #tastemap .tm-rule {
            margin-left: auto;
            margin-right: auto;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          #tastemap .tm-phone-float {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
