'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Mobile-only floating shortcut to the waitlist. Hides once the
// waitlist section is on screen (and near the very top of the page).
export default function WaitlistFab() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (window.innerWidth >= 768) return;

    let waitlistVisible = false;
    let scrolledPastHero = false;

    const update = () => setShow(scrolledPastHero && !waitlistVisible);

    const target = document.getElementById('waitlist');
    const io = new IntersectionObserver(
      ([entry]) => { waitlistVisible = entry.isIntersecting; update(); },
      { threshold: 0.15 }
    );
    if (target) io.observe(target);

    const onScroll = () => {
      scrolledPastHero = window.scrollY > window.innerHeight * 0.6;
      update();
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#waitlist"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mobile-show"
          style={{
            display: 'none',
            position: 'fixed',
            right: '16px',
            bottom: 'calc(16px + env(safe-area-inset-bottom))',
            zIndex: 1500,
            background: 'var(--text-pure)',
            color: 'var(--bg-pure)',
            fontFamily: 'var(--sans)',
            fontWeight: 400,
            fontSize: '0.72rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            padding: '0.9rem 1.25rem',
            border: '1px solid var(--text-pure)',
            boxShadow: '0 8px 24px rgba(17,17,16,0.25)',
          }}
        >
          Join the waitlist ↓
        </motion.a>
      )}
    </AnimatePresence>
  );
}
