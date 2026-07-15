import { INK, InkCut } from './shared';
import RisoStyles from './RisoStyles';
import RisoNav from './RisoNav';
import RisoHero from './RisoHero';
import RisoFeed from './RisoFeed';
import RisoTasteMap from './RisoTasteMap';
import RisoExhibition from './RisoExhibition';
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
      {/* Marquee remains available as a component but is intentionally off-page. */}
      <RisoFeed />
      <InkCut from={INK.paper} to={INK.paperDeep} />
      <RisoTasteMap eyesTile={variant.eyesTile} />
      <RisoExhibition />
      <RisoPractice />
      <RisoWaitlist waitlist={variant.waitlist} />
      <RisoFooter />
    </main>
  );
}
