/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// Clamp a value strictly within [0, 1] to keep Web Animations API happy on Android
const c = (v) => Math.min(1, Math.max(0, v));

// Seeded pseudo-random shuffle — stable across renders, different per array
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
    // Check if it's wbg or pure cutout based on the list
    if ([3, 4, 6, 7, 8, 10].includes(name)) return `/assets/artist${name}wbg.png`;
    return `/assets/artist${name}.png`;
  })
], 88);

const songImages = seededShuffle([
  "/assets/music1.jpeg",
  "/assets/music2.png",
  "/assets/music3.jpg",
  "/assets/music4.jpg",
  "/assets/music5.jpg",
  "/assets/music6.jpeg",
  "/assets/music7.jpg",
  "/assets/music8.jpg",
  "/assets/music9.jpg",
  "/assets/music10.jpg",
  "/assets/music11.png"
], 99);

const lyricFragments = [
  "In the quiet of the night",
  "The rhythm of the soul",
  "A frequency of memory",
  "The architecture of sound",
  "Resonance",
  "Timeless",
  "The echo of a feeling"
];

const LyricFragment = ({ text, index, scrollYProgress, start, end }) => {
  const x = useTransform(scrollYProgress, [c(start), c(end)], [0, (index % 2 === 0 ? 100 : -100)]);
  return (
    <motion.div
      style={{
        position: 'absolute',
        top: `${20 + (index * 12)}%`,
        left: `${10 + (index * 8)}%`,
        fontFamily: 'var(--serif)',
        fontSize: '1rem',
        fontStyle: 'italic',
        color: 'var(--text-soft)',
        opacity: 0.2,
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        x
      }}
    >
      {text}
    </motion.div>
  );
};


const GalleryImage = ({ src, preserveRatio, track, index, sizeScale = 1, isMobile = false, style = {}, scrollYProgress, start, end }) => {
  const yFactor = track === 'fg' ? -150 : track === 'mid' ? -80 : -40;
  const yParallax = useTransform(scrollYProgress, [c(start), c(end)], [0, yFactor]);

  let baseWidth;
  const mobileScale = isMobile ? 0.6 : 1;

  if (track === 'bg') baseWidth = (preserveRatio ? 300 : 210) * sizeScale * mobileScale;
  else if (track === 'mid') baseWidth = (preserveRatio ? 460 : 340) * sizeScale * mobileScale;
  else baseWidth = (preserveRatio ? 660 : 480) * sizeScale * mobileScale;

  const scatterAmp = isMobile ? 8 : (track === 'bg' ? 30 : track === 'mid' ? 20 : 12);
  const yPct = track === 'bg'
    ? Math.sin(index * 2.1) * scatterAmp
    : track === 'mid'
    ? Math.cos(index * 1.7) * scatterAmp
    : Math.sin(index * 2.5) * scatterAmp;

  const rotation = (index % 2 === 0 ? 1 : -1) * (2 + (index % 3));

  // Organic floating: subtle sine wave
  const floatY = useTransform(scrollYProgress, [c(start), c(end)], [0, Math.sin(index) * 40]);

  return (
    <motion.div
      style={{
        width: `${baseWidth}px`,
        height: preserveRatio ? 'auto' : `${baseWidth * 1.25}px`,
        flexShrink: 0,
        position: 'relative',
        y: useTransform(scrollYProgress, [c(start), c(end)], [`${yPct}vh`, `${yPct - (track === 'fg' ? 10 : 5)}vh`]),
        x: floatY,
        rotate: style.rotate !== undefined ? style.rotate : rotation,
        zIndex: track === 'fg' ? 3 : track === 'mid' ? 2 : 1,
        pointerEvents: 'auto',
        cursor: 'pointer',
        ...style
      }}
      whileHover={{
        scale: isMobile ? 1.02 : 1.07,
        rotate: 0,
        zIndex: 100,
        transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
      }}
    >
      <img
        src={src}
        alt="Curated gallery item"
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          objectFit: preserveRatio ? 'contain' : 'cover',
          borderRadius: style.filter ? '0' : '12px',
          boxShadow: style.filter ? 'none' : '0 20px 50px rgba(0,0,0,0.25)',
          ...style.imgStyle
        }}
      />
    </motion.div>
  );
};

