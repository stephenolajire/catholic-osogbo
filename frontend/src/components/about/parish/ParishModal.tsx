import { useEffect } from "react";
import { X, MapPin, Phone, Mail, User, Clock, Users, Star } from "lucide-react";
import type { Parish } from "../../../services/about/parishService";

type Props = {
  parish: Parish;
  onClose: () => void;
};

const statusConfig: Record<
  Parish["status"],
  { label: string; color: string; bg: string }
> = {
  active: { label: "Active", color: "text-success", bg: "bg-success/10" },
  mission: { label: "Mission Station", color: "text-info", bg: "bg-info/10" },
  merged: { label: "Merged", color: "text-neutral-500", bg: "bg-neutral-100" },
  closed: { label: "Closed", color: "text-error", bg: "bg-error/10" },
};

const ParishModal = ({ parish, onClose }: Props) => {
  const cfg = statusConfig[parish.status];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 bg-neutral-900/50 hover:bg-neutral-900/70 text-white rounded-full p-1.5 transition-colors backdrop-blur-sm"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        {/* Hero image */}
        <div className="relative h-52 bg-neutral-200 overflow-hidden">
          <img
            src={parish.imageUrl}
            alt={parish.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1548625149-720754963a89?w=800&q=80";
            }}
          />
          {/* Dark scrim */}
          <div className="absolute inset-0 bg-linear-to-t from-neutral-950/60 via-neutral-950/20 to-transparent" />

          {/* Gold accent bar bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1"
            style={{
              background: parish.isCathedral
                ? "var(--color-warning)"
                : "transparent",
            }}
          />

          {/* Cathedral badge */}
          {parish.isCathedral && (
            <div className="absolute bottom-4 left-5 flex items-center gap-1.5">
              <Star
                size={11}
                fill="currentColor"
                style={{ color: "var(--color-warning)" }}
              />
              <span
                className="text-[10px] font-bold uppercase tracking-[0.2em]"
                style={{ color: "var(--color-warning)" }}
              >
                Cathedral
              </span>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Name + status */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <h2 className="font-bold text-neutral-900 text-xl leading-snug">
              {parish.name}
            </h2>
            <span
              className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.color} ${cfg.bg}`}
            >
              {cfg.label}
            </span>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { icon: MapPin, label: "Location", value: parish.address },
              {
                icon: User,
                label: "Priest in Charge",
                value: parish.priestInCharge,
              },
              {
                icon: Clock,
                label: "Established",
                value: String(parish.established),
              },
              ...(parish.parishioners
                ? [
                    {
                      icon: Users,
                      label: "Parishioners",
                      value: parish.parishioners.toLocaleString(),
                    },
                  ]
                : []),
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-neutral-50 rounded-xl p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon size={11} className="text-neutral-400" />
                  <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                    {label}
                  </span>
                </div>
                <p className="text-neutral-800 text-sm font-medium leading-snug">
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Mass schedule */}
          <div className="mb-5 p-3 rounded-xl border border-neutral-100">
            <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
              Mass Schedule
            </p>
            <p className="text-neutral-700 text-sm leading-relaxed">
              {parish.massSchedule}
            </p>
          </div>

          {/* Contact row */}
          {(parish.phone || parish.email) && (
            <div className="flex flex-wrap gap-3 mb-5">
              {parish.phone && (
                <a
                  href={`tel:${parish.phone}`}
                  className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  <Phone size={13} style={{ color: "var(--color-warning)" }} />
                  {parish.phone}
                </a>
              )}
              {parish.email && (
                <a
                  href={`mailto:${parish.email}`}
                  className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  <Mail size={13} style={{ color: "var(--color-warning)" }} />
                  {parish.email}
                </a>
              )}
            </div>
          )}

          {/* Deanery footer */}
          <div className="pt-4 border-t border-neutral-100">
            <span
              className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full"
              style={{
                background: "var(--color-primary-50)",
                color: "var(--color-primary-700)",
              }}
            >
              {parish.deanery}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParishModal;
