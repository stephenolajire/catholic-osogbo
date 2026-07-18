import apiClient from "../../api/apiClient";

export type Podcast = {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  spotifyLink: string;
  durationSeconds: number;
  isFeatured: boolean;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
};

const podcastService = {
  getPodcasts: async (
    page = 1,
    perPage = 10,
  ): Promise<{ results: Podcast[]; count: number }> => {
    const { data } = await apiClient.get("/newsandevent/podcasts/", {
      params: { page, page_size: perPage },
    });

    const items = Array.isArray(data.results) ? data.results : [data];

    return {
      results: items.map((item: any) => ({
        id: item.id.toString(),
        title: item.title,
        description: item.description,
        imageUrl: item.image_url,
        spotifyLink: item.spotify_link,
        durationSeconds: item.duration_seconds,
        isFeatured: item.featured,
        isActive: item.is_active,
        displayOrder: item.display_order,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      })),
      count: data.count || 0,
    };
  },

  getPodcastById: async (id: string): Promise<Podcast> => {
    const { data } = await apiClient.get(`/newsandevent/podcasts/${id}/`);

    return {
      id: data.id.toString(),
      title: data.title,
      description: data.description,
      imageUrl: data.image_url,
      spotifyLink: data.spotify_link,
      durationSeconds: data.duration_seconds,
      isFeatured: data.featured,
      isActive: data.is_active,
      displayOrder: data.display_order,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  },

  getFeatured: async (): Promise<Podcast[]> => {
    const { data } = await apiClient.get("/newsandevent/podcasts/featured/");

    const items = Array.isArray(data) ? data : [];

    return items.map((item: any) => ({
      id: item.id.toString(),
      title: item.title,
      description: item.description,
      imageUrl: item.image_url,
      spotifyLink: item.spotify_link,
      durationSeconds: item.duration_seconds,
      isFeatured: item.featured,
      isActive: item.is_active,
      displayOrder: item.display_order,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    }));
  },

  getLatest: async (): Promise<Podcast> => {
    const { data } = await apiClient.get("/newsandevent/podcasts/latest/");

    return {
      id: data.id.toString(),
      title: data.title,
      description: data.description,
      imageUrl: data.image_url,
      spotifyLink: data.spotify_link,
      durationSeconds: data.duration_seconds,
      isFeatured: data.featured,
      isActive: data.is_active,
      displayOrder: data.display_order,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  },
};

export default podcastService;
