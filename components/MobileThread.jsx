/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
'use client';

const categories = [
  {
    id: 'books',
    label: 'Books',
    sub: 'The literature that rewired your brain.',
    images: [
      '/assets/book3.jpg', '/assets/book7.jpg', '/assets/book9.jpg',
      '/assets/book10.jpg', '/assets/book13.jpg', '/assets/book16.jpg',
    ],
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
      '/assets/movie1.jpg', '/assets/movie2.jpg', '/assets/movie7.jpg',
      '/assets/movie10.jpg', '/assets/movie18.jpg', '/assets/movie20.jpg',
    ],
    cardWidth: '160px',
    cardHeight: 'auto',
    objectFit: 'contain',
    bg: '#f0eee8',
  },
  {
    id: 'music',
    label: 'Music',
    sub: 'The albums you play when you need to feel something real.',
    images: [
      '/assets/music1.jpeg', '/assets/music2.png', '/assets/music4.jpg',
      '/assets/music5.jpg', '/assets/music7.jpg', '/assets/music10.jpg',
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
    images: [
      '/assets/wikipedia1.png', '/assets/wikipedia5.png', '/assets/wikipedia11.png',
      '/assets/wikipedia12.png', '/assets/wikipedia13.png', '/assets/wikipedia14.png',
    ],
    cardWidth: '280px',
    cardHeight: '180px',
    objectFit: 'cover',
    bg: '#fff',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    sub: 'Video essays, lectures, and music videos you rewatch every year.',
    images: [
      '/assets/youtubeVid3.png', '/assets/youtubeVid4.png', '/assets/youtubeVid6.png',
      '/assets/youtubeVid12.png', '/assets/youtubeVid13.png', '/assets/youtubeVid20.png',
    ],
    cardWidth: '280px',
    cardHeight: '158px',
    objectFit: 'cover',
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
                height: cat.cardHeight,
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
          </div>
        </div>
      ))}

      <style>{`
        .mobile-thread-strip::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
