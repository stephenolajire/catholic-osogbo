import { Search, SlidersHorizontal, X } from "lucide-react";

type Props = {
  search: string;
  category: string;
  status: string;
  deanery: string;
  deaneries: string[];
  onSearch: (v: string) => void;
  onCategory: (v: string) => void;
  onStatus: (v: string) => void;
  onDeanery: (v: string) => void;
  onOpenModal: () => void;
  resultCount: number;
};

const CATEGORIES = [
  { value: "", label: "All Categories" },
  { value: "infrastructure", label: "Infrastructure" },
  { value: "education", label: "Education" },
  { value: "healthcare", label: "Healthcare" },
  { value: "evangelization", label: "Evangelization" },
  { value: "social_welfare", label: "Social Welfare" },
  { value: "youth", label: "Youth" },
];

const STATUSES = [
  { value: "", label: "All Status" },
  { value: "ongoing", label: "Ongoing" },
  { value: "completed", label: "Completed" },
  { value: "planned", label: "Planned" },
  { value: "on_hold", label: "On Hold" },
];

const ProjectFilterBar = ({
  search,
  category,
  status,
  deanery,
  deaneries,
  onSearch,
  onCategory,
  onStatus,
  onDeanery,
  onOpenModal,
  resultCount,
}: Props) => {
  const hasFilter = !!(search || category || status || deanery);

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search projects or parishes…"
            className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-white border border-neutral-200 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
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

        {/* Category select — hidden on mobile, shown via modal */}
        <select
          value={category}
          onChange={(e) => onCategory(e.target.value)}
          className="hidden sm:block py-2.5 px-3.5 rounded-xl bg-white border border-neutral-200 text-sm text-neutral-700 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all cursor-pointer"
        >
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>

        {/* Status select */}
        <select
          value={status}
          onChange={(e) => onStatus(e.target.value)}
          className="hidden sm:block py-2.5 px-3.5 rounded-xl bg-white border border-neutral-200 text-sm text-neutral-700 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all cursor-pointer"
        >
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>

        {/* Deanery select */}
        <select
          value={deanery}
          onChange={(e) => onDeanery(e.target.value)}
          className="hidden sm:block py-2.5 px-3.5 rounded-xl bg-white border border-neutral-200 text-sm text-neutral-700 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all cursor-pointer"
        >
          <option value="">All Deaneries</option>
          {deaneries.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        {/* Filter button (mobile only) */}
        <button
          onClick={onOpenModal}
          className="sm:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-neutral-200 text-sm text-neutral-700 hover:border-primary-300 transition-colors"
        >
          <SlidersHorizontal size={15} />
          <span>Filter</span>
          {hasFilter && (
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
          )}
        </button>
      </div>

      {/* Result count */}
      {hasFilter && resultCount > 0 && (
        <p className="text-xs text-neutral-400">
          Showing{" "}
          <span className="text-primary-600 font-semibold">{resultCount}</span>{" "}
          project{resultCount !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
};

export default ProjectFilterBar;
