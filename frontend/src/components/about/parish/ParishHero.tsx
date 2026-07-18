import { MapPin } from "lucide-react";

type Props = {
  totalParishes: number;
  totalDeaneries: number;
};

const ParishHero = ({ totalParishes, totalDeaneries }: Props) => (
  <section className="relative overflow-hidden bg-stone-900">
    <div className="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=1600&q=80"
        alt=""
        className="h-full w-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-linear-to-b from-stone-950/80 via-stone-950/70 to-stone-950/90" />
    </div>

    <div className="relative px-6 py-24 text-center md:px-16 lg:px-24 lg:py-28">
      <div className="mx-auto flex max-w-2xl flex-col items-center">
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-stone-300">
          <MapPin size={13} className="text-stone-400" />
          Catholic Diocese of Osogbo
        </span>
        <h1 className="font-serif text-4xl font-bold text-white md:text-5xl">
          Our Parishes
        </h1>
        <p className="mt-4 text-lg font-light leading-relaxed text-stone-300">
          The local Church made visible — communities of faith rooted in every
          corner of the Diocese of Osogbo.
        </p>
      </div>

      {/* Stats */}
      <div className="mx-auto mt-12 grid max-w-xl grid-cols-3 gap-4">
        {[
          { value: `${totalParishes}+`, label: "Parishes" },
          { value: totalDeaneries, label: "Deaneries" },
          { value: "1961", label: "Diocese Est." },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-5 backdrop-blur-sm"
          >
            <p className="font-serif text-3xl font-bold text-white">
              {s.value}
            </p>
            <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-widest text-stone-400">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ParishHero;
