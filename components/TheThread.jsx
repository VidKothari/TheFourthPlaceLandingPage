/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function seededShuffle(arr, seed = 42) {
  const a = [...arr];
  let s = seed;
  const rand = () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; };
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const wikipediaImages = seededShuffle(Array.from({length: 14}, (_, i) => `/assets/wikipedia${i+1}.png`), 7);
const youtubeImages = seededShuffle([
  "/assets/youtubeVid.png",
  ...Array.from({length: 21}, (_, i) => `/assets/youtubeVid${i+2}.png`)
], 13);
const bookImages = seededShuffle(Array.from({length: 17}, (_, i) => `/assets/book${i+1}.jpg`), 31);
const movieImages = seededShuffle([
  ...Array.from({length: 10}, (_, i) => `/assets/movie${i+1}.jpg`),
  '/assets/movie11.jpg',
  ...Array.from({length: 9}, (_, i) => `/assets/movie${i+12}.jpg`)
], 57);
const musicianImages = seededShuffle([
  ...Array.from({length: 11}, (_, i) => {
    const name = i + 1;
    if ([3, 4, 6, 7, 8, 10].includes(name)) return `/assets/artist${name}wbg.png`;
    return `/assets/artist${name}.png`;
  })
], 88);
const songImages = seededShuffle([
  "/assets/music1.jpeg", "/assets/music2.png", "/assets/music3.jpg",
  "/assets/music4.jpg", "/assets/music5.jpg", "/assets/music6.jpeg",
  "/assets/music7.jpg", "/assets/music8.jpg", "/assets/music9.jpg",
  "/assets/music10.jpg", "/assets/music11.png"
], 99);

// Combined music gallery — avoids split-container clipping entirely
const musicImages = seededShuffle([...musicianImages, ...songImages], 77);

// Tune this single constant to make the whole section faster or slower
const STOP_HEIGHT = '280vh';

// Gallery start/end within each stop's own scrollYProgress (0→1)
const S = 0.05;
const E = 0.95;

const GalleryImage = ({ src, preserveRatio, track, index, sizeScale = 1, scrollYProgress }) => {
  let baseWidth;
  if (track === 'bg') baseWidth = (preserveRatio ? 300 : 210) * sizeScale;
  else if (track === 'mid') baseWidth = (preserveRatio ? 460 : 340) * sizeScale;
  else baseWidth = (preserveRatio ? 660 : 480) * sizeScale;

  const scatterAmp = track === 'bg' ? 30 : track === 'mid' ? 20 : 12;
  const yPct = track === 'bg'
    ? Math.sin(index * 2.1) * scatterAmp
    : track === 'mid'
    ? Math.cos(index * 1.7) * scatterAmp
    : Math.sin(index * 2.5) * scatterAmp;

  const rotation = (index % 2 === 0 ? 1 : -1) * (2 + (index % 3));
  const yMotion = useTransform(scrollYProgress, [S, E], [`${yPct}vh`, `${yPct - (track === 'fg' ? 10 : 5)}vh`]);
  const floatX = useTransform(scrollYProgress, [S, E], [0, Math.sin(index) * 40]);

  return (
    <motion.div
      style={{
        width: `${baseWidth}px`,
        height: preserveRatio ? 'auto' : `${baseWidth * 1.25}px`,
        flexShrink: 0,
        position: 'relative',
        y: yMotion,
        x: floatX,
        rotate: rotation,
        zIndex: track === 'fg' ? 3 : track === 'mid' ? 2 : 1,
        cursor: 'pointer',
      }}
      whileHover={{ scale: 1.07, rotate: 0, zIndex: 100, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
    >
      <img
        src={src}
        alt=""
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          objectFit: preserveRatio ? 'contain' : 'cover',
          borderRadius: '12px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
        }}
      />
    </motion.div>
  );
};

