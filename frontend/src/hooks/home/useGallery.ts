import { useQuery } from "@tanstack/react-query";
import galleryService, {
  type GalleryEvent,
} from "../../services/home/galleryService";

const ONE_DAY = 1000 * 60 * 60 * 24;

export const galleryKeys = {
  all: ["gallery"] as const,
  events: ["gallery", "events"] as const,
  event: (eventId: string) => ["gallery", "event", eventId] as const,
};

export const useGalleryEvents = () => {
  return useQuery<GalleryEvent[], Error>({
    queryKey: galleryKeys.events,
    queryFn: galleryService.getGalleryEvents,
    staleTime: ONE_DAY,
    gcTime: ONE_DAY,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 1000,
  });
};

export const useGalleryEvent = (eventId: string) => {
  return useQuery<GalleryEvent, Error>({
    queryKey: galleryKeys.event(eventId),
    queryFn: () => galleryService.getGalleryEvent(eventId),
    staleTime: ONE_DAY,
    gcTime: ONE_DAY,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 1000,
    enabled: !!eventId,
  });
};
