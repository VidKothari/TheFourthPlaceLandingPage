/* eslint-disable react/no-unescaped-entities */
'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MoveRight } from 'lucide-react';
import { INK } from './shared';

// Open Floor folds into the footer as a disclosure, so the page ends on the waitlist.
function OpenFloor() {
  const [open, setOpen] = useState(true); // expanded by default per Siddharth, July 16
  const [thought, setThought] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!thought || status === 'sending') return;
    setStatus('sending');
    try {
      const res = await fetch('/api/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ thought, email: email || undefined }),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div style={{
      borderBottom: '1px solid rgba(239,230,208,0.25)',
      paddingBottom: 'clamp(2.5rem, 5vw, 4rem)',
      marginBottom: 'clamp(2rem, 4vw, 3rem)',
      maxWidth: '62rem',
      marginLeft: 'auto',
      marginRight: 'auto',
    }}>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.7rem',
          textAlign: 'center', width: '100%', marginBottom: '0.5rem',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 500,
          letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(239,230,208,0.6)',
        }}>
          Open Floor
        </span>
        <span style={{
          fontFamily: 'var(--serif)', fontSize: 'clamp(1.35rem, 2.8vw, 2rem)',
          color: INK.paper, lineHeight: 1.3, textWrap: 'balance',
        }}>
          You're early. <em style={{ fontStyle: 'italic' }}>Your ideas carry real weight here.</em>
          <span aria-hidden="true" style={{ color: 'rgba(239,230,208,0.6)', fontSize: '1.1rem', marginLeft: '0.8rem', transform: open ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s', display: 'inline-block' }}>
            +
          </span>
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="openfloor-grid" style={{
              paddingTop: '2rem',
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) clamp(12rem, 22vw, 17rem)',
              gap: 'clamp(2rem, 5vw, 4.5rem)',
              alignItems: 'center',
            }}>
            <div>
              <p style={{
                fontFamily: 'var(--sans)', fontWeight: 300, fontSize: '0.95rem',
                lineHeight: 1.7, color: 'rgba(239,230,208,0.8)', marginBottom: '1.5rem',
              }}>
                We're building in the open, and the people who arrive first shape
                what this becomes. If you can picture a feature that would make
                this feel more like home — write it down. The founders read every
                submission personally.
              </p>

              {status !== 'success' ? (
                <form onSubmit={handleSubmit}>
                  <label
                    htmlFor="openfloor-thought"
                    style={{
                      display: 'block', fontSize: '0.68rem', fontFamily: 'var(--sans)', fontWeight: 500,
                      textTransform: 'uppercase', letterSpacing: '0.14em',
                      color: 'rgba(239,230,208,0.6)', marginBottom: '0.5rem',
                    }}
                  >
                    Your thought
                  </label>
                  <textarea
                    id="openfloor-thought"
                    value={thought}
                    onChange={(e) => { setThought(e.target.value); if (status === 'error') setStatus('idle'); }}
                    placeholder="A feature I keep wishing for..."
                    rows={3}
                    style={{
                      width: '100%', background: 'rgba(239,230,208,0.06)', color: INK.paper,
                      border: '2px solid rgba(239,230,208,0.4)', padding: '0.8rem',
                      fontFamily: 'var(--sans)', fontWeight: 300, fontSize: '0.95rem',
                      outline: 'none', resize: 'vertical', marginBottom: '1rem',
                    }}
                    required
                  />
                  <label
                    htmlFor="openfloor-email"
                    style={{
                      display: 'block', fontSize: '0.68rem', fontFamily: 'var(--sans)', fontWeight: 500,
                      textTransform: 'uppercase', letterSpacing: '0.14em',
                      color: 'rgba(239,230,208,0.6)', marginBottom: '0.5rem',
                    }}
                  >
                    Email <span style={{ textTransform: 'none', letterSpacing: 0 }}>(optional — if you'd like us to follow up)</span>
                  </label>
                  <input
                    id="openfloor-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    style={{
                      width: '100%', background: 'rgba(239,230,208,0.06)', color: INK.paper,
                      border: '2px solid rgba(239,230,208,0.4)', padding: '0.8rem',
                      fontFamily: 'var(--sans)', fontWeight: 300, fontSize: '0.95rem',
                      outline: 'none', marginBottom: '1.25rem',
                    }}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                        background: INK.paper, color: INK.ink,
                        border: 'none', padding: '0.8rem 1.6rem',
                        fontFamily: 'var(--sans)', fontWeight: 500, fontSize: '0.82rem',
                        letterSpacing: '0.08em', textTransform: 'uppercase',
                        cursor: status === 'sending' ? 'wait' : 'pointer',
                        opacity: status === 'sending' ? 0.6 : 1,
                      }}
                    >
                      Send it <MoveRight strokeWidth={1.5} size={16} />
                    </button>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'rgba(239,230,208,0.55)' }}>
                      → founders@thefourthplace.me
                    </span>
                  </div>
                  <div aria-live="polite" style={{ minHeight: '1.4rem', marginTop: '0.7rem' }}>
                    {status === 'error' && (
                      <span style={{ fontFamily: 'var(--sans)', fontSize: '0.85rem', color: INK.coral }}>
                        That didn't go through. Try once more?
                      </span>
                    )}
                  </div>
                </form>
              ) : (
                <div aria-live="polite">
                  <p style={{ fontFamily: 'var(--serif)', fontSize: '1.4rem', color: INK.paper, marginBottom: '0.4rem' }}>
                    We got it.
                  </p>
                  <p style={{ fontFamily: 'var(--sans)', fontWeight: 300, fontSize: '0.92rem', color: 'rgba(239,230,208,0.75)' }}>
                    Every thought shapes what comes next.
                  </p>
                </div>
              )}
            </div>

            <img
              src="/assets/redesign/openfloor-box.webp"
              alt="A halftone hand dropping a folded note into a magenta suggestion box"
              className="openfloor-art"
              style={{
                width: '100%',
                border: '2px solid rgba(239,230,208,0.35)',
                boxShadow: '6px 6px 0 rgba(0,0,0,0.45)',
                display: 'block',
              }}
            />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <style jsx>{`
        @media (max-width: 700px) {
          :global(.openfloor-grid) {
            grid-template-columns: 1fr !important;
          }
          :global(.openfloor-art) {
            max-width: 13rem;
          }
        }
      `}</style>
    </div>
  );
}

