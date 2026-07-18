import apiClient from "../../api/apiClient";

export type CoatOfArmItem = {
  id: string;
  itemName: string;
  explanation: string;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type CoatOfArm = {
  id: string;
  title: string;
  heroImage: string;
  coatOfArmImage: string;
  description: string;
  items: CoatOfArmItem[];
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
};

const coatOfArmService = {
  getLatest: async (): Promise<CoatOfArm> => {
    const { data } = await apiClient.get("/bishop/coat-of-arm/latest/");

    return {
      id: data.id.toString(),
      title: data.title,
      heroImage: data.hero_image,
      coatOfArmImage: data.coat_of_arm_image,
      description: data.description,
      items: (data.items || []).map((item: any) => ({
        id: item.id.toString(),
        itemName: item.item_name,
        explanation: item.explanation,
        displayOrder: item.display_order,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      })),
      isActive: data.is_active,
      displayOrder: data.display_order,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  },

  getAll: async (): Promise<CoatOfArm[]> => {
    const { data } = await apiClient.get("/bishop/coat-of-arm/");

    const items = Array.isArray(data.results) ? data.results : data;

    return items.map((item: any) => ({
      id: item.id.toString(),
      title: item.title,
      heroImage: item.hero_image,
      coatOfArmImage: item.coat_of_arm_image,
      description: item.description,
      items: (item.items || []).map((subitem: any) => ({
        id: subitem.id.toString(),
        itemName: subitem.item_name,
        explanation: subitem.explanation,
        displayOrder: subitem.display_order,
        createdAt: subitem.created_at,
        updatedAt: subitem.updated_at,
      })),
      isActive: item.is_active,
      displayOrder: item.display_order,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    }));
  },
};

export default coatOfArmService;
