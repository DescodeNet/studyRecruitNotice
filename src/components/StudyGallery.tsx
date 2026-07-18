import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface StudyImage {
  readonly src: string;
  readonly alt: string;
}

const STUDY_IMAGE_ORDER = [5, 2, 3, 4, 1, ...Array.from({ length: 11 }, (_, index) => index + 6)];

const STUDY_IMAGES: readonly StudyImage[] = STUDY_IMAGE_ORDER.map((imageNumber) => {
  return {
    src: `/img/study/study-${String(imageNumber).padStart(2, '0')}.jpeg`,
    alt: `스터디 현장 사진 ${imageNumber}`,
  };
});

const FIRST_IMAGE_INDEX = 0;
const VISIBLE_SECONDARY_IMAGES = STUDY_IMAGES.slice(1, 4);

export default function StudyGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedImage = selectedIndex === null ? null : STUDY_IMAGES[selectedIndex];

  const openImage = (index: number) => {
    setSelectedIndex(index);
  };

  const closeImage = () => {
    setSelectedIndex(null);
  };

  const showPreviousImage = () => {
    setSelectedIndex((currentIndex) => {
      if (currentIndex === null) {
        return currentIndex;
      }

      return currentIndex === 0 ? STUDY_IMAGES.length - 1 : currentIndex - 1;
    });
  };

  const showNextImage = () => {
    setSelectedIndex((currentIndex) => {
      if (currentIndex === null) {
        return currentIndex;
      }

      return currentIndex === STUDY_IMAGES.length - 1 ? 0 : currentIndex + 1;
    });
  };

  useEffect(() => {
    if (selectedImage === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeImage();
      }

      if (event.key === 'ArrowLeft') {
        showPreviousImage();
      }

      if (event.key === 'ArrowRight') {
        showNextImage();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedImage]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-6 gap-3 md:gap-4 mb-4"
      >
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => openImage(FIRST_IMAGE_INDEX)}
          aria-label={`${STUDY_IMAGES[FIRST_IMAGE_INDEX].alt} 확대 보기`}
          className="col-span-6 md:col-span-3 rounded-2xl overflow-hidden shadow-lg aspect-[4/3] cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary/30"
        >
          <img
            src={STUDY_IMAGES[FIRST_IMAGE_INDEX].src}
            alt={STUDY_IMAGES[FIRST_IMAGE_INDEX].alt}
            className="w-full h-full object-cover"
          />
        </motion.button>

        {VISIBLE_SECONDARY_IMAGES.map((image, index) => (
          <motion.button
            key={image.src}
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 * (index + 1) }}
            onClick={() => openImage(index + 1)}
            aria-label={`${image.alt} 확대 보기`}
            className="col-span-2 md:col-span-1 rounded-2xl overflow-hidden shadow-md aspect-[4/3] md:aspect-auto cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary/30"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </motion.button>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-10 md:mb-12"
      >
        <div className="mb-3 flex items-center justify-between gap-3 md:hidden">
          <p className="text-sm font-bold text-txt-primary">사진첩</p>
          <p className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary">
            옆으로 밀어 더 보기
            <span aria-hidden="true" className="text-base leading-none">›</span>
          </p>
        </div>

        <div role="region" aria-label="사진첩 썸네일 목록" className="relative">
          <div className="overflow-x-auto pb-2 pr-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:pr-0">
            <div className="flex min-w-max snap-x snap-mandatory gap-3 md:gap-4">
              {STUDY_IMAGES.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => openImage(index)}
                  aria-label={`${image.alt} 크게 보기`}
                  className="h-20 w-28 flex-shrink-0 snap-start overflow-hidden rounded-xl border border-black/5 bg-bg shadow-sm transition-transform duration-200 hover:-translate-y-1 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-primary/30 md:h-24 md:w-36"
                >
                  <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white via-white/80 to-transparent md:hidden"
          />
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 px-4 py-6"
            onClick={closeImage}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={selectedImage.alt}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-5xl"
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-h-[78dvh] w-full rounded-2xl object-contain bg-black shadow-xl"
              />

              <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl bg-black/60 px-3 py-3 text-white md:mt-4">
                <p className="text-sm md:text-base font-medium">
                  {selectedImage.alt} / {STUDY_IMAGES.length}
                </p>
                <button
                  type="button"
                  onClick={closeImage}
                  className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold transition-colors hover:bg-white hover:text-txt-primary focus:outline-none focus:ring-4 focus:ring-white/30"
                >
                  닫기
                </button>
              </div>

              <button
                type="button"
                onClick={showPreviousImage}
                aria-label="이전 사진"
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-2xl text-white transition-colors hover:bg-black/70 focus:outline-none focus:ring-4 focus:ring-white/30 md:left-5"
              >
                <span aria-hidden="true">‹</span>
              </button>

              <button
                type="button"
                onClick={showNextImage}
                aria-label="다음 사진"
                className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-2xl text-white transition-colors hover:bg-black/70 focus:outline-none focus:ring-4 focus:ring-white/30 md:right-5"
              >
                <span aria-hidden="true">›</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
