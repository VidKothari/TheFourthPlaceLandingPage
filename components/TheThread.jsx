/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

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

const wikipediaImages = seededShuffle(Array.from({length: 14}, (_, i) => `/assets/thumbs/wikipedia${i+1}.webp`), 7);
const youtubeImages = seededShuffle([
  "/assets/thumbs/youtubeVid.webp",
  ...Array.from({length: 21}, (_, i) => `/assets/thumbs/youtubeVid${i+2}.webp`)
], 13);
const bookImages = seededShuffle(Array.from({length: 17}, (_, i) => `/assets/thumbs/book${i+1}.webp`), 31);
const movieImages = seededShuffle([
  ...Array.from({length: 10}, (_, i) => `/assets/thumbs/movie${i+1}.webp`),
  '/assets/thumbs/movie11.webp',
  ...Array.from({length: 9}, (_, i) => `/assets/thumbs/movie${i+12}.webp`),
  '/assets/thumbs/movie21.webp',
], 57);
const musicianImages = seededShuffle([
  ...Array.from({length: 11}, (_, i) => {
    const name = i + 1;
    if ([3, 4, 6, 7, 8, 10].includes(name)) return `/assets/thumbs/artist${name}wbg.webp`;
    return `/assets/thumbs/artist${name}.webp`;
  })
], 88);
const songImages = seededShuffle([
  "/assets/thumbs/music1.webp", "/assets/thumbs/music2.webp", "/assets/thumbs/music3.webp",
  "/assets/thumbs/music4.webp", "/assets/thumbs/music5.webp", "/assets/thumbs/music6.webp",
  "/assets/thumbs/music7.webp", "/assets/thumbs/music8.webp", "/assets/thumbs/music9.webp",
  "/assets/thumbs/music10.webp", "/assets/thumbs/music11.webp"
], 99);
const gameImages = seededShuffle(Array.from({length: 12}, (_, i) => `/assets/thumbs/game${i+1}.webp`), 21);

const STOP_HEIGHT = '400vh';
const S = 0.05;
const E = 0.95;
const VW = 19.2; // reference viewport = 1920px

const hover = { scale: 1.07, rotate: 0, zIndex: 100, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } };

const labelCardStyle = {
  background: 'rgba(250, 250, 248, 0.94)',
  padding: 'clamp(1.25rem, 2.5vw, 2.25rem)', border: '1px solid var(--border-crisp)',
  zIndex: 10, pointerEvents: 'none',
};

const imgPerf = { loading: 'lazy', decoding: 'async' };

const Piece = ({ src, mode, hpx, rotate }) => {
  if (mode === 'square') {
    return (
      <motion.div style={{ width: `${hpx/VW}vw`, height: `${hpx/VW}vw`, flexShrink: 0, rotate, cursor: 'pointer' }} whileHover={hover}>
        <img src={src} alt="" {...imgPerf} style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover', boxShadow: '0 0.75rem 1.75rem rgba(0,0,0,0.18)' }}/>
      </motion.div>
    );
  }
  if (mode === 'wide') {
    return (
      <motion.div style={{ width: `${(hpx*1.6)/VW}vw`, height: `${hpx/VW}vw`, flexShrink: 0, rotate, cursor: 'pointer' }} whileHover={hover}>
        <img src={src} alt="" {...imgPerf} style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover', boxShadow: '0 0.75rem 1.75rem rgba(0,0,0,0.16)' }}/>
      </motion.div>
    );
  }
  if (mode === 'poster') {
    return (
      <motion.div style={{ width: `${(hpx*0.68)/VW}vw`, height: `${hpx/VW}vw`, flexShrink: 0, rotate, cursor: 'pointer' }} whileHover={hover}>
        <img src={src} alt="" {...imgPerf} style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover', boxShadow: '0 0.75rem 1.75rem rgba(0,0,0,0.2)' }}/>
      </motion.div>
    );
  }
  // 'contain' — irregular artwork (musicians with transparent bg)
  return (
    <motion.div style={{ height: `${hpx/VW}vw`, flexShrink: 0, rotate, cursor: 'pointer' }} whileHover={hover}>
      <img src={src} alt="" {...imgPerf} style={{ height: '100%', width: 'auto', display: 'block', objectFit: 'contain' }}/>
    </motion.div>
  );
};

