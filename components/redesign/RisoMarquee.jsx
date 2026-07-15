'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { INK } from './shared';

const artifacts = [
  'the album you only play at 2am',
  'the film you can’t explain to anyone',
  'the book you keep giving away',
  'the song that belongs to one specific summer',
  'the Wikipedia spiral that ate a whole night',
  'the video essay you rewatch every year',
  'the paragraph you never stopped thinking about',
];

export default function RisoMarquee() {
  const reduce = useReducedMotion();

  const run = [...artifacts, ...artifacts, ...artifacts];

  return (
    <div style={{
      background: INK.ink,
      padding: '18px 0',
      overflow: 'hidden',
      display: 'flex',
      whiteSpace: 'nowrap',
      borderTop: `2px solid ${INK.ink}`,
      borderBottom: `2px solid ${INK.ink}`,
    }}>
      <motion.div
        animate={reduce ? undefined : { x: [0, -2400] }}
        transition={{ ease: 'linear', duration: 80, repeat: Infinity }}
        style={{ display: 'flex' }}
      >
        {run.map((phrase, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'var(--sans)',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontSize: '0.85rem',
              color: i % 3 === 2 ? INK.magenta : INK.paper,
              paddingRight: '14px',
            }}
          >
            {phrase}
            <span aria-hidden="true" style={{ paddingLeft: '14px', color: 'rgba(239,230,208,0.45)' }}>·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
