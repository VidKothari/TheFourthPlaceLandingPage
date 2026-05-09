/* eslint-disable react/no-unescaped-entities */
'use client';

export default function Footer() {
  return (
    <footer
      className="mobile-padding"
      style={{
        background: 'var(--bg-pure)',
        padding: 'clamp(28px, 4vw, 40px) clamp(20px, 5vw, 60px)',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        borderTop: '1px solid var(--border-crisp)',
      }}
    >
      <div style={{
        fontFamily: 'var(--serif)',
        fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
        color: 'var(--text-pure)',
        fontStyle: 'italic',
      }}>
        The Fourth Place
      </div>

      {/* Tagline hidden on smallest screens to avoid crowding */}
      <div style={{
        fontFamily: 'var(--sans)',
        fontSize: '0.75rem',
        fontWeight: 500,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--text-soft)',
        order: 3,
        width: '100%',
        textAlign: 'center',
      }}
        className="mobile-hide"
      >
        Not everyone. Just the ones that make sense.
      </div>

      <div style={{
        fontFamily: 'var(--sans)',
        fontSize: '0.75rem',
        fontWeight: 500,
        letterSpacing: '0.1em',
        color: 'var(--text-soft)',
      }}>
        © 2025
      </div>
    </footer>
  );
}
