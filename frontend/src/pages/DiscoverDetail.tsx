import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import type { DiscoverMessage } from "../services/home/discoverService";
import discoverService from "../services/home/discoverService";
import { formatNewspaperDate, formatDateWithTime } from "../utils/dateUtils";

const DiscoverDetailSkeleton = () => (
  <div className="min-h-screen bg-white">
    {/* Header skeleton */}
    <div className="h-96 bg-linear-to-b from-neutral-200 to-neutral-100 animate-pulse" />

    {/* Content skeleton */}
    <div className="max-w-4xl mx-auto px-6 md:px-8 py-12">
      <div className="space-y-6">
        <div className="h-10 w-3/4 bg-neutral-200 rounded-lg animate-pulse" />
        <div className="flex gap-4">
          <div className="h-4 w-24 bg-neutral-200 rounded animate-pulse" />
          <div className="h-4 w-32 bg-neutral-200 rounded animate-pulse" />
        </div>
        <div className="space-y-3 pt-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`h-4 bg-neutral-100 rounded ${
                i === 7 ? "w-2/3" : "w-full"
              } animate-pulse`}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const DiscoverDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [message, setMessage] = useState<DiscoverMessage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        if (id) {
          const data = await discoverService.getMessageById(id);
          setMessage(data);
        }
      } catch (error) {
        console.error("Failed to fetch discover message:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessage();
  }, [id]);

  if (isLoading) {
    return <DiscoverDetailSkeleton />;
  }

  if (isError || !message) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">
            Message Not Found
          </h1>
          <p className="text-neutral-500 mb-6">
            Sorry, we couldn't find the message you're looking for.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-semibold transition-colors"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const paragraphs = message.fullMessage.split("\n\n").filter(Boolean);

  return (
    <article className="min-h-screen bg-white">
      {/* Back button - sticky on scroll */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-neutral-100">
        <div className="max-w-4xl mx-auto px-6 md:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 font-medium transition-colors"
          >
            <ArrowLeft size={20} />
            Back
          </button>
        </div>
      </div>

      {/* Hero image */}
      <div className="relative h-96 md:h-[500px] overflow-hidden bg-neutral-100">
        <img
          src={message.imageUrl}
          alt={message.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1508558936510-0af1e3cccbab?w=1200&q=80";
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
          <div className="max-w-4xl">
            {/* Category badge */}
            <div className="mb-4 inline-flex">
              <span className="bg-primary-600 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                {message.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              {message.title}
            </h1>

            {/* Meta info */}
            <div className="flex flex-wrap gap-6 text-white/90 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <time dateTime={message.date}>
                  {formatNewspaperDate(message.date)}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Tag size={18} />
                <span>{message.category}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article content */}
      <div className="bg-white">
        <div className="max-w-3xl mx-auto px-6 md:px-8 py-16">
          {/* Excerpt as lead paragraph */}
          <div className="mb-12">
            <p className="text-xl md:text-2xl text-neutral-800 font-semibold leading-relaxed border-l-4 border-primary-600 pl-6 py-2">
              {message.excerpt}
            </p>
          </div>

          {/* Article metadata */}
          <div className="flex flex-wrap gap-6 mb-12 pb-8 border-b border-neutral-200 text-sm text-neutral-600">
            <div>
              <span className="font-semibold text-neutral-900">Published:</span>{" "}
              {formatDateWithTime(message.date)}
            </div>
            <div>
              <span className="font-semibold text-neutral-900">Category:</span>{" "}
              {message.category}
            </div>
          </div>

          {/* Main article body */}
          <div className="prose prose-lg max-w-none">
            <div className="space-y-6">
              {paragraphs.map((para, index) => (
                <p
                  key={index}
                  className={`${
                    index === 0 ? "text-base md:text-lg" : "text-base"
                  } leading-relaxed ${
                    index === 0
                      ? "font-semibold text-neutral-900"
                      : "text-neutral-700"
                  } ${index === 0 ? "drop-cap" : ""}`}
                >
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="my-12 flex items-center justify-center">
            <div className="h-1 w-12 bg-primary-600 rounded-full" />
          </div>

          {/* Footer info */}
          <div className="bg-neutral-50 rounded-lg p-6 md:p-8 text-center">
            <p className="text-neutral-600 text-sm mb-2">
              From the Catholic Diocese of Osogbo
            </p>
            <p className="text-neutral-500 text-xs">
              Last updated: {formatDateWithTime(message.updatedAt)}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-neutral-50 border-t border-neutral-200 py-12">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <button
            onClick={() => navigate("/bishop/messages")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-semibold transition-all duration-200 hover:shadow-lg"
          >
            View All Messages
            <ArrowLeft size={18} className="rotate-180" />
          </button>
        </div>
      </div>

      {/* Drop cap styling */}
      <style>{`
        .drop-cap::first-letter {
          font-size: 2em;
          float: left;
          line-height: 1;
          padding-right: 0.1em;
          font-weight: bold;
          color: #dc2626;
        }
      `}</style>
    </article>
  );
};

export default DiscoverDetail;
