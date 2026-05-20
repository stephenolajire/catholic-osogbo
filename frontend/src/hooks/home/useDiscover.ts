import { useQuery } from "@tanstack/react-query";
import discoverService, {
  type DiscoverMessage,
} from "../../services/home/discoverService";

const TWENTY_FOUR_HOURS = 1000 * 60 * 60 * 24;

export const discoverKeys = {
  all: ["discover", "messages"] as const,
};

export const useDiscover = () => {
  return useQuery<DiscoverMessage[], Error>({
    queryKey: discoverKeys.all,
    queryFn: discoverService.getMessages,
    staleTime: TWENTY_FOUR_HOURS,
    gcTime: TWENTY_FOUR_HOURS,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 1000,
  });
};
