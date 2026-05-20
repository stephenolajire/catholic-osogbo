import { useQuery } from "@tanstack/react-query";
import heroService, { type Hero } from "../../services/home/heroService";

const TWENTY_FOUR_HOURS = 1000 * 60 * 60 * 24;

// ── Query keys — centralised so they're easy to invalidate ──
export const heroKeys = {
  all: ["hero"] as const,
  lists: ["hero", "list"] as const,
  active: ["hero", "active"] as const,
};

// ── Single hero ──────────────────────────────────────────
export const useHero = () => {
  return useQuery<Hero, Error>({
    queryKey: heroKeys.all,
    queryFn: heroService.getHero,
    staleTime: TWENTY_FOUR_HOURS,
    gcTime: TWENTY_FOUR_HOURS,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 2,
  });
};

// ── All heroes ───────────────────────────────────────────
export const useHeroes = () => {
  return useQuery<Hero[], Error>({
    queryKey: heroKeys.lists,
    queryFn: heroService.getHeroes,
    staleTime: TWENTY_FOUR_HOURS,
    gcTime: TWENTY_FOUR_HOURS,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 2,
  });
};

// ── Active hero ──────────────────────────────────────────
export const useActiveHero = () => {
  return useQuery<Hero, Error>({
    queryKey: heroKeys.active,
    queryFn: heroService.getActiveHero,
    staleTime: TWENTY_FOUR_HOURS,
    gcTime: TWENTY_FOUR_HOURS,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 2,
  });
};
