import { Search, X } from "lucide-react";
import type { LayAssociation } from "../../../services/about/layFaithfulService";

type Props = {
  search: string;
  category: string;
  categories: LayAssociation["categoryLabel"][];
  onSearch: (v: string) => void;
  onCategory: (v: string) => void;
};

const LayFaithfulFilterBar = ({
  search,
  category,
  categories,
  onSearch,
  onCategory,
}: Props) => (
  <div className="bg-white/95 backdrop-blur-sm border border-amber-200/30 rounded-2xl p-5 shadow-lg">
    <div className="flex flex-col md:flex-row gap-3">
      <div className="relative flex-1">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-600/60"
        />
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search associations, chaplains, officers..."
          className="w-full pl-11 pr-10 py-3 rounded-xl bg-amber-50/50 border border-amber-200/50 text-sm text-amber-950 placeholder:text-amber-400/60 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition-all"
        />
        {search && (
          <button
            onClick={() => onSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400 hover:text-amber-600 transition-colors"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <select
        value={category}
        onChange={(e) => onCategory(e.target.value)}
        className="py-3 px-4 rounded-xl bg-amber-50/50 border border-amber-200/50 text-sm text-amber-950 font-medium focus:outline-none focus:ring-2 focus:ring-amber-300 cursor-pointer transition-all"
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default LayFaithfulFilterBar;
