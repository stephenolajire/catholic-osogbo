import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import InstitutionHero from "../../../components/institution/InstitutionHero";
import InstitutionSubcategoryGrid from "../../../components/institution/InstitutionSubcategoryGrid";
import InstitutionGrid from "../../../components/institution/InstitutionGrid";
import { useInstitutionCategory } from "../../../hooks/home/useInstitution";
import { DEFAULT_INSTITUTION_CATEGORIES } from "../../../components/institution/defaultInstitutions";
import type { InstitutionSubcategory } from "../../../services/home/institutionService";

const FormationCentres = () => {
  const [selectedSubcategory, setSelectedSubcategory] =
    useState<InstitutionSubcategory | null>(null);

  const { data: category, isLoading } = useInstitutionCategory("formation");
  const displayCategory =
    category ||
    DEFAULT_INSTITUTION_CATEGORIES.find((c) => c.categoryKey === "formation");

  const totalInstitutions =
    displayCategory?.subcategories?.reduce(
      (sum: number, sub) => sum + (sub.institutions?.length || 0),
      0,
    ) || 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <InstitutionHero
        title={selectedSubcategory?.name || "Formation Centres"}
        description={
          selectedSubcategory?.description ||
          "Spiritual and pastoral formation for deepening faith. Our centres provide comprehensive programmes for personal spiritual development, priestly vocations, and religious life formation."
        }
        totalInstitutions={
          selectedSubcategory?.institutions?.length || totalInstitutions
        }
        heroImageUrl={selectedSubcategory?.heroImageUrl}
      />

      {/* Main Content Section */}
      <section className="px-6 md:px-16 lg:px-24 py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Back Button - Show when viewing institutions */}
          {selectedSubcategory && (
            <button
              onClick={() => setSelectedSubcategory(null)}
              className="flex items-center gap-2 text-amber-700 hover:text-amber-900 font-semibold mb-8 transition-colors"
            >
              <ChevronLeft size={20} />
              Back to Categories
            </button>
          )}

          {isLoading ? (
            // Loading State
            <div className="flex items-center justify-center py-16">
              <div className="animate-pulse text-amber-700">Loading...</div>
            </div>
          ) : selectedSubcategory ? (
            // Institutions List View
            <div>
              <div className="mb-12">
                <p className="text-sm text-amber-600 font-medium">
                  {selectedSubcategory.institutions?.length || 0} institutions
                  in this category
                </p>
              </div>

              {/* Institutions Grid */}
              <InstitutionGrid
                institutions={selectedSubcategory.institutions || []}
                isLoading={false}
              />
            </div>
          ) : (
            // Subcategories Grid View
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-amber-950 mb-2">
                Select a Category
              </h2>
              <p className="text-amber-700/70 mb-12">
                Choose a formation programme to view available institutions
              </p>
              <InstitutionSubcategoryGrid
                subcategories={displayCategory?.subcategories}
                onSelectSubcategory={setSelectedSubcategory}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default FormationCentres;
