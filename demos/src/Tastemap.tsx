import React from 'react';
import { AbsoluteFill, interpolate, random, useCurrentFrame } from 'remotion';
import { SERIF_ITALIC, UI } from './tokens';

const W = 900;
const H = 1125;
const GOLD = '#e8c46a';

type Node = {
  x: number; y: number;       // final clustered position
  sx: number; sy: number;     // scattered start position
  r: number;
  cluster: number;
  owner: 'you' | 'maya';
  shared?: boolean;
};

const CLUSTERS = [
  { cx: 250, cy: 340, label: 'melancholy' },
  { cx: 640, cy: 480, label: '2am spirals' },
  { cx: 400, cy: 800, label: 'road trips' },
];

const mkNodes = (): Node[] => {
  const nodes: Node[] = [];
  let n = 0;
  // your nodes
  for (let c = 0; c < 3; c++) {
    const count = 9 + (c % 2) * 2;
    for (let i = 0; i < count; i++) {
      const seed = `you-${c}-${i}`;
      const ang = random(seed + 'a') * Math.PI * 2;
      const rad = 40 + random(seed + 'r') * 120;
      nodes.push({
        x: CLUSTERS[c].cx + Math.cos(ang) * rad,
        y: CLUSTERS[c].cy + Math.sin(ang) * rad * 0.85,
        sx: 60 + random(seed + 'sx') * (W - 120),
        sy: 60 + random(seed + 'sy') * (H - 260),
        r: 3 + random(seed + 'sz') * 5,
        cluster: c,
        owner: 'you',
        shared: n % 8 === 3, // a few become shared
      });
      n++;
    }
  }
  // maya's nodes — arrive later around the same clusters
  for (let c = 0; c < 3; c++) {
    for (let i = 0; i < 6; i++) {
      const seed = `maya-${c}-${i}`;
      const ang = random(seed + 'a') * Math.PI * 2;
      const rad = 50 + random(seed + 'r') * 140;
      nodes.push({
        x: CLUSTERS[c].cx + Math.cos(ang) * rad,
        y: CLUSTERS[c].cy + Math.sin(ang) * rad * 0.85,
        sx: CLUSTERS[c].cx + Math.cos(ang) * (rad + 400),
        sy: CLUSTERS[c].cy + Math.sin(ang) * (rad + 400),
        r: 3 + random(seed + 'sz') * 4.5,
        cluster: c,
        owner: 'maya',
        shared: i === 1, // one shared per cluster
      });
    }
  }
  return nodes;
};

const NODES = mkNodes();

