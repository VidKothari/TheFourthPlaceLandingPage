/* eslint-disable react/no-unescaped-entities */
'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const clips = [
  {
    src: 'add-flow',
    num: '01',
    title: 'Keep',
    caption: 'Add the things that moved you. Write what they did to you, not what you think of them. They become your map.',
  },
  {
    src: 'in-common',
    num: '02',
    title: 'Meet',
    caption: 'When someone’s collection overlaps yours, you see exactly what you share — weighted by rarity, not popularity.',
  },
  {
    src: 'tastemap',
    num: '03',
    title: 'Merge',
    caption: 'Your collection becomes a constellation. Lay it over someone else’s, and what you share glows gold.',
  },
  {
    src: 'recs',
    num: '04',
    title: 'Pass it on',
    caption: 'Recommend something to a specific friend — and get a quiet note when it lands on their map.',
  },
];

function DemoClip({ clip, index }) {
  const videoRef = useRef(null);
  const [canPlay, setCanPlay] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setCanPlay(!mq.matches);
    const onChange = (e) => setCanPlay(!e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (!canPlay) { el.pause(); return; }
    // Only play while on screen — keeps the section light.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [canPlay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.9, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: index % 2 === 1 ? 'clamp(0px, 4vw, 56px)' : 0,
      }}
    >
      <div style={{ border: '1px solid var(--border-dusk)', overflow: 'hidden' }}>
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster={`/assets/demos/${clip.src}-poster.jpg`}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        >
          <source src={`/assets/demos/${clip.src}.webm`} type="video/webm" />
          <source src={`/assets/demos/${clip.src}.mp4`} type="video/mp4" />
        </video>
      </div>
      <div style={{ padding: '1.5rem 0.25rem 0' }}>
        <div style={{
          fontFamily: 'var(--sans)', fontWeight: 400, fontSize: '0.62rem',
          letterSpacing: '0.24em', textTransform: 'uppercase',
          color: 'var(--ink-dusk-soft)', marginBottom: '0.6rem',
        }}>
          {clip.num}
        </div>
        <h3 style={{
          fontFamily: 'var(--serif)', fontWeight: 400,
          fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
          color: 'var(--ink-dusk)', marginBottom: '0.6rem',
        }}>
          {clip.title}
        </h3>
        <p style={{
          fontFamily: 'var(--sans)', fontWeight: 300,
          fontSize: 'clamp(0.85rem, 1.2vw, 0.98rem)', lineHeight: 1.7,
          color: 'var(--ink-dusk-soft)',
        }}>
          {clip.caption}
        </p>
      </div>
    </motion.div>
  );
}

export default function InPractice() {
  return (
    <section
      id="in-practice"
      className="mobile-padding"
      style={{
        background: 'var(--bg-dusk)',
        padding: 'clamp(80px, 10vw, 160px) clamp(20px, 5vw, 60px)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div
          className="mobile-stack"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderBottom: '1px solid var(--border-dusk)',
            paddingBottom: '40px',
            marginBottom: 'clamp(48px, 6vw, 90px)',
          }}
        >
          <h2 style={{
            fontFamily: 'var(--serif)',
            fontWeight: 400,
            fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
            lineHeight: 1.05,
            color: 'var(--ink-dusk)',
          }}>
            How it actually<br />
            <em style={{ fontStyle: 'italic', color: 'var(--ink-dusk-soft)' }}>feels to use.</em>
          </h2>
          <div style={{
            fontFamily: 'var(--sans)',
            fontSize: '0.8rem',
            fontWeight: 400,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--ink-dusk-soft)',
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
            <DemoClip key={clip.src} clip={clip} index={i} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .practice-grid {
            grid-template-columns: 1fr !important;
            max-width: 420px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
}
