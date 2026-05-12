/* eslint-disable react/no-unescaped-entities */
'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoveRight } from 'lucide-react';

export default function Suggestions() {
  const [thought, setThought] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!thought.trim()) return;
    try {
      await fetch('/api/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ thought, email }),
      });
    } catch {
      // fail silently
    }
    setNotes((prev) => [{ id: Date.now(), text: thought.trim() }, ...prev]);
    setSubmitted(true);
  };

  return (
    <section
      id="suggestions"
      className="mobile-padding"
      style={{
        background: 'var(--bg-off)',
        borderTop: '1px solid var(--border-crisp)',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.25rem, 5vw, 3.75rem)',
      }}
    >
      <div
        className="mobile-stack"
        style={{
          maxWidth: '68.75rem',
          margin: '0 auto',
          display: 'flex',
          gap: 'clamp(3rem, 8vw, 6rem)',
          alignItems: 'flex-start',
        }}
      >

        {/* Left — heading */}
        <motion.div
          initial={{ opacity: 0, y: '1.25rem' }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ flex: 1 }}
        >
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 500,
            textTransform: 'uppercase', letterSpacing: '0.12em',
            color: 'var(--text-soft)', marginBottom: '1.5rem',
          }}>
            Open Floor
          </p>
          <h2 style={{
            fontFamily: 'var(--serif)', fontWeight: 400,
            fontSize: 'clamp(1.9rem, 3.5vw, 3rem)', lineHeight: 1.15,
            color: 'var(--text-pure)', marginBottom: '1.25rem',
          }}>
            You're early.<br />
            <em style={{ fontStyle: 'italic', color: 'var(--text-soft)' }}>
              Your ideas carry real weight here.
            </em>
          </h2>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)',
            lineHeight: 1.7, color: 'var(--text-soft)', fontWeight: 300,
            maxWidth: '30rem',
          }}>
            We're building in the open, and the people who arrive first shape what this becomes.
            If you can picture a feature that would make this feel more like home — write it down.
            The founders read every submission personally.
          </p>
        </motion.div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, y: '1.25rem' }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{ flex: 1 }}
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
              >
                {/* Thought textarea */}
                <div>
                  <label style={{
                    display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                    textTransform: 'uppercase', letterSpacing: '0.12em',
                    color: 'var(--text-soft)', marginBottom: '0.75rem',
                  }}>
                    Your thought
                  </label>
                  <textarea
                    value={thought}
                    onChange={(e) => setThought(e.target.value)}
                    placeholder="A feature I keep wishing for..."
                    rows={5}
                    required
                    style={{
                      width: '100%',
                      background: 'var(--bg-pure)',
                      border: '1px solid var(--border-crisp)',
                      padding: '1rem 1.25rem',
                      fontFamily: 'var(--sans)',
                      fontSize: '1rem',
                      fontWeight: 300,
                      lineHeight: 1.6,
                      color: 'var(--text-pure)',
                      outline: 'none',
                      resize: 'vertical',
                      minHeight: '8rem',
                      transition: 'border-color 0.3s',
                    }}
                    onFocus={(e) => { e.target.style.borderColor = 'var(--text-pure)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--border-crisp)'; }}
                  />
                </div>

                {/* Optional email */}
                <div>
                  <label style={{
                    display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                    textTransform: 'uppercase', letterSpacing: '0.12em',
                    color: 'var(--text-soft)', marginBottom: '0.75rem',
                  }}>
                    Email{' '}
                    <span style={{ opacity: 0.45, textTransform: 'none', letterSpacing: 0 }}>
                      (optional — if you'd like us to follow up)
                    </span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    style={{
                      width: '100%',
                      background: 'var(--bg-pure)',
                      border: '1px solid var(--border-crisp)',
                      padding: '0.875rem 1.25rem',
                      fontFamily: 'var(--sans)',
                      fontSize: '1rem',
                      fontWeight: 300,
                      color: 'var(--text-pure)',
                      outline: 'none',
                      transition: 'border-color 0.3s',
                    }}
                    onFocus={(e) => { e.target.style.borderColor = 'var(--text-pure)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--border-crisp)'; }}
                  />
                </div>

                {/* Submit row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                  <p style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                    color: 'var(--text-soft)', opacity: 0.6,
                    letterSpacing: '0.05em',
                  }}>
                    → founders@thefourthplace.me
                  </p>
                  <button
                    type="submit"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.625rem',
                      background: 'var(--text-pure)', color: 'var(--bg-pure)',
                      border: 'none', padding: '0.875rem 1.75rem',
                      fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                      textTransform: 'uppercase', letterSpacing: '0.12em',
                      cursor: 'pointer', transition: 'opacity 0.25s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.72'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
                  >
                    Send it <MoveRight strokeWidth={1} size={16} />
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: '0.625rem' }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                style={{ paddingTop: '0.5rem' }}
              >
                <p style={{
                  fontFamily: 'var(--serif)', fontWeight: 400,
                  fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                  color: 'var(--text-pure)', marginBottom: '0.75rem', lineHeight: 1.2,
                }}>
                  We got it.
                </p>
                <p style={{
                  fontFamily: 'var(--sans)', fontSize: '1rem', fontWeight: 300,
                  color: 'var(--text-soft)', lineHeight: 1.6,
                }}>
                  Every thought shapes what comes next.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
