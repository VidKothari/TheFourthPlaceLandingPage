import { notFound } from 'next/navigation';
import { VARIANTS } from '../../../components/redesign/variants';
import { INK, InkCut } from '../../../components/redesign/shared';
import RisoStyles from '../../../components/redesign/RisoStyles';
import RisoNav from '../../../components/redesign/RisoNav';
import RisoHero from '../../../components/redesign/RisoHero';
import RisoMarquee from '../../../components/redesign/RisoMarquee';
import RisoFeed from '../../../components/redesign/RisoFeed';
import RisoTasteMap from '../../../components/redesign/RisoTasteMap';
import RisoExhibition from '../../../components/redesign/RisoExhibition';
import RisoPractice from '../../../components/redesign/RisoPractice';
import RisoProfile from '../../../components/redesign/RisoProfile';
import RisoWaitlist from '../../../components/redesign/RisoWaitlist';
import RisoFooter from '../../../components/redesign/RisoFooter';

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(VARIANTS).map((v) => ({ v: String(v) }));
}

export function generateMetadata({ params }) {
  return {
    title: 'The Fourth Place',
    robots: { index: false, follow: false },
  };
}

export default function VersionPage({ params }) {
  const variant = VARIANTS[params.v];
  if (!variant) notFound();

  return (
    <main style={{ background: INK.paper }}>
      <RisoStyles />
      <RisoNav />
      <RisoHero hero={variant.hero} />
      {/* Marquee removed July 16 per Siddharth — component kept for possible return. */}
      <RisoFeed />
      <InkCut from={INK.paper} to={INK.paperDeep} />
      <RisoTasteMap eyesTile={variant.eyesTile} />
      {/* No cut here — the map flows seamlessly into the exhibition wall. */}
      <RisoExhibition />
      <InkCut from={INK.cobalt} to={INK.coral} />
      <RisoPractice />
      <InkCut from={INK.coral} to={INK.paper} />
      <RisoProfile />
      <InkCut from={INK.paper} to={INK.mustard} />
      <RisoWaitlist waitlist={variant.waitlist} />
      <RisoFooter />
    </main>
  );
}
