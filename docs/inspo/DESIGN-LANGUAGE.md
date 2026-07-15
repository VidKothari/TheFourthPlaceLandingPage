# The Fourth Place — landing design language (July 16, 2026)

Derived from the 12 Pinterest picks in this folder (see INSPO.md). This file is the single
source of truth for asset prompts, section styling, and CSS treatment. Every generated asset
must be traceable to a rule here.

## 1. Medium (non-negotiable)

**Screen-print / risograph / photocopy-zine.** Everything looks *printed by hand and slightly
wrong*: visible halftone dots, paper grain, ink bleed, 1–2mm misregistration between ink layers,
hard cutout edges. Source material is **photographic or engraved** — real people, real objects,
real texture. Never cartoons, never vector mascots, never pencil sketch (all three rejected July 15).

## 2. Ink palette

Each surface = ONE saturated field color + 1–2 inks + paper. Never more than 3 inks on a piece.

| Token | Hex (working) | Source | Role |
|---|---|---|---|
| `--field-red` | `#c8291e` | 01, 12, 10 | Warm poster field, legacy hero ink |
| `--field-chartreuse` | `#c6e02e` | 03 | Manifesto / the match |
| `--ink-magenta` | `#e5399f` | 03, 05, 08, 09 | Duotone people ink |
| `--field-coral` | `#ef6a55` | 06 sky | Softer warm rooms |
| `--field-cobalt` | `#2b3fb8` | 07 sky, 12 face | Dusk room, artifact skies |
| `--ink-mustard` | `#e8c53a` | 06, 12 flower, 01 | Sunbursts, accents, city halftone |
| `--paper` | `#efe6d0` | 12 type, 09 newsprint | Type on fields, collage ground |
| `--ink-black` | `#111111` | all | Line ink, halftone dark plate |

**Color does the emotion; the ink drawing stays deadpan.** A person is never "full color" —
they are paper + one or two inks on a field.

## 3. Composition rules

- **Album-cover confidence**: one subject, dead center or hard-cropped, generous field around it.
- **Repetition as rhythm**: the same element stamped 4–9 times in different colorways (hands ×8,
  DALI ×9, eyes ×4, busts ×5) is a legitimate layout, not lazy tiling.
- **Cutout + glow outline**: photographic cutouts get a thick 8–12px single-color outline
  (the red glow around the tennis woman in 07). This is the treatment for artifacts (books,
  vinyl, posters) floating on fields.
- **Collage blocks**: color-block grids and newsprint fragments behind engraved/duotone subjects
  (02, 09). Edges torn or hard-cut, never feathered.
- **Type as texture**: a display word stacked/repeated until it becomes wallpaper (DALI, BLAH) —
  used at most once per page.

## 4. The humor register

"Gentle because it's stupid." Deadpan pop jokes carried by the image, not the copy: flowers
blindfolding eyes, eight hands accusing an empty center, BLAH BLAH BLAH as a painting.
One joke per section maximum. Copy stays plain and warm (see taste rules — banned words hold).

## 5. Product hooks (image → meaning)

- **08 (posterized busts in colorways)** → taste DNA: same person, different ink mixes = people as palettes.
- **03 (hands pointing inward)** → the match: everything converges on the one thing/person in the middle.
- **01 / 12 (flowers over eyes)** → what you love becomes how you see.
- **09 (duotone + newsprint collage)** → the museum of yourself; print culture; the archive.
- **07 (cutout with glow on sky)** → the artifact elevated — a paperback treated like a saint's icon.
- **05 (head back + sunburst)** → the hit of being understood; waitlist payoff.
- **11 (eye grid in acid colorways)** → four ways of seeing the same thing.
- **06 (two-ink halftone city)** → the real world / third places; grounds the Oldenburg thread.

## 6. Typography

- **Body**: Jost (locked).
- **Display**: two candidates to trial on the board —
  A) keep Cormorant Garamond italic for pivots = museum wall label pasted onto a zine (tension);
  B) a heavy compressed grotesque (Archivo Black / Anton) for poster-stacked display type (match).
- Poster type in *artwork* is hand-painted or stacked repetition; site UI type never fakes distress.

## 7. Web treatment notes (validated with Codex, July 16)

- **Pre-bake, don't filter**: hero/busts/artifact imagery ships as responsive WebP/AVIF with
  halftone baked in. Runtime SVG duotone (`filter: url(#duotone-red)`, defined once in a hidden
  SVG) reserved for 1–2 isolated static portraits; never animated, never full-screen (Safari
  paint cost + inconsistency).
- CSS dot screens = stationary field decoration only (radial-gradient dots at ~12% multiply on a
  `::after`), never photographic halftoning — uniform dots over a photo read as an Instagram filter.
- Paper grain: ONE seamless 128–256px tile (≤30KB) per section pseudo-element at 3–6% opacity,
  `isolation: isolate`, never fixed/animated. No feTurbulence.
- Misregistration: only on heavy display type ≥48px, `text-shadow: 1px 1px 0 <second-ink>` or an
  aria-hidden 1–2px-translated duplicate. Never on body, Cormorant italics, or the nav logo.
- **Contrast tokens (hard rules)**: black ink text on chartreuse (12.7:1), mustard (11.2:1), and
  coral (6.2:1); paper text on cobalt (6.7:1); on field-red use white or darken the red until
  ≥4.5:1 — paper-on-red is 4.46:1, large text only. Magenta on chartreuse/mustard is decorative
  only — never instructional text or form affordances.
- Section transitions: direct hard cuts. Do not insert empty color strips between Exhibition,
  In Practice, and Waitlist; their adjacent surfaces already create the transition.
- Taste-map iframe is a separate redesign surface — restyle its tokens/Three.js materials
  internally; never CSS-filter the iframe element from outside.
- Sharp corners everywhere (locked; don't force organic shapes angular). Motion stays gentle
  (locked) — the loudness is in ink, not animation. LivingText's perpetual per-character animation
  conflicts with this and dies in the redesign; marquee slows and stops under prefers-reduced-motion.

## 8. Chromatic tonal arc (a color per section)

Nav (paper) → Hero (**poster red + paper**) → Marquee (**black band**) → Manifesto (**chartreuse**) →
Taste Map (**newsprint paper**) → Exhibition (**app Taste DNA plum/navy**) → In Practice (**app ink + plum**) →
Waitlist (**mustard**) → Open Floor + Footer (**ink-black**, IV easter egg stays).

Crossing sections = crossing rooms = crossing ink colors. The red flower hero opens the saturated
rooms; the app's plum/navy gradient is the "dark gallery" moment and Open Floor closes in black.

## 9. Asset systems (trial all three, mix per section)

- **System A — duotone people**: photographic portraits reduced to 1–2 inks + halftone on a field.
- **System B — cutout artifacts**: real cultural objects (worn paperback, vinyl sleeve, ticket,
  cassette) as photo cutouts with glow outlines, floating on fields or newsprint.
- **System C — repetition patterns**: hands / eyes / busts / stacked type as rhythmic texture blocks.

Carried over regardless: plain warm copy, banned words (discover/connect/unlock/seamless/journey/vibe),
plain "Join the waitlist", no city-rollout copy, Oldenburg IV footer easter egg, Jost, sharp corners.
