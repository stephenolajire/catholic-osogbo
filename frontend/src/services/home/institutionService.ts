import apiClient from "../../api/apiClient";

export type Institution = {
  id: string;
  name: string;
  subcategory: string;
  description: string;
  address: string;
  phoneNumber: string;
  principalName: string;
  email?: string;
  website?: string;
  imageUrl: string;
  established?: string;
  staffCount?: number;
  operatingHours?: string;
};

export type InstitutionSubcategory = {
  id: string;
  name: string;
  description: string;
  heroImageUrl: string;
  institutions: Institution[];
};

export type InstitutionCategory = {
  id: string;
  name: string;
  categoryKey:
    | "education"
    | "healthcare"
    | "vocational"
    | "formation"
    | "bookshop"
    | "religious";
  description: string;
  imageUrl: string;
  subcategories?: InstitutionSubcategory[];
};

const institutionService = {
  getCategories: async (): Promise<InstitutionCategory[]> => {
    const { data } = await apiClient.get("/institution/categories");
    return data.results || data;
  },

  getCategoryByKey: async (
    categoryKey: string,
  ): Promise<InstitutionCategory> => {
    const { data } = await apiClient.get(
      `/institution/categories/by_key/?key=${categoryKey}`,
    );
    return data;
  },

  getSubcategory: async (
    _categoryKey: string,
    subcategoryId: string,
  ): Promise<InstitutionSubcategory> => {
    const { data } = await apiClient.get(
      `/institution/subcategories/${subcategoryId}/`,
    );
    return data;
  },
};

export default institutionService;
