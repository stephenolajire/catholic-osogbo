import { useQuery } from "@tanstack/react-query";
import parishService, { type Parish } from "../../services/about/parishService";

const TWENTY_FOUR_HOURS = 1000 * 60 * 60 * 24;

export const parishKeys = {
  all: ["parishes"] as const,
};

export const useParish = () => {
  return useQuery<Parish[], Error>({
    queryKey: parishKeys.all,
    queryFn: parishService.getParishes,
    staleTime: TWENTY_FOUR_HOURS,
    gcTime: TWENTY_FOUR_HOURS,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 1000,
  });
};
