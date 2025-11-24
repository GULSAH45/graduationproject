
import { authApi } from "./Auth";

export interface Country {
    id: number;
    name: string;
}

export interface Region {
    id: number;
    name: string;
    country: Country;
}

export interface Subregion {
    id: number;
    name: string;
    region: Region;
}

export interface Address {
    id: string;
    title: string;
    country: Country;
    region: Region;
    full_address: string;
    phone_number: string;
    subregion: Subregion;
    first_name: string;
    last_name: string;
}

export interface AddressListResponse {
    status: string;
    data: {
        count: number;
        next: string | null;
        previous: string | null;
        results: Address[];
    };
}

export const getAddresses = async (token: string): Promise<AddressListResponse> => {
    const response = await authApi.get<AddressListResponse>("/users/addresses?limit=10&offset=0", {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    return response.data;
};

export const deleteAddress = async (token: string, addressId: string): Promise<void> => {
    await authApi.delete(`/users/addresses/${addressId}`, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const updateAddress = async (token: string, addressId: string, data: any): Promise<void> => {
    await authApi.put(`/users/addresses/${addressId}`, data, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export interface CreateAddressRequest {
    title?: string;
    country_id?: number;
    region_id?: number;
    subregion_id?: number;
    full_address?: string;
    phone_number?: string;
    first_name?: string;
    last_name?: string;
}

export const createAddress = async (token: string, data: CreateAddressRequest): Promise<void> => {
    await authApi.post("/users/addresses", data, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
