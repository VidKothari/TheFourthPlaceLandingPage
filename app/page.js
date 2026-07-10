import { headers } from 'next/headers';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Manifesto from '../components/Manifesto';
import ThreadSection from '../components/ThreadSection';
import TasteMapPreview from '../components/TasteMapPreview';
import InPractice from '../components/InPractice';
import WaitlistFab from '../components/WaitlistFab';
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
      <TasteMapPreview />
      <InPractice />
      <Waitlist />
      <Suggestions />
      <Footer />
      <WaitlistFab />
    </main>
  );
}
