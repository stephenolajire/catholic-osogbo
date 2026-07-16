const DeaneryHero = () => (
  <section className="relative bg-linear-to-br from-amber-50 via-white to-orange-50 pt-24 pb-20 px-6 md:px-16 lg:px-24 overflow-hidden">
    {/* Decorative cross pattern */}
    <div className="absolute top-0 right-0 w-72 h-72 opacity-5 pointer-events-none">
      <svg viewBox="0 0 100 100" className="w-full h-full text-amber-900">
        <path
          d="M50 10 L50 90 M10 50 L90 50"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
      </svg>
    </div>

    {/* Soft gradient orbs with warm tones */}
    <div className="absolute top-10 left-1/3 w-80 h-80 bg-amber-200/15 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-orange-200/10 rounded-full blur-2xl pointer-events-none" />

    {/* Subtle scripture reference decorative line */}
    <div
      className="absolute inset-0 opacity-[0.03] pointer-events-none"
      style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 100px, rgba(217, 119, 6, 0.5) 100px, rgba(217, 119, 6, 0.5) 101px)`,
      }}
    />

    <div className="relative z-10 max-w-4xl">
      {/* Label with cross icon */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-6 h-6 border border-amber-700/30 rounded">
          <div className="text-amber-700 text-xs">✦</div>
        </div>
        <span className="text-amber-900 text-sm font-semibold uppercase tracking-widest">
          Our Diocesan Family
        </span>
      </div>

      {/* Main heading with serif style and warm colors */}
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-amber-950 leading-tight mb-6">
        The Deanery <span className="text-amber-700">Structure</span>
      </h1>

      {/* Descriptive text */}
      <p className="text-amber-900/70 text-lg leading-relaxed max-w-2xl font-light">
        The Catholic Diocese of Osogbo is organized into eight sacred deaneries,
        each serving as a unified family of parishes. Together, these
        communities form the spiritual foundation of our diocese, fostering
        fellowship, faith, and service in the light of Christ.
      </p>

      {/* Decorative scripture reference */}
      <div className="mt-8 pt-8 border-t border-amber-200">
        <p className="text-amber-700/60 text-sm italic font-light">
          "For we are members of his body." — Ephesians 4:25
        </p>
      </div>
    </div>
  </section>
);

export default DeaneryHero;
