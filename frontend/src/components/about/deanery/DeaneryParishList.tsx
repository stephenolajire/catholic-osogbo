import { MapPin } from "lucide-react";
import type { Parish } from "../../../services/about/deaneryService";

type Props = {
  parishes: Parish[];
};

const DeaneryParishList = ({ parishes }: Props) => (
  <ul className="mt-4 space-y-0 divide-y divide-neutral-800/60">
    {parishes.map((parish, i) => (
      <li
        key={parish.id}
        className="flex items-start gap-3 py-2.5 group/item"
        style={{ animationDelay: `${i * 30}ms` }}
      >
        {/* Number */}
        <span className="shrink-0 w-5 h-5 rounded-full bg-neutral-800 text-neutral-500 text-[10px] font-bold flex items-center justify-center mt-0.5 group-hover/item:bg-primary-600 group-hover/item:text-white transition-colors duration-200">
          {i + 1}
        </span>

        <div className="flex-1 min-w-0">
          <p className="text-neutral-200 text-sm font-medium leading-snug group-hover/item:text-white transition-colors">
            {parish.name}
          </p>
          <div className="flex items-center gap-1 mt-0.5">
            <MapPin size={9} className="text-primary-500 shrink-0" />
            <p className="text-neutral-500 text-xs truncate">
              {parish.location}
            </p>
          </div>
        </div>
      </li>
    ))}
  </ul>
);

export default DeaneryParishList;