const ConstellationGallery = ({ imgSrc, preserveRatio, scrollYProgress, start, end, sizeScale = 1, gapScale = 1, isMobile = false, side = 'full', variant = 'standard' }) => {
  const track3Count = Math.floor(imgSrc.length * 0.3);
  const track2Count = Math.floor(imgSrc.length * 0.4);
  const track1Count = imgSrc.length - track3Count - track2Count;

  const track3 = imgSrc.slice(0, track3Count);
  const track2 = imgSrc.slice(track3Count, track3Count + track2Count);
  const track1 = imgSrc.slice(track3Count + track2Count);

  const mobileScale = isMobile ? 0.6 : 1;
  const gap3 = (preserveRatio ? 200 : 150) * gapScale * mobileScale;
  const gap2 = (preserveRatio ? 300 : 200) * gapScale * mobileScale;
  const gap1 = (preserveRatio ? 400 : 300) * gapScale * mobileScale;

  const dist3 = `${-(track3.length * ((preserveRatio ? 300 : 210) * sizeScale * mobileScale + gap3))}px`;
  const dist2 = `${-(track2.length * ((preserveRatio ? 460 : 340) * sizeScale * mobileScale + gap2))}px`;
  const dist1 = `${-(track1.length * ((preserveRatio ? 660 : 480) * sizeScale * mobileScale + gap1))}px`;

  // Dynamic positioning based on side
  const startX = side === 'right' ? '50vw' : '0vw';
  const enterX = side === 'left' ? '60vw' : side === 'right' ? '110vw' : '100vw';

  const x3 = useTransform(scrollYProgress, [c(start), c(end)], [enterX, dist3]);
  const x2 = useTransform(scrollYProgress, [c(start), c(end)], [`calc(${enterX} + 30vw)`, dist2]);
  const x1 = useTransform(scrollYProgress, [c(start), c(end)], [`calc(${enterX} + 60vw)`, dist1]);

  // Ensure start+0.02 < end-0.02 to avoid non-monotonic offsets on small ranges
  const oStart2 = c(start + 0.02);
  const oEnd2 = c(end - 0.02);
  const safeOpacityRange = oStart2 < oEnd2
    ? [c(start), oStart2, oEnd2, c(end)]
    : [c(start), c((start + end) / 2), c((start + end) / 2 + 0.001), c(end)];
  const opacity = useTransform(scrollYProgress, safeOpacityRange, [0, 1, 1, 0]);

  // Derive pointer events from opacity: when gallery is invisible, block nothing
  const pointerEventsMV = useTransform(opacity, (v) => v > 0.05 ? 'auto' : 'none');

  // Cutout variant logic
  const isCutout = variant === 'cutout';

  // Convergence logic: move towards center as scroll approaches midpoint
  const midpoint = c((start + end) / 2);
  const convergence = useTransform(scrollYProgress, 
    [c(start), midpoint, c(end)], 
    [side === 'left' ? '0vw' : '0vw', side === 'left' ? '15vw' : '-15vw', side === 'left' ? '0vw' : '0vw']
  );

  return (
    <>
      <motion.div className="parallax-gallery-container" style={{ 
        position: 'absolute', top: 0, left: startX, width: side === 'full' ? '100vw' : '50vw', height: '100vh', 
        zIndex: 0, overflow: 'hidden', opacity, pointerEvents: pointerEventsMV,
        x: convergence
      }}>
        
        {isCutout && lyricFragments.map((text, i) => (
          <LyricFragment key={`lyric-${i}`} text={text} index={i} scrollYProgress={scrollYProgress} start={start} end={end} />
        ))}
        
        <motion.div style={{ position: 'absolute', top: '50%', left: 0, display: 'flex', gap: `${gap3}px`, x: x3, y: '-50%', alignItems: 'center', pointerEvents: 'none' }}>
          {track3.map((src, i) => (
            <GalleryImage 
              key={`bg-${i}`} src={src} preserveRatio={preserveRatio} track="bg" index={i} sizeScale={sizeScale} isMobile={isMobile} 
              scrollYProgress={scrollYProgress} start={start} end={end}
              style={isCutout ? { rotate: (i % 2 === 0 ? 5 : -5), filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))' } : {}}
            />
          ))}
        </motion.div>

        {track2.length > 0 && (
          <motion.div style={{ position: 'absolute', top: '50%', left: 0, display: 'flex', gap: `${gap2}px`, x: x2, y: '-50%', alignItems: 'center', marginLeft: isMobile ? '5vw' : '10vw', pointerEvents: 'none' }}>
            {track2.map((src, i) => (
              <GalleryImage 
                key={`mid-${i}`} src={src} preserveRatio={preserveRatio} track="mid" index={i} sizeScale={sizeScale} isMobile={isMobile} 
                scrollYProgress={scrollYProgress} start={start} end={end}
                style={isCutout ? { rotate: (i % 2 === 0 ? -8 : 8), filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.25))' } : {}}
              />
            ))}
          </motion.div>
        )}

        {track1.length > 0 && (
          <motion.div style={{ position: 'absolute', top: '50%', left: 0, display: 'flex', gap: `${gap1}px`, x: x1, y: '-50%', alignItems: 'center', marginLeft: isMobile ? '10vw' : '20vw', pointerEvents: 'none' }}>
            {track1.map((src, i) => (
              <GalleryImage 
                key={`fg-${i}`} src={src} preserveRatio={preserveRatio} track="fg" index={i} sizeScale={sizeScale} isMobile={isMobile} 
                scrollYProgress={scrollYProgress} start={start} end={end}
                style={isCutout ? { rotate: (i % 2 === 0 ? 12 : -12), filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))' } : {}}
              />
            ))}
          </motion.div>
        )}

      </motion.div>
    </>
  );
};

