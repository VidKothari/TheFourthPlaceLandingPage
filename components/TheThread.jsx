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

const wikipediaImages = seededShuffle(Array.from({length: 14}, (_, i) => `/assets/wikipedia${i+1}.webp`), 7);
const youtubeImages = seededShuffle([
  "/assets/youtubeVid.webp",
  ...Array.from({length: 21}, (_, i) => `/assets/youtubeVid${i+2}.webp`)
], 13);
const bookImages = seededShuffle(Array.from({length: 17}, (_, i) => `/assets/book${i+1}.webp`), 31);
const movieImages = seededShuffle([
  ...Array.from({length: 10}, (_, i) => `/assets/movie${i+1}.webp`),
  '/assets/movie11.webp',
  ...Array.from({length: 9}, (_, i) => `/assets/movie${i+12}.webp`),
  '/assets/movie21.webp',
], 57);
const musicianImages = seededShuffle([
  ...Array.from({length: 11}, (_, i) => {
    const name = i + 1;
    if ([3, 4, 6, 7, 8, 10].includes(name)) return `/assets/artist${name}wbg.webp`;
    return `/assets/artist${name}.webp`;
  })
], 88);
const songImages = seededShuffle([
  "/assets/music1.webp", "/assets/music2.webp", "/assets/music3.webp",
  "/assets/music4.webp", "/assets/music5.webp", "/assets/music6.webp",
  "/assets/music7.webp", "/assets/music8.webp", "/assets/music9.webp",
  "/assets/music10.webp", "/assets/music11.webp"
], 99);

const STOP_HEIGHT = '400vh';
const S = 0.05;
const E = 0.95;

const VW = 19.2; // reference viewport = 1920px

// Gallery center is shifted 5vh below midpoint to stay clear of the sticky nav
const GALLERY_CENTER = 'calc(50% + 5vh)';

