/* eslint-disable react/no-unescaped-entities */
'use client';
import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MoveRight } from 'lucide-react';
import { INK, cutout, eyebrowStyle } from './shared';
import InkSettleHeading from './InkSettle';

export default function RisoWaitlist({ waitlist }) {
  const reduce = useReducedMotion();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [position, setPosition] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || status === 'sending') return;
    setStatus('sending');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('failed');
      const data = await res.json().catch(() => ({}));
      if (data?.position) setPosition(data.position);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      id="waitlist"
      className="riso-grain mobile-padding"
      style={{
        background: INK.mustard,
        padding: 'clamp(72px, 11vw, 170px) clamp(20px, 5vw, 60px)',
      }}
    >
      <div
        className="waitlist-grid"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '0.85fr 1.15fr',
          gap: 'clamp(2.5rem, 6vw, 6rem)',
          alignItems: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={waitlist.img}
            alt={waitlist.imgAlt}
            style={{ ...cutout(), maxWidth: '26rem' }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ ...eyebrowStyle(INK.ink), opacity: 0.65, marginBottom: '1.5rem' }}>
            The Waitlist
          </div>
          <InkSettleHeading
            as="h2"
            ink={INK.red}
            style={{
              fontFamily: 'var(--serif)',
              fontWeight: 400,
              fontSize: 'clamp(2.1rem, 5vw, 4.2rem)',
              lineHeight: 1.1,
              color: INK.ink,
              marginBottom: '1rem',
              textWrap: 'balance',
            }}
          >
            Your inner world deserves a <em style={{ fontStyle: 'italic' }}>home.</em>
          </InkSettleHeading>
          <p style={{
            fontFamily: 'var(--sans)',
            fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
            lineHeight: 1.7,
            color: 'rgba(22,19,16,0.8)',
            fontWeight: 300,
            marginBottom: 'clamp(32px, 4vw, 48px)',
            maxWidth: '32rem',
          }}>
            Leave your email, and we'll write to you the moment we open.
          </p>

          <div style={{ width: '100%', maxWidth: '430px' }}>
            <AnimatePresence mode="wait">
              {status !== 'success' ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  style={{ width: '100%' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.6 }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-end',
                      width: '100%',
                      background: INK.paper,
                      border: `3px solid ${INK.ink}`,
                      boxShadow: '7px 7px 0 rgba(22,19,16,0.3)',
                      padding: '0.9rem 1rem',
                    }}
                  >
                    <div style={{ flex: 1, textAlign: 'left' }}>
                      <label
                        htmlFor="waitlist-email"
                        style={{
                          display: 'block',
                          fontSize: '0.68rem',
                          fontFamily: 'var(--sans)',
                          fontWeight: 500,
                          textTransform: 'uppercase',
                          letterSpacing: '0.14em',
                          color: 'rgba(22,19,16,0.65)',
                          marginBottom: '6px',
                        }}
                      >
                        Join the waitlist
                      </label>
                      <input
                        id="waitlist-email"
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
                        placeholder="your@email.com"
                        disabled={status === 'sending'}
                        style={{
                          width: '100%',
                          background: 'transparent',
                          fontSize: 'clamp(1.15rem, 3.5vw, 1.4rem)',
                          outline: 'none',
                          border: 'none',
                          fontFamily: 'var(--serif)',
                          color: INK.ink,
                          opacity: status === 'sending' ? 0.5 : 1,
                        }}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      aria-label="Submit email"
                      disabled={status === 'sending'}
                      style={{
                        paddingLeft: '14px',
                        cursor: status === 'sending' ? 'wait' : 'pointer',
                        background: 'none',
                        border: 'none',
                        color: INK.ink,
                        minWidth: '44px',
                        minHeight: '44px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <MoveRight strokeWidth={1.5} size={30} />
                    </button>
                  </div>

                  <div aria-live="polite" style={{ minHeight: '1.6rem', marginTop: '0.75rem', textAlign: 'left' }}>
                    {status === 'error' && (
                      <span style={{
                        fontFamily: 'var(--sans)',
                        fontWeight: 400,
                        fontSize: '0.85rem',
                        color: '#6f1d12',
                      }}>
                        That didn't go through. Try once more?
                      </span>
                    )}
                    {status === 'sending' && (
                      <span style={{
                        fontFamily: 'var(--serif)',
                        fontStyle: 'italic',
                        fontSize: '0.95rem',
                        color: 'rgba(22,19,16,0.75)',
                      }}>
                        One moment…
                      </span>
                    )}
                  </div>

                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  style={{
                    textAlign: 'left',
                    background: INK.paper,
                    border: `3px solid ${INK.ink}`,
                    boxShadow: '7px 7px 0 rgba(22,19,16,0.3)',
                    padding: '1.6rem 1.5rem',
                  }}
                  // The card stamps onto the page: one spring, scale 1.04 -> 1.
                  initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={
                    reduce
                      ? { duration: 0.3 }
                      : { opacity: { duration: 0.25 }, scale: { type: 'spring', stiffness: 340, damping: 26 } }
                  }
                >
                  <p style={{
                    fontFamily: 'var(--serif)',
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    color: INK.ink,
                    marginBottom: '0.6rem',
                  }}>
                    You're in.
                  </p>
                  <p style={{
                    fontFamily: 'var(--sans)',
                    fontWeight: 300,
                    fontSize: '1rem',
                    color: 'rgba(22,19,16,0.8)',
                    lineHeight: 1.6,
                  }}>
                    We'll write to you as soon as we open.
                  </p>
                  {position && (
                    <p style={{
                      fontFamily: 'var(--sans)',
                      fontWeight: 500,
                      fontSize: '0.72rem',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'rgba(22,19,16,0.6)',
                      marginTop: '1.2rem',
                    }}>
                      No. {position} on the list
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        section :global(input::placeholder) {
          color: rgba(22, 19, 16, 0.35);
        }
        @media (max-width: 860px) {
          .waitlist-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
