import { ChevronDown, Church } from "lucide-react";
import DeaneryParishList from "./DeaneryParishList";
import type { Deanery } from "../../../services/about/deaneryService";

// One muted color accent per deanery index - soft, understated tones
const ACCENTS = [
  "from-amber-500/80 to-amber-400/80",
  "from-amber-600/80 to-amber-500/80",
  "from-orange-500/80 to-orange-400/80",
  "from-amber-500/80 to-orange-400/80",
  "from-yellow-600/80 to-amber-500/80",
  "from-orange-600/80 to-amber-500/80",
  "from-amber-600/80 to-orange-500/80",
  "from-yellow-500/80 to-orange-400/80",
];

const BG_ACCENTS = [
  "from-stone-50 to-amber-50/40",
  "from-amber-50/40 to-stone-50",
  "from-stone-50 to-yellow-50/30",
  "from-amber-50/30 to-stone-50",
  "from-stone-50 to-orange-50/30",
  "from-yellow-50/30 to-stone-50",
  "from-stone-50 to-amber-50/40",
  "from-orange-50/30 to-stone-50",
];

const TEXT_ACCENTS = [
  "text-amber-700/90",
  "text-amber-800/90",
  "text-orange-700/90",
  "text-amber-700/90",
  "text-yellow-800/90",
  "text-orange-800/90",
  "text-amber-800/90",
  "text-yellow-700/90",
];

type Props = {
  deanery: Deanery;
  index: number;
  isActive: boolean;
  onToggle: () => void;
};

const DeaneryCard = ({ deanery, index, isActive, onToggle }: Props) => {
  const accent = ACCENTS[index % ACCENTS.length];
  const bgAccent = BG_ACCENTS[index % BG_ACCENTS.length];
  const textAccent = TEXT_ACCENTS[index % TEXT_ACCENTS.length];

  return (
    <div
      className={`group bg-gradient-to-br ${bgAccent} rounded-xl overflow-hidden border transition-all duration-300
        ${
          isActive
            ? "bg-white shadow-sm border-amber-200"
            : "border-stone-200 hover:border-amber-200/70 shadow-sm hover:shadow-md"
        }`}
    >
      {/* Decorative top accent line */}
      <div className={`h-[3px] w-full bg-gradient-to-r ${accent} opacity-70`} />

      {/* Card header — clickable toggle */}
      <button
        onClick={onToggle}
        className="w-full text-left px-6 py-6 flex items-start justify-between gap-4 focus:outline-none hover:bg-stone-50/60 transition-colors"
      >
        <div className="flex-1">
          {/* Index with church icon */}
          <div className="flex items-center gap-2 mb-3">
            <Church size={15} className={`${textAccent} opacity-80`} />
            <span
              className={`text-xs font-semibold uppercase tracking-widest ${textAccent} opacity-80 font-serif`}
            >
              Deanery {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Name */}
          <h3 className="text-xl font-serif font-semibold text-stone-800 leading-tight mb-2">
            {deanery.name}
          </h3>

          {/* Parish count with emphasis */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100/70 border border-stone-200">
            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
            <span className="text-sm font-medium text-stone-600">
              {deanery.parishes.length} parish
              {deanery.parishes.length !== 1 ? "es" : ""}
            </span>
          </div>
        </div>

        {/* Chevron Icon */}
        <div
          className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 flex-none
            ${
              isActive
                ? `bg-gradient-to-br ${accent} text-white shadow-sm`
                : `bg-stone-100 ${textAccent} opacity-80 group-hover:bg-stone-200/70`
            }`}
        >
          <ChevronDown
            size={17}
            className={`transition-transform duration-300 ${isActive ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {/* Collapsed preview — shows first 3 parishes */}
      {!isActive && (
        <div className="px-6 pb-6 pt-2">
          <div className="space-y-2">
            {deanery.parishes.slice(0, 3).map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <div
                  className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${accent} flex-shrink-0 opacity-70`}
                />
                <span className="text-stone-500 text-sm truncate font-medium">
                  {p.name}
                </span>
              </div>
            ))}
            {deanery.parishes.length > 3 && (
              <div className="pt-2">
                <p
                  className={`text-sm font-medium ${textAccent} opacity-80 pl-5`}
                >
                  +{deanery.parishes.length - 3} more parishes...
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Expanded full parish list */}
      <div
        className={`overflow-hidden transition-all duration-400 ease-in-out
          ${isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="border-t border-stone-200 mx-0">
          <div className="px-6 py-6 bg-white/60">
            <DeaneryParishList parishes={deanery.parishes} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeaneryCard;
