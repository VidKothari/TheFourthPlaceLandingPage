import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { SERIF, SERIF_ITALIC, T, UI } from './tokens';

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const ShareIcon: React.FC<{ color?: string }> = ({ color = 'rgba(255,255,255,0.72)' }) => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
    <path d="M12 15V3m0 0L7.8 7.2M12 3l4.2 4.2" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 11v7.2c0 1 .8 1.8 1.8 1.8h10.4c1 0 1.8-.8 1.8-1.8V11" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const LinkIcon: React.FC = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <path d="M9.5 14.5l5-5M7.6 16.4l-1 1a3.4 3.4 0 104.8 4.8l2.2-2.2a3.4 3.4 0 000-4.8M16.4 7.6l1-1a3.4 3.4 0 114.8 4.8L20 13.6a3.4 3.4 0 01-4.8 0" transform="translate(-2.4 -2.4)" stroke="rgba(255,255,255,0.78)" strokeWidth="1.25" strokeLinecap="round" />
  </svg>
);

const Cursor: React.FC<{ x: number; y: number; press: number; opacity: number }> = ({ x, y, press, opacity }) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: 54,
      height: 54,
      borderRadius: '50%',
      border: '2px solid rgba(255,255,255,0.74)',
      background: `rgba(255,255,255,${0.08 + press * 0.18})`,
      boxShadow: `0 0 0 ${press * 18}px rgba(255,255,255,${0.17 * (1 - press)})`,
      transform: `translate(-50%, -50%) scale(${1 - press * 0.17})`,
      opacity,
      zIndex: 30,
    }}
  >
    <div style={{ position: 'absolute', inset: 19, borderRadius: '50%', background: 'rgba(255,255,255,0.9)' }} />
  </div>
);

const ProfilePhoto: React.FC<{ size: number }> = ({ size }) => (
  <Img
    src={staticFile('maya-riso.png')}
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      objectFit: 'cover',
      objectPosition: '50% 32%',
      display: 'block',
    }}
  />
);

