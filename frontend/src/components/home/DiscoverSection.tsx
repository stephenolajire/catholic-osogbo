import { useRef } from "react";
import { useDiscover } from "../../hooks/home/useDiscover";
import { Calendar, ChevronRight, ArrowRight } from "lucide-react";
import { formatDate } from "../../utils/dateUtils";
import { Link } from "react-router-dom";
import type { DiscoverMessage } from "../../services/home/discoverService";

const MessageCard = ({ message }: { message: DiscoverMessage }) => (
  <Link
    to={`/discover/${message.id}`}
    className="group shrink-0 w-72 sm:w-80 lg:w-auto bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-xl hover:shadow-neutral-900/10 transition-all duration-300 hover:-translate-y-1"
  >
    {/* Image */}
    <div className="relative h-48 overflow-hidden">
      <img
        src={message.imageUrl}
        alt={message.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://images.unsplash.com/photo-1508558936510-0af1e3cccbab?w=800&q=80";
        }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />

      {/* Category badge */}
      <span className="absolute top-3 left-3 bg-primary-600/90 backdrop-blur-sm text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
        {message.category}
      </span>
    </div>

    {/* Content */}
    <div className="p-5">
      {/* Date */}
      <div className="flex items-center gap-1.5 text-neutral-400 text-xs mb-3">
        <Calendar size={11} />
        <span>{formatDate(message.date, "medium")}</span>
      </div>

      {/* Title */}
      <h3 className="text-neutral-900 font-bold text-base leading-snug mb-2 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
        {message.title}
      </h3>

      {/* Excerpt */}
      <p className="text-neutral-500 text-sm leading-relaxed line-clamp-3 mb-4">
        {message.excerpt}
      </p>

      {/* Read more */}
      <div className="flex items-center gap-1.5 text-primary-600 text-xs font-semibold group-hover:gap-2.5 transition-all duration-200">
        Read Full Message
        <ChevronRight size={13} />
      </div>
    </div>
  </Link>
);

// ── Skeleton card ─────────────────────────────────────────
const CardSkeleton = () => (
  <div className="shrink-0 w-72 sm:w-80 lg:w-auto bg-white rounded-2xl overflow-hidden border border-neutral-100 animate-pulse">
    <div className="h-48 bg-neutral-200" />
    <div className="p-5 space-y-3">
      <div className="h-2.5 w-20 bg-neutral-200 rounded-full" />
      <div className="h-4 w-full bg-neutral-200 rounded-lg" />
      <div className="h-4 w-4/5 bg-neutral-200 rounded-lg" />
      <div className="space-y-2 pt-1">
        <div className="h-3 w-full bg-neutral-100 rounded-full" />
        <div className="h-3 w-full bg-neutral-100 rounded-full" />
        <div className="h-3 w-2/3 bg-neutral-100 rounded-full" />
      </div>
    </div>
  </div>
);


// ── DiscoverSection ───────────────────────────────────────
const DiscoverSection = () => {
  const { data, isLoading, isError } = useDiscover();
  const scrollRef = useRef<HTMLDivElement>(null);

  const messages =
    !isLoading && !isError && Array.isArray(data) && data.length
      ? data.slice(0, 4)
      : [];

  return (
    <section className="py-20 bg-white overflow-hidden">
      {/* ── Header ── */}
      <div className="px-6 md:px-16 lg:px-24 mb-10">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-0.5 bg-primary-500" />
              <span className="text-primary-600 text-xs font-semibold uppercase tracking-widest">
                From the Bishop
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 leading-tight">
              Discover the Bishop's Messages
            </h2>
            <p className="text-neutral-500 text-base mt-2 max-w-xl">
              Pastoral letters, reflections, and messages from the Bishop of the
              Catholic Diocese of Osogbo.
            </p>
          </div>

          {/* View all — hidden on mobile */}
          <a
            href="/bishop/messages"
            className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-primary-600 border border-primary-300 hover:bg-primary-50 px-5 py-2.5 rounded-full transition-all duration-200 shrink-0 ml-8"
          >
            View All
            <ArrowRight size={15} />
          </a>
        </div>
      </div>

      {/* ── Cards — horizontal scroll on mobile, grid on lg ── */}
      {isLoading ? (
        // Skeleton
        <div className="flex lg:grid lg:grid-cols-4 gap-5 px-6 md:px-16 lg:px-24 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
          {[...Array(4)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div
          ref={scrollRef}
          className="flex lg:grid lg:grid-cols-4 gap-5 px-6 md:px-16 lg:px-24 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide"
        >
          {messages.map((message) => (
            <MessageCard key={message.id} message={message} />
          ))}
        </div>
      )}

      {/* ── View all — mobile only ── */}
      <div className="md:hidden mt-6 px-6">
        <a
          href="/bishop/messages"
          className="flex items-center justify-center gap-2 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 py-3 rounded-full transition-colors duration-200 w-full"
        >
          View All Messages
          <ArrowRight size={15} />
        </a>
      </div>

      {/* Hide scrollbar cross-browser */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default DiscoverSection;
