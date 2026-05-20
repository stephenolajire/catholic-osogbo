import { useState, useRef }  from "react"
import { useDiscover }        from "../../hooks/home/useDiscover"
import { X, Calendar, ChevronRight, ArrowRight } from "lucide-react"
import type { DiscoverMessage } from "../../services/home/discoverService"

// ── Defaults ──────────────────────────────────────────────
const DEFAULT_MESSAGES: DiscoverMessage[] = [
  {
    id:          "1",
    title:       "Easter Message to the Faithful",
    excerpt:     "As we celebrate the resurrection of our Lord, let us renew our commitment to live the Gospel with joy and courage in our daily lives.",
    fullMessage: `Dear brothers and sisters in Christ,

The resurrection of our Lord Jesus Christ is the cornerstone of our faith. As we gather this Easter season, we are reminded that death has been conquered and new life has been given to all who believe.

In these challenging times, the message of Easter rings louder than ever. We are called not merely to celebrate a historical event, but to live as resurrection people — people of hope, of joy, and of radical love.

I urge each of you to carry the light of Christ into your homes, your workplaces, and your communities. Let your lives be a testament to the transforming power of God's love. Visit the sick, comfort the grieving, and welcome the stranger as Christ himself.

May the peace of the risen Lord be with you and your families always.

Yours in Christ's service,
Most Rev. John Akin Oyejola`,
    imageUrl:    "https://images.unsplash.com/photo-1508558936510-0af1e3cccbab?w=800&q=80",
    date:        "April 20, 2025",
    category:    "Pastoral Letter",
    isActive:    true,
    createdAt:   "",
    updatedAt:   "",
  },
  {
    id:          "2",
    title:       "On the Sanctity of Family Life",
    excerpt:     "The family remains the fundamental unit of society and the domestic church. We must guard and nurture it with prayer, sacrifice, and unconditional love.",
    fullMessage: `Dear faithful of the Diocese of Osogbo,

The family is under attack in our modern world — through materialism, individualism, and a culture that prizes convenience over commitment. Yet, the Church has always maintained that the family is the domestic church, the first school of faith.

As your bishop, I call on all parents to take seriously your role as the first evangelisers of your children. Pray together as a family. Read the scriptures together. Attend Mass together. These are not optional extras — they are the lifeblood of a healthy Christian family.

To young couples, I say this: your marriage is not merely a contract between two people. It is a covenant with God, a reflection of Christ's love for His Church. Invest in it. Protect it. Seek help when you struggle.

Our diocesan family life commission stands ready to support every family in our diocese. Do not hesitate to reach out.

In faith and hope,
Most Rev. John Akin Oyejola`,
    imageUrl:    "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&q=80",
    date:        "March 10, 2025",
    category:    "Bishop's Message",
    isActive:    true,
    createdAt:   "",
    updatedAt:   "",
  },
  {
    id:          "3",
    title:       "Year of Prayer — A Call to Deeper Faith",
    excerpt:     "This year, I invite every parish, every family, and every soul in our diocese to commit to a deeper, more intentional life of prayer.",
    fullMessage: `My dear people,

Prayer is the breath of the soul. Without it, we wither spiritually, even if we appear to flourish outwardly. The Lord himself withdrew to lonely places to pray, and if the Son of God found it necessary, how much more do we?

I am declaring this year in our diocese as the Year of Prayer. I am asking every parish to establish or reinvigorate an adoration chapel. I am asking every family to set aside at least fifteen minutes each day for prayer together. I am asking every individual to commit to a daily examination of conscience.

Prayer is not passive. It is warfare. It is the most powerful weapon we have against the forces of darkness, division, and despair that threaten our communities.

Let us rise to this call. The Diocese of Osogbo will be known as a praying diocese.

In prayer and solidarity,
Most Rev. John Akin Oyejola`,
    imageUrl:    "https://images.unsplash.com/photo-1565793979907-c30f4fc9d3ab?w=800&q=80",
    date:        "January 5, 2025",
    category:    "Pastoral Letter",
    isActive:    true,
    createdAt:   "",
    updatedAt:   "",
  },
  {
    id:          "4",
    title:       "Advent Reflection: Waiting in Hope",
    excerpt:     "Advent invites us to slow down, to wait, and to hope. In a world obsessed with speed, let us reclaim the sacred art of expectant waiting.",
    fullMessage: `Dear brothers and sisters,

Advent is countercultural. The world around us rushes toward Christmas with noise and consumption, while the Church invites us into silence, waiting, and longing.

This Advent, I invite you to resist the rush. Create space in your days for quiet. Light the Advent candles slowly and deliberately. Read the prophecies of Isaiah and let them sink into your soul. Ask yourself: what are you waiting for? What are you hoping for?

The coming of Christ at Christmas is not merely a historical commemoration. It is a promise of His coming again — in our daily lives, in the Eucharist, and at the end of time. We are an Advent people, always living in the tension between the already and the not yet.

May this Advent season renew in you a living hope.

With paternal affection,
Most Rev. John Akin Oyejola`,
    imageUrl:    "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&q=80",
    date:        "December 1, 2024",
    category:    "Reflection",
    isActive:    true,
    createdAt:   "",
    updatedAt:   "",
  },
]

