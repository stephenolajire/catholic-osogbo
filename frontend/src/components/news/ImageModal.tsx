import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryEvent } from "../../services/news/galleryService";

type Props = {
  event: GalleryEvent | null;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
};

export const ImageModal = ({ event, isOpen, isLoading, onClose }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = event?.images ?? [];
  const currentImage = images[currentIndex];

  const imagesRef = useRef(images);
  imagesRef.current = images;

  const handleNext = () => {
    const len = imagesRef.current.length;
    if (len === 0) return;
    setCurrentIndex((prev) => (prev + 1) % len);
  };

  const handlePrev = () => {
    const len = imagesRef.current.length;
    if (len === 0) return;
    setCurrentIndex((prev) => (prev - 1 + len) % len);
  };

  // Reset to first image whenever a new event is opened
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
    }
  }, [isOpen, event?.id]);

 
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !event) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-0 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${event.title} photo viewer`}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[60] flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        aria-label="Close gallery"
      >
        <X size={20} />
      </button>

      {/* Main Content */}
      <div className="flex h-full w-full flex-col overflow-hidden md:h-[88vh] md:w-11/12 md:max-w-5xl md:rounded-3xl md:border md:border-white/10 md:bg-neutral-950">
        {/* Header */}
        <div className="hidden shrink-0 border-b border-white/10 bg-neutral-900/80 px-6 py-4 backdrop-blur-sm md:block">
          <h2 className="font-serif text-xl font-bold text-white">
            {event.title}
          </h2>
          <p className="mt-1 text-sm text-neutral-400">{event.date}</p>
        </div>

        {/* Image Container */}
        <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-black">
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-[3px] border-white/20 border-t-white" />
            </div>
          ) : currentImage ? (
            <>
              <img
                src={currentImage.imageUrl ?? undefined}
                alt={currentImage.title || `Image ${currentIndex + 1}`}
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80";
                }}
              />
              {currentImage.description && (
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/40 to-transparent px-6 py-4">
                  <p className="text-sm text-white md:text-base">
                    {currentImage.description}
                  </p>
                </div>
              )}
            </>
          ) : (
            <p className="text-sm text-neutral-500">No images available.</p>
          )}

          {/* Prev / next arrows overlaid directly on the image for large hit targets */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/60 md:left-5"
                aria-label="Previous image"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/60 md:right-5"
                aria-label="Next image"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}
        </div>

        {/* Footer with progress + thumbnails */}
        <div className="shrink-0 border-t border-white/10 bg-neutral-900/80 px-4 py-3 backdrop-blur-sm md:px-6 md:py-4">
          <div className="flex items-center justify-center gap-4">
            <span className="text-sm font-medium text-white">
              {images.length > 0 ? currentIndex + 1 : 0} / {images.length}
            </span>
            <div className="h-1 w-32 overflow-hidden rounded-full bg-white/10 hidden md:block">
              <div
                className="h-full bg-white transition-all duration-300"
                style={{
                  width: images.length
                    ? `${((currentIndex + 1) / images.length) * 100}%`
                    : "0%",
                }}
              />
            </div>
          </div>

          {/* Thumbnail strip — sits in normal flow, no longer overlaps footer controls */}
          {images.length > 1 && (
            <div className="mt-3 hidden gap-2 overflow-x-auto lg:flex">
              {images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                    idx === currentIndex
                      ? "border-white opacity-100"
                      : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                >
                  <img
                    src={img.imageUrl ?? undefined}
                    alt={`Thumbnail ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
