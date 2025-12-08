import { authApi } from "./Auth";
import type { Order, OrderListResponse } from "@/types/Order";

export type { Order, OrderListResponse };

// Create new order
export interface CreateOrderRequest {
    address_id: string;
    payment_type: string;
    card_digits: string;
    card_expiration_date: string;
    card_security_code: string;
    card_type: string;
}

export interface CreateOrderResponse {
    status: string;
    message: string;
    data: {
        order_id: string;
        order_number: string;
    };
}

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



export const createOrder = async (token: string, orderData: CreateOrderRequest): Promise<CreateOrderResponse> => {
    const response = await authApi.post<CreateOrderResponse>("/orders", orderData, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    return response.data;
};

