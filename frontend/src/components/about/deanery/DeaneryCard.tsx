import { ChevronDown } from "lucide-react";
import DeaneryParishList from "./DeaneryParishList";
import type { Deanery } from "../../../services/about/deaneryService";

// One color accent per deanery index
const ACCENTS = [
  "from-primary-600 to-primary-500",
  "from-emerald-600 to-emerald-500",
  "from-teal-600    to-teal-500",
  "from-cyan-600    to-cyan-500",
  "from-primary-700 to-primary-600",
  "from-green-600   to-green-500",
  "from-emerald-700 to-teal-600",
  "from-teal-700    to-cyan-600",
];

const BORDER_ACCENTS = [
  "border-primary-600/40",
  "border-emerald-600/40",
  "border-teal-600/40",
  "border-cyan-600/40",
  "border-primary-700/40",
  "border-green-600/40",
  "border-emerald-700/40",
  "border-teal-700/40",
];

const TEXT_ACCENTS = [
  "text-primary-400",
  "text-emerald-400",
  "text-teal-400",
  "text-cyan-400",
  "text-primary-300",
  "text-green-400",
  "text-emerald-300",
  "text-teal-300",
];

type Props = {
  deanery: Deanery;
  index: number;
  isActive: boolean;
  onToggle: () => void;
};

const DeaneryCard = ({ deanery, index, isActive, onToggle }: Props) => {
  const accent = ACCENTS[index % ACCENTS.length];
  const borderAccent = BORDER_ACCENTS[index % BORDER_ACCENTS.length];
  const textAccent = TEXT_ACCENTS[index % TEXT_ACCENTS.length];

  return (
    <div
      className={`group bg-neutral-900 rounded-2xl overflow-hidden border transition-all duration-300
        ${isActive ? `${borderAccent} shadow-lg shadow-black/30` : "border-neutral-800 hover:border-neutral-700"}`}
    >
      {/* Top gradient bar */}
      <div className={`h-1 w-full bg-linear-to-r ${accent}`} />

      {/* Card header — clickable toggle */}
      <button
        onClick={onToggle}
        className="w-full text-left px-5 pt-5 pb-4 flex items-start justify-between gap-3 focus:outline-none"
      >
        <div>
          {/* Index badge */}
          <span
            className={`text-[10px] font-bold uppercase tracking-widest ${textAccent} mb-2 block`}
          >
            Deanery {String(index + 1).padStart(2, "0")}
          </span>

          {/* Name */}
          <h3 className="text-white font-bold text-base leading-snug">
            {deanery.name}
          </h3>

          {/* Parish count */}
          <p className="text-neutral-500 text-xs mt-1">
            {deanery.parishes.length} parish
            {deanery.parishes.length !== 1 ? "es" : ""}
          </p>
        </div>

        {/* Chevron */}
        <div
          className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300 mt-1
            ${
              isActive
                ? `bg-linear-to-br ${accent} border-transparent`
                : "bg-neutral-800 border-neutral-700 group-hover:border-neutral-600"
            }`}
        >
          <ChevronDown
            size={14}
            className={`text-white transition-transform duration-300 ${isActive ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {/* Collapsed preview — shows first 3 parishes */}
      {!isActive && (
        <div className="px-5 pb-5">
          <div className="space-y-1.5">
            {deanery.parishes.slice(0, 3).map((p) => (
              <div key={p.id} className="flex items-center gap-2">
                <span
                  className={`w-1 h-1 rounded-full bg-current ${textAccent} shrink-0`}
                />
                <span className="text-neutral-500 text-xs truncate">
                  {p.name}
                </span>
              </div>
            ))}
            {deanery.parishes.length > 3 && (
              <p className={`text-xs font-medium ${textAccent} pl-3 pt-0.5`}>
                +{deanery.parishes.length - 3} more...
              </p>
            )}
          </div>
        </div>
      )}

      {/* Expanded full parish list */}
      <div
        className={`overflow-hidden transition-all duration-400 ease-in-out
          ${isActive ? "max-h-150 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className={`mx-5 mb-5 border-t ${borderAccent} pt-1`}>
          <DeaneryParishList parishes={deanery.parishes} />
        </div>
      </div>
    </div>
  );
};

export default DeaneryCard;
