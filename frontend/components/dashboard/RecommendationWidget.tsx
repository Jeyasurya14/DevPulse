
'use client';

import { Zap, Github, Lightbulb, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Recommendation {
    id: string;
    title: string;
    description: string;
    action: string;
    icon: string;
}

export default function RecommendationWidget() {
    // In a real app, fetch from /api/ai/recommendations/
    // Using mock data for immediate UI feedback.
    const [recommendations, setRecommendations] = useState<Recommendation[]>([
        {
            id: 'upgrade_pro',
            title: 'Unlock Pro Features',
            description: 'You are hitting usage limits. Upgrade to Pro for unlimited access.',
            action: '/pricing',
            icon: 'Zap'
        },
        {
            id: 'connect_github',
            title: 'Connect GitHub',
            description: 'Link your repository for automatic code reviews on push.',
            action: '/dashboard/settings',
            icon: 'Github'
        }
    ]);

    const getIcon = (name: string) => {
        switch (name) {
            case 'Zap': return <Zap className="text-yellow-500" />;
            case 'Github': return <Github className="text-slate-900" />;
            case 'Lightbulb': return <Lightbulb className="text-blue-500" />;
            default: return <Lightbulb />;
        }
    };

    return (
        <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl border border-indigo-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                <Lightbulb size={20} className="mr-2 text-indigo-600" />
                AI Recommendations
            </h3>
            <div className="space-y-4">
                {recommendations.map((rec) => (
                    <div key={rec.id} className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm flex flex-col sm:flex-row items-start sm:space-x-4 space-y-3 sm:space-y-0 hover:shadow-md transition-shadow">
                        <div className="bg-slate-50 p-2 rounded-lg shrink-0">
                            {getIcon(rec.icon)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-slate-900 text-sm truncate">{rec.title}</h4>
                            <p className="text-xs text-slate-500 mt-1 mb-2 line-clamp-2">{rec.description}</p>
                            <Link href={rec.action} className="text-indigo-600 text-xs font-bold flex items-center hover:underline">
                                Take Action <ArrowRight size={12} className="ml-1" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
