/* eslint-disable react/no-unescaped-entities */
'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { INK } from './shared';
import InkSettleHeading from './InkSettle';

const clips = [
  {
    src: 'add-flow-loop',
    num: '01',
    title: 'Keep',
    caption: 'Add the things that moved you. Write what they did to you, not what you think of them. They become your map.',
  },
  {
    // Reverted to the original clip July 16 — the riso re-render wasn't good enough to ship.
    src: 'in-common-loop',
    num: '02',
    title: 'Meet',
    caption: 'When someone’s collection overlaps yours, you see exactly what you share — weighted by rarity, not popularity.',
  },
  {
    src: 'tastemap-riso-loop',
    num: '03',
    title: 'Merge',
    caption: 'Your collection becomes a constellation. Lay it over someone else’s, and what you share glows gold.',
  },
  {
    src: 'recs-loop',
    num: '04',
    title: 'Pass it on',
    caption: 'Recommend something to a specific friend — and get a quiet note when it lands on their map.',
  },
];

function PosterClip({ clip, index }) {
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
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.9, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: INK.paper,
        border: `3px solid ${INK.ink}`,
        boxShadow: '9px 9px 0 rgba(22,19,16,0.3)',
        padding: 'clamp(0.9rem, 1.6vw, 1.4rem)',
        transform: `rotate(${index % 2 === 0 ? -0.7 : 0.8}deg)`,
        marginTop: index % 2 === 1 ? 'clamp(0px, 4vw, 56px)' : 0,
      }}
    >
      <div style={{ border: `2px solid ${INK.ink}`, overflow: 'hidden' }}>
        {/* Kept dead simple on purpose: always autoplaying, no observers. */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={`/assets/demos/${clip.src}-poster.jpg`}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        >
          <source src={`/assets/demos/${clip.src}.webm`} type="video/webm" />
          <source src={`/assets/demos/${clip.src}.mp4`} type="video/mp4" />
        </video>
      </div>
      <div style={{ padding: '1.2rem 0.2rem 0.3rem' }}>
        <div style={{
          fontFamily: 'var(--sans)', fontWeight: 500, fontSize: '0.62rem',
          letterSpacing: '0.24em', textTransform: 'uppercase',
          color: INK.red, marginBottom: '0.5rem',
        }}>
          {clip.num}
        </div>
        <h3 style={{
          fontFamily: 'var(--serif)', fontWeight: 400,
          fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
          color: INK.ink, marginBottom: '0.5rem',
        }}>
          {clip.title}
        </h3>
        <p style={{
          fontFamily: 'var(--sans)', fontWeight: 300,
          fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)', lineHeight: 1.65,
          color: 'rgba(22,19,16,0.8)',
        }}>
          {clip.caption}
        </p>
      </div>
    </motion.div>
  );
}

export default function RisoPractice() {
  return (
    <section id="in-practice" style={{ background: INK.coral }}>
      {/* The real world enters: two-ink city band. */}
      <img
        src="/assets/redesign/practice-city.webp"
        alt="A city street printed in mustard and black halftone against a coral sky"
        style={{ width: '100%', height: 'clamp(120px, 22vw, 280px)', objectFit: 'cover', display: 'block', borderBottom: `3px solid ${INK.ink}` }}
      />

      <div className="mobile-padding" style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(48px, 7vw, 100px) clamp(20px, 5vw, 60px) clamp(64px, 9vw, 130px)' }}>
        <div
          className="mobile-stack"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderBottom: `3px solid ${INK.ink}`,
            paddingBottom: '32px',
            marginBottom: 'clamp(40px, 6vw, 80px)',
            gap: '1rem',
          }}
        >
          <InkSettleHeading
            as="h2"
            ink={INK.mustard}
            style={{
              fontFamily: 'var(--serif)',
              fontWeight: 400,
              fontSize: 'clamp(2rem, 4.4vw, 3.8rem)',
              lineHeight: 1.05,
              color: INK.ink,
            }}
          >
            How it actually<br />
            <em style={{ fontStyle: 'italic' }}>feels to use.</em>
          </InkSettleHeading>
          <div style={{
            fontFamily: 'var(--sans)',
            fontSize: '0.8rem',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(22,19,16,0.7)',
            marginBottom: '8px',
            whiteSpace: 'nowrap',
          }}>
            IV. In Practice
          </div>
        </div>

        <div
          className="practice-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 'clamp(2rem, 4vw, 4.5rem)',
            alignItems: 'start',
            maxWidth: '1080px',
            margin: '0 auto',
          }}
        >
          {clips.map((clip, i) => (
            <PosterClip key={clip.src} clip={clip} index={i} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .practice-grid {
            grid-template-columns: 1fr !important;
            max-width: 440px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
}
