'use client';

import { useState, useEffect } from 'react';
import { X, Save, Trash2, Github, Slack, Trello, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { fetchAPI } from '@/lib/api';

interface IntegrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    integration: any;
    onUpdate: () => void;
}

export default function IntegrationModal({ isOpen, onClose, integration, onUpdate }: IntegrationModalProps) {
    const [loading, setLoading] = useState(false);
    const [apiKey, setApiKey] = useState('');
    const [config, setConfig] = useState<any>({});
    const [error, setError] = useState('');

    useEffect(() => {
        if (integration) {
            setConfig(integration.config || {});
            setApiKey(''); // Don't show masked key in input
            setError('');
        }
    }, [integration]);

    if (!isOpen || !integration) return null;

    const handleConnect = async () => {
        setLoading(true);
        setError('');

        // Validation
        if (!integration.connected && !apiKey) {
            setError('API Key is required for new connections');
            setLoading(false);
            return;
        }

        try {
            await fetchAPI('/api/integrations/connect/', {
                method: 'POST',
                body: JSON.stringify({
                    provider: integration.provider,
                    api_key: apiKey,
                    config: config
                })
            });
            onUpdate();
            onClose();
        } catch (err: any) {
            setError(err.message || 'Failed to connect');
        } finally {
            setLoading(false);
        }
    };

    const handleDisconnect = async () => {
        if (!confirm("Are you sure? This will stop all syncs.")) return;

        setLoading(true);
        try {
            await fetchAPI('/api/integrations/disconnect/', {
                method: 'POST',
                body: JSON.stringify({ provider: integration.provider })
            });
            onUpdate();
            onClose();
        } catch (err: any) {
            setError('Failed to disconnect');
        } finally {
            setLoading(false);
        }
    };

    const getIcon = (name: string) => {
        const n = name?.toLowerCase() || '';
        if (n.includes('github')) return <Github size={24} />;
        if (n.includes('jira') || n.includes('trello')) return <Trello size={24} />;
        if (n.includes('slack')) return <Slack size={24} />;
        return <Trello size={24} />;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white border border-slate-200 rounded-lg text-blue-600 shadow-sm">
                            {getIcon(integration.provider)}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">{integration.name}</h3>
                            <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{integration.provider} integration</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-600">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Connection Status */}
                    {integration.connected ? (
                        <div className="bg-green-50 border border-green-200 p-4 rounded-xl flex items-center gap-3">
                            <CheckCircle className="text-green-600" size={20} />
                            <div>
                                <p className="text-sm font-bold text-green-700">Connected</p>
                                <p className="text-xs text-green-600">Last synced: {integration.last_synced ? new Date(integration.last_synced).toLocaleString() : 'Just now'}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-center gap-3">
                            <AlertCircle className="text-blue-600" size={20} />
                            <div>
                                <p className="text-sm font-bold text-blue-700">Not Connected</p>
                                <p className="text-xs text-blue-600">Enter your credentials to enable sync.</p>
                            </div>
                        </div>
                    )}

                    {/* Config Fields */}
                    <div className="space-y-5">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">API Key / Token</label>
                            <input
                                type="password"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-slate-400 text-slate-900 font-medium"
                                placeholder={integration.connected ? "Enter new key to update..." : "Enter your API Key"}
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                            />
                        </div>

                        {/* Provider Specific Config */}
                        {integration.provider === 'github' && (
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Repository</label>
                                <select
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 font-medium"
                                    value={config.repo || ''}
                                    onChange={(e) => setConfig({ ...config, repo: e.target.value })}
                                >
                                    <option value="">Select a repository...</option>
                                    <option value="frontend-app">my-org/frontend-app</option>
                                    <option value="backend-api">my-org/backend-api</option>
                                    <option value="docs">my-org/docs</option>
                                </select>
                            </div>
                        )}

                        {integration.provider === 'slack' && (
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Notification Channel</label>
                                <select
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 font-medium"
                                    value={config.channel || ''}
                                    onChange={(e) => setConfig({ ...config, channel: e.target.value })}
                                >
                                    <option value="">Select a channel...</option>
                                    <option value="general">#general</option>
                                    <option value="alerts">#alerts</option>
                                    <option value="random">#random</option>
                                </select>
                            </div>
                        )}

                        {integration.provider === 'jira' && (
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Project Key</label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-slate-400 text-slate-900 font-medium"
                                    placeholder="e.g. PROJ"
                                    value={config.project_key || ''}
                                    onChange={(e) => setConfig({ ...config, project_key: e.target.value })}
                                />
                            </div>
                        )}
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
                            <AlertCircle size={16} /> {error}
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-between gap-3">
                    {integration.connected ? (
                        <button
                            onClick={handleDisconnect}
                            className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-xl font-bold hover:bg-red-100 transition-colors flex items-center text-sm"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="animate-spin mr-2" size={16} /> : <Trash2 size={16} className="mr-2" />}
                            Disconnect
                        </button>
                    ) : <div></div>}

                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded-xl font-bold text-slate-500 hover:bg-slate-200 transition-colors text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConnect}
                            className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 flex items-center text-sm"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="animate-spin mr-2" size={16} /> : <Save size={16} className="mr-2" />}
                            {integration.connected ? 'Save Changes' : 'Connect'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
