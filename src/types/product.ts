export interface CategoryParams {
  photo_src: any;
  ginseng: any;
  id: number;
  name: string;
  slug: string;
  order: number;
}

export interface CategoryResponse {
  status: string;
  data: {
    data: CategoryParams[];
    status: string;
  };
}

export interface Product {
  id: string;
  name: string;
  short_explanation: string;
  slug: string;
  price_info: {
    profit: number | null;
    total_price: number;
    discounted_price: number | null;
    price_per_servings: number;
    discount_percentage: number | null;
  };
  photo_src: string;
  comment_count: number;
  average_star: number;
  explanation: {
    usage: string;
    features: string;
    description: string;
    nutritional_content: {
      ingredients?: { aroma: string | null; value: string }[];
      nutrition_facts?: {
        ingredients: { name: string; amounts: string[] }[];
        portion_sizes: string[];
      };
      amino_acid_facts?: any;
    };
  };
  tags: string[];
  variants: Variant[];
}

export interface Variant {
  id: string;
  size: { pieces: number; total_services: number };
  aroma: string;
  price: {
    profit: number | null;
    total_price: number;
    discounted_price: number | null;
    price_per_servings: number;
    discount_percentage: number | null;
  };
  photo_src: string;
  is_available: boolean;
}

export type ProductDetailRouteParams = {
  productId: string;
  productSlug?:string;
  product?: Product; // Ürün objesi
};