// ── Message card ──────────────────────────────────────────
const MessageCard = ({
  message,
  onClick,
}: {
  message: DiscoverMessage
  onClick: (m: DiscoverMessage) => void
}) => (
  <div
    onClick={() => onClick(message)}
    className="group shrink-0 w-72 sm:w-80 lg:w-auto cursor-pointer bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-xl hover:shadow-neutral-900/10 transition-all duration-300 hover:-translate-y-1"
  >
    {/* Image */}
    <div className="relative h-48 overflow-hidden">
      <img
        src={message.imageUrl}
        alt={message.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://images.unsplash.com/photo-1508558936510-0af1e3cccbab?w=800&q=80"
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
        <span>{message.date}</span>
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
  </div>
)

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
)

// ── Modal ─────────────────────────────────────────────────
const MessageModal = ({
  message,
  onClose,
}: {
  message: DiscoverMessage
  onClose: () => void
}) => {
  const paragraphs = message.fullMessage.split("\n\n").filter(Boolean)

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative bg-white w-full sm:max-w-2xl sm:rounded-3xl rounded-t-3xl max-h-[92vh] overflow-hidden flex flex-col shadow-2xl z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero image */}
        <div className="relative h-52 shrink-0">
          <img
            src={message.imageUrl}
            alt={message.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
          >
            <X size={18} />
          </button>

          {/* Category + date */}
          <div className="absolute bottom-4 left-5 flex items-center gap-2">
            <span className="bg-primary-600 text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
              {message.category}
            </span>
            <span className="text-white/70 text-xs flex items-center gap-1">
              <Calendar size={10} />
              {message.date}
            </span>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 px-6 py-6">
          <h2 className="text-2xl font-bold text-neutral-900 leading-tight mb-6">
            {message.title}
          </h2>

          <div className="space-y-4">
            {paragraphs.map((para, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "text-neutral-800 text-base leading-relaxed font-medium"
                    : "text-neutral-500 text-sm leading-relaxed"
                }
              >
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="shrink-0 px-6 py-4 border-t border-neutral-100 bg-white">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-full bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

// ── DiscoverSection ───────────────────────────────────────
const DiscoverSection = () => {
  const { data, isLoading, isError }    = useDiscover()
  const [selected, setSelected]         = useState<DiscoverMessage | null>(null)
  const scrollRef                        = useRef<HTMLDivElement>(null)

  const messages = (!isLoading && !isError && Array.isArray(data) && data.length)
    ? data
    : DEFAULT_MESSAGES

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
          {[...Array(4)].map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : (
        <div
          ref={scrollRef}
          className="flex lg:grid lg:grid-cols-4 gap-5 px-6 md:px-16 lg:px-24 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide"
        >
          {messages.map((message) => (
            <MessageCard
              key={message.id}
              message={message}
              onClick={setSelected}
            />
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

      {/* ── Modal ── */}
      {selected && (
        <MessageModal
          message={selected}
          onClose={() => setSelected(null)}
        />
      )}

      {/* Hide scrollbar cross-browser */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  )
}

export default DiscoverSection