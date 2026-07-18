import apiClient from "../../api/apiClient";

export type LayLeaderRole =
  | "chaplain"
  | "president"
  | "vice_president"
  | "secretary"
  | "treasurer"
  | "pro"
  | "coordinator"
  | "other";

export type LayLeader = {
  id: string;
  name: string;
  role: LayLeaderRole;
  roleLabel: string;
  parish: string;
  deanery: string;
  imageUrl: string;
  phone?: string;
  email?: string;
  tenure: string;
};

export type LayAssociation = {
  id: string;
  name: string;
  acronym: string;
  category: "youth" | "men" | "women" | "apostolate" | "devotional";
  categoryLabel: string;
  description: string;
  patronSaint?: string;
  meetingSchedule: string;
  imageUrl: string;
  chaplain: LayLeader;
  officers: LayLeader[];
  createdAt: string;
  updatedAt: string;
};

const layFaithfulService = {
  getLayAssociations: async (): Promise<LayAssociation[]> => {
    const { data } = await apiClient.get("/content/associations");
    return data.results || data;
  },
};

export default layFaithfulService;
