import { Search } from "lucide-react";
import type { LayAssociation } from "../../../services/about/layFaithfulService";
import LayAssociationCard from "./LayAssociationCard";

type Props = {
  associations: LayAssociation[];
  isLoading: boolean;
};

const SkeletonAssociation = () => (
  <div className="bg-white border border-amber-100/60 rounded-2xl overflow-hidden animate-pulse">
    <div className="grid lg:grid-cols-[340px_1fr]">
      <div className="min-h-80 bg-linear-to-br from-amber-100 to-orange-100" />
      <div className="p-7 md:p-8 space-y-4">
        <div className="h-6 bg-amber-100 rounded-full w-48" />
        <div className="h-4 bg-amber-50 rounded-full w-full" />
        <div className="h-4 bg-amber-50 rounded-full w-3/4" />
        <div className="pt-4 space-y-3">
          <div className="h-32 bg-amber-50 rounded-xl" />
          <div className="h-32 bg-amber-50 rounded-xl" />
        </div>
      </div>
    </div>
  </div>
);

const LayAssociationGrid = ({ associations, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <SkeletonAssociation key={i} />
        ))}
      </div>
    );
  }

  if (!associations.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-20 h-20 bg-linear-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
          <Search size={32} className="text-amber-600/50" />
        </div>
        <p className="text-amber-950 font-serif font-bold text-xl mb-2">
          No association found
        </p>
        <p className="text-amber-700/70 text-base">
          Try searching with a different keyword, association name, or category.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {associations.map((association) => (
        <LayAssociationCard key={association.id} association={association} />
      ))}
    </div>
  );
};

export default LayAssociationGrid;
