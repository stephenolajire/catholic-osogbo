import { ChevronRight } from "lucide-react";
import type { InstitutionCategory } from "../../services/home/institutionService";

interface InstitutionCategoryCardProps {
  category: InstitutionCategory;
  onClick: (category: InstitutionCategory) => void;
}

export default function InstitutionCategoryCard({
  category,
  onClick,
}: InstitutionCategoryCardProps) {
  return (
    <div
      onClick={() => onClick(category)}
      className="group cursor-pointer h-full"
    >
      <div className="relative h-64 md:h-72 overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
        {/* Background Image */}
        <img
          src={category.imageUrl}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">
            {category.name}
          </h3>
          <p className="text-amber-100 text-sm md:text-base mb-4 line-clamp-2">
            {category.description}
          </p>

          {/* Subcategory Count Badge */}
          <div className="flex items-center justify-between">
            <span className="text-amber-200 text-sm font-medium">
              {category.subcategories?.length || 0} subcategories
            </span>
            <div className="bg-amber-500 p-2 rounded-full group-hover:bg-amber-400 transition-colors">
              <ChevronRight className="text-white" size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
