import apiClient from "../../api/apiClient";

export type Parish = {
  id: string;
  name: string;
  location: string;
  isActive:boolean;
};

export type Deanery = {
    id: string;
    name: string;
    parishes: Parish[];
    isActive:boolean;
};

const deaneryService = {
  getDeaneries: async (): Promise<Deanery[]> => {
    const { data } = await apiClient.get("/deaneries");
    return data;
  },
};

export default deaneryService;
