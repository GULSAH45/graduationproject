import { authApi } from "./Auth";

export interface AddToCartRequest {
    product_id: string;
    product_variant_id: string;
    pieces: number;
}

export interface AddToCartResponse {
    status: string;
    message: string;
    data?: any; // Adjust based on actual API response if needed
}

export const addToCart = async (token: string, data: AddToCartRequest): Promise<AddToCartResponse> => {
    const response = await authApi.post<AddToCartResponse>("/users/cart", data, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    return response.data;
};

export interface CartItem {
    product_id: string;
    product_slug: string;
    product_variant_id: string;
    product: string;
    product_variant_detail: {
        size: {
            gram: number;
            pieces: number;
            total_services: number;
        };
        aroma: string;
        photo_src: string;
    };
    pieces: number;
    unit_price: number;
    total_price: number;
}

export interface CartResponse {
    status: string;
    data: {
        total_price: number;
        items: CartItem[];
    };
}

export const getCart = async (token: string): Promise<CartResponse> => {
    const response = await authApi.get<CartResponse>("/users/cart", {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    return response.data;
};
