import { useEffect, useState } from 'react';
import { content } from '../data/content';

export default function FloatingCTA() {
  const { cta } = content;
  const [show, setShow] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setShow(window.scrollY > window.innerHeight * 0.8);
    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    return () => window.removeEventListener('scroll', updateVisibility);
  }, []);

  const scrollToCTA = () => {
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className={`md:hidden transition-transform duration-200 ${show ? 'translate-y-0' : 'translate-y-full pointer-events-none'}`}
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
