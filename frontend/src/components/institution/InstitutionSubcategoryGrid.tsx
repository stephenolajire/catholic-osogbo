import { ChevronRight } from "lucide-react";
import type { InstitutionSubcategory } from "../../services/home/institutionService";

interface InstitutionSubcategoryGridProps {
  subcategories: InstitutionSubcategory[] | undefined;
  onSelectSubcategory: (subcategory: InstitutionSubcategory) => void;
}

export default function InstitutionSubcategoryGrid({
  subcategories,
  onSelectSubcategory,
}: InstitutionSubcategoryGridProps) {
  if (!subcategories || subcategories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No subcategories available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {subcategories.map((subcategory) => (
        <div
          key={subcategory.id}
          onClick={() => onSelectSubcategory(subcategory)}
          className="group cursor-pointer h-full"
        >
          <div className="relative h-64 md:h-72 overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
            {/* Hero Image */}
            <img
              src={subcategory.heroImageUrl}
              alt={subcategory.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/50 to-transparent"></div>

            {/* Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-2">
                {subcategory.name}
              </h3>
              <p className="text-amber-100 text-sm mb-4 line-clamp-1">
                {subcategory.description}
              </p>

              {/* Institution Count & CTA */}
              <div className="flex items-center justify-between">
                <span className="text-amber-200 text-sm font-medium">
                  {subcategory.institutions?.length || 0} institutions
                </span>
                <div className="bg-amber-500 p-2 rounded-full group-hover:bg-amber-400 transition-colors">
                  <ChevronRight className="text-white" size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
