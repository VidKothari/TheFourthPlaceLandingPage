/* eslint-disable react/no-unescaped-entities */
'use client';

export default function FeaturesGrid() {
  const features = [
    {
      num: '01',
      title: <>Your <em style={{ fontStyle: 'italic', color: 'var(--text-soft)' }}>taste map</em></>,
      desc: "Add the films, music, books, articles, threads — anything that has genuinely meant something to you. Write what it did to you, not what you think of it. The map builds itself from your honesty.",
      tag: "Living portrait",
    },
    {
      num: '02',
      title: <>Your <em style={{ fontStyle: 'italic', color: 'var(--text-soft)' }}>collections</em></>,
      desc: "Cabinet-of-curiosities style boards. A folder for what makes loneliness feel smaller. A chapter of your life. Everything that reminds you of someone. Links, images, writing, videos — held together by feeling.",
      tag: "Private archive",
    },
    {
      num: '03',
      title: <>What you <em style={{ fontStyle: 'italic', color: 'var(--text-soft)' }}>want to do</em></>,
      desc: "Write the things you want to do that feel too big or too odd to say most places. Build a startup. Go on a solo trip. Find someone to explore this city with properly. These shape who we find for you.",
      tag: "Intentional future",
    },
    {
      num: '04',
      title: <>The <em style={{ fontStyle: 'italic', color: 'var(--text-soft)' }}>people nearby</em></>,
      desc: "When your map has enough of you in it, we find the people in your city whose inner world rhymes with yours. Not by age or profession — by what moves them, and what they want. Then we suggest something real you could do together.",
      tag: "Resonant matching",
    }
  ];

  return (
    <section
      className="mobile-padding section-v-lg"
      style={{
        background: 'var(--bg-pure)',
        padding: 'clamp(80px, 10vw, 160px) clamp(20px, 5vw, 60px)',
        position: 'relative',
      }}
    >

      <div
        className="mobile-stack"
        style={{
          marginBottom: 'clamp(48px, 8vw, 120px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          borderBottom: '1px solid var(--text-pure)',
          paddingBottom: '40px',
        }}
      >
        <h2 style={{
          fontFamily: 'var(--serif)',
          fontWeight: 400,
          fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
          lineHeight: 1.05,
          color: 'var(--text-pure)',
        }}>
          Four things that<br />work together.
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
          III. The Architecture
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
        gap: '1px',
        background: 'var(--border-crisp)',
        border: '1px solid var(--border-crisp)',
      }}>
        {features.map((f, i) => (
          <div
            key={i}
            className="interactive"
            style={{
              background: 'var(--bg-pure)',
              padding: 'clamp(40px, 5vw, 80px) clamp(20px, 4vw, 60px)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{
              fontFamily: 'var(--sans)',
              fontSize: '1rem',
              fontWeight: 300,
              color: 'var(--text-soft)',
              marginBottom: 'clamp(24px, 3vw, 40px)',
            }}>
              [ {f.num} ]
            </div>
            <h3 style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
              fontWeight: 400,
              color: 'var(--text-pure)',
              marginBottom: '20px',
            }}>
              {f.title}
            </h3>
            <p style={{
              fontFamily: 'var(--sans)',
              fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
              lineHeight: 1.8,
              fontWeight: 300,
              color: 'var(--text-soft)',
              marginBottom: 'clamp(32px, 4vw, 60px)',
              flex: 1,
            }}>
              {f.desc}
            </p>
            <div style={{
              borderTop: '1px solid var(--border-crisp)',
              paddingTop: '24px',
              fontFamily: 'var(--sans)',
              fontSize: '0.8rem',
              fontWeight: 500,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: 'var(--text-soft)',
            }}>
              {f.tag}
            </div>
          </div>
        ))}

        {/* Statement Card */}
        <div
          className="interactive"
          style={{
            gridColumn: '1 / -1',
            background: 'var(--bg-off)',
            color: 'var(--text-pure)',
            padding: 'clamp(48px, 7vw, 100px) clamp(20px, 5vw, 60px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <h3 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(1.3rem, 3vw, 2.5rem)',
            fontWeight: 400,
            maxWidth: '1000px',
            lineHeight: 1.4,
          }}>
            "The social outcome is the surprise, not the goal. You come to add things and reflect. The finding of people happens as a consequence of being honest about who you are."
          </h3>
          <div style={{
            fontFamily: 'var(--sans)',
            fontSize: '0.8rem',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--text-soft)',
          }}>
            No followers — No feed — No performance
          </div>
        </div>
      </div>
    </section>
  );
}
