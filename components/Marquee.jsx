'use client';
import { motion } from 'framer-motion';

const artifacts = [
  'the album you only play at 2am',
  'the film you can’t explain to anyone',
  'the book you keep giving away',
  'the song that belongs to one specific summer',
  'the Wikipedia spiral that ate a whole night',
  'the video essay you rewatch every year',
  'the paragraph you never stopped thinking about',
];

const line = artifacts.join('  ·  ') + '  ·  ';

export default function Marquee() {
  return (
    <div style={{
      background: 'var(--bg-warm)',
      padding: '22px 0',
      overflow: 'hidden',
      display: 'flex',
      whiteSpace: 'nowrap',
      borderBottom: '1px solid var(--border-crisp)',
    }}>
      <motion.div
        animate={{ x: [0, -2000] }}
        transition={{ ease: 'linear', duration: 60, repeat: Infinity }}
        style={{ display: 'flex' }}
      >
        {[1, 2, 3].map((i) => (
          <span key={i} style={{
            fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400,
            fontSize: '1.05rem', color: 'var(--text-soft)', paddingRight: '40px',
          }}>
            {line}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
