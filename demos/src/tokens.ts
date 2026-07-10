import { loadFont as loadCormorant } from '@remotion/google-fonts/CormorantGaramond';
import { loadFont as loadGrotesk } from '@remotion/google-fonts/SpaceGrotesk';

const cormorant = loadCormorant('normal', { weights: ['300', '400'], subsets: ['latin'] });
const cormorantItalic = loadCormorant('italic', { weights: ['300'], subsets: ['latin'] });
const grotesk = loadGrotesk('normal', { weights: ['400', '500', '600'], subsets: ['latin'] });

export const SERIF = cormorant.fontFamily;
export const SERIF_ITALIC = cormorantItalic.fontFamily;
export const UI = grotesk.fontFamily;

// The app's actual design tokens (web/app/globals.css)
export const T = {
  paper: '#0a0a09',
  surface: '#111110',
  ink: 'rgba(255,255,255,0.85)',
  border: 'rgba(255,255,255,0.07)',
  borderStrong: 'rgba(255,255,255,0.13)',
  muted: 'rgba(255,255,255,0.35)',
};

// label-upper — the eyebrow used everywhere in-app
export const labelUpper = {
  fontFamily: UI,
  fontSize: 13,
  letterSpacing: '0.18em',
  textTransform: 'uppercase' as const,
  color: 'rgba(255,255,255,0.32)',
  fontWeight: 600,
  display: 'block',
};

// Per-type neon accents (mobile TC_COLOR)
export const TC: Record<string, string> = {
  artist: '#4fc3ff', song: '#ff4fd8', album: '#7c6bff', book: '#7affc6',
  video: '#ff5050', article: '#b4c8ff', film: '#ff7a3d',
};

// Result placeholder tints (RESULT_TYPE_BG)
export const TYPE_BG: Record<string, string> = {
  artist: '#e8e0dc', album: '#dce5da', song: '#d8e0e4', video: '#ead8d8',
  article: '#e8dcc8', book: '#dce8dc', film: '#16151a',
};

export const TYPE_ICON: Record<string, string> = {
  artist: '◎', album: '◫', song: '♪', video: '▶', channel: '◉',
  article: '¶', book: '☰', film: '◈', tv: '◈',
};

export const AVATAR_COLORS = ['#b8a99a', '#9ab0a8', '#a8a0b8', '#a8b8a0', '#b0a8b8', '#a0b0b8'];
export const avatarColor = (seed: string) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
};
