import { useQuery } from "@tanstack/react-query";
import gallerySettingsService, {
  type GallerySetting,
} from "../../services/news/gallerySettingsService";

const TEN_MINUTES = 1000 * 60 * 10;

export const gallerySettingsKeys = {
  all: ["gallerySettings"] as const,
  current: ["gallerySettings", "current"] as const,
};

export const useGallerySettings = () => {
  return useQuery({
    queryKey: gallerySettingsKeys.current,
    queryFn: () => gallerySettingsService.getSettings(),
    staleTime: TEN_MINUTES,
    gcTime: TEN_MINUTES * 6,
    retry: 1,
    retryDelay: 1000,
  });
};
