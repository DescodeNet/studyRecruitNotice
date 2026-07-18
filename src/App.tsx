import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Curriculum from './components/Curriculum';
import HowItWorks from './components/HowItWorks';
import Reviews from './components/Reviews';
import Instructor from './components/Instructor';
import CTA from './components/CTA';
import FloatingCTA from './components/FloatingCTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <Hero />
      <Curriculum />
      <HowItWorks />
      <Reviews />
      <Instructor />
      <CTA />
      <Footer />
      <FloatingCTA />
    </div>
  );
}
