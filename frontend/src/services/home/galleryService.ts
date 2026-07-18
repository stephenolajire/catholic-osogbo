import apiClient from "../../api/apiClient";

export type GalleryImage = {
  id: string;
  url: string;
  caption?: string;
};

export type GalleryEvent = {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  imageCount: number;
  coverImageUrl: string;
  images?: GalleryImage[];
};

const galleryService = {
  getGalleryEvents: async (): Promise<GalleryEvent[]> => {
    const { data } = await apiClient.get("/gallery");
    return data.results || data;
  },

  getGalleryEvent: async (eventId: string): Promise<GalleryEvent> => {
    const { data } = await apiClient.get(`/gallery/${eventId}/`);
    return data;
  },
};

export default galleryService;
