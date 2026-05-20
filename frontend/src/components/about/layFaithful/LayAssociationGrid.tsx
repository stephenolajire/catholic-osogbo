import { Search } from "lucide-react";
import type { LayAssociation } from "../../../services/about/layFaithfulService";
import LayAssociationCard from "./LayAssociationCard";

type Props = {
  associations: LayAssociation[];
  isLoading: boolean;
};

const SkeletonAssociation = () => (
  <div className="bg-[#f7f4ef] border border-neutral-900/10 rounded-[2rem] overflow-hidden animate-pulse">
    <div className="grid lg:grid-cols-[320px_1fr]">
      <div className="min-h-72 bg-neutral-200" />
      <div className="p-6 space-y-4">
        <div className="h-5 bg-neutral-200 rounded-full w-48" />
        <div className="h-3 bg-neutral-100 rounded-full w-full" />
        <div className="h-3 bg-neutral-100 rounded-full w-3/4" />
        <div className="grid md:grid-cols-3 gap-3 pt-4">
          <div className="h-32 bg-neutral-100 rounded-3xl" />
          <div className="h-32 bg-neutral-100 rounded-3xl" />
          <div className="h-32 bg-neutral-100 rounded-3xl" />
        </div>
      </div>
    </div>
  </div>
);

const LayAssociationGrid = ({ associations, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className="space-y-5">
        {[...Array(3)].map((_, i) => (
          <SkeletonAssociation key={i} />
        ))}
      </div>
    );
  }

  if (!associations.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
          <Search size={24} className="text-neutral-300" />
        </div>
        <p className="text-neutral-700 font-semibold text-base mb-1">
          No association found
        </p>
        <p className="text-neutral-400 text-sm">
          Try a different association, leader, or category
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {associations.map((association) => (
        <LayAssociationCard key={association.id} association={association} />
      ))}
    </div>
  );
};

export default LayAssociationGrid;
