import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, ChevronRight, Newspaper } from "lucide-react";
import { useNews } from "../../../hooks/news/useNews";
import { formatDate } from "../../../utils/dateUtils";

const NewsHeadlines = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useNews(currentPage, 12);

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

  if (isError) {
    return (
      <section className="py-20 px-6 md:px-16 lg:px-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <p className="text-neutral-600 text-lg">
              Unable to load news articles. Please try again later.
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
              Latest Updates
            </span>
          </div>

          <div className="flex items-start gap-5">
            <div className="hidden sm:flex items-center justify-center w-14 h-14 rounded-2xl bg-neutral-900 shrink-0">
              <Newspaper size={24} className="text-neutral-200" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-3">
                News & Updates
              </h1>
              <p className="text-neutral-600 text-lg leading-relaxed font-light">
                Stay informed with the latest news, events, and announcements
                from the Diocese of Osogbo
              </p>
            </div>
          </div>
        </div>

        {/* News Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden border border-neutral-100 animate-pulse"
              >
                <div className="h-48 bg-neutral-200" />
                <div className="p-5 space-y-3">
                  <div className="h-2.5 w-20 bg-neutral-200 rounded-full" />
                  <div className="h-4 w-full bg-neutral-200 rounded-lg" />
                  <div className="h-4 w-4/5 bg-neutral-200 rounded-lg" />
                  <div className="space-y-2 pt-2">
                    <div className="h-3 w-full bg-neutral-100 rounded-full" />
                    <div className="h-3 w-full bg-neutral-100 rounded-full" />
                    <div className="h-3 w-2/3 bg-neutral-100 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : data?.results.length ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {data.results.map((news) => (
                <Link
                  key={news.id}
                  to={`/news/${news.id}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-xl hover:shadow-neutral-900/10 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-neutral-100">
                    {news.imageUrl ? (
                      <img
                        src={news.imageUrl}
                        alt={news.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://images.unsplash.com/photo-1508558936510-0af1e3cccbab?w=800&q=80";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-neutral-100 to-neutral-200">
                        <Newspaper size={32} className="text-neutral-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />

                    {/* Category badge */}
                    <span className="absolute top-3 left-3 bg-primary-600/90 backdrop-blur-sm text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full capitalize">
                      {news.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Date */}
                    <div className="flex items-center gap-1.5 text-neutral-400 text-xs mb-3">
                      <Calendar size={11} />
                      <span>{formatDate(news.date, "medium")}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-neutral-900 font-bold text-base leading-snug mb-2 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
                      {news.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-neutral-500 text-sm leading-relaxed line-clamp-3 mb-4">
                      {news.excerpt}
                    </p>

                    {/* Read more */}
                    <div className="flex items-center gap-1.5 text-primary-600 text-xs font-semibold group-hover:gap-2.5 transition-all duration-200">
                      Read Full Article
                      <ChevronRight size={13} />
                    </div>
                  </div>
                </Link>
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
            <p className="text-neutral-600 text-lg">
              No news articles available.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsHeadlines;
