// Renders the "and Literally Anything" tweet + subreddit cards as pixel-perfect
// white cards via headless Chrome, so they sit as real internet fragments on the
// dark deck. Each card is a self-contained HTML string screenshotted at 2x then
// (outside this script) downsized to 1280px webp.
//
//   node scripts/render-anything-cards.mjs
//
// Writes PNGs to scripts/.cards/ ; convert to webp with cwebp afterwards.

import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import puppeteer from 'puppeteer-core';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '.cards');

const CHROME_CANDIDATES = [
  '/Users/siddnikh/.cache/puppeteer/chrome/mac_arm-133.0.6943.126/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
  '/Users/siddnikh/.cache/puppeteer/chrome/mac_arm-133.0.6943.98/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
  '/Users/siddnikh/.cache/puppeteer/chrome/mac_arm-148.0.7778.167/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
  '/Users/siddnikh/.cache/puppeteer/chrome/mac_arm-125.0.6422.78/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
];
const executablePath = CHROME_CANDIDATES.find((p) => fs.existsSync(p));
if (!executablePath) throw new Error('No Chrome for Testing binary found.');

const b64 = (h) => fs.readFileSync(path.join('/tmp/av', `${h}.b64`), 'utf8');
const avatar = (h) => `data:image/jpeg;base64,${b64(h)}`;

// ── Verified badge + X logo + action glyphs (inline SVG) ────────────────────
const VERIFIED = `<svg viewBox="0 0 22 22" width="30" height="30" aria-label="Verified account"><g><path fill="#1d9bf0" d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path></g></svg>`;

const X_LOGO = `<svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true"><path fill="#0f1419" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>`;

const glyph = (d) => `<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path fill="#536471" d="${d}"></path></svg>`;
const REPLY = glyph('M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z');
const RETWEET = glyph('M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z');
const LIKE = glyph('M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C10.007 6.01 8.55 5.44 7.327 5.5c-1.146.06-2.16.54-2.836 1.31C3.816 7.57 3.5 8.5 3.5 9.5c0 1.1.396 2.14 1.24 3.4 1.242 1.85 3.19 3.94 6.26 6.7 3.07-2.76 5.018-4.85 6.26-6.7.844-1.26 1.24-2.3 1.24-3.4 0-1-.316-1.93-.99-2.69-.676-.77-1.69-1.25-2.836-1.31z');
const SHARE = glyph('M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z');

const ACTIONS = `<div class="acts">${REPLY}${RETWEET}${LIKE}${SHARE}</div>`;

function tweetCard({ handle, name, text, date, verified }) {
  return `<div class="card tweet">
    <div class="thead">
      <img class="pfp" src="${avatar(handle)}" alt="">
      <div class="who">
        <div class="nm">${name}${verified ? VERIFIED : ''}</div>
        <div class="hd">@${handle}</div>
      </div>
      <div class="xlogo">${X_LOGO}</div>
    </div>
    <div class="ttext">${text}</div>
    <div class="tdate">${date}</div>
    ${ACTIONS}
  </div>`;
}

// ── Reddit snoo (white) for community-color circle ──────────────────────────
const SNOO = `<svg viewBox="0 0 20 20" width="46" height="46" aria-hidden="true"><path fill="#fff" d="M16.67 10c0-.81-.66-1.47-1.47-1.47-.4 0-.76.16-1.02.42-1-.72-2.37-1.18-3.9-1.24l.66-3.13 2.17.46a1.05 1.05 0 1 0 .1-.53l-2.42-.51a.27.27 0 0 0-.31.2l-.74 3.49c-1.55.05-2.95.51-3.96 1.24a1.47 1.47 0 1 0-1.62 2.4c-.02.14-.03.29-.03.44 0 2.23 2.6 4.04 5.8 4.04s5.8-1.81 5.8-4.04c0-.15-.01-.29-.03-.43.5-.24.85-.75.85-1.34zM6.67 11.05a1.05 1.05 0 1 1 2.1 0 1.05 1.05 0 0 1-2.1 0zm5.86 2.77c-.72.72-2.1.77-2.5.77-.4 0-1.79-.06-2.5-.77a.27.27 0 0 1 .38-.38c.45.45 1.42.61 2.12.61.71 0 1.67-.16 2.12-.61a.27.27 0 1 1 .38.38zm-.18-1.71a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1z"></path></svg>`;

