import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { SERIF, SERIF_ITALIC, UI, T, TC, TYPE_BG, avatarColor } from './tokens';

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

  const field = avatarColor('maya');

  return (
    <AbsoluteFill style={{ background: T.paper, fontFamily: UI, alignItems: 'center', justifyContent: 'center' }}>
      <div
        style={{
          width: 620,
          height: 1000,
          borderRadius: 20,
          overflow: 'hidden',
          position: 'relative',
          background: field,
          transform: `translateY(${(1 - cardIn) * 60}px)`,
          opacity: Math.min(1, cardIn * 1.3),
        }}
      >
        {/* Giant initial on the avatar-color field */}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
          fontFamily: SERIF, fontSize: 420, fontWeight: 300, color: 'rgba(17,17,16,0.13)', lineHeight: 1.1,
        }}>
          M
        </div>

        {/* Top vignette */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 160, background: 'linear-gradient(rgba(0,0,0,0.6), transparent)' }} />
        {/* Bottom gradient */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 560, background: 'linear-gradient(transparent, rgba(6,5,4,0.78) 40%, rgba(6,5,4,0.97))' }} />

        {/* Top row */}
        <div style={{ position: 'absolute', top: 26, left: 30, right: 26, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 19, color: 'rgba(255,255,255,0.55)' }}>@maya</span>
          <div style={{ width: 46, height: 46, borderRadius: '50%', background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.6)', fontSize: 18 }}>✕</div>
        </div>

        {/* Bottom-anchored content */}
        <div style={{ position: 'absolute', left: 34, right: 34, bottom: 30 }}>
          <div style={{ fontFamily: SERIF_ITALIC, fontStyle: 'italic', fontWeight: 300, fontSize: 25, color: 'rgba(255,255,255,0.48)' }}>
            Midnight Romantic
          </div>
          <div style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 62, color: 'rgba(255,255,255,0.96)', lineHeight: 1.1, marginBottom: 26 }}>
            Maya Iyer
          </div>

          {/* in common divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 22, opacity: dividerW }}>
            <div style={{ flex: 1, height: 0.5, background: 'rgba(255,255,255,0.28)', transform: `scaleX(${dividerW})`, transformOrigin: 'right' }} />
            <span style={{ fontSize: 13, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)' }}>in common</span>
            <div style={{ flex: 1, height: 0.5, background: 'rgba(255,255,255,0.28)', transform: `scaleX(${dividerW})`, transformOrigin: 'left' }} />
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
                width: 60, height: 60, borderRadius: 7,
                background: `${TC[s.type]}22`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, color: TC[s.type],
              }}>
                {s.icon}
              </div>
              <div>
                <div style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 29, color: 'rgba(255,255,255,0.88)' }}>{s.title}</div>
                <div style={{ fontSize: 12, letterSpacing: '0.23em', textTransform: 'uppercase', color: TC[s.type], marginTop: 3 }}>{s.type}</div>
              </div>
            </div>
          ))}

          {/* footer */}
          <div
            style={{
              opacity: footIn,
              borderTop: '0.5px solid rgba(255,255,255,0.2)',
              marginTop: 24, paddingTop: 20,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}
          >
            <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.26)' }}>3 things in common</span>
            <div
              style={{
                borderRadius: 6,
                border: '0.5px solid rgba(255,255,255,0.32)',
                background: requested > 0.5 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
                padding: '11px 26px',
                fontSize: 15,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: requested > 0.5 ? 'rgba(255,255,255,0.38)' : 'rgba(255,255,255,0.72)',
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
