import { useQuery } from "@tanstack/react-query";
import podcastService, {
  type Podcast,
} from "../../services/news/podcastService";

const TEN_MINUTES = 1000 * 60 * 10;

export const podcastKeys = {
  all: ["podcasts"] as const,
  paginated: (page: number) => [...podcastKeys.all, "paginated", page] as const,
  featured: ["podcasts", "featured"] as const,
  latest: ["podcasts", "latest"] as const,
  byId: (id: string) => [...podcastKeys.all, "byId", id] as const,
};

export const usePodcasts = (page = 1, perPage = 10) => {
  return useQuery({
    queryKey: podcastKeys.paginated(page),
    queryFn: () => podcastService.getPodcasts(page, perPage),
    staleTime: TEN_MINUTES,
    gcTime: TEN_MINUTES * 6,
    retry: 1,
    retryDelay: 1000,
    placeholderData: { results: [], count: 0 },
  });
};

export const useFeaturedPodcasts = () => {
  return useQuery({
    queryKey: podcastKeys.featured,
    queryFn: () => podcastService.getFeatured(),
    staleTime: TEN_MINUTES,
    gcTime: TEN_MINUTES * 6,
    retry: 1,
    retryDelay: 1000,
  });
};

export const useLatestPodcast = () => {
  return useQuery({
    queryKey: podcastKeys.latest,
    queryFn: () => podcastService.getLatest(),
    staleTime: TEN_MINUTES,
    gcTime: TEN_MINUTES * 6,
    retry: 1,
    retryDelay: 1000,
  });
};

export const usePodcastById = (id: string) => {
  return useQuery({
    queryKey: podcastKeys.byId(id),
    queryFn: () => podcastService.getPodcastById(id),
    staleTime: TEN_MINUTES,
    gcTime: TEN_MINUTES * 6,
    retry: 1,
    retryDelay: 1000,
    enabled: !!id,
  });
};
