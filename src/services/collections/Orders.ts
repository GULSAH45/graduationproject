import { authApi } from "./Auth";
import type { Order, OrderListResponse } from "@/types/OrderTypes";

export type { Order, OrderListResponse };

export const getOrders = async (token: string): Promise<OrderListResponse> => {
    const response = await authApi.get<OrderListResponse>("/orders", {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    return response.data;
};

export const getOrderDetail = async (token: string, orderId: string): Promise<Order> => {
    const response = await authApi.get<Order>(`/orders/${orderId}`, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    return response.data;
};

// Create new order
export interface CreateOrderRequest {
    address_id?: number;
    shipping_method?: string;
    payment_method?: string;
    notes?: string;
}

export interface CreateOrderResponse {
    status: string;
    message: string;
    data: {
        order_id: string;
        order_number: string;
    };
}

export const createOrder = async (token: string, orderData: CreateOrderRequest): Promise<CreateOrderResponse> => {
    const response = await authApi.post<CreateOrderResponse>("/orders", orderData, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    return response.data;
};
