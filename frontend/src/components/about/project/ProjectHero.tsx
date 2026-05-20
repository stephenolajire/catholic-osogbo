const ProjectHero = () => (
  <div className="relative bg-primary-900 overflow-hidden">
    {/* Decorative background pattern */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-400 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary-300 rounded-full blur-2xl translate-y-1/3" />
    </div>

    <div className="relative px-6 md:px-25 py-20 md:py-28 w-full mx-auto">
      <div className="max-w-2xl">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-5">
          <span className="w-8 h-0.5 bg-primary-400" />
          <span className="text-primary-300 text-xs font-semibold uppercase tracking-widest">
            Diocese of Osogbo
          </span>
        </div>

        {/* Heading */}
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
          Diocesan Projects
        </h1>

        {/* Sub */}
        <p className="text-primary-200 text-base md:text-lg leading-relaxed max-w-xl">
          Building the Kingdom of God through faith-driven initiatives — from
          church construction to education, healthcare, and community
          transformation.
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap gap-8 mt-10">
          {[
            { label: "Active Projects", value: "24+" },
            { label: "Deaneries Covered", value: "8" },
            { label: "Completed", value: "60+" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-white text-2xl font-bold">{stat.value}</p>
              <p className="text-primary-300 text-xs font-medium mt-0.5">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default ProjectHero;
