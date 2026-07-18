// src/services/greetingService.ts
import apiClient from "../../api/apiClient";

export type Greeting = {
  id: string;
  welcomeTitle: string;
  welcomeText: string;
  bishopName: string;
  bishopTitle: string;
  bishopImageUrl: string;
  signature: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

const greetingService = {
  getGreeting: async (): Promise<Greeting> => {
    const { data } = await apiClient.get("/greeting/");

    // Handle paginated response
    const greetingData = Array.isArray(data.results) ? data.results[0] : data;

    // Transform snake_case to camelCase
    return {
      id: greetingData.id,
      welcomeTitle: greetingData.welcome_title,
      welcomeText: greetingData.welcome_text,
      bishopName: greetingData.bishop_name,
      bishopTitle: greetingData.bishop_title,
      bishopImageUrl: greetingData.bishop_image,
      signature: greetingData.signature,
      isActive: greetingData.is_active,
      createdAt: greetingData.created_at,
      updatedAt: greetingData.updated_at,
    };
  },
};

export default greetingService;
