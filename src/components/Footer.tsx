import { content } from '../data/content';

export default function Footer() {
  const { footer } = content;

  return (
    <footer className="bg-primary-dark text-white/70 py-8">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-lg font-semibold text-white mb-2">{footer.brand}</p>
        <p className="text-sm mb-4 whitespace-pre-line">
          {footer.tagline}
        </p>
        <div className="flex justify-center text-sm">
          <a href="https://open.kakao.com/o/g1RTUo4h" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            {footer.contactLabel}
          </a>
        </div>
        <p className="mt-6 text-xs text-white/50">
          © 2025 {footer.brand}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
