
'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import NotificationBell from '@/components/dashboard/NotificationBell';
import Link from 'next/link';
import { Activity, Plus, Users, Zap, ArrowUpRight, Clock, Loader2, AlertCircle, LayoutDashboard, Code2, CreditCard, Sparkles, MessageSquare, BarChart } from 'lucide-react';
import useSWR from 'swr';
import { useState } from 'react';
import { fetchAPI } from '@/lib/api';
import PremiumStatCard from '@/components/dashboard/PremiumStatCard';
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

    return (
        <div className="h-full bg-slate-50/50 text-slate-900 font-sans relative">
            <main className="flex-1 p-6 md:p-10 overflow-y-auto h-full scrollbar-none">
                {/* Premium Header */}
                <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 mb-1 tracking-tight">Dashboard Overview</h1>
                        <p className="text-slate-500 font-medium">Welcome back! Here's your production summary.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="p-1.5 bg-white rounded-xl shadow-sm border border-slate-100">
                            <NotificationBell />
                        </div>
                        <button
                            onClick={() => setIsProjectModalOpen(true)}
                            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
                        >
                            <Plus size={20} className="stroke-[3]" /> New Project
                        </button>
                    </div>
                </header>

                <CreateProjectModal
                    isOpen={isProjectModalOpen}
                    onClose={() => setIsProjectModalOpen(false)}
                />

                {error ? (
                    <div className="p-6 bg-red-50 text-red-700 rounded-2xl border border-red-100 flex items-center gap-3">
                        <AlertCircle /> Failed to load dashboard data. Please try again.
                    </div>
                ) : (
                    <>
                        {/* Premium Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                            <PremiumStatCard
                                title="Total Projects"
                                value={stats?.projects ?? 0}
                                change="12%"
                                trend="up"
                                icon={<LayoutDashboard size={22} />}
                                color="brand"
                                isLoading={isLoading && !stats}
                            />
                            <PremiumStatCard
                                title="Code Scans"
                                value={stats?.scans ?? 0}
                                change="5%"
                                trend="up"
                                icon={<Code2 size={22} />}
                                color="purple"
                                isLoading={isLoading && !stats}
                            />
                            <PremiumStatCard
                                title="Issues Fixed"
                                value={stats?.issues ?? 0}
                                change="18%"
                                trend="up"
                                icon={<Zap size={22} />}
                                color="amber"
                                isLoading={isLoading && !stats}
                            />
                            <PremiumStatCard
                                title="API Usage"
                                value={`${stats?.apiUsage ?? 0}%`}
                                change="Healthy"
                                trend="neutral"
                                icon={<CreditCard size={22} />}
                                color="emerald"
                                isLoading={isLoading && !stats}
                            />
                        </div>

                        {/* Activity & Quick Actions Layout */}
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                            {/* Activity Feed Timeline */}
                            <div className="xl:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-premium p-8 relative overflow-hidden">
                                <h3 className="font-bold text-lg text-slate-900 mb-8 flex items-center gap-2">
                                    <Clock size={20} className="text-indigo-500" /> recent activity
                                </h3>

                                <div className="space-y-0 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                                    {isLoading && !stats ? (
                                        [1, 2, 3].map(i => (
                                            <div key={i} className="flex gap-4 animate-pulse mb-8 relative z-10 pl-8">
                                                <div className="space-y-2 flex-1">
                                                    <div className="h-4 bg-slate-100 rounded w-1/3"></div>
                                                    <div className="h-3 bg-slate-50 rounded w-1/4"></div>
                                                </div>
                                            </div>
                                        ))
                                    ) : stats?.recent_activity && stats.recent_activity.length > 0 ? (
                                        stats.recent_activity.map((item, idx) => (
                                            <ActivityItem
                                                key={idx}
                                                title={item.title}
                                                time={item.time}
                                                type={item.type}
                                                isLast={idx === stats.recent_activity.length - 1}
                                            />
                                        ))
                                    ) : (
                                        <div className="text-center py-10 relative z-10">
                                            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <Clock className="text-slate-300" size={32} />
                                            </div>
                                            <p className="text-slate-400 font-medium">No recent activity found.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Quick Access Card */}
                            <div className="bg-[#0f172a] rounded-3xl p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-2xl min-h-[400px]">
                                {/* Decorative background elements */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20 pointer-events-none"></div>
                                <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500 rounded-full blur-[80px] opacity-10 -ml-10 -mb-10 pointer-events-none"></div>

                                <div className="relative z-10">
                                    <h3 className="font-bold text-xl mb-6">Quick Actions</h3>
                                    <div className="space-y-4">
                                        <Link href="/dashboard/analysis" className="group flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-indigo-500/30 rounded-2xl transition-all duration-300 backdrop-blur-sm">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-300 group-hover:text-white transition-colors">
                                                    <Sparkles size={18} />
                                                </div>
                                                <span className="font-medium">Code Analysis</span>
                                            </div>
                                            <ArrowUpRight size={18} className="text-slate-500 group-hover:text-white transition-colors" />
                                        </Link>
                                        <Link href="/dashboard/collaboration" className="group flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-purple-500/30 rounded-2xl transition-all duration-300 backdrop-blur-sm">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-purple-500/20 rounded-lg text-purple-300 group-hover:text-white transition-colors">
                                                    <MessageSquare size={18} />
                                                </div>
                                                <span className="font-medium">Invite Team</span>
                                            </div>
                                            <ArrowUpRight size={18} className="text-slate-500 group-hover:text-white transition-colors" />
                                        </Link>
                                        <Link href="/dashboard/analytics" className="group flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-emerald-500/30 rounded-2xl transition-all duration-300 backdrop-blur-sm">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-300 group-hover:text-white transition-colors">
                                                    <BarChart size={18} />
                                                </div>
                                                <span className="font-medium">View Reports</span>
                                            </div>
                                            <ArrowUpRight size={18} className="text-slate-500 group-hover:text-white transition-colors" />
                                        </Link>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">System Status</p>
                                        <span className="flex h-2 w-2 relative">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                    </div>
                                    <div className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500">
                                        All Systems Operational
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}

function ActivityItem({ title, time, type, isLast }: any) {
    const getDotColor = () => {
        if (type === 'success') return 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]';
        if (type === 'warning') return 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.4)]';
        return 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.4)]';
    }

    return (
        <div className={`relative flex items-start gap-4 mb-8 ${isLast ? 'mb-0' : ''}`}>
            {/* Timeline Dot */}
            <div className={`absolute left-0 mt-1.5 w-3 h-3 rounded-full ${getDotColor()} ring-4 ring-white z-10`} />

            <div className="pl-8">
                <p className="font-semibold text-slate-800 text-sm">{title}</p>
                <p className="text-xs text-slate-400 font-medium mt-0.5">{time}</p>
            </div>
        </div>
    )
}
