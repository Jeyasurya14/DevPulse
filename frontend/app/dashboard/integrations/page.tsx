'use client';

import React, { useState, useEffect } from 'react';
import { Github, Slack, Trello, CheckCircle, XCircle, Loader2, Settings2 } from 'lucide-react';
import { fetchAPI } from '@/lib/api';
import IntegrationModal from '@/components/dashboard/IntegrationModal';

interface Integration {
    name: string;
    provider: string;
    description?: string;
    connected: boolean;
    icon?: string;
    api_key_masked?: string;
    last_synced?: string;
    config?: any;
}

export default function IntegrationsPage() {
    const [integrations, setIntegrations] = useState<Integration[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);

    useEffect(() => {
        loadIntegrations();
    }, []);

    const loadIntegrations = async () => {
        try {
            const data = await fetchAPI('/api/integrations/');
            setIntegrations(data);
        } catch (error) {
            console.error('Failed to load integrations', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = () => {
        loadIntegrations();
    };

    const getIcon = (name: string) => {
        const n = name?.toLowerCase() || '';
        if (n.includes('github')) return <Github size={32} />;
        if (n.includes('jira') || n.includes('trello')) return <Trello size={32} />;
        if (n.includes('slack')) return <Slack size={32} />;
        return <Trello size={32} />;
    };

    return (
        <div className="bg-gray-950 text-white font-sans h-full relative">
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
                            <div key={idx} className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:shadow-lg hover:border-blue-500/50 transition-all duration-300 flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-gray-800 rounded-full text-blue-400">
                                        {getIcon(integration.provider)}
                                    </div>
                                    {integration.connected ? (
                                        <span className="flex items-center text-green-400 text-xs font-bold bg-green-400/10 px-2 py-1 rounded-full uppercase tracking-wide border border-green-400/20">
                                            <CheckCircle size={12} className="mr-1" /> Active
                                        </span>
                                    ) : (
                                        <span className="flex items-center text-gray-500 text-xs font-bold bg-gray-800 px-2 py-1 rounded-full uppercase tracking-wide border border-gray-700">
                                            Inactive
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-xl font-bold mb-1 capitalize">{integration.name}</h3>
                                <p className="text-gray-400 text-sm mb-6 flex-grow">{integration.description || "Sync data with this provider."}</p>

                                <button
                                    onClick={() => setSelectedIntegration(integration)}
                                    className={`w-full py-2.5 px-4 rounded-lg font-bold transition-all flex items-center justify-center shadow-lg ${integration.connected
                                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20'
                                        }`}
                                >
                                    {integration.connected ? (
                                        <>
                                            <Settings2 size={16} className="mr-2" /> Manage Settings
                                        </>
                                    ) : (
                                        'Connect'
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <IntegrationModal
                isOpen={!!selectedIntegration}
                onClose={() => setSelectedIntegration(null)}
                integration={selectedIntegration}
                onUpdate={handleUpdate}
            />
        </div>
    );
}