const EditorialFrame = ({ scrollYProgress, start, end, align, title, subtitle, imgSrc, secondaryImgSrc, preserveRatio, sizeScale = 1, gapScale = 1, isMobile = false, variant = 'standard' }) => {
  // Clamp all offsets: start-0.02 can go negative (e.g. start=0.01 → -0.01) which
  // throws "Offsets must be monotonically non-decreasing" on Android Chrome.
  const r = [c(start - 0.02), c(start), c(end), c(end + 0.02)];
  const opacity = useTransform(scrollYProgress, r, [0, 1, 1, 0]);
  const yOffset = useTransform(scrollYProgress, r, [100, 0, 0, -100]);
  const blur = useTransform(scrollYProgress, r, ['blur(20px)', 'blur(0px)', 'blur(0px)', 'blur(20px)']);

  const isArray = Array.isArray(imgSrc);
  const isSecondaryArray = Array.isArray(secondaryImgSrc);

  return (
    <>
      {isArray && (
        <ConstellationGallery 
          imgSrc={imgSrc} 
          preserveRatio={preserveRatio} 
          scrollYProgress={scrollYProgress} 
          start={start} 
          end={end} 
          sizeScale={sizeScale} 
          gapScale={gapScale} 
          isMobile={isMobile} 
          variant={variant}
          // If we have secondary, push the primary gallery to the left/right
          side={secondaryImgSrc ? 'left' : 'full'}
        />
      )}
      {isSecondaryArray && (
        <ConstellationGallery 
          imgSrc={secondaryImgSrc} 
          preserveRatio={preserveRatio} 
          scrollYProgress={scrollYProgress} 
          start={start} 
          end={end} 
          sizeScale={sizeScale} 
          gapScale={gapScale} 
          isMobile={isMobile} 
          variant={variant}
          side="right"
        />
      )}
      
      <motion.div 
        className={isMobile ? "mobile-stack mobile-padding" : ""}
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          transform: 'translateY(-50%)',
          opacity,
          filter: blur,
          y: yOffset,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: isMobile ? '32px' : '80px',
          pointerEvents: 'none',
          padding: isMobile ? '0 24px' : '0 60px'
        }}
      >
        
        {/* Left Side / Musicians */}
        <motion.div style={{ flex: isMobile ? 'none' : 1, display: 'flex', justifyContent: isMobile ? 'center' : 'flex-end', zIndex: 10, width: isMobile ? '100%' : 'auto' }}>
          {secondaryImgSrc ? (
            <div style={{ 
              maxWidth: '400px', 
              textAlign: 'right',
              background: 'rgba(250, 250, 248, 0.85)',
              backdropFilter: 'blur(16px)',
              padding: isMobile ? '24px' : '40px',
              border: '1px solid var(--border-crisp)',
              borderRadius: '16px',
              pointerEvents: 'auto',
            }}>
              <h3 style={{ fontFamily: 'var(--serif)', fontWeight: 400, color: 'var(--text-pure)', fontSize: isMobile ? '1.8rem' : '2.5rem', lineHeight: 1.1, marginBottom: '16px' }}>Musicians</h3>
              <p style={{ fontFamily: 'var(--sans)', fontSize: isMobile ? '0.9rem' : '1rem', color: 'var(--text-soft)', fontWeight: 300, lineHeight: 1.6 }}>The architects of your soundscape. The souls that articulated your silence.</p>
            </div>
          ) : (
            align === 'left' ? (
              !isArray && (
                <div style={{ width: isMobile ? '80vw' : '380px', height: isMobile ? '60vw' : '520px', position: 'relative' }}>
                  <img src={imgSrc} alt="Editorial content" style={{ width: '100%', height: '100%', objectFit: 'cover', border: '1px solid var(--border-crisp)' }} />
                </div>
              )
            ) : (
              <div style={{ 
                maxWidth: '450px', 
                textAlign: isMobile ? 'left' : 'right',
                background: isArray ? 'rgba(250, 250, 248, 0.85)' : 'transparent',
                backdropFilter: isArray ? 'blur(16px)' : 'none',
                padding: isArray ? (isMobile ? '24px' : '40px') : '0',
                border: isArray ? '1px solid var(--border-crisp)' : 'none',
                borderRadius: isArray ? '16px' : '0',
                pointerEvents: 'auto',
              }}>
                <h3 style={{ fontFamily: 'var(--serif)', fontWeight: 400, color: 'var(--text-pure)', fontSize: isMobile ? '2rem' : '3rem', lineHeight: 1.1, marginBottom: '16px' }}>{title}</h3>
                <p style={{ fontFamily: 'var(--sans)', fontSize: isMobile ? '1rem' : '1.1rem', color: 'var(--text-soft)', fontWeight: 300, lineHeight: 1.6 }}>{subtitle}</p>
              </div>
            )
          )}
        </motion.div>

        {/* Center space for the line */}
        {!isMobile && <div style={{ width: '80px', zIndex: 10 }}></div>}

        {/* Right Side / Songs */}
        <motion.div style={{ flex: isMobile ? 'none' : 1, display: 'flex', justifyContent: isMobile ? 'center' : 'flex-start', zIndex: 10, width: isMobile ? '100%' : 'auto' }}>
          {secondaryImgSrc ? (
            <div style={{ 
              maxWidth: '400px', 
              textAlign: 'left',
              background: 'rgba(250, 250, 248, 0.85)',
              backdropFilter: 'blur(16px)',
              padding: isMobile ? '24px' : '40px',
              border: '1px solid var(--border-crisp)',
              borderRadius: '16px',
              pointerEvents: 'auto',
            }}>
              <h3 style={{ fontFamily: 'var(--serif)', fontWeight: 400, color: 'var(--text-pure)', fontSize: isMobile ? '1.8rem' : '2.5rem', lineHeight: 1.1, marginBottom: '16px' }}>Songs</h3>
              <p style={{ fontFamily: 'var(--sans)', fontSize: isMobile ? '0.9rem' : '1rem', color: 'var(--text-soft)', fontWeight: 300, lineHeight: 1.6 }}>The specific frequencies that hold your memories together.</p>
            </div>
          ) : (
            align === 'left' ? (
              <div style={{ 
                maxWidth: '450px', 
                textAlign: 'left',
                background: isArray ? 'rgba(250, 250, 248, 0.85)' : 'transparent',
                backdropFilter: isArray ? 'blur(16px)' : 'none',
                padding: isArray ? (isMobile ? '24px' : '40px') : '0',
                border: isArray ? '1px solid var(--border-crisp)' : 'none',
                borderRadius: isArray ? '16px' : '0',
                pointerEvents: 'auto',
              }}>
                <h3 style={{ fontFamily: 'var(--serif)', fontWeight: 400, color: 'var(--text-pure)', fontSize: isMobile ? '2rem' : '3rem', lineHeight: 1.1, marginBottom: '16px' }}>{title}</h3>
                <p style={{ fontFamily: 'var(--sans)', fontSize: isMobile ? '1rem' : '1.1rem', color: 'var(--text-soft)', fontWeight: 300, lineHeight: 1.6 }}>{subtitle}</p>
              </div>
            ) : (
              !isArray && (
                <div style={{ width: isMobile ? '80vw' : '380px', height: isMobile ? '60vw' : '520px', position: 'relative' }}>
                  <img src={imgSrc} alt="Editorial content" style={{ width: '100%', height: '100%', objectFit: 'cover', border: '1px solid var(--border-crisp)' }} />
                </div>
              )
            )
          )}
        </motion.div>
      </motion.div>
    </>
  );
};

