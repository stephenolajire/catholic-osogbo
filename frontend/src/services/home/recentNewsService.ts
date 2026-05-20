import apiClient from "../../api/apiClient";

export type RecentNewsItem = {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
  category: string;
  link: string;
};

const recentNewsService = {
  getRecentNews: async (): Promise<RecentNewsItem[]> => {
    const { data } = await apiClient.get("/news/recent");
    return data;
  },
};

export default recentNewsService;
