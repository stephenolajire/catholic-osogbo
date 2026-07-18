import { useQuery } from "@tanstack/react-query";
import galleryService, {
  type GalleryEvent,
} from "../../services/news/galleryService";

const TEN_MINUTES = 1000 * 60 * 10;

export const galleryKeys = {
  all: ["gallery"] as const,
  paginated: (page: number) => [...galleryKeys.all, "paginated", page] as const,
  featured: ["gallery", "featured"] as const,
  latest: ["gallery", "latest"] as const,
  byId: (id: string) => [...galleryKeys.all, "byId", id] as const,
  images: (eventId: string) => [...galleryKeys.all, "images", eventId] as const,
};

export const useGalleryEvents = (page = 1, perPage = 10) => {
  return useQuery({
    queryKey: galleryKeys.paginated(page),
    queryFn: () => galleryService.getGalleryEvents(page, perPage),
    staleTime: TEN_MINUTES,
    gcTime: TEN_MINUTES * 6,
    retry: 1,
    retryDelay: 1000,
    placeholderData: { results: [], count: 0 },
  });
};

export const useFeaturedGalleryEvents = () => {
  return useQuery({
    queryKey: galleryKeys.featured,
    queryFn: () => galleryService.getFeatured(),
    staleTime: TEN_MINUTES,
    gcTime: TEN_MINUTES * 6,
    retry: 1,
    retryDelay: 1000,
  });
};

export const useLatestGalleryEvent = () => {
  return useQuery({
    queryKey: galleryKeys.latest,
    queryFn: () => galleryService.getLatest(),
    staleTime: TEN_MINUTES,
    gcTime: TEN_MINUTES * 6,
    retry: 1,
    retryDelay: 1000,
  });
};

export const useGalleryEvent = (id: string) => {
  return useQuery({
    queryKey: galleryKeys.byId(id),
    queryFn: () => galleryService.getGalleryEventById(id),
    staleTime: TEN_MINUTES,
    gcTime: TEN_MINUTES * 6,
    retry: 1,
    retryDelay: 1000,
    enabled: !!id,
  });
};

export const useGalleryEventImages = (eventId: string) => {
  return useQuery({
    queryKey: galleryKeys.images(eventId),
    queryFn: () => galleryService.getGalleryEventImages(eventId),
    staleTime: TEN_MINUTES,
    gcTime: TEN_MINUTES * 6,
    retry: 1,
    retryDelay: 1000,
    enabled: !!eventId,
  });
};
