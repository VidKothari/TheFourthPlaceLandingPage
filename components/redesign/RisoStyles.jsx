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
    `}</style>
  );
}