// One screen half whose collection drifts in toward the center.
const ConvergeHalf = ({ images, mode, side, scrollYProgress, xConv }) => {
  const bg = images.slice(0, Math.floor(images.length * 0.3));
  const mid = images.slice(Math.floor(images.length * 0.3), Math.floor(images.length * 0.7));
  const fg = images.slice(Math.floor(images.length * 0.7));

  const widthOf = (hpx) => mode === 'square' ? hpx : mode === 'wide' ? hpx * 1.6 : mode === 'poster' ? hpx * 0.68 : hpx;
  const dist = (arr, hpx, gap) => `${-(arr.length * (widthOf(hpx) + gap) / VW)}vw`;

  const xBg  = useTransform(scrollYProgress, [S, E], ['60vw',  dist(bg, 240, 120)]);
  const xMid = useTransform(scrollYProgress, [S, E], ['90vw',  dist(mid, 340, 150)]);
  const xFg  = useTransform(scrollYProgress, [S, E], ['120vw', dist(fg, 440, 180)]);

  const opacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0, 1, 1, 0]);
  const pointerEv = useTransform(opacity, (v) => v > 0.05 ? 'auto' : 'none');

  return (
    <motion.div style={{
      position: 'absolute', top: 0, left: side === 'left' ? 0 : '50vw', width: '50vw', height: '100%',
      overflow: 'hidden', opacity, pointerEvents: pointerEv, x: xConv,
    }}>
      <motion.div style={{ position: 'absolute', top: '50%', left: 0, display: 'flex', gap: `${120/VW}vw`, x: xBg, y: '-50%', alignItems: 'center', zIndex: 1 }}>
        {bg.map((src, i) => <Piece key={i} src={src} mode={mode} hpx={240} rotate={(i%2===0?1:-1)*(1+(i%3))} />)}
      </motion.div>
      <motion.div style={{ position: 'absolute', top: '50%', left: 0, display: 'flex', gap: `${150/VW}vw`, x: xMid, y: '-50%', alignItems: 'center', marginLeft: '8vw', zIndex: 2 }}>
        {mid.map((src, i) => <Piece key={i} src={src} mode={mode} hpx={340} rotate={(i%2===0?-1:1)*(2+(i%3))} />)}
      </motion.div>
      <motion.div style={{ position: 'absolute', top: '50%', left: 0, display: 'flex', gap: `${180/VW}vw`, x: xFg, y: '-50%', alignItems: 'center', marginLeft: '16vw', zIndex: 3 }}>
        {fg.map((src, i) => <Piece key={i} src={src} mode={mode} hpx={440} rotate={(i%2===0?1:-1)*(3+(i%2))} />)}
      </motion.div>
    </motion.div>
  );
};