const GalleryImage = ({ src, preserveRatio, track, index, sizeScale = 1, scrollYProgress }) => {
  let baseWidthVw;
  if (track === 'bg') baseWidthVw = (preserveRatio ? 300 : 210) * sizeScale / VW;
  else if (track === 'mid') baseWidthVw = (preserveRatio ? 460 : 340) * sizeScale / VW;
  else baseWidthVw = (preserveRatio ? 660 : 480) * sizeScale / VW;

  // Reduced scatter so items stay well within the viewport height
  const scatterAmp = track === 'bg' ? 22 : track === 'mid' ? 15 : 10;
  const yPct = track === 'bg'
    ? Math.sin(index * 2.1) * scatterAmp
    : track === 'mid'
    ? Math.cos(index * 1.7) * scatterAmp
    : Math.sin(index * 2.5) * scatterAmp;

  const rotation = (index % 2 === 0 ? 1 : -1) * (2 + (index % 3));
  const yMotion = useTransform(scrollYProgress, [S, E], [`${yPct}vh`, `${yPct - (track === 'fg' ? 10 : 5)}vh`]);
  const floatX = useTransform(scrollYProgress, [S, E], ['0vw', `${(Math.sin(index) * 2.08).toFixed(2)}vw`]);

  return (
    <motion.div
      style={{
        width: `${baseWidthVw}vw`,
        height: preserveRatio ? 'auto' : `${baseWidthVw * 1.25}vw`,
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
          borderRadius: '0.75rem',
          boxShadow: '0 1.25rem 3.125rem rgba(0,0,0,0.25)',
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

  const gap3vw = (preserveRatio ? 200 : 150) * gapScale / VW;
  const gap2vw = (preserveRatio ? 300 : 200) * gapScale / VW;
  const gap1vw = (preserveRatio ? 400 : 300) * gapScale / VW;

  const dist3 = `${-(track3.length * ((preserveRatio ? 300 : 210) * sizeScale / VW + gap3vw))}vw`;
  const dist2 = `${-(track2.length * ((preserveRatio ? 460 : 340) * sizeScale / VW + gap2vw))}vw`;
  const dist1 = `${-(track1.length * ((preserveRatio ? 660 : 480) * sizeScale / VW + gap1vw))}vw`;

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
      <motion.div style={{ position: 'absolute', top: GALLERY_CENTER, left: 0, display: 'flex', gap: `${gap3vw}vw`, x: x3, y: '-50%', alignItems: 'center' }}>
        {track3.map((src, i) => (
          <GalleryImage key={`bg-${i}`} src={src} preserveRatio={preserveRatio} track="bg" index={i} sizeScale={sizeScale} scrollYProgress={scrollYProgress} />
        ))}
      </motion.div>

      {track2.length > 0 && (
        <motion.div style={{ position: 'absolute', top: GALLERY_CENTER, left: 0, display: 'flex', gap: `${gap2vw}vw`, x: x2, y: '-50%', alignItems: 'center', marginLeft: '10vw' }}>
          {track2.map((src, i) => (
            <GalleryImage key={`mid-${i}`} src={src} preserveRatio={preserveRatio} track="mid" index={i} sizeScale={sizeScale} scrollYProgress={scrollYProgress} />
          ))}
        </motion.div>
      )}

      {track1.length > 0 && (
        <motion.div style={{ position: 'absolute', top: GALLERY_CENTER, left: 0, display: 'flex', gap: `${gap1vw}vw`, x: x1, y: '-50%', alignItems: 'center', marginLeft: '20vw' }}>
          {track1.map((src, i) => (
            <GalleryImage key={`fg-${i}`} src={src} preserveRatio={preserveRatio} track="fg" index={i} sizeScale={sizeScale} scrollYProgress={scrollYProgress} />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

const MusicConvergenceGallery = ({ scrollYProgress }) => {
  const mid = 0.5;
  const xConvLeft  = useTransform(scrollYProgress, [S, mid, E], ['0vw',  '12vw', '0vw']);
  const xConvRight = useTransform(scrollYProgress, [S, mid, E], ['0vw', '-12vw', '0vw']);
  const opacity    = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0, 1, 1, 0]);
  const pointerEv  = useTransform(opacity, (v) => v > 0.05 ? 'auto' : 'none');

  const musBg  = musicianImages.slice(0, 3);
  const musMid = musicianImages.slice(3, 7);
  const musFg  = musicianImages.slice(7);

  const mDistBg  = `${-(musBg.length  * (240 + 120) / VW)}vw`;
  const mDistMid = `${-(musMid.length * (340 + 150) / VW)}vw`;
  const mDistFg  = `${-(musFg.length  * (440 + 180) / VW)}vw`;

  const mxBg  = useTransform(scrollYProgress, [S, E], ['60vw',  mDistBg]);
  const mxMid = useTransform(scrollYProgress, [S, E], ['90vw',  mDistMid]);
  const mxFg  = useTransform(scrollYProgress, [S, E], ['120vw', mDistFg]);

  const songBg  = songImages.slice(0, 3);
  const songMid = songImages.slice(3, 7);
  const songFg  = songImages.slice(7);

  const sDistBg  = `${-(songBg.length  * (230 + 110) / VW)}vw`;
  const sDistMid = `${-(songMid.length * (300 + 140) / VW)}vw`;
  const sDistFg  = `${-(songFg.length  * (390 + 170) / VW)}vw`;

  const sxBg  = useTransform(scrollYProgress, [S, E], ['110vw', sDistBg]);
  const sxMid = useTransform(scrollYProgress, [S, E], ['140vw', sDistMid]);
  const sxFg  = useTransform(scrollYProgress, [S, E], ['170vw', sDistFg]);

  const hover = { scale: 1.07, rotate: 0, zIndex: 100, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } };

  return (
    <>
      {/* Left half — musicians, 3 layers */}
      <motion.div style={{
        position: 'absolute', top: 0, left: 0, width: '50vw', height: '100%',
        overflow: 'hidden', opacity, pointerEvents: pointerEv, x: xConvLeft,
      }}>
        {/* bg */}
        <motion.div style={{ position: 'absolute', top: '50%', left: 0, display: 'flex', gap: `${120/VW}vw`, x: mxBg, y: '-50%', alignItems: 'center', zIndex: 1 }}>
          {musBg.map((src, i) => (
            <motion.div key={i} style={{ height: `${240/VW}vw`, flexShrink: 0, rotate: (i%2===0?1:-1)*(1+(i%3)), cursor: 'pointer' }} whileHover={hover}>
              <img src={src} alt="" style={{ height: '100%', width: 'auto', display: 'block', objectFit: 'contain' }}/>
            </motion.div>
          ))}
        </motion.div>
        {/* mid */}
        <motion.div style={{ position: 'absolute', top: '50%', left: 0, display: 'flex', gap: `${150/VW}vw`, x: mxMid, y: '-50%', alignItems: 'center', marginLeft: '8vw', zIndex: 2 }}>
          {musMid.map((src, i) => (
            <motion.div key={i} style={{ height: `${340/VW}vw`, flexShrink: 0, rotate: (i%2===0?-1:1)*(2+(i%3)), cursor: 'pointer' }} whileHover={hover}>
              <img src={src} alt="" style={{ height: '100%', width: 'auto', display: 'block', objectFit: 'contain' }}/>
            </motion.div>
          ))}
        </motion.div>
        {/* fg */}
        <motion.div style={{ position: 'absolute', top: '50%', left: 0, display: 'flex', gap: `${180/VW}vw`, x: mxFg, y: '-50%', alignItems: 'center', marginLeft: '16vw', zIndex: 3 }}>
          {musFg.map((src, i) => (
            <motion.div key={i} style={{ height: `${440/VW}vw`, flexShrink: 0, rotate: (i%2===0?1:-1)*(3+(i%2)), cursor: 'pointer' }} whileHover={hover}>
              <img src={src} alt="" style={{ height: '100%', width: 'auto', display: 'block', objectFit: 'contain' }}/>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Right half — songs, 3 layers */}
      <motion.div style={{
        position: 'absolute', top: 0, left: '50vw', width: '50vw', height: '100%',
        overflow: 'hidden', opacity, pointerEvents: pointerEv, x: xConvRight,
      }}>
        {/* bg */}
        <motion.div style={{ position: 'absolute', top: '50%', left: 0, display: 'flex', gap: `${110/VW}vw`, x: sxBg, y: '-50%', alignItems: 'center', zIndex: 1 }}>
          {songBg.map((src, i) => (
            <motion.div key={i} style={{ width: `${230/VW}vw`, height: `${230/VW}vw`, flexShrink: 0, rotate: (i%2===0?-1:1)*(1+(i%3)), cursor: 'pointer' }} whileHover={hover}>
              <img src={src} alt="" style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover', borderRadius: '0.625rem', boxShadow: '0 0.75rem 2rem rgba(0,0,0,0.2)' }}/>
            </motion.div>
          ))}
        </motion.div>
        {/* mid */}
        <motion.div style={{ position: 'absolute', top: '50%', left: 0, display: 'flex', gap: `${140/VW}vw`, x: sxMid, y: '-50%', alignItems: 'center', marginLeft: '8vw', zIndex: 2 }}>
          {songMid.map((src, i) => (
            <motion.div key={i} style={{ width: `${300/VW}vw`, height: `${300/VW}vw`, flexShrink: 0, rotate: (i%2===0?1:-1)*(2+(i%3)), cursor: 'pointer' }} whileHover={hover}>
              <img src={src} alt="" style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover', borderRadius: '0.75rem', boxShadow: '0 1rem 2.5rem rgba(0,0,0,0.22)' }}/>
            </motion.div>
          ))}
        </motion.div>
        {/* fg */}
        <motion.div style={{ position: 'absolute', top: '50%', left: 0, display: 'flex', gap: `${170/VW}vw`, x: sxFg, y: '-50%', alignItems: 'center', marginLeft: '16vw', zIndex: 3 }}>
          {songFg.map((src, i) => (
            <motion.div key={i} style={{ width: `${390/VW}vw`, height: `${390/VW}vw`, flexShrink: 0, rotate: (i%2===0?-1:1)*(3+(i%2)), cursor: 'pointer' }} whileHover={hover}>
              <img src={src} alt="" style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover', borderRadius: '0.875rem', boxShadow: '0 1.25rem 3.125rem rgba(0,0,0,0.25)' }}/>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </>
  );
};

const MusicStop = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const panelOpacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0, 1, 1, 0]);
  const panelY = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], ['2.5vh', '0vh', '0vh', '-2.5vh']);
  const panelBlur = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], ['blur(1rem)', 'blur(0)', 'blur(0)', 'blur(1rem)']);

  return (
    <div ref={ref} style={{ height: STOP_HEIGHT, position: 'relative', borderTop: '1px solid var(--border-crisp)' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <MusicConvergenceGallery scrollYProgress={scrollYProgress} />
        <div className="mobile-hide" style={{
          position: 'absolute', top: '2rem', left: 'clamp(1.5rem, 5vw, 3.75rem)',
          fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 500,
          textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(0,0,0,0.35)', zIndex: 20,
        }}>
          III / V
        </div>
        {/* Musicians label — sits over left half */}
        <motion.div style={{
          position: 'absolute', top: '50%', left: 'clamp(1.5rem, 4vw, 3rem)',
          transform: 'translateY(-50%)', maxWidth: 'clamp(12.5rem, 22vw, 20rem)', textAlign: 'left',
          background: 'rgba(250, 250, 248, 0.88)',
          backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
          padding: 'clamp(1.25rem, 2.5vw, 2.25rem)', border: '1px solid var(--border-crisp)', borderRadius: '1rem',
          zIndex: 10, opacity: panelOpacity, filter: panelBlur, y: panelY, pointerEvents: 'none',
        }}>
          <h3 style={{ fontFamily: 'var(--serif)', fontWeight: 400, color: 'var(--text-pure)', fontSize: 'clamp(1.4rem, 2.2vw, 2.2rem)', lineHeight: 1.1, marginBottom: '0.625rem' }}>
            Musicians.
          </h3>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(0.8rem, 1.1vw, 0.95rem)', color: 'var(--text-soft)', fontWeight: 300, lineHeight: 1.6 }}>
            The ones who made you feel less alone and made you fall in love with music.
          </p>
        </motion.div>

        {/* Songs label — sits over right half */}
        <motion.div style={{
          position: 'absolute', top: '50%', right: 'clamp(1.5rem, 4vw, 3rem)',
          transform: 'translateY(-50%)', maxWidth: 'clamp(12.5rem, 22vw, 20rem)', textAlign: 'right',
          background: 'rgba(250, 250, 248, 0.88)',
          backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
          padding: 'clamp(1.25rem, 2.5vw, 2.25rem)', border: '1px solid var(--border-crisp)', borderRadius: '1rem',
          zIndex: 10, opacity: panelOpacity, filter: panelBlur, y: panelY, pointerEvents: 'none',
        }}>
          <h3 style={{ fontFamily: 'var(--serif)', fontWeight: 400, color: 'var(--text-pure)', fontSize: 'clamp(1.4rem, 2.2vw, 2.2rem)', lineHeight: 1.1, marginBottom: '0.625rem' }}>
            Songs.
          </h3>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(0.8rem, 1.1vw, 0.95rem)', color: 'var(--text-soft)', fontWeight: 300, lineHeight: 1.6 }}>
            The ones that make you feel alive, the ones that keep you alive, the ones you scream at the top of your lungs.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const GalleryStop = ({ stopNum, title, subtitle, imgSrc, preserveRatio, sizeScale = 1, gapScale = 1, align = 'left' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const panelOpacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0, 1, 1, 0]);
  const panelY = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], ['2.5vh', '0vh', '0vh', '-2.5vh']);
  const panelBlur = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], ['blur(1rem)', 'blur(0)', 'blur(0)', 'blur(1rem)']);

  const panelSide = align === 'left' ? { right: 'clamp(1.5rem, 5vw, 3.75rem)' } : { left: 'clamp(1.5rem, 5vw, 3.75rem)' };

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

        <div className="mobile-hide" style={{
          position: 'absolute', top: '2rem', left: 'clamp(1.5rem, 5vw, 3.75rem)',
          fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 500,
          textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(0,0,0,0.35)',
          zIndex: 20,
        }}>
          {stopNum}
        </div>

        <motion.div style={{
          position: 'absolute', top: GALLERY_CENTER, ...panelSide,
          transform: 'translateY(-50%)',
          maxWidth: 'clamp(16.25rem, 28vw, 25rem)',
          textAlign: align === 'left' ? 'right' : 'left',
          background: 'rgba(250, 250, 248, 0.88)',
          backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
          padding: 'clamp(1.5rem, 3vw, 2.5rem)',
          border: '1px solid var(--border-crisp)', borderRadius: '1rem',
          zIndex: 10, opacity: panelOpacity, filter: panelBlur, y: panelY,
          pointerEvents: 'none',
        }}>
          <h3 style={{
            fontFamily: 'var(--serif)', fontWeight: 400, color: 'var(--text-pure)',
            fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)', lineHeight: 1.1, marginBottom: '0.75rem',
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
  const sectionRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const pathLength = useTransform(sectionProgress, [0, 1], [0, 1]);

  if (isMobile) return null;

  return (
    <section ref={sectionRef} id="thread" style={{ background: 'var(--bg-off)', position: 'relative', overflow: 'clip' }}>

      {/* Squiggly */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', marginBottom: '-100vh', zIndex: 5, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '21vw', height: '100%' }}>
          <svg width="100%" height="100%" viewBox="0 0 400 1200" preserveAspectRatio="none">
            <motion.path
              d="M200,0 C 400,120 0,240 200,360 C 400,480 0,600 200,720 C 400,840 0,960 200,1080 C 400,1200 200,1200 200,1200"
              fill="none" stroke="var(--text-pure)" strokeWidth="1.5"
              style={{ pathLength }}
            />
          </svg>
        </div>
      </div>

      {/* Section header */}
      <div style={{
        padding: 'clamp(2rem, 4vw, 3rem) clamp(1.5rem, 5vw, 3.75rem)',
        borderTop: '1px solid var(--border-crisp)', borderBottom: '1px solid var(--border-crisp)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
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

      <MusicStop />

      <GalleryStop
        stopNum="IV / V"
        title="The 2AM Wikipedia spirals."
        subtitle="The obscure rabbit holes and essays that made you feel less alone in the world."
        imgSrc={wikipediaImages}
        sizeScale={0.95}
        gapScale={1.5}
        align="right"
      />

      <GalleryStop
        stopNum="V / V"
        title="The YouTube rabbit holes."
        subtitle="Video essays, obscure documentaries, music videos, and lectures you rewatch every year."
        imgSrc={youtubeImages}
        preserveRatio
        sizeScale={0.92}
        gapScale={1.6}
        align="left"
      />

    </section>
  );
}
