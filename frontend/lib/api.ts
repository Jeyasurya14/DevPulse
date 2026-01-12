
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    if (!res.ok) {
        let errorMessage = `API Error ${res.status}: ${res.statusText}`;
        try {
            const errorData = await res.json();
            errorMessage = errorData.error || errorMessage;
        } catch (e) {
            // response was not json, helpful debugging
            errorMessage += ` at ${endpoint}`;
        }
        throw new Error(errorMessage);
    }

    return res.json();
}
