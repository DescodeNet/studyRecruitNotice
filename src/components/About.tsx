import { motion } from 'framer-motion';
import { content } from '../data/content';

export default function About() {
  const { about } = content;

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + i * 0.15,
        duration: 0.5,
      },
    }),
  };

  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-txt-primary mb-4 whitespace-pre-line leading-tight">
            {about.headline}
          </h2>
          <p className="text-lg text-txt-secondary max-w-2xl mx-auto">
            {about.subheadline}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {about.cards.map((card, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)' }}
              className="bg-white rounded-2xl p-8 shadow-md transition-all duration-300 border border-gray-100"
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-xl font-bold text-txt-primary mb-3">
                {card.title}
              </h3>
              <p className="text-txt-secondary leading-relaxed whitespace-pre-line">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
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