export const Tastemap: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase 1: your nodes drift from scatter into clusters (0–55)
  const gather = interpolate(frame, [4, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const eased = 1 - Math.pow(1 - gather, 3);
  // cluster labels (55–70)
  const labelIn = interpolate(frame, [56, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  // Phase 2: maya's nodes fly in (72–100)
  const mayaIn = interpolate(frame, [72, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const mayaEased = 1 - Math.pow(1 - mayaIn, 3);
  // Phase 3: shared nodes glow gold (104–125)
  const goldIn = interpolate(frame, [104, 122], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pulse = 1 + Math.sin(frame / 5) * 0.18 * goldIn;
  const captionIn = interpolate(frame, [118, 132], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const pos = (node: Node) => {
    const t = node.owner === 'you' ? eased : mayaEased;
    return { x: node.sx + (node.x - node.sx) * t, y: node.sy + (node.y - node.sy) * t };
  };

  const sharedNodes = NODES.filter((nd) => nd.shared);

  return (
    <AbsoluteFill style={{ background: '#050508', fontFamily: UI, justifyContent: 'center', alignItems: 'center' }}>
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        {/* intra-cluster lines, appear as clusters settle */}
        {NODES.map((a, i) =>
          NODES.slice(i + 1).map((b, j) => {
            if (a.cluster !== b.cluster) return null;
            const pa = pos(a); const pb = pos(b);
            const d = Math.hypot(pa.x - pb.x, pa.y - pb.y);
            if (d > 130) return null;
            const visible = (a.owner === 'maya' || b.owner === 'maya') ? mayaEased : eased;
            const bothShared = a.shared && b.shared;
            return (
              <line
                key={`${i}-${j}`}
                x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
                stroke={bothShared && goldIn > 0 ? GOLD : 'rgba(160,180,255,0.75)'}
                strokeWidth={bothShared && goldIn > 0 ? 1.4 : 0.5}
                opacity={(bothShared ? 0.25 + goldIn * 0.6 : 0.16) * visible * Math.max(0.15, gather)}
              />
            );
          })
        )}

        {/* nodes */}
        {NODES.map((nd, i) => {
          const p = pos(nd);
          const base = nd.owner === 'you' ? 'rgba(190,205,255,0.95)' : 'rgba(140,235,215,0.95)';
          const isGold = nd.shared && goldIn > 0;
          const color = isGold ? GOLD : base;
          const visible = nd.owner === 'you' ? Math.min(1, gather * 3 + 0.25) : mayaEased;
          const r = nd.r * (isGold ? pulse * 1.35 : 1);
          return (
            <g key={i} opacity={visible}>
              <circle cx={p.x} cy={p.y} r={r * 3.2} fill={color} opacity={isGold ? 0.22 * goldIn : 0.07} />
              <circle cx={p.x} cy={p.y} r={r} fill={color} />
            </g>
          );
        })}

        {/* gold threads between shared pairs across owners */}
        {goldIn > 0 && sharedNodes.filter((nd) => nd.owner === 'you').map((a, i) => {
          const partner = sharedNodes.find((b) => b.owner === 'maya' && b.cluster === a.cluster);
          if (!partner) return null;
          const pa = pos(a); const pb = pos(partner);
          return (
            <line key={`gold-${i}`} x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
              stroke={GOLD} strokeWidth={1.6} opacity={0.75 * goldIn} />
          );
        })}
      </svg>

      {/* cluster labels */}
      {CLUSTERS.map((c) => (
        <div
          key={c.label}
          style={{
            position: 'absolute', left: c.cx, top: c.cy - 8,
            transform: 'translate(-50%, -50%)',
            fontFamily: SERIF_ITALIC, fontStyle: 'italic', fontWeight: 300,
            fontSize: 27, color: `rgba(255,255,255,${0.34 * labelIn})`,
            pointerEvents: 'none', whiteSpace: 'nowrap',
          }}
        >
          {c.label}
        </div>
      ))}

      {/* legend */}
      <div style={{ position: 'absolute', top: 36, left: 40, display: 'flex', gap: 26, alignItems: 'center' }}>
        <span style={{ display: 'flex', gap: 10, alignItems: 'center', opacity: Math.min(1, gather * 2) }}>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'rgba(190,205,255,0.95)' }} />
          <span style={{ fontSize: 15, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>you</span>
        </span>
        <span style={{ display: 'flex', gap: 10, alignItems: 'center', opacity: mayaEased }}>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'rgba(140,235,215,0.95)' }} />
          <span style={{ fontSize: 15, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>maya</span>
        </span>
        <span style={{ display: 'flex', gap: 10, alignItems: 'center', opacity: goldIn }}>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: GOLD }} />
          <span style={{ fontSize: 15, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>shared</span>
        </span>
      </div>

      {/* caption */}
      <div
        style={{
          position: 'absolute', bottom: 48, left: 0, right: 0,
          textAlign: 'center', opacity: captionIn,
          fontFamily: SERIF_ITALIC, fontStyle: 'italic', fontWeight: 300,
          fontSize: 30, color: 'rgba(255,255,255,0.6)',
        }}
      >
        What you share glows gold.
      </div>
    </AbsoluteFill>
  );
};
