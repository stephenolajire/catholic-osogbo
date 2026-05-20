import { useCallback, useState } from "react";
import { Search } from "lucide-react";
import ParishCard from "./ParishCard";
import ParishModal from "./ParishModal";
import type { Parish } from "../../../services/about/parishService";

type Props = {
  parishes: Parish[];
  isLoading: boolean;
};

const SkeletonCard = () => (
  <div className="flex bg-white border border-neutral-100 rounded-2xl overflow-hidden animate-pulse">
    <div className="w-28 sm:w-36 md:w-44 shrink-0 bg-neutral-200" />
    <div className="flex-1 p-4 sm:p-5 space-y-3">
      <div className="flex justify-between gap-3">
        <div className="h-4 bg-neutral-200 rounded-full w-2/3" />
        <div className="h-3 bg-neutral-100 rounded-full w-14" />
      </div>
      <div className="h-3 bg-neutral-100 rounded-full w-full" />
      <div className="h-3 bg-neutral-100 rounded-full w-3/4" />
      <div className="pt-3 border-t border-neutral-50">
        <div className="h-5 bg-neutral-100 rounded-full w-28" />
      </div>
    </div>
  </div>
);

const ParishGrid = ({ parishes, isLoading }: Props) => {
  const [selectedParish, setSelectedParish] = useState<Parish | null>(null);
  const handleClose = useCallback(() => setSelectedParish(null), []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-5">
        {[...Array(8)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!parishes.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
          <Search size={24} className="text-neutral-300" />
        </div>
        <p className="text-neutral-700 font-semibold text-base mb-1">
          No parishes found
        </p>
        <p className="text-neutral-400 text-sm">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-5">
        {parishes.map((parish, index) => (
          <ParishCard
            key={parish.id}
            parish={parish}
            index={index + 1}
            onClick={setSelectedParish}
          />
        ))}
      </div>

      {selectedParish && (
        <ParishModal parish={selectedParish} onClose={handleClose} />
      )}
    </>
  );
};

export default ParishGrid;
