import { motion } from 'framer-motion';
import { content } from '../data/content';

export default function About() {
  const { about } = content;

  return (
    <section id="about" className="py-14 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-txt-primary mb-4 whitespace-pre-line leading-tight">
            {about.headline}
          </h2>
          <p className="text-lg text-txt-secondary whitespace-pre-line max-w-2xl mx-auto">
            {about.subheadline}
          </p>
        </motion.div>

        {/* 운영 실적 강조 - 핵심 수치 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-3 gap-3 md:gap-6 mb-10 md:mb-12"
        >
          {about.stats.map((stat, index) => (
            <div
              key={index}
              className="bg-bg rounded-2xl p-5 md:p-6 text-center border border-gray-100"
            >
              <p className="flex items-baseline justify-center gap-1">
                <span className="text-4xl md:text-5xl font-extrabold text-[#B94735] leading-none">
                  {stat.value}
                </span>
                <span className="text-base md:text-lg font-bold text-[#B94735]">
                  {stat.suffix}
                </span>
              </p>
              <p className="mt-2 text-sm md:text-base text-txt-secondary font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary rounded-full font-medium">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            {about.socialProof}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
