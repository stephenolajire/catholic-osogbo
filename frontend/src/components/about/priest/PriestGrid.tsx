import { useState, useEffect, useCallback } from "react";
import { X, MapPin, Calendar } from "lucide-react";
import PriestCard from "./PriestCard";
import type { Priest } from "../../../services/about/priestService";

type Props = {
  priests: Priest[];
  isLoading: boolean;
};

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden border border-neutral-100 animate-pulse">
    <div className="h-56 bg-neutral-200" />
    <div className="p-4 space-y-2.5">
      <div className="h-3.5 bg-neutral-200 rounded-full w-3/4" />
      <div className="h-3 bg-neutral-100 rounded-full w-full" />
      <div className="h-3 bg-neutral-100 rounded-full w-1/2" />
      <div className="pt-2">
        <div className="h-5 bg-neutral-100 rounded-full w-24" />
      </div>
    </div>
  </div>
);

const PriestModal = ({
  priest,
  onClose,
}: {
  priest: Priest;
  onClose: () => void;
}) => {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    // Prevent background scroll while modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-lg animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors backdrop-blur-sm"
          aria-label="Close modal"
        >
          <X size={16} />
        </button>

        {/* Role badge */}
        <span className="absolute top-3 left-3 z-10 bg-primary-600/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
          {priest.roleLabel}
        </span>

        {/* Full image */}
        <div className="relative bg-neutral-100 overflow-hidden">
          <img
            src={priest.imageUrl}
            alt={priest.name}
            className="w-full max-h-[70vh] object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80";
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent pointer-events-none" />
        </div>

        {/* Details */}
        <div className="p-6">
          <h2 className="font-bold text-neutral-900 text-xl leading-snug mb-3">
            {priest.name}
          </h2>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-neutral-600 text-sm">
              <MapPin size={14} className="shrink-0 text-primary-400" />
              <span>{priest.parish}</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-500 text-sm">
              <Calendar size={14} className="shrink-0" />
              <span>Ordained {priest.ordainedYear}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-100">
            <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-3 py-1.5 rounded-full">
              {priest.deanery}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const PriestGrid = ({ priests, isLoading }: Props) => {
  const [selectedPriest, setSelectedPriest] = useState<Priest | null>(null);

  const handleClose = useCallback(() => setSelectedPriest(null), []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
        {[...Array(10)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!priests.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-2xl">🔍</span>
        </div>
        <p className="text-neutral-700 font-semibold text-base mb-1">
          No priests found
        </p>
        <p className="text-neutral-400 text-sm">
          Try adjusting your search or filter
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
        {priests.map((priest) => (
          <PriestCard
            key={priest.id}
            priest={priest}
            onClick={setSelectedPriest}
          />
        ))}
      </div>

      {selectedPriest && (
        <PriestModal priest={selectedPriest} onClose={handleClose} />
      )}
    </>
  );
};

export default PriestGrid;
