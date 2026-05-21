import { useQuery } from "@tanstack/react-query";
import deaneryService, {
  type Deanery,
} from "../../services/about/deaneryService";

const TWENTY_FOUR_HOURS = 1000 * 60 * 60 * 24;

export const deaneryKeys = {
  all: ["deaneries"] as const,
};

export const useDeanery = () => {
  return useQuery<Deanery[], Error>({
    queryKey: deaneryKeys.all,
    queryFn: deaneryService.getDeaneries,
    staleTime: TWENTY_FOUR_HOURS,
    gcTime: TWENTY_FOUR_HOURS,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 1000,
  });
};
