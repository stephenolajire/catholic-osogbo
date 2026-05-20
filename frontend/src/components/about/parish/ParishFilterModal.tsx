import { useEffect } from "react";
import { X } from "lucide-react";
import type { ParishStatus } from "../../../services/about/parishService";

type Props = {
  search: string;
  deanery: string;
  status: string;
  deaneries: string[];
  onSearch: (v: string) => void;
  onDeanery: (v: string) => void;
  onStatus: (v: string) => void;
  onClose: () => void;
};

const STATUSES: { value: "" | ParishStatus; label: string }[] = [
  { value: "", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "mission", label: "Mission" },
  { value: "merged", label: "Merged" },
  { value: "closed", label: "Closed" },
];

const ParishFilterModal = ({
  search,
  deanery,
  status,
  deaneries,
  onSearch,
  onDeanery,
  onStatus,
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

  const hasFilter = !!(search || deanery || status);

  const handleClear = () => {
    onSearch("");
    onDeanery("");
    onStatus("");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-neutral-950/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white rounded-t-3xl p-6 pb-8 space-y-5 animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-neutral-900 text-base">
            Filter Parishes
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

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
                    ? "text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
                style={
                  status === s.value
                    ? { background: "var(--color-warning)" }
                    : undefined
                }
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            Deanery
          </label>
          <select
            value={deanery}
            onChange={(e) => onDeanery(e.target.value)}
            className="w-full py-2.5 px-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-sm text-neutral-700 focus:outline-none transition-all"
            onFocus={(e) => {
              e.target.style.borderColor = "var(--color-warning)";
              e.target.style.boxShadow = "0 0 0 3px rgb(217 119 6 / 0.12)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "";
              e.target.style.boxShadow = "";
            }}
          >
            <option value="">All Deaneries</option>
            {deaneries.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

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
            className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold transition-colors"
            style={{ background: "var(--color-warning)" }}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParishFilterModal;
