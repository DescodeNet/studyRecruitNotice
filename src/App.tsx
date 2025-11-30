import Hero from './components/Hero';
import PainPoint from './components/PainPoint';
import About from './components/About';
import Curriculum from './components/Curriculum';
import HowItWorks from './components/HowItWorks';
import Reviews from './components/Reviews';
import Info from './components/Info';
import Instructor from './components/Instructor';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import FloatingCTA from './components/FloatingCTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <PainPoint />
      <About />
      <Curriculum />
      <HowItWorks />
      <Reviews />
      <Info />
      <Instructor />
      <FAQ />
      <CTA />
      <Footer />
      <FloatingCTA />
    </div>
  );
}
