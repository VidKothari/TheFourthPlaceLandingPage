/* eslint-disable react/no-unescaped-entities */
'use client';

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

export default function Manifesto() {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
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

  return (
    <div ref={containerRef} id="manifesto" style={{ position: 'relative', width: '100%', zIndex: 20 }}>
      
      {/* Section 1: The Problem */}
      <div 
        ref={(el) => setRef(el, 0)} 
        style={{ width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-pure)', borderTop: '1px solid var(--border-crisp)', transformOrigin: 'top', padding: '80px 0' }}
      >
        <div className="mobile-stack mobile-padding" style={{ maxWidth: '1100px', width: '100%', padding: '0 40px', display: 'flex', alignItems: 'center', gap: '80px', justifyContent: 'space-between' }}>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-20%" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ flex: 1 }}
          >
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '2rem', color: 'rgba(0,0,0,0.4)' }}>01. The Problem</p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'var(--serif)', lineHeight: 1.2, marginBottom: '2rem' }}>
              Social media forgot what <em style={{ fontStyle: 'italic', color: 'var(--text-soft)' }}>social</em> means.
            </h2>
            <p style={{ fontSize: '1.25rem', fontFamily: 'var(--sans)', fontWeight: 300, opacity: 0.6, lineHeight: 1.6 }}>
              You don't open Instagram to connect. You open it to consume. <br/>
              The feed is a machine designed to hold your attention, not to introduce you to your people. <br/>
              Every platform optimised for reach and got performance. For engagement and got addiction.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: false, margin: "-20%" }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            style={{ flex: 1, display: 'flex', justifyContent: 'center' }}
          >
             <div style={{ padding: '20px', background: 'var(--bg-off)', border: '1px solid var(--border-crisp)' }}>
               <img src="/assets/notSocial.png" alt="Not Social" style={{ width: '100%', maxWidth: '450px', objectFit: 'cover' }} />
             </div>
          </motion.div>
        </div>
      </div>

      {/* Section 2: The Truth */}
      <div 
        ref={(el) => setRef(el, 1)} 
        style={{ width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-off)', borderTop: '1px solid var(--border-crisp)', transformOrigin: 'top', boxShadow: '0 -20px 50px rgba(0,0,0,0.05)', padding: '80px 0' }}
      >
        <div className="mobile-padding" style={{ maxWidth: '800px', width: '100%', padding: '0 24px', textAlign: 'center', position: 'relative' }}>
          <motion.div 
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: false, margin: "-20%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ border: '1px solid var(--border-crisp)', padding: '60px 40px', background: 'var(--bg-pure)', position: 'relative' }}
          >
            <div style={{ position: 'absolute', top: '-50px', left: '50%', width: '1px', height: '50px', background: 'var(--border-crisp)' }} />
            
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '2rem', color: 'rgba(0,0,0,0.4)' }}>02. The Truth</p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'var(--serif)', lineHeight: 1.2, marginBottom: '2rem' }}>
              The truest parts of you have nowhere to live.
            </h2>
            <p style={{ fontSize: '1.25rem', fontFamily: 'var(--sans)', fontWeight: 300, opacity: 0.6, lineHeight: 1.6 }}>
              <em style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', color: 'var(--text-pure)' }}>The film that broke something open, the album you only play when you need to feel something real, the book you've been trying to give everyone you love</em> — they sit in private notes apps and dog-eared pages.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Section 3: The Solution */}
      <div 
        ref={(el) => setRef(el, 2)} 
        style={{ width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-pure)', borderTop: '1px solid var(--border-crisp)', transformOrigin: 'top', boxShadow: '0 -20px 50px rgba(0,0,0,0.05)', padding: '80px 0' }}
      >
        <div className="mobile-padding" style={{ maxWidth: '800px', width: '100%', padding: '0 24px', textAlign: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: "-20%" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '2rem', color: 'rgba(0,0,0,0.4)' }}>03. The Solution</p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'var(--serif)', lineHeight: 1.2, marginBottom: '2rem' }}>
              We think the self you are in those private moments is the most interesting one.
            </h2>
            <p style={{ fontSize: '1.25rem', fontFamily: 'var(--sans)', fontWeight: 300, opacity: 0.6, lineHeight: 1.6, maxWidth: '600px', margin: '0 auto 3rem auto' }}>
              And we think that self is the best basis for finding people who actually matter to you.
            </p>
            
            <div style={{ borderTop: '1px solid var(--border-crisp)', paddingTop: '40px' }}>
              <span style={{ fontFamily: 'var(--serif)', fontSize: '2.5rem', fontStyle: 'italic', color: 'var(--text-pure)', lineHeight: 1.2, display: 'block' }}>
                Not everyone. Just the ones that make sense.
              </span>
            </div>
          </motion.div>
        </div>
      </div>

    </div>
  );
}
