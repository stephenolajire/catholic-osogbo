import { useQuery } from "@tanstack/react-query";
import videoService, { type Video } from "../../services/news/videoService";

const TEN_MINUTES = 1000 * 60 * 10;

export const videoKeys = {
  all: ["videos"] as const,
  paginated: (page: number) => [...videoKeys.all, "paginated", page] as const,
  featured: ["videos", "featured"] as const,
  latest: ["videos", "latest"] as const,
  byId: (id: string) => [...videoKeys.all, "byId", id] as const,
};

export const useVideos = (page = 1, perPage = 10) => {
  return useQuery({
    queryKey: videoKeys.paginated(page),
    queryFn: () => videoService.getVideos(page, perPage),
    staleTime: TEN_MINUTES,
    gcTime: TEN_MINUTES * 6,
    retry: 1,
    retryDelay: 1000,
    placeholderData: { results: [], count: 0 },
  });
};

export const useFeaturedVideos = () => {
  return useQuery({
    queryKey: videoKeys.featured,
    queryFn: () => videoService.getFeatured(),
    staleTime: TEN_MINUTES,
    gcTime: TEN_MINUTES * 6,
    retry: 1,
    retryDelay: 1000,
  });
};

export const useLatestVideo = () => {
  return useQuery({
    queryKey: videoKeys.latest,
    queryFn: () => videoService.getLatest(),
    staleTime: TEN_MINUTES,
    gcTime: TEN_MINUTES * 6,
    retry: 1,
    retryDelay: 1000,
  });
};

export const useVideoById = (id: string) => {
  return useQuery({
    queryKey: videoKeys.byId(id),
    queryFn: () => videoService.getVideoById(id),
    staleTime: TEN_MINUTES,
    gcTime: TEN_MINUTES * 6,
    retry: 1,
    retryDelay: 1000,
    enabled: !!id,
  });
};
