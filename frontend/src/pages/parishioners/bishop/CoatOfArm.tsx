import { useCoatOfArm } from "../../../hooks/bishop/useCoatOfArm";

const CoatOfArm = () => {
  const {
    data: coatOfArm,
    isLoading: loading,
    isError,
    error,
  } = useCoatOfArm();

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading coat of arms...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">
            {error instanceof Error
              ? error.message
              : "Failed to load coat of arms"}
          </p>
        </div>
      </div>
    );
  }

  if (!coatOfArm) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Coat of arms not found</p>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section with Image */}
      {coatOfArm.heroImage && (
        <div className="relative h-96 md:h-[500px] overflow-hidden">
          <img
            src={coatOfArm.heroImage}
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/70"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-2">
              {coatOfArm.title}
            </h1>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Coat of Arm Image */}
        {coatOfArm.coatOfArmImage && (
          <div className="mb-12">
            <img
              src={coatOfArm.coatOfArmImage}
              alt="Coat of Arms"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Description */}
        {coatOfArm.description && (
          <div className="mb-12">
            <p className="text-lg leading-relaxed text-gray-800 border-l-4 border-primary-600 pl-6 mb-8">
              {coatOfArm.description}
            </p>
          </div>
        )}

        {/* Items and Explanations */}
        {coatOfArm.items && coatOfArm.items.length > 0 && (
          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Elements of the Coat of Arms
            </h2>

            <div className="grid gap-6">
              {coatOfArm.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 rounded-lg p-6 border-l-4 border-primary-600"
                >
                  <h3 className="text-xl font-bold text-primary-600 mb-3">
                    {item.itemName}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {item.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600 text-sm">Diocese of Osogbo</p>
        </div>
      </div>
    </article>
  );
};

export default CoatOfArm;
