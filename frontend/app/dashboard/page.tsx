'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import { Activity, Plus, Users, Zap, ArrowUpRight, Clock } from 'lucide-react';

export default function DashboardPage() {
    return (
        <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard Overview</h1>
                        <p className="text-slate-500">Welcome back! Here's what's happening today.</p>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow-sm transition-all">
                        <Plus size={18} /> New Project
                    </button>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard
                        title="Total Projects"
                        value="12"
                        trend="+2 this week"
                        icon={<Zap className="text-blue-600" size={24} />}
                        trendUp={true}
                    />
                    <StatCard
                        title="Team Velocity"
                        value="142 pts"
                        trend="+12% vs last sprint"
                        icon={<Activity className="text-purple-600" size={24} />}
                        trendUp={true}
                    />
                    <StatCard
                        title="Active Members"
                        value="8"
                        trend="Teams stable"
                        icon={<Users className="text-green-600" size={24} />}
                        trendUp={true}
                    />
                </div>

                {/* Activity & Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Activity Feed */}
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                        <h3 className="font-bold text-lg text-slate-900 mb-6 flex items-center gap-2">
                            <Clock size={20} className="text-slate-400" /> Recent Activity
                        </h3>
                        <div className="space-y-6">
                            <ActivityItem
                                title="Project 'Alpha' analysis completed"
                                time="2 hours ago"
                                type="success"
                            />
                            <ActivityItem
                                title="New security vulnerability detected"
                                time="4 hours ago"
                                type="warning"
                            />
                            <ActivityItem
                                title="Team 'Frontend' velocity updated"
                                time="Yesterday"
                                type="info"
                            />
                            <ActivityItem
                                title="Subscription renewed"
                                time="2 days ago"
                                type="info"
                            />
                        </div>
                    </div>

                    {/* Quick Access */}
                    <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
                        <h3 className="font-bold text-lg mb-4 relative z-10">Quick Actions</h3>
                        <div className="space-y-3 relative z-10">
                            <button className="w-full text-left bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-colors flex items-center justify-between group">
                                <span className="font-medium text-sm">Run Code Analysis</span>
                                <ArrowUpRight size={16} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                            </button>
                            <button className="w-full text-left bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-colors flex items-center justify-between group">
                                <span className="font-medium text-sm">Invite Member</span>
                                <ArrowUpRight size={16} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                            </button>
                            <button className="w-full text-left bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-colors flex items-center justify-between group">
                                <span className="font-medium text-sm">View Reports</span>
                                <ArrowUpRight size={16} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                            </button>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/10">
                            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-2">System Status</p>
                            <div className="flex items-center gap-2 text-sm text-green-400 font-bold">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                All Services Operational
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function StatCard({ title, value, trend, icon, trendUp }: any) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-50 rounded-xl">{icon}</div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${trendUp ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {trend}
                </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
            <p className="text-3xl font-bold text-slate-900">{value}</p>
        </div>
    )
}

function ActivityItem({ title, time, type }: any) {
    const getDotColor = () => {
        if (type === 'success') return 'bg-green-500';
        if (type === 'warning') return 'bg-orange-500';
        return 'bg-blue-500';
    }

    return (
        <div className="flex items-start gap-4">
            <div className={`mt-2 w-2 h-2 rounded-full ${getDotColor()} ring-4 ring-slate-50`}></div>
            <div>
                <p className="font-semibold text-slate-800 text-sm">{title}</p>
                <p className="text-xs text-slate-400">{time}</p>
            </div>
        </div>
    )
}
