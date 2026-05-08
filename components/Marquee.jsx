'use client';
import { motion } from 'framer-motion';

const text = "Films that changed how you see the world — Albums you only play when you need to feel something — Books you've been trying to give everyone you love — Wikipedia articles you read at 2am — YouTube videos you've watched a dozen times — Reddit threads that made you feel less alone — Tweets you've thought about for years — Notes you'd only write if no one was watching — ";

export default function Marquee() {
  return (
    <div style={{
      background: 'var(--bg-pure)',
      padding: '24px 0',
      overflow: 'hidden',
      display: 'flex',
      whiteSpace: 'nowrap',
      borderTop: '1px solid var(--border-crisp)',
      borderBottom: '1px solid var(--border-crisp)'
    }}>
      <motion.div
        animate={{ x: [0, -2000] }} 
        transition={{ ease: "linear", duration: 50, repeat: Infinity }}
        style={{ display: 'flex' }}
      >
        {[1, 2, 3].map((i) => (
          <span key={i} style={{
            fontFamily: 'var(--sans)', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.05em',
            fontSize: '0.8rem', color: 'var(--text-soft)', paddingRight: '40px'
          }}>
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
