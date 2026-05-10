/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
'use client';

const categories = [
  {
    id: 'books',
    label: 'Books',
    sub: 'The literature that rewired your brain.',
    images: Array.from({ length: 17 }, (_, i) => `/assets/book${i + 1}.jpg`),
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
      ...Array.from({ length: 10 }, (_, i) => `/assets/movie${i + 1}.jpg`),
      '/assets/movie11.jpg',
      ...Array.from({ length: 9 }, (_, i) => `/assets/movie${i + 12}.jpg`),
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
      '/assets/artist1.png', '/assets/music1.jpeg', '/assets/artist2.png',
      '/assets/music2.png', '/assets/artist3wbg.png', '/assets/music3.jpg',
      '/assets/artist4wbg.png', '/assets/music4.jpg', '/assets/artist5.png',
      '/assets/music5.jpg', '/assets/artist6wbg.png', '/assets/music6.jpeg',
      '/assets/artist7wbg.png', '/assets/music7.jpg', '/assets/artist8wbg.png',
      '/assets/music8.jpg', '/assets/artist9.png', '/assets/music9.jpg',
      '/assets/artist10wbg.png', '/assets/music10.jpg', '/assets/artist11.png',
      '/assets/music11.png',
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
    images: Array.from({ length: 14 }, (_, i) => `/assets/wikipedia${i + 1}.png`),
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
      '/assets/youtubeVid.png',
      ...Array.from({ length: 21 }, (_, i) => `/assets/youtubeVid${i + 2}.png`),
    ],
    cardWidth: '280px',
    cardHeight: 'auto',
    objectFit: 'contain',
    bg: '#fff',
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
      <div style={{
        fontFamily: 'var(--sans)',
        fontSize: '0.7rem',
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        color: 'var(--text-soft)',
        padding: '0 24px',
        marginBottom: '56px',
      }}>
        II. The Exhibition
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
              <div key={j} style={{
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
                  decoding="async"
                  style={{
                    width: '100%',
                    height: cat.cardHeight === 'auto' ? 'auto' : '100%',
                    objectFit: cat.objectFit,
                    display: 'block',
                  }}
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
      `}</style>
    </section>
  );
}
