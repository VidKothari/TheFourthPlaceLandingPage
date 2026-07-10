import React from 'react';
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { SERIF, UI, T, labelUpper, TYPE_BG } from './tokens';

const TYPES = [
  { icon: '♪', label: 'SONG' },
  { icon: '◫', label: 'ALBUM' },
  { icon: '◈', label: 'FILM' },
  { icon: '☰', label: 'BOOK' },
];

const QUERY = 'Pyramid Song';
const NOTE = 'The strings at the end undo me every time.';
const TAGS = ['melancholy', '2am', 'floating'];

// The user's existing library, visible behind the search panel.
const LIBRARY = [
  'movie1', 'book2', 'music2', 'movie4', 'book3', 'music3',
  'movie2', 'book5', 'music6', 'movie5', 'book7', 'movie7',
];

export const AddFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const panelIn = spring({ frame, fps, config: { damping: 200 } });
  const tabLit = interpolate(frame, [8, 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const typed = QUERY.slice(0, Math.round(interpolate(frame, [14, 36], [0, QUERY.length], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })));
  const rowIn = interpolate(frame, [38, 48], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rowPress = frame >= 52 && frame <= 56 ? 0.97 : 1;

  const MODAL_AT = 58;
  const modalScale = spring({ frame: frame - MODAL_AT, fps, config: { damping: 14, stiffness: 160 } });
  const modalVisible = frame >= MODAL_AT;

  const noteTyped = NOTE.slice(0, Math.round(interpolate(frame, [72, 112], [0, NOTE.length], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })));
  const tagIn = (i: number) =>
    interpolate(frame, [116 + i * 7, 123 + i * 7], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const visSel = interpolate(frame, [140, 146], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const btnPress = frame >= 152 && frame <= 157 ? 0.97 : 1;
  const adding = frame >= 156;
  const done = interpolate(frame, [164, 172], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: T.paper, fontFamily: UI, justifyContent: 'center', alignItems: 'center' }}>
      {/* The library — thumbnails behind everything, like the open collection */}
      <AbsoluteFill style={{ padding: 30, opacity: modalVisible ? 0.1 : 0.22 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
          {LIBRARY.map((name, i) => (
            <div key={name} style={{ border: `1px solid ${T.border}`, background: T.surface, overflow: 'hidden', height: 300 }}>
              <Img src={staticFile(`${name}.webp`)} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} />
            </div>
          ))}
        </div>
      </AbsoluteFill>

      {/* Search panel */}
      <div
        style={{
          width: 700,
          opacity: modalVisible ? 0.2 : panelIn,
          transform: `translateY(${(1 - panelIn) * 30}px) scale(${rowPress})`,
          border: `1px solid ${T.borderStrong}`,
          background: T.paper,
        }}
      >
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
            <div style={{ display: 'flex', gap: 22, marginBottom: 34 }}>
              <div style={{ width: 84, height: 84, background: TYPE_BG.song, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34, color: 'rgba(17,17,16,0.4)' }}>♪</div>
              <div>
                <span style={labelUpper}>Song</span>
                <div style={{ fontFamily: SERIF, fontSize: 34, fontWeight: 300, color: T.ink, lineHeight: 1.2 }}>Pyramid Song</div>
                <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', marginTop: 5 }}>Radiohead · 2001</div>
              </div>
            </div>

            {/* Note — being written */}
            <div style={{ marginBottom: 30 }}>
              <span style={{ ...labelUpper, marginBottom: 10 }}>What does this mean to you?</span>
              <div style={{ borderBottom: `1px solid ${T.borderStrong}`, padding: '10px 0 14px', fontSize: 18, fontWeight: 300, minHeight: 46 }}>
                {noteTyped ? (
                  <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 21, color: 'rgba(255,255,255,0.75)' }}>
                    {noteTyped}
                    {noteTyped.length < NOTE.length && <span style={{ opacity: frame % 18 < 9 ? 1 : 0 }}>|</span>}
                  </span>
                ) : (
                  <span style={{ color: 'rgba(255,255,255,0.22)' }}>A note, a feeling, a memory… @mention a friend</span>
                )}
              </div>
            </div>

            <div style={{ marginBottom: 30 }}>
              <span style={{ ...labelUpper, marginBottom: 10 }}>Clusters / Tags</span>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12, minHeight: 36 }}>
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
            </div>

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
