'use client';

import { useEffect, useRef, useState } from 'react';

// Below-fold decorative clips start as poster-only video elements. Sources are
// attached shortly before the clip enters view, then playback follows viewport
// and tab visibility. Reduced-motion visitors never download the animation.
export default function AutoplayLoopVideo({
  children,
  poster,
  preload = 'metadata',
  rootMargin = '240px 0px',
  ...props
}) {
  const videoRef = useRef(null);
  const inViewportRef = useRef(false);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [nearViewport, setNearViewport] = useState(false);
  const [sourcesAttached, setSourcesAttached] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => setMotionAllowed(!media.matches);

    syncPreference();
    media.addEventListener?.('change', syncPreference);
    return () => media.removeEventListener?.('change', syncPreference);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const play = () => {
      if (
        !motionAllowed
        || !sourcesAttached
        || !inViewportRef.current
        || document.visibilityState !== 'visible'
      ) return;
      video.muted = true;
      video.defaultMuted = true;
      video.loop = true;
      const attempt = video.play();
      if (attempt) attempt.catch(() => {});
    };

    const syncPlayback = () => {
      if (inViewportRef.current && document.visibilityState === 'visible') {
        play();
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewportRef.current = entry.isIntersecting;
        setNearViewport(entry.isIntersecting);
        if (entry.isIntersecting && motionAllowed) setSourcesAttached(true);
        syncPlayback();
      },
      { rootMargin, threshold: 0.01 },
    );
    observer.observe(video);

    const events = motionAllowed ? ['loadedmetadata', 'loadeddata', 'canplay'] : [];
    events.forEach((event) => video.addEventListener(event, play));
    document.addEventListener('visibilitychange', syncPlayback);

    return () => {
      observer.disconnect();
      events.forEach((event) => video.removeEventListener(event, play));
      document.removeEventListener('visibilitychange', syncPlayback);
      video.pause();
    };
  }, [motionAllowed, rootMargin, sourcesAttached]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !sourcesAttached || !motionAllowed) return;
    video.load();
  }, [motionAllowed, sourcesAttached]);

  return (
    <video
      ref={videoRef}
      autoPlay={sourcesAttached && motionAllowed}
      muted
      loop
      playsInline
      preload={sourcesAttached ? preload : 'none'}
      poster={nearViewport || sourcesAttached ? poster : undefined}
      {...props}
    >
      {sourcesAttached && motionAllowed ? children : null}
    </video>
  );
}
