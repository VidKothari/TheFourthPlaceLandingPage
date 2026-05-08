/* eslint-disable react/no-unescaped-entities */
'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function BranchingThread() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Main trunk: comes in from top-center, splits into left/right arms
  // Left arm splits into 4 tendrils; right arm splits into 4 tendrils
  // All 8 converge at the bottom-center (TasteMap entry)

  const trunk       = useTransform(scrollYProgress, [0,    0.18], [0, 1]);
  const leftArm     = useTransform(scrollYProgress, [0.16, 0.42], [0, 1]);
  const rightArm    = useTransform(scrollYProgress, [0.16, 0.42], [0, 1]);
  const leftBranch1 = useTransform(scrollYProgress, [0.38, 0.65], [0, 1]);
  const leftBranch2 = useTransform(scrollYProgress, [0.40, 0.65], [0, 1]);
  const leftBranch3 = useTransform(scrollYProgress, [0.42, 0.65], [0, 1]);
  const leftBranch4 = useTransform(scrollYProgress, [0.44, 0.65], [0, 1]);
  const rightBranch1 = useTransform(scrollYProgress, [0.38, 0.65], [0, 1]);
  const rightBranch2 = useTransform(scrollYProgress, [0.40, 0.65], [0, 1]);
  const rightBranch3 = useTransform(scrollYProgress, [0.42, 0.65], [0, 1]);
  const rightBranch4 = useTransform(scrollYProgress, [0.44, 0.65], [0, 1]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '0',         // zero height — purely decorative overlay
        overflow: 'visible',
        zIndex: 5,
        pointerEvents: 'none'
      }}
    >
      <svg
        viewBox="0 0 1200 900"
        preserveAspectRatio="xMidYMid meet"
        className="mobile-hide"
        style={{
          position: 'absolute',
          top: '-60px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100vw',
          height: '900px',
          overflow: 'visible'
        }}
      >
        <defs>
          <filter id="branch-ink">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="5" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.2" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </defs>

        {/* Main trunk — enters top-center */}
        <motion.path
          d="M600,0 C598,60 602,100 600,160"
          fill="none" stroke="var(--text-pure)" strokeWidth="1.5" strokeLinecap="round"
          filter="url(#branch-ink)"
          style={{ pathLength: trunk }}
        />

        {/* LEFT ARM — curves left past the quote */}
        <motion.path
          d="M600,160 C596,210 520,260 420,290 C360,308 300,310 240,330"
          fill="none" stroke="var(--text-pure)" strokeWidth="1.2" strokeLinecap="round"
          filter="url(#branch-ink)"
          style={{ pathLength: leftArm }}
        />

        {/* RIGHT ARM — curves right past the quote */}
        <motion.path
          d="M600,160 C604,210 680,260 780,290 C840,308 900,310 960,330"
          fill="none" stroke="var(--text-pure)" strokeWidth="1.2" strokeLinecap="round"
          filter="url(#branch-ink)"
          style={{ pathLength: rightArm }}
        />

        {/* LEFT TENDRILS — fan out then converge */}
        <motion.path
          d="M240,330 C200,390 180,460 260,560 C310,620 420,700 600,850"
          fill="none" stroke="var(--text-pure)" strokeWidth="0.8" strokeLinecap="round"
          filter="url(#branch-ink)"
          style={{ pathLength: leftBranch1 }}
        />
        <motion.path
          d="M240,330 C210,400 200,480 280,580 C340,640 450,710 600,850"
          fill="none" stroke="var(--text-pure)" strokeWidth="0.8" strokeLinecap="round"
          filter="url(#branch-ink)"
          style={{ pathLength: leftBranch2 }}
        />
        <motion.path
          d="M240,330 C215,410 215,500 290,600 C355,660 460,720 600,850"
          fill="none" stroke="var(--text-pure)" strokeWidth="0.6" strokeLinecap="round"
          filter="url(#branch-ink)"
          style={{ pathLength: leftBranch3 }}
        />
        <motion.path
          d="M240,330 C220,420 230,520 305,620 C370,680 470,730 600,850"
          fill="none" stroke="var(--text-pure)" strokeWidth="0.5" strokeLinecap="round"
          filter="url(#branch-ink)"
          style={{ pathLength: leftBranch4 }}
        />

        {/* RIGHT TENDRILS — mirror fan, converge */}
        <motion.path
          d="M960,330 C1000,390 1020,460 940,560 C890,620 780,700 600,850"
          fill="none" stroke="var(--text-pure)" strokeWidth="0.8" strokeLinecap="round"
          filter="url(#branch-ink)"
          style={{ pathLength: rightBranch1 }}
        />
        <motion.path
          d="M960,330 C990,400 1000,480 920,580 C860,640 750,710 600,850"
          fill="none" stroke="var(--text-pure)" strokeWidth="0.8" strokeLinecap="round"
          filter="url(#branch-ink)"
          style={{ pathLength: rightBranch2 }}
        />
        <motion.path
          d="M960,330 C985,410 985,500 910,600 C845,660 740,720 600,850"
          fill="none" stroke="var(--text-pure)" strokeWidth="0.6" strokeLinecap="round"
          filter="url(#branch-ink)"
          style={{ pathLength: rightBranch3 }}
        />
        <motion.path
          d="M960,330 C980,420 970,520 895,620 C830,680 730,730 600,850"
          fill="none" stroke="var(--text-pure)" strokeWidth="0.5" strokeLinecap="round"
          filter="url(#branch-ink)"
          style={{ pathLength: rightBranch4 }}
        />

        {/* Convergence dot at TasteMap entry */}
        <motion.circle
          cx="600" cy="855" r="4"
          fill="var(--text-pure)"
          style={{ opacity: useTransform(scrollYProgress, [0.6, 0.7], [0, 1]) }}
        />
      </svg>
    </div>
  );
}
