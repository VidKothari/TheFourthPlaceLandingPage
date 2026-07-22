import React from 'react';
import { AbsoluteFill, Img, interpolate, random, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { SERIF, SERIF_ITALIC, UI } from './tokens';

// ─────────────────────────────────────────────────────────────────────────
// MERGE — the TasteMap, rebuilt to mirror public/tastemap-preview-riso.html:
// paper ground, poster-node grid matted in each owner's ink (magenta = you,
// cobalt = maya), serif cluster placards, a paper legend, two avatar chips.
// Your posters drift into clusters, Maya's fly in, then the shared posters turn
// gold, stamp a SHARED badge and converge to the centre between the two avatars
// with gold threads. All motion is spring/long-ease — clean, no cuts.
// ─────────────────────────────────────────────────────────────────────────

const W = 900;
const H = 1125;
const PAPER = '#e6dabe';
const PAPER2 = '#efece6';
const INK = '#161310';
const MAGENTA = '#e5399f';
const COBALT = '#2b3fb8';
const GOLD = '#b8963e';        // thread / legend gold (map's desat gold)
const GOLD_FRAME = '#e8b53e';  // brighter gold for the shared frames + badges
const CHROME = 'rgba(255,255,255,0.55)';

const COVERS = [
  'movie1.webp', 'movie2.webp', 'movie4.webp', 'movie5.webp', 'movie7.webp',
  'music2.webp', 'music3.webp', 'music6.webp',
  'book2.webp', 'book3.webp', 'book5.webp', 'book7.webp',
];

const CLUSTERS = [
  { cx: 250, cy: 360, label: 'late films', accent: MAGENTA },
  { cx: 660, cy: 470, label: 'the records', accent: COBALT },
  { cx: 410, cy: 800, label: 'the shelf', accent: MAGENTA },
];

type Node = {
  id: number;
  cx: number; cy: number;   // clustered home
  sx: number; sy: number;   // scattered start
  size: number;
  owner: 'you' | 'maya';
  cluster: number;
  cover: string;
  rot: number;
  shared: boolean;
  // converge target (only used by shared)
  tx: number; ty: number;
  tsize: number;
};

// 2x2 converge grid, centred between the avatars
const CONVERGE = [
  { x: 380, y: 512 }, { x: 520, y: 512 },
  { x: 380, y: 652 }, { x: 520, y: 652 },
];

const buildNodes = (): Node[] => {
  const nodes: Node[] = [];
  let id = 0;
  let sharedAssigned = 0;
  for (let c = 0; c < CLUSTERS.length; c++) {
    const cl = CLUSTERS[c];
    const youCount = 6;
    const mayaCount = 4;
    const total = youCount + mayaCount;
    for (let i = 0; i < total; i++) {
      const owner: 'you' | 'maya' = i < youCount ? 'you' : 'maya';
      const seed = `${c}-${i}`;
      const ang = random(seed + 'a') * Math.PI * 2;
      const rad = 42 + random(seed + 'r') * 118;
      const size = 40 + random(seed + 's') * 26;
      // one shared poster per cluster + a 4th in cluster 0
      const makeShared = (i === 2) || (c === 0 && i === 4);
      const shared = makeShared && sharedAssigned < CONVERGE.length;
      const conv = shared ? CONVERGE[sharedAssigned] : { x: 0, y: 0 };
      if (shared) sharedAssigned++;
      nodes.push({
        id,
        cx: cl.cx + Math.cos(ang) * rad,
        cy: cl.cy + Math.sin(ang) * rad * 0.82,
        sx: owner === 'you' ? 70 + random(seed + 'x') * (W - 200) : cl.cx + Math.cos(ang) * (rad + 520),
        sy: owner === 'you' ? 90 + random(seed + 'y') * (H - 260) : cl.cy + Math.sin(ang) * (rad + 520),
        size,
        owner,
        cluster: c,
        cover: COVERS[id % COVERS.length],
        rot: (random(seed + 'rot') - 0.5) * 9,
        shared,
        tx: conv.x, ty: conv.y, tsize: 96,
      });
      id++;
    }
  }
  return nodes;
};

const NODES = buildNodes();

// two avatars the shared items converge between
const YOU_AV = { x: 150, y: 582, ink: MAGENTA, label: 'you' };
const MAYA_AV = { x: 750, y: 582, ink: COBALT, label: 'maya' };

export const Merge: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1 — your posters gather (spring, staggered per node)
  const youGather = (i: number) =>
    spring({ frame: frame - 2 - (i % 6) * 2, fps, config: { damping: 100, stiffness: 46 } });
  // legend + cluster placards
  const legendIn = interpolate(frame, [10, 26], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelIn = interpolate(frame, [44, 62], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  // Phase 2 — maya flies in
  const mayaGather = (i: number) =>
    spring({ frame: frame - 62 - (i % 4) * 3, fps, config: { damping: 100, stiffness: 42 } });
  const mayaLegendIn = interpolate(frame, [66, 84], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const avatarsIn = spring({ frame: frame - 74, fps, config: { damping: 14, stiffness: 120 } });
  // Phase 3 — converge + gold
  const converge = spring({ frame: frame - 104, fps, config: { damping: 100, stiffness: 34 } });
  const goldIn = interpolate(frame, [108, 128], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dim = interpolate(frame, [108, 130], [1, 0.28], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgePop = (i: number) => spring({ frame: frame - (118 + i * 4), fps, config: { damping: 11, stiffness: 220 } });
  const captionIn = interpolate(frame, [126, 144], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pulse = 1 + Math.sin(frame / 6) * 0.06 * goldIn;
  // self-closing wash to the empty paper ground so the clip loops seamlessly
  // (independent of LoopClose, which the scene's z-indexed layers would fight)
  const closeVeil = interpolate(frame, [147, 164], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const legendShow = interpolate(frame, [6, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const posOf = (n: Node, gather: number) => {
    // scatter -> cluster
    const home = { x: n.sx + (n.cx - n.sx) * gather, y: n.sy + (n.cy - n.sy) * gather };
    if (!n.shared) return { x: home.x, y: home.y, size: n.size };
    // cluster -> converge target
    const x = home.x + (n.tx - home.x) * converge;
    const y = home.y + (n.ty - home.y) * converge;
    const size = n.size + (n.tsize - n.size) * converge;
    return { x, y, size };
  };

  const sharedNodes = NODES.filter((n) => n.shared);

  return (
    <AbsoluteFill style={{ background: PAPER, fontFamily: UI }}>
      {/* paper grain wash */}
      <AbsoluteFill style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.35), transparent 55%)', opacity: 0.7 }} />

      {/* gold threads from avatars to converged shared posters */}
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {goldIn > 0 && sharedNodes.map((n, i) => {
          const p = posOf(n, 1);
          return (
            <g key={`thread-${i}`}>
              <line x1={YOU_AV.x} y1={YOU_AV.y} x2={p.x} y2={p.y} stroke={GOLD} strokeWidth={1.2} opacity={0.5 * goldIn * converge} />
              <line x1={MAYA_AV.x} y1={MAYA_AV.y} x2={p.x} y2={p.y} stroke={GOLD} strokeWidth={1.2} opacity={0.5 * goldIn * converge} />
            </g>
          );
        })}
        {/* faint intra-cluster webbing */}
        {NODES.map((a, i) =>
          NODES.slice(i + 1).map((b, j) => {
            if (a.cluster !== b.cluster || a.shared || b.shared) return null;
            const ga = a.owner === 'you' ? youGather(a.id) : mayaGather(a.id);
            const gb = b.owner === 'you' ? youGather(b.id) : mayaGather(b.id);
            const pa = posOf(a, ga); const pb = posOf(b, gb);
            const d = Math.hypot(pa.x - pb.x, pa.y - pb.y);
            if (d > 150) return null;
            return (
              <line key={`web-${i}-${j}`} x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
                stroke={INK} strokeWidth={0.5} opacity={0.1 * Math.min(ga, gb) * dim} />
            );
          })
        )}
      </svg>

      {/* gold halo behind the converged set */}
      {goldIn > 0 && (
        <div
          style={{
            position: 'absolute', left: 450, top: 582,
            width: 320, height: 320,
            transform: `translate(-50%, -50%) scale(${converge})`,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(232,181,62,0.20), transparent 68%)',
            opacity: goldIn, zIndex: 20, pointerEvents: 'none',
          }}
        />
      )}

      {/* poster nodes */}
      {NODES.map((n) => {
        const gather = n.owner === 'you' ? youGather(n.id) : mayaGather(n.id);
        const appear = n.owner === 'you' ? youGather(n.id) : mayaGather(n.id);
        const p = posOf(n, gather);
        const isGold = n.shared && goldIn > 0;
        const matColor = isGold ? GOLD_FRAME : n.owner === 'you' ? MAGENTA : COBALT;
        const size = p.size * (isGold ? pulse : 1);
        const nodeDim = n.shared ? 1 : dim;
        return (
          <div
            key={n.id}
            style={{
              position: 'absolute',
              left: p.x, top: p.y,
              width: size, height: size,
              transform: `translate(-50%, -50%) rotate(${n.shared ? n.rot * (1 - converge) : n.rot}deg) scale(${Math.max(0.001, Math.min(1.15, appear))})`,
              opacity: Math.min(1, appear * 1.2) * nodeDim,
              padding: isGold ? 5 : 3,
              background: '#1a1712',
              border: `${isGold ? 4 : 2}px solid ${matColor}`,
              boxShadow: isGold ? `0 0 ${26 * goldIn}px ${GOLD_FRAME}, 0 6px 16px rgba(17,17,16,0.3)` : '0 5px 14px rgba(17,17,16,0.22)',
              boxSizing: 'border-box',
              zIndex: n.shared ? 30 : 5,
            }}
          >
            <Img src={staticFile(n.cover)} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        );
      })}

      {/* SHARED badges on converged posters */}
      {sharedNodes.map((n, i) => {
        const p = posOf(n, 1);
        const s = Math.min(1, badgePop(i));
        if (s <= 0) return null;
        return (
          <div
            key={`badge-${i}`}
            style={{
              position: 'absolute',
              left: p.x, top: p.y - p.size / 2 - 6,
              transform: `translate(-50%, -100%) scale(${s}) rotate(-3deg)`,
              background: GOLD_FRAME, color: INK,
              fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700,
              padding: '4px 9px', zIndex: 40, whiteSpace: 'nowrap',
              boxShadow: '0 4px 12px rgba(17,17,16,0.35)',
            }}
          >
            ✦ Shared
          </div>
        );
      })}

      {/* cluster placards */}
      {CLUSTERS.map((c, i) => {
        const anyConverged = converge;
        const fade = i === 0 || i === 2 ? 1 - anyConverged * 0.55 : 1 - anyConverged * 0.35;
        return (
          <div
            key={c.label}
            style={{
              position: 'absolute', left: c.cx, top: c.cy - 4,
              transform: 'translate(-50%, -50%)',
              fontFamily: SERIF_ITALIC, fontStyle: 'italic', fontWeight: 500,
              fontSize: 26, color: INK, opacity: labelIn * fade,
              background: CHROME, border: `2px solid ${INK}`,
              padding: '3px 13px 5px', pointerEvents: 'none', whiteSpace: 'nowrap',
              zIndex: 6,
            }}
          >
            {c.label}
          </div>
        );
      })}

      {/* avatars */}
      {[YOU_AV, MAYA_AV].map((av) => (
        <div
          key={av.label}
          style={{
            position: 'absolute', left: av.x, top: av.y,
            transform: `translate(-50%, -50%) scale(${Math.max(0.001, avatarsIn)})`,
            opacity: Math.min(1, avatarsIn),
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            zIndex: 35, pointerEvents: 'none',
          }}
        >
          <div style={{ width: 66, height: 66, borderRadius: '50%', background: av.ink, border: `3px solid ${PAPER2}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: SERIF, fontSize: 30, fontWeight: 400, boxShadow: `0 6px 18px ${av.ink}55` }}>
            {av.label === 'you' ? 'Y' : 'M'}
          </div>
          <div style={{ background: CHROME, border: `2px solid ${INK}`, padding: '2px 9px', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: INK, fontWeight: 600 }}>{av.label}</div>
        </div>
      ))}

      {/* legend */}
      <div style={{ position: 'absolute', top: 40, left: 44, display: 'flex', gap: 24, alignItems: 'center', border: `2px solid ${INK}`, background: CHROME, padding: '11px 16px', zIndex: 50, opacity: legendShow }}>
        <span style={{ display: 'flex', gap: 9, alignItems: 'center', opacity: legendIn }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: MAGENTA }} />
          <span style={{ fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', color: INK, fontWeight: 500 }}>you</span>
        </span>
        <span style={{ display: 'flex', gap: 9, alignItems: 'center', opacity: mayaLegendIn }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: COBALT }} />
          <span style={{ fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', color: INK, fontWeight: 500 }}>maya</span>
        </span>
        <span style={{ display: 'flex', gap: 9, alignItems: 'center', opacity: goldIn }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: GOLD }} />
          <span style={{ fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', color: INK, fontWeight: 500 }}>shared</span>
        </span>
      </div>

      {/* caption placard */}
      <div
        style={{
          position: 'absolute', bottom: 54, left: '50%', transform: 'translateX(-50%)',
          opacity: captionIn,
          fontFamily: SERIF_ITALIC, fontStyle: 'italic', fontWeight: 500,
          fontSize: 30, color: INK,
          background: CHROME, border: `2px solid ${INK}`,
          padding: '10px 20px 12px', whiteSpace: 'nowrap', zIndex: 50,
        }}
      >
        What you share glows gold.
      </div>

      {/* closing wash to empty paper — seamless loop back to frame 0 */}
      <AbsoluteFill style={{ background: PAPER, opacity: closeVeil, zIndex: 900, pointerEvents: 'none' }} />
    </AbsoluteFill>
  );
};
