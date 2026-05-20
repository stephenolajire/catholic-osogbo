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
  <div className="bg-white border border-neutral-900/10 rounded-3xl p-4 shadow-sm">
    <div className="flex flex-col md:flex-row gap-3">
      <div className="relative flex-1">
        <Search
          size={15}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
        />
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search associations, chaplains, officers..."
          className="w-full pl-9 pr-9 py-2.5 rounded-2xl bg-[#fbfaf7] border border-neutral-200 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none transition-all"
          onFocus={(e) => {
            e.target.style.borderColor = "#8f3f24";
            e.target.style.boxShadow = "0 0 0 3px rgb(143 63 36 / 0.12)";
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
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <select
        value={category}
        onChange={(e) => onCategory(e.target.value)}
        className="py-2.5 px-3.5 rounded-2xl bg-[#fbfaf7] border border-neutral-200 text-sm text-neutral-700 focus:outline-none cursor-pointer"
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
