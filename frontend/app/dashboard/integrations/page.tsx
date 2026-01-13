'use client';

import React, { useState } from 'react';
import { Github, Slack, Trello, CheckCircle, Plus, Search, Layers, Loader2, Settings2, AlertCircle } from 'lucide-react';
import useSWR from 'swr';
import { fetchAPI } from '@/lib/api';
import IntegrationModal from '@/components/dashboard/IntegrationModal';

// SWR Fetcher
const fetcher = (url: string) => fetchAPI(url);

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
    const { data: integrations, error, mutate, isLoading } = useSWR<Integration[]>('/api/integrations/', fetcher);

    // Fallback Mock Data Logic if API returns empty array initially (for demo purposes if needed, can remove for pure prod)
    // For now we assume the backend returns the full list merged with connected status as per Phase 9 work.

    const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const handleUpdate = () => {
        mutate(); // Re-fetch data
    };

    const getIcon = (name: string) => {
        const n = name?.toLowerCase() || '';
        if (n.includes('github')) return <Github size={32} />;
        if (n.includes('jira') || n.includes('trello')) return <Trello size={32} />;
        if (n.includes('slack')) return <Slack size={32} />;
        return <Layers size={32} />;
    };

    const filteredIntegrations = integrations?.filter(i =>
        i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.provider.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    return (
        <div className="bg-slate-50 text-slate-900 font-sans h-full relative">
            <main className="p-8 h-full overflow-y-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Integration Hub</h1>
                        <p className="text-slate-500">Connect your favorite tools to centralize your workflow.</p>
                    </div>
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search tools..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                        />
                    </div>
                </div>

                {error ? (
                    <div className="flex flex-col items-center justify-center p-12 bg-red-50 rounded-2xl border border-red-100 text-center">
                        <AlertCircle className="text-red-500 mb-4" size={48} />
                        <h3 className="text-xl font-bold text-red-900 mb-2">Failed to load integrations</h3>
                        <p className="text-red-600 mb-6">Something went wrong while fetching your data.</p>
                        <button
                            onClick={() => mutate()}
                            className="px-6 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {isLoading ? (
                            // Skeleton Loader
                            [1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-12 h-12 bg-slate-100 rounded-full animate-pulse"></div>
                                        <div className="w-20 h-6 bg-slate-100 rounded-full animate-pulse"></div>
                                    </div>
                                    <div className="w-3/4 h-6 bg-slate-100 rounded mb-2 animate-pulse"></div>
                                    <div className="w-full h-4 bg-slate-100 rounded mb-6 animate-pulse"></div>
                                    <div className="w-full h-10 bg-slate-100 rounded animate-pulse"></div>
                                </div>
                            ))
                        ) : filteredIntegrations.length > 0 ? (
                            filteredIntegrations.map((integration, idx) => (
                                <div key={idx} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`p-3 rounded-xl transition-colors ${integration.connected ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600'}`}>
                                            {getIcon(integration.provider)}
                                        </div>
                                        {integration.connected ? (
                                            <span className="flex items-center text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-full border border-green-100">
                                                <CheckCircle size={12} className="mr-1" /> ACTIVE
                                            </span>
                                        ) : (
                                            <span className="flex items-center text-slate-400 text-xs font-bold bg-slate-100 px-2 py-1 rounded-full border border-slate-200">
                                                INACTIVE
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-lg font-bold mb-2 text-slate-900">{integration.name}</h3>
                                    <p className="text-slate-500 text-sm mb-6 flex-grow leading-relaxed">
                                        {integration.description || "Sync repositories, manage issues, and automate your workflow."}
                                    </p>

                                    <button
                                        onClick={() => setSelectedIntegration(integration)}
                                        className={`w-full py-3 px-4 rounded-lg font-bold transition-all flex items-center justify-center text-sm ${integration.connected
                                            ? 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                                            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-blue-500/25'
                                            }`}
                                    >
                                        {integration.connected ? (
                                            <>
                                                <Settings2 size={16} className="mr-2" /> Manage
                                            </>
                                        ) : (
                                            <>
                                                Connect <Plus size={16} className="ml-2" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center p-16 text-center bg-white rounded-2xl border border-slate-100 border-dashed">
                                <div className="p-4 bg-slate-50 rounded-full mb-4">
                                    <Search size={32} className="text-slate-400" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">No integrations found</h3>
                                <p className="text-slate-500 max-w-md mx-auto">
                                    We couldn't find any tools matching "{searchQuery}". Try searching for something else or contact support to request a new integration.
                                </p>
                            </div>
                        )}
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
