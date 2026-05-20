import apiClient from "../../api/apiClient";

export type Hero = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  ctaLabel: string;
  ctaLink: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

const heroService = {
  getHero: async (): Promise<Hero> => {
    const { data } = await apiClient.get("/hero");
    return data;
  },

  getHeroes: async (): Promise<Hero[]> => {
    const { data } = await apiClient.get("/heroes");
    return data;
  },

  getActiveHero: async (): Promise<Hero> => {
    const { data } = await apiClient.get("/heroes/active");
    return data;
  },
};

export default heroService;
