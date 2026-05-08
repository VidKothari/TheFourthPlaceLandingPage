# The Fourth Place: App Features & Page Structure

This document outlines the exact flow of the landing page, ordered from top to bottom.

### 1. Fixed Nav
*   **Left:** Logo ("The Fourth Place" — serif, spaced uppercase).
*   **Right Links:** Philosophy / What people add / Taste map / Real world / Join waitlist (CTA button, black fill).
*   **Interaction:** Becomes frosted glass on scroll.

### 2. Hero
*   **Background:** Full viewport. Cream/off-white background.
*   **Headline (Bottom-Left):** Large Cormorant Garamond:
    > You are not the
    > content you scroll.
    > You are the *art*
    > that moved you.
*   **Subtext:** "The Fourth Place maps your inner world, finds the people nearby who resonate, and brings you together in the real one."
*   **CTA (Bottom-Right):** "Join the waitlist" button + "Launching in Pune & Mumbai" (small faint text).
*   **Visual Concept:** Floating SVG cultural artifacts scattered across the upper portion (Solaris, Persona, Pink Moon, Boxer, Left Hand of Darkness, Norwegian Wood, Wikipedia card, YouTube card, personal note card) at slight angles (±2°), fading out as they approach the text. Staggered fade+translate on load.

### 3. Scrolling Marquee
*   **Design:** Full-width dark background strip.
*   **Content:** Italic serif text scrolling continuously: "Films that changed how you see the world · Albums you only play when you need to feel something · Books you've been trying to give everyone you love · Wikipedia articles you read at 2am · YouTube videos you've watched a dozen times · Reddit threads that made you feel less alone · Tweets you've thought about for years · Notes you'd only write if no one was watching ·"

### 4. Manifesto
*   **Layout:** Sticky left label + right body text.
*   **Left:** Eyebrow "The belief" + headline "Social media forgot what *social* means."
*   **Right:** Body text (Jost 300) detailing the philosophy of consumption vs. connection, and how the truest parts of you have nowhere to live.

### 5. Full-Width Pull Quote
*   **Design:** Black background, white text, centered.
*   **Text:** 
    > "Not everything, but the things that make sense.
    > Not everyone, but *the ones* that make sense."
    > — The Fourth Place

### 6. Taste Shelf
*   **Header:** Eyebrow "What people add" + headline "Everything that has ever *moved* you."
*   **Content:** Horizontally scrollable row of content cards (drag to scroll with momentum). Cards include films, albums, books, Wikipedia, YouTube, Reddit, Tweets, and personal notes.
*   **Design:** Cards feel like real UI objects styled in a calm, editorial treatment (e.g., Wikipedia's W logo, YouTube's red). Subtle lift on hover.

### 7. Taste Map
*   **Header:** Eyebrow "The taste map" + headline "Your *cultural constellation.*" + desc "Every node is something that moved you. Every cluster is a part of your inner world. Switch between two people. Hit Merge — watch what you share glow gold."
*   **Embed:** Full 100vh iframe (`tastemap.html`), no borders. The only colorful neon moment.
*   **Footer Bar:** "Drag to rotate · scroll to zoom · click any node" (left), "This is what two people's inner worlds look like together." (right, italic serif).

### 8. Features Grid
*   **Header:** Eyebrow "What it is" + headline "Four things that work together."
*   **Grid:** 
    *   01 Your *taste map* (Tag: Living portrait)
    *   02 Your *collections* (Tag: Private archive)
    *   03 What you *want to do* (Tag: Intentional future)
    *   04 The *people nearby* (Tag: Resonant matching)
    *   **Dark Statement Card:** Black background, italic text emphasizing that the social outcome is a surprise, not the goal. (Tag: No followers. No feed. No performance.)

### 9. Real World Section
*   **Header:** Eyebrow "The real world" + headline "The map finds them. *You find each other.*" + body describing real-world suggestions.
*   **Mosaic Image Grid:** 5 cells (2fr 1fr 1fr / 320px 280px) featuring stylized, atmospheric SVG illustrations of people together in warm, low-light environments (bookstore, cinema, chai, walking, live music). Subtle scale on hover.

### 10. User Journey
*   **Header:** Eyebrow "A story" + headline "Meet Arjun. 26, Pune."
*   **Steps (Roman numerals I–IV):**
    *   I. The first *night.* (Adding the first meaningful piece of art).
    *   II. The first *week.* (Recognizing patterns in his own map).
    *   III. The *resonance.* (Matching with someone sharing the same shape of interests).
    *   IV. The *meeting.* (A real-world meeting that feels like a continuation of an ongoing conversation).

### 11. Waitlist
*   **Design:** Large centered headline: "Your inner world deserves a *home.*"
*   **Content:** Subtext about building slowly in Pune. Email input and "Join" button.
*   **Launch Order:** "Launching first in *Pune* · then *Mumbai* · then *Bengaluru*"
*   **Visual Element:** Giant "IV" watermark behind it all at very low opacity.

### 12. Footer
*   **Layout:** Logo (left) · tagline (center, italic) · © 2025 (right).
