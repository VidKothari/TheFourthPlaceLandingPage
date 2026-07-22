import React from 'react';
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { SERIF, SERIF_ITALIC, UI } from './tokens';

// ─────────────────────────────────────────────────────────────────────────
// MEET — a 1:1 recreation of the app's profile card (the dark riso gallery).
// Warm-black ground, a #141312 surface card with a hairline white-alpha border,
// paper avatar frame, a "palette" of type-ink dots, three shared items with real
// cover art matted in their type ink + paper SHARED placards, and a paper FOLLOW
// ticket that presses down and flips to FOLLOWING. Product motion, not a slideshow.
// ─────────────────────────────────────────────────────────────────────────

const BG = '#0a0a09';
const SURFACE = '#141312';
const PAPER = '#efe6d0';
const INK_ON_PAPER = '#111111';
const BORDER = 'rgba(255,255,255,0.14)';
const HAIR = 'rgba(255,255,255,0.10)';

// riso TYPE_INK
const CORAL = '#ef6a55';
const COBALT = '#2b3fb8';
const MAGENTA = '#e5399f';
const CHART = '#c6e02e';
const MUSTARD = '#e8c53a';

const PALETTE = [CORAL, COBALT, MAGENTA, CHART, MUSTARD];

const SHARED = [
  { title: 'Stalker', type: 'film', ink: CORAL, cover: 'movie4.webp' },
  { title: 'For Emma, Forever Ago', type: 'album', ink: COBALT, cover: 'music3.webp' },
  { title: 'The Left Hand of Darkness', type: 'book', ink: CORAL, cover: 'book2.webp' },
];

export const Meet: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardIn = spring({ frame, fps, config: { damping: 100, stiffness: 90 } });
  const headIn = interpolate(frame, [10, 28], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dotIn = (i: number) =>
    spring({ frame: frame - (26 + i * 4), fps, config: { damping: 12, stiffness: 200 } });
  const dividerW = interpolate(frame, [36, 54], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const itemIn = (i: number) =>
    interpolate(frame, [52 + i * 14, 68 + i * 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const placardIn = (i: number) =>
    spring({ frame: frame - (62 + i * 14), fps, config: { damping: 11, stiffness: 220 } });
  const footIn = interpolate(frame, [102, 118], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const press = frame >= 120 && frame <= 128;
  const pressScale = press ? interpolate(frame, [120, 124, 128], [1, 0.955, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) : 1;
  const followed = interpolate(frame, [128, 142], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const isFollowing = followed > 0.5;

  return (
    <AbsoluteFill style={{ background: BG, fontFamily: UI, alignItems: 'center', justifyContent: 'center' }}>
      {/* faint riso halftone wash so the ground never reads as flat digital black */}
      <AbsoluteFill
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 32%, rgba(43,63,184,0.10), transparent 60%)',
          opacity: 0.9,
        }}
      />

      <div
        style={{
          width: 660,
          background: SURFACE,
          border: `1px solid ${BORDER}`,
          padding: '46px 46px 40px',
          boxSizing: 'border-box',
          transform: `translateY(${(1 - cardIn) * 46}px)`,
          opacity: Math.min(1, cardIn * 1.4),
          boxShadow: '0 40px 90px rgba(0,0,0,0.55)',
        }}
      >
        {/* ── Header: paper-framed avatar + name + handle ── */}
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', opacity: headIn, transform: `translateY(${(1 - headIn) * 10}px)` }}>
          <div style={{ width: 94, height: 94, flexShrink: 0, border: `2px solid ${PAPER}`, padding: 3, background: '#0c0b0a' }}>
            <Img src={staticFile('maya.png')} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 22%', display: 'block' }} />
          </div>
          <div style={{ flex: 1, minWidth: 0, paddingTop: 2 }}>
            <div style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 50, lineHeight: 1.02, color: 'rgba(255,255,255,0.94)' }}>
              Maya Iyer
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 8 }}>
              <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.36)', letterSpacing: '0.02em' }}>@maya</span>
              <span style={{ fontFamily: SERIF_ITALIC, fontStyle: 'italic', fontWeight: 300, fontSize: 22, color: 'rgba(255,255,255,0.5)' }}>
                midnight romantic
              </span>
            </div>
          </div>
        </div>

        {/* ── Palette: type-ink dots ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 26, opacity: headIn }}>
          <span style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)', fontWeight: 600 }}>Palette</span>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {PALETTE.map((c, i) => (
              <span
                key={c}
                style={{
                  width: 11, height: 11, background: c,
                  transform: `scale(${Math.min(1, dotIn(i))})`,
                  boxShadow: `0 0 10px ${c}66`,
                }}
              />
            ))}
          </div>
        </div>

        {/* ── IN COMMON divider ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 34, marginBottom: 26 }}>
          <div style={{ flex: 1, height: 1, background: HAIR, transform: `scaleX(${dividerW})`, transformOrigin: 'right' }} />
          <span style={{ fontSize: 10.5, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>In common</span>
          <div style={{ flex: 1, height: 1, background: HAIR, transform: `scaleX(${dividerW})`, transformOrigin: 'left' }} />
        </div>

        {/* ── Shared items ── */}
        {SHARED.map((s, i) => (
          <div
            key={s.title}
            style={{
              display: 'flex', alignItems: 'center', gap: 20, marginBottom: 18,
              opacity: itemIn(i),
              transform: `translateY(${(1 - itemIn(i)) * 16}px)`,
            }}
          >
            <div style={{ width: 78, height: 78, flexShrink: 0, border: `2px solid ${s.ink}`, background: '#0c0b0a' }}>
              <Img src={staticFile(s.cover)} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 31, color: 'rgba(255,255,255,0.9)', lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.title}</div>
              <div style={{ fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: s.ink, marginTop: 6, fontWeight: 600 }}>{s.type}</div>
            </div>
            {/* paper SHARED placard, stamped on */}
            <div
              style={{
                background: PAPER, color: INK_ON_PAPER,
                fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600,
                padding: '5px 9px', flexShrink: 0,
                transform: `scale(${Math.min(1, placardIn(i))}) rotate(-2deg)`,
                opacity: Math.min(1, placardIn(i) * 1.4),
              }}
            >
              Shared
            </div>
          </div>
        ))}

        {/* ── Footer: FOLLOW ticket ── */}
        <div style={{ borderTop: `1px solid ${HAIR}`, marginTop: 26, paddingTop: 24, opacity: footIn, transform: `translateY(${(1 - footIn) * 12}px)` }}>
          <div
            style={{
              width: '100%',
              textAlign: 'center',
              padding: '17px 0',
              background: isFollowing ? 'transparent' : PAPER,
              border: isFollowing ? `1px solid rgba(239,230,208,0.5)` : `1px solid ${PAPER}`,
              color: isFollowing ? 'rgba(239,230,208,0.9)' : INK_ON_PAPER,
              fontSize: 13,
              fontWeight: isFollowing ? 500 : 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              transform: `scale(${pressScale})`,
              boxSizing: 'border-box',
            }}
          >
            {isFollowing ? 'Following ✓' : 'Follow'}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
