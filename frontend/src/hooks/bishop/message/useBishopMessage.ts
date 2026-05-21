import { useQuery } from "@tanstack/react-query";
import bishopMessageService, {
 type BishopMessageResponse,
} from "../../../services/bishop/bishopMessageService";

const TEN_MINUTES = 1000 * 60 * 10;

export const bishopMessageKeys = {
  all: ["bishop-messages"] as const,
  page: (page: number) => ["bishop-messages", page] as const,
};

export const useBishopMessages = (page = 1) => {
  return useQuery<BishopMessageResponse, Error>({
    queryKey: bishopMessageKeys.page(page),
    queryFn: () => bishopMessageService.getMessages(page),
    staleTime: TEN_MINUTES,
    gcTime: TEN_MINUTES,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 1000,
    placeholderData: (prev) => prev,
  });
};
