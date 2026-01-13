
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
    // Auth Header
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    const authHeaders = token ? { 'Authorization': `Bearer ${token}` } : {};

    try {
        const res = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(authHeaders as Record<string, string>),
                ...(options.headers as Record<string, string>),
            },
        });

        if (!res.ok) {
            // Handle Network Errors (CORS/Offline) which often have status 0 or empty statusText
            const status = res.status || 0;
            const statusText = res.statusText || 'Network Error (possibly CORS)';

            let errorMessage = `API Error (${status}): ${statusText}`;
            try {
                const textBody = await res.text();
                try {
                    const errorData = JSON.parse(textBody);
                    errorMessage = errorData.error || errorMessage;
                } catch (e) {
                    errorMessage += ` | Body: ${textBody.substring(0, 150)}`;
                }
            } catch (e) {
                errorMessage += ` | Body read failed`;
            }
            throw new Error(errorMessage);
        }

        return await res.json();

    } catch (e) {
        throw e;
    }
}
