import { useQuery } from "@tanstack/react-query";
import newsService, { type News } from "../../services/news/newsService";

const TEN_MINUTES = 1000 * 60 * 10;

export const newsKeys = {
  all: ["news"] as const,
  paginated: (page: number) => [...newsKeys.all, "paginated", page] as const,
  featured: ["news", "featured"] as const,
  latest: ["news", "latest"] as const,
  byId: (id: string) => [...newsKeys.all, "byId", id] as const,
  byCategory: (category: string) =>
    [...newsKeys.all, "byCategory", category] as const,
};

export const useNews = (page = 1, perPage = 10) => {
  return useQuery({
    queryKey: newsKeys.paginated(page),
    queryFn: () => newsService.getNews(page, perPage),
    staleTime: TEN_MINUTES,
    gcTime: TEN_MINUTES * 6,
    retry: 1,
    retryDelay: 1000,
    placeholderData: { results: [], count: 0 },
  });
};

export const useFeaturedNews = () => {
  return useQuery({
    queryKey: newsKeys.featured,
    queryFn: () => newsService.getFeatured(),
    staleTime: TEN_MINUTES,
    gcTime: TEN_MINUTES * 6,
    retry: 1,
    retryDelay: 1000,
  });
};

export const useLatestNews = () => {
  return useQuery({
    queryKey: newsKeys.latest,
    queryFn: () => newsService.getLatest(),
    staleTime: TEN_MINUTES,
    gcTime: TEN_MINUTES * 6,
    retry: 1,
    retryDelay: 1000,
  });
};

export const useNewsById = (id: string) => {
  return useQuery({
    queryKey: newsKeys.byId(id),
    queryFn: () => newsService.getNewsById(id),
    staleTime: TEN_MINUTES,
    gcTime: TEN_MINUTES * 6,
    retry: 1,
    retryDelay: 1000,
    enabled: !!id,
  });
};

export const useNewsByCategory = (
  category: "news" | "event" | "announcement",
) => {
  return useQuery({
    queryKey: newsKeys.byCategory(category),
    queryFn: () => newsService.getByCategory(category),
    staleTime: TEN_MINUTES,
    gcTime: TEN_MINUTES * 6,
    retry: 1,
    retryDelay: 1000,
  });
};
