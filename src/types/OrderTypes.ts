export interface OrderItem {
    id: string;
    product_name: string;
    product_variant: string;
    quantity: number;
    unit_price: number;
    total_price: number;
    photo_src?: string;
}

export interface Order {
    id: string;
    order_number: string;
    status: OrderStatus;
    created_at: string;
    updated_at: string;
    total_amount: number;
    items: OrderItem[];
    shipping_address?: string;
    payment_method?: string;
}

export enum OrderStatus {
    PENDING = 'pending',
    PROCESSING = 'processing',
    SHIPPED = 'shipped',
    DELIVERED = 'delivered',
    CANCELLED = 'cancelled'
}

export interface OrderListResponse {
    status: string;
    data: {
        count: number;
        next: string | null;
        previous: string | null;
        results: Order[];
    };
}
