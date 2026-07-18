import { useQuery } from "@tanstack/react-query";
import coatOfArmService from "../../services/bishop/coatOfArmService";
import type { CoatOfArm } from "../../services/bishop/coatOfArmService";

export const useCoatOfArm = () => {
  return useQuery<CoatOfArm>({
    queryKey: ["coatOfArm", "latest"],
    queryFn: () => coatOfArmService.getLatest(),
    staleTime: 86400000, // 24 hours
    retry: 1,
  });
};

export const useCoatOfArmList = () => {
  return useQuery<CoatOfArm[]>({
    queryKey: ["coatOfArm", "list"],
    queryFn: () => coatOfArmService.getAll(),
    staleTime: 86400000, // 24 hours
    retry: 1,
  });
};
