import apiClient from "../../api/apiClient";

export type BishopMessage = {
  id: string;
  title: string;
  excerpt: string;
  fullMessage: string;
  imageUrl: string;
  date: string;
  category:
    | "Pastoral Letter"
    | "Bishop's Message"
    | "Reflection"
    | "Homily"
    | "Encyclical";
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type BishopMessageResponse = {
  messages: BishopMessage[];
  total: number;
  page: number;
  totalPages: number;
  perPage: number;
};

const bishopMessageService = {
  getMessages: async (
    page = 1,
    perPage = 9,
  ): Promise<BishopMessageResponse> => {
    const { data } = await apiClient.get("/bishop/messages", {
      params: { page, perPage },
    });
    return data;
  },
};

export default bishopMessageService;
