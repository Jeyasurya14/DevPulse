'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';
import {
    Activity,
    Server,
    AlertTriangle,
    Zap,
    Calendar,
    Download,
    TrendingUp,
    TrendingDown,
    ArrowUpRight,
    BarChart3,
    LineChart,
    PieChart,
    Filter,
    RefreshCw,
    Gauge,
    Clock,
    GitBranch,
    Users
} from 'lucide-react';
import {
    LineChart as RechartsLineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import useSWR from 'swr';
import { fetchAPI } from '@/lib/api';

export default function AnalyticsPage() {
    const { data: stats } = useSWR('/api/dashboard/stats/', fetchAPI);
    const [dateRange, setDateRange] = useState('30d');
    const [chartType, setChartType] = useState<'line' | 'area'>('area');

    // Real data for charts (fallback to zeros)
    const trends = stats?.deployment_trends || [0, 0, 0, 0, 0, 0, 0];
    const chartData = [
        { name: 'Mon', deployments: trends[0] || 0 },
        { name: 'Tue', deployments: trends[1] || 0 },
        { name: 'Wed', deployments: trends[2] || 0 },
        { name: 'Thu', deployments: trends[3] || 0 },
        { name: 'Fri', deployments: trends[4] || 0 },
        { name: 'Sat', deployments: trends[5] || 0 },
        { name: 'Sun', deployments: trends[6] || 0 },
    ];

    const statsCards = [
        {
            icon: Activity,
            label: 'Total Requests',
            value: '-',
            change: '0%',
            trend: 'neutral',
            color: 'blue'
        },
        {
            icon: Server,
            label: 'Avg Latency',
            value: '-',
            change: '0%',
            trend: 'neutral',
            color: 'emerald'
        },
        {
            icon: AlertTriangle,
            label: 'Error Rate',
            value: '-',
            change: '0%',
            trend: 'neutral',
            color: 'amber'
        },
        {
            icon: Zap,
            label: 'Credits Used',
            value: '-',
            change: '0%',
            trend: 'neutral',
            color: 'purple'
        },
    ];

    const doraMetrics = [
        {
            label: 'Deployment Frequency',
            value: stats?.dora_metrics?.deployment_frequency?.value || '-',
            change: stats?.dora_metrics?.deployment_frequency?.change || '',
            trend: stats?.dora_metrics?.deployment_frequency?.trend || 'neutral',
            icon: GitBranch
        },
        {
            label: 'Lead Time',
            value: stats?.dora_metrics?.lead_time?.value || '-',
            change: stats?.dora_metrics?.lead_time?.change || '',
            trend: stats?.dora_metrics?.lead_time?.trend || 'neutral',
            icon: Clock
        },
        {
            label: 'Change Failure Rate',
            value: stats?.dora_metrics?.change_failure_rate?.value || '-',
            change: stats?.dora_metrics?.change_failure_rate?.change || '',
            trend: stats?.dora_metrics?.change_failure_rate?.trend || 'neutral',
            icon: AlertTriangle
        },
        {
            label: 'MTTR',
            value: stats?.dora_metrics?.mttr?.value || '-',
            change: stats?.dora_metrics?.mttr?.change || '',
            trend: stats?.dora_metrics?.mttr?.trend || 'neutral',
            icon: RefreshCw
        },
    ];

    const insights: any[] = [];

    return (
        <div className="h-full bg-neutral-50 text-neutral-900 font-sans">
            <main className="p-6 md:p-8 lg:p-10 h-full overflow-y-auto scrollbar-thin">
                {/* Header */}
                <header className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-1">Analytics</h1>
                        <p className="text-neutral-500">Monitor your engineering metrics and performance in real-time.</p>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                        <select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="bg-white border border-neutral-200 rounded-xl px-4 py-2.5 text-sm font-medium text-neutral-700 focus:outline-none focus:ring-2 focus:ring-devpulse-blue-500"
                        >
                            <option value="7d">Last 7 days</option>
                            <option value="30d">Last 30 days</option>
                            <option value="90d">Last 90 days</option>
                        </select>
                        <div className="flex items-center bg-white border border-neutral-200 rounded-xl p-1">
                            <button
                                onClick={() => setChartType('line')}
                                className={`p-2 rounded-lg transition-colors ${chartType === 'line' ? 'bg-devpulse-blue-50 text-devpulse-blue-600' : 'text-neutral-400 hover:text-neutral-600'}`}
                            >
                                <LineChart size={18} />
                            </button>
                            <button
                                onClick={() => setChartType('area')}
                                className={`p-2 rounded-lg transition-colors ${chartType === 'area' ? 'bg-devpulse-blue-50 text-devpulse-blue-600' : 'text-neutral-400 hover:text-neutral-600'}`}
                            >
                                <BarChart3 size={18} />
                            </button>
                        </div>
                        <Button variant="outline" leftIcon={<Download size={16} />}>
                            Export
                        </Button>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                    {statsCards.map((stat, idx) => (
                        <div key={idx} className="bg-white p-5 rounded-xl border border-neutral-100 shadow-card hover:shadow-card-hover transition-shadow">
                            <div className="flex items-center justify-between mb-3">
                                <div className={`p-2.5 rounded-lg bg-${stat.color === 'blue' ? 'devpulse-blue' : stat.color}-50`}>
                                    <stat.icon size={20} className={`text-${stat.color === 'blue' ? 'devpulse-blue' : stat.color}-600`} />
                                </div>
                                <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${stat.trend === 'up' ? 'bg-success-50 text-success-700' : 'bg-neutral-100 text-neutral-600'
                                    }`}>
                                    {stat.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                    {stat.change}
                                </span>
                            </div>
                            <p className="text-sm text-neutral-500 mb-1">{stat.label}</p>
                            <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* DORA Metrics */}
                <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-6 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-devpulse-yellow-50 rounded-lg">
                                <Gauge size={20} className="text-devpulse-yellow-600" />
                            </div>
                            <div>
                                <h2 className="font-bold text-lg text-neutral-900">DORA Metrics</h2>
                                <p className="text-sm text-neutral-500">Key engineering performance indicators</p>
                            </div>
                        </div>
                        <button className="text-sm font-semibold text-devpulse-blue-600 flex items-center gap-1 hover:gap-2 transition-all">
                            View Details <ArrowUpRight size={14} />
                        </button>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {doraMetrics.map((metric, idx) => (
                            <div key={idx} className="p-4 bg-neutral-50 rounded-xl">
                                <div className="flex items-center gap-2 mb-2">
                                    <metric.icon size={14} className="text-neutral-400" />
                                    <span className="text-xs font-medium text-neutral-500">{metric.label}</span>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-xl font-bold text-neutral-900">{metric.value}</span>
                                    <span className={`text-xs font-bold ${metric.trend === 'up' ? 'text-success-600' : 'text-error-600'
                                        }`}>
                                        {metric.change}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Charts & Insights */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Chart */}
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-100 shadow-card p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-lg text-neutral-900">Deployment Trends</h3>
                            <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-devpulse-blue-500" />
                                    <span className="text-neutral-500">Deployments</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                {chartType === 'area' ? (
                                    <AreaChart data={chartData}>
                                        <defs>
                                            <linearGradient id="colorDeployments" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#0052CC" stopOpacity={0.2} />
                                                <stop offset="95%" stopColor="#0052CC" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EC" />
                                        <XAxis dataKey="name" stroke="#64748B" fontSize={12} />
                                        <YAxis stroke="#64748B" fontSize={12} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'white',
                                                border: '1px solid #E4E7EC',
                                                borderRadius: '12px',
                                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                            }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="deployments"
                                            stroke="#0052CC"
                                            strokeWidth={2}
                                            fillOpacity={1}
                                            fill="url(#colorDeployments)"
                                        />
                                    </AreaChart>
                                ) : (
                                    <RechartsLineChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EC" />
                                        <XAxis dataKey="name" stroke="#64748B" fontSize={12} />
                                        <YAxis stroke="#64748B" fontSize={12} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'white',
                                                border: '1px solid #E4E7EC',
                                                borderRadius: '12px',
                                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                            }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="deployments"
                                            stroke="#0052CC"
                                            strokeWidth={2}
                                            dot={{ fill: '#0052CC', strokeWidth: 2 }}
                                        />
                                    </RechartsLineChart>
                                )}
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* AI Insights */}
                    <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="p-2 bg-devpulse-blue-50 rounded-lg">
                                <Zap size={18} className="text-devpulse-blue-600" />
                            </div>
                            <h3 className="font-bold text-lg text-neutral-900">AI Insights</h3>
                        </div>
                        <div className="space-y-4">
                            {insights.map((insight, idx) => (
                                <div
                                    key={idx}
                                    className={`p-4 rounded-xl bg-${insight.color === 'blue' ? 'devpulse-blue' : insight.color}-50 border border-${insight.color === 'blue' ? 'devpulse-blue' : insight.color}-100`}
                                >
                                    <h4 className={`font-bold text-sm text-${insight.color === 'blue' ? 'devpulse-blue' : insight.color}-700 mb-1`}>
                                        {insight.title}
                                    </h4>
                                    <p className="text-sm text-neutral-600">
                                        {insight.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
