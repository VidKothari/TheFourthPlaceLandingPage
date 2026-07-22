/* eslint-disable react/no-unescaped-entities */
'use client';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { INK } from './shared';
import InkSettleHeading from './InkSettle';
import AutoplayLoopVideo from './AutoplayLoopVideo';

const clips = [
  {
    // July 23: rebuilt in Remotion as a 1:1 recreation of the app profile card.
    src: 'meet-riso-loop',
    num: '02',
    title: 'Meet',
    caption: 'When someone’s collection overlaps yours, you see exactly what you share — weighted by rarity, not popularity.',
  },
  {
    // July 23: reworked to mirror the real TasteMap — poster grid, gold shared frames, converge.
    src: 'merge-riso-loop',
    num: '03',
    title: 'Merge',
    caption: 'Your collection becomes a constellation. Lay it over someone else’s, and what you share glows gold.',
  },
  {
    src: 'check-later-loop',
    num: '04',
    title: 'Check it out later',
    caption: 'Save anything from the feed, then come back when you actually have time for it.',
  },
];

function PosterClip({ clip, index, reduce }) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 28 }}
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
        <AutoplayLoopVideo
          preload="metadata"
          poster={`/assets/demos/${clip.src}-poster.jpg`}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        >
          <source src={`/assets/demos/${clip.src}.webm`} type="video/webm" />
          <source src={`/assets/demos/${clip.src}.mp4`} type="video/mp4" />
        </AutoplayLoopVideo>
      </div>
      <div style={{ padding: '1.2rem 0.2rem 0.3rem' }}>
        <div style={{
          fontFamily: 'var(--sans)', fontWeight: 500, fontSize: '0.75rem',
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
          fontSize: 'clamp(0.9rem, 1.2vw, 0.95rem)', lineHeight: 1.65,
          color: 'rgba(22,19,16,0.8)',
        }}>
          {clip.caption}
        </p>
      </div>
    </motion.div>
  );
}

export default function RisoPractice() {
  const reduce = useReducedMotion();

  return (
    <section
      id="in-practice"
      className="deferred-paint"
      style={{
        background: '#0a0a09',
        backgroundImage: 'radial-gradient(circle at 18% 8%, rgba(26,14,46,0.9) 0%, rgba(10,10,9,0) 46%), linear-gradient(145deg, #111110 0%, #0a0a09 72%)',
      }}
    >
      {/* The real world enters: two-ink city band. */}
      <div style={{ position: 'relative', borderBottom: '1px solid rgba(255,255,255,0.12)', overflow: 'hidden' }}>
        <Image
          src="/assets/redesign/practice-city.webp"
          alt="A halftone city street at night"
          width={2400}
          height={1018}
          sizes="100vw"
          quality={60}
          style={{ width: '100%', height: 'clamp(120px, 22vw, 280px)', objectFit: 'cover', display: 'block', filter: 'grayscale(0.75) saturate(0.5) brightness(0.42) hue-rotate(210deg)' }}
        />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(26,14,46,0.72), rgba(10,10,9,0.2) 55%, rgba(9,26,26,0.62))', mixBlendMode: 'color' }} />
      </div>

      <div className="mobile-padding" style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(48px, 7vw, 100px) clamp(20px, 5vw, 60px) clamp(64px, 9vw, 130px)' }}>
        <div
          className="mobile-stack"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderBottom: '1px solid rgba(255,255,255,0.14)',
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
              color: INK.paper,
            }}
          >
            How it actually<br />
            <em style={{ fontStyle: 'italic' }}>feels to use.</em>
          </InkSettleHeading>
          <div style={{
            fontFamily: 'var(--sans)',
            fontSize: '0.875rem',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(239,230,208,0.68)',
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
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: 'clamp(1.5rem, 3vw, 3rem)',
            alignItems: 'start',
            maxWidth: '1280px',
            margin: '0 auto',
          }}
        >
          {clips.map((clip, i) => (
            <PosterClip key={clip.src} clip={clip} index={i} reduce={reduce} />
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
