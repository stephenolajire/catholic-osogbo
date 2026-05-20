import type { Priest } from "../../../services/about/priestService";
import { MapPin, Calendar } from "lucide-react";

type Props = {
  priest: Priest;
  onClick: (priest: Priest) => void;
};

const PriestCard = ({ priest, onClick }: Props) => (
  <div
    className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-lg hover:shadow-neutral-900/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    onClick={() => onClick(priest)}
  >
    {/* Image */}
    <div className="relative h-56 overflow-hidden bg-neutral-100">
      <img
        src={priest.imageUrl}
        alt={priest.name}
        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80";
        }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
      <span className="absolute top-3 left-3 bg-primary-600/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
        {priest.roleLabel}
      </span>
    </div>

    {/* Info */}
    <div className="p-4">
      <h3 className="font-bold text-neutral-900 text-sm leading-snug mb-1 group-hover:text-primary-600 transition-colors line-clamp-1">
        {priest.name}
      </h3>
      <div className="flex items-center gap-1.5 text-neutral-500 text-xs mb-1">
        <MapPin size={11} className="shrink-0 text-primary-400" />
        <span className="line-clamp-1">{priest.parish}</span>
      </div>
      <div className="flex items-center gap-1.5 text-neutral-400 text-xs">
        <Calendar size={11} className="shrink-0" />
        <span>Ordained {priest.ordainedYear}</span>
      </div>
      <div className="mt-3 pt-3 border-t border-neutral-50">
        <span className="text-[10px] font-semibold text-primary-600 bg-primary-50 px-2.5 py-1 rounded-full">
          {priest.deanery}
        </span>
      </div>
    </div>
  </div>
);

export default PriestCard;
