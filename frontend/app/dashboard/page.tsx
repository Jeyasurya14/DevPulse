'use client';

import NotificationBell from '@/components/dashboard/NotificationBell';
import Link from 'next/link';
import { Button } from '@/components/ui';
import {
    Plus,
    Clock,
    AlertCircle,
    TrendingUp,
    Shield,
    Download,
    Calendar,
    Zap,
    Users,
    GitBranch,
    BarChart3
} from 'lucide-react';
import useSWR from 'swr';
import { useState } from 'react';
import { fetchAPI } from '@/lib/api';
import CreateProjectModal from '@/components/dashboard/CreateProjectModal';

// SWR Fetcher
const fetcher = (url: string) => fetchAPI(url);

interface DashboardStats {
    projects: number;
    scans: number;
    issues: number;
    apiUsage: number;
    team_velocity?: string;
    active_members?: number;
    recent_activity: {
        title: string;
        time: string;
        type: 'success' | 'warning' | 'info';
    }[];
}

export default function DashboardPage() {
    const { data: stats, error, isLoading } = useSWR<DashboardStats>('/api/dashboard/stats/', fetcher, {
        refreshInterval: 30000,
        revalidateOnFocus: false,
        keepPreviousData: true
    });

    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
    const [dateRange, setDateRange] = useState('30d');

    const dateRangeOptions = [
        { value: '7d', label: 'Last 7 days' },
        { value: '30d', label: 'Last 30 days' },
        { value: '90d', label: 'Last 90 days' },
        { value: 'custom', label: 'Custom range' },
    ];

    if (error) {
        return (
            <div className="h-full p-8 flex flex-col items-center justify-center text-center">
                <div className="bg-error-50 p-4 rounded-full mb-4">
                    <AlertCircle className="text-error-500" size={40} />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">Unable to Load Dashboard</h3>
                <Button variant="primary" onClick={() => window.location.reload()}>Retry Connection</Button>
            </div>
        )
    }

    return (
        <div className="h-full bg-neutral-50/50 text-neutral-900 font-sans relative">
            <main className="flex-1 p-6 md:p-8 lg:p-10 overflow-y-auto h-full scrollbar-thin">
                {/* Header */}
                <div className="h-16 border-b border-neutral-200 bg-white px-6 flex items-center justify-between rounded-xl mb-8 shadow-sm">
                    <div>
                        <h3 className="font-bold text-neutral-900 text-lg">Engineering Overview</h3>
                        <p className="text-xs text-neutral-500">Updated just now</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex text-xs font-medium px-3 py-1.5 bg-success-50 text-success-700 rounded-full items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-success-500 animate-pulse" />
                            System Healthy
                        </div>
                        <div className="flex items-center gap-3">
                            {/* Date Range Selector */}
                            <div className="relative hidden md:block">
                                <select
                                    value={dateRange}
                                    onChange={(e) => setDateRange(e.target.value)}
                                    className="appearance-none bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-1.5 pr-8 text-xs font-medium text-neutral-600 focus:outline-none focus:ring-1 focus:ring-devpulse-blue-500"
                                >
                                    {dateRangeOptions.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                                <Calendar size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                            </div>

                            <Button size="sm" variant="cta" onClick={() => setIsProjectModalOpen(true)} leftIcon={<Plus size={14} />}>
                                New Project
                            </Button>
                        </div>
                    </div>
                </div>

                <CreateProjectModal
                    isOpen={isProjectModalOpen}
                    onClose={() => setIsProjectModalOpen(false)}
                />

                {/* Dashboard Grid */}
                <div className="flex flex-col gap-6">
                    {/* Key Metrics Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Deploys/Day */}
                        <div className="bg-white p-5 rounded-xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-2">
                                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">Deploys/Day</span>
                                <TrendingUp size={16} className="text-success-500" />
                            </div>
                            <div className="text-3xl font-bold text-neutral-900 mb-1">12.4</div>
                            <div className="text-xs font-medium text-success-600 flex items-center gap-1">
                                +24% <span className="text-neutral-400 font-normal">vs last week</span>
                            </div>
                        </div>

                        {/* Lead Time */}
                        <div className="bg-white p-5 rounded-xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-2">
                                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">Lead Time</span>
                                <Clock size={16} className="text-success-500" />
                            </div>
                            <div className="text-3xl font-bold text-neutral-900 mb-1">45m</div>
                            <div className="text-xs font-medium text-success-600 flex items-center gap-1">
                                -15% <span className="text-neutral-400 font-normal">faster</span>
                            </div>
                        </div>

                        {/* Failure Rate */}
                        <div className="bg-white p-5 rounded-xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-2">
                                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">Failure Rate</span>
                                <Shield size={16} className="text-success-500" />
                            </div>
                            <div className="text-3xl font-bold text-neutral-900 mb-1">0.8%</div>
                            <div className="text-xs font-medium text-devpulse-blue-600 flex items-center gap-1">
                                Elite Status
                            </div>
                        </div>

                        {/* Active Projects (Real Data) */}
                        <div className="bg-white p-5 rounded-xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-2">
                                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">Active Projects</span>
                                <GitBranch size={16} className="text-devpulse-blue-500" />
                            </div>
                            <div className="text-3xl font-bold text-neutral-900 mb-1">{isLoading ? '-' : stats?.projects || 0}</div>
                            <div className="text-xs font-medium text-neutral-400 flex items-center gap-1">
                                Total Repositories
                            </div>
                        </div>
                    </div>

                    {/* Chart & Activity Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[300px]">
                        {/* Deployment Trends Chart */}
                        <div className="lg:col-span-2 bg-white rounded-xl border border-neutral-100 shadow-sm p-6 flex flex-col">
                            <div className="flex items-center justify-between mb-8">
                                <h4 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                                    <BarChart3 size={18} className="text-devpulse-blue-500" />
                                    Deployment Trends
                                </h4>
                                <div className="flex gap-2">
                                    <div className="w-24 h-8 rounded-lg bg-neutral-50 border border-neutral-200 text-xs flex items-center justify-center text-neutral-500">
                                        Last 7 Days
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 flex items-end justify-between gap-4 px-2 pb-2">
                                {[40, 65, 45, 80, 55, 90, 75, 60, 85, 50, 70, 95].map((h, i) => (
                                    <div key={i} className="w-full bg-devpulse-blue-50/50 rounded-t-lg relative group h-full flex items-end">
                                        <div
                                            style={{ height: `${h}%` }}
                                            className="w-full bg-devpulse-blue-500 rounded-t-lg group-hover:bg-devpulse-blue-600 transition-all cursor-pointer relative"
                                        >
                                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                {h} deploys
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-4 px-2 text-xs text-neutral-400 font-medium">
                                <span>Mon</span>
                                <span>Tue</span>
                                <span>Wed</span>
                                <span>Thu</span>
                                <span>Fri</span>
                                <span>Sat</span>
                                <span>Sun</span>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-xl border border-neutral-100 shadow-sm p-6 overflow-hidden flex flex-col">
                            <div className="flex items-center justify-between mb-6">
                                <h4 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                                    <Clock size={18} className="text-devpulse-blue-500" />
                                    Live Activity
                                </h4>
                                <button className="text-xs text-devpulse-blue-600 font-medium hover:underline">View All</button>
                            </div>

                            <div className="space-y-6 overflow-y-auto flex-1 pr-2">
                                {isLoading ? (
                                    // Skeletons
                                    [1, 2, 3].map(i => (
                                        <div key={i} className="flex gap-3 animate-pulse">
                                            <div className="mt-1 w-2 h-2 rounded-full bg-neutral-200 shrink-0" />
                                            <div className="flex-1">
                                                <div className="w-3/4 h-3 rounded bg-neutral-200 mb-2" />
                                                <div className="w-1/2 h-2 rounded bg-neutral-100" />
                                            </div>
                                        </div>
                                    ))
                                ) : stats?.recent_activity?.length ? (
                                    stats.recent_activity.map((item, idx) => (
                                        <div key={idx} className="flex gap-3 relative group">
                                            <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${item.type === 'success' ? 'bg-success-500' :
                                                    item.type === 'warning' ? 'bg-warning-500' : 'bg-devpulse-blue-500'
                                                }`} />
                                            <div>
                                                <p className="text-sm font-medium text-neutral-800 leading-tight group-hover:text-devpulse-blue-600 transition-colors">
                                                    {item.title}
                                                </p>
                                                <p className="text-xs text-neutral-400 mt-1">{item.time}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-10 text-neutral-400 text-sm">
                                        No recent activity
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
