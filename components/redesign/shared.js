// Riso redesign tokens + shared primitives.
// Contrast rules (validated July 16): ink text on chartreuse/mustard/coral/paper,
// paper text on cobalt & ink; on field-red use paper for display sizes only,
// #fdf8ec for body. Never magenta for instructional text.
export const INK = {
  red: '#c8291e',
  chartreuse: '#c6e02e',
  magenta: '#e5399f',
  coral: '#ef6a55',
  cobalt: '#2b3fb8',
  mustard: '#e8c53a',
  paper: '#efe6d0',
  paperDeep: '#e6dabe',
  ink: '#161310',
  bodyOnRed: '#fdf8ec',
};

// Hard cut between two field colors: outgoing ink, registration rule, incoming ink.
export function InkCut({ from, to }) {
  return (
    <div aria-hidden="true" style={{ height: '18px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, background: from }} />
      <div style={{ height: '2px', background: INK.ink }} />
      <div style={{ flex: 1, background: to }} />
    </div>
  );
}

export const eyebrowStyle = (color) => ({
  fontFamily: 'var(--sans)',
  fontSize: '0.75rem',
  lineHeight: 1.35,
  fontWeight: 500,
  letterSpacing: '0.24em',
  textTransform: 'uppercase',
  color,
});

// Print cutout: thick ink border + offset "second plate" shadow.
export const cutout = (shadow = 'rgba(22,19,16,0.32)') => ({
  border: `3px solid ${INK.ink}`,
  boxShadow: `10px 10px 0 ${shadow}`,
  display: 'block',
  width: '100%',
  height: 'auto',
});
