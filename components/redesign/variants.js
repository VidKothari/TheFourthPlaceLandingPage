import { INK } from './shared';

// Consolidated July 16 per Siddharth's review: ONE version. Hero from the old v1
// (his favorite), waitlist art from the old v2 (engraved — his pick, pending an
// "more original" round, see docs/inspo/NEXT-ROUND.md). Alternates parked below.
export const VARIANTS = {
  1: {
    key: 'keeper',
    hero: {
      // The door film: he opens a door in the red and the camera drifts into his
      // taste-map world, then gently back out (ping-pong baked into the file).
      layout: 'film-bleed',
      field: INK.red,
      onField: { display: INK.paper, body: INK.bodyOnRed },
      img: '/assets/redesign/hero-door-poster.webp',
      imgAlt: 'A figure opens a door cut into a red wall, revealing a glowing constellation of framed pictures',
      video: {
        webm: '/assets/redesign/hero-door.webm',
        mp4: '/assets/redesign/hero-door.mp4',
        poster: '/assets/redesign/hero-door-poster.webp',
        loop: true,
      },
      cta: { bg: INK.paper, fg: INK.ink },
    },
    feed: { field: INK.chartreuse, onField: INK.ink }, // flagged: green too overpowering — re-ink next round
    waitlist: {
      img: '/assets/redesign/waitlist-jacket.webp',
      imgAlt: 'A figure walks toward a warm-lit porch wearing a jacket sewn from album covers and book spines',
    },
    eyesTile: false,
  },
};

// Parked assets from the retired versions (all in public/assets/redesign/):
// hero-hands.webp (bleed layout), hero-busts.webp (split-reverse),
// waitlist-sunburst.webp, waitlist-hands.webp, eyes-grid.webp.

// Real artwork on the exhibition wall (curated from the site's own poster/cover library).
// `group` drives the hover behavior: hovering one item makes its whole family pop.
export const WALL_ARTIFACTS = [
  { src: '/assets/movie3.webp',       group: 'films',     glow: INK.coral,   w: 14, top: 6,  left: 5,  rot: -5 },
  { src: '/assets/movie14.webp',      group: 'films',     glow: INK.coral,   w: 14, top: 48, left: 55, rot: -3 },
  { src: '/assets/book7.webp',        group: 'books',     glow: INK.mustard, w: 11, top: 44, left: 15, rot: 3 },
  { src: '/assets/book2.webp',        group: 'books',     glow: INK.mustard, w: 11, top: 7,  left: 79, rot: 4 },
  { src: '/assets/music4.webp',       group: 'albums',    glow: INK.coral,   w: 12, top: 9,  left: 42, rot: 2 },
  { src: '/assets/music9.webp',       group: 'albums',    glow: INK.coral,   w: 12, top: 55, left: 81, rot: -2 },
  { src: '/assets/wikipedia3.webp',   group: 'spirals',   glow: INK.paper,   w: 12, top: 30, left: 27, rot: 2 },
  { src: '/assets/wikipedia9.webp',   group: 'spirals',   glow: INK.paper,   w: 11, top: 74, left: 6,  rot: -2 },
  { src: '/assets/game5.jpg',         group: 'games',     glow: INK.magenta, w: 11, top: 27, left: 63, rot: -4 },
  { src: '/assets/game11.jpg',        group: 'games',     glow: INK.magenta, w: 11, top: 76, left: 70, rot: 3 },
  { src: '/assets/youtubeVid7.webp',  group: 'videos',    glow: INK.mustard, w: 16, top: 74, left: 38, rot: 2 },
  { src: '/assets/youtubeVid15.webp', group: 'videos',    glow: INK.mustard, w: 15, top: 30, left: 5,  rot: -1 },
];

// The three museum wall labels (verbatim copy) move from the hero onto the exhibition wall.
export const WALL_LABELS = [
  { num: 'Exhibit i',   label: 'Film',  text: 'The one that broke something open, that you still can’t explain to anyone.',       top: 66, left: 4,  rot: -2 },
  { num: 'Exhibit ii',  label: 'Album', text: 'The one you only play at 2am, when you need to feel something real.',                  top: 4,  left: 26, rot: 1.5 },
  { num: 'Exhibit iii', label: 'Book',  text: 'The dog-eared one you keep trying to give everyone you love.',                          top: 68, left: 34, rot: -1 },
];
