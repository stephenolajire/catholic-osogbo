import { Search, SlidersHorizontal, X } from "lucide-react";
import type { CSSProperties } from "react";

type Props = {
  search: string;
  deanery: string;
  status: string;
  deaneries: string[];
  onSearch: (v: string) => void;
  onDeanery: (v: string) => void;
  onStatus: (v: string) => void;
  onOpenModal: () => void;
  resultCount: number;
};

const STATUSES = [
  { value: "", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "mission", label: "Mission" },
  { value: "merged", label: "Merged" },
  { value: "closed", label: "Closed" },
];

const ParishFilterBar = ({
  search,
  deanery,
  status,
  deaneries,
  onSearch,
  onDeanery,
  onStatus,
  onOpenModal,
  resultCount,
}: Props) => {
  const hasFilter = !!(search || deanery || status);

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search parishes or priests…"
            className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-white border border-neutral-200 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none transition-all"
            style={
              {
                // gold focus ring matching the editorial theme
              } as CSSProperties
            }
            onFocus={(e) => {
              e.target.style.borderColor = "var(--color-warning)";
              e.target.style.boxShadow = "0 0 0 3px rgb(217 119 6 / 0.12)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "";
              e.target.style.boxShadow = "";
            }}
          />
          {search && (
            <button
              onClick={() => onSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Deanery */}
        <select
          value={deanery}
          onChange={(e) => onDeanery(e.target.value)}
          className="hidden sm:block py-2.5 px-3.5 rounded-xl bg-white border border-neutral-200 text-sm text-neutral-700 focus:outline-none cursor-pointer"
        >
          <option value="">All Deaneries</option>
          {deaneries.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        {/* Status */}
        <select
          value={status}
          onChange={(e) => onStatus(e.target.value)}
          className="hidden sm:block py-2.5 px-3.5 rounded-xl bg-white border border-neutral-200 text-sm text-neutral-700 focus:outline-none cursor-pointer"
        >
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>

        {/* Mobile filter button */}
        <button
          onClick={onOpenModal}
          className="sm:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-neutral-200 text-sm text-neutral-700 hover:border-warning/50 transition-colors"
        >
          <SlidersHorizontal size={14} />
          <span>Filter</span>
          {hasFilter && (
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--color-warning)" }}
            />
          )}
        </button>
      </div>

      {hasFilter && resultCount > 0 && (
        <p className="text-xs text-neutral-400">
          Showing{" "}
          <span
            className="font-semibold"
            style={{ color: "var(--color-warning)" }}
          >
            {resultCount}
          </span>{" "}
          parish{resultCount !== 1 ? "es" : ""}
        </p>
      )}
    </div>
  );
};

export default ParishFilterBar;
