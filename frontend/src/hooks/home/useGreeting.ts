import { useQuery } from "@tanstack/react-query";
import greetingService, {type Greeting } from "../../services/home/greetingService";

const TWENTY_FOUR_HOURS = 1000 * 60 * 60 * 24;

export const greetingKeys = {
  all: ["greeting"] as const,
};

export const useGreeting = () => {
  return useQuery<Greeting, Error>({
    queryKey: greetingKeys.all,
    queryFn: greetingService.getGreeting,
    staleTime: TWENTY_FOUR_HOURS,
    gcTime: TWENTY_FOUR_HOURS,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 1, 
    retryDelay: 1000,
  });
};
