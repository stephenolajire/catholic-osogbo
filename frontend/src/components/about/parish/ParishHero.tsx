type Props = {
  totalParishes: number;
  totalDeaneries: number;
};

const ParishHero = ({ totalParishes, totalDeaneries }: Props) => (
  <div className="relative bg-neutral-950 overflow-hidden">
    {/* Diagonal gold accent stripe */}
    <div
      className="absolute inset-0 opacity-[0.07]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(-55deg, #d97706 0px, #d97706 1px, transparent 1px, transparent 48px)",
      }}
    />

    {/* Subtle warm wash */}
    <div
      className="absolute inset-x-0 top-0 h-32 opacity-10"
      style={{
        background: "linear-gradient(180deg, #d97706 0%, transparent 100%)",
      }}
    />

    <div className="relative px-6 md:px-25 pt-16 pb-0 w-full mx-auto">
      {/* Eyebrow */}
      <div className="flex items-center gap-3 mb-8">
        <span className="w-6 h-px bg-warning" />
        <span
          className="text-warning text-[10px] font-bold uppercase tracking-[0.25em]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Catholic Diocese of Osogbo
        </span>
      </div>

      {/* Headline — editorial oversized */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 pb-12 border-b border-neutral-800">
        <div>
          <h1
            className="font-display text-5xl md:text-7xl font-bold text-white leading-none tracking-tight mb-4"
            style={{ letterSpacing: 0 }}
          >
            Our
            <br />
            <span style={{ color: "var(--color-warning)" }}>Parishes</span>
          </h1>
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-md">
            The local Church made visible — communities of faith rooted in every
            corner of the Diocese of Osogbo.
          </p>
        </div>

        {/* Stats — vertical rule separated */}
        <div className="flex gap-10 md:gap-12 pb-1">
          {[
            { value: totalParishes + "+", label: "Parishes" },
            { value: totalDeaneries, label: "Deaneries" },
            { value: "1961", label: "Diocese Est." },
          ].map((s) => (
            <div key={s.label} className="text-right">
              <p
                className="text-white font-bold"
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                  lineHeight: 1,
                }}
              >
                {s.value}
              </p>
              <p className="text-neutral-500 text-xs font-medium mt-1 uppercase tracking-wider">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default ParishHero;
