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
  displayOrder: number;
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
    const { data } = await apiClient.get("/bishop/messages/", {
      params: { page, page_size: perPage },
    });

    const messages = Array.isArray(data.results) ? data.results : [data];
    const transformedMessages: BishopMessage[] = messages.map((msg: any) => ({
      id: msg.id.toString(),
      title: msg.title,
      excerpt: msg.excerpt,
      fullMessage: msg.full_message,
      imageUrl: msg.image,
      date: new Date(msg.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      category: msg.category,
      isFeatured: msg.featured,
      isActive: msg.is_active,
      displayOrder: msg.display_order,
      createdAt: msg.created_at,
      updatedAt: msg.updated_at,
    }));

    return {
      messages: transformedMessages,
      total: data.count,
      page,
      totalPages: Math.ceil(data.count / perPage),
      perPage,
    };
  },

  getFeatured: async (): Promise<BishopMessage[]> => {
    const { data } = await apiClient.get("/bishop/messages/featured/");

    const messages = Array.isArray(data.results) ? data.results : data;

    return messages.map((msg: any) => ({
      id: msg.id.toString(),
      title: msg.title,
      excerpt: msg.excerpt,
      fullMessage: msg.full_message,
      imageUrl: msg.image,
      date: new Date(msg.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      category: msg.category,
      isFeatured: msg.featured,
      isActive: msg.is_active,
      displayOrder: msg.display_order,
      createdAt: msg.created_at,
      updatedAt: msg.updated_at,
    }));
  },

  getMessageById: async (id: string): Promise<BishopMessage> => {
    const { data } = await apiClient.get(`/bishop/messages/${id}/`);

    return {
      id: data.id.toString(),
      title: data.title,
      excerpt: data.excerpt,
      fullMessage: data.full_message,
      imageUrl: data.image,
      date: new Date(data.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      category: data.category,
      isFeatured: data.featured,
      isActive: data.is_active,
      displayOrder: data.display_order,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  },

  getLatest: async (): Promise<BishopMessage> => {
    const { data } = await apiClient.get("/bishop/messages/latest/");

    return {
      id: data.id.toString(),
      title: data.title,
      excerpt: data.excerpt,
      fullMessage: data.full_message,
      imageUrl: data.image,
      date: new Date(data.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      category: data.category,
      isFeatured: data.featured,
      isActive: data.is_active,
      displayOrder: data.display_order,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  },
};

export default bishopMessageService;