const Gallery = ({ imgSrc, preserveRatio, scrollYProgress, sizeScale = 1, gapScale = 1 }) => {
  const track3Count = Math.floor(imgSrc.length * 0.3);
  const track2Count = Math.floor(imgSrc.length * 0.4);
  const track3 = imgSrc.slice(0, track3Count);
  const track2 = imgSrc.slice(track3Count, track3Count + track2Count);
  const track1 = imgSrc.slice(track3Count + track2Count);

  const gap3 = (preserveRatio ? 200 : 150) * gapScale;
  const gap2 = (preserveRatio ? 300 : 200) * gapScale;
  const gap1 = (preserveRatio ? 400 : 300) * gapScale;

  // Each track starts off-screen right at different depths and ends off-screen left
  const dist3 = `${-(track3.length * ((preserveRatio ? 300 : 210) * sizeScale + gap3))}px`;
  const dist2 = `${-(track2.length * ((preserveRatio ? 460 : 340) * sizeScale + gap2))}px`;
  const dist1 = `${-(track1.length * ((preserveRatio ? 660 : 480) * sizeScale + gap1))}px`;

  // bg starts at viewport right edge, mid/fg start progressively further right
  // This staggers the layers so they don't all appear at once
  const x3 = useTransform(scrollYProgress, [S, E], ['100vw', dist3]);
  const x2 = useTransform(scrollYProgress, [S, E], ['130vw', dist2]);
  const x1 = useTransform(scrollYProgress, [S, E], ['160vw', dist1]);

  const opacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0, 1, 1, 0]);
  const pointerEv = useTransform(opacity, (v) => v > 0.05 ? 'auto' : 'none');

  return (
    <motion.div style={{
      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
      overflow: 'hidden', opacity, pointerEvents: pointerEv,
    }}>
      {/* Background track — smallest images, slowest */}
      <motion.div style={{ position: 'absolute', top: '50%', left: 0, display: 'flex', gap: `${gap3}px`, x: x3, y: '-50%', alignItems: 'center' }}>
        {track3.map((src, i) => (
          <GalleryImage key={`bg-${i}`} src={src} preserveRatio={preserveRatio} track="bg" index={i} sizeScale={sizeScale} scrollYProgress={scrollYProgress} />
        ))}
      </motion.div>

      {/* Mid track */}
      {track2.length > 0 && (
        <motion.div style={{ position: 'absolute', top: '50%', left: 0, display: 'flex', gap: `${gap2}px`, x: x2, y: '-50%', alignItems: 'center', marginLeft: '10vw' }}>
          {track2.map((src, i) => (
            <GalleryImage key={`mid-${i}`} src={src} preserveRatio={preserveRatio} track="mid" index={i} sizeScale={sizeScale} scrollYProgress={scrollYProgress} />
          ))}
        </motion.div>
      )}

      {/* Foreground track — largest images, leads the motion */}
      {track1.length > 0 && (
        <motion.div style={{ position: 'absolute', top: '50%', left: 0, display: 'flex', gap: `${gap1}px`, x: x1, y: '-50%', alignItems: 'center', marginLeft: '20vw' }}>
          {track1.map((src, i) => (
            <GalleryImage key={`fg-${i}`} src={src} preserveRatio={preserveRatio} track="fg" index={i} sizeScale={sizeScale} scrollYProgress={scrollYProgress} />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

const GalleryStop = ({ stopNum, title, subtitle, imgSrc, preserveRatio, sizeScale = 1, gapScale = 1, align = 'left' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const panelOpacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0, 1, 1, 0]);
  const panelY = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [40, 0, 0, -40]);
  const panelBlur = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], ['blur(16px)', 'blur(0px)', 'blur(0px)', 'blur(16px)']);

  const panelSide = align === 'left' ? { right: 'clamp(24px, 5vw, 60px)' } : { left: 'clamp(24px, 5vw, 60px)' };

  return (
    <div ref={ref} style={{ height: STOP_HEIGHT, position: 'relative', borderTop: '1px solid var(--border-crisp)' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

        <Gallery
          imgSrc={imgSrc}
          preserveRatio={preserveRatio}
          scrollYProgress={scrollYProgress}
          sizeScale={sizeScale}
          gapScale={gapScale}
        />

        {/* Stop counter — top left */}
        <div className="mobile-hide" style={{
          position: 'absolute', top: '32px', left: 'clamp(24px, 5vw, 60px)',
          fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 500,
          textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(0,0,0,0.35)',
          zIndex: 20,
        }}>
          {stopNum}
        </div>

        {/* Text panel */}
        <motion.div style={{
          position: 'absolute',
          top: '50%',
          ...panelSide,
          transform: 'translateY(-50%)',
          maxWidth: 'clamp(260px, 28vw, 400px)',
          textAlign: align === 'left' ? 'right' : 'left',
          background: 'rgba(250, 250, 248, 0.88)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          padding: 'clamp(24px, 3vw, 40px)',
          border: '1px solid var(--border-crisp)',
          borderRadius: '16px',
          zIndex: 10,
          opacity: panelOpacity,
          filter: panelBlur,
          y: panelY,
          pointerEvents: 'none',
        }}>
          <h3 style={{
            fontFamily: 'var(--serif)', fontWeight: 400, color: 'var(--text-pure)',
            fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)', lineHeight: 1.1, marginBottom: '12px',
          }}>
            {title}
          </h3>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
            color: 'var(--text-soft)', fontWeight: 300, lineHeight: 1.6,
          }}>
            {subtitle}
          </p>
        </motion.div>

      </div>
    </div>
  );
};

export default function TheThread() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (isMobile) return null;

  return (
    <section id="thread" style={{ background: 'var(--bg-off)' }}>

      {/* Section header */}
      <div style={{
        padding: 'clamp(32px, 4vw, 48px) clamp(24px, 5vw, 60px)',
        borderTop: '1px solid var(--border-crisp)',
        borderBottom: '1px solid var(--border-crisp)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 500,
          textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(0,0,0,0.4)',
        }}>
          II. The Exhibition
        </span>
        <span style={{
          fontFamily: 'var(--serif)', fontStyle: 'italic',
          fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', color: 'var(--text-soft)',
        }}>
          Scroll to explore
        </span>
      </div>

      <GalleryStop
        stopNum="I / V"
        title="The books that changed how you see the world."
        subtitle="Add the literature that fundamentally rewired your brain. The map builds itself from your honesty."
        imgSrc={bookImages}
        preserveRatio
        sizeScale={0.72}
        gapScale={2.2}
        align="left"
      />

      <GalleryStop
        stopNum="II / V"
        title="The films that broke something open."
        subtitle="A catalog of moving images that articulated a feeling you couldn't put into words."
        imgSrc={movieImages}
        preserveRatio
        sizeScale={0.68}
        gapScale={2.0}
        align="right"
      />

      <GalleryStop
        stopNum="III / V"
        title="Musicians & Songs."
        subtitle="Music isn't background noise here. It is the architectural foundation of your inner world."
        imgSrc={musicImages}
        preserveRatio
        sizeScale={0.7}
        gapScale={1.8}
        align="left"
      />

      <GalleryStop
        stopNum="IV / V"
        title="The 2AM Wikipedia spirals."
        subtitle="The obscure rabbit holes and essays that made you feel less alone in the world."
        imgSrc={wikipediaImages}
        sizeScale={0.8}
        gapScale={1.5}
        align="right"
      />

      <GalleryStop
        stopNum="V / V"
        title="The YouTube rabbit holes."
        subtitle="Video essays, obscure documentaries, music videos, and lectures you rewatch every year."
        imgSrc={youtubeImages}
        preserveRatio
        sizeScale={0.75}
        gapScale={1.6}
        align="left"
      />

    </section>
  );
}
