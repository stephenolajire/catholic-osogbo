import { useLocalOrdinary } from "../../../hooks/bishop/useLocalOrdinary";

const LocalOrdinary = () => {
  const {
    data: localOrdinary,
    isLoading: loading,
    isError,
    error,
  } = useLocalOrdinary();

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading information...</p>
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
              : "Failed to load local ordinary information"}
          </p>
        </div>
      </div>
    );
  }

  if (!localOrdinary) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Information not found</p>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section with Image */}
      {localOrdinary.heroImage && (
        <div className="relative h-96 md:h-[500px] overflow-hidden">
          <img
            src={localOrdinary.heroImage}
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/70"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
            <h1 className="text-3xl md:text-5xl font-bold">
              {localOrdinary.title}
            </h1>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Bishop Image */}
          {localOrdinary.bishopImage && (
            <div className="md:col-span-1">
              <img
                src={localOrdinary.bishopImage}
                alt="Bishop"
                className="w-full h-auto rounded-lg shadow-lg sticky top-4"
              />
            </div>
          )}

          {/* Text Content */}
          <div
            className={`${localOrdinary.bishopImage ? "md:col-span-2" : "md:col-span-3"}`}
          >
            {/* Article Metadata */}
            <div className="mb-6 pb-4 border-b border-gray-300">
              <p className="text-gray-600 text-sm">
                <time dateTime={localOrdinary.createdAt}>
                  {new Date(localOrdinary.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}
                </time>
              </p>
            </div>

            {/* Main Text Content */}
            <div className="space-y-6">
              {localOrdinary.text.split("\n\n").map((paragraph, index) => {
                // First paragraph gets drop cap styling and larger font
                if (index === 0) {
                  const firstLetter = paragraph.charAt(0);
                  const restText = paragraph.slice(1);

                  return (
                    <p
                      key={index}
                      className="text-lg leading-relaxed text-gray-800"
                    >
                      <span className="float-left text-5xl font-bold text-primary-600 mr-2 leading-none">
                        {firstLetter}
                      </span>
                      {restText}
                    </p>
                  );
                }

                return (
                  <p key={index} className="text-gray-800 leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600 text-sm">Diocese of Osogbo</p>
        </div>
      </div>
    </article>
  );
};

export default LocalOrdinary;
