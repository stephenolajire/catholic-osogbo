const PriestHero = () => (
  <section className="relative bg-primary-900 py-24 px-6 md:px-16 lg:px-24 overflow-hidden">
    {/* Background texture */}
    <div
      className="absolute inset-0 opacity-10 pointer-events-none"
      style={{
        backgroundImage:
          "radial-gradient(circle, #ffffff 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    />
    <div className="absolute inset-0 bg-linear-to-r from-primary-900 via-primary-900/95 to-primary-800 pointer-events-none" />

    <div className="relative z-10 max-w-4xl">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-0.5 bg-primary-400" />
        <span className="text-primary-300 text-xs font-semibold uppercase tracking-widest">
          Our Clergy
        </span>
      </div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
        Priests of the Diocese
      </h1>
      <p className="text-primary-200 text-lg max-w-2xl leading-relaxed">
        Meet the dedicated servants of God who shepherd the faithful across the
        parishes and institutions of the Catholic Diocese of Osogbo.
      </p>
    </div>
  </section>
);

export default PriestHero;
