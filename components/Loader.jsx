'use client';
import { useEffect, useState } from 'react';

export default function Loader() {
  const [hidden, setHidden] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const finish = () => {
      setFadeOut(true);
      setTimeout(() => setHidden(true), 800);
    };

    if (document.readyState === 'complete') {
      setTimeout(finish, 400);
    } else {
      window.addEventListener('load', () => setTimeout(finish, 400));
    }
  }, []);

  if (hidden) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 99999,
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '32px',
      transition: 'opacity 0.8s ease',
      opacity: fadeOut ? 0 : 1,
      pointerEvents: fadeOut ? 'none' : 'all',
    }}>
      <img
        src="/assets/TFPicon.webp"
        alt="The Fourth Place"
        style={{
          width: '72px',
          height: '72px',
          objectFit: 'contain',
          animation: 'tfp-pulse 2s ease-in-out infinite',
        }}
      />
      <div style={{
        width: '120px',
        height: '1px',
        background: '#e5e5e5',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          background: '#000',
          animation: 'tfp-bar 1.8s ease-in-out infinite',
        }} />
      </div>
      <style>{`
        @keyframes tfp-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.95); }
        }
        @keyframes tfp-bar {
          0% { left: -100%; width: 100%; }
          50% { left: 0%; width: 100%; }
          100% { left: 100%; width: 100%; }
        }
      `}</style>
    </div>
  );
}
