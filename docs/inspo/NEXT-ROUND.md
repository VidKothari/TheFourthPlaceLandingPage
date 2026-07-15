# Next round — Siddharth's review remarks (July 16, 2026)

State at handoff: ONE consolidated version at `/v/1` (old v1 hero + old v2 waitlist art,
Open Floor expanded by default). Old `/v/2` `/v/3` retired; their assets parked in
`public/assets/redesign/`. Dev server: port 3000 (kill squatters; phone via LAN IP).
Repo is NOT a git repo — nothing committed; if git gets initialized, work on a branch.

## The remarks, verbatim intent → actionable spec

1. **Hero (v1 flowers) is his favorite. Try variants of it + VIDEOS.**
   Brainstorm with him first. Video directions to bring to that conversation:
   the hands place the flowers over the eyes (motion = the act of being colored
   by what you love), petals falling as halftone dots, the red field printing on
   in layers (ink plates arriving one by one: paper → black plate → yellow flower plate).
   kling3_0 start/end-frame on approved stills; ~20-40 cr. Static variants: crop, flower
   choices, second person entering frame.

2. **SCROLL section: chartreuse is TOO overpowering + bring the Mark Zuckerberg image back.**
   The old Manifesto used `public/assets/notSocial.webp` (alt "Not Social" — the Zuck
   editorial image). Restore it into the Feed section alongside/instead of layout as-is,
   and re-ink the field: candidates = paper with chartreuse used only as accent blocks,
   or coral, or newsprint. Keep the SCROLL painting (he approved it) but it can shrink.

3. **Taste-map section heading: swap in "What goes on your map."**
   He wants the Exhibition's H2 ("What goes *on your map.*") as the taste-map section
   heading, replacing "Every collection becomes *a constellation.*". Decide with him what
   the Exhibition heading becomes (candidates: "Every collection becomes a constellation."
   moves down there, since the wall IS the collection; or a new line he approves).

4. **Remotion clips: regenerate "Merge" + "Meet".**
   - "Merge" (tastemap.webm): re-record/re-render so the map shown matches the RISO
     tastemap look of these landings (newsprint bed, magenta/cobalt accents, gold shared).
     Note: no Remotion source in this repo — only rendered outputs at public/assets/demos/.
     Find the Remotion project (ask Siddharth where it lives) or re-capture the riso map.
   - "Meet" (in-common.webm): the girl's picture is bad. New direction: edgy — girl
     standing in front of a graffiti wall striking a yo/victory pose. Generate via
     Higgsfield (nano_banana_2 still → video if needed), then rebuild the clip.
     Fire a subagent for this per his instruction.

5. **Waitlist ("Your inner world deserves a home") — engraved version won, but make it
   MORE ORIGINAL while communicating the same message** (the hit of being understood).
   The current asset is close to inspo 05's genre. Explore: different subject (not head-back
   profile), different metaphor in the same print language — e.g. figure unlocking/opening
   a printed door in their chest, constellation landing on someone's palms, person stepping
   into their own poster. 2-3 trials, board or inline review.

6. **Open Floor: expanded by default (DONE) + needs an asset.**
   Generate a small riso piece for it — candidates: the eyes-grid (parked, `eyes-grid.webp`),
   or a new "suggestion box" artifact (halftone hand dropping a folded note into a printed box).

7. **Animations subagent (his explicit instruction):** fire a subagent to add animations
   wherever they genuinely improve visual pleasure — NOT blanket motion. Constraints:
   gentle-motion lock, prefers-reduced-motion, transform/opacity only, motivated per
   animation (hierarchy/storytelling/feedback). Candidates: ink-plate reveal on section
   entry (misregistration settles), marquee already moves, exhibition wall items drift
   1-2px on hover, waitlist success moment.

## Open questions for Siddharth (he said ask)
- Remark 2: keep chartreuse anywhere in the Feed, or retire it from that section entirely?
- Remark 3: what heading does the Exhibition get after donating "What goes on your map."?
- Remark 4 "Merge": where does the Remotion source project live?
- Hero videos: which brainstorm direction(s) above get trials?

## Credits/infra
~36/506.5 cr spent. Higgsfield CLI gotcha: silently hangs on multi-MB --image-references
uploads — always pass small JPEGs (board/img/*.jpg pattern). styled-jsx: one <style jsx>
block per component (SWC panics on two).
