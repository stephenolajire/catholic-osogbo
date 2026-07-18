import { useParams } from "react-router-dom";
import { Calendar, Share2 } from "lucide-react";
import { useNewsById } from "../../../hooks/news/useNews";
import { formatDate, formatNewspaperDate } from "../../../utils/dateUtils";

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: news, isLoading, isError } = useNewsById(id || "");

  if (isError) {
    return (
      <section className="py-20 px-6 md:px-16 lg:px-24 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center py-20">
            <p className="text-neutral-600 text-lg">
              Unable to load article. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="py-20 px-6 md:px-16 lg:px-24 bg-white">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="h-96 bg-neutral-200 rounded-2xl animate-pulse" />
          <div className="space-y-4">
            <div className="h-8 bg-neutral-200 rounded animate-pulse" />
            <div className="h-6 bg-neutral-200 rounded animate-pulse w-4/5" />
            <div className="space-y-3 pt-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-neutral-100 rounded animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!news) return null;

  return (
    <article className="bg-white">
      {/* Hero Image */}
      {news.imageUrl && (
        <div className="relative h-96 md:h-[28rem] overflow-hidden">
          <img
            src={news.imageUrl}
            alt={news.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1508558936510-0af1e3cccbab?w=1200&q=80";
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/20 to-transparent" />

          {/* Overlay Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
            <div className="max-w-3xl mx-auto">
              {/* Category */}
              <span className="inline-block bg-primary-600 text-white text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 capitalize">
                {news.category}
              </span>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-serif font-bold leading-tight mb-4">
                {news.title}
              </h1>

              {/* Metadata */}
              <div className="flex items-center gap-4 text-neutral-200 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <time>{formatDate(news.date, "medium")}</time>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Article Content */}
      <section className="py-16 px-6 md:px-16 lg:px-24">
        <div className="max-w-3xl mx-auto">
          {/* Newspaper-style header */}
          <div className="border-b-2 border-primary-600 pb-8 mb-8">
            <p className="text-primary-600 text-xs font-bold uppercase tracking-widest mb-2">
              {formatNewspaperDate(news.date)}
            </p>
            <h2 className="text-neutral-900 font-serif text-2xl md:text-3xl font-bold mb-4">
              {news.title}
            </h2>
            <p className="text-neutral-600 text-lg italic leading-relaxed">
              {news.excerpt}
            </p>
          </div>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none text-neutral-700">
            {news.fullContent.split("\n\n").map((paragraph, idx) => (
              <p
                key={idx}
                className="text-neutral-700 leading-relaxed mb-6 first-letter:text-3xl first-letter:font-bold first-letter:float-left first-letter:leading-none first-letter:pr-2"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-neutral-200 flex items-center justify-between">
            <div className="text-neutral-500 text-sm">
              <p>Published: {formatDate(news.date, "full")}</p>
              <p>Updated: {formatDate(news.updatedAt, "full")}</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-neutral-600 hover:text-primary-600 transition">
              <Share2 size={18} />
              <span className="font-medium">Share</span>
            </button>
          </div>
        </div>
      </section>
    </article>
  );
};

export default NewsDetail;
