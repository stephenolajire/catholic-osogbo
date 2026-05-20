import type { Priest } from "../../../services/about/priestService";

type Props = {
  priest: Priest;
  variant: "bishop" | "vicar";
};

const BishopVicarCard = ({ priest, variant }: Props) => {
  const isBishop = variant === "bishop";

  return (
    <div
      className={`relative rounded-3xl overflow-hidden shadow-xl flex flex-col md:flex-row items-center gap-0
        ${
          isBishop
            ? "bg-primary-900 text-white"
            : "bg-white border border-neutral-100 text-neutral-900"
        }`}
    >
      {/* Image */}
      <div className="w-full md:w-64 lg:w-72 h-64 md:h-auto shrink-0">
        <img
          src={priest.imageUrl}
          alt={priest.name}
          className="w-full h-full object-cover object-top"
          style={{ minHeight: "280px" }}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80";
          }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 p-8 md:p-10">
        {/* Role badge */}
        <span
          className={`inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4
            ${
              isBishop
                ? "bg-primary-700 text-primary-200"
                : "bg-primary-50 text-primary-600"
            }`}
        >
          {priest.roleLabel}
        </span>

        <h2
          className={`text-2xl md:text-3xl font-bold mb-1 ${isBishop ? "text-white" : "text-neutral-900"}`}
        >
          {priest.name}
        </h2>

        <p
          className={`text-sm font-medium mb-1 ${isBishop ? "text-primary-300" : "text-primary-600"}`}
        >
          {priest.parish}
        </p>

        <p
          className={`text-xs mb-6 ${isBishop ? "text-primary-400" : "text-neutral-400"}`}
        >
          Ordained {priest.ordainedYear} · {priest.deanery}
        </p>

        {/* Divider */}
        <div
          className={`w-12 h-0.5 mb-6 ${isBishop ? "bg-primary-600" : "bg-primary-200"}`}
        />

        <p
          className={`text-sm leading-relaxed line-clamp-4 ${isBishop ? "text-primary-200" : "text-neutral-500"}`}
        >
          {priest.bio}
        </p>
      </div>

      {/* Decorative corner accent */}
      {isBishop && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-700/30 rounded-bl-full pointer-events-none" />
      )}
    </div>
  );
};

export default BishopVicarCard;
