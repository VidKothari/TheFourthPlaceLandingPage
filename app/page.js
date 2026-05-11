import { headers } from 'next/headers';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Manifesto from '../components/Manifesto';
import ThreadSection from '../components/ThreadSection';
import BranchingThread from '../components/BranchingThread';
import PullQuote from '../components/PullQuote';
import TasteMapPreview from '../components/TasteMapPreview';
import FeaturesGrid from '../components/FeaturesGrid';
import RealWorld from '../components/RealWorld';
import UserJourney from '../components/UserJourney';
import Waitlist from '../components/Waitlist';
import Suggestions from '../components/Suggestions';
import Footer from '../components/Footer';

export default function Home() {
  const headersList = headers();
  const ua = headersList.get('user-agent') || '';
  const isMobileUA = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);

  return (
    <main>
      <Nav />
      <Hero />
      <Marquee />
      <Manifesto />
      <ThreadSection defaultMobile={isMobileUA} />
      <BranchingThread />
      <PullQuote />
      <TasteMapPreview />
      <FeaturesGrid />
      <RealWorld />
      <UserJourney />
      <Waitlist />
      <Suggestions />
      <Footer />
    </main>
  );
}