function redditCard({ name, members, desc, color }) {
  return `<div class="card sub">
    <div class="sicon" style="background:${color}">${SNOO}</div>
    <div class="sbody">
      <div class="sname">r/${name}</div>
      <div class="smeta">${members} members</div>
      <div class="sdesc">${desc}</div>
    </div>
    <div class="join">Join</div>
  </div>`;
}

const CSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { background: transparent; }
  .card {
    width: 1280px;
    background: #fff;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    padding: 44px 48px;
  }
  /* ── Tweet ── */
  .tweet { color: #0f1419; }
  .thead { display: flex; align-items: flex-start; gap: 20px; }
  .pfp { width: 84px; height: 84px; border-radius: 50%; object-fit: cover; flex: 0 0 auto; }
  .who { flex: 1 1 auto; min-width: 0; padding-top: 6px; }
  .nm { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 32px; line-height: 1.2; color: #0f1419; }
  .nm svg { flex: 0 0 auto; }
  .hd { font-size: 27px; color: #536471; margin-top: 2px; }
  .xlogo { flex: 0 0 auto; padding-top: 6px; }
  .ttext { font-size: 44px; line-height: 1.32; color: #0f1419; margin: 30px 0 26px; letter-spacing: -0.2px; white-space: pre-wrap; word-wrap: break-word; }
  .tdate { font-size: 26px; color: #536471; margin-bottom: 30px; }
  .acts { display: flex; gap: 130px; align-items: center; padding-top: 12px; border-top: 1px solid #eff3f4; margin-top: 4px; }
  .acts svg { display: block; }
  /* ── Subreddit ── */
  .sub { display: flex; align-items: center; gap: 30px; }
  .sicon { width: 96px; height: 96px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex: 0 0 auto; }
  .sbody { flex: 1 1 auto; min-width: 0; }
  .sname { font-size: 38px; font-weight: 800; color: #0f1419; line-height: 1.15; }
  .smeta { font-size: 26px; color: #576f76; margin-top: 6px; font-weight: 500; }
  .sdesc { font-size: 28px; color: #1a1a1b; margin-top: 12px; line-height: 1.35; }
  .join { flex: 0 0 auto; align-self: center; background: #0079d3; color: #fff; font-size: 27px; font-weight: 700; padding: 16px 40px; border-radius: 999px; }
`;

const CARDS = [
  { file: 'tweet-sama', html: tweetCard({
    handle: 'sama', name: 'Sam Altman', verified: true,
    text: 'there are a lot of benchmarks that suggest 5.6 sol is the best model in the world right now, but the most reliable way to tell is that elon is obsessed with me again',
    date: 'July 11, 2026',
  }) },
  { file: 'tweet-trump', html: tweetCard({
    handle: 'realDonaldTrump', name: 'Donald J. Trump', verified: true,
    text: "Sorry losers and haters, but my I.Q. is one of the highest -and you all know it! Please don't feel so stupid or insecure,it's not your fault",
    date: 'May 9, 2013',
  }) },
  { file: 'tweet-salman', html: tweetCard({
    handle: 'BeingSalmanKhan', name: 'Salman Khan', verified: true,
    text: 'Does nt matter yaar',
    date: 'October 18, 2010',
  }) },
  { file: 'reddit-lsd', html: redditCard({
    name: 'LSD', members: '372K', color: '#7c4dff',
    desc: 'A kind, open-minded community dedicated to Lysergic Acid Diethylamide-25. NO sourcing!',
  }) },
  { file: 'reddit-wsb', html: redditCard({
    name: 'wallstreetbets', members: '19.9M', color: '#ff4500',
    desc: 'Like 4chan found a Bloomberg terminal.',
  }) },
  { file: 'reddit-askreddit', html: redditCard({
    name: 'AskReddit', members: '58.7M', color: '#0079d3',
    desc: 'Ask and answer thought-provoking questions.',
  }) },
];

async function main() {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--hide-scrollbars', '--force-color-profile=srgb'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1360, height: 1200, deviceScaleFactor: 2 });

  for (const c of CARDS) {
    const doc = `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body>${c.html}</body></html>`;
    await page.setContent(doc, { waitUntil: 'networkidle0' });
    // Small settle for font metrics.
    await new Promise((r) => setTimeout(r, 120));
    const el = await page.$('.card');
    await el.screenshot({ path: path.join(OUT, `${c.file}.png`), omitBackground: true });
    console.log('rendered', c.file);
  }
  await browser.close();
}

main().catch((e) => { console.error(e); process.exit(1); });
