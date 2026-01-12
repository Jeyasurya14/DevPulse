
import Sidebar from '@/components/dashboard/Sidebar';
import UsageChart from '@/components/dashboard/UsageChart';
import { Activity, Server, AlertTriangle, Zap } from 'lucide-react';

export default function AnalyticsPage() {
    return (
        <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">System Analytics</h1>
                    <p className="text-slate-500">Monitor your API usage and performance in real-time.</p>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <StatsCard icon={<Activity />} label="Total Requests" value="1,245" color="blue" />
                    <StatsCard icon={<Server />} label="Avg Latency" value="45ms" color="green" />
                    <StatsCard icon={<AlertTriangle />} label="Error Rate" value="0.2%" color="red" />
                    <StatsCard icon={<Zap />} label="Credits Used" value="85%" color="yellow" />
                </div>

                {/* Charts and Details */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <UsageChart />
                    </div>

                    {/* Insights Panel */}
                    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                        <h3 className="text-lg font-bold mb-4">AI Insights</h3>
                        <div className="space-y-4">
                            <div className="p-3 bg-blue-50 rounded-lg text-sm text-slate-700">
                                <span className="font-bold text-blue-700 block mb-1">Traffic Spike</span>
                                Usage peaked on Sunday. Consider enabling auto-scaling.
                            </div>
                            <div className="p-3 bg-green-50 rounded-lg text-sm text-slate-700">
                                <span className="font-bold text-green-700 block mb-1">Optimization</span>
                                Your database latency is optimal (under 50ms).
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}

function StatsCard({ icon, label, value, color }: any) {
    const colors: any = {
        blue: 'bg-blue-100 text-blue-600',
        green: 'bg-green-100 text-green-600',
        red: 'bg-red-100 text-red-600',
        yellow: 'bg-yellow-100 text-yellow-600',
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${colors[color]}`}>
                {icon}
            </div>
            <div>
                <p className="text-slate-500 text-sm font-medium">{label}</p>
                <h4 className="text-2xl font-bold text-slate-900">{value}</h4>
            </div>
        </div>
    )
}
