/* eslint-disable react/no-unescaped-entities */
'use client';
import { motion } from 'framer-motion';
import { useRef } from 'react';

const VintageCard = ({ type, title, subtitle, imgBg, children, width = 280, height = 360 }) => (
  <div className="polaroid interactive" style={{
    minWidth: `${width}px`,
    height: `${height}px`,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    transition: 'transform 0.4s ease',
    cursor: 'grab'
  }}
  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px) rotate(1deg)'}
  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0) rotate(0deg)'}
  >
    <div style={{
      width: '100%',
      height: type === 'note' ? '0' : '100%',
      flex: type === 'note' ? 'none' : 1,
      background: imgBg,
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '2px',
      marginBottom: type === 'note' ? '0' : '16px'
    }}>
      {children}
    </div>
    
    {(title || type === 'note') && (
      <div style={{ position: 'relative', zIndex: 2, marginTop: 'auto', width: '100%', padding: type==='note'?'12px 0':'0' }}>
        {type === 'note' ? children : (
          <>
             <div style={{ fontSize: '1.4rem', fontFamily: 'var(--script)', color: 'var(--text-ink)', lineHeight: 1.1, marginBottom: '4px' }}>{title}</div>
             <div style={{ fontSize: '0.7rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-ink)', opacity: 0.6 }}>{subtitle}</div>
          </>
        )}
      </div>
    )}
  </div>
);

export default function TasteShelf() {
  const constraintsRef = useRef(null);
  
  return (
    <section id="shelf" style={{
      background: 'var(--bg-paper)',
      padding: '120px 0',
      borderBottom: '1px solid var(--border-hairline)',
      overflow: 'hidden'
    }}>
      <div style={{ padding: '0 60px', marginBottom: '80px' }}>
        <span className="script" style={{ fontSize: '1.8rem', color: 'var(--accent-terra)', display: 'block', marginBottom: '12px' }}>
          What people add
        </span>
        <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(3rem, 5vw, 4.5rem)', lineHeight: 1.05, color: 'var(--text-ink)' }}>
          Everything that has ever <em style={{ fontStyle: 'italic' }}>moved</em> you.
        </h2>
      </div>

      <div ref={constraintsRef} style={{ width: '100%', overflow: 'hidden', paddingBottom: '60px' }}>
        <motion.div 
          drag="x" 
          dragConstraints={constraintsRef}
          style={{ display: 'flex', gap: '32px', padding: '0 60px', width: 'max-content', cursor: 'grab' }}
          whileTap={{ cursor: 'grabbing' }}
        >
          {/* Film Poster: Solaris */}
          <VintageCard type="poster" title="Solaris" subtitle="Tarkovsky · 1972" imgBg="#60717a">
            <svg width="100" height="100" viewBox="0 0 100 100" style={{ position: 'absolute', top: '30%', left: '25%', opacity: 0.3 }}>
              <circle cx="50" cy="50" r="40" stroke="#fff" strokeWidth="2" fill="none" />
              <circle cx="50" cy="50" r="20" fill="#fff" />
            </svg>
          </VintageCard>

          {/* Film Poster: Persona */}
          <VintageCard type="poster" title="Persona" subtitle="Bergman · 1966" imgBg="#a39a8e">
            <svg width="120" height="120" viewBox="0 0 100 100" style={{ position: 'absolute', top: '25%', left: '20%', opacity: 0.5 }}>
              <path d="M20,50 Q50,0 80,50 Q50,100 20,50" fill="none" stroke="#fff" strokeWidth="2"/>
            </svg>
          </VintageCard>

          {/* Album: Pink Moon */}
          <VintageCard type="album" title="Pink Moon" subtitle="Nick Drake" imgBg="#d9a58b" width={320}>
            <svg width="120" height="120" viewBox="0 0 100 100" style={{ position: 'absolute', top: '15%', left: '25%', opacity: 0.8 }}>
               <circle cx="50" cy="50" r="30" fill="#FAF7F2"/>
            </svg>
          </VintageCard>

          {/* Wikipedia Card */}
          <VintageCard type="note" imgBg="transparent" width={320}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
               <span style={{ fontSize: '0.8rem', letterSpacing: '0.1em', color: 'var(--text-ink)', opacity: 0.6, fontFamily: 'var(--sans)' }}>Wikipedia</span>
            </div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '2rem', marginBottom: '12px', lineHeight: 1.1, color: 'var(--text-ink)' }}>Mono no aware</div>
            <div style={{ fontSize: '1rem', lineHeight: 1.6, color: 'var(--text-ink)', opacity: 0.8 }}>物の哀れ — the pathos of things. The bittersweet awareness of impermanence — a sensitivity to ephemera and a gentle sadness at their passing.</div>
          </VintageCard>

          {/* YouTube Card */}
          <VintageCard type="note" imgBg="transparent" width={320}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
               <span style={{ fontSize: '0.8rem', letterSpacing: '0.1em', color: 'var(--text-ink)', opacity: 0.6, fontFamily: 'var(--sans)' }}>YouTube</span>
            </div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '1.8rem', lineHeight: 1.2, color: 'var(--text-ink)' }}>Akira Kurosawa — Composing Movement</div>
            <div style={{ fontFamily: 'var(--script)', fontSize: '1.5rem', color: 'var(--bg-sky)', marginTop: '24px', transform: 'rotate(-3deg)' }}>Every frame a painting</div>
          </VintageCard>

          {/* Personal Note */}
          <VintageCard type="note" imgBg="transparent" width={300}>
            <div style={{ fontSize: '0.8rem', letterSpacing: '0.1em', color: 'var(--text-ink)', opacity: 0.6, marginBottom: '24px', fontFamily: 'var(--sans)' }}>Personal Note</div>
            <div style={{ fontFamily: 'var(--script)', fontSize: '2rem', lineHeight: 1.3, color: 'var(--accent-terra)' }}>
              "watched this the night before my first day in a new city. felt like someone had written it just for me."
            </div>
          </VintageCard>

        </motion.div>
      </div>
    </section>
  );
}
