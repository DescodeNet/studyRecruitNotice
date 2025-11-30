import { motion } from 'framer-motion';
import { content } from '../data/content';

export default function HowItWorks() {
  const { howItWorks } = content;

  const studyImages = [
    { src: '/img/atmosphere/study-1.jpg', alt: '스터디 분위기 1' },
    { src: '/img/atmosphere/study-2.jpg', alt: '스터디 분위기 2' },
    { src: '/img/atmosphere/study-session.jpg', alt: '강의 모습' },
    { src: '/img/atmosphere/study-3.jpg', alt: '스터디 분위기 3' },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-txt-primary mb-4">
            {howItWorks.headline}
          </h2>
          <p className="text-lg text-txt-secondary">
            {howItWorks.subheadline}
          </p>
        </motion.div>

        {/* 이미지 갤러리 - 벤토 그리드 스타일 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-16"
        >
          {/* 큰 이미지 - 강의 모습 */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="col-span-2 row-span-2 rounded-2xl overflow-hidden shadow-lg"
          >
            <img
              src={studyImages[3].src}
              alt={studyImages[3].alt}
              className="w-full h-full object-cover aspect-square md:aspect-auto"
            />
          </motion.div>

          {/* 작은 이미지들 - 스터디 분위기 */}
          {studyImages.slice(0, 3).map((image, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * (index + 1) }}
              className="rounded-2xl overflow-hidden shadow-md aspect-square"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: 시간 구성 */}
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
                    <span className="pt-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right: Q&A + Testimonial */}
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
                <p className="text-txt-primary font-medium mb-2">
                  Q: "{item.q}"
                </p>
                <p className="text-primary font-semibold">
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
