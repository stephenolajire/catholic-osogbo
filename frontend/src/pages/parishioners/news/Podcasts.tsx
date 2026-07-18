import { useState } from "react";
import { Music, Play, Pause, ChevronRight } from "lucide-react";
import { usePodcasts } from "../../../hooks/news/usePodcast";

const Podcasts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const { data, isLoading, isError } = usePodcasts(currentPage, 12);

  const handleNextPage = () => {
    if (data && data.count > currentPage * 12) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (isError) {
    return (
      <section className="py-20 px-6 md:px-16 lg:px-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <p className="text-neutral-600 text-lg">
              Unable to load podcasts. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 md:px-16 lg:px-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-0.5 bg-primary-500" />
            <span className="text-primary-600 text-xs font-semibold uppercase tracking-widest">
              Audio Content
            </span>
          </div>

          <div className="flex items-start gap-5">
            <div className="hidden sm:flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-primary-500 to-primary-600 shrink-0">
              <Music size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-3">
                Podcasts
              </h1>
              <p className="text-neutral-600 text-lg leading-relaxed font-light">
                Listen to inspiring talks, teachings, and reflections from the
                Diocese
              </p>
            </div>
          </div>
        </div>

        {/* Podcasts Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl overflow-hidden border border-neutral-100 animate-pulse"
              >
                <div className="h-40 bg-neutral-200" />
                <div className="p-4 space-y-3">
                  <div className="h-4 w-full bg-neutral-200 rounded" />
                  <div className="h-3 w-4/5 bg-neutral-100 rounded" />
                  <div className="h-3 w-3/5 bg-neutral-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : data?.results.length ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {data.results.map((podcast) => (
                <div
                  key={podcast.id}
                  className="bg-white rounded-xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-lg transition-shadow group"
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden bg-linear-to-br from-primary-500 to-primary-600">
                    {podcast.imageUrl ? (
                      <img
                        src={podcast.imageUrl}
                        alt={podcast.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Music size={40} className="text-white/50" />
                      </div>
                    )}

                    {/* Play Button Overlay */}
                    <button
                      onClick={() =>
                        setPlayingId(
                          playingId === podcast.id ? null : podcast.id,
                        )
                      }
                      className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center hover:bg-primary-700 transition">
                        {playingId === podcast.id ? (
                          <Pause size={20} className="text-white ml-0.5" />
                        ) : (
                          <Play size={20} className="text-white ml-0.5" />
                        )}
                      </div>
                    </button>

                    {/* Featured badge */}
                    {podcast.isFeatured && (
                      <span className="absolute top-2 right-2 bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Title */}
                    <h3 className="text-neutral-900 font-bold text-sm leading-snug mb-2 line-clamp-2">
                      {podcast.title}
                    </h3>

                    {/* Description */}
                    <p className="text-neutral-500 text-xs leading-relaxed line-clamp-2 mb-3">
                      {podcast.description}
                    </p>

                    {/* Duration */}
                    <div className="text-neutral-400 text-xs mb-4">
                      Duration: {formatDuration(podcast.durationSeconds)}
                    </div>

                    {/* Spotify Link */}
                    <a
                      href={podcast.spotifyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 w-full justify-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition text-sm"
                    >
                      Listen on Spotify
                      <ChevronRight size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {data.count > 12 && (
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="px-6 py-2 rounded-lg border border-neutral-300 text-neutral-600 font-medium hover:bg-neutral-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <div className="text-neutral-600 font-medium">
                  Page{" "}
                  <span className="font-bold text-neutral-900">
                    {currentPage}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-neutral-900">
                    {Math.ceil(data.count / 12)}
                  </span>
                </div>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage * 12 >= data.count}
                  className="px-6 py-2 rounded-lg border border-neutral-300 text-neutral-600 font-medium hover:bg-neutral-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-neutral-600 text-lg">No podcasts available.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Podcasts;
