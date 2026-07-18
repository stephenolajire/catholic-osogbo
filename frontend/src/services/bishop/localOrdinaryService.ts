import apiClient from "../../api/apiClient";

export type LocalOrdinary = {
  id: string;
  title: string;
  heroImage: string;
  bishopImage: string;
  text: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

const localOrdinaryService = {
  getLatest: async (): Promise<LocalOrdinary> => {
    const { data } = await apiClient.get("/bishop/local-ordinary/latest/");

    return {
      id: data.id.toString(),
      title: data.title,
      heroImage: data.hero_image,
      bishopImage: data.bishop_image,
      text: data.text,
      isActive: data.is_active,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  },

  getAll: async (): Promise<LocalOrdinary[]> => {
    const { data } = await apiClient.get("/bishop/local-ordinary/");

    const items = Array.isArray(data.results) ? data.results : data;

    return items.map((item: any) => ({
      id: item.id.toString(),
      title: item.title,
      heroImage: item.hero_image,
      bishopImage: item.bishop_image,
      text: item.text,
      isActive: item.is_active,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    }));
  },
};

export default localOrdinaryService;
