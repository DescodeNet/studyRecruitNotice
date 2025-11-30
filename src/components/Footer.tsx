export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white/70 py-8">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-lg font-semibold text-white mb-2">지코노믹 코칭랩</p>
        <p className="text-sm mb-4">
          제주에서 시작하는 경제 문해력 코칭 스터디
        </p>
        <div className="flex justify-center text-sm">
          <a href="https://open.kakao.com/o/g1RTUo4h" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            카카오톡 문의
          </a>
        </div>
        <p className="mt-6 text-xs text-white/50">
          © 2025 지코노믹 코칭랩. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
