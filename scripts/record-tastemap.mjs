// Records the real Three.js taste map (public/tastemap-preview-riso.html) into a
// short deterministic clip: a dreamy float, then the tastes merge to center.
// Drives the page's ?record=1 rig frame-by-frame off a fake clock, screenshots
// each frame, then encodes to mp4 + poster with ffmpeg.
//
//   node scripts/record-tastemap.mjs         # full render + encode
//   node scripts/record-tastemap.mjs --test  # single mid-scene frame -> scripts/.frames/test.png
//
// Requires the dev server running on http://localhost:3000 and puppeteer-core.

import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import puppeteer from 'puppeteer-core';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const FRAMES_DIR = path.join(__dirname, '.frames');
const OUT_DIR = path.join(ROOT, 'public', 'assets', 'redesign');
// PORTRAIT=1 records a phone-composed cut from the DARK map (used inside the
// taste-map section's share phone). The perspective camera's fov is vertical,
// so a portrait viewport narrows the horizontal field — camera distances are
// scaled up to compensate (see cues).
const PORTRAIT = !!process.env.PORTRAIT;
const URL = PORTRAIT
  ? 'http://localhost:3000/tastemap-preview-dark.html?record=1'
  : 'http://localhost:3000/tastemap-preview-riso.html?record=1';
const FFMPEG = '/opt/homebrew/bin/ffmpeg';

const CHROME_CANDIDATES = [
  '/Users/siddnikh/.cache/puppeteer/chrome/mac_arm-133.0.6943.126/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
  '/Users/siddnikh/.cache/puppeteer/chrome/mac_arm-133.0.6943.98/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
  '/Users/siddnikh/.cache/puppeteer/chrome/mac_arm-125.0.6422.78/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
];
const executablePath = CHROME_CANDIDATES.find((p) => fs.existsSync(p));
if (!executablePath) throw new Error('No Chrome for Testing binary found in puppeteer cache.');

const TEST = process.argv.includes('--test');

const VIEWPORT = PORTRAIT
  ? { width: 900, height: 1500, deviceScaleFactor: 1 }
  : { width: 1600, height: 1200, deviceScaleFactor: 1 };
const FPS = 30;
const TOTAL = 250;               // ~8.3s
const MS_PER_FRAME = 1000 / FPS; // 33.333

const pad = (n) => String(n).padStart(4, '0');

// ── Choreography ──────────────────────────────────────────────────────────
// Cues fire once at a given frame; per-frame work runs every frame.
// Float (f0-104): gentle dolly in then relax + a slow pendulum rotation of the
// whole universe that returns to identity exactly at the merge, so the merged
// grid lands face-on. Merge (f105): the real setMode('merged'); nodes fly to
// center. Pull back (f120) to frame the merged constellation + split avatars.
// Hold (f162-249): near-still poster.
const FLOAT_END = 105;
const ROT_Y_AMP = 0.40;
const ROT_X_AMP = 0.09;

// The constellation is hollow — nodes sit in clusters ~1150 out from an empty
// centre — so the float breathes within 1600–1850 (never dive into the middle).
// The merge then pulls into the shared core.
const cues = PORTRAIT
  ? [
      // Portrait: distances scaled for the narrow horizontal field; the merge
      // frames the shared grid tight (avatars breathe at the edges).
      { f: 0,   run: (d) => d.animateCamDistTo(2450, 1600) },
      { f: 60,  run: (d) => d.animateCamDistTo(2750, 1500) },
      { f: 105, run: (d) => d.setMode('merged') },
      { f: 118, run: (d) => d.animateCamDistTo(2050, 1600) },
    ]
  : [
      { f: 0,   run: (d) => d.animateCamDistTo(1600, 1600) },
      { f: 60,  run: (d) => d.animateCamDistTo(1820, 1500) },
      { f: 105, run: (d) => d.setMode('merged') },
      { f: 118, run: (d) => d.animateCamDistTo(1450, 1600) },
    ];

