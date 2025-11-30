export default function FloatingCTA() {
  const scrollToCTA = () => {
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className="md:hidden"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        padding: '1rem',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderTop: '1px solid #f3f4f6',
      }}
    >
      <button
        onClick={scrollToCTA}
        className="w-full px-6 py-4 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl text-lg transition-colors cursor-pointer"
      >
        스터디 신청하기
      </button>
    </div>
  );
}
