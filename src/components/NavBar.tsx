import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { id: 'about', label: '스터디 소개' },
  { id: 'curriculum', label: '커리큘럼' },
  { id: 'how-it-works', label: '진행 방식' },
  { id: 'reviews', label: '후기' },
  { id: 'info', label: '운영 안내' },
  { id: 'faq', label: 'FAQ' },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 320);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const targets = NAV_ITEMS
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-30% 0px -55% 0px',
        threshold: [0.05, 0.25, 0.5],
      }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const handleAnchor = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    const navOffset = window.innerWidth < 768 ? 108 : 64;
    const top = target.getBoundingClientRect().top + window.scrollY - navOffset;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {scrolled && (
        <motion.nav
          initial={{ y: -64, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -64, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          aria-label="페이지 내 빠른 이동"
          className="fixed top-0 left-0 right-0 z-40 bg-bg/85 backdrop-blur-md border-b border-black/5 shadow-[0_2px_12px_rgba(29,74,58,0.08)]"
        >
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-sm md:text-base font-bold text-primary-dark whitespace-nowrap"
            >
              현지희 재무코칭
            </button>

            <ul className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleAnchor(item.id)}
                      className={`relative px-3 py-2 text-sm font-medium rounded-full transition-colors ${
                        isActive
                          ? 'text-primary-dark'
                          : 'text-txt-secondary hover:text-primary-dark'
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 -z-10 rounded-full bg-primary/12"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleAnchor('cta')}
                className="hidden sm:inline-flex px-4 py-2 rounded-full bg-accent hover:bg-accent-hover text-white text-sm font-semibold transition-colors"
              >
                신청하기
              </button>
            </div>
          </div>

          <div className="md:hidden border-t border-black/5 bg-bg/95">
            <ul className="flex gap-2 overflow-x-auto px-4 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {NAV_ITEMS.map((item) => (
                <li key={item.id} className="flex-none">
                  <button
                    onClick={() => handleAnchor(item.id)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors whitespace-nowrap ${
                      activeId === item.id
                        ? 'bg-primary text-white'
                        : 'bg-white text-txt-secondary border border-black/5'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
