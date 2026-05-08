/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LivingText from './LivingText';
import { MoveRight } from 'lucide-react';

export default function Hero() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isObject, setIsObject] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsObject((prev) => !prev);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    console.log("Waitlist email submitted:", email);
    setSubmitted(true);
  };

  return (
    <section 
      className="mobile-padding"
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'var(--bg-pure)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 60px',
        zIndex: 10,
        alignItems: 'center'
      }}
    >
      <div style={{ maxWidth: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 20 }}>
        
        {/* Main Heading */}
        <motion.h1 
          style={{
            fontSize: 'clamp(3rem, 6vw, 6rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            marginBottom: '3rem',
            color: 'var(--text-pure)',
            fontFamily: 'var(--serif)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
        >
          You are not{" "}
          <div style={{ display: 'inline-grid', gridTemplateColumns: '1fr', gridTemplateRows: '1fr', verticalAlign: 'bottom', textAlign: 'left', margin: '0 8px' }}>
            <AnimatePresence mode="popLayout">
              {isObject ? (
                <motion.span
                  key="content"
                  initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -40, filter: "blur(4px)" }}
                  transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                  style={{ gridArea: '1/1/2/2', whiteSpace: 'nowrap' }}
                >
                  the <LivingText text="content" className="italic opacity-80" />
                </motion.span>
              ) : (
                <motion.span
                  key="feed"
                  initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -40, filter: "blur(4px)" }}
                  transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                  style={{ gridArea: '1/1/2/2', whiteSpace: 'nowrap' }}
                >
                  the <LivingText text="feed" className="italic opacity-80" />
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <br style={{ display: 'block', margin: '10px 0' }}/>
          you scroll.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: 'var(--sans)', fontSize: '1.2rem', lineHeight: 1.8, color: 'var(--text-soft)', fontWeight: 300, maxWidth: '600px', marginBottom: '60px' }}
        >
          The Fourth Place maps your inner world, connects you with the people nearby who resonate, and brings you together in the physical one. Designed for depth, curated like a gallery.
        </motion.p>
        
        {/* Waitlist Form */}
        <div style={{ width: '100%', maxWidth: '400px', position: 'relative', marginTop: '2rem' }}>
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form 
                key="form"
                onSubmit={handleSubmit}
                style={{ display: 'flex', alignItems: 'flex-end', width: '100%', borderBottom: '1px solid rgba(0,0,0,0.2)', paddingBottom: '8px', position: 'relative' }}
                className="group waitlist-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <label htmlFor="email" style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: '8px' }}>
                    Enter the waitlist
                  </label>
                  <input 
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    style={{ width: '100%', background: 'transparent', fontSize: '1.5rem', outline: 'none', border: 'none', fontFamily: 'var(--serif)' }}
                    required
                  />
                </div>
                <button 
                  type="submit"
                  style={{ paddingBottom: '4px', paddingLeft: '16px', opacity: 0.5, transition: 'opacity 0.3s', cursor: 'pointer', background: 'none', border: 'none' }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0.5'}
                >
                  <MoveRight strokeWidth={1} size={32} />
                </button>
                <span style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: '1px', background: 'black', transform: 'scaleX(0)', transition: 'transform 1s cubic-bezier(0.19,1,0.22,1)', transformOrigin: 'left' }} className="waitlist-underline" />
                <style jsx>{`
                  .waitlist-form:focus-within .waitlist-underline {
                    transform: scaleX(1) !important;
                  }
                  input::placeholder {
                    color: rgba(0,0,0,0.2);
                  }
                `}</style>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                style={{ textAlign: 'center', fontFamily: 'var(--serif)', fontSize: '1.25rem' }}
                initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <motion.span 
                  style={{ display: 'inline-block' }}
                  animate={{ y: [-5, -20, -50], opacity: [1, 0.8, 0], scale: [1, 1.2, 0.5] }}
                  transition={{ duration: 3, ease: "easeOut", type: "tween" }}
                >
                  🕊️
                </motion.span>
                <p style={{ marginTop: '16px' }}>Your room awaits.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