export default function RisoFooter() {
  const [footnoteOpen, setFootnoteOpen] = useState(false);

  return (
    <footer
      className="mobile-padding"
      style={{
        background: INK.ink,
        padding: 'clamp(48px, 7vw, 88px) clamp(20px, 5vw, 60px) clamp(28px, 4vw, 40px)',
        borderTop: `3px solid ${INK.ink}`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative' }}>
        <OpenFloor />

        {/* The IV — decorative to everyone except the curious. Click it. */}
        <button
          onClick={() => setFootnoteOpen(true)}
          aria-label="A footnote"
          style={{
            position: 'absolute',
            right: 'clamp(0.25rem, 3vw, 2rem)',
            bottom: '-1.2em',
            fontFamily: 'var(--serif)',
            fontWeight: 300,
            fontSize: 'clamp(6rem, 14vw, 12rem)',
            lineHeight: 1,
            color: 'transparent',
            WebkitTextStroke: '1px rgba(239,230,208,0.1)',
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'default',
            userSelect: 'none',
            zIndex: 1,
          }}
        >
          IV
        </button>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          <div style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            color: INK.paper,
            fontStyle: 'italic',
          }}>
            The Fourth Place
          </div>

          <div
            className="mobile-hide"
            style={{
              fontFamily: 'var(--sans)',
              fontSize: '0.75rem',
              fontWeight: 400,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(239,230,208,0.6)',
              order: 3,
              width: '100%',
              textAlign: 'center',
            }}
          >
            Not everyone. Just the ones that make sense.
          </div>

          <div style={{
            fontFamily: 'var(--sans)',
            fontSize: '0.75rem',
            fontWeight: 400,
            letterSpacing: '0.1em',
            color: 'rgba(239,230,208,0.6)',
          }}>
            © 2026
          </div>
        </div>
      </div>

      {/* The footnote — after Ray Oldenburg */}
      <AnimatePresence>
        {footnoteOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setFootnoteOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 3000,
              background: 'rgba(22, 19, 16, 0.88)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              cursor: 'pointer',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                maxWidth: '26rem',
                background: INK.paper,
                border: `3px solid ${INK.ink}`,
                boxShadow: '10px 10px 0 rgba(0,0,0,0.4)',
                padding: 'clamp(2rem, 5vw, 3rem)',
                textAlign: 'left',
              }}
            >
              <p style={{
                fontFamily: 'var(--sans)',
                fontWeight: 500,
                fontSize: '0.62rem',
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: 'rgba(22,19,16,0.55)',
                marginBottom: '1.5rem',
              }}>
                Footnote iv.
              </p>
              <p style={{
                fontFamily: 'var(--serif)',
                fontWeight: 400,
                fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                lineHeight: 1.7,
                color: INK.ink,
                marginBottom: '1.5rem',
              }}>
                The first place is home. The second is work. The third is the
                café — where you are surrounded by people, and still unmet.
                <em style={{ fontStyle: 'italic' }}> The fourth is the one you carry inside you.</em>
              </p>
              <p style={{
                fontFamily: 'var(--sans)',
                fontWeight: 300,
                fontSize: '0.8rem',
                color: 'rgba(22,19,16,0.65)',
              }}>
                — after Ray Oldenburg, <em style={{ fontStyle: 'italic' }}>The Great Good Place</em>, 1989
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
