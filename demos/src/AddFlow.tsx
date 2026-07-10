import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { SERIF, UI, T, labelUpper, TYPE_BG } from './tokens';

const TYPES = [
  { icon: '♪', label: 'SONG' },
  { icon: '◫', label: 'ALBUM' },
  { icon: '◈', label: 'FILM' },
  { icon: '☰', label: 'BOOK' },
];

const QUERY = 'Pyramid Song';
const TAGS = ['melancholy', '2am', 'floating'];

export const AddFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: search panel
  const panelIn = spring({ frame, fps, config: { damping: 200 } });
  const tabLit = interpolate(frame, [8, 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const typed = QUERY.slice(0, Math.round(interpolate(frame, [14, 38], [0, QUERY.length], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })));
  const rowIn = interpolate(frame, [40, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rowPress = frame >= 54 && frame <= 58 ? 0.97 : 1;

  // Phase 2: modal
  const MODAL_AT = 60;
  const modalScale = spring({ frame: frame - MODAL_AT, fps, config: { damping: 14, stiffness: 160 } });
  const modalVisible = frame >= MODAL_AT;
  const tagIn = (i: number) =>
    interpolate(frame, [84 + i * 8, 92 + i * 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const visSel = interpolate(frame, [112, 118], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const btnPress = frame >= 126 && frame <= 131 ? 0.97 : 1;
  const adding = frame >= 130;
  const done = interpolate(frame, [138, 146], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: T.paper, fontFamily: UI, justifyContent: 'center', alignItems: 'center' }}>
      {/* Search panel */}
      <div
        style={{
          width: 700,
          opacity: modalVisible ? 0.25 : panelIn,
          transform: `translateY(${(1 - panelIn) * 30}px) scale(${rowPress})`,
          border: `1px solid ${T.border}`,
          background: T.paper,
        }}
      >
        {/* Type tabs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 7, padding: '15px 17px', borderBottom: `1px solid ${T.border}` }}>
          {TYPES.map((t, i) => {
            const sel = i === 0 ? tabLit : 0;
            return (
              <div
                key={t.label}
                style={{
                  padding: '12px 6px',
                  textAlign: 'center',
                  background: `rgba(255,255,255,${0.03 + sel * 0.07})`,
                  border: `1px solid rgba(255,255,255,${0.08 + sel * 0.14})`,
                  color: `rgba(255,255,255,${0.32 + sel * 0.53})`,
                }}
              >
                <div style={{ fontSize: 22 }}>{t.icon}</div>
                <div style={{ fontSize: 13, letterSpacing: '0.08em', marginTop: 4 }}>{t.label}</div>
              </div>
            );
          })}
        </div>

        {/* Search input */}
        <div style={{ padding: '20px 28px 8px' }}>
          <div style={{ borderBottom: '1.5px solid rgba(255,255,255,0.12)', padding: '13px 0', fontSize: 20, fontWeight: 300 }}>
            {typed ? (
              <span style={{ color: T.ink }}>
                {typed}
                <span style={{ opacity: frame % 20 < 10 ? 1 : 0 }}>|</span>
              </span>
            ) : (
              <span style={{ color: 'rgba(255,255,255,0.22)' }}>Search songs…</span>
            )}
          </div>
        </div>

        {/* Result row */}
        <div
          style={{
            opacity: rowIn,
            transform: `translateY(${(1 - rowIn) * 12}px)`,
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            padding: '17px 28px 24px',
          }}
        >
          <div style={{ width: 62, height: 62, background: TYPE_BG.song, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, color: 'rgba(17,17,16,0.4)' }}>♪</div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 300, color: T.ink }}>Pyramid Song</div>
            <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.42)', marginTop: 4 }}>Radiohead · 2001</div>
          </div>
        </div>
      </div>

      {/* Add modal */}
      {modalVisible && (
        <AbsoluteFill style={{ background: 'rgba(10,10,9,0.6)', justifyContent: 'center', alignItems: 'center' }}>
          <div
            style={{
              width: 640,
              background: T.paper,
              border: `1px solid ${T.borderStrong}`,
              padding: 44,
              transform: `scale(${0.9 + modalScale * 0.1})`,
              opacity: Math.min(1, modalScale * 1.4),
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', gap: 22, marginBottom: 34 }}>
              <div style={{ width: 84, height: 84, background: TYPE_BG.song, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34, color: 'rgba(17,17,16,0.4)' }}>♪</div>
              <div>
                <span style={labelUpper}>Song</span>
                <div style={{ fontFamily: SERIF, fontSize: 34, fontWeight: 300, color: T.ink, lineHeight: 1.2 }}>Pyramid Song</div>
                <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', marginTop: 5 }}>Radiohead · 2001</div>
              </div>
            </div>

            {/* Note */}
            <div style={{ marginBottom: 30 }}>
              <span style={{ ...labelUpper, marginBottom: 10 }}>What does this mean to you?</span>
              <div style={{ borderBottom: `1px solid ${T.borderStrong}`, padding: '10px 0 14px', fontSize: 17, fontWeight: 300, color: 'rgba(255,255,255,0.22)' }}>
                A note, a feeling, a memory… @mention a friend
              </div>
            </div>

            {/* Tags */}
            <div style={{ marginBottom: 30 }}>
              <span style={{ ...labelUpper, marginBottom: 10 }}>Clusters / Tags</span>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
                {TAGS.map((tag, i) => (
                  <div
                    key={tag}
                    style={{
                      opacity: tagIn(i),
                      transform: `translateY(${(1 - tagIn(i)) * 8}px)`,
                      background: T.surface,
                      border: `1px solid ${T.border}`,
                      padding: '7px 16px',
                      fontSize: 14,
                      letterSpacing: '0.1em',
                      color: T.ink,
                    }}
                  >
                    {tag} <span style={{ color: 'rgba(255,255,255,0.3)', marginLeft: 8 }}>×</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visibility */}
            <div style={{ marginBottom: 38 }}>
              <span style={{ ...labelUpper, marginBottom: 10 }}>Visibility</span>
              <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                {['Public', 'Friends', 'Private'].map((v, i) => {
                  const sel = i === 1 ? visSel : 0;
                  return (
                    <div
                      key={v}
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        padding: '11px 0',
                        fontSize: 13,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        background: sel > 0.5 ? T.ink : 'transparent',
                        color: sel > 0.5 ? '#0a0a09' : 'rgba(255,255,255,0.45)',
                        border: sel > 0.5 ? `1px solid ${T.ink}` : `1px solid ${T.borderStrong}`,
                      }}
                    >
                      {v}
                    </div>
                  );
                })}
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.32)', marginTop: 9 }}>Friends only</div>
            </div>

            {/* Footer */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 18, alignItems: 'center' }}>
              <div style={{ border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.65)', padding: '13px 34px', fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500 }}>
                Cancel
              </div>
              <div
                style={{
                  background: 'rgba(255,255,255,0.9)',
                  color: '#0a0a09',
                  padding: '13px 34px',
                  fontSize: 13,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  transform: `scale(${btnPress})`,
                }}
              >
                {adding ? 'Adding…' : 'Add to collection'}
              </div>
            </div>
          </div>

          {/* Added confirmation */}
          {done > 0 && (
            <AbsoluteFill style={{ background: T.paper, justifyContent: 'center', alignItems: 'center', opacity: done }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: SERIF, fontSize: 44, fontWeight: 300, color: T.ink }}>Added ✓</div>
                <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.35)', marginTop: 12, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  On your map
                </div>
              </div>
            </AbsoluteFill>
          )}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
