'use client';

import { Zap, Lightbulb, ArrowRight, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchAPI } from '@/lib/api';

interface Recommendation {
    id: string;
    title: string;
    description: string;
    action: string;
    icon: string;
}

export default function RecommendationWidget() {
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch real recommendations when API is ready
        fetchAPI('/api/ai/recommendations/')
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setRecommendations(data.slice(0, 2)); // Show top 2
                } else {
                    // Use placeholder if no data
                    setRecommendations([
                        {
                            id: '1',
                            title: 'Connect GitHub',
                            description: 'Unlock code analytics and automated reviews.',
                            action: '/dashboard/integrations',
                            icon: 'Zap',
                        },
                    ]);
                }
            })
            .catch(() => {
                // Mock data for demo
                setRecommendations([
                    {
                        id: '1',
                        title: 'Run Code Analysis',
                        description: 'Scan your code for potential improvements.',
                        action: '/dashboard/analysis',
                        icon: 'Sparkles',
                    },
                ]);
            })
            .finally(() => setIsLoading(false));
    }, []);

    const getIcon = (name: string) => {
        switch (name) {
            case 'Zap': return <Zap size={16} className="text-devpulse-yellow-500" />;
            case 'Sparkles': return <Sparkles size={16} className="text-devpulse-blue-400" />;
            default: return <Lightbulb size={16} className="text-devpulse-yellow-500" />;
        }
    };

    if (isLoading) {
        return (
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 animate-pulse">
                <div className="h-4 bg-white/10 rounded w-2/3 mb-3" />
                <div className="h-3 bg-white/10 rounded w-full" />
            </div>
        );
    }

    if (recommendations.length === 0) return null;

    const rec = recommendations[0];

    return (
        <div className="p-4 bg-gradient-to-br from-devpulse-blue-600/20 to-transparent rounded-xl border border-devpulse-blue-500/20 backdrop-blur-sm">
            <div className="flex items-start gap-3">
                <div className="p-2 bg-devpulse-yellow-500/20 rounded-lg shrink-0">
                    {getIcon(rec.icon)}
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-white text-sm mb-1">{rec.title}</h4>
                    <p className="text-xs text-neutral-400 mb-2 line-clamp-2">{rec.description}</p>
                    <Link
                        href={rec.action}
                        className="inline-flex items-center gap-1 text-devpulse-yellow-400 text-xs font-bold hover:text-devpulse-yellow-300 transition-colors"
                    >
                        Take Action <ArrowRight size={10} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
