import apiClient from "../../api/apiClient";

export type DailyReading = {
  id: string;
  title: string;
  date: string;
  firstReading: string;
  psalm: string;
  gospel: string;
  reflection: string;
};

const dailyReadingService = {
  getDailyReading: async (): Promise<DailyReading> => {
    const { data } = await apiClient.get("/daily-reading");
    return data;
  },
};

export default dailyReadingService;
