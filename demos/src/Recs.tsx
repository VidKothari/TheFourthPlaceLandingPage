import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { SERIF, UI, T, TYPE_BG, avatarColor } from './tokens';

const Avatar: React.FC<{ seed: string; name: string; size: number }> = ({ seed, name, size }) => (
  <div
    style={{
      width: size, height: size, borderRadius: '50%',
      background: avatarColor(seed),
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: SERIF, fontSize: size * 0.42, color: 'rgba(17,17,16,0.65)',
      flexShrink: 0,
    }}
  >
    {name.charAt(0).toUpperCase()}
  </div>
);

const Row: React.FC<{
  icon: string; bg: string; title: string; creator: string; time: string;
  state: 'pending' | 'added'; addedProgress: number; inProgress: number; press: boolean;
}> = ({ icon, bg, title, creator, time, state, addedProgress, inProgress, press }) => {
  const dim = state === 'added' ? 1 - addedProgress * 0.45 : 1;
  return (
    <div
      style={{
        opacity: inProgress * dim,
        transform: `translateY(${(1 - inProgress) * 14}px)`,
        display: 'flex', alignItems: 'center', gap: 20,
        padding: '22px 0', borderBottom: `0.5px solid ${T.border}`,
      }}
    >
      <div style={{ width: 68, height: 68, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, color: bg === '#16151a' ? 'rgba(255,255,255,0.28)' : 'rgba(17,17,16,0.4)', flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 20, fontWeight: 300, color: T.ink }}>{title}</div>
        <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.42)', marginTop: 4 }}>{creator}</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)', marginTop: 5 }}>{time}</div>
      </div>
      {state === 'pending' || addedProgress < 0.5 ? (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div
            style={{
              background: 'rgba(255,255,255,0.9)', color: '#0a0a09',
              padding: '9px 20px', fontSize: 13, letterSpacing: '0.12em',
              textTransform: 'uppercase', fontWeight: 600,
              transform: `scale(${press ? 0.94 : 1})`,
            }}
          >
            Add
          </div>
          <div style={{ border: `1px solid ${T.border}`, color: 'rgba(255,255,255,0.45)', padding: '9px 20px', fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500 }}>
            Discard
          </div>
        </div>
      ) : (
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.32)', letterSpacing: '0.06em', opacity: addedProgress }}>Added ✓</div>
      )}
    </div>
  );
};

export const Recs: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headIn = spring({ frame, fps, config: { damping: 200 } });
  const row1In = interpolate(frame, [16, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const row2In = interpolate(frame, [28, 42], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const press = frame >= 70 && frame <= 76;
  const added = interpolate(frame, [78, 92], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: T.paper, fontFamily: UI, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 720 }}>
        {/* Back link + header */}
        <div style={{ opacity: headIn, transform: `translateY(${(1 - headIn) * 18}px)` }}>
          <div style={{ fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)', marginBottom: 26 }}>← Recs</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 12 }}>
            <Avatar seed="maya" name="Maya" size={58} />
            <div>
              <div style={{ fontFamily: SERIF, fontSize: 32, fontWeight: 300, color: T.ink }}>Recs by Maya</div>
              <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>@maya</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <Row
            icon="◈" bg={TYPE_BG.film}
            title="Stalker" creator="Andrei Tarkovsky · 1979" time="2h ago"
            state="added" addedProgress={added} inProgress={row1In} press={press}
          />
          <Row
            icon="♪" bg={TYPE_BG.song}
            title="A Love Supreme" creator="John Coltrane · 1965" time="1d ago"
            state="pending" addedProgress={0} inProgress={row2In} press={false}
          />
        </div>

        {/* Notified caption */}
        <div
          style={{
            marginTop: 30,
            fontSize: 14,
            color: 'rgba(255,255,255,0.32)',
            opacity: interpolate(frame, [96, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
          }}
        >
          Maya will be notified that you added it.
        </div>
      </div>
    </AbsoluteFill>
  );
};
