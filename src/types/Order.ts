export interface CartDetail {
    variant_id: string;
    name: string;
    photo_src: string;
    pieces: string;
    unit_price: string;
    total_price: string;
    slug: string;
}

export interface Order {
    order_no: string;
    order_status: string;
    created_at: string;
    total_price: number;
    cart_detail: CartDetail[];
}

export enum OrderStatus {
    IN_CARGO = 'in_cargo',
    DELIVERED = 'delivered',
    PROCESSING = 'processing',
    PENDING = 'pending',
    CANCELLED = 'cancelled'
}

export interface OrderListResponse {
    status: string;
    data: Order[];
}
