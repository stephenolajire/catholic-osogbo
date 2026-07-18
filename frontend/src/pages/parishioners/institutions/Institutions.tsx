import { useNavigate } from "react-router-dom";
import InstitutionCategoryCard from "../../../components/institution/InstitutionCategoryCard";
import { useInstitutionCategories } from "../../../hooks/home/useInstitution";
import { DEFAULT_INSTITUTION_CATEGORIES } from "../../../components/institution/defaultInstitutions";
import type { InstitutionCategory } from "../../../services/home/institutionService";

const Institutions = () => {
  const navigate = useNavigate();
  const { data: categories = [], isLoading } = useInstitutionCategories();

  // Use default categories if loading or no data
  const displayCategories =
    categories && categories.length > 0
      ? categories
      : DEFAULT_INSTITUTION_CATEGORIES;

  const handleSelectCategory = (category: InstitutionCategory) => {
    // Navigate to the specific category page based on categoryKey
    const categoryPageMap: Record<string, string> = {
      education: "/parishioners/institutions/education",
      healthcare: "/parishioners/institutions/healthcare",
      formation: "/parishioners/institutions/formation",
      vocational: "/parishioners/institutions/vocational",
      bookshop: "/parishioners/institutions/bookshops",
      religious: "/parishioners/institutions/religious",
    };

    const route = categoryPageMap[category.categoryKey];
    if (route) {
      navigate(route);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 lg:py-32 bg-linear-to-br from-amber-900 to-orange-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
              Diocesan Institutions
            </h1>
            <p className="text-lg md:text-xl text-amber-100 mb-4 leading-relaxed">
              Discover the many institutions serving our Catholic community
              across education, healthcare, spiritual formation, and community
              care.
            </p>
            <p className="text-base md:text-lg text-amber-50">
              {displayCategories.length} categories of institutions dedicated to
              serving with compassion and excellence
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid Section */}
      <section className="px-6 md:px-16 lg:px-24 py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-pulse text-amber-700 text-lg">
                Loading institutions...
              </div>
            </div>
          ) : (
            <>
              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-950 mb-4">
                  Browse by Category
                </h2>
                <div className="h-1 w-20 bg-linear-to-r from-amber-500 to-orange-500 rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayCategories.map((category) => (
                  <InstitutionCategoryCard
                    key={category.id}
                    category={category}
                    onClick={handleSelectCategory}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="px-6 md:px-16 lg:px-24 py-16 lg:py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-700 mb-2">
                {displayCategories.length}
              </div>
              <p className="text-amber-900 font-semibold">Categories</p>
              <p className="text-sm text-amber-700 mt-1">
                Diverse areas of service and ministry
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-amber-700 mb-2">
                {displayCategories.reduce(
                  (sum, cat) => sum + (cat.subcategories?.length || 0),
                  0,
                )}
              </div>
              <p className="text-amber-900 font-semibold">Subcategories</p>
              <p className="text-sm text-amber-700 mt-1">
                Specific types of institutions
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-amber-700 mb-2">
                {displayCategories.reduce(
                  (sum, cat) =>
                    sum +
                    (cat.subcategories?.reduce(
                      (s, sub) => s + (sub.institutions?.length || 0),
                      0,
                    ) || 0),
                  0,
                )}
              </div>
              <p className="text-amber-900 font-semibold">Institutions</p>
              <p className="text-sm text-amber-700 mt-1">
                Individual organizations serving the faithful
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Institutions;
