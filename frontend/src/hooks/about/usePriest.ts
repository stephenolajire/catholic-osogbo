import { useQuery } from "@tanstack/react-query";
import priestService, {type Priest } from "../../services/about/priestService";

const TWENTY_FOUR_HOURS = 1000 * 60 * 60 * 24;

export const priestKeys = {
  all: ["priests"] as const,
};

export const usePriest = () => {
  return useQuery<Priest[], Error>({
    queryKey: priestKeys.all,
    queryFn: priestService.getPriests,
    staleTime: TWENTY_FOUR_HOURS,
    gcTime: TWENTY_FOUR_HOURS,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 1000,
  });
};
