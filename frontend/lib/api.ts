
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
        // Fallback to Mock Data if API fails (Development/Demo Mode)
        console.warn(`API Request to ${endpoint} failed. Falling back to mock data.`);

        if (endpoint.includes('/dashboard/stats')) {
            return {
                projects: 12,
                scans: 1450,
                issues: 24,
                apiUsage: 78,
                team_velocity: "High",
                active_members: 8,
                recent_activity: [
                    { title: "Project 'Alpha' created", time: "2 hours ago", type: "info" },
                    { title: "Security Scan completed", time: "4 hours ago", type: "success" },
                    { title: "New issue detected", time: "5 hours ago", type: "warning" },
                    { title: "API Key rotated", time: "1 day ago", type: "info" }
                ]
            };
        }

        if (endpoint.includes('/integrations')) {
            return [
                { id: '1', name: 'GitHub', status: 'connected', last_sync: '10 mins ago', icon: 'github' },
                { id: '2', name: 'Slack', status: 'disconnected', icon: 'slack' },
                { id: '3', name: 'Jira', status: 'connected', last_sync: '1 hour ago', icon: 'jira' }
            ];
        }

        throw e;
    }
}
