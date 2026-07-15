import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { SERIF, SERIF_ITALIC, T, UI } from './tokens';

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const Bookmark: React.FC<{ saved: boolean; progress: number }> = ({ saved, progress }) => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <path
      d="M13 8.5h18v27L22 30l-9 5.5v-27Z"
      fill={saved ? `rgba(255,255,255,${0.12 + progress * 0.78})` : 'rgba(255,255,255,0.03)'}
      stroke={saved ? '#fff' : 'rgba(255,255,255,0.78)'}
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <path
      d="m17.8 21.3 2.8 2.8 5.8-6"
      stroke="#0a0a09"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={progress}
    />
  </svg>
);

const Cursor: React.FC<{ x: number; y: number; press: number; opacity: number }> = ({ x, y, press, opacity }) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: 64,
      height: 64,
      borderRadius: '50%',
      border: '2px solid rgba(255,255,255,0.75)',
      background: `rgba(255,255,255,${0.07 + press * 0.2})`,
      boxShadow: `0 0 0 ${press * 22}px rgba(255,255,255,${0.18 * (1 - press)})`,
      transform: `translate(-50%, -50%) scale(${1 - press * 0.17})`,
      opacity,
      zIndex: 20,
    }}
  >
    <div style={{ position: 'absolute', inset: 23, borderRadius: '50%', background: 'rgba(255,255,255,0.94)' }} />
  </div>
);

const MiniCard: React.FC<{ top: number; title: string; glyph: string; tint: string; opacity: number }> = ({ top, title, glyph, tint, opacity }) => (
  <div
    style={{
      position: 'absolute',
      top,
      left: 54,
      right: 54,
      height: 156,
      borderRadius: 22,
      border: `1px solid ${T.borderStrong}`,
      background: T.surface,
      overflow: 'hidden',
      opacity,
      display: 'flex',
      alignItems: 'center',
      padding: 22,
      gap: 24,
    }}
  >
    <div style={{ width: 112, height: 112, background: tint, display: 'grid', placeItems: 'center', color: 'rgba(255,255,255,0.35)', fontSize: 44 }}>{glyph}</div>
    <div>
      <div style={{ fontFamily: UI, fontSize: 12, letterSpacing: '0.19em', color: 'rgba(255,255,255,0.3)' }}>JUST ADDED</div>
      <div style={{ fontFamily: SERIF, fontSize: 33, color: 'rgba(255,255,255,0.78)', marginTop: 12 }}>{title}</div>
    </div>
  </div>
);

