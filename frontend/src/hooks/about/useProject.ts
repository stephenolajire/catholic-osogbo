import { useQuery } from "@tanstack/react-query";
import projectService, {
  type Project,
} from "../../services/about/projectService";

const TWENTY_FOUR_HOURS = 1000 * 60 * 60 * 24;

export const projectKeys = {
  all: ["projects"] as const,
};

export const useProject = () => {
  return useQuery<Project[], Error>({
    queryKey: projectKeys.all,
    queryFn: projectService.getProjects,
    staleTime: TWENTY_FOUR_HOURS,
    gcTime: TWENTY_FOUR_HOURS,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 1000,
  });
};
