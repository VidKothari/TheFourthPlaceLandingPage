'use client';

import { useEffect, useRef } from 'react';

// Decorative landing clips must keep moving whenever the page is active. Native
// autoplay attributes are not reliable after hydration in every browser, so set
// the media properties directly and retry at each useful readiness boundary.
export default function AutoplayLoopVideo({ children, ...props }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const play = () => {
      video.muted = true;
      video.defaultMuted = true;
      video.loop = true;
      const attempt = video.play();
      if (attempt) attempt.catch(() => {});
    };

    const resumeWhenVisible = () => {
      if (document.visibilityState === 'visible') play();
    };

    play();
    const events = ['loadedmetadata', 'loadeddata', 'canplay', 'canplaythrough', 'pause', 'ended'];
    events.forEach((event) => video.addEventListener(event, play));
    document.addEventListener('visibilitychange', resumeWhenVisible);

    return () => {
      events.forEach((event) => video.removeEventListener(event, play));
      document.removeEventListener('visibilitychange', resumeWhenVisible);
    };
  }, []);

  return (
    <video ref={videoRef} autoPlay muted loop playsInline {...props}>
      {children}
    </video>
  );
}
