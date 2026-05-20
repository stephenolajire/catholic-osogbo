import apiClient from "../../api/apiClient";

export type ProjectStatus = "ongoing" | "completed" | "planned" | "on_hold";

export type ProjectCategory =
  | "infrastructure"
  | "education"
  | "healthcare"
  | "evangelization"
  | "social_welfare"
  | "youth";

export type Project = {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  categoryLabel: string;
  status: ProjectStatus;
  statusLabel: string;
  parish: string;
  deanery: string;
  imageUrl: string;
  startDate: string;
  endDate?: string;
  budget?: number;
  progress: number; // 0-100
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
};

const projectService = {
  getProjects: async (): Promise<Project[]> => {
    const { data } = await apiClient.get("/projects");
    return data;
  },
};

export default projectService;
