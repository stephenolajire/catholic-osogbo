import apiClient from "../../api/apiClient";

export type News = {
  id: string;
  title: string;
  excerpt: string;
  fullContent: string;
  imageUrl: string | null;
  date: string;
  category: "news" | "event" | "announcement";
  isFeatured: boolean;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
};

const newsService = {
  getNews: async (
    page = 1,
    perPage = 10,
  ): Promise<{ results: News[]; count: number }> => {
    const { data } = await apiClient.get("/newsandevent/news/", {
      params: { page, page_size: perPage },
    });

    const items = Array.isArray(data.results) ? data.results : [data];

    return {
      results: items.map((item: any) => ({
        id: item.id.toString(),
        title: item.title,
        excerpt: item.excerpt,
        fullContent: item.full_content,
        imageUrl: item.image_url,
        date: item.date,
        category: item.category,
        isFeatured: item.featured,
        isActive: item.is_active,
        displayOrder: item.display_order,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      })),
      count: data.count || 0,
    };
  },

  getNewsById: async (id: string): Promise<News> => {
    const { data } = await apiClient.get(`/newsandevent/news/${id}/`);

    return {
      id: data.id.toString(),
      title: data.title,
      excerpt: data.excerpt,
      fullContent: data.full_content,
      imageUrl: data.image_url,
      date: data.date,
      category: data.category,
      isFeatured: data.featured,
      isActive: data.is_active,
      displayOrder: data.display_order,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  },

  getFeatured: async (): Promise<News[]> => {
    const { data } = await apiClient.get("/newsandevent/news/featured/");

    const items = Array.isArray(data) ? data : [];

    return items.map((item: any) => ({
      id: item.id.toString(),
      title: item.title,
      excerpt: item.excerpt,
      fullContent: item.full_content,
      imageUrl: item.image_url,
      date: item.date,
      category: item.category,
      isFeatured: item.featured,
      isActive: item.is_active,
      displayOrder: item.display_order,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    }));
  },

  getLatest: async (): Promise<News> => {
    const { data } = await apiClient.get("/newsandevent/news/latest/");

    return {
      id: data.id.toString(),
      title: data.title,
      excerpt: data.excerpt,
      fullContent: data.full_content,
      imageUrl: data.image_url,
      date: data.date,
      category: data.category,
      isFeatured: data.featured,
      isActive: data.is_active,
      displayOrder: data.display_order,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  },

  getByCategory: async (
    category: "news" | "event" | "announcement",
  ): Promise<News[]> => {
    const { data } = await apiClient.get("/newsandevent/news/by_category/", {
      params: { category },
    });

    const items = Array.isArray(data) ? data : [];

    return items.map((item: any) => ({
      id: item.id.toString(),
      title: item.title,
      excerpt: item.excerpt,
      fullContent: item.full_content,
      imageUrl: item.image_url,
      date: item.date,
      category: item.category,
      isFeatured: item.featured,
      isActive: item.is_active,
      displayOrder: item.display_order,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    }));
  },
};

export default newsService;
