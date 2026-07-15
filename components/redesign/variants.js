import { INK } from './shared';

// Consolidated July 16 per Siddharth's review: ONE version. Hero from the old v1
// (his favorite), waitlist art from the old v2 (engraved — his pick, pending an
// "more original" round, see docs/inspo/NEXT-ROUND.md). Alternates parked below.
export const VARIANTS = {
  1: {
    key: 'keeper',
    hero: {
      // "She shows up" (his choreography, July 16): he places the white daisy,
      // she arrives with hers and gives him the marigold, then takes one too.
      // Plays once and holds on the two of them.
      layout: 'split',
      field: INK.red,
      onField: { display: INK.paper, body: INK.bodyOnRed },
      img: '/assets/redesign/hero-flowers-still.webp',
      imgAlt: 'A boy and a girl stand side by side on poster red, each with one white and one yellow flower over their eyes',
      imgRatio: '16 / 9',
      video: {
        webm: '/assets/redesign/hero-flowers-film.webm',
        mp4: '/assets/redesign/hero-flowers-film.mp4',
        poster: '/assets/redesign/hero-flowers-film-poster.webp',
        aspect: '16 / 9',
      },
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

// The passive exhibition. Every family and artifact stays visible in the page
// flow. Card copy: i-iii verbatim from the old hero wall labels;
// iv-vi verbatim from TheThread's category copy.
export const EXHIBIT_CARDS = {
  films:   { num: 'Exhibit i',   label: 'Film',   accent: INK.coral,   text: 'The one that broke something open, that you still can’t explain to anyone.' },
  albums:  { num: 'Exhibit ii',  label: 'Artists / Albums / Songs', accent: INK.mustard, text: 'The one you only play at 2am, when you need to feel something real.' },
  books:   { num: 'Exhibit iii', label: 'Book',   accent: INK.chartreuse, text: 'The dog-eared one you keep trying to give everyone you love.' },
  spirals: { num: 'Exhibit iv',  label: 'Wikipedia & Articles', accent: INK.paperDeep, text: 'The rabbit holes that ate whole nights.' },
  videos:  { num: 'Exhibit v',   label: 'YouTube Videos', accent: INK.red, accentInk: INK.paper, text: 'The ones you rewatch every year.' },
  games:   { num: 'Exhibit vi',  label: 'Game',   accent: INK.magenta, accentInk: INK.paper, text: 'The ones that swallowed whole summers.' },
};

export const EXHIBIT_ITEMS = [
  { src: '/assets/movie3.webp', group: 'films' },
  { src: '/assets/music4.webp', group: 'albums' },
  { src: '/assets/book7.webp', group: 'books' },
  { src: '/assets/wikipedia3.webp', group: 'spirals', wide: true },
  { src: '/assets/youtubeVid15.webp', group: 'videos', wide: true },
  { src: '/assets/game5.jpg', group: 'games' },
  { src: '/assets/movie14.webp', group: 'films' },
  { src: '/assets/music9.webp', group: 'albums' },
  { src: '/assets/book2.webp', group: 'books' },
  { src: '/assets/wikipedia9.webp', group: 'spirals', wide: true },
  { src: '/assets/youtubeVid7.webp', group: 'videos', wide: true },
  { src: '/assets/game11.jpg', group: 'games' },
];
