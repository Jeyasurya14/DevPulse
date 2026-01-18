'use client';

import React, { useState } from 'react';
import { Button, Badge, StatusBadge } from '@/components/ui';
import {
    Github,
    Slack,
    Trello,
    CheckCircle,
    Plus,
    Search,
    Layers,
    Settings2,
    AlertCircle,
    RefreshCw,
    Clock,
    ExternalLink,
    GitBranch,
    Circle
} from 'lucide-react';
import useSWR from 'swr';
import { fetchAPI } from '@/lib/api';
import IntegrationModal from '@/components/dashboard/IntegrationModal';

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
    const { data: integrations, error, mutate, isLoading } = useSWR<Integration[]>('/api/dashboard/integrations/', fetcher);

    const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState<'all' | 'connected' | 'available'>('all');

    const handleUpdate = () => {
        mutate();
    };

    const getIcon = (name: string) => {
        const n = name?.toLowerCase() || '';
        const iconClass = "text-inherit";
        if (n.includes('github')) return <Github size={28} className={iconClass} />;
        if (n.includes('gitlab')) return <GitBranch size={28} className={iconClass} />;
        if (n.includes('jira') || n.includes('trello')) return <Trello size={28} className={iconClass} />;
        if (n.includes('slack')) return <Slack size={28} className={iconClass} />;
        return <Layers size={28} className={iconClass} />;
    };

    const filteredIntegrations = integrations?.filter(i => {
        const matchesSearch = i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            i.provider.toLowerCase().includes(searchQuery.toLowerCase());

        if (activeTab === 'connected') return matchesSearch && i.connected;
        if (activeTab === 'available') return matchesSearch && !i.connected;
        return matchesSearch;
    }) || [];

    const connectedCount = integrations?.filter(i => i.connected).length || 0;
    const availableCount = integrations?.filter(i => !i.connected).length || 0;

    const tabs = [
        { id: 'all', label: 'All', count: integrations?.length || 0 },
        { id: 'connected', label: 'Connected', count: connectedCount },
        { id: 'available', label: 'Available', count: availableCount },
    ];

    return (
        <div className="bg-neutral-50 text-neutral-900 font-sans h-full relative">
            <main className="p-6 md:p-8 lg:p-10 h-full overflow-y-auto scrollbar-thin">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-1">Integration Hub</h1>
                        <p className="text-neutral-500">Connect your favorite tools to centralize your workflow.</p>
                    </div>
                    <div className="relative w-full lg:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search integrations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-white border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-devpulse-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
                        />
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-2 mb-6 border-b border-neutral-200">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`px-4 py-3 text-sm font-semibold transition-colors border-b-2 -mb-px ${activeTab === tab.id
                                ? 'text-devpulse-blue-600 border-devpulse-blue-600'
                                : 'text-neutral-500 border-transparent hover:text-neutral-700'
                                }`}
                        >
                            {tab.label}
                            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeTab === tab.id
                                ? 'bg-devpulse-blue-50 text-devpulse-blue-600'
                                : 'bg-neutral-100 text-neutral-500'
                                }`}>
                                {tab.count}
                            </span>
                        </button>
                    ))}
                </div>

                {error ? (
                    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-neutral-100 shadow-card text-center">
                        <div className="bg-error-50 p-4 rounded-full mb-4">
                            <AlertCircle className="text-error-500" size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-2">Service Unavailable</h3>
                        <p className="text-neutral-500 max-w-md mb-6">
                            We couldn&apos;t retrieve your integrations. This might be due to a network interruption.
                        </p>
                        <Button variant="primary" onClick={() => mutate()}>
                            Retry Connection
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {isLoading ? (
                            [1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-card">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-14 h-14 bg-neutral-100 rounded-xl animate-pulse" />
                                        <div className="w-20 h-6 bg-neutral-100 rounded-full animate-pulse" />
                                    </div>
                                    <div className="w-3/4 h-6 bg-neutral-100 rounded mb-2 animate-pulse" />
                                    <div className="w-full h-4 bg-neutral-100 rounded mb-6 animate-pulse" />
                                    <div className="w-full h-11 bg-neutral-100 rounded-xl animate-pulse" />
                                </div>
                            ))
                        ) : filteredIntegrations.length > 0 ? (
                            filteredIntegrations.map((integration, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white border border-neutral-100 rounded-2xl p-6 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`p-3.5 rounded-xl transition-colors ${integration.connected
                                            ? 'bg-devpulse-blue-50 text-devpulse-blue-600'
                                            : 'bg-neutral-50 text-neutral-400 group-hover:bg-devpulse-blue-50 group-hover:text-devpulse-blue-600'
                                            }`}>
                                            {getIcon(integration.provider)}
                                        </div>
                                        {integration.connected ? (
                                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success-50 border border-success-100">
                                                <span className="relative flex h-2 w-2">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-400 opacity-75" />
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-success-500" />
                                                </span>
                                                <span className="text-xs font-bold text-success-700">Active</span>
                                            </div>
                                        ) : (
                                            <span className="flex items-center gap-1.5 text-xs font-bold text-neutral-400 bg-neutral-50 px-2.5 py-1 rounded-full border border-neutral-100">
                                                <Circle size={8} className="fill-current" />
                                                Inactive
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-lg font-bold mb-1 text-neutral-900">{integration.name}</h3>
                                    <p className="text-neutral-500 text-sm mb-4 flex-grow leading-relaxed">
                                        {integration.description || "Sync data and automate your workflow."}
                                    </p>

                                    {integration.connected && integration.last_synced && (
                                        <div className="flex items-center gap-2 text-xs text-neutral-400 mb-4">
                                            <Clock size={12} />
                                            <span>Last synced: {integration.last_synced}</span>
                                        </div>
                                    )}

                                    <Button
                                        variant={integration.connected ? 'outline' : 'cta'}
                                        fullWidth
                                        onClick={() => setSelectedIntegration(integration)}
                                        leftIcon={integration.connected ? <Settings2 size={16} /> : undefined}
                                        rightIcon={!integration.connected ? <Plus size={16} /> : undefined}
                                    >
                                        {integration.connected ? 'Manage' : 'Connect'}
                                    </Button>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center p-16 text-center bg-white rounded-2xl border border-neutral-100 border-dashed">
                                <div className="p-4 bg-neutral-50 rounded-full mb-4">
                                    <Search size={32} className="text-neutral-400" />
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900 mb-2">No integrations found</h3>
                                <p className="text-neutral-500 max-w-md mx-auto">
                                    We couldn&apos;t find any tools matching &quot;{searchQuery}&quot;. Try a different search term.
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
