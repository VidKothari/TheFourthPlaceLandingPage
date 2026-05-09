'use client';
import { useEffect, useState } from 'react';

export default function MobileDebugger() {
  const [errors, setErrors] = useState([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Catch JS runtime errors
    const handleError = (event) => {
      setErrors(prev => [...prev, {
        type: 'error',
        msg: `${event.message}`,
        src: `${event.filename?.split('/').slice(-2).join('/')}:${event.lineno}:${event.colno}`,
        stack: event.error?.stack?.split('\n').slice(0,4).join('\n') || ''
      }]);
    };

    // Catch unhandled promise rejections
    const handleRejection = (event) => {
      setErrors(prev => [...prev, {
        type: 'rejection',
        msg: `Unhandled Promise: ${event.reason?.message || event.reason}`,
        src: '',
        stack: event.reason?.stack?.split('\n').slice(0,4).join('\n') || ''
      }]);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 99999,
      maxHeight: '50vh',
      overflowY: 'auto',
      background: '#000',
      color: '#0f0',
      fontFamily: 'monospace',
      fontSize: '11px',
      padding: '8px',
      borderTop: '2px solid red',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <strong style={{ color: '#ff0', fontSize: '13px' }}>
          📱 Mobile Debugger — {errors.length === 0 ? '✅ No errors yet' : `❌ ${errors.length} error(s)`}
        </strong>
        <button onClick={() => setVisible(false)} style={{ background: '#333', color: '#fff', border: 'none', padding: '2px 8px', cursor: 'pointer' }}>
          ✕
        </button>
      </div>

      <div style={{ color: '#aaa', fontSize: '10px', marginBottom: '8px' }}>
        UA: {typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 80) : 'N/A'}
      </div>

      {errors.length === 0 ? (
        <div style={{ color: '#888' }}>Scroll the page and interact — errors will appear here.</div>
      ) : (
        errors.map((err, i) => (
          <div key={i} style={{ borderTop: '1px solid #333', paddingTop: '6px', marginTop: '6px' }}>
            <div style={{ color: '#f55' }}>▶ [{err.type.toUpperCase()}] {err.msg}</div>
            {err.src && <div style={{ color: '#aaa' }}>  at {err.src}</div>}
            {err.stack && <pre style={{ color: '#888', margin: '4px 0 0 8px', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{err.stack}</pre>}
          </div>
        ))
      )}
    </div>
  );
}
