import { useQuery } from "@tanstack/react-query";
import institutionService, {
  type InstitutionCategory,
  type InstitutionSubcategory,
} from "../../services/home/institutionService";

const ONE_DAY = 1000 * 60 * 60 * 24;

export const institutionKeys = {
  all: ["institutions"] as const,
  categories: ["institutions", "categories"] as const,
  category: (categoryKey: string) =>
    ["institutions", "category", categoryKey] as const,
  subcategory: (categoryKey: string, subcategoryId: string) =>
    [
      "institutions",
      "category",
      categoryKey,
      "subcategory",
      subcategoryId,
    ] as const,
};

export const useInstitutionCategories = () => {
  return useQuery<InstitutionCategory[], Error>({
    queryKey: institutionKeys.categories,
    queryFn: institutionService.getCategories,
    staleTime: ONE_DAY,
    gcTime: ONE_DAY,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 1000,
  });
};

export const useInstitutionCategory = (categoryKey: string) => {
  return useQuery<InstitutionCategory, Error>({
    queryKey: institutionKeys.category(categoryKey),
    queryFn: () => institutionService.getCategoryByKey(categoryKey),
    staleTime: ONE_DAY,
    gcTime: ONE_DAY,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 1000,
    enabled: !!categoryKey,
  });
};

export const useInstitutionSubcategory = (
  categoryKey: string,
  subcategoryId: string,
) => {
  return useQuery<InstitutionSubcategory, Error>({
    queryKey: institutionKeys.subcategory(categoryKey, subcategoryId),
    queryFn: () =>
      institutionService.getSubcategory(categoryKey, subcategoryId),
    staleTime: ONE_DAY,
    gcTime: ONE_DAY,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 1000,
    enabled: !!categoryKey && !!subcategoryId,
  });
};
