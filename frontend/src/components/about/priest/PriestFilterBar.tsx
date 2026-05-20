import { Search, SlidersHorizontal } from "lucide-react";

type Props = {
  search: string;
  deanery: string;
  deaneries: string[];
  onSearch: (v: string) => void;
  onDeanery: (v: string) => void;
  onOpenModal: () => void;
  resultCount: number;
};

const PriestFilterBar = ({
  search,
  deanery,
  deaneries,
  onSearch,
  onDeanery,
  onOpenModal,
  resultCount,
}: Props) => (
  <div className="bg-white border border-neutral-100 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
    {/* Search input */}
    <div className="relative flex-1">
      <Search
        size={15}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
      />
      <input
        type="text"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search by name or parish..."
        className="w-full pl-9 pr-4 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all placeholder:text-neutral-400 text-neutral-700"
      />
    </div>

    {/* Deanery filter */}
    <select
      value={deanery}
      onChange={(e) => onDeanery(e.target.value)}
      className="px-4 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all text-neutral-700 cursor-pointer"
    >
      <option value="">All Deaneries</option>
      {deaneries.map((d) => (
        <option key={d} value={d}>
          {d}
        </option>
      ))}
    </select>

    {/* Filter button */}
    <button
      onClick={onOpenModal}
      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-xl transition-colors duration-200 shrink-0"
    >
      <SlidersHorizontal size={15} />
      Filter
      {resultCount > 0 && (
        <span className="bg-white/20 text-white text-xs px-1.5 py-0.5 rounded-full">
          {resultCount}
        </span>
      )}
    </button>
  </div>
);

export default PriestFilterBar;
