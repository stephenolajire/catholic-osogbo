import { X, Calendar, Tag } from "lucide-react";
import type { BishopMessage } from "../../../services/bishop/bishopMessageService";

type Props = {
  message: BishopMessage;
  categoryColor: string;
  onClose: () => void;
};

const BishopMessageModal = ({ message, categoryColor, onClose }: Props) => {
  const paragraphs = message.fullMessage.split("\n\n").filter(Boolean);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative bg-white w-full sm:max-w-2xl lg:max-w-3xl rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col shadow-2xl z-10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero image — fixed height, does not scroll */}
        <div className="relative h-56 hrink-0">
          <img
            src={message.imageUrl}
            alt={message.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
          >
            <X size={18} />
          </button>

          {/* Meta overlay */}
          <div className="absolute bottom-4 left-5 right-12 flex items-center gap-2 flex-wrap">
            <span
              className={`${categoryColor} text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full`}
            >
              {message.category}
            </span>
            <span className="text-white/70 text-xs flex items-center gap-1">
              <Calendar size={10} />
              {message.date}
            </span>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div className="overflow-y-auto flex-1 overscroll-contain">
          <div className="px-6 pt-6 pb-2">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 leading-tight">
              {message.title}
            </h2>

            {/* Divider */}
            <div className="flex items-center gap-2 mt-3 mb-6">
              <div className="w-10 h-0.5 bg-primary-500 rounded-full" />
              <div className="w-4 h-0.5 bg-primary-300 rounded-full" />
              <div className="w-2 h-0.5 bg-primary-200 rounded-full" />
            </div>
          </div>

          {/* Message body */}
          <div className="px-6 pb-6 space-y-4">
            {paragraphs.map((para, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "text-neutral-800 text-base leading-relaxed font-medium"
                    : "text-neutral-500 text-sm leading-relaxed"
                }
              >
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* ── Fixed bottom bar ── */}
        <div className="shrink-0 px-6 py-4 border-t border-neutral-100 bg-white flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-neutral-400 text-xs">
            <Tag size={11} />
            <span>{message.category}</span>
            <span>·</span>
            <Calendar size={11} />
            <span>{message.date}</span>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BishopMessageModal;
