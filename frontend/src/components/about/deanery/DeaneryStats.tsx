type Props = {
  deaneryCount: number;
  parishCount: number;
};

const DeaneryStats = ({ deaneryCount, parishCount }: Props) => (
  <div className="bg-gradient-to-r from-amber-700 to-amber-600 px-6 md:px-16 lg:px-24 py-12 relative overflow-hidden">
    {/* Decorative cross pattern */}
    <div className="absolute inset-0 opacity-5 pointer-events-none">
      <div className="absolute top-0 right-0 w-40 h-40">
        <svg viewBox="0 0 100 100" className="w-full h-full text-white">
          <path
            d="M50 10 L50 90 M10 50 L90 50"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
          />
        </svg>
      </div>
    </div>

    <div className="max-w-7xl mx-auto flex flex-wrap gap-8 md:gap-16 items-center relative z-10">
      {/* Deaneries stat */}
      <div>
        <p className="text-5xl font-serif font-bold text-white">
          {deaneryCount}
        </p>
        <p className="text-amber-100 text-sm font-medium mt-1 uppercase tracking-wide">
          Deaneries
        </p>
      </div>

      {/* Divider */}
      <div className="w-px h-12 bg-white/30 hidden md:block" />

      {/* Parishes stat */}
      <div>
        <p className="text-5xl font-serif font-bold text-white">
          {parishCount}
        </p>
        <p className="text-amber-100 text-sm font-medium mt-1 uppercase tracking-wide">
          Parishes
        </p>
      </div>

      {/* Divider */}
      <div className="w-px h-12 bg-white/30 hidden md:block" />

      {/* Diocese stat */}
      <div>
        <p className="text-5xl font-serif font-bold text-white">1</p>
        <p className="text-amber-100 text-sm font-medium mt-1 uppercase tracking-wide">
          Diocese
        </p>
      </div>

      {/* Right side label */}
      <div className="ml-auto hidden lg:block text-right">
        <p className="text-white font-serif font-bold text-lg">
          Catholic Diocese of Osogbo
        </p>
        <p className="text-amber-100 text-xs mt-1">
          Province of Ibadan · Church in Nigeria
        </p>
      </div>
    </div>
  </div>
);

export default DeaneryStats;
