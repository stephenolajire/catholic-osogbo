import { MapPin, Phone, Mail, User, Clock } from "lucide-react";
import type { Parish } from "../../../services/about/parishService";

type Props = {
  parish: Parish;
  index: number;
  onClick: (parish: Parish) => void;
};

const statusConfig: Record<
  Parish["status"],
  { label: string; color: string; dot: string }
> = {
  active: {
    label: "Active",
    color: "text-success",
    dot: "bg-success",
  },
  mission: {
    label: "Mission",
    color: "text-info",
    dot: "bg-info",
  },
  merged: {
    label: "Merged",
    color: "text-neutral-400",
    dot: "bg-neutral-400",
  },
  closed: {
    label: "Closed",
    color: "text-error",
    dot: "bg-error",
  },
};

const ParishCard = ({ parish, index, onClick }: Props) => {
  const cfg = statusConfig[parish.status];

  return (
    <div
      onClick={() => onClick(parish)}
      className="group relative flex gap-0 bg-white border border-neutral-100 rounded-2xl overflow-hidden cursor-pointer hover:border-warning/40 hover:shadow-lg transition-all duration-300"
      style={{ boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.04)" }}
    >
      {/* Left gold accent bar */}
      <div
        className="w-1 shrink-0 transition-all duration-300 group-hover:w-1.5"
        style={{
          background: parish.isCathedral
            ? "var(--color-warning)"
            : "var(--color-neutral-200)",
        }}
      />

      {/* Image — square left panel */}
      <div className="relative w-28 sm:w-36 md:w-44 shrink-0 overflow-hidden bg-neutral-100">
        <img
          src={parish.imageUrl}
          alt={parish.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1548625149-720754963a89?w=600&q=80";
          }}
        />
        {/* Index overlay */}
        <div className="absolute bottom-2 left-2">
          <span
            className="text-white/60 font-bold leading-none select-none"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontFamily: "var(--font-display)",
            }}
          >
            {String(index).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-4 sm:px-5 sm:py-4 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="min-w-0">
            {parish.isCathedral && (
              <span
                className="inline-block text-[9px] font-bold uppercase tracking-widest mb-1"
                style={{ color: "var(--color-warning)" }}
              >
                ★ Cathedral
              </span>
            )}
            <h3 className="font-bold text-neutral-900 text-sm sm:text-base leading-snug group-hover:text-neutral-700 transition-colors line-clamp-2">
              {parish.name}
            </h3>
          </div>

          {/* Status pill */}
          <span
            className={`shrink-0 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider ${cfg.color}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
            {cfg.label}
          </span>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
          <span className="flex items-center gap-1 text-neutral-500 text-xs">
            <MapPin
              size={10}
              className="shrink-0"
              style={{ color: "var(--color-warning)" }}
            />
            {parish.city}
          </span>
          <span className="flex items-center gap-1 text-neutral-500 text-xs">
            <User size={10} className="shrink-0 text-neutral-400" />
            {parish.priestInCharge}
          </span>
          <span className="flex items-center gap-1 text-neutral-400 text-xs">
            <Clock size={10} className="shrink-0" />
            Est. {parish.established}
          </span>
        </div>

        {/* Mass schedule — secondary row */}
        <p className="text-neutral-400 text-xs mt-2 line-clamp-1 hidden sm:block">
          {parish.massSchedule}
        </p>

        {/* Bottom row: deanery + contact */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-neutral-50">
          <span
            className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
            style={{
              background: "var(--color-primary-50)",
              color: "var(--color-primary-700)",
            }}
          >
            {parish.deanery}
          </span>
          <div className="flex gap-2">
            {parish.phone && (
              <Phone
                size={12}
                className="text-neutral-300 group-hover:text-neutral-400 transition-colors"
              />
            )}
            {parish.email && (
              <Mail
                size={12}
                className="text-neutral-300 group-hover:text-neutral-400 transition-colors"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParishCard;
