import { useState } from 'react';
import { motion } from 'framer-motion';
import { content } from '../data/content';

export default function PainPoint() {
  const { painPoint } = content;
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setCheckedItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const getResultMessage = () => {
    const count = checkedItems.length;
    if (count === 0) return null;
    if (count <= 2) return "경제 공부를 시작하기 딱 좋은 타이밍이에요!";
    if (count <= 4) return "많은 분들이 같은 고민을 하고 있어요. 함께 해결해봐요!";
    return "지금이 바로 돈 공부를 시작할 때입니다!";
  };

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

        <div className="space-y-4 mb-8">
          {painPoint.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => toggleItem(index)}
              className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                checkedItems.includes(index)
                  ? 'bg-primary/10 border-2 border-primary'
                  : 'bg-white border-2 border-transparent hover:border-primary/30'
              }`}
            >
              <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                checkedItems.includes(index)
                  ? 'bg-primary'
                  : 'border-2 border-gray-300 bg-white'
              }`}>
                {checkedItems.includes(index) && (
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className={`text-base md:text-lg leading-relaxed ${
                checkedItems.includes(index) ? 'text-primary font-medium' : 'text-txt-primary'
              }`}>
                {item}
              </span>
            </motion.div>
          ))}
        </div>

        {/* 진단 결과 */}
        {checkedItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-primary/10 rounded-2xl p-6 mb-8 text-center"
          >
            <p className="text-2xl font-bold text-primary mb-2">
              {checkedItems.length}개 해당!
            </p>
            <p className="text-txt-secondary">
              {getResultMessage()}
            </p>
          </motion.div>
        )}

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
