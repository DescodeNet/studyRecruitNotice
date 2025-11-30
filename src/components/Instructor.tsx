import { motion } from 'framer-motion';
import { content } from '../data/content';

export default function Instructor() {
  const { instructor } = content;

  return (
    <section id="instructor" className="py-20 md:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-txt-primary mb-4">
            {instructor.headline}
          </h2>
          <p className="text-lg text-txt-secondary">
            {instructor.subheadline}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-bg rounded-3xl p-8 md:p-10 text-center"
        >
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-primary/10 ring-4 ring-white shadow-lg"
          >
            <img
              src="/img/instructor/isme.png"
              alt={instructor.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </motion.div>

          {/* Name */}
          <h3 className="text-2xl font-bold text-txt-primary mb-3">
            {instructor.name}
          </h3>

          {/* Bio */}
          <p className="text-txt-secondary mb-6 max-w-md mx-auto leading-relaxed">
            {instructor.bio}
          </p>

          {/* Stats */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full text-sm font-medium text-txt-primary shadow-sm mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            {instructor.stats}
          </div>

          {/* Philosophy */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="pt-6 border-t border-txt-muted/20"
          >
            <svg className="w-6 h-6 mx-auto text-primary/40 mb-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-lg text-primary font-medium italic">
              "{instructor.philosophy}"
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
