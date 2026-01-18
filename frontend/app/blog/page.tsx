'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui';
import { FileText, Calendar, User } from 'lucide-react';
import Link from 'next/link';

export default function BlogPage() {
    const posts = [
        {
            title: 'The Future of DORA Metrics: Beyond the Big Four',
            excerpt: 'Why standard DORA metrics are just the beginning, and how AI is changing how we measure engineering productivity.',
            author: 'Sarah Chen',
            date: 'Jan 15, 2026',
            category: 'Engineering Leadership',
            image: 'bg-gradient-to-br from-blue-500 to-indigo-600'
        },
        {
            title: 'Scaling Engineering Teams from 10 to 100',
            excerpt: 'Lessons learned from high-growth startups on maintaining velocity while adding headcount.',
            author: 'Michael Ross',
            date: 'Jan 10, 2026',
            category: 'Growth',
            image: 'bg-gradient-to-br from-purple-500 to-pink-600'
        },
        {
            title: 'Automating Security Compliance with DevPulse',
            excerpt: 'How to achieve SOC2 readiness faster using automated policy-as-code checks.',
            author: 'David Kim',
            date: 'Jan 05, 2026',
            category: 'Security',
            image: 'bg-gradient-to-br from-emerald-500 to-teal-600'
        }
    ];

    return (
        <div className="min-h-screen bg-white font-sans text-neutral-900">
            <Navbar />
            <section className="pt-32 pb-20 bg-neutral-50 border-b border-neutral-200">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-sm font-semibold mb-6">
                        <FileText size={14} />
                        Engineering Blog
                    </div>
                    <h1 className="text-5xl font-bold mb-6">Insights for Engineering Leaders</h1>
                    <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
                        Deep dives into software delivery, team culture, and technical strategy.
                    </p>
                </div>
            </section>

            <section className="py-20 max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-8">
                    {posts.map((post, idx) => (
                        <div key={idx} className="group rounded-2xl border border-neutral-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                            <div className={`h-48 ${post.image} relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                            </div>
                            <div className="p-8">
                                <div className="text-xs font-bold text-devpulse-blue-600 uppercase tracking-wide mb-3">{post.category}</div>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-devpulse-blue-600 transition-colors">{post.title}</h3>
                                <p className="text-neutral-500 mb-6 line-clamp-3">{post.excerpt}</p>
                                <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
                                    <div className="flex items-center gap-2 text-sm font-medium text-neutral-900">
                                        <User size={16} className="text-neutral-400" />
                                        {post.author}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-neutral-400">
                                        <Calendar size={16} />
                                        {post.date}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
