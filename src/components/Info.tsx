import { motion } from 'framer-motion';
import { content } from '../data/content';

export default function Info() {
  const { info } = content;

  return (
    <section id="info" className="py-20 md:py-28 bg-bg">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-txt-primary mb-4">
            {info.headline}
          </h2>
          <p className="text-lg text-txt-secondary">
            {info.subheadline}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {info.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-md"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-sm text-txt-muted font-medium">
                  {item.label}
                </span>
                {item.badge && (
                  <span className="px-2 py-1 bg-accent/20 text-accent-hover text-xs font-medium rounded-full">
                    {item.badge}
                  </span>
                )}
              </div>
              <p className="text-xl font-bold text-txt-primary">
                {item.value}
              </p>
              {item.subtext && (
                <p className="text-sm text-txt-secondary mt-1">
                  {item.subtext}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Schedule Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-md"
        >
          <h3 className="text-lg font-bold text-txt-primary mb-4">
            희망 일정 (택1)
          </h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {info.scheduleOptions.map((option, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-bg text-txt-primary rounded-lg text-sm"
              >
                {option}
              </span>
            ))}
          </div>
          <p className="text-sm text-txt-muted">
            * {info.scheduleNote}
          </p>
        </motion.div>

        {/* Map Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <a
            href="https://map.kakao.com/link/search/제주시 도령로33"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-xl transition-colors shadow-md"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            카카오맵에서 장소 확인하기
          </a>
        </motion.div>
      </div>
    </section>
  );
}
