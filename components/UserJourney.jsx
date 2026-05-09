/* eslint-disable react/no-unescaped-entities */
'use client';
import { motion } from 'framer-motion';

export default function UserJourney() {
  const steps = [
    {
      num: 'Day 1',
      title: <>The first <em style={{ fontStyle: 'italic', color: 'var(--text-soft)' }}>night.</em></>,
      desc: "He opens the app and it asks him one question. Not 'add your favourite movies.' Just — what's something you consumed recently that stayed with you longer than you expected?",
      quote: "Paterson. The Jim Jarmusch film. It made me feel like ordinary life was secretly enormous, and that scared me because I wasn't sure I was living it that way."
    },
    {
      num: 'Day 7',
      title: <>The first <em style={{ fontStyle: 'italic', color: 'var(--text-soft)' }}>week.</em></>,
      desc: "He comes back not because of a notification — because he thought of something he wanted to add. The taste map is forming. He notices almost everything he loves has something to do with quiet, and time, and the dignity of small things. The map showed him a pattern in himself."
    },
    {
      num: 'Day 12',
      title: <>The <em style={{ fontStyle: 'italic', color: 'var(--text-soft)' }}>resonance.</em></>,
      desc: "The app tells him — someone nearby resonates with your map. Not a face and a bio. Just the shape of what they share. Same film. Same particular melancholy in music. Both wrote something about wanting to build something.",
      quote: "Her name is Nadia. Her map has things he doesn't recognise and wants to."
    },
    {
      num: 'Day 15',
      title: <>The <em style={{ fontStyle: 'italic', color: 'var(--text-soft)' }}>meeting.</em></>,
      desc: "A restored Italian film at a small theatre in Koregaon Park. Afterwards, chai. Two hours. About the film, about the city, about what they're both quietly trying to build. At no point does it feel like a first meeting. It feels like a conversation that was already in progress and they just found where it had been waiting."
    }
  ];

  return (
    <section
      className="mobile-padding"
      style={{
        background: 'var(--bg-off)',
        padding: 'clamp(72px, 10vw, 160px) clamp(20px, 5vw, 60px)',
        position: 'relative',
      }}
    >

      <div
        className="mobile-stack"
        style={{
          marginBottom: 'clamp(48px, 7vw, 100px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          borderBottom: '1px solid var(--border-crisp)',
          paddingBottom: '40px',
        }}
      >
        <h2 style={{
          fontFamily: 'var(--serif)',
          fontWeight: 400,
          fontSize: 'clamp(2rem, 5vw, 4.5rem)',
          lineHeight: 1.05,
          color: 'var(--text-pure)',
        }}>
          Meet Arjun. 26, Pune.
        </h2>
        <div style={{
          fontFamily: 'var(--sans)',
          fontSize: '0.8rem',
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--text-soft)',
          marginBottom: '8px',
          whiteSpace: 'nowrap',
        }}>
          V. A Case Study
        </div>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
        maxWidth: '1000px',
        margin: '0 auto',
        borderLeft: '1px solid var(--border-crisp)',
      }}>
        {steps.map((step, i) => (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(20px, 3vw, 32px)',
              padding: 'clamp(40px, 6vw, 80px) 0 clamp(40px, 6vw, 80px) clamp(20px, 3.5vw, 40px)',
              borderBottom: i === steps.length - 1 ? 'none' : '1px solid var(--border-crisp)',
              position: 'relative',
            }}
          >
            {/* Timeline dot */}
            <div style={{
              position: 'absolute',
              left: '-5px',
              top: 'clamp(48px, 7vw, 90px)',
              width: '9px',
              height: '9px',
              background: 'var(--text-pure)',
            }} />

            <div style={{
              fontFamily: 'var(--sans)',
              fontSize: '0.8rem',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text-soft)',
              paddingTop: '10px',
            }}>
              {step.num}
            </div>

            <div>
              <h3 style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                fontWeight: 400,
                color: 'var(--text-pure)',
                marginBottom: '20px',
                lineHeight: 1.1,
              }}>
                {step.title}
              </h3>
              <p style={{
                fontFamily: 'var(--sans)',
                fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)',
                lineHeight: 1.8,
                color: 'var(--text-soft)',
                fontWeight: 300,
                marginBottom: step.quote ? 'clamp(24px, 3vw, 40px)' : '0',
              }}>
                {step.desc}
              </p>
              {step.quote && (
                <div style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                  fontStyle: 'italic',
                  lineHeight: 1.5,
                  color: 'var(--text-soft)',
                  paddingLeft: 'clamp(16px, 3vw, 40px)',
                  borderLeft: '1px solid var(--text-pure)',
                }}>
                  "{step.quote}"
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
