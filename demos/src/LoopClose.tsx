import React from 'react';
import { AbsoluteFill, Freeze, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

// Makes a composition loop seamlessly: over the final `fadeFrames`, a frozen
// copy of frame 0 fades in on top, so the last frame IS the first frame.
export const LoopClose: React.FC<{ children: React.ReactNode; fadeFrames?: number }> = ({
  children,
  fadeFrames = 14,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const start = durationInFrames - fadeFrames;
  const opacity = interpolate(frame, [start, durationInFrames - 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill>
      <AbsoluteFill>{children}</AbsoluteFill>
      {frame >= start ? (
        <AbsoluteFill style={{ opacity }}>
          <Freeze frame={0}>{children}</Freeze>
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};
