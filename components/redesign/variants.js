import { INK } from './shared';

// Consolidated July 16 per Siddharth's review: ONE version. Hero from the old v1
// (his favorite), waitlist art from the old v2 (engraved — his pick, pending an
// "more original" round, see docs/inspo/NEXT-ROUND.md). Alternates parked below.
export const VARIANTS = {
  1: {
    key: 'keeper',
    hero: {
      layout: 'split', // text left, art right
      field: INK.red,
      onField: { display: INK.paper, body: INK.bodyOnRed },
      img: '/assets/redesign/hero-flowers.webp',
      imgAlt: 'A halftone portrait on poster red: hands press a daisy and a marigold over his eyes',
      imgRatio: '4 / 5',
      // Plays once and holds on the final frame; reduced-motion/mobile-data users get the poster.
      video: {
        webm: '/assets/redesign/hero-motion-hands.webm',
        mp4: '/assets/redesign/hero-motion-hands.mp4',
        poster: '/assets/redesign/hero-motion-hands-poster.jpg',
      },
      cta: { bg: INK.paper, fg: INK.ink },
    },
    feed: { field: INK.chartreuse, onField: INK.ink }, // flagged: green too overpowering — re-ink next round
    waitlist: {
      img: '/assets/redesign/waitlist-door.webp',
      imgAlt: 'A figure opens a door cut into the mustard field, revealing a miniature museum wall',
    },
    eyesTile: false,
  },
};

// Parked assets from the retired versions (all in public/assets/redesign/):
// hero-hands.webp (bleed layout), hero-busts.webp (split-reverse),
// waitlist-sunburst.webp, waitlist-hands.webp, eyes-grid.webp.

// Real artwork on the exhibition wall (curated from the site's own poster/cover library).
export const WALL_ARTIFACTS = [
  { src: '/assets/movie3.webp',  glow: INK.coral,   w: 15, top: 8,  left: 6,  rot: -5 },
  { src: '/assets/book7.webp',   glow: INK.mustard, w: 12, top: 46, left: 16, rot: 3 },
  { src: '/assets/music4.webp',  glow: INK.coral,   w: 14, top: 12, left: 44, rot: 2 },
  { src: '/assets/movie14.webp', glow: INK.mustard, w: 15, top: 50, left: 56, rot: -3 },
  { src: '/assets/book2.webp',   glow: INK.coral,   w: 12, top: 10, left: 80, rot: 4 },
  { src: '/assets/music9.webp',  glow: INK.mustard, w: 14, top: 56, left: 80, rot: -2 },
];

// The three museum wall labels (verbatim copy) move from the hero onto the exhibition wall.
export const WALL_LABELS = [
  { num: 'Exhibit i',   label: 'Film',  text: 'The one that broke something open, that you still can’t explain to anyone.',       top: 66, left: 4,  rot: -2 },
  { num: 'Exhibit ii',  label: 'Album', text: 'The one you only play at 2am, when you need to feel something real.',                  top: 4,  left: 26, rot: 1.5 },
  { num: 'Exhibit iii', label: 'Book',  text: 'The dog-eared one you keep trying to give everyone you love.',                          top: 68, left: 34, rot: -1 },
];
