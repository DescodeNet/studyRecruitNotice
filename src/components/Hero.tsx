import { motion } from 'framer-motion';
import { content } from '../data/content';

export default function Hero() {
  const { hero } = content;

  const scrollToSection = () => {
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/img/hero/hero-main.jpg')`,
            filter: 'brightness(0.7)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/60 via-primary/40 to-primary-dark/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 py-10 md:px-12 md:py-14 max-w-4xl mx-auto bg-black/40 backdrop-blur-sm rounded-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 whitespace-pre-line"
        >
          {hero.headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="text-lg md:text-xl text-white/90 mb-8 whitespace-pre-line leading-relaxed"
        >
          {hero.subheadline}
        </motion.p>


        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(232, 165, 75, 0.4)' }}
          whileTap={{ scale: 0.98 }}
          onClick={scrollToSection}
          className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg text-lg transition-all duration-200 cursor-pointer"
        >
          {hero.cta}
        </motion.button>
      </div>
    </section>
  );
}
