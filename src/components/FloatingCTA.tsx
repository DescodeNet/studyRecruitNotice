import { useState, useEffect, useRef } from 'react';

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const heroSection = document.getElementById('hero');
          const ctaSection = document.getElementById('cta');

          if (heroSection && ctaSection) {
            const heroBottom = heroSection.getBoundingClientRect().bottom;
            const ctaTop = ctaSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            setIsVisible(heroBottom < 0 && ctaTop > windowHeight);
          }
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCTA = () => {
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 backdrop-blur-sm border-t border-gray-100 md:hidden transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <button
        onClick={scrollToCTA}
        className="w-full px-6 py-4 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl text-lg transition-colors cursor-pointer"
      >
        스터디 신청하기
      </button>
    </div>
  );
}
