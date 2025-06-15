import { tokenService } from "./Token";

export const fetcher = async <T>(url: string, options?: RequestInit): Promise<T> => {
    const token = tokenService.getToken();
    const headers: HeadersInit = {  
        "Content-Type": "application/json",
    };  
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        ...options,
        headers: {
            ...headers,
            ...(options?.headers || {}),
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};