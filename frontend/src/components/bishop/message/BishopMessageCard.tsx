import { Calendar } from "lucide-react";
import type { BishopMessage } from "../../../services/bishop/bishopMessageService";

type Props = {
  message: BishopMessage;
  categoryColor: string;
  onClick: () => void;
};

const BishopMessageCard = ({ message, categoryColor, onClick }: Props) => (
  <div
    onClick={onClick}
    className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-xl hover:shadow-neutral-900/10 transition-all duration-300 hover:-translate-y-1 flex flex-col"
  >
    {/* Image */}
    <div className="relative h-48 overflow-hidden shrink-0">
      <img
        src={message.imageUrl}
        alt={message.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
      <span
        className={`absolute top-3 left-3 ${categoryColor} backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full`}
      >
        {message.category}
      </span>
    </div>

    {/* Content */}
    <div className="p-5 flex flex-col flex-1">
      <div className="flex items-center gap-1.5 text-neutral-400 text-xs mb-3">
        <Calendar size={11} />
        <span>{message.date}</span>
      </div>

      <h3 className="font-bold text-neutral-900 text-base leading-snug mb-2 group-hover:text-primary-600 transition-colors line-clamp-2 flex-1">
        {message.title}
      </h3>

      <p className="text-neutral-500 text-sm leading-relaxed line-clamp-3 mb-4">
        {message.excerpt}
      </p>

      <div className="flex items-center gap-1.5 text-primary-600 text-xs font-semibold mt-auto group-hover:gap-2.5 transition-all duration-200">
        Read Full Message
        <span className="transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </div>
    </div>
  </div>
);

export default BishopMessageCard;
