'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchAPI } from '@/lib/api';
import { Zap, ArrowUpRight } from 'lucide-react';

export default function UsageCard() {
    const [usage, setUsage] = useState<any>(null);

    useEffect(() => {
        fetchAPI('/api/billing/usage/')
            .then(data => setUsage(data))
            .catch(err => console.error(err));
    }, []);

    if (!usage) return null;

    // Don't show if unlimited/pro
    if (usage.limits.projects > 50) return null;

    const percentage = Math.min(100, (usage.usage.projects_used / usage.limits.projects) * 100);
    const isWarning = percentage >= 80;
    const isFull = percentage >= 100;

    return (
        <div className="p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-semibold text-neutral-300">Plan Usage</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isFull
                        ? 'bg-error-500/20 text-error-400'
                        : isWarning
                            ? 'bg-warning-500/20 text-warning-400'
                            : 'bg-devpulse-blue-500/20 text-devpulse-blue-400'
                    }`}>
                    {usage.usage.projects_used}/{usage.limits.projects}
                </span>
            </div>

            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                <div
                    className={`h-full rounded-full transition-all duration-500 ${isFull
                            ? 'bg-gradient-to-r from-error-500 to-error-400'
                            : isWarning
                                ? 'bg-gradient-to-r from-warning-500 to-warning-400'
                                : 'bg-gradient-to-r from-devpulse-blue-600 to-devpulse-blue-400'
                        }`}
                    style={{ width: `${percentage}%` }}
                />
            </div>

            <Link href="/pricing" className="block">
                <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-devpulse-yellow-500 hover:bg-devpulse-yellow-400 text-neutral-900 text-xs font-bold rounded-lg transition-all shadow-lg shadow-devpulse-yellow-500/20 hover:-translate-y-0.5">
                    <Zap size={12} className="fill-current" />
                    Upgrade to Pro
                    <ArrowUpRight size={12} />
                </button>
            </Link>
        </div>
    );
}
