import axios from "axios";

const BASE_URL = "https://fe1111.projects.academy.onlyjs.com/api/v1";
export const API_KEY = "370718";

export const authApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// --- Interfaces ---

export interface LoginRequest {
    username: string;
    password: string;
    api_key: string;
}

export interface LoginResponse {
    access_token: string;
    refresh_token: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    password2: string;
    first_name: string;
    last_name: string;
    api_key: string;
}

export interface RegisterResponseData {
    email: string;
    first_name: string;
    last_name: string;
    api_key: string;
}

export interface RegisterResponse {
    status: string;
    data: RegisterResponseData;
}

export interface MeResponse {
    id?: number;
    email: string;
    first_name: string;
    last_name: string;
    phone?: string;
    // Add other fields returned by /auth/me if known, otherwise keep minimal
}

// --- API Functions ---

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await authApi.post<LoginResponse>("/auth/login", data);
    return response.data;
};

export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await authApi.post<RegisterResponse>("/auth/register", data);
    return response.data;
};

export const me = async (token: string): Promise<MeResponse> => {
    const response = await authApi.get("/users/my-account", {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    console.log('Raw API response from /users/my-account:', response.data);

    // Check if response is wrapped in { data: ... }
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
        console.log('Response is wrapped, returning response.data.data');
        return response.data.data;
    }

    console.log('Response is not wrapped, returning response.data');
    return response.data;
};