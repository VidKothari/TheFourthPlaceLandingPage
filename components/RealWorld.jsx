/* eslint-disable react/no-unescaped-entities */
'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const cards = [
  {
    tag: 'Film',
    accent: '#7C6245',
    nodes: 6,
    people: ['A.', 'N.'],
    shared: "Nolan and Tarantino are both on your lists. Tarkovsky's Stalker is too — less common overlap.",
    where: 'Prithvi Theatre, Juhu',
    when: 'This Saturday · 7 PM',
    suggestion: "35mm screening of Stalker. Two hours, no intermission. A few seats left.",
    action: 'Reserve seats',
  },
  {
    tag: 'Music',
    accent: '#4A3470',
    nodes: 8,
    people: ['K.', 'M.'],
    shared: "Pink Floyd, Led Zeppelin, and Sufjan Stevens all show up in both your listening histories.",
    where: 'antiSOCIAL, Lower Parel',
    when: 'Friday · 9 PM',
    suggestion: "A live set covering classic rock. Small venue, about 80 people. Doors at 8:30.",
    action: 'See the lineup',
  },
  {
    tag: 'Plans',
    accent: '#3D5C3A',
    nodes: 5,
    people: ['R.', 'S.'],
    shared: "Both of you love Linkin Park and Nirvana. Both of you want to start an indie rock band. You play the guitar, he plays the drums.",
    where: 'Jamroom, Bandra',
    when: 'Weekends open',
    suggestion: "There's a rehearsal space nearby. You could start with one session and see if it works.",
    action: 'Start a conversation',
  },
  {
    tag: 'Plans',
    accent: '#5C3D2E',
    nodes: 7,
    people: ['D.', 'L.'],
    shared: "Building a startup is a dream you both share. Both of you have read Shoedog by Phil Knight and watched The Social Network, and have a similar instinct to create something that lasts.",
    where: 'Bombay Connect, BKC',
    when: 'This week',
    suggestion: "Definitely worth a first conversation.",
    action: 'Set up a time',
  },
  {
    tag: 'Film',
    accent: '#2A4A62',
    nodes: 5,
    people: ['P.', 'V.'],
    shared: "Call Me By Your Name and October are both on your lists. P. is in Berlin. You're in Mumbai.",
    where: 'Video call',
    when: 'This week',
    suggestion: "Watch October together on a call. It's 2 hours. Worth a first conversation either way.",
    action: 'Send a message',
  },
  {
    tag: 'Literature',
    accent: '#5A4A2E',
    nodes: 4,
    people: ['T.', 'F.'],
    shared: "Nietzsche, Camus, and a deep interest in Ottoman and WW2 history show up on both your lists. T. is in Delhi. You're in Mumbai.",
    where: 'Video call',
    when: 'Available evenings',
    suggestion: "They're open to a call. Probably a long one.",
    action: 'Start a conversation',
  },
  {
    tag: 'Plans',
    accent: '#6B3E26',
    nodes: 3,
    people: ['H.', 'J.'],
    shared: "You just moved to Bangalore and want to spend a week thoroughly exploring a city you don't know. They said the same.",
    where: 'Start a conversation',
    when: 'Flexible',
    suggestion: "Start with a conversation. If it clicks, you can explore the city together.",
    action: 'Reach out',
  },
  {
    tag: 'Place',
    accent: '#4A6741',
    nodes: 6,
    people: ['C.', 'B.'],
    shared: "Modernist architecture and pre-independence Mumbai's photgraphy articles show up on both your lists. Six nodes in common.",
    where: 'Ballard Estate, Fort',
    when: 'Saturday · 6:30 AM',
    suggestion: "One of the better-preserved colonial precincts in the city. Worth an early morning before it fills up.",
    action: 'Plan the walk',
  },
];

