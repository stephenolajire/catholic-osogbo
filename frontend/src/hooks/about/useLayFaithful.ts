import { useQuery } from "@tanstack/react-query";
import layFaithfulService, {
  type LayAssociation,
} from "../../services/about/layFaithfulService";

const TWENTY_FOUR_HOURS = 1000 * 60 * 60 * 24;

export const layFaithfulKeys = {
  all: ["lay-faithful"] as const,
};

export const useLayFaithful = () => {
  return useQuery<LayAssociation[], Error>({
    queryKey: layFaithfulKeys.all,
    queryFn: layFaithfulService.getLayAssociations,
    staleTime: TWENTY_FOUR_HOURS,
    gcTime: TWENTY_FOUR_HOURS,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 1000,
  });
};
