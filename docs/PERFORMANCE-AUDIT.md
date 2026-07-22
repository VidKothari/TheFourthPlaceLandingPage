# Landing performance audit

Updated July 22, 2026 after the image-quality and dependency follow-up. Measurements below use the
production Next.js build, cache disabled, and a local headless Chromium session. They are a
repeatable development baseline, not a substitute for Lighthouse/WebPageTest against the deployed
hostname on physical iOS and Android devices.

## Verified baseline

| Scenario | No-scroll transfer after 5s | Video request |
|---|---:|---|
| 390×844 mobile, normal motion | 1.00 MiB | 470KB `hero-flowers-film-mobile.mp4` |
| 390×844 mobile, reduced motion | 0.55 MiB | none |
| 1280×900 desktop, normal motion | 1.80 MiB | 1.39MB `hero-flowers-film.mp4` |

The generated root HTML now contains:

- zero video `<source>` elements;
- zero image preloads;
- zero iframe elements;
- eight responsive images marked `loading="lazy"`.

The root remains statically generated. The earlier measured build reported 69.5KB page JavaScript
and 157KB first-load JavaScript. All 23 current form/email tests pass on Next.js 16.2.11.

## Implemented

### Viewport-gated decorative video

`AutoplayLoopVideo` initially renders a source-free, poster-free video shell. An
`IntersectionObserver` attaches the poster and video sources shortly before the clip enters the
viewport. Playback pauses off-screen and while the tab is hidden. Reduced-motion visitors receive
the poster near the viewport and never receive the animation source.

The hero keeps one stable video element so the page does not download a separate still and then
replace it after hydration. Its source is attached only after motion preferences are known. Mobile
viewports receive a 640×360, 24fps H.264 rendition; desktop keeps the original 1280×720, 48fps film.

### Deliberately loaded Taste Map

The initial map section is a lightweight responsive poster with an explicit “Explore the live map”
button. The Three.js iframe is absent from server HTML and is created only after that action.

After loading, the parent observes map visibility and sends an activity message to the iframe. The
iframe stops scheduling animation frames while off-screen or while the document is hidden, without
unmounting the scene or losing visitor state. Cross-window scroll and activity messages are now
restricted to the same origin.

### Responsive images and rendering containment

Below-fold section art uses `next/image` with real dimensions and `sizes`. Exhibition artifacts use
responsive fill images. The map newsprint background is now a lazy responsive image instead of an
eager CSS background. Distant Practice and Waitlist sections use `content-visibility: auto` with
intrinsic fallback space.

The large atmospheric derivatives now use deliberately lower quality settings that preserve their
halftone treatment. For a modern browser requesting WebP at 1920px, the newsprint response fell
from 557,942 to 430,380 bytes and the city response from 448,542 to 382,252 bytes. The active hero
poster was resized to 1280px and recompressed from 158,396 to 74,080 bytes; the small feed clipping
saves another 1,962 bytes. Together these save about 280KB in the relevant paths. The optimized
outputs were visually inspected after generation.

### Removed blocking loader

The global loader is no longer mounted and its component has been removed. The hero, navigation,
and primary waitlist CTA are visible and interactive immediately.

## Remaining work

### Priority 0 — deployed and physical-device verification

Run Lighthouse and WebPageTest against the deployed root with mobile CPU/network throttling. Record
LCP, INP, CLS, total transfer, main-thread time, and repeat-visit behavior. Verify on current iOS
Safari and Android Chrome, including 320px width, short-height and landscape devices, reduced motion,
data saver, low-power mode, and WebGL disabled.

The six-screen sticky Exhibition now switches its artifact pair from stacked to two-up below 700px
viewport height. This keeps both artifacts visible at 320×568 and in landscape without compressing
copy or tap targets. Confirm the same behavior on physical Safari and Chrome, where browser chrome
changes the available small viewport height.

### Priority 1 — self-host Taste Map dependencies

Once opened, `tastemap-preview-riso.html` still imports Google Fonts, Three.js, post-processing, and
a sprite texture from third-party hosts. Bundle the exact map dependencies locally and reuse the
landing’s self-hosted font files. Preserve the current scene and interaction behavior.

### Priority 1 — immutable media caching

Static files in `public/` still return `Cache-Control: public, max-age=0`. Publish content-versioned
asset URLs and serve those URLs with `public, max-age=31536000, immutable`. Do not apply immutable
caching to mutable filenames.

### Priority 2 — hydration and bundle follow-up

The responsive image runtime increased first-load JavaScript from roughly 150KB to 157KB while
removing substantially more image/media transfer. A later pass can split below-fold interactive
sections into viewport-loaded chunks, provided the server-rendered copy and accessible static shells
remain intact.

Three retired hero layout branches still contain raw `<img>` elements and produce lint warnings.
They are not rendered by the selected production variant; remove the branches when the component
itself receives its final cleanup.

### Repository asset cleanup

The consolidated production composition made 25 old hero experiments and redesign alternates
unreachable. They were removed after a full source-reference check, reducing tracked public assets
by 38.02 MiB. Ambiguous or intentionally retained families—the current exhibition pool, thumbnail
sets, active demo loops, legacy HTML demos, and conditional Taste Map art—remain untouched.

The Sharp 0.35.3 production optimizer is pinned and its local `next start` image endpoints were
smoke-tested for the newsprint and city derivatives. A future self-hosted deployment should still
load-test that endpoint under production traffic.
