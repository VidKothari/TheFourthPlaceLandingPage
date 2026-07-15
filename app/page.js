import { VARIANTS } from '../components/redesign/variants';
import RisoLanding from '../components/redesign/RisoLanding';

// `/` is the only public landing route and renders the selected production variant.
export default function Home() {
  return <RisoLanding variant={VARIANTS[1]} />;
}
