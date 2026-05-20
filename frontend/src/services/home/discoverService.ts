import apiClient from "../../api/apiClient";

export type DiscoverMessage = {
  id: string;
  title: string;
  excerpt: string;
  fullMessage: string;
  imageUrl: string;
  date: string;
  category: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

const discoverService = {
  getMessages: async (): Promise<DiscoverMessage[]> => {
    const { data } = await apiClient.get("/discover/messages");
    return data;
  },
};

export default discoverService;
