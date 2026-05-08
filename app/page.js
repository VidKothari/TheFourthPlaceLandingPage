import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Manifesto from '../components/Manifesto';
import TheThread from '../components/TheThread';
import BranchingThread from '../components/BranchingThread';
import PullQuote from '../components/PullQuote';
import TasteMapPreview from '../components/TasteMapPreview';
import FeaturesGrid from '../components/FeaturesGrid';
import RealWorld from '../components/RealWorld';
import UserJourney from '../components/UserJourney';
import Waitlist from '../components/Waitlist';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Marquee />
      <Manifesto />
      <TheThread />
      <BranchingThread />
      <PullQuote />
      <TasteMapPreview />
      <FeaturesGrid />
      <RealWorld />
      <UserJourney />
      <Waitlist />
      <Footer />
    </main>
  );
}
