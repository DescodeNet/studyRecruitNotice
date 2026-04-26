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
  sido: string;
  regionDetail: string;
  experience?: string;
  question?: string;
  consent: boolean;
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

  const inputClass =
    'w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-txt-primary outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/10';
  const selectClass =
    'w-full appearance-none rounded-xl border-2 border-gray-200 bg-white px-4 py-3 pr-12 text-txt-primary outline-none transition-all duration-200 cursor-pointer shadow-sm focus:border-primary focus:ring-4 focus:ring-primary/10';
  const errorClass = 'border-red-300 focus:border-red-500 focus:ring-red-100';

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const templateParams = {
        from_name: data.name,
        phone: data.phone,
        email: data.email || '미입력',
        sido: data.sido,
        region_detail: data.regionDetail,
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
    <section id="cta" className="py-14 md:py-20 bg-primary">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 whitespace-pre-line leading-tight">
            {cta.headline}
          </h2>
          <p className="text-lg text-white/80 whitespace-pre-line leading-relaxed">
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
            <h3 className="text-2xl font-bold text-txt-primary mb-3">신청이 완료되었습니다!</h3>
            <p className="text-txt-secondary mb-6 whitespace-pre-line">{cta.submitMessage}</p>
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
            className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-white/70"
          >
            <div className="mb-8 rounded-2xl bg-bg/80 border border-accent/30 p-5 md:p-6">
              <div className="flex items-start gap-4">
                <span className="mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
                  5+
                </span>
                <div>
                  <p className="text-sm font-bold text-primary mb-1">지역 기반 팀 개설 안내</p>
                  <p className="text-sm md:text-base text-txt-secondary leading-relaxed">
                    같은 시/도와 상세 희망 지역에서 신청자가 5명 이상 모이면 담당자가 순차적으로 연락드립니다.
                    팀은 질문과 토론이 편한 5~10명 규모로 운영됩니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-txt-primary mb-2">
                  {cta.formFields.name.label} <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('name', { required: '이름을 입력해주세요' })}
                  type="text"
                  placeholder={cta.formFields.name.placeholder}
                  className={`${inputClass} ${errors.name ? errorClass : ''}`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

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
                  className={`${inputClass} ${errors.phone ? errorClass : ''}`}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-txt-primary mb-2">
                {cta.formFields.email.label}
              </label>
              <input
                {...register('email')}
                type="email"
                placeholder={cta.formFields.email.placeholder}
                className={inputClass}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-txt-primary mb-2">
                  {cta.formFields.sido.label} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    {...register('sido', { required: '희망 시/도를 선택해주세요' })}
                    className={`${selectClass} ${errors.sido ? errorClass : ''}`}
                  >
                    <option value="">시/도를 선택해주세요</option>
                    {cta.formFields.sido.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-primary/70">
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                      <path d="M5 7.5L10 12.5L15 7.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
                {errors.sido && <p className="text-red-500 text-sm mt-1">{errors.sido.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-txt-primary mb-2">
                  {cta.formFields.regionDetail.label} <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('regionDetail', { required: '상세 희망 지역을 입력해주세요' })}
                  type="text"
                  placeholder={cta.formFields.regionDetail.placeholder}
                  className={`${inputClass} ${errors.regionDetail ? errorClass : ''}`}
                />
                {errors.regionDetail && <p className="text-red-500 text-sm mt-1">{errors.regionDetail.message}</p>}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-txt-primary mb-2">
                {cta.formFields.experience.label}
              </label>
              <div className="relative">
                <select {...register('experience')} className={selectClass}>
                  <option value="">선택해주세요</option>
                  {cta.formFields.experience.options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-primary/70">
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M5 7.5L10 12.5L15 7.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-txt-primary mb-2">
                {cta.formFields.question.label}
              </label>
              <textarea
                {...register('question')}
                placeholder={cta.formFields.question.placeholder}
                rows={3}
                maxLength={500}
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="mb-8 rounded-2xl bg-bg/70 border border-gray-100 p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  {...register('consent', { required: '개인정보 수집·이용 동의가 필요합니다' })}
                  type="checkbox"
                  className="mt-1 h-5 w-5 flex-shrink-0 rounded border-gray-300 accent-primary cursor-pointer"
                />
                <span className="text-sm text-txt-secondary leading-relaxed">
                  {cta.formFields.consent.label} <span className="text-red-500">*</span>
                </span>
              </label>
              {errors.consent && <p className="text-red-500 text-sm mt-2 pl-8">{errors.consent.message}</p>}
            </div>

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
                href="https://open.kakao.com/o/g1RTUo4h"
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
