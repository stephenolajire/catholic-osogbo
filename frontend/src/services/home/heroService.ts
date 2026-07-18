import apiClient from "../../api/apiClient";

export type Hero = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
};

const heroService = {
  getHero: async (): Promise<Hero> => {
    const { data } = await apiClient.get("/hero");
    return data;
  },

  getHeroes: async (): Promise<Hero[]> => {
    const { data } = await apiClient.get("/hero");
    return Array.isArray(data) ? data : [data];
  },

  getActiveHero: async (): Promise<Hero> => {
    const { data } = await apiClient.get("/hero/active");
    return data;
  },
};

export default heroService;
