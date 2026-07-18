import { Search } from "lucide-react";
import type { Institution } from "../../services/home/institutionService";
import InstitutionCard from "./InstitutionCard";

type Props = {
  institutions: Institution[];
  isLoading: boolean;
};

const SkeletonCard = () => (
  <div className="rounded-2xl border border-amber-100/60 overflow-hidden animate-pulse bg-white">
    <div className="h-48 bg-linear-to-br from-amber-100 to-orange-100" />
    <div className="p-5 space-y-3">
      <div className="h-4 bg-amber-100 rounded-full w-24" />
      <div className="h-5 bg-amber-50 rounded-full w-full" />
      <div className="h-4 bg-amber-50 rounded-full w-3/4" />
      <div className="space-y-2 mt-4">
        <div className="h-4 bg-amber-50 rounded-full w-full" />
        <div className="h-4 bg-amber-50 rounded-full w-4/5" />
        <div className="h-4 bg-amber-50 rounded-full w-3/5" />
      </div>
    </div>
  </div>
);

const InstitutionGrid = ({ institutions, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!institutions.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-20 h-20 bg-linear-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
          <Search size={32} className="text-amber-600/50" />
        </div>
        <p className="text-amber-950 font-serif font-bold text-xl mb-2">
          No institutions found
        </p>
        <p className="text-amber-700/70 text-base">
          No institutions in this category yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {institutions.map((institution) => (
        <InstitutionCard key={institution.id} institution={institution} />
      ))}
    </div>
  );
};

export default InstitutionGrid;
