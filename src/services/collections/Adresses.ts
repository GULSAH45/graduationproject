
import { authApi } from "./Auth";
import type {
    Country,
    Region,
    Subregion,
    Address,
    AddressListResponse,
    CreateAddressRequest
} from "@/types/AddressTypes";

export type {
    Country,
    Region,
    Subregion,
    Address,
    AddressListResponse,
    CreateAddressRequest
};

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

export const createAddress = async (token: string, data: CreateAddressRequest): Promise<void> => {
    await authApi.post("/users/addresses", data, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
