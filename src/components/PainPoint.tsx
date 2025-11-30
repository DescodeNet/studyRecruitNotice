import { motion } from 'framer-motion';
import { content } from '../data/content';

export default function PainPoint() {
  const { painPoint } = content;

  return (
    <section id="pain-point" className="py-20 md:py-28 bg-bg">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-txt-primary mb-4">
            {painPoint.headline}
          </h2>
          <p className="text-lg text-txt-secondary">
            {painPoint.subheadline}
          </p>
        </motion.div>

        <div className="space-y-4 mb-12">
          {painPoint.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-start gap-4 p-4 rounded-xl bg-white border-2 border-transparent"
            >
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary font-bold text-sm">{index + 1}</span>
              </div>
              <span className="text-base md:text-lg leading-relaxed text-txt-primary">
                {item}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center text-lg md:text-xl font-semibold text-primary"
        >
          {painPoint.closing}
        </motion.p>
      </div>
    </section>
  );
}