async function main() {
  fs.rmSync(FRAMES_DIR, { recursive: true, force: true });
  fs.mkdirSync(FRAMES_DIR, { recursive: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: [
      '--use-angle=metal',
      '--enable-webgl',
      '--ignore-gpu-blocklist',
      '--no-sandbox',
      '--hide-scrollbars',
    ],
  });
  const page = await browser.newPage();
  await page.setViewport(VIEWPORT);
  page.on('pageerror', (e) => console.error('PAGE ERROR:', e.message));

  console.log('loading', URL);
  await page.goto(URL, { waitUntil: 'networkidle0', timeout: 60000 });

  // Wait for the scene rig to be ready.
  await page.waitForFunction(
    () => typeof window.__demoStep === 'function'
      && window.__demo && window.__demo.universe && window.__setTime,
    { timeout: 30000 },
  );

  // Prime at t=0: show the FULL combined constellation (both people's items at
  // home positions — a dense map to float through), then warm up geometry.
  await page.evaluate(() => {
    window.__setTime(0);
    window.__demo.setMode('all');
    for (let i = 0; i < 20; i += 1) window.__demoStep();
  });

  // Sanity: make sure the canvas is not black before committing to 250 frames.
  const notBlack = await page.evaluate(() => {
    const c = document.querySelector('canvas');
    if (!c) return false;
    const g = c.getContext('webgl2') || c.getContext('webgl');
    // Reading back a WebGL canvas is unreliable across drivers; instead sample
    // via a 2D snapshot the page can build from toDataURL.
    try {
      const url = c.toDataURL('image/png');
      return url.length > 5000; // a black 1600x1200 PNG is tiny; real scene is large.
    } catch (e) {
      return !!g;
    }
  });
  console.log('canvas non-trivial:', notBlack);

  if (TEST) {
    // Drive to a representative frame (TESTF env, default mid-merge) and shoot.
    await driveTo(page, parseInt(process.env.TESTF || '130', 10));
    await page.screenshot({ path: path.join(FRAMES_DIR, 'test.png') });
    console.log('wrote test.png');
    await browser.close();
    return;
  }

  const fired = new Set();
  for (let f = 0; f < TOTAL; f += 1) {
    await stepFrame(page, f, fired);
    await page.screenshot({ path: path.join(FRAMES_DIR, `f${pad(f)}.png`) });
    if (f % 25 === 0) console.log('frame', f);
  }
  await browser.close();
  encode();
}

// Advance the fake clock to frame f, firing any cues at/below it and running
// per-frame work, then one tick. Used for the --test jump (fires all prior cues).
async function driveTo(page, target) {
  const fired = new Set();
  for (let f = 0; f <= target; f += 1) await stepFrame(page, f, fired);
}

async function stepFrame(page, f, fired) {
  const due = cues.filter((c) => c.f === f && !fired.has(c.f));
  due.forEach((c) => fired.add(c.f));
  // Advance the fake clock first so cues capture the right start time.
  await page.evaluate((frame, ms) => window.__setTime(frame * ms), f, MS_PER_FRAME);
  // Fire any cues due this frame (bodies live in node scope; ship them as strings).
  for (const c of due) {
    await page.evaluate((body) => {
      (0, eval)(`(${body})`)(window.__demo);
    }, c.run.toString());
  }
  // Per-frame universe sweep + one animation tick.
  await page.evaluate((frame, floatEnd, ryAmp, rxAmp) => {
    if (frame <= floatEnd) {
      const t = frame / floatEnd;
      const s = Math.sin(Math.PI * t);
      const u = window.__demo.universe;
      u.rotation.y = ryAmp * s;
      u.rotation.x = rxAmp * s;
    }
    window.__demoStep();
  }, f, FLOAT_END, ROT_Y_AMP, ROT_X_AMP);
}

function encode() {
  const base = PORTRAIT ? 'tastemap-merge-phone' : 'tastemap-merge';
  const mp4 = path.join(OUT_DIR, `${base}.mp4`);
  const poster = path.join(OUT_DIR, `${base}-poster.webp`);
  const crf = process.env.CRF || '29'; // ~2.4MB at 1600x1200 — under the 2.5MB budget.

  console.log('encoding mp4 (crf', crf, ')...');
  run(FFMPEG, [
    '-y', '-framerate', String(FPS),
    '-i', path.join(FRAMES_DIR, 'f%04d.png'),
    '-vf', PORTRAIT ? 'scale=900:-2:flags=lanczos' : 'scale=1600:-2:flags=lanczos',
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p',
    '-crf', crf, '-preset', 'slow',
    '-movflags', '+faststart',
    '-r', String(FPS),
    mp4,
  ]);

  console.log('extracting poster...');
  run(FFMPEG, [
    '-y',
    '-i', path.join(FRAMES_DIR, `f${pad(TOTAL - 1)}.png`),
    '-vf', PORTRAIT ? 'scale=900:-2:flags=lanczos' : 'scale=1600:-2:flags=lanczos',
    '-c:v', 'libwebp', '-quality', '85',
    poster,
  ]);

  const sz = fs.statSync(mp4).size;
  console.log('mp4:', (sz / 1024 / 1024).toFixed(2), 'MB');
  console.log('poster:', (fs.statSync(poster).size / 1024).toFixed(0), 'KB');

  // Frames are a scratch artifact; drop them once encoded.
  fs.rmSync(FRAMES_DIR, { recursive: true, force: true });
  console.log('cleaned', FRAMES_DIR);
}

function run(cmd, args) {
  const r = spawnSync(cmd, args, { stdio: 'inherit' });
  if (r.status !== 0) throw new Error(`${cmd} exited ${r.status}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
