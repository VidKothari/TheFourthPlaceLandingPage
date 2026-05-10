/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
'use client';

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

// Runs synchronously before paint on client, avoids isMobile flicker
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function Manifesto() {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  useIsomorphicLayoutEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    // GSAP pinning is expensive on mobile and causes layout bugs — skip it
    if (window.innerWidth < 768) return;

    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || sectionsRef.current.length === 0) return;

    sectionsRef.current.forEach((section, index) => {
      if (index === sectionsRef.current.length - 1) return;

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        endTrigger: containerRef.current,
        end: "bottom bottom",
        pin: true,
        pinSpacing: false,
      });

      gsap.to(section, {
        scrollTrigger: {
          trigger: sectionsRef.current[index + 1],
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
        opacity: 0,
        scale: 0.8,
        filter: "blur(10px)",
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const setRef = (el, index) => {
    if (el) {
      sectionsRef.current[index] = el;
    }
  };

  // On mobile: animate immediately (no scroll-triggered reveal).
  // On desktop: use whileInView for the scroll reveal.
  // Filter/blur is removed from all animation props to prevent the
  // "permanently blurred" bug caused by isMobile state timing.
  const textAnim = isMobile
    ? { animate: { opacity: 1, y: 0 }, initial: { opacity: 0, y: 20 } }
    : { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: false, margin: "-20%" } };
  const textTransition = { type: 'spring', stiffness: 300, damping: 22 };

  const imgAnim = isMobile
    ? { animate: { opacity: 1, scale: 1 }, initial: { opacity: 0, scale: 0.96 } }
    : { initial: { opacity: 0, scale: 0.92 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: false, margin: "-20%" } };
  const imgTransition = { type: 'spring', stiffness: 260, damping: 20, delay: isMobile ? 0 : 0.1 };

  const cardAnim = isMobile
    ? { animate: { opacity: 1 }, initial: { opacity: 0 } }
    : { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: false, margin: "-20%" } };
  const cardTransition = { duration: 0.6, ease: [0.16, 1, 0.3, 1] };

  return (
    <div ref={containerRef} id="manifesto" style={{ position: 'relative', width: '100%', zIndex: 20 }}>

      {/* Section 1: The Problem */}
      <div
        ref={(el) => setRef(el, 0)}
        style={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg-pure)',
          borderTop: '1px solid var(--border-crisp)',
          transformOrigin: 'top',
          padding: 'clamp(3.75rem, 8vw, 5rem) 0',
        }}
      >
        <div
          className="mobile-stack mobile-padding"
          style={{
            maxWidth: '1100px',
            width: '100%',
            padding: '0 clamp(1.25rem, 5vw, 2.5rem)',
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(2.5rem, 7vw, 5rem)',
            justifyContent: 'space-between',
          }}
        >
          <motion.div
            {...textAnim}
            transition={textTransition}
            style={{ flex: 1 }}
          >
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              marginBottom: '2rem',
              color: 'rgba(0,0,0,0.4)',
            }}>
              01. The Problem
            </p>
            <h2 style={{
              fontSize: 'clamp(1.9rem, 4vw, 3rem)',
              fontFamily: 'var(--serif)',
              lineHeight: 1.2,
              marginBottom: '1.5rem',
            }}>
              Social media forgot what <em style={{ fontStyle: 'italic', color: 'var(--text-soft)' }}>social</em> means.
            </h2>
            <p style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
              fontFamily: 'var(--sans)',
              fontWeight: 300,
              opacity: 0.6,
              lineHeight: 1.6,
            }}>
              You don't open Instagram to connect. You open it to consume.<br />
              The feed is a machine designed to hold your attention, not to introduce you to your people.<br />
              Every platform optimised for reach and got performance. For engagement and got addiction.
            </p>
          </motion.div>
          <motion.div
            {...imgAnim}
            transition={imgTransition}
            style={{ flex: 1, display: 'flex', justifyContent: 'center' }}
          >
            <div style={{
              padding: 'clamp(0.75rem, 2vw, 1.25rem)',
              background: 'var(--bg-off)',
              border: '1px solid var(--border-crisp)',
              width: '100%',
              maxWidth: '28rem',
            }}>
              <img
                src="/assets/notSocial.png"
                alt="Not Social"
                loading="eager"
                style={{ width: '100%', objectFit: 'cover' }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Section 2: The Truth */}
      <div
        ref={(el) => setRef(el, 1)}
        className="manifesto-bg"
        style={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'url(/assets/thetruth.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderTop: '1px solid var(--border-crisp)',
          transformOrigin: 'top',
          boxShadow: '0 -1.25rem 3.125rem rgba(0,0,0,0.05)',
          padding: 'clamp(3.75rem, 8vw, 5rem) 0',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.72)' }}/>
        <div
          className="mobile-padding"
          style={{
            maxWidth: '800px',
            width: '100%',
            padding: '0 1.5rem',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <motion.div
            {...cardAnim}
            transition={cardTransition}
            style={{
              border: '1px solid var(--border-crisp)',
              padding: 'clamp(2rem, 5vw, 3.75rem) clamp(1.25rem, 4vw, 2.5rem)',
              background: 'var(--bg-pure)',
              position: 'relative',
            }}
          >
            <div style={{
              position: 'absolute',
              top: '-3.125rem',
              left: '50%',
              width: '1px',
              height: '3.125rem',
              background: 'var(--border-crisp)',
            }} />

            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              marginBottom: '2rem',
              color: 'rgba(0,0,0,0.4)',
            }}>
              02. The Truth
            </p>
            <h2 style={{
              fontSize: 'clamp(1.9rem, 4vw, 3rem)',
              fontFamily: 'var(--serif)',
              lineHeight: 1.2,
              marginBottom: '2rem',
            }}>
              The truest parts of you have nowhere to live.
            </h2>
            <p style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
              fontFamily: 'var(--sans)',
              fontWeight: 300,
              opacity: 0.6,
              lineHeight: 1.6,
            }}>
              <em style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                color: 'var(--text-pure)',
              }}>
                The film that broke something open, the album you only play when you need to feel something real, the book you've been trying to give everyone you love
              </em>{" "}
              — they sit in private notes apps and dog-eared pages.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Section 3: The Solution */}
      <div
        ref={(el) => setRef(el, 2)}
        className="manifesto-bg"
        style={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'url(/assets/thesolution.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderTop: '1px solid var(--border-crisp)',
          transformOrigin: 'top',
          boxShadow: '0 -1.25rem 3.125rem rgba(0,0,0,0.05)',
          padding: 'clamp(3.75rem, 8vw, 5rem) 0',
          position: 'relative',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(255,255,255,0.72)',
        }}/>
        <div
          className="mobile-padding"
          style={{
            maxWidth: '800px',
            width: '100%',
            padding: '0 1.5rem',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <motion.div
            {...cardAnim}
            transition={cardTransition}
          >
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              marginBottom: '2rem',
              color: 'rgba(0,0,0,0.4)',
            }}>
              03. The Solution
            </p>
            <h2 style={{
              fontSize: 'clamp(1.9rem, 4vw, 3rem)',
              fontFamily: 'var(--serif)',
              lineHeight: 1.2,
              marginBottom: '2rem',
            }}>
              We think the self you are in those private moments is the most interesting one.
            </h2>
            <p style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
              fontFamily: 'var(--sans)',
              fontWeight: 300,
              opacity: 0.6,
              lineHeight: 1.6,
              maxWidth: '37.5rem',
              margin: '0 auto 3rem auto',
            }}>
              And we think that self is the best basis for finding people who actually matter to you.
            </p>

            <div style={{ borderTop: '1px solid var(--border-crisp)', paddingTop: '2.5rem' }}>
              <span style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)',
                fontStyle: 'italic',
                color: 'var(--text-pure)',
                lineHeight: 1.2,
                display: 'block',
              }}>
                Not everyone. Just the ones that make sense.
              </span>
            </div>
          </motion.div>
        </div>
      </div>

    </div>
  );
}
