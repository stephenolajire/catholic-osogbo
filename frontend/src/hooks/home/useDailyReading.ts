import { useQuery } from "@tanstack/react-query";
import dailyReadingService, { type DailyReading } from "../../services/home/dailyReadingService";

const TWENTY_FOUR_HOURS = 1000 * 60 * 60 * 24;

export const dailyReadingKeys = {
  all: ["daily-reading"] as const,
};

export const useDailyReading = () => {
  return useQuery<DailyReading, Error>({
    queryKey: dailyReadingKeys.all,
    queryFn: dailyReadingService.getDailyReading,
    staleTime: TWENTY_FOUR_HOURS,
    gcTime: TWENTY_FOUR_HOURS,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 1000,
  });
};
