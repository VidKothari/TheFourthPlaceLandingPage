'use client';
import { motion, useReducedMotion } from 'framer-motion';

// Ink-plate settle — the DESIGN-LANGUAGE §7 misregistration device, animated once.
// An aria-hidden duplicate of a display heading, printed in the section's second
// ink, starts 4px out of register and settles to 1px the first time the heading
// scrolls into view: the page printing itself. transform/opacity only.
// Per §7, misregistration never touches Cormorant italics — the ghost's <em>
// spans are blanked (transparent, no background) but keep their metrics so the
// two plates line-wrap identically. Reduced motion: rendered statically at the
// final 1px offset, no movement.
export default function InkSettleHeading({ as: Tag = 'h2', ink, style, children }) {
  const MotionTag = motion[Tag];
  const reduce = useReducedMotion();
  const settled = { x: 1, y: 1 };

  return (
    <div style={{ position: 'relative' }}>
      <MotionTag
        aria-hidden="true"
        className="ink-ghost"
        initial={reduce ? settled : { x: 4, y: 4 }}
        whileInView={settled}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          ...style,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          marginBottom: 0,
          color: ink,
          zIndex: 0,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {children}
      </MotionTag>
      <Tag style={{ ...style, position: 'relative', zIndex: 1 }}>{children}</Tag>
      <style jsx>{`
        div :global(.ink-ghost em) {
          color: transparent !important;
          background: none !important;
        }
      `}</style>
    </div>
  );
}
