/* eslint-disable react/no-unescaped-entities */
'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function PullQuote() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const shield = useTransform(scrollYProgress, [0.05, 0.55], [0, 1]);
  const dotOpacity = useTransform(scrollYProgress, [0.05, 0.20], [0, 1]);

  // Each curve pair: M top C cp1 cp2 widest C cp3 cp4 bottom
  // cp1 stays near x=720 so curves emerge nearly vertically, then sweep outward
  const T = '720,28';
  const B = '720,872';

  return (
    <section
      ref={ref}
      className="mobile-padding"
      style={{
        position: 'relative',
        background: 'var(--bg-pure)',
        padding: 'clamp(80px, 14vw, 200px) 60px',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        textAlign: 'center',
        borderBottom: '1px solid var(--border-crisp)',
        overflow: 'clip',
      }}
    >
      <svg
        className="mobile-hide"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid meet"
        style={{
          position: 'absolute', top: 0, left: 0,
          width: '100%', height: '100%',
          pointerEvents: 'none', zIndex: 0, opacity: 0.35,
        }}
      >
        <defs>
          <filter id="pq-ink">
            <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" seed="9" result="n"/>
            <feDisplacementMap in="SourceGraphic" in2="n" scale="1.2" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </defs>

        {/* Pair 1 — outermost. Waypoint at (308, 450) and (1132, 450) */}
        <motion.path
          d={`M${T} C700,118 308,285 308,450 C308,615 392,778 ${B}`}
          fill="none" stroke="var(--text-pure)" strokeWidth="1.1" strokeLinecap="round"
          filter="url(#pq-ink)" style={{ pathLength: shield }}/>
        <motion.path
          d={`M${T} C740,118 1132,285 1132,450 C1132,615 1048,778 ${B}`}
          fill="none" stroke="var(--text-pure)" strokeWidth="1.1" strokeLinecap="round"
          filter="url(#pq-ink)" style={{ pathLength: shield }}/>

        {/* Pair 2 — waypoint at (390, 452) and (1050, 452) */}
        <motion.path
          d={`M${T} C704,126 390,292 390,452 C390,612 444,776 ${B}`}
          fill="none" stroke="var(--text-pure)" strokeWidth="0.85" strokeLinecap="round"
          filter="url(#pq-ink)" style={{ pathLength: shield }}/>
        <motion.path
          d={`M${T} C736,126 1050,292 1050,452 C1050,612 996,776 ${B}`}
          fill="none" stroke="var(--text-pure)" strokeWidth="0.85" strokeLinecap="round"
          filter="url(#pq-ink)" style={{ pathLength: shield }}/>

        {/* Pair 3 — waypoint at (472, 454) and (968, 454) */}
        <motion.path
          d={`M${T} C707,133 472,298 472,454 C472,610 494,774 ${B}`}
          fill="none" stroke="var(--text-pure)" strokeWidth="0.65" strokeLinecap="round"
          filter="url(#pq-ink)" style={{ pathLength: shield }}/>
        <motion.path
          d={`M${T} C733,133 968,298 968,454 C968,610 946,774 ${B}`}
          fill="none" stroke="var(--text-pure)" strokeWidth="0.65" strokeLinecap="round"
          filter="url(#pq-ink)" style={{ pathLength: shield }}/>

        {/* Pair 4 — innermost. Waypoint at (554, 456) and (886, 456) */}
        <motion.path
          d={`M${T} C710,140 554,305 554,456 C554,607 548,772 ${B}`}
          fill="none" stroke="var(--text-pure)" strokeWidth="0.5" strokeLinecap="round"
          filter="url(#pq-ink)" style={{ pathLength: shield }}/>
        <motion.path
          d={`M${T} C730,140 886,305 886,456 C886,607 892,772 ${B}`}
          fill="none" stroke="var(--text-pure)" strokeWidth="0.5" strokeLinecap="round"
          filter="url(#pq-ink)" style={{ pathLength: shield }}/>

        {/* Anchor dots */}
        <motion.circle cx="720" cy="28" r="3.5" fill="var(--text-pure)" style={{ opacity: dotOpacity }}/>
        <motion.circle cx="720" cy="872" r="3.5" fill="var(--text-pure)" style={{ opacity: dotOpacity }}/>
      </svg>

      {/* Quote */}
      <motion.div
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        style={{ maxWidth: '1200px', position: 'relative', zIndex: 1 }}
      >
        <h2 style={{
          fontFamily: 'var(--serif)', fontWeight: 400,
          fontSize: 'clamp(2rem, 6vw, 5.5rem)', lineHeight: 1.15,
          color: 'var(--text-pure)', marginBottom: 'clamp(24px, 4vw, 40px)',
        }}>
          "Not everything, but the things that make sense.<br />
          Not everyone, but <em style={{ fontStyle: 'italic', color: 'var(--text-soft)' }}>the ones</em> that make sense."
        </h2>
        <div style={{
          fontFamily: 'var(--sans)', fontSize: '0.8rem', fontWeight: 500,
          letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-soft)',
        }}>
          — The Fourth Place
        </div>
      </motion.div>
    </section>
  );
}
