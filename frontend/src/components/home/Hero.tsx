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
    image:
      "https://images.unsplash.com/photo-1519817650390-64a93db51149?w=1600&q=80",
    isActive: true,
    displayOrder: 0,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    title: "Growing Together in Christ",
    subtitle: "One Body, One Spirit",
    description:
      "Our parishes stand as pillars of community places of worship, fellowship, and spiritual growth for all.",
    image:
      "https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=1600&q=80",
    isActive: true,
    displayOrder: 1,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "3",
    title: "Serving With Compassion",
    subtitle: "Ministry in Action",
    description:
      "From education to healthcare, our institutions exist to serve every soul entrusted to our care.",
    image:
      "https://images.unsplash.com/photo-1519817650390-64a93db51149?w=1600&q=80",
    isActive: true,
    displayOrder: 2,
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
  image: string;
  isActive: boolean;
  displayOrder: number;
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

  const goTo = useCallback(
    (index: number) => {
      if (animating || index === current) return;
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
    goTo(index);
  }, [current, slides.length, goTo]);

  const next = useCallback(() => {
    const index = (current + 1) % slides.length;
    goTo(index);
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
    <section className="relative h-[90vh] min-h-140 w-full overflow-hidden bg-stone-900">
      {/* ── Slides ── */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out
            ${i === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
        >
          {/* Background image */}
          <img
            src={s.image}
            alt={s.title}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-stone-950/85 via-stone-950/50 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-stone-950/70 via-transparent to-transparent" />
        </div>
      ))}

      {/* ── Content ── */}
      <div className="relative z-20 flex h-full max-w-4xl flex-col justify-end px-6 pb-24 md:px-16 lg:px-24">
        {/* Subtitle pill */}
        <div
          key={`subtitle-${current}`}
          className="mb-4 inline-flex items-center gap-2"
          style={{ animation: "fadeInUp 0.5s ease forwards" }}
        >
          <span className="h-0.5 w-6 bg-stone-400" />
          <span className="text-xs font-semibold uppercase tracking-widest text-stone-300">
            {slide.subtitle}
          </span>
        </div>

        {/* Title */}
        <h1
          key={`title-${current}`}
          className="mb-4 font-serif text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
          style={{ animation: "fadeInUp 0.6s ease 0.1s both" }}
        >
          {slide.title}
        </h1>

        {/* Description */}
        <p
          key={`desc-${current}`}
          className="mb-8 max-w-xl text-base font-light leading-relaxed text-stone-300 md:text-lg"
          style={{ animation: "fadeInUp 0.6s ease 0.2s both" }}
        >
          {slide.description}
        </p>

        {/* CTA Button */}
        <div
          key={`cta-${current}`}
          className="flex items-center gap-4"
          style={{ animation: "fadeInUp 0.6s ease 0.3s both" }}
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-stone-900 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-stone-100"
          >
            Get In Touch
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>

      {/* ── Prev / Next arrows ── */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-2 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2
          items-center justify-center rounded-full border border-white/15
          bg-white/10 text-white backdrop-blur-sm transition-all duration-200
          hover:-translate-y-1/2 hover:scale-110 hover:bg-white/20 md:left-8 md:h-12 md:w-12"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-2 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2
          items-center justify-center rounded-full border border-white/15
          bg-white/10 text-white backdrop-blur-sm transition-all duration-200
          hover:-translate-y-1/2 hover:scale-110 hover:bg-white/20 md:right-8 md:h-12 md:w-12"
      >
        <ChevronRight size={20} />
      </button>

      {/* ── Dot indicators ── */}
      <div className="absolute bottom-8 left-6 z-30 flex items-center gap-2 md:left-16 lg:left-24">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "h-2 w-8 bg-white"
                : "h-2 w-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* ── Slide counter ── */}
      <div className="absolute bottom-8 right-6 z-30 font-mono text-xs tracking-widest text-white/50 md:right-16">
        {String(current + 1).padStart(2, "0")} /{" "}
        {String(slides.length).padStart(2, "0")}
      </div>

      {/* ── Progress bar ── */}
      <div className="absolute bottom-0 left-0 z-30 h-0.5 w-full bg-white/10">
        <div
          key={current}
          className="h-full bg-white"
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
