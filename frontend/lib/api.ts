
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
        // Handle Network Errors (CORS/Offline) which often have status 0 or empty statusText
        const status = res.status || 0;
        const statusText = res.statusText || 'Network Error (possibly CORS)';

        let errorMessage = `API Error (${status}): ${statusText}`;
        try {
            const errorData = await res.json();
            errorMessage = errorData.error || errorMessage;
        } catch (e) {
            // response was not json, read text body
            const textBody = await res.text();
            errorMessage += ` | Body: ${textBody.substring(0, 150)}`;
        }
        throw new Error(errorMessage);
    }

    return res.json();
}
