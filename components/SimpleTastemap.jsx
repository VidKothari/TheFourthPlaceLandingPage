'use client';
import { useEffect, useRef } from 'react';

// A deliberately small taste of the taste map: clusters drift, lines breathe,
// hover names a node. No zoom, no merge, no controls — the gist, not the tool.

const CLUSTERS = [
  { x: -0.28, y: -0.16, color: '124, 107, 255', label: 'melancholy' },
  { x: 0.26, y: -0.22, color: '79, 195, 255', label: 'late nights' },
  { x: 0.3, y: 0.2, color: '122, 255, 198', label: 'other worlds' },
  { x: -0.22, y: 0.26, color: '255, 122, 61', label: 'longing' },
];

const TITLES = [
  ['Pyramid Song', 'Norwegian Wood', 'For Emma, Forever Ago'],
  ['A Brief History of Time', 'Stalker', 'the Wikipedia deep end'],
  ['Outer Wilds', 'Disco Elysium', 'The Left Hand of Darkness'],
  ['In the Mood for Love', 'Paterson', 'Call Me by Your Name'],
];

function mulberry(seed) {
  let s = seed;
  return () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildNodes() {
  const rand = mulberry(1971);
  const nodes = [];
  CLUSTERS.forEach((c, ci) => {
    const count = 11 + Math.floor(rand() * 3);
    for (let i = 0; i < count; i++) {
      nodes.push({
        cluster: ci,
        baseR: 0.045 + rand() * 0.13,
        speed: (0.05 + rand() * 0.12) * (rand() > 0.5 ? 1 : -1),
        phase: rand() * Math.PI * 2,
        size: 1.6 + rand() * 3.2,
        wobble: rand() * Math.PI * 2,
        title: i < 3 ? TITLES[ci][i] : null,
      });
    }
  });
  return nodes;
}

export default function SimpleTastemap() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const nodes = buildNodes();
    let raf = null;
    let running = false;
    let t = 0;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, cx: -1, cy: -1 };
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      pointer.cx = (e.clientX - rect.left) * dpr;
      pointer.cy = (e.clientY - rect.top) * dpr;
    };
    const onLeave = () => { pointer.tx = 0; pointer.ty = 0; pointer.cx = -1; pointer.cy = -1; };
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);

    const positions = new Array(nodes.length);

    const draw = () => {
      if (!running) return;
      t += 1 / 60;
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;

      const W = canvas.width;
      const H = canvas.height;
      const S = Math.min(W, H);
      ctx.clearRect(0, 0, W, H);

      const rot = t * 0.02;
      const cosR = Math.cos(rot);
      const sinR = Math.sin(rot);
      const px = pointer.x * S * 0.02;
      const py = pointer.y * S * 0.02;

      // node positions
      nodes.forEach((n, i) => {
        const c = CLUSTERS[n.cluster];
        // cluster center, gently rotated around the middle
        const ccx = c.x * cosR - c.y * sinR;
        const ccy = c.x * sinR + c.y * cosR;
        const a = n.phase + t * n.speed;
        const r = n.baseR * (1 + Math.sin(t * 0.35 + n.wobble) * 0.06);
        const depth = 0.8 + 0.4 * Math.sin(a + n.wobble); // fake parallax depth
        positions[i] = {
          x: W / 2 + (ccx + Math.cos(a) * r) * S + px * depth,
          y: H / 2 + (ccy + Math.sin(a) * r * 0.85) * S + py * depth,
          depth,
        };
      });

      // lines within clusters
      ctx.lineWidth = 0.6 * dpr;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (nodes[i].cluster !== nodes[j].cluster) continue;
          const dx = positions[i].x - positions[j].x;
          const dy = positions[i].y - positions[j].y;
          const d2 = dx * dx + dy * dy;
          const max = S * 0.12;
          if (d2 > max * max) continue;
          const alpha = 0.14 * (1 - Math.sqrt(d2) / max);
          ctx.strokeStyle = `rgba(${CLUSTERS[nodes[i].cluster].color}, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(positions[i].x, positions[i].y);
          ctx.lineTo(positions[j].x, positions[j].y);
          ctx.stroke();
        }
      }

      // hover hit test
      let hovered = -1;
      if (pointer.cx >= 0) {
        let best = 18 * dpr * (18 * dpr);
        nodes.forEach((n, i) => {
          if (!n.title) return;
          const dx = positions[i].x - pointer.cx;
          const dy = positions[i].y - pointer.cy;
          const d2 = dx * dx + dy * dy;
          if (d2 < best) { best = d2; hovered = i; }
        });
      }

      // nodes
      nodes.forEach((n, i) => {
        const p = positions[i];
        const col = CLUSTERS[n.cluster].color;
        const sz = n.size * dpr * (hovered === i ? 1.6 : 1) * (0.75 + p.depth * 0.35);
        ctx.fillStyle = `rgba(${col}, 0.1)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, sz * 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${col}, ${hovered === i ? 1 : 0.85})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, sz, 0, Math.PI * 2);
        ctx.fill();
      });

      // center node — you
      ctx.fillStyle = 'rgba(255,255,255,0.12)';
      ctx.beginPath();
      ctx.arc(W / 2 + px, H / 2 + py, 13 * dpr, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.95)';
      ctx.beginPath();
      ctx.arc(W / 2 + px, H / 2 + py, 4.5 * dpr, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = `${10 * dpr}px var(--sans), sans-serif`;
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.textAlign = 'center';
      ctx.fillText('YOU', W / 2 + px, H / 2 + py + 26 * dpr);

      // cluster labels
      ctx.font = `italic 300 ${15 * dpr}px var(--serif), serif`;
      CLUSTERS.forEach((c) => {
        const ccx = c.x * cosR - c.y * sinR;
        const ccy = c.x * sinR + c.y * cosR;
        ctx.fillStyle = 'rgba(255,255,255,0.34)';
        ctx.fillText(c.label, W / 2 + ccx * S + px, H / 2 + ccy * S + py - S * 0.1);
      });

      // hover tooltip
      if (hovered >= 0) {
        const p = positions[hovered];
        const label = nodes[hovered].title;
        ctx.font = `italic 300 ${16 * dpr}px var(--serif), serif`;
        const w = ctx.measureText(label).width;
        const tx = Math.min(Math.max(p.x, w / 2 + 12 * dpr), W - w / 2 - 12 * dpr);
        ctx.fillStyle = 'rgba(10,10,9,0.85)';
        ctx.fillRect(tx - w / 2 - 10 * dpr, p.y - 40 * dpr, w + 20 * dpr, 26 * dpr);
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.lineWidth = dpr;
        ctx.strokeRect(tx - w / 2 - 10 * dpr, p.y - 40 * dpr, w + 20 * dpr, 26 * dpr);
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.fillText(label, tx, p.y - 22 * dpr);
      }

      raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(draw);
        } else if (!entry.isIntersecting) {
          running = false;
          if (raf) cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.05 }
    );
    io.observe(canvas);

    return () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: 'min(72vh, 640px)', display: 'block', cursor: 'crosshair' }}
      aria-label="A small preview of a taste map: colored constellation clusters labelled melancholy, late nights, other worlds, and longing"
    />
  );
}
