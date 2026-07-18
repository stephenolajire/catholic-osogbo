import { Building2 } from "lucide-react";

type Props = {
  title: string;
  description: string;
  totalInstitutions: number;
  heroImageUrl?: string;
};

const InstitutionHero = ({
  title,
  description,
  totalInstitutions,
  heroImageUrl,
}: Props) => (
  <section
    className="relative overflow-hidden border-b border-amber-900/20"
    style={
      heroImageUrl
        ? {
            backgroundImage: `url(${heroImageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }
        : {}
    }
  >
    {/* Dark Overlay when hero image is present */}
    {heroImageUrl && <div className="absolute inset-0 bg-black/40" />}

    {/* Default Gradient when no hero image */}
    {!heroImageUrl && (
      <div className="absolute inset-0 bg-linear-to-br from-amber-950 via-orange-900 to-yellow-900" />
    )}
    {/* Decorative Cross Pattern */}
    <svg
      className="absolute inset-0 opacity-5 w-full h-full"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <pattern
        id="crossPattern"
        x="0"
        y="0"
        width="20"
        height="20"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M 10 2 L 10 18 M 2 10 L 18 10"
          stroke="white"
          strokeWidth="0.8"
          fill="none"
        />
      </pattern>
      <rect width="100" height="100" fill="url(#crossPattern)" />
    </svg>

    {/* Gradient Orbs */}
    <div className="absolute -top-40 -left-40 w-80 h-80 bg-amber-200 rounded-full blur-3xl opacity-10" />
    <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-orange-200 rounded-full blur-3xl opacity-10" />

    <div className="relative px-6 md:px-16 lg:px-24 py-16 lg:py-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_250px] gap-12 items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-white/10 backdrop-blur-sm px-4 py-2 text-xs font-bold uppercase tracking-widest text-amber-100 mb-6">
              <Building2 size={14} className="text-amber-200" />
              Institutions
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold leading-tight text-white mb-6">
              {title}
            </h1>
            <p className="text-white text-lg leading-relaxed max-w-2xl">
              {description}
            </p>
          </div>

          <div className="bg-linear-to-br from-amber-100 to-yellow-100 text-amber-950 rounded-2xl p-6 border border-amber-200/50 shadow-xl">
            <p className="text-4xl font-serif font-bold">{totalInstitutions}</p>
            <p className="mt-2 text-xs uppercase tracking-wider text-amber-800 font-semibold">
              Institutions
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default InstitutionHero;
