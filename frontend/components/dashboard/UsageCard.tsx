
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchAPI } from '@/lib/api';
import { Zap } from 'lucide-react';

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

    return (
        <div className="mb-4 p-4 bg-slate-800 rounded-lg border border-slate-700">
            <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-slate-300">Free Plan Usage</span>
                <span className="text-xs text-slate-400">{usage.usage.projects_used}/{usage.limits.projects} Projects</span>
            </div>

            <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden mb-3">
                <div
                    className={`h-full rounded-full transition-all duration-500 ${percentage >= 100 ? 'bg-red-500' : 'bg-blue-500'}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>

            <Link href="/pricing" className="block">
                <button className="w-full flex items-center justify-center gap-2 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-md transition-colors shadow-lg shadow-blue-500/20">
                    <Zap size={12} fill="currentColor" /> Upgrade to Pro
                </button>
            </Link>
        </div>
    );
}
