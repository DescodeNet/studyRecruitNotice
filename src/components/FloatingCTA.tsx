import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      const ctaSection = document.getElementById('cta');

      if (heroSection && ctaSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        const ctaTop = ctaSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        setIsVisible(heroBottom < 0 && ctaTop > windowHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCTA = () => {
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 backdrop-blur-sm border-t border-gray-100 md:hidden"
        >
          <button
            onClick={scrollToCTA}
            className="w-full px-6 py-4 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl text-lg transition-colors cursor-pointer"
          >
            스터디 신청하기
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
