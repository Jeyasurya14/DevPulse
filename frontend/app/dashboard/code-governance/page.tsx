'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui';
import {
    Shield,
    AlertTriangle,
    CheckCircle,
    Clock,
    FileCode,
    GitPullRequest,
    Zap,
    ArrowUpRight,
    Eye,
    RefreshCw,
    TrendingUp,
    Star
} from 'lucide-react';
import { mockSecurityIssues } from '@/lib/mockData';

export default function CodeGovernancePage() {
    const [activeTab, setActiveTab] = useState<'vulnerabilities' | 'reviews' | 'quality'>('vulnerabilities');

    const summaryCards = [
        {
            icon: Shield,
            label: 'Security Status',
            value: '3 issues',
            detail: '0 Critical | 1 High | 2 Medium',
            color: 'warning',
            action: 'Review Now'
        },
        {
            icon: Star,
            label: 'Code Quality Score',
            value: '8.7/10',
            detail: '↑ 0.3 from last week',
            color: 'success',
            action: 'View Details'
        },
        {
            icon: GitPullRequest,
            label: 'Active Reviews',
            value: '12 PRs',
            detail: 'Avg review time: 3.2 hrs',
            color: 'blue',
            action: 'View Queue'
        },
        {
            icon: CheckCircle,
            label: 'Auto-merged Today',
            value: '23 PRs',
            detail: 'Based on quality rules',
            color: 'emerald',
            action: 'Review Rules'
        }
    ];

    const pendingReviews = [
        { id: '#456', title: 'Add user authentication flow', author: 'Sarah C.', complexity: 'Medium', aiSummary: 'Changes look good. Minor style inconsistencies detected.', time: '2.1 hrs' },
        { id: '#457', title: 'Refactor database queries', author: 'Mike J.', complexity: 'High', aiSummary: 'Performance improvement detected. Consider adding index.', time: '4.5 hrs' },
        { id: '#458', title: 'Update API endpoints', author: 'Emma D.', complexity: 'Low', aiSummary: 'All tests passing. Ready for approval.', time: '1.2 hrs' },
    ];

    const tabs = [
        { id: 'vulnerabilities', label: 'Security Vulnerabilities', count: mockSecurityIssues.filter(i => i.status !== 'resolved').length },
        { id: 'reviews', label: 'Code Reviews', count: pendingReviews.length },
        { id: 'quality', label: 'Quality Trends', count: null },
    ];

    const getSeverityBadge = (severity: string) => {
        switch (severity) {
            case 'high': return 'bg-error-50 text-error-700 border-error-100';
            case 'medium': return 'bg-warning-50 text-warning-700 border-warning-100';
            default: return 'bg-neutral-50 text-neutral-600 border-neutral-200';
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'open': return 'bg-error-50 text-error-600';
            case 'in-progress': return 'bg-devpulse-blue-50 text-devpulse-blue-600';
            default: return 'bg-success-50 text-success-600';
        }
    };

    return (
        <div className="h-full bg-neutral-50 font-sans">
            <main className="p-6 md:p-8 lg:p-10 h-full overflow-y-auto scrollbar-thin">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-1">AI-Powered Code Governance</h1>
                        <p className="text-neutral-500">Automated reviews, security scanning, and quality insights</p>
                    </div>
                    <Button variant="primary" leftIcon={<RefreshCw size={18} />}>
                        Run Full Scan
                    </Button>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {summaryCards.map((card, idx) => (
                        <div key={idx} className="bg-white p-5 rounded-xl border border-neutral-100 shadow-card hover:shadow-card-hover transition-shadow">
                            <div className="flex items-start justify-between mb-3">
                                <div className={`p-2.5 rounded-lg ${card.color === 'warning' ? 'bg-warning-50' :
                                        card.color === 'success' ? 'bg-success-50' :
                                            card.color === 'blue' ? 'bg-devpulse-blue-50' :
                                                'bg-emerald-50'
                                    }`}>
                                    <card.icon size={20} className={`${card.color === 'warning' ? 'text-warning-600' :
                                            card.color === 'success' ? 'text-success-600' :
                                                card.color === 'blue' ? 'text-devpulse-blue-600' :
                                                    'text-emerald-600'
                                        }`} />
                                </div>
                            </div>
                            <p className="text-sm font-medium text-neutral-500 mb-1">{card.label}</p>
                            <p className="text-2xl font-bold text-neutral-900 mb-1">{card.value}</p>
                            <p className="text-xs text-neutral-400 mb-3">{card.detail}</p>
                            <button className="text-sm font-semibold text-devpulse-blue-600 hover:text-devpulse-blue-700 flex items-center gap-1">
                                {card.action} <ArrowUpRight size={14} />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-2 mb-6 border-b border-neutral-200">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`px-4 py-3 text-sm font-semibold transition-colors border-b-2 -mb-px ${activeTab === tab.id
                                    ? 'text-devpulse-blue-600 border-devpulse-blue-600'
                                    : 'text-neutral-500 border-transparent hover:text-neutral-700'
                                }`}
                        >
                            {tab.label}
                            {tab.count !== null && (
                                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeTab === tab.id
                                        ? 'bg-devpulse-blue-50 text-devpulse-blue-600'
                                        : 'bg-neutral-100 text-neutral-500'
                                    }`}>
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                {activeTab === 'vulnerabilities' && (
                    <div className="bg-white rounded-2xl border border-neutral-100 shadow-card overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-neutral-100 bg-neutral-50">
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Severity</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Issue</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Location</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Detected</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Status</th>
                                    <th className="text-right px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockSecurityIssues.map((issue, idx) => (
                                    <tr key={idx} className="border-b border-neutral-50 hover:bg-neutral-25 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold border ${getSeverityBadge(issue.severity)}`}>
                                                {issue.severity.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-neutral-900">{issue.description}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <code className="text-sm text-devpulse-blue-600 bg-devpulse-blue-50 px-2 py-1 rounded">{issue.file}</code>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-neutral-500">{issue.detected}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadge(issue.status)}`}>
                                                {issue.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Button variant="outline" size="sm" leftIcon={<Eye size={14} />}>
                                                View
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div className="space-y-4">
                        {pendingReviews.map((pr, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-xl border border-neutral-100 shadow-card hover:shadow-card-hover transition-shadow">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-devpulse-blue-50 rounded-lg">
                                            <GitPullRequest size={18} className="text-devpulse-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-neutral-900">{pr.id}: {pr.title}</p>
                                            <p className="text-sm text-neutral-500">by {pr.author}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${pr.complexity === 'High' ? 'bg-error-50 text-error-600' :
                                                pr.complexity === 'Medium' ? 'bg-warning-50 text-warning-600' :
                                                    'bg-success-50 text-success-600'
                                            }`}>
                                            {pr.complexity}
                                        </span>
                                        <span className="text-sm text-neutral-400 flex items-center gap-1">
                                            <Clock size={14} /> {pr.time}
                                        </span>
                                    </div>
                                </div>
                                <div className="bg-neutral-50 rounded-lg p-4 mb-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Zap size={14} className="text-devpulse-yellow-500" />
                                        <span className="text-xs font-semibold text-neutral-500">AI Analysis</span>
                                    </div>
                                    <p className="text-sm text-neutral-700">{pr.aiSummary}</p>
                                </div>
                                <div className="flex gap-3">
                                    <Button variant="primary" size="sm">Approve</Button>
                                    <Button variant="outline" size="sm">Request Changes</Button>
                                    <Button variant="outline" size="sm" leftIcon={<Eye size={14} />}>View Details</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'quality' && (
                    <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-8 text-center">
                        <div className="bg-devpulse-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <TrendingUp size={32} className="text-devpulse-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-2">Quality Trends Dashboard</h3>
                        <p className="text-neutral-500 max-w-md mx-auto mb-6">
                            View code coverage, bug density, technical debt, and maintainability trends over time.
                        </p>
                        <Button variant="primary">View Analytics</Button>
                    </div>
                )}
            </main>
        </div>
    );
}
