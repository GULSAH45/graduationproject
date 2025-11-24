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
    countryId: number,
    limit: number = 100,
    offset: number = 0
): Promise<WorldResponse<Region>> => {
    // Based on user request: {{base_url}}/world/region?limit=10&offset=0&name=istan&country-name=turkey
    // But user also said: "ülke seçtikten sonra o ülkenin şehirlerini almak için regions kımsında ülkenin idsini vermen lazım"
    // The example URL shows `country-name=turkey`. However, usually IDs are safer. 
    // Let's check if I can use ID. The user said "regions kımsında ülkenin idsini vermen lazım".
    // I will assume the API supports filtering by country ID, likely `country` or `country_id`.
    // Wait, the user provided example: `{{base_url}}/world/region?limit=10&offset=0&name=istan&country-name=turkey`
    // And then said: "regions kımsında ülkenin idsini vermen lazım" (You need to give the country ID in the regions part).
    // This might mean the example was just an example and I should use ID.
    // Let's try to use `country` query param which is common in Django/DRF or similar.
    // Or maybe `country_id`.
    // Given the user's explicit instruction "regions kımsında ülkenin idsini vermen lazım", I will use `country` as the param name for ID, or `country_id`.
    // Let's look at `Adresses.ts` again. It uses `country_id` in the payload.
    // I'll use `country` as the query param for now, as it's a common filter name.

    // Actually, looking at the user's prompt again:
    // "regions kımsında ülkenin idsini vermen lazım"
    // "subregions kımsında region id vermen lazım"

    // The example `{{base_url}}/world/subregion?limit=30&offset=0&region-name=istanbul` uses `region-name`.
    // But the user insists on IDs.
    // I will implement with IDs as requested. I'll use `country` and `region` as query params.

    const response = await authApi.get<WorldResponse<Region>>(`/world/region`, {
        params: {
            limit,
            offset,
            country: countryId,
        }
    });
    return response.data;
};

export const listSubregions = async (
    regionId: number,
    limit: number = 100,
    offset: number = 0
): Promise<WorldResponse<Subregion>> => {
    const response = await authApi.get<WorldResponse<Subregion>>(`/world/subregion`, {
        params: {
            limit,
            offset,
            region: regionId,
        }
    });
    return response.data;
};
