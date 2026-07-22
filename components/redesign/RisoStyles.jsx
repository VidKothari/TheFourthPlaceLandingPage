'use client';

// One static grain tile per field section, per the print treatment rules:
// small tile, low opacity, multiply, never animated.
export default function RisoStyles() {
  return (
    <style jsx global>{`
      .riso-grain {
        position: relative;
        isolation: isolate;
      }
      .riso-grain::after {
        content: '';
        position: absolute;
        inset: 0;
        background-image: url('/assets/redesign/grain.png');
        background-repeat: repeat;
        opacity: 0.055;
        mix-blend-mode: multiply;
        pointer-events: none;
        z-index: 2;
      }
      .riso-grain > * {
        position: relative;
        z-index: 3;
      }
      .riso-halftone {
        position: relative;
        isolation: isolate;
      }
      .riso-halftone::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image: radial-gradient(circle, rgba(239, 230, 208, 1) 1.15px, transparent 1.15px),
          radial-gradient(circle, rgba(239, 230, 208, 1) 1.15px, transparent 1.15px);
        background-size: 11px 22px, 11px 22px;
        background-position: 0 0, 5.5px 11px; /* brick offset like the app's Halftone */
        opacity: 0.1;
        pointer-events: none;
        z-index: 2;
      }
      .riso-halftone > * {
        position: relative;
        z-index: 3;
      }
    `}</style>
  );
}
