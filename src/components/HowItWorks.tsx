import { motion } from 'framer-motion';
import { content } from '../data/content';

export default function HowItWorks() {
  const { howItWorks } = content;

  const studyImages = Array.from({ length: 16 }, (_, index) => ({
    src: `/img/study/study-${String(index + 1).padStart(2, '0')}.jpeg`,
    alt: `스터디 현장 사진 ${index + 1}`,
  }));

  const featuredImage = studyImages[0];
  const secondaryImages = studyImages.slice(1, 4);

  return (
    <section id="how-it-works" className="py-14 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-txt-primary mb-4 whitespace-pre-line">
            {howItWorks.headline}
          </h2>
          <p className="text-lg text-txt-secondary whitespace-pre-line">
            {howItWorks.subheadline}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-6 gap-3 md:gap-4 mb-4"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="col-span-6 md:col-span-3 rounded-2xl overflow-hidden shadow-lg aspect-[4/3]"
          >
            <img
              src={featuredImage.src}
              alt={featuredImage.alt}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {secondaryImages.map((image, index) => (
            <motion.div
              key={image.src}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * (index + 1) }}
              className="col-span-2 md:col-span-1 rounded-2xl overflow-hidden shadow-md aspect-[4/3] md:aspect-auto"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 md:mb-12 overflow-x-auto pb-2"
        >
          <div className="flex gap-3 md:gap-4 min-w-max">
            {studyImages.map((image, index) => (
              <div
                key={image.src}
                className="w-28 h-20 md:w-36 md:h-24 rounded-xl overflow-hidden shadow-sm border border-black/5 bg-bg flex-shrink-0"
                aria-label={`스터디 현장 썸네일 ${index + 1}`}
              >
                <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-bg rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-bold text-txt-primary mb-6">
                {howItWorks.structure.title}
              </h3>
              <ul className="space-y-4">
                {howItWorks.structure.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-4 text-txt-secondary">
                    <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="pt-1 whitespace-pre-line">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {howItWorks.qna.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-bg rounded-xl p-5"
              >
                <p className="text-txt-primary font-medium mb-2 whitespace-pre-line">
                  Q: "{item.q}"
                </p>
                <p className="text-primary font-semibold whitespace-pre-line">
                  A: {item.a}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
