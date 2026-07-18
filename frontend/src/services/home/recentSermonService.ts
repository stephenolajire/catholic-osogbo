import apiClient from "../../api/apiClient";

export type RecentSermon = {
  id: string;
  title: string;
  preacher: string;
  date: string;
  excerpt: string;
  imageUrl: string;
  link: string;
  fullMessage?: string;
};

const recentSermonService = {
  getRecentSermons: async (): Promise<RecentSermon[]> => {
    const { data } = await apiClient.get("/sermons/recent/");
    return data.results || data;
  },
};

export default recentSermonService;