// The 5 stops with their scroll midpoints
const STOPS = [
  { label: 'I',   mid: 0.07 },
  { label: 'II',  mid: 0.20 },
  { label: 'III', mid: 0.33 },
  { label: 'IV',  mid: 0.535 },
  { label: 'V',   mid: 0.85 },
];

const StopMarkerLabel = ({ stop, index, scrollYProgress }) => {
  const yPos = (index / (STOPS.length - 1)) * 900 + 50;
  // stop.mid - 0.08 can go negative for early stops (e.g. mid=0.07 → -0.01)
  const opacity = useTransform(
    scrollYProgress,
    [c(stop.mid - 0.08), c(stop.mid), c(stop.mid + 0.08)],
    [0.2, 1, 0.2]
  );

  return (
    <motion.text
      x="30"
      y={yPos}
      textAnchor="middle"
      dominantBaseline="middle"
      style={{
        fontFamily: 'var(--serif)',
        fontSize: '11px',
        fontWeight: 400,
        fill: 'var(--text-pure)',
        opacity
      }}
    >
      {stop.label}
    </motion.text>
  );
};

// A bold, organic calligraphic brushstroke — varied width SVG path
const StopMarkers = ({ scrollYProgress }) => {
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 10,
      width: '60px',
      pointerEvents: 'none'
    }}>
      <svg width="60" height="100%" viewBox="0 0 60 1000" preserveAspectRatio="none">
        {/* A thick, tapered, slightly irregular path that mimics an ink brushstroke */}
        <defs>
          <filter id="ink">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" seed="2" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </defs>
        {/* Roman numeral stops along the stroke */}
        {STOPS.map((stop, i) => (
          <StopMarkerLabel key={i} stop={stop} index={i} scrollYProgress={scrollYProgress} />
        ))}
      </svg>
    </div>
  );
};

