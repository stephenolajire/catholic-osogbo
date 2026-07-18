import apiClient from "../../api/apiClient";

export interface GallerySetting {
  id: number;
  heroImageUrl: string | null;
}

const gallerySettingsService = {
  /**
   * Fetch gallery settings
   * @returns Gallery settings with hero image URL
   */
  getSettings: async (): Promise<GallerySetting> => {
    const { data } = await apiClient.get(
      "/newsandevent/gallery-settings/current/",
    );

    return {
      id: data.id,
      heroImageUrl: data.hero_image_url,
    };
  },
};

export default gallerySettingsService;
