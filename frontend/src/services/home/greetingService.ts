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
    const { data } = await apiClient.get("/greeting");
    return data;
  },
};

export default greetingService;
