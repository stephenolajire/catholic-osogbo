import { useEffect } from "react";
import { X } from "lucide-react";

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
  onClose: () => void;
};

const CATEGORIES = [
  { value: "", label: "All Categories" },
  { value: "infrastructure", label: "🏛️ Infrastructure" },
  { value: "education", label: "📚 Education" },
  { value: "healthcare", label: "🏥 Healthcare" },
  { value: "evangelization", label: "✝️ Evangelization" },
  { value: "social_welfare", label: "🤝 Social Welfare" },
  { value: "youth", label: "🌱 Youth" },
];

const STATUSES = [
  { value: "", label: "All Status" },
  { value: "ongoing", label: "Ongoing" },
  { value: "completed", label: "Completed" },
  { value: "planned", label: "Planned" },
  { value: "on_hold", label: "On Hold" },
];

const ProjectFilterModal = ({
  search,
  category,
  status,
  deanery,
  deaneries,
  onSearch,
  onCategory,
  onStatus,
  onDeanery,
  onClose,
}: Props) => {
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

  const hasFilter = !!(search || category || status || deanery);

  const handleClear = () => {
    onSearch("");
    onCategory("");
    onStatus("");
    onDeanery("");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white rounded-t-3xl p-6 pb-8 space-y-5 animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-neutral-900 text-base">
            Filter Projects
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.value}
                onClick={() => onCategory(c.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  category === c.value
                    ? "bg-primary-600 text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            Status
          </label>
          <div className="flex flex-wrap gap-2">
            {STATUSES.map((s) => (
              <button
                key={s.value}
                onClick={() => onStatus(s.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  status === s.value
                    ? "bg-primary-600 text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Deanery */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            Deanery
          </label>
          <select
            value={deanery}
            onChange={(e) => onDeanery(e.target.value)}
            className="w-full py-2.5 px-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-sm text-neutral-700 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
          >
            <option value="">All Deaneries</option>
            {deaneries.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          {hasFilter && (
            <button
              onClick={handleClear}
              className="flex-1 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-600 font-medium hover:bg-neutral-50 transition-colors"
            >
              Clear All
            </button>
          )}
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectFilterModal;
