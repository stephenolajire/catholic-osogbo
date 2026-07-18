import apiClient from "../../api/apiClient";

export type UpcomingEventItem = {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  description: string;
};

const upcomingEventService = {
  getUpcomingEvents: async (): Promise<UpcomingEventItem[]> => {
    const { data } = await apiClient.get("/events/upcoming/");
    return data.results || data;
  },
};

export default upcomingEventService;
