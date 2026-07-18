import { useState, useEffect } from "react";
import { ImageIcon, Camera } from "lucide-react";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=1600&q=80";

type Props = {
  totalEvents: number;
  totalImages: number;
  heroImageUrl?: string | null;
};

const GalleryHero = ({ totalEvents, totalImages, heroImageUrl }: Props) => {
  const defaultImage =
    "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1600&q=80";
  const [imgSrc, setImgSrc] = useState(heroImageUrl || defaultImage);

  useEffect(() => {
    console.log("Gallery Hero - heroImageUrl:", heroImageUrl);
    if (heroImageUrl) {
      setImgSrc(heroImageUrl);
    }
  }, [heroImageUrl]);

  const handleImageError = () => {
    console.error("Failed to load image:", imgSrc);
    setImgSrc(FALLBACK_IMAGE);
  };

  return (
    <section className="relative overflow-hidden bg-stone-900">
      <div className="absolute inset-0">
        <img
          src={imgSrc}
          alt="Gallery Hero"
          className="h-full w-full object-cover opacity-60"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-linear-to-b from-stone-950/80 via-stone-950/70 to-stone-950/90" />
      </div>

      <div className="relative px-6 py-24 text-center md:px-16 lg:px-24 lg:py-28">
        <div className="mx-auto flex max-w-2xl flex-col items-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-stone-300">
            <ImageIcon size={13} className="text-stone-400" />
            Photo Memories
          </span>
          <h1 className="font-serif text-4xl font-bold text-white md:text-5xl">
            Event Gallery
          </h1>
          <p className="mt-4 text-lg font-light leading-relaxed text-stone-300">
            Browse through moments and memories from our diocesan events,
            celebrations, and community gatherings. Click on any event to view
            all the photos captured.
          </p>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-12 grid max-w-md grid-cols-2 gap-4">
          {[
            { value: totalEvents, label: "Events", Icon: Camera },
            { value: totalImages, label: "Photos", Icon: ImageIcon },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-5 backdrop-blur-sm"
            >
              <stat.Icon size={18} className="mx-auto mb-2 text-stone-400" />
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

export default GalleryHero;
