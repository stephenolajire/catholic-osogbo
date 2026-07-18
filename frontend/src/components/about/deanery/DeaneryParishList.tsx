import { MapPin } from "lucide-react";
import type { Parish } from "../../../services/about/deaneryService";

type Props = {
  parishes: Parish[];
};

const DeaneryParishList = ({ parishes }: Props) => (
  <ul className="space-y-0 divide-y divide-amber-200/40">
    {parishes.map((parish, i) => (
      <li
        key={parish.id}
        className="flex items-start gap-4 py-4 group/item hover:bg-amber-50/40 transition-colors duration-200 pl-2"
        style={{ animationDelay: `${i * 30}ms` }}
      >
        {/* Number badge */}
        <span className="shrink-0 w-7 h-7 rounded-full bg-linear-to-br from-amber-200 to-orange-200 text-amber-800 text-xs font-bold flex items-center justify-center mt-0.5 group-hover/item:from-amber-500 group-hover/item:to-orange-500 group-hover/item:text-white group-hover/item:shadow-md transition-all duration-200">
          {i + 1}
        </span>

        <div className="flex-1 min-w-0">
          <p className="text-amber-950 font-serif font-semibold text-base leading-snug group-hover/item:text-amber-700 transition-colors">
            {parish.name}
          </p>
          <div className="flex items-center gap-2 mt-1.5">
            <MapPin size={14} className="text-amber-600 shrink-0" />
            <p className="text-amber-700/70 text-sm truncate font-light">
              {parish.location}
            </p>
          </div>
        </div>
      </li>
    ))}
  </ul>
);

export default DeaneryParishList;
