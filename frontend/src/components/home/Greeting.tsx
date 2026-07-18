import { useGreeting } from "../../hooks/home/useGreeting";
import { Link } from "react-router-dom";
import { ChevronRight, Quote } from "lucide-react";
import type { Greeting } from "../../services/home/greetingService";

const DEFAULT_GREETING: Greeting = {
  id: "default",
  welcomeTitle: "Welcome to the Catholic Diocese of Osogbo",
  welcomeText: `Dear friends in Christ, it is with great joy and a heart full of gratitude that I welcome you to the official platform of the Catholic Diocese of Osogbo. This diocese, born of faith and nurtured by the grace of God, stands as a beacon of hope, love, and service in our community.

We are a people bound together by one faith, one baptism, and one Lord. Through our parishes, institutions, and ministries, we strive daily to bring the light of Christ to every corner of our beloved diocese. Whether you are a parishioner, a visitor, or someone seeking to know more about our faith, you are warmly welcome here.

May this space inspire you, connect you with our vibrant community, and deepen your walk with God. Together, let us continue to build the Kingdom of God in Osogbo and beyond.`,
  bishopName: "Most Rev. John Akin Oyejola",
  bishopTitle: "Bishop of the Catholic Diocese of Osogbo",
  bishopImageUrl: "/image.png",
  signature: "Yours in Christ's service",
  isActive: true,
  createdAt: "",
  updatedAt: "",
};

const GreetingSkeleton = () => (
  <section className="py-24 px-6 md:px-16 lg:px-24 bg-neutral-50">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
      <div className="space-y-5 animate-pulse">
        <div className="h-3 w-28 bg-neutral-200 rounded-full" />
        <div className="h-10 w-3/4 bg-neutral-200 rounded-xl" />
        <div className="space-y-3 pt-4">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className={`h-3 bg-neutral-200 rounded-full ${i === 6 ? "w-2/3" : "w-full"}`}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-full max-w-md h-140 bg-neutral-200 rounded-3xl animate-pulse" />
      </div>
    </div>
  </section>
);

const GreetingSection = () => {
  const { data, isLoading, isError } = useGreeting();

  // ✅ Only show skeleton on genuine first load
  // If error or no server — fall straight through to default
  if (isLoading && !isError) return <GreetingSkeleton />;

  const greeting: Greeting = data ?? DEFAULT_GREETING;
  const paragraphs = (greeting.welcomeText || "").split("\n\n").filter(Boolean);

  return (
    <section className="relative py-24 px-6 md:px-16 lg:px-24 bg-neutral-50 overflow-hidden">
      {/* ── Background decoration ── */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-50/60 rounded-l-[80px] z-0 pointer-events-none" />
      <div
        className="absolute top-16 right-16 w-64 h-64 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #16a34a 1.5px, transparent 1.5px)",
          backgroundSize: "16px 16px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        {/* ── Left — Text ── */}
        <div className="flex flex-col">
          {/* Label */}
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-0.5 bg-primary-500" />
            <span className="text-primary-600 text-xs font-semibold uppercase tracking-widest">
              Bishop's Welcome
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight mb-6">
            {greeting.welcomeTitle}
          </h2>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-1 bg-primary-500 rounded-full" />
            <div className="w-4 h-1 bg-primary-300 rounded-full" />
            <div className="w-2 h-1 bg-primary-200 rounded-full" />
          </div>

          {/* Quote */}
          <Quote
            size={32}
            className="text-primary-200 mb-4"
            strokeWidth={1.5}
          />

          {/* Paragraphs */}
          <div className="space-y-4 mb-8">
            {paragraphs.map((para, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "text-neutral-800 text-lg leading-relaxed font-medium"
                    : "text-neutral-500 text-base leading-relaxed"
                }
              >
                {para}
              </p>
            ))}
          </div>

          {/* ✅ CTA — full width stacked on mobile, inline on sm+ */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              to="/bishop/messages"
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 px-6 py-3 rounded-full transition-all duration-200 shadow-sm hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-900/20 w-full sm:w-auto"
            >
              Read Bishop's Messages
              <ChevronRight size={16} />
            </Link>
            <Link
              to="/about/priest"
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-primary-600 border border-primary-300 hover:bg-primary-50 px-6 py-3 rounded-full transition-all duration-200 w-full sm:w-auto"
            >
              Meet Our Priests
            </Link>
          </div>
        </div>

        {/* ── Right — Bishop image ── */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-full max-w-sm lg:max-w-md">
            {/* Main image card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-neutral-900/20 w-full">
              <img
                src={greeting.bishopImageUrl}
                alt={greeting.bishopName}
                className="w-full object-cover object-top"
                style={{ height: "560px" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80";
                }}
              />

              {/* Gradient only at bottom for name card */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

              {/* Name card inside image */}
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-white font-bold text-sm leading-snug drop-shadow">
                  {greeting.bishopName}
                </p>
                <p className="text-primary-300 text-xs mt-0.5 drop-shadow">
                  {greeting.bishopTitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GreetingSection;
