import { Search } from "lucide-react";
import type { GalleryEvent } from "../../services/news/galleryService";
import EventCard from "./EventCard";

type Props = {
  events: GalleryEvent[];
  isLoading: boolean;
  onSelectEvent: (event: GalleryEvent) => void;
};

const SkeletonCard = () => (
  <div className="rounded-2xl border border-amber-100/60 overflow-hidden animate-pulse bg-white">
    <div className="h-48 bg-linear-to-br from-amber-100 to-orange-100" />
    <div className="p-5 space-y-3">
      <div className="h-4 bg-amber-100 rounded-full w-24" />
      <div className="h-5 bg-amber-50 rounded-full w-full" />
      <div className="h-4 bg-amber-50 rounded-full w-3/4" />
      <div className="h-4 bg-amber-50 rounded-full w-32 mt-4" />
    </div>
  </div>
);

const EventGalleryGrid = ({ events, isLoading, onSelectEvent }: Props) => {
  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!events.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-20 h-20 bg-linear-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
          <Search size={32} className="text-amber-600/50" />
        </div>
        <p className="text-amber-950 font-serif font-bold text-xl mb-2">
          No galleries yet
        </p>
        <p className="text-amber-700/70 text-base">
          Event galleries will appear here as they are added.
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} onSelect={onSelectEvent} />
      ))}
    </div>
  );
};

export default EventGalleryGrid;
