import { useState } from "react";
import { useBishopMessages } from "../../../hooks/bishop/message/useBishopMessage";
import BishopMessagesHero from "../../../components/bishop/message/BishopMessagesHero";
import BishopMessageCard from "../../../components/bishop/message/BishopMessageCard";
import BishopMessageModal from "../../../components/bishop/message/BishopMessageModal";
import BishopMessagePagination from "../../../components/bishop/message/BishopMessagePagination";
import type { BishopMessage } from "../../../services/bishop/bishopMessageService";

const PER_PAGE = 9;

const CATEGORY_COLORS: Record<BishopMessage["category"], string> = {
  "Pastoral Letter": "bg-primary-600/90",
  "Bishop's Message": "bg-emerald-600/90",
  Reflection: "bg-teal-600/90",
  Homily: "bg-cyan-600/90",
  Encyclical: "bg-green-600/90",
};

const BishopMessages = () => {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<BishopMessage | null>(null);

  const { data, isLoading, isError } = useBishopMessages(page);

  const messages = data?.messages;
  const featured = messages?.find((message) => message.isFeatured);
  const rest = featured
    ? messages?.filter((message) => message.id !== featured.id)
    : messages;

  return (
    <div className="min-h-screen bg-white">
      <BishopMessagesHero />

      <div className="px-6 md:px-16 lg:px-24 py-16 w-full mx-auto space-y-16">
        {/* ── Featured message ── */}
        {featured && !isLoading && !isError && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-0.5 bg-primary-500" />
              <span className="text-primary-600 text-xs font-semibold uppercase tracking-widest">
                Latest Message
              </span>
            </div>

            {/* Featured card — wide */}
            <div
              onClick={() => setSelected(featured)}
              className="group cursor-pointer grid md:grid-cols-2 bg-neutral-50 rounded-3xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-xl hover:shadow-neutral-900/10 transition-all duration-300"
            >
              <div className="relative h-64 md:h-auto overflow-hidden">
                <img
                  src={featured.imageUrl}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                <span
                  className={`absolute top-4 left-4 ${CATEGORY_COLORS[featured.category]} backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full`}
                >
                  {featured.category}
                </span>
              </div>

              <div className="p-8 md:p-10 flex flex-col justify-center">
                <p className="text-neutral-400 text-xs mb-3">{featured.date}</p>
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 leading-tight mb-4 group-hover:text-primary-600 transition-colors">
                  {featured.title}
                </h2>
                <p className="text-neutral-500 text-base leading-relaxed mb-6 line-clamp-3">
                  {featured.excerpt}
                </p>
                <div className="inline-flex items-center gap-2 text-primary-600 text-sm font-semibold">
                  Read Full Message
                  <span className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center text-xs group-hover:bg-primary-600 group-hover:text-white transition-colors">
                    →
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── All messages grid ── */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="w-8 h-0.5 bg-primary-500" />
              <span className="text-primary-600 text-xs font-semibold uppercase tracking-widest">
                All Messages
              </span>
            </div>
            {data && (
              <span className="text-neutral-400 text-xs">
                {data.total} message{data.total !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {/* Skeleton */}
          {isLoading && !isError ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(PER_PAGE)].map((_, i) => (
                <div
                  key={i}
                  className="bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-100 animate-pulse"
                >
                  <div className="h-48 bg-neutral-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-2.5 w-20 bg-neutral-200 rounded-full" />
                    <div className="h-4 w-full bg-neutral-200 rounded-lg" />
                    <div className="h-4 w-4/5 bg-neutral-200 rounded-lg" />
                    <div className="space-y-2 pt-1">
                      <div className="h-3 bg-neutral-100 rounded-full" />
                      <div className="h-3 bg-neutral-100 rounded-full w-4/5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="rounded-2xl border border-red-100 bg-red-50 px-6 py-8 text-center">
              <h2 className="text-lg font-bold text-red-900 mb-2">
                Unable to load messages
              </h2>
              <p className="text-sm text-red-700">
                Please try again later.
              </p>
            </div>
          ) : !messages || messages.length === 0 ? (
            <div className="rounded-2xl border border-neutral-100 bg-neutral-50 px-6 py-8 text-center">
              <h2 className="text-lg font-bold text-neutral-900 mb-2">
                No messages available
              </h2>
              <p className="text-sm text-neutral-500">
                Bishop's messages will appear here once they are published.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest?.map((message) => (
                <BishopMessageCard
                  key={message.id}
                  message={message}
                  categoryColor={CATEGORY_COLORS[message.category]}
                  onClick={() => setSelected(message)}
                />
              ))}
            </div>
          )}
        </section>

        {/* ── Pagination ── */}
        {data && data.totalPages > 1 && (
          <BishopMessagePagination
            page={data.page}
            totalPages={data.totalPages}
            onPageChange={(p) => {
              setPage(p);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}
      </div>

      {/* ── Modal ── */}
      {selected && (
        <BishopMessageModal
          message={selected}
          categoryColor={CATEGORY_COLORS[selected.category]}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
};

export default BishopMessages;
