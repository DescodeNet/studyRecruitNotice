export default function FloatingCTA() {
  const scrollToCTA = () => {
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 backdrop-blur-sm border-t border-gray-100 md:hidden">
      <button
        onClick={scrollToCTA}
        className="w-full px-6 py-4 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl text-lg transition-colors cursor-pointer"
      >
        스터디 신청하기
      </button>
    </div>
  );
}
