import { useState } from "react";
import { UserRound } from "lucide-react";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=1600&q=80";

const PriestHero = () => {
  const [imgSrc, setImgSrc] = useState(
    "https://images.unsplash.com/photo-1518481852452-9415b262eba4?w=1600&q=80",
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
            <UserRound size={13} className="text-stone-400" />
            Our Clergy
          </span>
          <h1 className="font-serif text-4xl font-bold text-white md:text-5xl">
            Priests of the Diocese
          </h1>
          <p className="mt-4 text-lg font-light leading-relaxed text-stone-300">
            Meet the dedicated servants of God who shepherd the faithful across
            the parishes and institutions of the Catholic Diocese of Osogbo.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PriestHero;
