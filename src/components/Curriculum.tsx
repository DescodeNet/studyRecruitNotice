import { motion } from 'framer-motion';
import { content } from '../data/content';

export default function Curriculum() {
  const { curriculum } = content;

  return (
    <section id="curriculum" className="py-14 md:py-20 bg-bg">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-txt-primary mb-4 whitespace-pre-line">
            {curriculum.headline}
          </h2>
          <p className="text-lg text-txt-secondary whitespace-pre-line">
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
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md"
            >
              <div className="px-6 py-5 flex items-center justify-between text-left">
                <div className="flex items-center gap-4 min-w-0">
                  <span className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {week.week}강
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-txt-primary whitespace-pre-line leading-snug">
                      {week.title}
                    </h3>
                    <p className="text-sm text-txt-secondary mt-1">{week.subtitle}</p>
                  </div>
                </div>
                {week.tag && (
                  <span className="hidden sm:inline-block px-3 py-1 bg-accent/20 text-accent-hover text-xs font-medium rounded-full flex-shrink-0">
                    {week.tag}
                  </span>
                )}
              </div>

              <div className="px-6 pb-6 pt-2">
                <div className="md:pl-14 space-y-5">
                  {week.tag && (
                    <span className="sm:hidden inline-block px-3 py-1 bg-accent/20 text-accent-hover text-xs font-medium rounded-full">
                      {week.tag}
                    </span>
                  )}
                  {week.sublessons?.map((sub, subIndex) => (
                    <div key={subIndex}>
                      <p className="text-sm font-semibold text-primary mb-2">{sub.title}</p>
                      <ul className="space-y-2">
                        {sub.topics.map((topic, topicIndex) => (
                          <li key={topicIndex} className="flex items-start gap-3 text-txt-primary leading-relaxed">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                            <span className="whitespace-pre-line">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  {week.topics && (
                    <ul className="space-y-2">
                      {week.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="flex items-start gap-3 text-txt-primary leading-relaxed">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                          <span className="whitespace-pre-line">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-sm text-txt-muted mt-10">
          ※ 커리큘럼 세부 내용은 팀 운영 상황에 따라 조정될 수 있습니다.
        </p>
      </div>
    </section>
  );
}
