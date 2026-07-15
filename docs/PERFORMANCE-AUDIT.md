# Landing performance audit

Audited July 16, 2026 against the production route (`/`). This is a source and production-build audit; it does not replace a throttled-device Lighthouse/WebPageTest run against the deployed hostname. No application files or assets were changed.

## Priority 0 — make the map a deliberately loaded experience

**Evidence.** `RisoTasteMap` mounts the iframe when it is still 400px away from view ([RisoTasteMap.jsx](../components/redesign/RisoTasteMap.jsx#L12-L21), [RisoTasteMap.jsx](../components/redesign/RisoTasteMap.jsx#L117-L126)). The iframe is a 90KB HTML document that imports Three.js and post-processing modules from unpkg, plus Google Fonts ([tastemap-preview-riso.html](../public/tastemap-preview-riso.html#L8-L11), [tastemap-preview-riso.html](../public/tastemap-preview-riso.html#L1260-L1262)). It creates a high-performance, antialiased WebGL renderer at up to 2x device pixel ratio, adds bloom post-processing, and continuously schedules `requestAnimationFrame`, including after the map has left the viewport ([tastemap-preview-riso.html](../public/tastemap-preview-riso.html#L1517-L1530), [tastemap-preview-riso.html](../public/tastemap-preview-riso.html#L2278-L2312)).

**User impact.** This is the biggest CPU/GPU and mobile-battery risk on the page. It also adds third-party network dependencies to a page that otherwise self-hosts fonts. The 400px prefetch margin means the cost begins before a visitor has opted into the map.

**Remedy.** Keep the visual shell static, then initialize the map on an explicit “Explore the map” action (or at least only when it is substantially in view). Pause its animation/render loop on `visibilitychange` and when the iframe is out of view; render on demand while idle. Bundle the exact Three build locally or through the deployment CDN instead of runtime imports from unpkg, and use the already self-hosted page fonts inside the iframe. Test a non-WebGL/static fallback on mobile and reduced-motion devices.

## Priority 0 — defer off-screen video decoding and playback

**Evidence.** The initial page mounts five below-the-fold autoplaying loops: the profile-share card ([RisoTasteMap.jsx](../components/redesign/RisoTasteMap.jsx#L146-L190)), the Exhibition “Keep” card ([RisoExhibition.jsx](../components/redesign/RisoExhibition.jsx#L21-L63)), all three practice cards ([RisoPractice.jsx](../components/redesign/RisoPractice.jsx#L60-L74)), and the waitlist animation ([RisoWaitlist.jsx](../components/redesign/RisoWaitlist.jsx#L73-L87)). Those components explicitly call `play()` even when their section is not visible. Current first-choice WebM assets total about 2.8MB across those five clips; their MP4 fallbacks total about 3.0MB. The hero adds a 1.39MB MP4 and declares `preload="auto"` ([RisoHero.jsx](../components/redesign/RisoHero.jsx#L253-L297)).

**User impact.** Slow/mobile visitors compete with these requests and decoders while trying to read the hero. Continuous video animation also increases memory, CPU, and power use as users scroll through a long page.

**Remedy.** Give every non-hero video an IntersectionObserver gate: render a poster first, attach sources and call `play()` only just before it enters view, and pause/remove sources on exit. Respect `prefers-reduced-motion` for every clip, not only Framer transitions. Retain the hero film, but keep it the only eager video and consider a lower-bitrate mobile rendition. Verify via a network waterfall that no below-fold media starts before scrolling.

## Priority 1 — remove the global load-blocking screen

**Evidence.** The root layout mounts `Loader` on every page ([layout.js](../app/layout.js#L41-L49)). The overlay blocks pointer events and stays visible until `window.load`, then adds a 400ms wait and an 800ms fade ([Loader.jsx](../components/Loader.jsx#L8-L18), [Loader.jsx](../components/Loader.jsx#L24-L36)).

**User impact.** The landing’s content can render but cannot be seen or interacted with for at least 1.2 seconds after the load event. On constrained networks, the user waits for the slowest load-event dependency before seeing the main CTA.

**Remedy.** Remove it for the landing or make it an immediate, non-blocking first-paint transition that ends on initial render—not `window.load`. Do not gate interaction behind decorative loading UI.

## Priority 1 — cache versioned media aggressively

**Evidence.** The production-style Next server returned `Cache-Control: public, max-age=0` for `public/assets/redesign/hero-flowers-film.mp4` (1,392,161 bytes) and `public/assets/demos/check-later-loop.webm` (973,857 bytes). This is Next’s default behavior for mutable files in `public/`; the assets are referenced by stable URLs such as `/assets/demos/check-later-loop.webm`.

**User impact.** Returning visitors must revalidate every media/image request, which disproportionately hurts a media-heavy landing on mobile and can add latency even when the browser ultimately reuses a cached response.

**Remedy.** Keep every existing asset, but publish immutable, content-versioned copies for production references (for example, `check-later-loop.<hash>.webm`) and give those URLs `Cache-Control: public, max-age=31536000, immutable`. Do not set a one-year cache on the current mutable filenames unless the release process guarantees they are never replaced in place.

## Priority 2 — reduce initial JavaScript/hydration work

**Evidence.** The production app manifest assigns the root page five initial JS chunks. Their combined transfer is approximately **510KB uncompressed / 149KB gzip**: 62.6KB page code, 151.4KB shared client code (including Framer Motion and Lucide), and 296KB of app runtime/shared chunks. The landing is composed mostly of client components and imports Framer Motion across Hero, Feed, Taste Map, Exhibition, Practice, Waitlist, Navigation, and Footer. The Exhibition also subscribes to scroll progress for a six-viewport sticky interaction ([RisoExhibition.jsx](../components/redesign/RisoExhibition.jsx#L157-L190)).

**User impact.** The byte count is reasonable for a richly animated landing, but hydration and motion setup happen before the visitor reaches most of these sections. On lower-end phones this competes with hero rendering and video start-up.

**Remedy.** Keep the hero/navigation client-side where needed, but lazy-load below-fold interactive sections (`TasteMap`, `Exhibition`, `Practice`, `Waitlist`) with a static server-rendered shell/poster. Consolidate purely CSS/one-time effects out of Framer Motion where that preserves the design. For Exhibition, update state only when the active family changes rather than on every scroll-progress event.

## Priority 3 — image sizing and paint containment follow-up

**Evidence.** The production composition uses raw `<img>` tags for its content imagery (for example, [RisoFeed.jsx](../components/redesign/RisoFeed.jsx#L54-L93) and [RisoPractice.jsx](../components/redesign/RisoPractice.jsx#L114-L122)); no `sizes`, source-set variants, or explicit fetch priorities are present. The page also applies a full-width CSS `filter` and `mix-blend-mode` overlay to the practice city image ([RisoPractice.jsx](../components/redesign/RisoPractice.jsx#L114-L122)).

**User impact.** Current images are WebP and mostly moderate in size, so this is not the first thing to fix. However, the browser cannot select smaller responsive sources, and large filtered layers can cost extra compositing/GPU time on mobile.

**Remedy.** For the hero and large section art, either use `next/image` with accurate `sizes` or supply responsive AVIF/WebP `srcset` assets. Pre-bake the city tint where visual parity allows it, rather than filtering a large image at runtime. Keep `width`/`height` or `aspect-ratio` on all images to protect against layout shifts.

## Production checks before launch

1. Run mobile Lighthouse (4× CPU slowdown and Fast 3G/4G) and WebPageTest for `/`; record LCP, INP, CLS, total media bytes, and main-thread time.
2. Verify the hero is the only video requested before the first user scroll; verify reduced-motion never downloads autoplay loops.
3. Test the map on an iPhone-class GPU and with WebGL disabled; it must remain understandable and the rest of the page must scroll normally.
4. Verify immutable cache headers only after asset URLs are versioned, then re-run a repeat-visit waterfall.
5. Confirm the loader no longer delays first CTA visibility or clickability.
