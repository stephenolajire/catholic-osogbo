import { useState } from "react";
import { Hammer } from "lucide-react";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=1600&q=80";

const ProjectHero = () => {
  const [imgSrc, setImgSrc] = useState(
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=80",
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
            <Hammer size={13} className="text-stone-400" />
            Building the Kingdom
          </span>
          <h1 className="font-serif text-4xl font-bold text-white md:text-5xl">
            Diocesan Projects
          </h1>
          <p className="mt-4 text-lg font-light leading-relaxed text-stone-300">
            Constructing the foundation of faith through transformative
            initiatives — from sacred church buildings to educational
            institutions, healthcare facilities, and community development that
            glorify God and serve His people.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProjectHero;
