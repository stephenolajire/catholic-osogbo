const BishopMessagesHero = () => (
  <section className="relative bg-primary-950 py-24 px-6 md:px-16 lg:px-24 overflow-hidden">
    <div className="absolute inset-0 bg-linear-to-br from-primary-900 via-primary-950 to-neutral-950 pointer-events-none" />
    <div
      className="absolute inset-0 opacity-[0.06] pointer-events-none"
      style={{
        backgroundImage:
          "radial-gradient(circle, #ffffff 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    />
    <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl pointer-events-none" />

    <div className="relative z-10 max-w-3xl">
      <div className="flex items-center gap-3 mb-5">
        <span className="w-8 h-0.5 bg-primary-400" />
        <span className="text-primary-400 text-xs font-semibold uppercase tracking-widest">
          From the Bishop
        </span>
      </div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
        Bishop's <span className="text-primary-400">Messages</span>
      </h1>
      <p className="text-primary-200/70 text-lg leading-relaxed max-w-2xl">
        Pastoral letters, homilies, reflections, and messages from Most Rev.
        John Akin Oyejola, Bishop of the Catholic Diocese of Osogbo.
      </p>
    </div>
  </section>
);

export default BishopMessagesHero;
