/* eslint-disable react/no-unescaped-entities */
'use client';

export default function TasteMapPreview() {
  return (
    <section id="tastemap" style={{
      background: 'var(--text-pure)',
      borderTop: '1px solid var(--border-crisp)',
      position: 'relative'
    }}>
      <div className="mobile-padding" style={{ padding: '120px 60px 48px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <span style={{ fontFamily: 'var(--sans)', fontWeight: 500, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '40px', display: 'block' }}>
          Taste Map
        </span>
        <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(3rem, 5vw, 4.5rem)', lineHeight: 1.05, color: 'var(--bg-pure)', marginBottom: '24px' }}>
          Your <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.6)' }}>cultural constellation.</em>
        </h2>
        <p style={{ fontFamily: 'var(--sans)', fontSize: '1.25rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)', fontWeight: 300, maxWidth: '600px' }}>
          Every node is something that moved you. Every cluster is a part of your inner world. Switch between two people. Hit Merge — watch what you share glow gold.
        </p>
      </div>
      
      <iframe src="/tastemap.html" style={{ width: '100%', height: '100vh', border: 'none', display: 'block' }} title="TasteMap Interactive 3D View" />
      
      <div className="mobile-stack mobile-padding" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '40px 60px',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ fontFamily: 'var(--sans)', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
          Drag to rotate · scroll to zoom · click any node
        </div>
        <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: '1.5rem', color: 'var(--bg-pure)' }}>
          This is what two people's inner worlds look like together.
        </div>
      </div>
    </section>
  );
}
