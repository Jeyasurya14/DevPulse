'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui';
import {
    Bell,
    Plus,
    Settings2,
    Trash2,
    Slack,
    Mail,
    AlertTriangle,
    CheckCircle,
    Zap,
    GitBranch,
    Shield,
    Activity,
    ToggleLeft,
    ToggleRight,
    Clock
} from 'lucide-react';
import { fetchAPI } from '@/lib/api';
import useSWR from 'swr';

export default function AlertsPage() {
    const { data: apiAlerts, isLoading } = useSWR('/api/dashboard/alerts/', fetchAPI);
    const [localAlerts, setLocalAlerts] = useState<any[]>([]);

    // Sync state when API data arrives
    React.useEffect(() => {
        if (apiAlerts) {
            setLocalAlerts(apiAlerts);
        }
    }, [apiAlerts]);

    const alerts = localAlerts.length > 0 ? localAlerts : (apiAlerts || []);

    const recentAlertHistory = [
        { message: 'Deployment to production completed successfully', type: 'success', time: '2 min ago' },
        { message: 'API error rate exceeded 5% threshold', type: 'warning', time: '1 hour ago' },
        { message: 'Security scan detected new vulnerability', type: 'critical', time: '3 hours ago' },
        { message: 'PR #432 merged after auto-approval', type: 'info', time: '5 hours ago' },
        { message: 'Weekly performance report generated', type: 'info', time: '1 day ago' },
    ];

    const toggleAlert = (id: number) => {
        setLocalAlerts(alerts.map((a: any) => a.id === id ? { ...a, enabled: !a.enabled } : a));
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'deployment': return <GitBranch size={18} />;
            case 'performance': return <Activity size={18} />;
            case 'security': return <Shield size={18} />;
            case 'workflow': return <Clock size={18} />;
            default: return <Bell size={18} />;
        }
    };

    const getHistoryIcon = (type: string) => {
        switch (type) {
            case 'success': return <CheckCircle size={16} className="text-success-500" />;
            case 'warning': return <AlertTriangle size={16} className="text-warning-500" />;
            case 'critical': return <AlertTriangle size={16} className="text-error-500" />;
            default: return <Bell size={16} className="text-devpulse-blue-500" />;
        }
    };

    return (
        <div className="h-full bg-neutral-50 font-sans">
            <main className="p-6 md:p-8 lg:p-10 h-full overflow-y-auto scrollbar-thin">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-1">Alert Management</h1>
                        <p className="text-neutral-500">Configure notifications and monitor alert history</p>
                    </div>
                    <Button variant="cta" leftIcon={<Plus size={18} />}>
                        Create Alert Rule
                    </Button>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* Alert Rules */}
                    <div className="xl:col-span-2 space-y-4">
                        <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
                            <Settings2 size={18} className="text-devpulse-blue-600" />
                            Alert Rules
                        </h2>

                        {alerts.map((alert: any) => (
                            <div
                                key={alert.id}
                                className={`bg-white p-5 rounded-xl border shadow-card transition-all ${alert.enabled ? 'border-devpulse-blue-100' : 'border-neutral-100 opacity-75'
                                    }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-4">
                                        <div className={`p-2.5 rounded-lg ${alert.enabled ? 'bg-devpulse-blue-50 text-devpulse-blue-600' : 'bg-neutral-100 text-neutral-400'
                                            }`}>
                                            {getTypeIcon(alert.type)}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-neutral-900">{alert.name}</h3>
                                            <p className="text-sm text-neutral-500 mt-0.5">
                                                Trigger: <span className="font-medium">{alert.threshold}</span>
                                            </p>
                                            <div className="flex items-center gap-3 mt-3">
                                                {alert.channels.includes('slack') && (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-600">
                                                        <Slack size={12} /> Slack
                                                    </span>
                                                )}
                                                {alert.channels.includes('email') && (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-devpulse-blue-50 text-devpulse-blue-600">
                                                        <Mail size={12} /> Email
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => toggleAlert(alert.id)}
                                            className={`p-1 rounded-full transition-colors ${alert.enabled ? 'text-devpulse-blue-600' : 'text-neutral-300'
                                                }`}
                                        >
                                            {alert.enabled ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                                        </button>
                                        <button className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-400 hover:text-neutral-600 transition-colors">
                                            <Settings2 size={16} />
                                        </button>
                                        <button className="p-2 hover:bg-error-50 rounded-lg text-neutral-400 hover:text-error-500 transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Recent Alert History */}
                    <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-6">
                        <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2 mb-6">
                            <Clock size={18} className="text-devpulse-yellow-500" />
                            Recent History
                        </h2>

                        <div className="space-y-4">
                            {recentAlertHistory.map((item, idx) => (
                                <div key={idx} className="flex gap-3">
                                    <div className="mt-0.5">
                                        {getHistoryIcon(item.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-neutral-800 leading-snug">{item.message}</p>
                                        <p className="text-xs text-neutral-400 mt-1">{item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="mt-6 w-full text-center text-sm font-semibold text-devpulse-blue-600 hover:text-devpulse-blue-700">
                            View Full History →
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
