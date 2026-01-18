'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface PremiumStatCardProps {
    title: string;
    value: number | string;
    change: string;
    trend: 'up' | 'down' | 'neutral';
    icon: React.ReactNode;
    color: 'blue' | 'purple' | 'emerald' | 'amber' | 'rose';
    isLoading?: boolean;
}

export default function PremiumStatCard({
    title,
    value,
    change,
    trend,
    icon,
    color,
    isLoading = false
}: PremiumStatCardProps) {
    const colorStyles = {
        blue: {
            bg: 'bg-devpulse-blue-50',
            icon: 'text-devpulse-blue-600',
            gradient: 'from-devpulse-blue-50 to-white',
            border: 'border-devpulse-blue-100',
            accent: 'bg-devpulse-blue-600',
        },
        purple: {
            bg: 'bg-purple-50',
            icon: 'text-purple-600',
            gradient: 'from-purple-50 to-white',
            border: 'border-purple-100',
            accent: 'bg-purple-600',
        },
        emerald: {
            bg: 'bg-emerald-50',
            icon: 'text-emerald-600',
            gradient: 'from-emerald-50 to-white',
            border: 'border-emerald-100',
            accent: 'bg-emerald-600',
        },
        amber: {
            bg: 'bg-amber-50',
            icon: 'text-amber-600',
            gradient: 'from-amber-50 to-white',
            border: 'border-amber-100',
            accent: 'bg-amber-600',
        },
        rose: {
            bg: 'bg-rose-50',
            icon: 'text-rose-600',
            gradient: 'from-rose-50 to-white',
            border: 'border-rose-100',
            accent: 'bg-rose-600',
        },
    };

    const styles = colorStyles[color];

    const trendStyles = {
        up: {
            bg: 'bg-success-50',
            text: 'text-success-700',
            icon: TrendingUp,
        },
        down: {
            bg: 'bg-error-50',
            text: 'text-error-700',
            icon: TrendingDown,
        },
        neutral: {
            bg: 'bg-neutral-100',
            text: 'text-neutral-600',
            icon: Minus,
        },
    };

    const trendStyle = trendStyles[trend];
    const TrendIcon = trendStyle.icon;

    if (isLoading) {
        return (
            <div className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-card animate-pulse">
                <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-neutral-100" />
                    <div className="w-16 h-6 rounded-full bg-neutral-100" />
                </div>
                <div className="h-4 w-24 bg-neutral-100 rounded mb-2" />
                <div className="h-8 w-16 bg-neutral-100 rounded" />
            </div>
        );
    }

    return (
        <div className={`
            relative bg-white rounded-2xl border ${styles.border} p-6 
            shadow-card hover:shadow-card-hover transition-all duration-300
            hover:-translate-y-0.5 group overflow-hidden
        `}>
            {/* Subtle gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${styles.gradient} opacity-50`} />

            {/* Accent line on hover */}
            <div className={`absolute top-0 left-0 right-0 h-0.5 ${styles.accent} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />

            <div className="relative">
                <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${styles.bg} flex items-center justify-center ${styles.icon} group-hover:scale-110 transition-transform`}>
                        {icon}
                    </div>
                    <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${trendStyle.bg} ${trendStyle.text}`}>
                        <TrendIcon size={12} />
                        {change}
                    </div>
                </div>

                <p className="text-sm font-medium text-neutral-500 mb-1">{title}</p>
                <p className="text-3xl font-bold text-neutral-900">{value}</p>
            </div>
        </div>
    );
}
