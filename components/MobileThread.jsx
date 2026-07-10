/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
'use client';

const categories = [
  {
    id: 'books',
    label: 'Books',
    sub: 'The literature that rewired your brain.',
    images: Array.from({ length: 17 }, (_, i) => `/assets/thumbs/book${i + 1}.webp`),
    cardWidth: '160px',
    cardHeight: 'auto',
    objectFit: 'contain',
    bg: 'var(--bg-off)',
  },
  {
    id: 'films',
    label: 'Films',
    sub: "Moving images that articulated a feeling you couldn't put into words.",
    images: [
      ...Array.from({ length: 10 }, (_, i) => `/assets/thumbs/movie${i + 1}.webp`),
      '/assets/thumbs/movie11.webp',
      ...Array.from({ length: 9 }, (_, i) => `/assets/thumbs/movie${i + 12}.webp`),
      '/assets/thumbs/movie21.webp',
    ],
    cardWidth: '160px',
    cardHeight: 'auto',
    objectFit: 'contain',
    bg: '#f0eee8',
  },
  {
    id: 'music',
    label: 'Music',
    sub: 'The albums and artists that mean something real.',
    images: [
      '/assets/thumbs/artist1.webp', '/assets/thumbs/music1.webp', '/assets/thumbs/artist2.webp',
      '/assets/thumbs/music2.webp', '/assets/thumbs/artist3wbg.webp', '/assets/thumbs/music3.webp',
      '/assets/thumbs/artist4wbg.webp', '/assets/thumbs/music4.webp', '/assets/thumbs/artist5.webp',
      '/assets/thumbs/music5.webp', '/assets/thumbs/artist6wbg.webp', '/assets/thumbs/music6.webp',
      '/assets/thumbs/artist7wbg.webp', '/assets/thumbs/music7.webp', '/assets/thumbs/artist8wbg.webp',
      '/assets/thumbs/music8.webp', '/assets/thumbs/artist9.webp', '/assets/thumbs/music9.webp',
      '/assets/thumbs/artist10wbg.webp', '/assets/thumbs/music10.webp', '/assets/thumbs/artist11.webp',
      '/assets/thumbs/music11.webp',
    ],
    cardWidth: '200px',
    cardHeight: '200px',
    objectFit: 'cover',
    bg: '#f0eee8',
  },
  {
    id: 'wikipedia',
    label: 'Wikipedia',
    sub: 'The 2AM rabbit holes that made you feel less alone.',
    images: Array.from({ length: 14 }, (_, i) => `/assets/thumbs/wikipedia${i + 1}.webp`),
    cardWidth: '280px',
    cardHeight: 'auto',
    objectFit: 'contain',
    bg: '#fff',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    sub: 'Video essays, lectures, and music videos you rewatch every year.',
    images: [
      '/assets/thumbs/youtubeVid.webp',
      ...Array.from({ length: 21 }, (_, i) => `/assets/thumbs/youtubeVid${i + 2}.webp`),
    ],
    cardWidth: '280px',
    cardHeight: 'auto',
    objectFit: 'contain',
    bg: '#fff',
  },
  {
    id: 'games',
    label: 'Games',
    sub: 'The other worlds that swallowed whole summers.',
    images: Array.from({ length: 12 }, (_, i) => `/assets/thumbs/game${i + 1}.webp`),
    cardWidth: '160px',
    cardHeight: 'auto',
    objectFit: 'contain',
    bg: '#f0eee8',
  },
];

export default function MobileThread() {

  return (
    <section style={{
      background: 'var(--bg-off)',
      borderBottom: '1px solid var(--border-crisp)',
      paddingTop: '72px',
      paddingBottom: '80px',
    }}>
      <div style={{ padding: '0 24px', marginBottom: '48px' }}>
        <div style={{
          fontFamily: 'var(--sans)',
          fontSize: '0.7rem',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'var(--text-soft)',
          marginBottom: '1.25rem',
        }}>
          II. The Exhibition
        </div>
        <h2 style={{
          fontFamily: 'var(--serif)',
          fontWeight: 400,
          fontSize: '2.4rem',
          lineHeight: 1.08,
          color: 'var(--text-pure)',
          marginBottom: '0.75rem',
        }}>
          Save what <em style={{ fontStyle: 'italic', color: 'var(--text-soft)' }}>matters.</em>
        </h2>
        <p style={{
          fontFamily: 'var(--sans)',
          fontWeight: 300,
          fontSize: '0.95rem',
          lineHeight: 1.7,
          color: 'var(--text-soft)',
        }}>
          Everything that ever moved you — films, books, music, rabbit holes,
          other worlds — kept in one place, not scrolled past.
        </p>
      </div>

      {categories.map((cat, i) => (
        <div key={cat.id} style={{
          marginBottom: i < categories.length - 1 ? '64px' : 0,
        }}>
          {/* Category header */}
          <div style={{ padding: '0 24px', marginBottom: '20px' }}>
            <h3 style={{
              fontFamily: 'var(--serif)',
              fontWeight: 400,
              fontSize: '2rem',
              lineHeight: 1.1,
              color: 'var(--text-pure)',
              marginBottom: '8px',
            }}>
              {cat.label}
            </h3>
            <p style={{
              fontFamily: 'var(--sans)',
              fontSize: '0.875rem',
              lineHeight: 1.65,
              color: 'var(--text-soft)',
              fontWeight: 300,
            }}>
              {cat.sub}
            </p>
          </div>

          {/* Horizontal scroll strip */}
          <div className="mobile-thread-strip" style={{
            display: 'flex',
            gap: '14px',
            overflowX: 'auto',
            paddingLeft: '24px',
            paddingRight: '24px',
            paddingBottom: '4px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            scrollSnapType: 'x mandatory',
            overscrollBehaviorX: 'contain',
          }}>
            {cat.images.map((src, j) => (
              <div key={j} className="mobile-media-item" style={{
                flexShrink: 0,
                width: cat.cardWidth,
                height: cat.cardHeight === 'auto' ? undefined : cat.cardHeight,
                scrollSnapAlign: 'start',
                border: '1px solid var(--border-crisp)',
                overflow: 'hidden',
                background: cat.bg,
              }}>
                <img
                  src={src}
                  alt={cat.label}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: cat.cardHeight === 'auto' ? 'auto' : '100%',
                    objectFit: cat.objectFit,
                    display: 'block',
                    opacity: 0,
                    transition: 'opacity 0.4s ease',
                  }}
                  ref={(el) => { if (el?.complete) el.style.opacity = '1'; }}
                  onLoad={(e) => { e.currentTarget.style.opacity = '1'; }}
                />
              </div>
            ))}
            {/* Spacer so last item isn't clipped by overflow:auto */}
            <div style={{ minWidth: '24px', flexShrink: 0 }} />
          </div>
        </div>
      ))}

      <style>{`
        .mobile-thread-strip::-webkit-scrollbar { display: none; }
        .mobile-media-item { transition: transform 0.25s cubic-bezier(0.16,1,0.3,1); }
        .mobile-media-item:active { transform: scale(1.07); z-index: 10; }
      `}</style>
    </section>
  );
}