// Two collections drifting toward each other — one per screen half.
const ConvergeStop = ({ stopNum, left, right }) => {
  const ref = useRef(null);
  // Mount the heavy lanes only when the stop is near the viewport.
  const inView = useInView(ref, { margin: '100% 0px 100% 0px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const mid = 0.5;
  const xConvLeft  = useTransform(scrollYProgress, [S, mid, E], ['0vw',  '12vw', '0vw']);
  const xConvRight = useTransform(scrollYProgress, [S, mid, E], ['0vw', '-12vw', '0vw']);
  const panelOpacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0, 1, 1, 0]);
  const panelY = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], ['2.5vh', '0vh', '0vh', '-2.5vh']);

  return (
    <div ref={ref} style={{ height: STOP_HEIGHT, position: 'relative', borderTop: '1px solid var(--border-crisp)' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        {inView && (
          <>
            <ConvergeHalf images={left.images} mode={left.mode} side="left" scrollYProgress={scrollYProgress} xConv={xConvLeft} />
            <ConvergeHalf images={right.images} mode={right.mode} side="right" scrollYProgress={scrollYProgress} xConv={xConvRight} />

            <div className="mobile-hide" style={{
              position: 'absolute', top: '2rem', left: 'clamp(1.5rem, 5vw, 3.75rem)',
              fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 500,
              textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(0,0,0,0.35)', zIndex: 20,
            }}>
              {stopNum}
            </div>

            <motion.div style={{
              ...labelCardStyle,
              position: 'absolute', top: '50%', left: 'clamp(1.5rem, 4vw, 3rem)',
              transform: 'translateY(-50%)', maxWidth: 'clamp(12.5rem, 22vw, 20rem)', textAlign: 'left',
              opacity: panelOpacity, y: panelY,
            }}>
              <h3 style={{ fontFamily: 'var(--serif)', fontWeight: 400, color: 'var(--text-pure)', fontSize: 'clamp(1.4rem, 2.2vw, 2.2rem)', lineHeight: 1.1, marginBottom: '0.625rem' }}>
                {left.title}
              </h3>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(0.8rem, 1.1vw, 0.95rem)', color: 'var(--text-soft)', fontWeight: 300, lineHeight: 1.6 }}>
                {left.subtitle}
              </p>
            </motion.div>

            <motion.div style={{
              ...labelCardStyle,
              position: 'absolute', top: '50%', right: 'clamp(1.5rem, 4vw, 3rem)',
              transform: 'translateY(-50%)', maxWidth: 'clamp(12.5rem, 22vw, 20rem)', textAlign: 'right',
              opacity: panelOpacity, y: panelY,
            }}>
              <h3 style={{ fontFamily: 'var(--serif)', fontWeight: 400, color: 'var(--text-pure)', fontSize: 'clamp(1.4rem, 2.2vw, 2.2rem)', lineHeight: 1.1, marginBottom: '0.625rem' }}>
                {right.title}
              </h3>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(0.8rem, 1.1vw, 0.95rem)', color: 'var(--text-soft)', fontWeight: 300, lineHeight: 1.6 }}>
                {right.subtitle}
              </p>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

// Three collections in three vertical lanes — wikipedia, youtube, games.
const TripleColumn = ({ images, mode, colIndex, scrollYProgress }) => {
  const bg = images.slice(0, Math.floor(images.length / 2));
  const fg = images.slice(Math.floor(images.length / 2));

  const widthOf = (hpx) => mode === 'square' ? hpx : mode === 'wide' ? hpx * 1.6 : mode === 'poster' ? hpx * 0.68 : hpx;
  const dist = (arr, hpx, gap) => `${-(arr.length * (widthOf(hpx) + gap) / VW)}vw`;

  const xBg = useTransform(scrollYProgress, [S, E], ['36vw', dist(bg, 210, 110)]);
  const xFg = useTransform(scrollYProgress, [S, E], ['52vw', dist(fg, 320, 150)]);
  const opacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0, 1, 1, 0]);
  const pointerEv = useTransform(opacity, (v) => v > 0.05 ? 'auto' : 'none');

  const yBg = colIndex === 1 ? '-62%' : '-42%';
  const yFg = colIndex === 1 ? '-38%' : '-58%';

  return (
    <motion.div style={{
      position: 'absolute', top: 0, left: `${colIndex * 33.34}vw`, width: '33.34vw', height: '100%',
      overflow: 'hidden', opacity, pointerEvents: pointerEv,
    }}>
      <motion.div style={{ position: 'absolute', top: '50%', left: 0, display: 'flex', gap: `${110/VW}vw`, x: xBg, y: yBg, alignItems: 'center', zIndex: 1 }}>
        {bg.map((src, i) => <Piece key={i} src={src} mode={mode} hpx={210} rotate={(i%2===0?1:-1)*(1+(i%3))} />)}
      </motion.div>
      <motion.div style={{ position: 'absolute', top: '50%', left: 0, display: 'flex', gap: `${150/VW}vw`, x: xFg, y: yFg, alignItems: 'center', marginLeft: '5vw', zIndex: 2 }}>
        {fg.map((src, i) => <Piece key={i} src={src} mode={mode} hpx={320} rotate={(i%2===0?-1:1)*(2+(i%2))} />)}
      </motion.div>
    </motion.div>
  );
};

const tripleLabelPos = [
  { left: 'clamp(1.5rem, 3vw, 3rem)', bottom: 'clamp(2rem, 8vh, 5rem)', textAlign: 'left' },
  { left: '50%', top: 'clamp(5.5rem, 12vh, 8rem)', transform: 'translateX(-50%)', textAlign: 'center' },
  { right: 'clamp(1.5rem, 3vw, 3rem)', bottom: 'clamp(2rem, 8vh, 5rem)', textAlign: 'right' },
];

const TripleStop = ({ stopNum, columns }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '100% 0px 100% 0px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const panelOpacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0, 1, 1, 0]);
  const panelY = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], ['2.5vh', '0vh', '0vh', '-2.5vh']);

  return (
    <div ref={ref} style={{ height: STOP_HEIGHT, position: 'relative', borderTop: '1px solid var(--border-crisp)' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        {inView && (
          <>
            {columns.map((col, i) => (
              <TripleColumn key={i} images={col.images} mode={col.mode} colIndex={i} scrollYProgress={scrollYProgress} />
            ))}

            <div className="mobile-hide" style={{
              position: 'absolute', top: '2rem', left: 'clamp(1.5rem, 5vw, 3.75rem)',
              fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 500,
              textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(0,0,0,0.35)', zIndex: 20,
            }}>
              {stopNum}
            </div>

            {/* hairline seams between the three lanes */}
            <div style={{ position: 'absolute', top: 0, left: '33.34vw', width: '1px', height: '100%', background: 'rgba(17,17,16,0.06)', zIndex: 5 }} />
            <div style={{ position: 'absolute', top: 0, left: '66.68vw', width: '1px', height: '100%', background: 'rgba(17,17,16,0.06)', zIndex: 5 }} />

            {columns.map((col, i) => (
              <motion.div key={`label-${i}`} style={{
                ...labelCardStyle,
                position: 'absolute',
                ...tripleLabelPos[i],
                maxWidth: 'clamp(11rem, 18vw, 16rem)',
                padding: 'clamp(1rem, 1.8vw, 1.5rem)',
                opacity: panelOpacity, y: panelY,
              }}>
                <p style={{
                  fontFamily: 'var(--sans)', fontWeight: 400, fontSize: '0.6rem',
                  letterSpacing: '0.24em', textTransform: 'uppercase',
                  color: 'var(--text-soft)', opacity: 0.65, marginBottom: '0.5rem',
                }}>
                  {col.eyebrow}
                </p>
                <h3 style={{ fontFamily: 'var(--serif)', fontWeight: 400, color: 'var(--text-pure)', fontSize: 'clamp(1.2rem, 1.8vw, 1.8rem)', lineHeight: 1.1, marginBottom: '0.5rem' }}>
                  {col.title}
                </h3>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(0.75rem, 1vw, 0.88rem)', color: 'var(--text-soft)', fontWeight: 300, lineHeight: 1.55 }}>
                  {col.subtitle}
                </p>
              </motion.div>
            ))}
          </>
        )}
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
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 3.75rem)',
        borderTop: '1px solid var(--border-crisp)', borderBottom: '1px solid var(--border-crisp)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem',
      }}>
        <div>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 500,
            textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(0,0,0,0.4)',
            display: 'block', marginBottom: '1.5rem',
          }}>
            II. The Exhibition
          </span>
          <h2 style={{
            fontFamily: 'var(--serif)', fontWeight: 400,
            fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', lineHeight: 1.05,
            color: 'var(--text-pure)', marginBottom: '1rem',
          }}>
            Save what <em style={{ fontStyle: 'italic', color: 'var(--text-soft)' }}>matters.</em>
          </h2>
          <p style={{
            fontFamily: 'var(--sans)', fontWeight: 300,
            fontSize: 'clamp(1rem, 1.6vw, 1.2rem)', lineHeight: 1.7,
            color: 'var(--text-soft)', maxWidth: '32rem',
          }}>
            Everything that ever moved you — films, books, music, rabbit
            holes, other worlds — kept in one place, not scrolled past.
          </p>
        </div>
        <span style={{
          fontFamily: 'var(--serif)', fontStyle: 'italic',
          fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', color: 'var(--text-soft)',
          whiteSpace: 'nowrap', paddingBottom: '0.5rem',
        }}>
          Scroll to explore ↓
        </span>
      </div>

      <ConvergeStop
        stopNum="I / III"
        left={{
          images: movieImages, mode: 'poster',
          title: 'Films.',
          subtitle: "The ones that broke something open — that articulated a feeling you couldn't put into words.",
        }}
        right={{
          images: bookImages, mode: 'poster',
          title: 'Books.',
          subtitle: 'The ones that rewired how you see the world, pressed into the hands of everyone you love.',
        }}
      />

      <ConvergeStop
        stopNum="II / III"
        left={{
          images: musicianImages, mode: 'contain',
          title: 'Musicians.',
          subtitle: 'The ones who made you feel less alone and made you fall in love with music.',
        }}
        right={{
          images: songImages, mode: 'square',
          title: 'Songs.',
          subtitle: 'The ones that make you feel alive, the ones that keep you alive, the ones you scream at the top of your lungs.',
        }}
      />

      <TripleStop
        stopNum="III / III"
        columns={[
          {
            images: wikipediaImages, mode: 'square',
            eyebrow: 'Wikipedia',
            title: 'The 2AM spirals.',
            subtitle: 'The rabbit holes that ate whole nights.',
          },
          {
            images: youtubeImages, mode: 'wide',
            eyebrow: 'YouTube',
            title: 'The video essays.',
            subtitle: 'The ones you rewatch every year.',
          },
          {
            images: gameImages, mode: 'poster',
            eyebrow: 'Games',
            title: 'The other worlds.',
            subtitle: 'The ones that swallowed whole summers.',
          },
        ]}
      />

    </section>
  );
}
