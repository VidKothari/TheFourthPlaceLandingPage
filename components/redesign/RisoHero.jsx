/* eslint-disable react/no-unescaped-entities */
'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MoveRight } from 'lucide-react';
import { INK, cutout, eyebrowStyle } from './shared';
import InkSettleHeading from './InkSettle';

function Ctas({ cta, display }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem', flexWrap: 'wrap' }}>
      <a
        href="#waitlist"
        className="riso-cta"
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          height: '3.1rem', padding: '0 2rem',
          background: cta.bg, color: cta.fg,
          border: `2px solid ${INK.ink}`,
          boxShadow: '5px 5px 0 rgba(22,19,16,0.35)',
          fontFamily: 'var(--sans)', fontWeight: 500, fontSize: '0.85rem',
          letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none',
        }}
      >
        Join the waitlist
      </a>
      <a
        href="#tastemap"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          fontFamily: 'var(--sans)', fontWeight: 500, fontSize: '0.85rem',
          letterSpacing: '0.06em', color: display, textDecoration: 'underline',
          textUnderlineOffset: '5px',
        }}
      >
        Walk through <MoveRight strokeWidth={1.5} size={18} />
      </a>
      {/* Print-block push: instant tactile press, CSS-only interaction state. */}
      <style jsx>{`
        .riso-cta:active {
          transform: translate(2px, 2px);
          box-shadow: 3px 3px 0 rgba(22, 19, 16, 0.35) !important;
        }
      `}</style>
    </div>
  );
}

function HeroText({ hero }) {
  const { display, body } = hero.onField;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
    >
      <div style={{ ...eyebrowStyle(display), opacity: 0.85, marginBottom: '1.6rem' }}>
        A digital museum of yourself
      </div>
      <InkSettleHeading
        as="h1"
        ink={INK.magenta}
        style={{
          fontFamily: 'var(--serif)',
          fontWeight: 400,
          fontSize: 'clamp(2.5rem, 5.2vw, 4.4rem)',
          lineHeight: 1.08,
          color: display,
          marginBottom: '1.4rem',
          textWrap: 'balance',
          paddingBottom: '0.1em',
        }}
      >
        Find people whose minds<br />
        <em style={{ fontStyle: 'italic' }}>look like yours.</em>
      </InkSettleHeading>
      <p style={{
        fontFamily: 'var(--sans)',
        fontWeight: 300,
        fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
        lineHeight: 1.7,
        color: body,
        maxWidth: '32rem',
        marginBottom: '2.4rem',
      }}>
        The Fourth Place is a room for the films, albums, books, and games that
        made you — and a way of finding the people whose rooms rhyme with yours.
      </p>
      <Ctas cta={hero.cta} display={display} />
    </motion.div>
  );
}

function HeroFilm({ hero }) {
  const [showVideo, setShowVideo] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mq.matches) setShowVideo(true);
  }, []);
  if (!showVideo) {
    return (
      <img
        src={hero.img}
        alt={hero.imgAlt}
        className="hero-film-media"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '62% center' }}
      />
    );
  }
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      poster={hero.video.poster}
      aria-label={hero.imgAlt}
      className="hero-film-media"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '62% center' }}
    >
      <source src={hero.video.webm} type="video/webm" />
      <source src={hero.video.mp4} type="video/mp4" />
    </video>
  );
}

