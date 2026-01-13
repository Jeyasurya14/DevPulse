import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface PremiumStatCardProps {
    title: string;
    value: string | number;
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
    icon?: React.ReactNode;
    isLoading?: boolean;
    color?: 'brand' | 'purple' | 'amber' | 'emerald';
}

export default function PremiumStatCard({
    title,
    value,
    change,
    trend = 'neutral',
    icon,
    isLoading = false,
    color = 'brand'
}: PremiumStatCardProps) {

    const colorMap = {
        brand: 'bg-brand-500',
        purple: 'bg-indigo-500',
        amber: 'bg-amber-500',
        emerald: 'bg-emerald-500',
    };

    const bgMap = {
        brand: 'bg-brand-50 text-brand-600',
        purple: 'bg-indigo-50 text-indigo-600',
        amber: 'bg-amber-50 text-amber-600',
        emerald: 'bg-emerald-50 text-emerald-600',
    }

    if (isLoading) {
        return (
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 animate-pulse" />
                    <div className="w-16 h-6 rounded-full bg-slate-50 animate-pulse" />
                </div>
                <div className="h-4 w-24 bg-slate-100 rounded animate-pulse mb-2" />
                <div className="h-8 w-16 bg-slate-100 rounded animate-pulse" />
            </div>
        )
    }

    return (
        <div className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-premium hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
            {/* Background Blob */}
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-[0.03] group-hover:opacity-[0.08] transition-opacity ${colorMap[color]}`} />

            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={`p-3 rounded-2xl ${bgMap[color]}`}>
                    {icon}
                </div>
                {change && (
                    <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${trend === 'up' ? 'bg-green-50 text-green-700' :
                        trend === 'down' ? 'bg-red-50 text-red-700' : 'bg-slate-50 text-slate-600'
                        }`}>
                        {trend === 'up' && <ArrowUpRight size={12} />}
                        {trend === 'down' && <ArrowDownRight size={12} />}
                        {trend === 'neutral' && <Minus size={12} />}
                        {change}
                    </div>
                )}
            </div>

            <h3 className="text-slate-500 text-sm font-medium mb-1 relative z-10">{title}</h3>
            <p className="text-3xl font-bold text-slate-900 tracking-tight relative z-10">{value}</p>
        </div>
    );
}
