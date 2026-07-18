import { useState } from "react";
import { Sparkle } from "lucide-react";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=1600&q=80";

const DeaneryHero = () => {
  const [imgSrc, setImgSrc] = useState(
    "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=1600&q=80",
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
            <Sparkle size={13} className="text-stone-400" />
            Our Diocesan Family
          </span>
          <h1 className="font-serif text-4xl font-bold text-white md:text-5xl">
            The Deanery Structure
          </h1>
          <p className="mt-4 text-lg font-light leading-relaxed text-stone-300">
            The Catholic Diocese of Osogbo is organized into eight sacred
            deaneries, each serving as a unified family of parishes. Together,
            these communities form the spiritual foundation of our diocese,
            fostering fellowship, faith, and service in the light of Christ.
          </p>

          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="text-sm font-light text-stone-400">
              "For we are members of his body." — Ephesians 4:25
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeaneryHero;
