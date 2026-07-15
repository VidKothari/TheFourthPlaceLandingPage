import React from 'react';
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { SERIF, SERIF_ITALIC, UI } from './tokens';

const PAPER = '#e6dabe';
const INK = '#161310';
const MAGENTA = '#e5399f';
const COBALT = '#2b3fb8';
const GOLD = '#e8c46a';
const CHROME = 'rgba(255,255,255,0.82)';

const SHARED = [
  { title: 'Stalker', type: 'film', icon: '◈' },
  { title: 'For Emma, Forever Ago', type: 'album', icon: '◫' },
  { title: 'The Left Hand of Darkness', type: 'book', icon: '☰' },
];

export const InCommon: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardIn = spring({ frame, fps, config: { damping: 100, stiffness: 90 } });
  const dividerW = interpolate(frame, [32, 48], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const itemIn = (i: number) =>
    interpolate(frame, [50 + i * 12, 62 + i * 12], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const footIn = interpolate(frame, [92, 104], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const press = frame >= 116 && frame <= 122;
  const requested = interpolate(frame, [124, 134], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: PAPER, fontFamily: UI, alignItems: 'center', justifyContent: 'center' }}>
      <div
        style={{
          width: 620,
          height: 1000,
          border: `2px solid ${INK}`,
          borderRadius: 0,
          overflow: 'hidden',
          position: 'relative',
          background: PAPER,
          transform: `translateY(${(1 - cardIn) * 60}px)`,
          opacity: Math.min(1, cardIn * 1.3),
        }}
      >
        {/* The person's photo fills the whole card */}
        <Img
          src={staticFile('maya-riso.png')}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }}
        />

        {/* Paper wash behind the chrome */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 650, background: `linear-gradient(transparent, ${PAPER} 32%)`, opacity: 0.94 }} />

        {/* Top row */}
        <div style={{ position: 'absolute', top: 26, left: 30, right: 26, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 19, color: COBALT, background: CHROME, border: `2px solid ${INK}`, borderRadius: 0, padding: '7px 11px' }}>@maya</span>
          <div style={{ width: 46, height: 46, borderRadius: 0, border: `2px solid ${INK}`, background: CHROME, display: 'flex', alignItems: 'center', justifyContent: 'center', color: INK, fontSize: 18 }}>✕</div>
        </div>

        {/* Bottom-anchored content */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '24px 34px 30px', background: CHROME, borderTop: `2px solid ${INK}` }}>
          <div style={{ fontFamily: SERIF_ITALIC, fontStyle: 'italic', fontWeight: 300, fontSize: 25, color: MAGENTA }}>
            Midnight Romantic
          </div>
          <div style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 62, color: COBALT, lineHeight: 1.1, marginBottom: 26 }}>
            Maya Iyer
          </div>

          {/* in common divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 22, opacity: dividerW }}>
            <div style={{ flex: 1, height: 2, background: INK, transform: `scaleX(${dividerW})`, transformOrigin: 'right' }} />
            <span style={{ fontSize: 13, letterSpacing: '0.4em', textTransform: 'uppercase', color: GOLD }}>in common</span>
            <div style={{ flex: 1, height: 2, background: INK, transform: `scaleX(${dividerW})`, transformOrigin: 'left' }} />
          </div>

          {/* shared items */}
          {SHARED.map((s, i) => (
            <div
              key={s.title}
              style={{
                opacity: itemIn(i),
                transform: `translateY(${(1 - itemIn(i)) * 14}px)`,
                display: 'flex', alignItems: 'center', gap: 18, marginBottom: 16,
              }}
            >
              <div style={{
                width: 60, height: 60, borderRadius: 0,
                border: `2px solid ${INK}`,
                background: GOLD,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, color: INK,
              }}>
                {s.icon}
              </div>
              <div>
                <div style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 29, color: INK }}>{s.title}</div>
                <div style={{ fontSize: 12, letterSpacing: '0.23em', textTransform: 'uppercase', color: GOLD, marginTop: 3 }}>{s.type}</div>
              </div>
            </div>
          ))}

          {/* footer */}
          <div
            style={{
              opacity: footIn,
              borderTop: `2px solid ${INK}`,
              marginTop: 24, paddingTop: 20,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}
          >
            <span style={{ fontSize: 16, color: INK }}>3 things in common</span>
            <div
              style={{
                borderRadius: 0,
                border: `2px solid ${INK}`,
                background: requested > 0.5 ? PAPER : MAGENTA,
                padding: '11px 26px',
                fontSize: 15,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: INK,
                transform: `scale(${press ? 0.94 : 1})`,
              }}
            >
              {requested > 0.5 ? 'Requested ✓' : 'Follow'}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
