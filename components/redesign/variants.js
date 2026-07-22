import { INK } from './shared';

// Consolidated July 16 per Siddharth's review: ONE version. The flower-exchange
// hero is restored; the retired shared-scribbles iteration was removed during
// the July 22 asset cleanup.
export const VARIANTS = {
  1: {
    key: 'keeper',
    hero: {
      // "She shows up": he places the white daisy, she arrives with hers and
      // gives him the marigold, then takes one too. The film plays once and
      // holds on the two of them.
      // The hero now grounds on the app's gallery black; the poster red lives
      // inside the film, hung like art.
      layout: 'split',
      field: INK.base,
      onField: { display: INK.paper, body: INK.bodyOnDark },
      img: '/assets/redesign/hero-flowers-still.webp',
      imgAlt: 'A boy and a girl stand side by side on poster red, each with one white and one yellow flower over their eyes',
      imgRatio: '16 / 9',
      video: {
        // MP4-only: H.264 preserves the halftone grain efficiently here.
        webm: null,
        mobileMp4: '/assets/redesign/hero-flowers-film-mobile.mp4',
        mp4: '/assets/redesign/hero-flowers-film.mp4',
        poster: '/assets/redesign/hero-flowers-film-poster.webp',
        aspect: '16 / 9',
        loop: false,
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

// The retired hero and waitlist variants were removed after the production
// composition was consolidated. eyes-grid.webp remains available to this
// component through the explicit eyesTile flag.

// The passive exhibition. Every family and artifact stays visible in the page
// flow. Card copy: i-iii verbatim from the old hero wall labels;
// iv-vi verbatim from TheThread's category copy.
export const EXHIBIT_CARDS = {
  films:   { num: 'Exhibit i',   label: 'Film',   accent: INK.coral,   text: 'The one that broke something open, that you still can’t explain to anyone.' },
  albums:  { num: 'Exhibit ii',  label: 'Artists / Albums / Songs', accent: INK.mustard, text: 'The one you only play at 2am, when you need to feel something real.' },
  books:   { num: 'Exhibit iii', label: 'Book',   accent: INK.cobalt, accentInk: INK.paper, text: 'The dog-eared one you keep trying to give everyone you love.' },
  spirals: { num: 'Exhibit iv',  label: 'Wikipedia & Articles', accent: INK.paperDeep, text: 'The rabbit holes that ate whole nights.' },
  videos:  { num: 'Exhibit v',   label: 'YouTube Videos', accent: INK.red, accentInk: INK.paper, text: 'The ones you rewatch every year.' },
  games:   { num: 'Exhibit vi',  label: 'Game',   accent: INK.magenta, accentInk: INK.paper, text: 'The ones that swallowed whole summers.' },
};

// TEN artifacts per family for the floating-poster wall in RisoExhibition. The
// first entry in each group is the curated "anchor" (largest piece in the
// scatter); the rest are satellites. Mobile shows the first six of the films
// group. `size` is an optional layout hint the scatter may read; `wide` marks
// landscape source art (articles / videos). Every filename verified present in
// public/assets on 2026-07-22.
export const EXHIBIT_ITEMS = [
  // Film / TV / Anime — real posters (Wikipedia infobox art), 2026-07-22.
  // Siddharth's exact list: movies (in order), then TV, then anime. Posters now
  // render at their natural shape (RisoExhibition dropped the forced aspect), so
  // no `wide` flags. Desktop shows the first 10 (10 slots, posters[i % len]).
  // Movies
  { src: '/assets/redesign/posters/fight-club.webp', group: 'films', size: 'lg' },
  { src: '/assets/redesign/posters/the-godfather.webp', group: 'films', size: 'md' },
  { src: '/assets/redesign/posters/project-x.webp', group: 'films', size: 'md' },
  { src: '/assets/redesign/posters/obsession.webp', group: 'films', size: 'sm' },
  { src: '/assets/redesign/posters/la-la-land.webp', group: 'films', size: 'sm' },
  { src: '/assets/redesign/posters/eternal-sunshine.webp', group: 'films', size: 'sm' },
  { src: '/assets/redesign/posters/up.webp', group: 'films', size: 'sm' },
  { src: '/assets/redesign/posters/the-wolf-of-wall-street.webp', group: 'films', size: 'sm' },
  // TV
  { src: '/assets/redesign/posters/game-of-thrones.webp', group: 'films', size: 'sm' },
  { src: '/assets/redesign/posters/the-office.webp', group: 'films', size: 'sm' },
  { src: '/assets/redesign/posters/how-i-met-your-mother.webp', group: 'films', size: 'sm' },
  // Anime
  { src: '/assets/redesign/posters/one-piece.webp', group: 'films', size: 'sm' },
  { src: '/assets/redesign/posters/spirited-away.webp', group: 'films', size: 'sm' },
  // Artists / Albums / Songs — real album art + artist press photos, 2026-07-23.
  // Album covers first (Siddharth's order), then artist photos. Natural shapes.
  // Album covers
  { src: '/assets/redesign/posters/aalas-ka-pedh.webp', group: 'albums', size: 'lg' },
  { src: '/assets/redesign/posters/graduation.webp', group: 'albums', size: 'md' },
  { src: '/assets/redesign/posters/actual-life.webp', group: 'albums', size: 'md' },
  { src: '/assets/redesign/posters/wish-you-were-here.webp', group: 'albums', size: 'sm' },
  { src: '/assets/redesign/posters/dark-side-of-the-moon.webp', group: 'albums', size: 'sm' },
  { src: '/assets/redesign/posters/am.webp', group: 'albums', size: 'sm' },
  { src: '/assets/redesign/posters/damn.webp', group: 'albums', size: 'sm' },
  { src: '/assets/redesign/posters/american-idiot.webp', group: 'albums', size: 'sm' },
  { src: '/assets/redesign/posters/currents.webp', group: 'albums', size: 'sm' },
  { src: '/assets/redesign/posters/kids.webp', group: 'albums', size: 'sm' },
  // Artist photos
  { src: '/assets/redesign/posters/nirvana.webp', group: 'albums', size: 'sm' },
  { src: '/assets/redesign/posters/linkin-park.webp', group: 'albums', size: 'sm' },
  { src: '/assets/redesign/posters/the-weeknd.webp', group: 'albums', size: 'sm' },
  { src: '/assets/redesign/posters/kanye-west.webp', group: 'albums', size: 'sm' },
  { src: '/assets/redesign/posters/skrillex.webp', group: 'albums', size: 'sm' },
  // Book
  { src: '/assets/book7.webp', group: 'books', size: 'lg' },
  { src: '/assets/book2.webp', group: 'books', size: 'md' },
  { src: '/assets/book1.webp', group: 'books', size: 'md' },
  { src: '/assets/book4.webp', group: 'books', size: 'sm' },
  { src: '/assets/book9.webp', group: 'books', size: 'sm' },
  { src: '/assets/book13.webp', group: 'books', size: 'sm' },
  { src: '/assets/book15.webp', group: 'books', size: 'sm' },
  { src: '/assets/book3.webp', group: 'books', size: 'sm' },
  { src: '/assets/book5.webp', group: 'books', size: 'sm' },
  { src: '/assets/book8.webp', group: 'books', size: 'sm' },
  // Wikipedia & Articles (landscape)
  // "Articles and literally anything": wikipedia rabbit holes mixed with
  // hand-drawn platform post cards (Substack/Medium/Instagram/Reddit/Twitter,
  // SVGs in assets/redesign/anything/) — the breadth IS the message.
  { src: '/assets/wikipedia3.webp', group: 'spirals', wide: true, size: 'lg' },
  { src: '/assets/redesign/anything/substack.svg', group: 'spirals', size: 'md' },
  { src: '/assets/wikipedia9.webp', group: 'spirals', wide: true, size: 'md' },
  { src: '/assets/redesign/anything/reddit.svg', group: 'spirals', size: 'md' },
  { src: '/assets/redesign/anything/instagram.svg', group: 'spirals', size: 'sm' },
  { src: '/assets/wikipedia1.webp', group: 'spirals', wide: true, size: 'sm' },
  { src: '/assets/redesign/anything/twitter.svg', group: 'spirals', size: 'sm' },
  { src: '/assets/wikipedia5.webp', group: 'spirals', wide: true, size: 'sm' },
  { src: '/assets/redesign/anything/medium.svg', group: 'spirals', size: 'sm' },
  { src: '/assets/wikipedia7.webp', group: 'spirals', wide: true, size: 'sm' },
  // YouTube Videos (landscape)
  { src: '/assets/youtubeVid15.webp', group: 'videos', wide: true, size: 'lg' },
  { src: '/assets/youtubeVid7.webp', group: 'videos', wide: true, size: 'md' },
  { src: '/assets/youtubeVid3.webp', group: 'videos', wide: true, size: 'md' },
  { src: '/assets/youtubeVid5.webp', group: 'videos', wide: true, size: 'sm' },
  { src: '/assets/youtubeVid10.webp', group: 'videos', wide: true, size: 'sm' },
  { src: '/assets/youtubeVid12.webp', group: 'videos', wide: true, size: 'sm' },
  { src: '/assets/youtubeVid2.webp', group: 'videos', wide: true, size: 'sm' },
  { src: '/assets/youtubeVid4.webp', group: 'videos', wide: true, size: 'sm' },
  { src: '/assets/youtubeVid6.webp', group: 'videos', wide: true, size: 'sm' },
  { src: '/assets/youtubeVid8.webp', group: 'videos', wide: true, size: 'sm' },
  // Game — real cover / key art (Wikipedia infobox + official key art), 2026-07-23.
  // Siddharth's order. Natural shapes; game covers are fair-use res (~250-290px).
  { src: '/assets/redesign/posters/god-of-war.webp', group: 'games', size: 'lg' },
  { src: '/assets/redesign/posters/valorant.webp', group: 'games', size: 'md' },
  { src: '/assets/redesign/posters/red-dead-redemption-2.webp', group: 'games', size: 'md' },
  { src: '/assets/redesign/posters/uncharted-4.webp', group: 'games', size: 'sm' },
  { src: '/assets/redesign/posters/forza-horizon-6.webp', group: 'games', size: 'sm' },
  { src: '/assets/redesign/posters/minecraft.webp', group: 'games', size: 'sm' },
  { src: '/assets/redesign/posters/portal-2.webp', group: 'games', size: 'sm' },
  { src: '/assets/redesign/posters/the-witcher-3.webp', group: 'games', size: 'sm' },
  { src: '/assets/redesign/posters/marvels-spider-man.webp', group: 'games', size: 'sm' },
  { src: '/assets/redesign/posters/god-hand.webp', group: 'games', size: 'sm' },
  { src: '/assets/redesign/posters/ghost-of-tsushima.webp', group: 'games', size: 'sm' },
  { src: '/assets/redesign/posters/assassins-creed-ii.webp', group: 'games', size: 'sm' },
];
