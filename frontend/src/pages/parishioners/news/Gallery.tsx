import { useState, useMemo } from "react";
import GalleryHero from "../../../components/news/GalleryHero";
import EventGalleryGrid from "../../../components/news/EventGalleryGrid";
import { ImageModal } from "../../../components/news/ImageModal";
import {
  useGalleryEvents,
  useGalleryEvent,
} from "../../../hooks/news/useGallery";
import { useGallerySettings } from "../../../hooks/news/useGallerySettings";
import type { GalleryEvent } from "../../../services/news/galleryService";

const Gallery = () => {
  const { data: eventsData, isLoading: eventsLoading } = useGalleryEvents(
    1,
    100,
  );
  const { data: gallerySettings } = useGallerySettings();
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const { data: selectedEvent, isLoading: eventLoading } = useGalleryEvent(
    selectedEventId || "",
  );

  const displayEvents = eventsData?.results || [];

  // Calculate total images
  const totalImages = useMemo(
    () => displayEvents.reduce((sum, event) => sum + event.imageCount, 0),
    [displayEvents],
  );

  const handleSelectEvent = (event: GalleryEvent) => {
    setSelectedEventId(event.id);
  };

  const handleCloseModal = () => {
    setSelectedEventId(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <GalleryHero
        totalEvents={displayEvents.length}
        totalImages={totalImages}
        heroImageUrl={gallerySettings?.heroImageUrl || null}
      />

      {/* Gallery Grid Section */}
      <section className="px-6 md:px-16 lg:px-24 py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <EventGalleryGrid
            events={displayEvents}
            isLoading={eventsLoading}
            onSelectEvent={handleSelectEvent}
          />
        </div>
      </section>

      {/* Image Modal */}
      <ImageModal
        event={selectedEvent || null}
        isOpen={selectedEventId !== null}
        isLoading={eventLoading}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Gallery;
