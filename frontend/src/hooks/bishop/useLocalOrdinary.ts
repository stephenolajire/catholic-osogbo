import { useQuery } from "@tanstack/react-query";
import localOrdinaryService from "../../services/bishop/localOrdinaryService";
import type { LocalOrdinary } from "../../services/bishop/localOrdinaryService";

export const useLocalOrdinary = () => {
  return useQuery<LocalOrdinary>({
    queryKey: ["localOrdinary", "latest"],
    queryFn: () => localOrdinaryService.getLatest(),
    staleTime: 86400000, // 24 hours
    retry: 1,
  });
};

export const useLocalOrdinaryList = () => {
  return useQuery<LocalOrdinary[]>({
    queryKey: ["localOrdinary", "list"],
    queryFn: () => localOrdinaryService.getAll(),
    staleTime: 86400000, // 24 hours
    retry: 1,
  });
};
