import apiClient from "../../api/apiClient";

export type Reading = {
  reference: string;
  text: string;
};

export type DailyReading = {
  id: string;
  title: string;
  date: string;
  firstReading?: Reading;
  secondReading?: Reading;
  responsorialPsalm: Reading;
  gospel: Reading;
  reflection: string;
};

const dailyReadingService = {
  getDailyReading: async (): Promise<DailyReading> => {
    const { data } = await apiClient.get("/daily-reading/");

    // Handle paginated response
    const reading = Array.isArray(data.results) ? data.results[0] : data;

    return {
      id: reading.id.toString(),
      title: reading.title,
      date: reading.date,
      firstReading: reading.first_reading
        ? {
            reference: reading.first_reading.reference,
            text: reading.first_reading.text,
          }
        : undefined,
      secondReading: reading.second_reading
        ? {
            reference: reading.second_reading.reference,
            text: reading.second_reading.text,
          }
        : undefined,
      responsorialPsalm: {
        reference: reading.responsorial_psalm.reference,
        text: reading.responsorial_psalm.text,
      },
      gospel: {
        reference: reading.gospel.reference,
        text: reading.gospel.text,
      },
      reflection: reading.reflection,
    };
  },
};

export default dailyReadingService;
