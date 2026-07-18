import { useState } from "react";
import { Users } from "lucide-react";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=1600&q=80";

type Props = {
  totalAssociations: number;
  totalLeaders: number;
};

const LayFaithfulHero = ({ totalAssociations, totalLeaders }: Props) => {
  const [imgSrc, setImgSrc] = useState(
    "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1600&q=80",
  );

  return (
    <section className="relative overflow-hidden bg-stone-900">
      <div className="absolute inset-0">
        <img
          src={imgSrc}
          alt=""
          className="h-full w-full object-cover opacity-40"
          onError={() => setImgSrc(FALLBACK_IMAGE)}
        />
        <div className="absolute inset-0 bg-linear-to-b from-stone-950/80 via-stone-950/70 to-stone-950/90" />
      </div>

      <div className="relative px-6 py-24 text-center md:px-16 lg:px-24 lg:py-28">
        <div className="mx-auto flex max-w-2xl flex-col items-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-stone-300">
            <Users size={13} className="text-stone-400" />
            Lay Apostolate
          </span>
          <h1 className="font-serif text-4xl font-bold text-white md:text-5xl">
            Lay Faithful Associations
          </h1>
          <p className="mt-4 text-lg font-light leading-relaxed text-stone-300">
            Diocesan lay associations and societies, each with its own chaplain,
            officers, formation path, and apostolic responsibility to serve the
            Church and community.
          </p>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-12 grid max-w-md grid-cols-2 gap-4">
          {[
            { value: totalAssociations, label: "Associations" },
            { value: totalLeaders, label: "Leaders" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-5 backdrop-blur-sm"
            >
              <p className="font-serif text-3xl font-bold text-white">
                {stat.value}
              </p>
              <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-widest text-stone-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LayFaithfulHero;
