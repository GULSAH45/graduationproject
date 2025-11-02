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