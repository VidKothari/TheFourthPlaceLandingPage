/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
'use client';

const EditorialPolaroid = ({ className, imgSrc, title, subtitle, style }) => (
  <div className={`interactive ${className || ''}`} style={{
    display: 'flex',
    flexDirection: 'column',
    ...style
  }}>
    <div className="image-frame" style={{
      width: '100%',
      aspectRatio: '3/4',
      marginBottom: '20px',
    }}>
      {imgSrc && <img src={imgSrc} alt={title} />}
    </div>

    <div style={{ color: 'var(--text-pure)' }}>
      <div style={{
        fontFamily: 'var(--serif)',
        fontSize: 'clamp(1rem, 2vw, 1.5rem)',
        lineHeight: 1.3,
        marginBottom: '10px',
        fontWeight: 400,
        color: 'var(--text-pure)',
      }}>
        "{title}"
      </div>
      <div style={{
        fontFamily: 'var(--sans)',
        fontSize: '0.75rem',
        fontWeight: 500,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        color: 'var(--text-soft)',
      }}>
        {subtitle}
      </div>
    </div>
  </div>
);

export default function RealWorld() {
  return (
    <section
      id="real-world"
      className="mobile-padding"
      style={{
        background: 'var(--bg-pure)',
        padding: 'clamp(72px, 10vw, 160px) clamp(20px, 5vw, 60px)',
        borderTop: '1px solid var(--border-crisp)',
      }}
    >

      {/* Header row */}
      <div
        className="mobile-stack"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: 'clamp(24px, 4vw, 40px)',
          marginBottom: 'clamp(48px, 8vw, 120px)',
        }}
      >
        <div>
          <div style={{
            fontFamily: 'var(--sans)',
            fontSize: '0.8rem',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--text-soft)',
            marginBottom: '32px',
          }}>
            IV. The Physical
          </div>
          <h2 style={{
            fontFamily: 'var(--serif)',
            fontWeight: 400,
            fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
            lineHeight: 1.05,
            color: 'var(--text-pure)',
          }}>
            The map finds them.<br />
            <em style={{ fontStyle: 'italic', color: 'var(--text-soft)' }}>You find each other.</em>
          </h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '10px' }}>
          <p style={{
            fontFamily: 'var(--sans)',
            fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
            lineHeight: 1.6,
            color: 'var(--text-soft)',
            fontWeight: 300,
            maxWidth: '500px',
          }}>
            The Fourth Place suggests things to do together — a film screening, a bookstore, a walk, a venue that fits the specific texture of who you both are. The rest is up to you.
          </p>
        </div>
      </div>

      {/* Polaroid grid — collapses to 2 columns on tablet, 1 on mobile */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
        gap: 'clamp(24px, 4vw, 60px)',
      }}>
        <EditorialPolaroid
          title="We talked for three hours. It felt like a conversation that was already in progress."
          subtitle="Arjun & Nadia · Pune · bookstore"
          imgSrc="/assets/hero_bg.png"
          style={{ gridRow: 'span 2' }}
        />

        <EditorialPolaroid
          title="A film the app suggested."
          subtitle="Mumbai · independent cinema"
          imgSrc="/assets/youtubeVid.png"
        />

        <EditorialPolaroid
          title="Chai after. Two hours."
          subtitle="Pune · Koregaon Park"
          imgSrc="/assets/youtubeVid2.png"
          style={{ paddingTop: 'clamp(0px, 5vw, 80px)' }}
        />

        <EditorialPolaroid
          title="An old part of the city."
          subtitle="Bengaluru · walking"
          imgSrc="/assets/wikipedia2.png"
        />

        <EditorialPolaroid
          title="A band they'd both saved."
          subtitle="Mumbai · live music"
          imgSrc="/assets/notSocial.png"
        />
      </div>
    </section>
  );
}
