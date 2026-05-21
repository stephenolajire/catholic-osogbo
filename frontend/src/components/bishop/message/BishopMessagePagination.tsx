import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const BishopMessagePagination = ({ page, totalPages, onPageChange }: Props) => {
  // Build page numbers with ellipsis
  const getPages = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);
    if (page > 3) pages.push("...");
    for (
      let i = Math.max(2, page - 1);
      i <= Math.min(totalPages - 1, page + 1);
      i++
    ) {
      pages.push(i);
    }
    if (page < totalPages - 2) pages.push("...");
    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {/* Prev */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-full border border-neutral-200 text-neutral-600 hover:border-primary-400 hover:text-primary-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={15} />
        Prev
      </button>

      {/* Page numbers */}
      <div className="flex items-center gap-1.5">
        {getPages().map((p, i) =>
          p === "..." ? (
            <span
              key={`ellipsis-${i}`}
              className="w-9 h-9 flex items-center justify-center text-neutral-400 text-sm"
            >
              ···
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-9 h-9 rounded-full text-sm font-semibold transition-all duration-200
                ${
                  p === page
                    ? "bg-primary-600 text-white shadow-sm shadow-primary-900/20"
                    : "text-neutral-600 hover:bg-primary-50 hover:text-primary-600 border border-neutral-200 hover:border-primary-300"
                }`}
            >
              {p}
            </button>
          ),
        )}
      </div>

      {/* Next */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-full border border-neutral-200 text-neutral-600 hover:border-primary-400 hover:text-primary-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next
        <ChevronRight size={15} />
      </button>
    </div>
  );
};

export default BishopMessagePagination;