export default function RisoHero({ hero }) {
  if (hero.layout === 'film-bleed') {
    return (
      <section style={{ position: 'relative', background: hero.field, minHeight: '100dvh', overflow: 'hidden' }}>
        <HeroFilm hero={hero} />
        <div
          className="mobile-padding hero-film-content"
          style={{
            position: 'relative',
            minHeight: '100dvh',
            display: 'flex',
            alignItems: 'center',
            padding: '6.5rem clamp(20px, 6vw, 80px) 4rem',
          }}
        >
          <div style={{ width: 'min(36rem, 100%)' }}>
            <HeroText hero={hero} />
          </div>
        </div>
        <style jsx>{`
          @media (max-width: 860px) {
            .hero-film-content {
              align-items: flex-end !important;
              padding-bottom: 3rem !important;
            }
            .hero-film-content > div {
              background: rgba(200, 41, 30, 0.82);
              padding: 1.25rem;
              outline: 2px solid rgba(22, 19, 16, 0.6);
            }
          }
        `}</style>
      </section>
    );
  }

  if (hero.layout === 'bleed') {
    return (
      <section
        className="riso-grain"
        style={{ position: 'relative', background: hero.field, minHeight: '100dvh', overflow: 'hidden' }}
      >
        <img
          src={hero.img}
          alt={hero.imgAlt}
          className="hero-bleed-img"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'left center',
          }}
        />
        <div
          className="mobile-padding hero-bleed-content"
          style={{
            position: 'relative',
            minHeight: '100dvh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '6.5rem clamp(20px, 6vw, 80px) 4rem',
          }}
        >
          <div style={{ width: 'min(34rem, 100%)' }}>
            <HeroText hero={hero} />
          </div>
        </div>
        <style jsx>{`
          @media (max-width: 860px) {
            .hero-bleed-img {
              position: relative !important;
              height: 44vh !important;
              margin-top: 4.5rem;
              border-bottom: 2px solid ${INK.ink};
            }
            .hero-bleed-content {
              min-height: 0 !important;
              padding-top: 2.5rem !important;
              justify-content: flex-start !important;
            }
          }
        `}</style>
      </section>
    );
  }

  const reverse = hero.layout === 'split-reverse';
  return (
    <section
      className="riso-grain"
      style={{ background: hero.field, minHeight: '100dvh', display: 'flex', alignItems: 'center' }}
    >
      <div
        className={`mobile-padding hero-split${reverse ? ' reverse' : ''}`}
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: reverse ? '0.85fr 1.15fr' : '1.15fr 0.85fr',
          gap: 'clamp(2.5rem, 6vw, 6rem)',
          alignItems: 'center',
          padding: '6.5rem clamp(20px, 5vw, 60px) 4rem',
        }}
      >
        {/* Text always first in DOM so mobile leads with the headline + CTA. */}
        <HeroText hero={hero} />
        <HeroArt hero={hero} />
      </div>
      <style jsx>{`
        @media (min-width: 861px) {
          .hero-split.reverse > :global(*:first-child) {
            order: 2;
          }
        }
        @media (max-width: 860px) {
          .hero-split {
            grid-template-columns: 1fr !important;
            padding-top: 6rem !important;
          }
        }
      `}</style>
    </section>
  );
}

function HeroArt({ hero }) {
  const videoRef = useRef(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (!hero.video) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mq.matches) setShowVideo(true);
  }, [hero.video]);

  // Guarantee autoplay: set the muted PROPERTY and retry (React can drop the attr).
  useEffect(() => {
    const el = videoRef.current;
    if (!el || !showVideo) return;
    el.muted = true;
    el.defaultMuted = true;
    el.play()?.catch(() => {});
    const onCanPlay = () => { el.muted = true; el.play().catch(() => {}); };
    el.addEventListener('canplay', onCanPlay);
    return () => el.removeEventListener('canplay', onCanPlay);
  }, [showVideo]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      style={{ justifySelf: 'center', width: hero.video ? 'min(36rem, 100%)' : 'min(30rem, 100%)' }}
    >
      {showVideo ? (
        /* The hero film. Plays once, holds on the final frame. */
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          poster={hero.video.poster}
          aria-label={hero.imgAlt}
          style={{ ...cutout(), aspectRatio: hero.video.aspect || '1 / 1', objectFit: 'cover' }}
        >
          <source src={hero.video.webm} type="video/webm" />
          <source src={hero.video.mp4} type="video/mp4" />
        </video>
      ) : (
        <img
          src={hero.img}
          alt={hero.imgAlt}
          style={{ ...cutout(), aspectRatio: hero.imgRatio, objectFit: 'cover' }}
        />
      )}
    </motion.div>
  );
}
