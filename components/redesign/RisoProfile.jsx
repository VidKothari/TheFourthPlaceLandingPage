/* eslint-disable react/no-unescaped-entities */
'use client';
import { motion } from 'framer-motion';
import { INK, cutout, eyebrowStyle } from './shared';
import InkSettleHeading from './InkSettle';

// The sharing emphasis (July 16): your map IS your profile, and it's made to be handed over.
// Copy drafted new for this section — flagged on the board for Siddharth's sign-off.
export default function RisoProfile() {
  return (
    <section
      id="profile"
      className="riso-grain"
      style={{ background: INK.paper, padding: 'clamp(64px, 9vw, 130px) clamp(20px, 5vw, 60px)' }}
    >
      <div
        className="profile-grid"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.05fr 0.95fr',
          gap: 'clamp(2.5rem, 6vw, 5.5rem)',
          alignItems: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ ...eyebrowStyle(INK.ink), opacity: 0.65, fontFamily: 'var(--font-mono)', marginBottom: '1.4rem' }}>
            V. The Profile
          </div>
          <InkSettleHeading
            as="h2"
            ink={INK.cobalt}
            style={{
              fontFamily: 'var(--serif)',
              fontWeight: 400,
              fontSize: 'clamp(2rem, 4.4vw, 3.8rem)',
              lineHeight: 1.08,
              color: INK.ink,
              marginBottom: '1.3rem',
              textWrap: 'balance',
            }}
          >
            Your map is <em style={{ fontStyle: 'italic' }}>your profile.</em>
          </InkSettleHeading>
          <p style={{
            fontFamily: 'var(--sans)',
            fontWeight: 300,
            fontSize: 'clamp(0.98rem, 1.4vw, 1.12rem)',
            lineHeight: 1.75,
            color: 'rgba(22,19,16,0.82)',
            maxWidth: '34rem',
          }}>
            Everything you keep becomes a page with your name on it — the films,
            albums, books, and games that made you. Hand it to someone, and they
            aren't reading a bio. They're walking through your rooms.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src="/assets/redesign/profile-pass.webp"
            alt="One halftone hand passes a small printed card with a glowing constellation to another hand"
            style={{ ...cutout(), maxWidth: '30rem' }}
          />
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 860px) {
          .profile-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
