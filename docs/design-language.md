# Design Language: The Fourth Place

## 1. Core Aesthetic Philosophy
**Mood:** Calm, elegant, unhurried. Like a literary journal that became a product. It should feel peaceful to look at and scroll through — not loud, not startup-y, and absolutely no generic SaaS elements.

**Guiding Principle:** The page should feel like you are already browsing someone's inner world. The experience of scrolling it should mirror the experience of using the app. The landing page should be calm; the taste map is the drama.

**Inspirations:** Are.na (quiet intellectual curation), Letterboxd (film culture meets personal identity), Cosmos app (floating visual cards), Oura Ring landing page (lead with identity not features, muted tones), 032c or NYT Magazine editorial design.

## 2. Typography
Typography is the soul of the visual identity. All fonts are sourced from Google Fonts.

*   **Display / Headline:** **Cormorant Garamond**
    *   Weight: Light (300)
    *   Line-height: Generous
    *   Letter-spacing: Slight negative
    *   Usage: Large headlines. Use *italics* for emotional emphasis.
*   **Body / UI:** **Jost**
    *   Weight: Light (300)
    *   Usage: Clean, airy, never heavy. Used for all body text and UI elements.
*   **Labels / Eyebrows:** **Jost**
    *   Weight: Light (300)
    *   Letter-spacing: Wide (0.2em+)
    *   Size: Very small (0.62–0.7rem)
    *   Usage: Section eyebrows, small metadata, all-caps.

## 3. Color Palette
Contrast and typography do all the work. There is no accent color on the landing page.

*   **Base (Light Sections):** Pure White (`#ffffff`)
*   **Ink (Text & Dark Sections):** Near-black (`#111110`)
*   **Alternate Backgrounds:** Very light warm off-white (`#f8f6f2` or similar)
*   **Borders & Dividers:** Thin hairlines (`rgba(17, 17, 16, 0.08)`)
*   *Note:* The only "color" moment occurs when the taste map iframe appears (black background with neon nodes). The landing page relies on monochromatic elegance.

## 4. UI Elements & Micro-interactions
*   **Borders & Shapes:** **Sharp corners only.** Absolutely no rounded corners or pill buttons.
*   **Spacing:** Generous. Sections must breathe.
*   **Custom Cursor:** A small dot that expands on hover over interactive elements.
*   **Scroll Animations:** All sections reveal on scroll (fade + translate up, staggered). The Nav becomes frosted glass on scroll.
*   **Taste Shelf:** Mouse drag with momentum; cursor changes to grab/grabbing.
*   **Images:** Mosaic images feature a subtle scale on hover (1.03, slow transition). Images should be abstract, atmospheric SVG illustrations — no stock-photo energy.
*   **Watermarks:** Section numbers (01, 02...) and background elements (like the giant "IV") are rendered in large, faint, outline/hairline style text.

## 5. What to Avoid
*   No rounded corners or pill buttons.
*   No purple, no gradient backgrounds.
*   No Inter, Roboto, or standard system fonts.
*   No hero-features-CTA template structure.
*   No bouncing animations, particle effects, or 3D elements on the landing page (save for the actual taste map iframe).
