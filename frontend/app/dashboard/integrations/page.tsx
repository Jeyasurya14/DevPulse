
'use client';

import React, { useState, useEffect } from 'react';
import { Github, Slack, Trello, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { fetchAPI } from '@/lib/api';

interface Integration {
    name?: string; // from fallback list
    provider?: string; // from db
    connected: boolean;
    icon?: string;
    api_key_masked?: string;
}

export default function IntegrationsPage() {
    const [integrations, setIntegrations] = useState<Integration[]>([]);
    const [loading, setLoading] = useState(true);
    const [connecting, setConnecting] = useState<string | null>(null);

    useEffect(() => {
        loadIntegrations();
    }, []);

    const loadIntegrations = async () => {
        try {
            const data = await fetchAPI('/api/integrations/');
            // Normalize data: backend might return mixed types, let's standardize for UI
            const uiData = data.map((item: any) => ({
                name: item.name || item.provider,
                provider: item.provider || item.name,
                connected: item.connected,
                icon: item.icon,
                api_key_masked: item.api_key_masked
            }));
            setIntegrations(uiData);
        } catch (error) {
            console.error('Failed to load integrations', error);
        } finally {
            setLoading(false);
        }
    };

    const handleConnect = async (provider: string) => {
        setConnecting(provider);
        // Simulate OAuth Redirect Delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        const mockKey = `key-${Math.random().toString(36).substring(7)}`; // Simulate user input
        try {
            await fetchAPI('/api/integrations/connect/', {
                method: 'POST',
                body: JSON.stringify({ provider, api_key: mockKey }),
            });
            await loadIntegrations();
        } catch (error) {
            alert('Failed to connect');
        } finally {
            setConnecting(null);
        }
    };

    const getIcon = (name: string) => {
        const n = name.toLowerCase();
        if (n.includes('github')) return <Github size={32} />;
        if (n.includes('jira') || n.includes('trello')) return <Trello size={32} />;
        if (n.includes('slack')) return <Slack size={32} />;
        return <Trello size={32} />;
    };

    return (
        <div className="bg-gray-950 text-white font-sans h-full">
            <main className="p-8 h-full overflow-y-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Integration Hub</h1>
                    <p className="text-gray-400">Connect your favorite tools to centralize your workflow.</p>
                </header>

                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <Loader2 className="animate-spin text-blue-500" size={48} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {integrations.map((integration, idx) => (
                            <div key={idx} className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:shadow-lg hover:border-blue-500/50 transition-all duration-300">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-gray-800 rounded-full text-blue-400">
                                        {getIcon(integration.name || integration.provider || '')}
                                    </div>
                                    {integration.connected ? (
                                        <span className="flex items-center text-green-400 text-sm font-medium bg-green-400/10 px-3 py-1 rounded-full">
                                            <CheckCircle size={14} className="mr-1" /> Connected
                                        </span>
                                    ) : (
                                        <span className="flex items-center text-gray-500 text-sm font-medium bg-gray-800 px-3 py-1 rounded-full">
                                            Not Connected
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-xl font-semibold mb-2 capitalize">{integration.name || integration.provider}</h3>
                                <p className="text-gray-400 text-sm mb-6">
                                    {integration.connected
                                        ? `Synced securely. Key: ${integration.api_key_masked}`
                                        : "Connect to sync repositories, tasks, and messages."}
                                </p>

                                <button
                                    onClick={() => !integration.connected && handleConnect(integration.name || integration.provider || '')}
                                    disabled={integration.connected || connecting === (integration.name || integration.provider)}
                                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center ${integration.connected
                                        ? 'bg-gray-800 text-gray-500 cursor-default'
                                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20'
                                        }`}
                                >
                                    {connecting === (integration.name || integration.provider) ? (
                                        <Loader2 className="animate-spin" size={18} />
                                    ) : integration.connected ? (
                                        'Manage'
                                    ) : (
                                        'Connect'
                                    )}
                                    {connecting === (integration.name || integration.provider) && <span className="ml-2 text-xs">Redirecting...</span>}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
