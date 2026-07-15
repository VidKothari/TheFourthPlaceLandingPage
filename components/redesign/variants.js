import { INK } from './shared';

// Consolidated July 16 per Siddharth's review: ONE version. Hero from the old v1
// (his favorite), waitlist art from the old v2 (engraved — his pick, pending an
// "more original" round, see docs/inspo/NEXT-ROUND.md). Alternates parked below.
export const VARIANTS = {
  1: {
    key: 'keeper',
    hero: {
      // Door film retired (July 16 review). Static flowers portrait while the
      // next short film direction gets picked off the board (Room 04⅞).
      layout: 'split',
      field: INK.red,
      onField: { display: INK.paper, body: INK.bodyOnRed },
      img: '/assets/redesign/hero-flowers.webp',
      imgAlt: 'A halftone portrait on poster red: hands press a daisy and a marigold over his eyes',
      imgRatio: '4 / 5',
      cta: { bg: INK.paper, fg: INK.ink },
    },
    feed: { field: INK.chartreuse, onField: INK.ink }, // flagged: green too overpowering — re-ink next round
    waitlist: {
      img: '/assets/redesign/waitlist-halo.webp',
      imgAlt: 'A figure lies starfished on a mattress, ringed by a halo of taped-up posters',
    },
    eyesTile: false,
  },
};

// Parked assets from the retired versions (all in public/assets/redesign/):
// hero-hands.webp (bleed layout), hero-busts.webp (split-reverse),
// waitlist-sunburst.webp, waitlist-hands.webp, eyes-grid.webp.

// The salon hang: a disciplined museum wall. Every artwork is matted and framed;
// each family has its exhibit card. `group` drives the family-pop hover.
// Label copy: i-iii verbatim from the old hero wall labels; iv-vi verbatim from
// TheThread's category copy (spirals/video essays/other worlds).
export const WALL_SEQUENCE = [
  { type: 'art', src: '/assets/movie3.webp', group: 'films', rot: -1.2 },
  { type: 'label', group: 'films', num: 'Exhibit i', label: 'Film', text: 'The one that broke something open, that you still can’t explain to anyone.', rot: 0.8 },
  { type: 'art', src: '/assets/music4.webp', group: 'albums', rot: 1 },
  { type: 'art', src: '/assets/wikipedia3.webp', group: 'spirals', rot: -0.8 },
  { type: 'label', group: 'albums', num: 'Exhibit ii', label: 'Album', text: 'The one you only play at 2am, when you need to feel something real.', rot: -1 },
  { type: 'art', src: '/assets/book7.webp', group: 'books', rot: 0.9 },
  { type: 'art', src: '/assets/game5.jpg', group: 'games', rot: -1 },
  { type: 'label', group: 'books', num: 'Exhibit iii', label: 'Book', text: 'The dog-eared one you keep trying to give everyone you love.', rot: 1.1 },
  { type: 'art', src: '/assets/youtubeVid15.webp', group: 'videos', rot: 0.7, wide: true },
  { type: 'art', src: '/assets/movie14.webp', group: 'films', rot: 1.2 },
  { type: 'label', group: 'spirals', num: 'Exhibit iv', label: 'Spiral', text: 'The rabbit holes that ate whole nights.', rot: -0.7 },
  { type: 'art', src: '/assets/music9.webp', group: 'albums', rot: -1 },
  { type: 'art', src: '/assets/wikipedia9.webp', group: 'spirals', rot: 0.8 },
  { type: 'label', group: 'videos', num: 'Exhibit v', label: 'Video', text: 'The ones you rewatch every year.', rot: 1 },
  { type: 'art', src: '/assets/game11.jpg', group: 'games', rot: -0.9 },
  { type: 'art', src: '/assets/book2.webp', group: 'books', rot: 1 },
  { type: 'label', group: 'games', num: 'Exhibit vi', label: 'Game', text: 'The ones that swallowed whole summers.', rot: -1.1 },
  { type: 'art', src: '/assets/youtubeVid7.webp', group: 'videos', rot: -0.6, wide: true },
];