const ProfileScreen: React.FC<{ sheet: number; copied: number }> = ({ sheet, copied }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sharePress = spring({ frame: frame - 1.55 * fps, fps, durationInFrames: 0.28 * fps, config: { damping: 18, stiffness: 220 } });
  const copyPress = spring({ frame: frame - 3.15 * fps, fps, durationInFrames: 0.28 * fps, config: { damping: 18, stiffness: 220 } });
  const cursorX = interpolate(frame, [0.55 * fps, 1.35 * fps, 2.1 * fps, 2.75 * fps], [650, 773, 773, 450], { ...clamp, easing: Easing.inOut(Easing.quad) });
  const cursorY = interpolate(frame, [0.55 * fps, 1.35 * fps, 2.1 * fps, 2.75 * fps], [410, 128, 128, 895], { ...clamp, easing: Easing.inOut(Easing.quad) });
  const cursorOpacity = interpolate(frame, [0.5 * fps, 0.7 * fps, 3.7 * fps, 3.95 * fps], [0, 1, 1, 0], clamp);
  const currentPress = frame < 2.15 * fps ? sharePress * (1 - sharePress) * 2.7 : copyPress * (1 - copyPress) * 2.7;

  return (
    <AbsoluteFill style={{ background: T.paper, color: T.ink, fontFamily: UI, overflow: 'hidden' }}>
      <div style={{ height: 72, padding: '0 44px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${T.border}`, background: T.paper }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 18, height: 18, position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 7, borderRadius: '50%', background: 'rgba(255,255,255,0.55)' }} />
            {[0, 45, 90, 135].map((r) => <div key={r} style={{ position: 'absolute', width: 18, top: 8.5, height: 1, background: 'rgba(255,255,255,0.3)', transform: `rotate(${r}deg)` }} />)}
          </div>
          <span style={{ fontFamily: SERIF_ITALIC, fontStyle: 'italic', fontSize: 25, color: 'rgba(255,255,255,0.72)' }}>The Fourth Place</span>
        </div>
        <span style={{ fontSize: 12, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.28)' }}>PROFILE</span>
      </div>

      <div style={{ height: 615, position: 'relative', overflow: 'hidden', paddingTop: 72, textAlign: 'center', background: 'linear-gradient(165deg, #2a1646 0%, #15182d 52%, #0a0a09 100%)' }}>
        <div style={{ position: 'absolute', width: 490, height: 490, borderRadius: '50%', background: 'rgba(161,119,207,0.12)', filter: 'blur(14px)', left: 205, top: 40 }} />
        <button style={{ position: 'absolute', top: 32, right: 64, width: 68, height: 68, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.17)', background: 'rgba(255,255,255,0.06)', display: 'grid', placeItems: 'center', transform: `scale(${1 - currentPress * 0.08})` }}>
          <ShareIcon />
        </button>
        <div style={{ width: 230, height: 230, margin: '0 auto 28px', borderRadius: '50%', display: 'grid', placeItems: 'center', border: '2px solid rgba(184,169,204,0.55)', boxShadow: '0 0 0 9px rgba(184,169,204,0.05), 0 24px 80px rgba(0,0,0,0.36)' }}>
          <ProfilePhoto size={211} />
        </div>
        <div style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 54, lineHeight: 1, color: 'rgba(255,255,255,0.95)' }}>Alex Mercer</div>
        <div style={{ marginTop: 14, fontSize: 14, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.3)' }}>@ALEXKEEPS</div>
        <div style={{ margin: '24px auto 0', maxWidth: 540, fontFamily: SERIF_ITALIC, fontStyle: 'italic', fontSize: 24, lineHeight: 1.45, color: 'rgba(255,255,255,0.48)' }}>Films at midnight, impossible books,<br />songs for the long way home.</div>
        <div style={{ display: 'flex', gap: 13, justifyContent: 'center', marginTop: 31 }}>
          {['28 films', '41 songs', '16 books'].map((label) => <span key={label} style={{ padding: '11px 18px', border: '1px solid rgba(255,255,255,0.12)', fontSize: 12, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.44)' }}>{label.toUpperCase()}</span>)}
        </div>
      </div>

      <div style={{ margin: '30px 38px', border: `1px solid ${T.borderStrong}`, padding: 28, background: 'linear-gradient(135deg, #1a0e2e, #0e1828 52%, #091a1a)' }}>
        <div style={{ fontSize: 11, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.26)' }}>TASTE DNA</div>
        <div style={{ fontFamily: SERIF_ITALIC, fontStyle: 'italic', fontSize: 37, marginTop: 18, color: 'rgba(255,255,255,0.88)' }}>Tender surrealist</div>
        <div style={{ display: 'flex', gap: 26, marginTop: 18, fontFamily: SERIF, fontSize: 22, color: 'rgba(255,255,255,0.34)' }}><span>dream logic</span><span>jazz</span><span>quiet dread</span></div>
      </div>

      <div style={{ position: 'absolute', inset: 0, background: `rgba(0,0,0,${sheet * 0.5})`, opacity: sheet, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', left: 25, right: 25, bottom: 24, borderRadius: 30, overflow: 'hidden', background: '#161615', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 -20px 90px rgba(0,0,0,0.48)', transform: `translateY(${(1 - sheet) * 520}px)`, opacity: sheet }}>
        <div style={{ width: 68, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.16)', margin: '16px auto 12px' }} />
        <div style={{ padding: '12px 34px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontFamily: SERIF, fontSize: 31, color: 'rgba(255,255,255,0.92)' }}>Share your profile</div>
          <div style={{ fontSize: 13, marginTop: 7, color: 'rgba(255,255,255,0.34)' }}>Your profile and TasteMap travel together.</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22, padding: '25px 34px 29px', transform: `scale(${1 - copyPress * (1 - copyPress) * 0.06})`, background: copied > 0 ? `rgba(255,255,255,${copied * 0.05})` : 'transparent' }}>
          <div style={{ width: 66, height: 66, borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'rgba(255,255,255,0.08)' }}><LinkIcon /></div>
          <div><div style={{ fontSize: 20, color: 'rgba(255,255,255,0.86)' }}>Copy link</div><div style={{ fontSize: 13, marginTop: 6, color: 'rgba(255,255,255,0.3)' }}>thefourthplace.me/alexkeeps</div></div>
          <div style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.3)', fontSize: 25 }}>{copied > 0.15 ? '✓' : '›'}</div>
        </div>
      </div>

      <div style={{ position: 'absolute', left: '50%', bottom: 48, transform: `translate(-50%, ${20 * (1 - copied)}px)`, opacity: copied, padding: '14px 22px', borderRadius: 99, background: 'rgba(245,245,242,0.95)', color: '#0a0a09', fontSize: 14, letterSpacing: '0.08em', zIndex: 25 }}>LINK COPIED</div>
      <Cursor x={cursorX} y={cursorY} press={currentPress} opacity={cursorOpacity} />
    </AbsoluteFill>
  );
};

const InstagramBioScreen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - 4.45 * fps;
  const pastePress = spring({ frame: local - 0.85 * fps, fps, durationInFrames: 0.28 * fps, config: { damping: 18, stiffness: 220 } });
  const linkProgress = interpolate(local, [1.08 * fps, 1.45 * fps], [0, 1], clamp);
  const link = 'thefourthplace.me/alexkeeps';
  const pasted = link.slice(0, Math.round(link.length * linkProgress));
  const saved = interpolate(local, [1.8 * fps, 2.05 * fps], [0, 1], clamp);
  const cursorX = interpolate(local, [0, 0.72 * fps], [660, 170], { ...clamp, easing: Easing.inOut(Easing.quad) });
  const cursorY = interpolate(local, [0, 0.72 * fps], [780, 665], { ...clamp, easing: Easing.inOut(Easing.quad) });
  const cursorOpacity = interpolate(local, [0.05 * fps, 0.22 * fps, 1.5 * fps, 1.75 * fps], [0, 1, 1, 0], clamp);

  return (
    <AbsoluteFill style={{ background: '#fafafa', color: '#101010', fontFamily: UI }}>
      <div style={{ height: 94, padding: '0 38px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #dedede', background: '#fff' }}>
        <span style={{ fontSize: 42, fontWeight: 300, lineHeight: 1 }}>‹</span>
        <span style={{ marginLeft: 28, fontSize: 23, fontWeight: 600 }}>Edit profile</span>
        <span style={{ marginLeft: 'auto', fontSize: 17, fontWeight: 600, color: `rgba(0,149,246,${0.75 + saved * 0.25})` }}>{saved > 0.2 ? 'Done ✓' : 'Done'}</span>
      </div>
      <div style={{ padding: '48px 54px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <ProfilePhoto size={112} />
          <div><div style={{ fontSize: 21, fontWeight: 600 }}>alexkeeps</div><div style={{ color: '#0095f6', marginTop: 9, fontSize: 17 }}>Edit picture or avatar</div></div>
        </div>
        <div style={{ marginTop: 52 }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 10 }}>Name</div>
          <div style={{ border: '1px solid #d7d7d7', borderRadius: 12, padding: '18px 17px', background: '#fff', fontSize: 18 }}>Alex Mercer</div>
        </div>
        <div style={{ marginTop: 25 }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 10 }}>Bio</div>
          <div style={{ border: '1px solid #d7d7d7', borderRadius: 12, padding: '17px', background: '#fff', fontSize: 18, lineHeight: 1.45, minHeight: 105 }}>Films at midnight. Songs for the long way home.</div>
        </div>
        <div style={{ marginTop: 25 }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 10 }}>Links</div>
          <div style={{ position: 'relative', border: `1.5px solid ${linkProgress > 0 ? '#0095f6' : '#d7d7d7'}`, borderRadius: 12, padding: '19px 17px', background: '#fff', minHeight: 62, fontSize: 18, color: pasted ? '#101010' : '#999' }}>
            {pasted || 'Add external link'}{linkProgress > 0 && linkProgress < 1 ? <span style={{ color: '#0095f6' }}>|</span> : null}
            <div style={{ position: 'absolute', top: -47, left: 10, opacity: interpolate(local, [0.75 * fps, 0.86 * fps, 1.15 * fps, 1.3 * fps], [0, 1, 1, 0], clamp), transform: `scale(${0.9 + pastePress * 0.1})`, background: '#111', color: '#fff', borderRadius: 9, padding: '11px 18px', fontSize: 15 }}>Paste</div>
          </div>
        </div>
        <div style={{ marginTop: 38, color: '#737373', fontSize: 16, lineHeight: 1.5 }}>Your profile link lets people step into your TasteMap directly.</div>
      </div>
      <div style={{ position: 'absolute', left: '50%', bottom: 52, transform: `translate(-50%, ${18 * (1 - saved)}px)`, opacity: saved, padding: '14px 22px', borderRadius: 99, background: '#111', color: '#fff', fontSize: 14, letterSpacing: '0.08em' }}>PROFILE UPDATED</div>
      <Cursor x={cursorX} y={cursorY} press={pastePress * (1 - pastePress) * 2.7} opacity={cursorOpacity} />
    </AbsoluteFill>
  );
};

export const ProfileShare: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sheet = spring({ frame: frame - 1.68 * fps, fps, durationInFrames: 0.55 * fps, config: { damping: 200 } });
  const copied = interpolate(frame, [3.2 * fps, 3.48 * fps], [0, 1], clamp);
  const flip = interpolate(frame, [4.0 * fps, 4.65 * fps], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const angle = flip * 180;
  const profileVisible = angle < 92;
  const zoom = 1 - Math.sin(flip * Math.PI) * 0.08;

  return (
    <AbsoluteFill style={{ background: '#050505', perspective: 1800, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d', transform: `scale(${zoom}) rotateY(${angle}deg)`, boxShadow: `0 0 ${70 * Math.sin(flip * Math.PI)}px rgba(116,82,162,0.3)` }}>
        {profileVisible ? (
          <ProfileScreen sheet={sheet} copied={copied} />
        ) : (
          <div style={{ position: 'absolute', inset: 0, transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}><InstagramBioScreen /></div>
        )}
      </div>
    </AbsoluteFill>
  );
};
