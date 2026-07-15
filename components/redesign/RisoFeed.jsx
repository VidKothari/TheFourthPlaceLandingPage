/* eslint-disable react/no-unescaped-entities */
'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { INK, cutout, eyebrowStyle } from './shared';
import InkSettleHeading from './InkSettle';

// Compressed manifesto on paper — chartreuse demoted to accents (July 16 review).
// The zine spread on the right: the "Not Social" editorial image + the SCROLL painting.
export default function RisoFeed() {
  const reduce = useReducedMotion();
  return (
    <section
      id="manifesto"
      className="riso-grain"
      style={{ background: INK.paper, padding: 'clamp(64px, 9vw, 130px) clamp(20px, 5vw, 60px)' }}
    >
      <div
        className="feed-grid"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
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
          <div style={{
            ...eyebrowStyle(INK.ink),
            fontFamily: 'var(--font-mono)',
            display: 'inline-block',
            background: INK.chartreuse,
            padding: '0.35rem 0.7rem',
            border: `2px solid ${INK.ink}`,
            marginBottom: '1.5rem',
          }}>
            01. The Feed
          </div>
          <InkSettleHeading
            as="h2"
            ink={INK.chartreuse}
            style={{
              fontFamily: 'var(--serif)',
              fontWeight: 400,
              fontSize: 'clamp(1.9rem, 3.8vw, 3.2rem)',
              lineHeight: 1.12,
              color: INK.ink,
              marginBottom: '1.3rem',
              textWrap: 'balance',
            }}
          >
            The feed knows what you clicked. It has no idea{' '}
            <em style={{
              fontStyle: 'italic',
              background: `linear-gradient(transparent 62%, ${INK.chartreuse} 62%)`,
            }}>
              who you are.
            </em>
          </InkSettleHeading>
          <p style={{
            fontFamily: 'var(--sans)',
            fontWeight: 300,
            fontSize: 'clamp(0.98rem, 1.4vw, 1.12rem)',
            lineHeight: 1.75,
            color: 'rgba(22,19,16,0.8)',
            maxWidth: '36rem',
          }}>
            You don't open it to find your people. You open it because it's there.<br />
            It was built to hold your attention — never to introduce you to anyone.<br />
            Meanwhile the truest parts of you sit in notes apps and dog-eared pages, with nowhere to live.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative', paddingBottom: '3.5rem' }}
        >
          <img
            src="/assets/notSocial.webp"
            alt="Not Social"
            style={{ ...cutout(), maxWidth: '24rem' }}
          />
          {/* The pinned clipping settles into place: rotation eases 7deg -> 4deg once. */}
          <motion.img
            src="/assets/redesign/feed-scroll.webp"
            alt="A hand-painted word painting reading SCROLL SCROLL SCROLL"
            initial={{ rotate: reduce ? 4 : 7 }}
            whileInView={{ rotate: 4 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              ...cutout('rgba(22,19,16,0.28)'),
              position: 'absolute',
              width: 'clamp(9rem, 14vw, 13rem)',
              right: '0',
              bottom: '0',
            }}
          />
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 860px) {
          .feed-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
