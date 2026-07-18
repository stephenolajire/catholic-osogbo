import apiClient from "../../api/apiClient";

export type PriestRole =
  | "bishop"
  | "vicar_general"
  | "parish_priest"
  | "assistant_priest"
  | "chaplain"
  | "deacon";

export type Priest = {
  id: string;
  name: string;
  role: PriestRole;
  roleLabel: string;
  parish: string;
  deanery: string;
  imageUrl: string;
  bio: string;
  ordainedYear: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

const priestService = {
  getPriests: async (): Promise<Priest[]> => {
    const { data } = await apiClient.get("/bishop/priests");
    return data.results || data;
  },
};

export default priestService;