export const CheckLater: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tapAt = 2.55 * fps;
  const pressSpring = spring({
    frame: frame - tapAt,
    fps,
    durationInFrames: 0.38 * fps,
    config: { damping: 18, stiffness: 230 },
  });
  const press = pressSpring * (1 - pressSpring) * 2.75;
  const saved = interpolate(frame, [2.65 * fps, 2.92 * fps], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.quad),
  });
  const cursorX = interpolate(frame, [0.65 * fps, 2.2 * fps], [520, 785], {
    ...clamp,
    easing: Easing.inOut(Easing.quad),
  });
  const cursorY = interpolate(frame, [0.65 * fps, 2.2 * fps], [835, 295], {
    ...clamp,
    easing: Easing.inOut(Easing.quad),
  });
  const cursorOpacity = interpolate(frame, [0.45 * fps, 0.7 * fps, 3.15 * fps, 3.42 * fps], [0, 1, 1, 0], clamp);
  const toast = interpolate(frame, [2.76 * fps, 3.05 * fps, 4.6 * fps, 4.9 * fps], [0, 1, 1, 0], clamp);
  const toastY = interpolate(frame, [2.76 * fps, 3.08 * fps], [24, 0], { ...clamp, easing: Easing.out(Easing.quad) });
  const ringScale = interpolate(saved, [0, 0.55, 1], [0.7, 1.18, 1], clamp);
  const feedDrift = interpolate(frame, [0, 5.3 * fps], [0, -18], clamp);

  return (
    <AbsoluteFill style={{ background: T.paper, color: T.ink, fontFamily: UI, overflow: 'hidden' }}>
      <div style={{ height: 96, padding: '0 48px', display: 'flex', alignItems: 'center', borderBottom: `1px solid ${T.border}`, background: 'rgba(10,10,9,0.98)' }}>
        <span style={{ fontFamily: SERIF_ITALIC, fontStyle: 'italic', fontSize: 29, color: 'rgba(255,255,255,0.78)' }}>The Fourth Place</span>
        <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 600, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.33)' }}>THE FEED</span>
      </div>

      <div style={{ position: 'absolute', inset: '96px 0 78px', overflow: 'hidden', transform: `translateY(${feedDrift}px)` }}>
        <MiniCard top={-118} title="A Different Kind of Blue" glyph="♪" tint="#121e18" opacity={0.42} />

        <div
          style={{
            position: 'absolute',
            top: 74,
            left: 42,
            right: 42,
            borderRadius: 26,
            border: '1px solid rgba(255,255,255,0.14)',
            background: '#1c1b19',
            overflow: 'hidden',
            boxShadow: '0 34px 90px rgba(0,0,0,0.42)',
          }}
        >
          <div style={{ height: 558, display: 'flex', borderBottom: `1px solid ${T.border}` }}>
            <div style={{ width: 374, position: 'relative', overflow: 'hidden', background: '#163270' }}>
              <Img src={staticFile('movie2.webp')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent 58%, rgba(28,27,25,0.62) 100%)' }} />
            </div>
            <div style={{ position: 'relative', flex: 1, padding: '44px 34px 36px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <Img src={staticFile('maya-riso.png')} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 32%' }} />
                </div>
                <div>
                  <div style={{ fontSize: 17, color: 'rgba(255,255,255,0.82)' }}>Maya</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', marginTop: 4 }}>2 HOURS AGO</div>
                </div>
              </div>

              <div style={{ marginTop: 48, fontSize: 11, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.32)' }}>FILM · 2017</div>
              <div style={{ marginTop: 14, fontFamily: SERIF, fontSize: 48, lineHeight: 0.94, color: 'rgba(255,255,255,0.92)' }}>Call Me<br />by Your Name</div>
              <div style={{ marginTop: 14, fontSize: 15, color: 'rgba(255,255,255,0.34)' }}>Luca Guadagnino</div>
              <div style={{ marginTop: 38, fontFamily: SERIF_ITALIC, fontStyle: 'italic', fontSize: 23, lineHeight: 1.42, color: 'rgba(255,255,255,0.65)' }}>“Summer, but with the ache left in.”</div>

              <div
                style={{
                  position: 'absolute',
                  top: 24,
                  right: 21,
                  width: 70,
                  height: 70,
                  borderRadius: 16,
                  border: `1px solid rgba(255,255,255,${0.12 + saved * 0.2})`,
                  background: `rgba(10,10,9,${0.76 + saved * 0.18})`,
                  display: 'grid',
                  placeItems: 'center',
                  transform: `scale(${(1 - press * 0.08) * ringScale})`,
                  boxShadow: saved > 0 ? `0 0 ${35 * saved}px rgba(255,255,255,${0.12 * saved})` : 'none',
                }}
              >
                <Bookmark saved={saved > 0.18} progress={saved} />
              </div>
            </div>
          </div>
          <div style={{ height: 106, padding: '0 30px', display: 'flex', alignItems: 'center', gap: 14 }}>
            {['coming-of-age', 'summer', 'quiet longing'].map((tag) => (
              <span key={tag} style={{ border: `1px solid ${T.borderStrong}`, padding: '10px 14px', fontSize: 11, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.35)' }}>{tag}</span>
            ))}
          </div>
        </div>

        <MiniCard top={824} title="Ways of Seeing" glyph="☰" tint="#1e1a10" opacity={0.48} />
      </div>

      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 104,
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          transform: `translate(-50%, ${toastY}px)`,
          opacity: toast,
          padding: '18px 24px',
          borderRadius: 999,
          background: 'rgba(245,245,242,0.97)',
          color: '#0a0a09',
          boxShadow: '0 18px 60px rgba(0,0,0,0.38)',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ fontSize: 20 }}>✓</span>
        <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.12em' }}>SAVED TO CHECK OUT LATER</span>
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 78, borderTop: `1px solid ${T.border}`, background: 'rgba(10,10,9,0.98)', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        {['FEED', 'MAP', 'SAVED', 'PROFILE'].map((item, index) => (
          <div key={item} style={{ fontSize: 10, letterSpacing: '0.15em', color: index === 0 ? 'rgba(255,255,255,0.84)' : 'rgba(255,255,255,0.25)' }}>{item}</div>
        ))}
      </div>

      <Cursor x={cursorX} y={cursorY} press={press} opacity={cursorOpacity} />
    </AbsoluteFill>
  );
};
