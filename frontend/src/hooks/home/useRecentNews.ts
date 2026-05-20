import { useQuery } from "@tanstack/react-query";
import recentNewsService, { type RecentNewsItem } from "../../services/home/recentNewsService";

const TWENTY_FOUR_HOURS = 1000 * 60 * 60 * 24;

export const recentNewsKeys = {
  all: ["recent-news"] as const,
};

export const useRecentNews = () => {
  return useQuery<RecentNewsItem[], Error>({
    queryKey: recentNewsKeys.all,
    queryFn: recentNewsService.getRecentNews,
    staleTime: TWENTY_FOUR_HOURS,
    gcTime: TWENTY_FOUR_HOURS,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 1000,
  });
};
