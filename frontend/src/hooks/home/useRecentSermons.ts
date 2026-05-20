import { useQuery } from "@tanstack/react-query";
import recentSermonService, { type RecentSermon } from "../../services/home/recentSermonService";

const TWENTY_FOUR_HOURS = 1000 * 60 * 60 * 24;

export const recentSermonKeys = {
  all: ["recent-sermons"] as const,
};

export const useRecentSermons = () => {
  return useQuery<RecentSermon[], Error>({
    queryKey: recentSermonKeys.all,
    queryFn: recentSermonService.getRecentSermons,
    staleTime: TWENTY_FOUR_HOURS,
    gcTime: TWENTY_FOUR_HOURS,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 1000,
  });
};
