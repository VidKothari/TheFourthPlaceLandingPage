'use client';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { INK, cutout, eyebrowStyle } from './shared';
import InkSettleHeading from './InkSettle';
import AutoplayLoopVideo from './AutoplayLoopVideo';

// The taste map is now a recorded clip of the real Three.js scene (see
// scripts/record-tastemap.mjs + public/tastemap-preview-riso.html?record=1):
// the camera floats over the full constellation, then the shared tastes fly to
// the centre and hold. It plays once when the section scrolls into view and
// freezes on that final "what you share is the picture" frame — the poster.
// Reduced-motion visitors stay on the poster and never fetch the video.
function TasteMapFilm() {
  const holder = useRef(null);
  const videoRef = useRef(null);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setMotionAllowed(!media.matches);
    sync();
    media.addEventListener?.('change', sync);
    return () => media.removeEventListener?.('change', sync);
  }, []);

  // Only start the film once the map scrolls into view (not on page load).
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
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Play-once-and-hold. React SSR drops the muted attribute, so set the muted
  // property directly and retry on canplay; pause when the tab is hidden.
  useEffect(() => {
    const el = videoRef.current;
    if (!el || !motionAllowed || !inView) return undefined;
    const play = () => {
      if (document.visibilityState !== 'visible') {
        el.pause();
        return;
      }
      el.muted = true;
      el.defaultMuted = true;
      el.play()?.catch(() => {});
    };
    el.load();
    play();
    el.addEventListener('canplay', play);
    document.addEventListener('visibilitychange', play);
    return () => {
      el.removeEventListener('canplay', play);
      document.removeEventListener('visibilitychange', play);
    };
  }, [motionAllowed, inView]);

  return (
    <div
      ref={holder}
      className="tastemap-frame"
      style={{
        position: 'relative',
        width: '100%',
        height: 'min(88vh, 820px)',
        overflow: 'hidden',
        background: INK.ink,
      }}
    >
      <video
        ref={videoRef}
        muted
        playsInline
        preload="metadata"
        poster="/assets/redesign/tastemap-merge-poster.webp"
        aria-label="John and Jane's taste maps drift as a constellation, then the posters they both love gather to the centre as one shared picture"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      >
        {motionAllowed && inView ? (
          <source src="/assets/redesign/tastemap-merge.mp4" type="video/mp4" />
        ) : null}
      </video>
    </div>
  );
}

export default function RisoTasteMap({ eyesTile }) {
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
      <Image
        aria-hidden="true"
        src="/assets/redesign/map-newsprint.webp"
        alt=""
        fill
        sizes="100vw"
        quality={45}
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: 0.22,
          pointerEvents: 'none',
        }}
      />

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
              This fictional demo belongs to John and Jane. Their maps drift as one
              constellation, then the films, albums, and books they{' '}
              <em style={{ fontStyle: 'italic' }}>both</em> love gather to the
              center — exactly what they share.
            </p>
          </div>

          {eyesTile && (
            <Image
              src="/assets/redesign/eyes-grid.webp"
              alt="Four eyes printed in four different acid colorways"
              width={1000}
              height={1000}
              sizes="clamp(7rem, 12vw, 10.5rem)"
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
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-5%' }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ border: `3px solid ${INK.ink}`, boxShadow: '12px 12px 0 rgba(22,19,16,0.28)', background: INK.paperDeep }}
        >
          <TasteMapFilm />
          <div style={{
            display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexWrap: 'wrap', gap: '0.6rem',
            borderTop: `3px solid ${INK.ink}`, padding: '0.85rem 1.1rem', background: INK.paper,
          }}>
            <span style={{
              fontFamily: 'var(--serif)', fontStyle: 'italic',
              fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)', color: INK.ink,
            }}>
              What you share is the picture.
            </span>
          </div>
        </motion.div>

        {/* The share card: your map travels. Paper object; cobalt demoted to stamp + rule. */}
        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-5%' }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: INK.paper,
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
          <div style={{ borderTop: `3px solid ${INK.cobalt}`, paddingTop: '1.1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.6rem' }}>
              <span aria-hidden="true" style={{ width: '7px', height: '7px', background: INK.cobalt, flexShrink: 0 }} />
              <h3 style={{
                fontFamily: 'var(--serif)', fontWeight: 400,
                fontSize: 'clamp(1.4rem, 2vw, 1.8rem)', lineHeight: 1.2,
                color: INK.ink, fontStyle: 'italic',
              }}>
                Your map travels.
              </h3>
            </div>
            <p style={{
              fontFamily: 'var(--sans)', fontWeight: 300,
              fontSize: '0.95rem', lineHeight: 1.65,
              color: 'rgba(22,19,16,0.78)',
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
