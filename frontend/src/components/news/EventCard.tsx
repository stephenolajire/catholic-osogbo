import { Heart, Images } from "lucide-react";
import type { GalleryEvent } from "../../services/news/galleryService";

type Props = {
  event: GalleryEvent;
  onSelect: (event: GalleryEvent) => void;
};

const EventCard = ({ event, onSelect }: Props) => {
  const coverImage =
    event.coverImageUrl ||
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80";

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
      {/* Image */}
      <div className="relative h-56 overflow-hidden rounded-[28px] p-2 pb-0">
        <div className="relative h-full w-full overflow-hidden rounded-[22px]">
          <img
            src={coverImage}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80";
            }}
          />
        </div>

        {/* Favorite / heart button */}
        <button
          type="button"
          onClick={(e) => e.stopPropagation()}
          aria-label="Save event"
          className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-sm backdrop-blur-sm transition hover:bg-white"
        >
          <Heart size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-serif text-lg font-bold leading-tight text-neutral-900">
              {event.title}
            </h3>
            <p className="mt-1 text-sm text-neutral-500">{event.category}</p>
          </div>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-neutral-500">
          {event.description}
        </p>

        {/* Stats row */}
        <div className="mt-4 flex items-center gap-6 border-t border-neutral-100 pt-4">
          <div>
            <p className="text-sm font-semibold text-neutral-900">
              {event.imageCount}
            </p>
            <p className="mt-0.5 flex items-center gap-1 text-[11px] text-neutral-400">
              <Images size={11} />
              Photos
            </p>
          </div>
          <div className="h-8 w-px bg-neutral-100" />
          <div>
            <p className="text-sm font-semibold text-neutral-900">
              {event.date}
            </p>
            <p className="mt-0.5 text-[11px] text-neutral-400">Date</p>
          </div>
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={() => onSelect(event)}
          className="mt-5 flex w-full items-center justify-center rounded-full bg-neutral-900 py-3.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
        >
          See more
        </button>
      </div>
    </div>
  );
};

export default EventCard;
