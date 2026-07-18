import apiClient from "../../api/apiClient";

export type GalleryImage = {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type GalleryEvent = {
  id: string;
  title: string;
  description: string;
  coverImageUrl: string | null;
  date: string;
  category: string;
  featured: boolean;
  displayOrder: number;
  imageCount: number;
  images?: GalleryImage[];
  createdAt: string;
  updatedAt: string;
};

const galleryService = {
  getGalleryEvents: async (
    page = 1,
    perPage = 10,
  ): Promise<{ results: GalleryEvent[]; count: number }> => {
    const { data } = await apiClient.get("/newsandevent/gallery/", {
      params: { page, page_size: perPage },
    });

    const items = Array.isArray(data.results) ? data.results : [data];

    return {
      results: items.map((item: any) => ({
        id: item.id.toString(),
        title: item.title,
        description: item.description,
        coverImageUrl: item.cover_image_url,
        date: item.date,
        category: item.category,
        featured: item.featured,
        displayOrder: item.display_order,
        imageCount: item.image_count,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      })),
      count: data.count || 0,
    };
  },

  getGalleryEventById: async (id: string): Promise<GalleryEvent> => {
    const { data } = await apiClient.get(`/newsandevent/gallery/${id}/`);

    return {
      id: data.id.toString(),
      title: data.title,
      description: data.description,
      coverImageUrl: data.cover_image_url,
      date: data.date,
      category: data.category,
      featured: data.featured,
      displayOrder: data.display_order,
      imageCount: data.image_count,
      images: (data.images || []).map((img: any) => ({
        id: img.id.toString(),
        title: img.title,
        description: img.description,
        imageUrl: img.image_url,
        displayOrder: img.display_order,
        isActive: img.is_active,
        createdAt: img.created_at,
        updatedAt: img.updated_at,
      })),
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  },

  getFeatured: async (): Promise<GalleryEvent[]> => {
    const { data } = await apiClient.get("/newsandevent/gallery/featured/");

    const items = Array.isArray(data) ? data : [];

    return items.map((item: any) => ({
      id: item.id.toString(),
      title: item.title,
      description: item.description,
      coverImageUrl: item.cover_image_url,
      date: item.date,
      category: item.category,
      featured: item.featured,
      displayOrder: item.display_order,
      imageCount: item.image_count,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    }));
  },

  getLatest: async (): Promise<GalleryEvent> => {
    const { data } = await apiClient.get("/newsandevent/gallery/latest/");

    return {
      id: data.id.toString(),
      title: data.title,
      description: data.description,
      coverImageUrl: data.cover_image_url,
      date: data.date,
      category: data.category,
      featured: data.featured,
      displayOrder: data.display_order,
      imageCount: data.image_count,
      images: (data.images || []).map((img: any) => ({
        id: img.id.toString(),
        title: img.title,
        description: img.description,
        imageUrl: img.image_url,
        displayOrder: img.display_order,
        isActive: img.is_active,
        createdAt: img.created_at,
        updatedAt: img.updated_at,
      })),
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  },

  getGalleryEventImages: async (eventId: string): Promise<GalleryImage[]> => {
    const { data } = await apiClient.get(
      `/newsandevent/gallery/${eventId}/images/`,
    );

    const items = Array.isArray(data) ? data : [];

    return items.map((img: any) => ({
      id: img.id.toString(),
      title: img.title,
      description: img.description,
      imageUrl: img.image_url,
      displayOrder: img.display_order,
      isActive: img.is_active,
      createdAt: img.created_at,
      updatedAt: img.updated_at,
    }));
  },
};

export default galleryService;
