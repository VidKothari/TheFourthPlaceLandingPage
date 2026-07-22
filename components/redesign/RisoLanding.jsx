import { INK, InkCut } from './shared';
import RisoStyles from './RisoStyles';
import RisoNav from './RisoNav';
import RisoHero from './RisoHero';
import RisoFeed from './RisoFeed';
import RisoTasteMap from './RisoTasteMap';
import RisoExhibition from './RisoExhibition';
import RisoAnything from './RisoAnything';
import RisoPractice from './RisoPractice';
import RisoWaitlist from './RisoWaitlist';
import RisoFooter from './RisoFooter';

// The production landing composition, rendered exclusively at `/`.
export default function RisoLanding({ variant }) {
  return (
    <main style={{ background: INK.paper }}>
      <RisoStyles />
      <RisoNav />
      <RisoHero hero={variant.hero} />
      <InkCut from={INK.base} to={INK.paper} />
      {/* Marquee remains available as a component but is intentionally off-page. */}
      <RisoFeed />
      <InkCut from={INK.paper} to={INK.base} />
      <RisoTasteMap />
      <RisoExhibition />
      <RisoAnything />
      <RisoPractice />
      <InkCut from={INK.base} to={INK.paper} />
      <RisoWaitlist waitlist={variant.waitlist} />
      <RisoFooter />
    </main>
  );
}
