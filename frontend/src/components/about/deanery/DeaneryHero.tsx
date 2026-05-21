const DeaneryHero = () => (
  <section className="relative bg-neutral-950 pt-20 pb-16 px-6 md:px-16 lg:px-24 overflow-hidden">
    {/* Animated gradient orbs */}
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary-400/5 rounded-full blur-2xl pointer-events-none" />

    {/* Grid lines */}
    <div
      className="absolute inset-0 opacity-[0.04] pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(to right, #fff 1px, transparent 1px),
          linear-gradient(to bottom, #fff 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }}
    />

    <div className="relative z-10 max-w-3xl">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-0.5 bg-primary-500" />
        <span className="text-primary-400 text-xs font-semibold uppercase tracking-widest">
          Diocese Structure
        </span>
      </div>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
        Deanery <span className="text-primary-400">Structure</span>
      </h1>

      <p className="text-neutral-400 text-lg leading-relaxed max-w-xl">
        The Catholic Diocese of Osogbo is organised into eight deaneries, each
        comprising a family of parishes united under a common deanery.
      </p>
    </div>
  </section>
);

export default DeaneryHero;
