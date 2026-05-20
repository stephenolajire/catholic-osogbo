import apiClient from "../../api/apiClient";

export type ParishStatus = "active" | "mission" | "merged" | "closed";

export type Parish = {
  id: string;
  name: string;
  deanery: string;
  address: string;
  city: string;
  phone?: string;
  email?: string;
  imageUrl: string;
  priestInCharge: string;
  massSchedule: string;
  established: number;
  status: ParishStatus;
  statusLabel: string;
  parishioners?: number;
  isCathedral: boolean;
  createdAt: string;
  updatedAt: string;
};

const parishService = {
  getParishes: async (): Promise<Parish[]> => {
    const { data } = await apiClient.get("/parishes");
    return data;
  },
};

export default parishService;
