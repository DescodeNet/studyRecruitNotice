import { motion } from 'framer-motion';
import { content } from '../data/content';
import { Icon } from './Icon';

export default function Info() {
  const { info } = content;

  return (
    <section id="info" className="py-14 md:py-20 bg-bg">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-txt-primary mb-4 whitespace-pre-line leading-tight">
            {info.headline}
          </h2>
          <p className="text-lg text-txt-secondary whitespace-pre-line">
            {info.subheadline}
          </p>
        </motion.div>

        {/* 운영 기준 카드 */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {info.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-5 md:p-6 shadow-md"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Icon name={item.icon} className="w-5 h-5" />
                </span>
                <span className="text-sm text-txt-muted font-medium">
                  {item.label}
                </span>
              </div>
              <p className="text-xl font-bold text-txt-primary leading-snug whitespace-pre-line">
                {item.value}
              </p>
              {item.subtext && (
                <p className="text-sm text-txt-secondary mt-1.5">
                  {item.subtext}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* 팀 개설 흐름 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-3xl p-6 md:p-10 shadow-md"
        >
          <h3 className="text-xl md:text-2xl font-bold text-txt-primary mb-6 md:mb-8 text-center">
            팀 개설 흐름
          </h3>

          <ol className="grid md:grid-cols-2 gap-4 md:gap-5">
            {info.flow.map((step, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-start gap-4 p-4 rounded-2xl bg-bg/60 border border-gray-100"
              >
                <span className="flex-shrink-0 w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="font-semibold text-txt-primary">
                    {step.title}
                  </p>
                  <p className="text-sm text-txt-secondary mt-1 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>

          <p className="mt-8 text-center text-sm md:text-base text-primary font-medium">
            {info.note}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
