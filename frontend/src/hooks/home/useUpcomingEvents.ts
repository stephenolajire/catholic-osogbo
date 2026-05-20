import { useQuery } from "@tanstack/react-query";
import upcomingEventService, { type UpcomingEventItem } from "../../services/home/upcomingEventService";

const TWENTY_FOUR_HOURS = 1000 * 60 * 60 * 24;

export const upcomingEventKeys = {
  all: ["upcoming-events"] as const,
};

export const useUpcomingEvents = () => {
  return useQuery<UpcomingEventItem[], Error>({
    queryKey: upcomingEventKeys.all,
    queryFn: upcomingEventService.getUpcomingEvents,
    staleTime: TWENTY_FOUR_HOURS,
    gcTime: TWENTY_FOUR_HOURS,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 1000,
  });
};
