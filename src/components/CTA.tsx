import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { content } from '../data/content';

const EMAILJS_SERVICE_ID = 'service_ncti5e9';
const EMAILJS_TEMPLATE_ID = 'template_e1qs48p';
const EMAILJS_PUBLIC_KEY = 'bkVln7d1E5k2oO-eA';

interface FormData {
  name: string;
  phone: string;
  email?: string;
  schedule: string[];
  experience?: string;
  question?: string;
}

export default function CTA() {
  const { cta } = content;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const templateParams = {
        from_name: data.name,
        phone: data.phone,
        email: data.email || '미입력',
        schedule: data.schedule.join(', '),
        experience: data.experience || '미입력',
        question: data.question || '없음',
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error('이메일 전송 실패:', error);
      alert('신청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="cta" className="py-20 md:py-28 bg-primary">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {cta.headline}
          </h2>
          <p className="text-lg text-white/80">
            {cta.subheadline}
          </p>
        </motion.div>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 md:p-12 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-txt-primary mb-3">
              신청이 완료되었습니다!
            </h3>
            <p className="text-txt-secondary mb-6">
              {cta.submitMessage}
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-primary font-medium hover:underline cursor-pointer"
            >
              다시 신청하기
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-3xl p-8 md:p-10"
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-txt-primary mb-2">
                  {cta.formFields.name.label} <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('name', { required: '이름을 입력해주세요' })}
                  type="text"
                  placeholder={cta.formFields.name.placeholder}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-colors outline-none ${
                    errors.name
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-200 focus:border-primary'
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-txt-primary mb-2">
                  {cta.formFields.phone.label} <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('phone', {
                    required: '연락처를 입력해주세요',
                    pattern: {
                      value: /^[0-9-]+$/,
                      message: '올바른 연락처를 입력해주세요',
                    },
                  })}
                  type="tel"
                  placeholder={cta.formFields.phone.placeholder}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-colors outline-none ${
                    errors.phone
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-200 focus:border-primary'
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-txt-primary mb-2">
                {cta.formFields.email.label}
              </label>
              <input
                {...register('email')}
                type="email"
                placeholder={cta.formFields.email.placeholder}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary transition-colors outline-none"
              />
            </div>

            {/* Schedule */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-txt-primary mb-3">
                {cta.formFields.schedule.label} <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {cta.formFields.schedule.options.map((option, index) => (
                  <label
                    key={index}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-bg rounded-lg cursor-pointer hover:bg-primary/10 transition-colors has-[:checked]:bg-primary has-[:checked]:text-white"
                  >
                    <input
                      {...register('schedule', { required: '희망 일정을 선택해주세요' })}
                      type="checkbox"
                      value={option}
                      className="sr-only"
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                ))}
              </div>
              {errors.schedule && (
                <p className="text-red-500 text-sm mt-2">{errors.schedule.message}</p>
              )}
            </div>

            {/* Experience */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-txt-primary mb-2">
                {cta.formFields.experience.label}
              </label>
              <select
                {...register('experience')}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary transition-colors outline-none bg-white cursor-pointer"
              >
                <option value="">선택해주세요</option>
                {cta.formFields.experience.options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Question */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-txt-primary mb-2">
                {cta.formFields.question.label}
              </label>
              <textarea
                {...register('question')}
                placeholder={cta.formFields.question.placeholder}
                rows={3}
                maxLength={500}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary transition-colors outline-none resize-none"
              />
            </div>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(232, 165, 75, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-8 py-4 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? '신청 중...' : cta.primaryButton}
              </motion.button>
              <a
                href="https://open.kakao.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-8 py-4 bg-transparent border-2 border-primary text-primary font-semibold rounded-xl text-lg hover:bg-primary/5 transition-colors text-center"
              >
                {cta.secondaryButton}
              </a>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}