export default function TheThread() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Declare pathLength at component level — NOT inside JSX
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="thread" ref={containerRef} style={{ position: 'relative', height: '1800vh', background: 'var(--bg-off)', borderBottom: '1px solid var(--border-crisp)' }}>
      
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>

        {/* Original Squiggly Thread */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', transform: 'translateX(-50%)', zIndex: 10, width: '400px', pointerEvents: 'none' }}>
          <svg width="400" height="100%" viewBox="0 0 400 1200" preserveAspectRatio="none">
            <motion.path
              d="M200,0 C 400,120 0,240 200,360 C 400,480 0,600 200,720 C 400,840 0,960 200,1080 C 400,1200 200,1200 200,1200"
              fill="none"
              stroke="var(--text-pure)"
              strokeWidth="1.5"
              style={{ pathLength }}
            />
          </svg>
        </div>

        {/* Section Label */}
        <div className="mobile-hide" style={{ position: 'absolute', top: '40px', left: '60px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(0,0,0,0.4)' }}>
          II. The Exhibition
        </div>

        {!isMobile && <StopMarkers scrollYProgress={scrollYProgress} />}

        {/* Stop 1: Books — 20% scroll range */}
        <EditorialFrame 
          scrollYProgress={scrollYProgress} start={0.01} end={0.18} align="left" 
          title={<>The books that changed how you see the world.</>}
          subtitle="Add the literature that fundamentally rewired your brain. The map builds itself from your honesty."
          imgSrc={bookImages}
          preserveRatio={true}
          sizeScale={0.72}
          gapScale={2.2}
          isMobile={isMobile}
        />

        {/* Stop 2: Films — 18% scroll range */}
        <EditorialFrame 
          scrollYProgress={scrollYProgress} start={0.21} end={0.38} align="right" 
          title={<>The films that broke something open.</>}
          subtitle="A catalog of moving images that articulated a feeling you couldn't put into words."
          imgSrc={movieImages}
          preserveRatio={true}
          gapScale={2.0}
          sizeScale={0.68}
          isMobile={isMobile}
        />

        {/* Stop 3: Audio (Musicians & Songs) */}
        <EditorialFrame 
          scrollYProgress={scrollYProgress} start={0.41} end={0.50} align="left" 
          title="Musicians & Songs"
          subtitle="Music isn't background noise here. It is the architectural foundation of your inner world."
          imgSrc={musicianImages}
          secondaryImgSrc={songImages}
          variant="cutout"
          preserveRatio={true}
          sizeScale={0.7}
          gapScale={1.8}
          isMobile={isMobile}
        />

        {/* Stop 4: Wikipedia — 22% scroll range */}
        <EditorialFrame 
          scrollYProgress={scrollYProgress} start={0.53} end={0.73} align="right" 
          title={<>The 2AM Wikipedia spirals.</>}
          subtitle="The obscure rabbit holes, the essays, the threads that made you feel less alone in the world."
          imgSrc={wikipediaImages}
          isMobile={isMobile}
        />

        {/* Stop 5: YouTube — 25% scroll range */}
        <EditorialFrame 
          scrollYProgress={scrollYProgress} start={0.76} end={1.0} align="left" 
          title={<>The YouTube rabbit holes.</>}
          subtitle="Video essays, obscure documentaries, music videos, and lectures that you rewatch every year."
          imgSrc={youtubeImages}
          preserveRatio={true}
          isMobile={isMobile}
        />

      </div>
    </section>
  );
}
