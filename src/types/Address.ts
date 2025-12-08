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
