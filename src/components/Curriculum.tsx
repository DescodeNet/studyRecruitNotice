import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../data/content';

export default function Curriculum() {
  const { curriculum } = content;
  const [openWeek, setOpenWeek] = useState<number>(0);

  return (
    <section id="curriculum" className="py-20 md:py-28 bg-bg">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-txt-primary mb-4">
            {curriculum.headline}
          </h2>
          <p className="text-lg text-txt-secondary">
            {curriculum.subheadline}
          </p>
        </motion.div>

        <div className="space-y-4">
          {curriculum.weeks.map((week, index) => (
            <motion.div
              key={week.week}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md"
            >
              <button
                onClick={() => setOpenWeek(openWeek === index ? -1 : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer hover:bg-bg/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                    {week.week}강
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-txt-primary">
                      {week.title}
                    </h3>
                    <p className="text-sm text-txt-secondary">
                      {week.subtitle}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {week.tag && (
                    <span className="hidden sm:inline-block px-3 py-1 bg-accent/20 text-accent-hover text-xs font-medium rounded-full">
                      {week.tag}
                    </span>
                  )}
                  <motion.svg
                    animate={{ rotate: openWeek === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-5 h-5 text-txt-muted"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </div>
              </button>

              <AnimatePresence>
                {openWeek === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2">
                      <div className="pl-14">
                        {week.tag && (
                          <span className="sm:hidden inline-block px-3 py-1 mb-4 bg-accent/20 text-accent-hover text-xs font-medium rounded-full">
                            {week.tag}
                          </span>
                        )}
                        <ul className="space-y-3">
                          {week.topics.map((topic, topicIndex) => (
                            <motion.li
                              key={topicIndex}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: topicIndex * 0.1 }}
                              className="flex items-start gap-3 text-txt-primary"
                            >
                              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                              {topic}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
