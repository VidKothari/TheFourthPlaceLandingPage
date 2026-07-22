/* eslint-disable react/no-unescaped-entities */
'use client';
import Image from 'next/image';
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
            It can count every pause, replay, and scroll. It still can’t tell
            which film changed you, which page you underlined, or which song
            became part of a year.
          </InkSettleHeading>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative', paddingBottom: '3.5rem' }}
        >
          <Image
            src="/assets/notSocial.webp"
            alt="Not Social"
            width={441}
            height={566}
            sizes="(max-width: 860px) calc(100vw - 40px), 384px"
            style={{ ...cutout(), maxWidth: '24rem' }}
          />
          {/* The pinned clipping settles into place: rotation eases 7deg -> 4deg once. */}
          <motion.div
            initial={{ rotate: reduce ? 4 : 7 }}
            whileInView={{ rotate: 4 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              width: 'clamp(9rem, 14vw, 13rem)',
              right: '0',
              bottom: '0',
            }}
          >
            <Image
              src="/assets/redesign/feed-scroll.webp"
              alt="A hand-painted word painting reading SCROLL SCROLL SCROLL"
              width={1400}
              height={1400}
              sizes="(max-width: 860px) 9rem, 13rem"
              quality={60}
              style={{ ...cutout('rgba(22,19,16,0.28)') }}
            />
          </motion.div>
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
