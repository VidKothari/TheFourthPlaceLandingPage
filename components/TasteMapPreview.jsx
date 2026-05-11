/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function TasteMapPreview() {
  const [isMobile, setIsMobile] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const [mounted, setMounted] = useState(false);
  const lastTapRef = useRef(0);

  useIsomorphicLayoutEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    document.body.style.overflow = engaged ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [engaged]);

  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 350) setEngaged(false);
    lastTapRef.current = now;
  };

  const stagger = (i) => ({
    initial: { opacity: 0, y: '1.5rem' },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-8%' },
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <>
      <section id="tastemap" style={{
        background: 'var(--text-pure)',
        borderTop: '1px solid var(--border-crisp)',
        position: 'relative',
      }}>
        {/* Text header — always shown on both desktop and mobile */}
        <div
          className="mobile-padding"
          style={{
            padding: 'clamp(4.5rem, 10vw, 7.5rem) clamp(1.25rem, 5vw, 3.75rem) 3rem',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <motion.span {...stagger(0)} style={{
            fontFamily: 'var(--sans)', fontWeight: 500, fontSize: '0.8rem',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.6)', marginBottom: '2rem', display: 'block',
          }}>
            Taste Map
          </motion.span>

          <motion.h2 {...stagger(1)} style={{
            fontFamily: 'var(--serif)', fontWeight: 400,
            fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', lineHeight: 1.05,
            color: 'var(--bg-pure)', marginBottom: '1.25rem',
          }}>
            Your <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.6)' }}>cultural constellation.</em>
          </motion.h2>

          <motion.p {...stagger(2)} style={{
            fontFamily: 'var(--sans)', fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
            lineHeight: 1.6, color: 'rgba(255,255,255,0.8)', fontWeight: 300,
            maxWidth: '35rem',
          }}>
            Every node is something that moved you. Every cluster is a part of your inner world.
            Switch between two people. Hit Merge — watch what you share glow gold.
          </motion.p>

          {/* Mobile CTA — only rendered on mobile */}
          {isMobile && (
            <motion.div {...stagger(3)}>
              <button
                onClick={() => setEngaged(true)}
                style={{
                  marginTop: '2.5rem',
                  padding: '1rem 2rem',
                  background: 'rgba(255,255,255,0.08)',
                  border: '0.5px solid rgba(255,255,255,0.3)',
                  borderRadius: '3rem',
                  color: '#fff',
                  fontFamily: 'var(--sans)',
                  fontSize: '1rem',
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                <span style={{ fontSize: '1rem' }}>✦</span>
                Explore your constellation
              </button>
            </motion.div>
          )}
        </div>

        {/* Desktop: inline iframe */}
        {!isMobile && (
          <>
            <iframe
              src="/tastemap.html"
              style={{ width: '100%', height: '100vh', border: 'none', display: 'block' }}
              title="TasteMap Interactive 3D View"
            />
            <div
              className="tastemap-bottom mobile-padding"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(1.25rem, 5vw, 3.75rem)',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                gap: '1rem',
              }}
            >
              <div style={{
                fontFamily: 'var(--sans)', fontSize: '0.8rem', fontWeight: 500,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.6)',
              }}>
                Drag to rotate · scroll to zoom · click any node
              </div>
              <div style={{
                fontFamily: 'var(--serif)', fontStyle: 'italic',
                fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                color: 'var(--bg-pure)', textAlign: 'right',
              }}>
                This is what two people's inner worlds look like together.
              </div>
            </div>
          </>
        )}

        {/* Mobile footer caption */}
        {isMobile && (
          <motion.div {...stagger(4)} style={{
            padding: '1.5rem clamp(1.25rem, 5vw, 3.75rem)',
            borderTop: '1px solid rgba(255,255,255,0.1)',
          }}>
            <p style={{
              fontFamily: 'var(--serif)', fontStyle: 'italic',
              fontSize: '1.1rem', color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.5,
            }}>
              This is what two people's inner worlds look like together.
            </p>
          </motion.div>
        )}
      </section>

      {/* Mobile fullscreen portal */}
      {mounted && isMobile && engaged && createPortal(
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: '#000',
          display: 'flex', flexDirection: 'column',
        }}>
          {/* Double-tap exit strip */}
          <div
            onTouchEnd={handleDoubleTap}
            style={{
              height: '3rem',
              flexShrink: 0,
              background: 'rgba(0,0,0,0.95)',
              borderBottom: '0.5px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              touchAction: 'manipulation',
              userSelect: 'none',
              cursor: 'pointer',
            }}
          >
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
              textTransform: 'uppercase', letterSpacing: '0.15em',
              color: 'rgba(255,255,255,0.4)',
              pointerEvents: 'none',
            }}>
              Double-tap to exit
            </span>
          </div>

          {/* Tastemap iframe */}
          <iframe
            src="/tastemap.html"
            style={{
              flex: 1,
              width: '100%',
              border: 'none',
              display: 'block',
            }}
            title="TasteMap Interactive"
          />
        </div>,
        document.body
      )}
    </>
  );
}
