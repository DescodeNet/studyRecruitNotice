import { useEffect, useState } from 'react';
import { content } from '../data/content';

export default function FloatingCTA() {
  const { cta } = content;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const applicationSection = document.getElementById('cta');

      if (applicationSection === null || window.innerWidth >= 768) {
        setIsVisible(false);
        return;
      }

      const applicationTop = applicationSection.getBoundingClientRect().top;
      setIsVisible(applicationTop > window.innerHeight - 96);
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);

    return () => {
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
    };
  }, []);

  const scrollToCTA = () => {
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="md:hidden"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        padding: '1rem',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderTop: '1px solid #f3f4f6',
      }}
    >
      <button
        onClick={scrollToCTA}
        className="w-full px-6 py-4 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl text-lg transition-colors cursor-pointer"
      >
        {cta.primaryButton}
      </button>
    </div>
  );
}