const ConnectionCard = ({ card, index }) => {
  const [hovered, setHovered] = useState(false);
  const [revealed, setRevealed] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => { if (!revealed) setRevealed(true); }}
      style={{
        background: hovered ? '#111' : 'var(--bg-pure)',
        border: `1px solid ${hovered ? 'transparent' : 'var(--border-crisp)'}`,
        borderRadius: '18px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        cursor: revealed ? 'default' : 'pointer',
        WebkitTapHighlightColor: 'transparent',
        transition: 'background 0.45s ease, box-shadow 0.45s ease',
        boxShadow: hovered
          ? '0 32px 80px rgba(0,0,0,0.28)'
          : '0 1px 4px rgba(0,0,0,0.06)',
        transform: `rotate(${index % 2 === 0 ? '-0.35deg' : '0.35deg'})`,
      }}
    >
      {/* Accent bar */}
      <div style={{
        height: '3px',
        background: card.accent,
        opacity: hovered ? 1 : 0.55,
        transition: 'opacity 0.45s ease',
        flexShrink: 0,
      }}/>

      <div style={{ padding: 'clamp(24px, 2.8vw, 40px)', display: 'flex', flexDirection: 'column', gap: '22px', flex: 1 }}>

        {/* Header row — always visible */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            fontWeight: 600,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: hovered ? card.accent : 'var(--text-soft)',
            transition: 'color 0.45s ease',
          }}>
            {card.tag}
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.58rem',
              color: hovered ? 'rgba(255,255,255,0.3)' : 'var(--text-soft)',
              transition: 'color 0.45s ease',
            }}>
              {card.nodes} nodes shared
            </span>
            <div style={{ display: 'flex' }}>
              {card.people.map((p, i) => (
                <div key={i} style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: hovered ? 'rgba(255,255,255,0.08)' : 'var(--bg-off)',
                  border: `2px solid ${hovered ? '#111' : 'var(--bg-pure)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--serif)', fontStyle: 'italic',
                  fontSize: '0.68rem',
                  color: hovered ? 'rgba(255,255,255,0.65)' : 'var(--text-soft)',
                  transition: 'all 0.45s ease',
                  marginLeft: i === 0 ? 0 : '-8px',
                  zIndex: i === 0 ? 2 : 1,
                  position: 'relative',
                }}>
                  {p}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sealed state */}
        <AnimatePresence>
          {!revealed && (
            <motion.div
              key="sealed"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '14px',
                padding: '36px 20px',
                border: `1px dashed ${hovered ? 'rgba(255,255,255,0.18)' : 'var(--border-crisp)'}`,
                borderRadius: '12px',
                transition: 'border-color 0.45s ease',
                flex: 1,
              }}
            >
              <div style={{ display: 'flex', gap: '5px' }}>
                {Array.from({ length: Math.min(card.nodes, 8) }).map((_, i) => (
                  <div key={i} style={{
                    width: '5px', height: '5px', borderRadius: '50%',
                    background: hovered ? card.accent : 'var(--border-crisp)',
                    transition: 'background 0.45s ease',
                    opacity: 1 - i * 0.08,
                  }}/>
                ))}
              </div>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: hovered ? 'rgba(255,255,255,0.35)' : 'var(--text-soft)',
                transition: 'color 0.45s ease',
              }}>
                Click to reveal
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Revealed content */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              key="revealed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}
            >
              {/* Shared insight */}
              <div>
                <div style={{
                  fontFamily: 'var(--sans)',
                  fontSize: '0.62rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: hovered ? 'rgba(255,255,255,0.28)' : 'var(--text-soft)',
                  marginBottom: '10px',
                  transition: 'color 0.45s ease',
                }}>
                  What you share
                </div>
                <p style={{
                  fontFamily: 'var(--serif)',
                  fontWeight: 400,
                  fontSize: 'clamp(0.95rem, 1.3vw, 1.15rem)',
                  lineHeight: 1.55,
                  color: hovered ? 'rgba(255,255,255,0.88)' : 'var(--text-pure)',
                  margin: 0,
                  transition: 'color 0.45s ease',
                }}>
                  {card.shared}
                </p>
              </div>

              {/* Divider */}
              <div style={{
                height: '1px',
                background: hovered ? 'rgba(255,255,255,0.07)' : 'var(--border-crisp)',
                transition: 'background 0.45s ease',
              }}/>

              {/* Suggestion block */}
              <div style={{
                background: hovered ? 'rgba(255,255,255,0.045)' : 'var(--bg-off)',
                borderRadius: '12px',
                padding: '20px 22px',
                transition: 'background 0.45s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    color: hovered ? card.accent : 'var(--text-soft)',
                    transition: 'color 0.45s ease',
                  }}>
                    {card.where}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.58rem',
                    color: hovered ? 'rgba(255,255,255,0.28)' : 'var(--text-soft)',
                    transition: 'color 0.45s ease',
                  }}>
                    {card.when}
                  </span>
                </div>
                <p style={{
                  fontFamily: 'var(--sans)',
                  fontSize: 'clamp(0.85rem, 1.1vw, 0.98rem)',
                  fontWeight: 300,
                  lineHeight: 1.6,
                  color: hovered ? 'rgba(255,255,255,0.65)' : 'var(--text-soft)',
                  margin: 0,
                  transition: 'color 0.45s ease',
                }}>
                  {card.suggestion}
                </p>
              </div>

              {/* Footer CTA */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  {Array.from({ length: Math.min(card.nodes, 8) }).map((_, i) => (
                    <div key={i} style={{
                      width: '4px', height: '4px', borderRadius: '50%',
                      background: hovered ? card.accent : 'var(--border-crisp)',
                      transition: 'background 0.45s ease',
                      opacity: hovered ? (1 - i * 0.08) : 1,
                    }}/>
                  ))}
                </div>
                <span style={{
                  fontFamily: 'var(--sans)',
                  fontSize: '0.72rem',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  color: hovered ? 'rgba(255,255,255,0.45)' : 'var(--text-soft)',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                  transition: 'color 0.45s ease',
                  cursor: 'pointer',
                }}>
                  {card.action} →
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default function RealWorld() {
  return (
    <section
      id="real-world"
      className="mobile-padding"
      style={{
        background: 'var(--bg-pure)',
        padding: 'clamp(72px, 10vw, 160px) clamp(20px, 5vw, 60px)',
        borderTop: '1px solid var(--border-crisp)',
      }}
    >
      {/* Header */}
      <div
        className="mobile-stack"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: 'clamp(24px, 4vw, 40px)',
          marginBottom: 'clamp(48px, 8vw, 100px)',
        }}
      >
        <div>
          <div style={{
            fontFamily: 'var(--sans)',
            fontSize: '0.8rem',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--text-soft)',
            marginBottom: '32px',
          }}>
            IV. The Physical
          </div>
          <h2 style={{
            fontFamily: 'var(--serif)',
            fontWeight: 400,
            fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
            lineHeight: 1.05,
            color: 'var(--text-pure)',
          }}>
            The map finds them.<br />
            <em style={{ fontStyle: 'italic', color: 'var(--text-soft)' }}>You find each other.</em>
          </h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '10px' }}>
          <p style={{
            fontFamily: 'var(--sans)',
            fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
            lineHeight: 1.6,
            color: 'var(--text-soft)',
            fontWeight: 300,
            maxWidth: '500px',
          }}>
            When two taste maps share enough — the app sends you a card. Not a match. A suggestion. Something real to do, in a real place, based on exactly who you both are.
          </p>
        </div>
      </div>

      {/* Cards grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
        gap: 'clamp(16px, 2.5vw, 28px)',
        alignItems: 'stretch',
      }}>
        {cards.map((card, i) => (
          <ConnectionCard key={i} card={card} index={i} />
        ))}
      </div>
    </section>
  );
}
