import { useActiveHero } from "../../hooks/home/useHero";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// ── Default fallback data ─────────────────────────────────
const DEFAULT_SLIDES = [
  {
    id: "1",
    title: "Welcome to Our Diocese",
    subtitle: "Faith, Hope & Love",
    description:
      "Join us as we journey together in faith, serving God and our community with devotion and compassion.",
    imageUrl:
      "https://images.unsplash.com/photo-1519817650390-64a93db51149?w=1600&q=80",
    ctaLabel: "Explore More",
    ctaLink: "/about/priest",
    isActive: true,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    title: "Growing Together in Christ",
    subtitle: "One Body, One Spirit",
    description:
      "Our parishes stand as pillars of community places of worship, fellowship, and spiritual growth for all.",
    imageUrl:
      "https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=1600&q=80",
    ctaLabel: "Our Parishes",
    ctaLink: "/about/parishes",
    isActive: true,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "3",
    title: "Serving With Compassion",
    subtitle: "Ministry in Action",
    description:
      "From education to healthcare, our institutions exist to serve every soul entrusted to our care.",
    imageUrl:
      "https://images.unsplash.com/photo-1519817650390-64a93db51149?w=1600&q=80",
    ctaLabel: "Our Institutions",
    ctaLink: "/institutions/education",
    isActive: true,
    createdAt: "",
    updatedAt: "",
  },
];

// ── Types ─────────────────────────────────────────────────
type Slide = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  ctaLabel: string;
  ctaLink: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

// ── Hero Carousel ─────────────────────────────────────────
const HeroSection = () => {
  const { data, isLoading, isError } = useActiveHero();

  // Fall back to defaults if no server data
  const slides: Slide[] =
    !isLoading && !isError && Array.isArray(data)
      ? (data as unknown as Slide[])
      : DEFAULT_SLIDES;

  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  console.log(direction);
  const goTo = useCallback(
    (index: number, dir: "left" | "right") => {
      if (animating || index === current) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setAnimating(false);
      }, 500);
    },
    [animating, current],
  );

  const prev = useCallback(() => {
    const index = (current - 1 + slides.length) % slides.length;
    goTo(index, "left");
  }, [current, slides.length, goTo]);

  const next = useCallback(() => {
    const index = (current + 1) % slides.length;
    goTo(index, "right");
  }, [current, slides.length, goTo]);

  // Auto-advance every 6 seconds
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  const slide = slides[current];

  return (
    <section className="relative w-full h-[90vh] min-h-140 overflow-hidden bg-neutral-900">
      {/* ── Slides ── */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out
            ${i === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
        >
          {/* Background image */}
          <img
            src={s.imageUrl}
            alt={s.title}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
        </div>
      ))}

      {/* ── Content ── */}
      <div className="relative z-20 flex flex-col justify-end h-full pb-24 px-6 md:px-16 lg:px-24 max-w-4xl">
        {/* Subtitle pill */}
        <div
          key={`subtitle-${current}`}
          className="inline-flex items-center gap-2 mb-4 animate-fade-in-up"
          style={{ animation: "fadeInUp 0.5s ease forwards" }}
        >
          <span className="w-6 h-0.5 bg-primary-400" />
          <span className="text-primary-300 text-xs font-semibold uppercase tracking-widest">
            {slide.subtitle}
          </span>
        </div>

        {/* Title */}
        <h1
          key={`title-${current}`}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
          style={{ animation: "fadeInUp 0.6s ease 0.1s both" }}
        >
          {slide.title}
        </h1>

        {/* Description */}
        <p
          key={`desc-${current}`}
          className="text-neutral-300 text-base md:text-lg max-w-xl mb-8 leading-relaxed"
          style={{ animation: "fadeInUp 0.6s ease 0.2s both" }}
        >
          {slide.description}
        </p>

        {/* CTA */}
        <div
          key={`cta-${current}`}
          className="flex items-center gap-4"
          style={{ animation: "fadeInUp 0.6s ease 0.3s both" }}
        >
          <Link
            to={slide.ctaLink}
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-6 py-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-primary-900/40 hover:-translate-y-0.5"
          >
            {slide.ctaLabel}
            <ChevronRight size={16} />
          </Link>
          <Link
            to="/contact"
            className="text-sm font-semibold text-white/80 hover:text-white border border-white/30 hover:border-white/60 px-6 py-3 rounded-full transition-all duration-200"
          >
            Get In Touch
          </Link>
        </div>
      </div>

      {/* ── Prev / Next arrows ── */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-30
          w-10 h-10 md:w-12 md:h-12 flex items-center justify-center
          rounded-full bg-white/10 hover:bg-white/20 border border-white/20
          text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-1/2 hover:scale-110"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-30
          w-10 h-10 md:w-12 md:h-12 flex items-center justify-center
          rounded-full bg-white/10 hover:bg-white/20 border border-white/20
          text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-1/2 hover:scale-110"
      >
        <ChevronRight size={20} />
      </button>

      {/* ── Dot indicators ── */}
      <div className="absolute bottom-8 left-6 md:left-16 lg:left-24 z-30 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? "right" : "left")}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-300 rounded-full
              ${
                i === current
                  ? "w-8 h-2 bg-primary-500"
                  : "w-2 h-2 bg-white/40 hover:bg-white/70"
              }`}
          />
        ))}
      </div>

      {/* ── Slide counter ── */}
      <div className="absolute bottom-8 right-6 md:right-16 z-30 text-white/50 text-xs font-mono tracking-widest">
        {String(current + 1).padStart(2, "0")} /{" "}
        {String(slides.length).padStart(2, "0")}
      </div>

      {/* ── Progress bar ── */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white/10 z-30">
        <div
          key={current}
          className="h-full bg-primary-500"
          style={{ animation: "progress 6s linear forwards" }}
        />
      </div>

      {/* ── Keyframe styles ── */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes progress {
          from { width: 0%;    }
          to   { width: 100%;  }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
