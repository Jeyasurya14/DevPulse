'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui';
import {
    TrendingUp,
    Download,
    Info,
    Award,
    Target,
    ChevronRight
} from 'lucide-react';
import { fetchAPI } from '@/lib/api';
import useSWR from 'swr';

export default function BenchmarksPage() {
    const { data: apiBenchmarks, isLoading } = useSWR('/api/dashboard/benchmarks/', fetchAPI);
    const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

    const getPerformanceLevel = (value: number, industryAvg: number, elite: number, isLowerBetter: boolean = false) => {
        if (isLowerBetter) {
            if (value <= elite) return { level: 'Elite', color: 'text-success-600 bg-success-50', badge: 'bg-success-500' };
            if (value <= industryAvg) return { level: 'Above Average', color: 'text-devpulse-blue-600 bg-devpulse-blue-50', badge: 'bg-devpulse-blue-500' };
            return { level: 'Needs Improvement', color: 'text-warning-600 bg-warning-50', badge: 'bg-warning-500' };
        } else {
            if (value >= elite) return { level: 'Elite', color: 'text-success-600 bg-success-50', badge: 'bg-success-500' };
            if (value >= industryAvg) return { level: 'Above Average', color: 'text-devpulse-blue-600 bg-devpulse-blue-50', badge: 'bg-devpulse-blue-500' };
            return { level: 'Needs Improvement', color: 'text-warning-600 bg-warning-50', badge: 'bg-warning-500' };
        }
    };

    const benchmarks = apiBenchmarks || {
        deploymentFrequency: { value: 0, industryAvg: 0, elite: 0, label: "Deployment Frequency" },
        leadTime: { value: 0, industryAvg: 0, elite: 0, label: "Lead Time" },
        changeFailureRate: { value: 0, industryAvg: 0, elite: 0, label: "Change Failure Rate" },
        mttr: { value: 0, industryAvg: 0, elite: 0, label: "MTTR" },
    };

    const metrics = [
        {
            key: 'deploymentFrequency',
            ...benchmarks.deploymentFrequency,
            unit: '/day',
            description: 'How often your team deploys to production',
            isLowerBetter: false
        },
        {
            key: 'leadTime',
            ...benchmarks.leadTime,
            unit: 'hrs',
            description: 'Time from code commit to production deployment',
            isLowerBetter: true
        },
        {
            key: 'changeFailureRate',
            ...benchmarks.changeFailureRate,
            unit: '%',
            description: 'Percentage of deployments causing failures',
            isLowerBetter: true
        },
        {
            key: 'mttr',
            ...benchmarks.mttr,
            unit: 'min',
            description: 'Mean time to recover from incidents',
            isLowerBetter: true
        },
    ];

    return (
        <div className="h-full bg-neutral-50 font-sans">
            <main className="p-6 md:p-8 lg:p-10 h-full overflow-y-auto scrollbar-thin">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-1">Industry Benchmarks</h1>
                        <p className="text-neutral-500">Compare your DORA metrics against industry standards</p>
                    </div>
                    <Button variant="outline" leftIcon={<Download size={18} />}>
                        Export Report
                    </Button>
                </div>

                {/* Performance Summary */}
                <div className="bg-gradient-to-br from-devpulse-blue-600 to-devpulse-blue-700 rounded-2xl p-6 md:p-8 mb-8 text-white">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                    <Award size={24} className="text-devpulse-yellow-400" />
                                </div>
                                <h2 className="text-2xl font-bold">Overall Performance</h2>
                            </div>
                            <p className="text-devpulse-blue-100 max-w-lg">
                                Your team is performing above industry average in 3 out of 4 DORA metrics.
                                Keep up the great work!
                            </p>
                        </div>
                        <div className="flex items-center gap-8">
                            <div className="text-center">
                                <p className="text-5xl font-bold text-devpulse-yellow-400">3/4</p>
                                <p className="text-sm text-devpulse-blue-100 mt-1">Metrics Above Average</p>
                            </div>
                            <div className="text-center">
                                <p className="text-5xl font-bold">1</p>
                                <p className="text-sm text-devpulse-blue-100 mt-1">Elite Performance</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Benchmark Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {metrics.map((metric) => {
                        const performance = getPerformanceLevel(metric.value, metric.industryAvg, metric.elite, metric.isLowerBetter);
                        const yourPosition = metric.isLowerBetter
                            ? ((metric.industryAvg - metric.value) / metric.industryAvg) * 100
                            : ((metric.value - metric.industryAvg) / metric.industryAvg) * 100;

                        return (
                            <div
                                key={metric.key}
                                className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-card hover:shadow-card-hover transition-all"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="font-bold text-lg text-neutral-900">{metric.label}</h3>
                                        <p className="text-sm text-neutral-500 mt-1">{metric.description}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${performance.color}`}>
                                        {performance.level}
                                    </span>
                                </div>

                                {/* Values */}
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    <div className="text-center p-3 bg-devpulse-blue-50 rounded-xl">
                                        <p className="text-2xl font-bold text-devpulse-blue-600">{metric.value}</p>
                                        <p className="text-xs text-devpulse-blue-500 font-medium">Your Team</p>
                                    </div>
                                    <div className="text-center p-3 bg-neutral-50 rounded-xl">
                                        <p className="text-2xl font-bold text-neutral-600">{metric.industryAvg}</p>
                                        <p className="text-xs text-neutral-500 font-medium">Industry Avg</p>
                                    </div>
                                    <div className="text-center p-3 bg-devpulse-yellow-50 rounded-xl">
                                        <p className="text-2xl font-bold text-devpulse-yellow-600">{metric.elite}</p>
                                        <p className="text-xs text-devpulse-yellow-600 font-medium">Elite Target</p>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="relative h-3 bg-neutral-100 rounded-full overflow-hidden">
                                    <div
                                        className={`absolute left-0 top-0 h-full rounded-full transition-all duration-500 ${performance.badge}`}
                                        style={{ width: `${Math.min(Math.max(50 + yourPosition, 10), 100)}%` }}
                                    />
                                    {/* Industry Avg marker */}
                                    <div className="absolute top-0 h-full w-0.5 bg-neutral-400" style={{ left: '50%' }} />
                                </div>
                                <div className="flex justify-between mt-2 text-xs text-neutral-400">
                                    <span>Below Average</span>
                                    <span>Industry Avg</span>
                                    <span>Elite</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Info Section */}
                <div className="bg-devpulse-blue-50 border border-devpulse-blue-100 rounded-xl p-5 flex items-start gap-4">
                    <div className="p-2 bg-devpulse-blue-100 rounded-lg">
                        <Info size={20} className="text-devpulse-blue-600" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-devpulse-blue-900 mb-1">About DORA Metrics</h4>
                        <p className="text-sm text-devpulse-blue-700">
                            DORA (DevOps Research and Assessment) metrics are industry-standard measures of software delivery performance.
                            Elite performers deploy multiple times per day with lead times under one hour, change failure rates under 5%,
                            and can recover from incidents in under one hour.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
