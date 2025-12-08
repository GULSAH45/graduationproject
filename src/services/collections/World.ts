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

export interface WorldResponse<T> {
    status: string;
    data: {
        count: number;
        next: string | null;
        previous: string | null;
        results: T[];
    };
}

export const listCountries = async (limit: number = 100, offset: number = 0): Promise<WorldResponse<Country>> => {
    const response = await authApi.get<WorldResponse<Country>>(`/world/countries?limit=${limit}&offset=${offset}`);
    return response.data;
};

export const listRegions = async (
    countryName: string,
    limit: number = 100,
    offset: number = 0
): Promise<WorldResponse<Region>> => {

    const response = await authApi.get<WorldResponse<Region>>(`/world/region`, {
        params: {
            limit,
            offset,
            "country-name": countryName.toLowerCase(),
        }
    });
    return response.data;
};

export const listSubregions = async (
    regionName: string,
    limit: number = 100,
    offset: number = 0
): Promise<WorldResponse<Subregion>> => {
    const response = await authApi.get<WorldResponse<Subregion>>(`/world/subregion`, {
        params: {
            limit,
            offset,
            "region-name": regionName.toLowerCase(),
        }
    });
    return response.data;
};
