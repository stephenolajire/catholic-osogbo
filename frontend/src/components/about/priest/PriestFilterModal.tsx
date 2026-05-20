import { X, MapPin, Calendar, Search } from "lucide-react";
import type { Priest } from "../../../services/about/priestService";

type Props = {
  priests: Priest[];
  search: string;
  deanery: string;
  onClose: () => void;
};

const PriestFilterModal = ({ priests, search, deanery, onClose }: Props) => {
  const label = [search && `"${search}"`, deanery && deanery]
    .filter(Boolean)
    .join(" · ");

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative bg-white w-full sm:max-w-3xl rounded-t-3xl sm:rounded-3xl max-h-[88vh] overflow-hidden flex flex-col shadow-2xl z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100 shrink-0">
          <div>
            <h3 className="text-lg font-bold text-neutral-900">
              Filter Results
            </h3>
            <p className="text-neutral-400 text-xs mt-0.5">
              {priests.length} priest{priests.length !== 1 ? "s" : ""} found
              {label && (
                <span className="text-primary-600 font-medium"> · {label}</span>
              )}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Results */}
        <div className="overflow-y-auto flex-1 p-5">
          {priests.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Search size={32} className="text-neutral-300 mb-3" />
              <p className="text-neutral-600 font-semibold mb-1">
                No results found
              </p>
              <p className="text-neutral-400 text-sm">
                Try a different name, parish, or deanery
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {priests.map((priest) => (
                <div
                  key={priest.id}
                  className="flex items-center gap-4 p-4 bg-neutral-50 hover:bg-primary-50 border border-neutral-100 hover:border-primary-200 rounded-2xl transition-all duration-200 group"
                >
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-neutral-200">
                    <img
                      src={priest.imageUrl}
                      alt={priest.name}
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80";
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-neutral-900 text-sm group-hover:text-primary-700 transition-colors truncate">
                      {priest.name}
                    </p>
                    <p className="text-[10px] font-semibold text-primary-600 bg-primary-100 group-hover:bg-primary-200 px-2 py-0.5 rounded-full inline-block mt-0.5 transition-colors">
                      {priest.roleLabel}
                    </p>
                    <div className="flex items-center gap-1 mt-1.5 text-neutral-400 text-xs">
                      <MapPin
                        size={10}
                        className="shrink-0 text-primary-400"
                      />
                      <span className="truncate">{priest.parish}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5 text-neutral-400 text-xs">
                      <Calendar size={10} className="shrink-0" />
                      <span>Ordained {priest.ordainedYear}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 px-6 py-4 border-t border-neutral-100 bg-white">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-full bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriestFilterModal;
