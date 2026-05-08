/* eslint-disable react/no-unescaped-entities */
'use client';

export default function Footer() {
  return (
    <footer className="mobile-stack mobile-padding" style={{
      background: 'var(--bg-pure)',
      padding: '40px 60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderTop: '1px solid var(--border-crisp)'
    }}>
      <div style={{
        fontFamily: 'var(--serif)',
        fontSize: '1.5rem',
        color: 'var(--text-pure)',
        fontStyle: 'italic'
      }}>
        The Fourth Place
      </div>
      
      <div style={{
        fontFamily: 'var(--sans)',
        fontSize: '0.8rem',
        fontWeight: 500,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--text-soft)'
      }}>
        Not everyone. Just the ones that make sense.
      </div>
      
      <div style={{
        fontFamily: 'var(--sans)',
        fontSize: '0.8rem',
        fontWeight: 500,
        letterSpacing: '0.1em',
        color: 'var(--text-soft)'
      }}>
        © 2025
      </div>
    </footer>
  );
}
